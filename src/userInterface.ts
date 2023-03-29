import "./mysqlConfig";

import {db} from "./mysqlConfig"

export function registration(userName : string, password : string, res: any){
  //Check if user already existed
  db.query(
    "SELECT * FROM users WHERE name = ? AND password = ?",
    [userName,password],
    (err,result) => {
      if(err){
        return { err : err};
      }
      if(result.length > 0){
        res.send(  { 
          responseMessage : "This Username is already Used",
          statusCode : 2,
          statusMessage : "Warned",
        })
      } else {
        insertNewUser(userName,password,res)
      }
    }
  )
}

export function login(userName : string, password : string, res: any){
  db.query(
    "SELECT * FROM users WHERE name = ? AND password = ?",
    [userName,password],
    (err,result) => {
      if(err){
        res.send( { err : err})
      }

      if(result.length > 0){
        res.send(  { 
          responseMessage : "loginData is Correct",
          statusCode : 1,
          statusMessage : "Access",
        })
      } else {
        res.send(  { 
          responseMessage : "loginData is Wrong",
          statusCode : 0,
          statusMessage : "Denied"
        })
      }
    }
  )
}





function insertNewUser(userName : string, password: string, res : any){
  db.query(
    "INSERT INTO users (name, password) VALUES(?,?)",
    [userName,password],
    (err,result) => {
      if(err) {
        res.send(  { 
          responseMessage : "Server Error",
          statusCode : 1,
          statusMessage : "Failed",
        })
      };
      if(result){
        res.send(  { 
          responseMessage : "New user is Inserted",
          statusCode : 1,
          statusMessage : "Success",
        })
      }
    }
  )
}
