import express from "express"
import cors from "cors"
import mysql from "mysql2"

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "22510057",
    password: "22510057@",
    database: "sample"
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to the database.");
    }
});

app.get("/", (req, res) => {
    db.query("SHOW TABLES", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});


app.get("/table/:name", (req, res) => {
    const tableName = req.params.name;
    db.query(`SELECT * FROM ${tableName}`, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

app.post("/table/:name", (req, res) => {
    const tableName = req.params.name;
    const data = req.body;
    db.query(`INSERT INTO ${tableName} SET ?`, data, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

app.put("/table/:name/:id", (req, res) => {
    const tableName = req.params.name;
    const id = req.params.id;
    const data = req.body;
    db.query(`UPDATE ${tableName} SET ? WHERE Name = ?`, [data, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

app.delete("/table/:name/:id", (req, res) => {
    const tableName = req.params.name;
    const id = req.params.id;
    db.query(`DELETE FROM ${tableName} WHERE Name = ?`, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
   
});

const PORT = 9563;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
