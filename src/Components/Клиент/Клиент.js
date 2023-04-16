import React, { useEffect } from 'react'
import './Style.css'
import {Button, Space } from 'antd';
const Клиент = ({ user, клиентs, setКлиентs, removeКлиент }) => {
useEffect(() => {
const getКлиентs = async () => {
const requestOptions = {
method: 'GET'
}
return await fetch("https://localhost:7061/api/клиентs/",
requestOptions)
.then(response => response.json())
.then(
(data) => {
console.log('Data:', data)
setКлиентs(data)
},
(error) => {
console.log(error)
}
)
}
getКлиентs()
}, [setКлиентs])
const deleteItem = async ({ номер_клиента }) => {
    const requestOptions = {
    method: 'DELETE'
    }
    return await fetch(`https://localhost:7061/api/клиентs/${номер_клиента}`,
    requestOptions)
    .then((response) => {
    if (response.ok) {
    removeКлиент(номер_клиента);
    }
    },
    (error) => console.log(error)
    )
    }
return (
<React.Fragment>
<h3>Клиентская база</h3>
{клиентs.map(({ номер_клиента, фио, баланс }) => (
<div className="Клиент" key={номер_клиента} id={номер_клиента} >
<h1> {'Номер клиента: ' + номер_клиента} </h1>
<p></p>
<h1> {'ФИО: ' + фио} </h1>
<p></p>
<h1> {'Баланс: ' + баланс} </h1>
<p></p>

{user.isAuthenticated && user.userRole==="user" ? (
 <Space wrap>
        
 <Button onClick={() => deleteItem({ номер_клиента })}  type="primary">Удалить</Button>
</Space>
) : (
""
)}
</div>
))}
</React.Fragment>
)
}
export default Клиент