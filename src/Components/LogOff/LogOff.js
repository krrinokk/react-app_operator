import React from "react"
import { useNavigate } from "react-router-dom"


const LogOff = ({ user, setUser }) => {
  const navigate = useNavigate()

  const LogOff = async (event) => {
    event.preventDefault()

    const requestOptions = {
      method: "POST"
    }
    return await fetch(
      "api/account/logoff",
      requestOptions
    )
      .then((response) => {
        // console.log(response.status)
        response.status === 200 &&
          setUser({ isAuthenticated: false, userName: "" })

          response.status === 401 && navigate("/login")
      })
  }

  return (
    <>
      {user.isAuthenticated ? (
        <h3>Пользователь {user.userName} успешно вошел в систему</h3>
      ) : (
        <h3>Вы гость.</h3>
      )}
      {user.isAuthenticated ? (
        <form onSubmit={LogOff}>
      <button type="submit">Выйти</button>
      </form> ) : (
        ""
      )} 
    </>
  )
}


export default LogOff