import React, { useState } from 'react'
import Warning from '../../../../components/Warning'
import { deleteCookies, setCookie } from '../../../../helper/cookie'
import style from "./loginAndRegistrationForm.module.css"

const LoginAndRegistrationForm = (props) => {

  const [userName, setUserName] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const [userLoginName, setUserLoginName] = useState("")
  const [userLoginPassword, setUserLogginPassword] = useState("")

  const [showMinUserNameWarning, setShowMinUserNameWarning] = useState(false)
  const [showMinPasswordWarning, setShowMinPasswordWarning] = useState(false)
  const [showUserNameAlreadyUsedWarning, setshowUserNameAlreadyUsedWarning] = useState(false)
  const [showWrongUsernameOrPassword, setShowWrongUsernameOrPassword] = useState(false)

  const login = (event) => {
    //Check Validation
    if(userLoginName.length < 3){
      setShowMinUserNameWarning(true)
      return;
    }
    if(userLoginPassword.length < 3){
      setShowMinPasswordWarning(true)
      return;
    }

    //Send Information to server
    fetch('http://localhost:3000/user-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify( {
            userName : userLoginName,
            userPassword : userLoginPassword
        })
    }).then((response) => {
        return response.json();
    }).then( (data) => {
        if(data.statusCode === 1){
            console.log(data.responseMessage)
            saveUser(userLoginName,userLoginPassword)
        }
        if(data.statusCode === 0){
            console.log(data.responseMessage)
            setShowWrongUsernameOrPassword(true)
        }
    });

    event.preventDefault();

  }

  const registration = (event) => {
    //Check Validation
    if(userName.length < 3){
      setShowMinUserNameWarning(true)
      return;
    }
    if(userPassword.length < 3){
      setShowMinPasswordWarning(true)
      return;
    }

    //Send Information to server
    fetch('http://localhost:3000/user-registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify( {
            userName : userName,
            userPassword : userPassword
        })
    }).then((response) => {
        return response.json();
    }).then( (data) => {
        if(data.statusCode === 1){
            console.log(data.responseMessage)
            saveUser(userName,userPassword)
        }
        if(data.statusCode === 2){
            console.log(data.responseMessage)
            setshowUserNameAlreadyUsedWarning(true)
        }
        if(data.statusCode === 0){
            console.log(data.responseMessage)
        }
    });

    event.preventDefault();
}

const saveUser = (username, password) => {
  setCookie("loginSession",
  JSON.stringify({
      userName : username,
      password : password,
  }), 2100);
  props.setIsLogin(true)
}

  return (
    <div className={style.loginAndRegistrationForm}>

      { showMinUserNameWarning && <Warning okState={setShowMinUserNameWarning} text={"Your Username must have a minimum of 3 characters."} /> }
      { showMinPasswordWarning && <Warning okState={setShowMinPasswordWarning} text={"Your password must have a minimum of 3 characters."} /> }
      { showUserNameAlreadyUsedWarning && <Warning okState={setshowUserNameAlreadyUsedWarning} text={"We're sorry, but that username is already in use. Please choose a different username"} /> }
      { showWrongUsernameOrPassword && <Warning okState={setShowWrongUsernameOrPassword} text={"Username or Password is Incorrect"} /> }
      
        <div className={style.centerContainer}>
          <div className={style.formContainer}>

            <h3 className={style.formTitle}> Login </h3>
            <div className={style.userInputDiv}>
              <p className={style.userInputTitle}> Player Name </p>
              <input onChange={ (e) => {
                setUserLoginName(e.target.value)
              }} maxLength={20} className={style.userInput} type="text" />
            </div>
            <div className={style.userInputDiv}>
              <p className={style.userInputTitle}> Password </p>
              <input onChange={ (e) => {
                setUserLogginPassword(e.target.value)
              }} maxLength={20} className={style.userInput} type="password" />
            </div>
            <button onClick={login} type='button' className={style.submitButton}> Login </button>
          </div>

          <div className={style.formContainer}>
            <h3 className={style.formTitle}> Registration </h3>
            <div className={style.userInputDiv}>
              <p className={style.userInputTitle}> Player Name </p>
              <input onChange={ (e) => {
                setUserName(e.target.value)
              }} maxLength={20} className={style.userInput} type="text" />
            </div>
            <div className={style.userInputDiv}>
              <p className={style.userInputTitle}> Password </p>
              <input onChange={ (e) => {
                setUserPassword(e.target.value)
              }} maxLength={20} className={style.userInput} type="password" />
            </div>
            <button onClick={registration} type='button' className={style.submitButton}> Registration </button>
          </div>

        </div>
    </div>
  )
}

export default LoginAndRegistrationForm