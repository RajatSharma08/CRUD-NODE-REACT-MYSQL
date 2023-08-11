const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'loc_mysql.smart24x7.com',
  port: '3306',
  user: 'root',
  password: 'Rootunlock@22', 
  database: 'test_rjt',
});

app.post("/create", (req, res) => {
 
  const userID = req.body.userID;
  const userName = req.body.userName;
  const userDOB = req.body.userDOB;
  const email = req.body.email;
  const contact = req.body.contact;
  const country = req.body.country;

  db.query(
    "INSERT INTO users (userId, userName, userDOB, email, contact, country ) VALUES (?,?,?,?,?,?)",
    [userID, userName, userDOB, email, contact, country],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const userID = req.body.userID;
  const contact = req.body.contact;
  db.query(
    "UPDATE users SET contact = ? WHERE userID = ?",
    [contact, userID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const userID = req.params.userID;
  db.query("DELETE FROM users WHERE userID = ?", userID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3000, () => {
  console.log("Yey, your server is running on port 3000");
});
