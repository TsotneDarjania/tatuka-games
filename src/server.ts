import express from 'express';
import {login, registration} from "./userInterface"
import cors from "cors";

//for access env vironment
import dotenv from "dotenv"
dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

//App Settings
app.use(express.static('src/client/build'));
app.use(cors({
  methods:['GET','POST'],
  credentials: true 
})); 
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));


app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'src/client/build' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.post('/user-registration', (req,res) => {
  const userName = req.body.userName;
  const userPassword = req.body.userPassword;

  registration(userName,userPassword,res)
})

app.post('/user-login',  (req,res) => {
  const userName= req.body.userName;
  const userPassword = req.body.userPassword;

  login(userName,userPassword,res)

});

app.post('/save-game', (req,res) => {
  const username = req.body.username;
  const data = req.body.data;

  console.log(data)
})


