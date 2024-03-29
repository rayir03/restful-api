const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()) // => req.body

//ROUTES

//get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message);
    }
})


//get a todo
app.get("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",
        [id]
        );
        res.json(todo.rows[0]);
    } catch (error) {
        
    }
})

//create a todo 

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", 
            [description]
        );
        res.status(201).json(newTodo.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})
//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params; //WHERE
        const {description} = req.body; // SET
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [
            description, id
        ]);
        res.json("Todo was updated!")
    } catch (error) {
        console.error(error.message);
    }
})
//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const delTodos = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
            id
        ]);
        res.json("Todo was successfuly deleted")
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(5000, () => {
    console.log("Server is listening on port 5000")
})
