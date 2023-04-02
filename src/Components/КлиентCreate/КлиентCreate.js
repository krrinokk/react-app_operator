import React from 'react'
const КлиентCreate = ({ user,addКлиент }) => {
const handleSubmit = (e) => {
e.preventDefault()
const  nom_client  = e.target.elements.номер_клиента.value
        const fio  = e.target.elements.фио.value
        const  balance  = e.target.elements.баланс.value
        

        const Клиент = { номер_клиента: nom_client, фио: fio, баланс: balance }
const createКлиент = async () => {
const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(Клиент)
}
const response = await fetch("https://localhost:7061/api/клиентs/",

requestOptions)

return await response.json()
.then((data) => {
console.log(data)
// response.status === 201 && addDogovor(data)
if (response.ok) {
addКлиент(data)
e.target.elements.номер_клиента.nom_tel= ""
e.target.elements.фио.fio = ""
e.target.elements.баланс.balance = ""
}
},
(error) => console.log(error)
)
}
createКлиент()
}
return (
        <>
        {user.isAuthenticated ? (
          <>
<h3>Добавление нового клиента в клиенсткую базу</h3>
<form onSubmit={handleSubmit}>
<label>Номер_клиента: </label>
<input type="number" name="номер_клиента" placeholder="Введите Номер_клиента:" /> <br></br>
<label>Баланс: </label>
<input type="number" name="баланс"  placeholder="Введите Баланс:" /><br></br>
<label>ФИО: </label>
<input type="text" name="фио"  placeholder="Введите ФИО:" /><br></br>

<button type="submit">Создать</button>
</form>
</>
      ) : (
        ""
      )}
    </>
  )
}
export default КлиентCreate