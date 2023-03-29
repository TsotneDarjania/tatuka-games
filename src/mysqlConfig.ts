import mysql from "mysql"

export const db = mysql.createConnection({
    host : "localhost",
    user : "tsotne",
    password : "Beethoven999",
    database : "silkroadgaminig"
  })
  //check if database connected
  db.connect((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
});

