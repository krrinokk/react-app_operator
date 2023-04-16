import React from 'react'
import 'antd/dist/reset.css';
import { Input, Button, Space } from 'antd';
import { ContactsOutlined  } from '@ant-design/icons';

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
const response = await fetch("api/клиентs/",

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
        {user.isAuthenticated && user.userRole==="user" ? (
          <>
<h3>Добавление нового клиента в клиенсткую базу</h3>
<form onSubmit={handleSubmit}>
<label>Номер клиента: </label>
<Input type="number" name="номер_клиента" placeholder="Введите номер_клиента"  /><br></br>
<label>Баланс: </label>
<Input type="number" name="баланс" placeholder="Введите баланс"  /><br></br>
<label>ФИО: </label>
<Input type="text" icon={<ContactsOutlined />}  name="фио"  placeholder="Введите ФИО:" /><br></br>
<br></br>
<Space wrap>

    <Button type="primary" htmlType="submit">Создать</Button>

  </Space>
  <br></br>
  <br></br>
</form>
</>
      ) : (
        ""
      )}
    </>
  )
}
export default КлиентCreate