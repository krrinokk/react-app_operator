import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const LogIn = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([])
  const navigate = useNavigate()

  const logIn = async (event) => {
    event.preventDefault()

    var { email, password } = document.forms[0]
    // console.log(email.value, password.value)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    }
    return await fetch(
      "api/account/login",
      requestOptions
    )
      .then((response) => {
        // console.log(response.status)
        response.status === 200 &&
          setUser({ isAuthenticated: true, userName: "" })
        return response.json()
      })
      .then(
        (data) => {
          console.log("Data:", data)
          if (
            typeof data !== "undefined" &&
            typeof data.userName !== "undefined"
          ) {
            setUser({ isAuthenticated: true, userName: data.userName })
            navigate("/")
          }
          typeof data !== "undefined" &&
            typeof data.error !== "undefined" &&
            setErrorMessages(data.error)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  const renderErrorMessage = () =>
    errorMessages.map((error, index) => <div key={index}>{error}</div>)

  return (
    <>
      {user.isAuthenticated ? (
        <h3>Пользователь {user.userName} успешно вошел в систему</h3>   ) : (
        <>
          <h3>Вход</h3>
          <form onSubmit={logIn}>
            <label>Пользователь </label>
            <input type="text" name="email" placeholder="Логин" />
            <br />
            <label>Пароль </label>
            <input type="password" name="password" placeholder="Пароль" />
            <br />
            <button type="submit">Войти</button>
          </form>          
          {renderErrorMessage()}
        </>
      )}
    </>
  )
}

export default LogIn