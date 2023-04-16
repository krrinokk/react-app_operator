import React, { useEffect } from 'react'
import {  Button, Space } from 'antd';
import './Style.css'
const Dogovor = ({ user, dogovors, setDogovors, removeDogovor }) => {
useEffect(() => {
const getDogovors = async () => {
const requestOptions = {
method: 'GET'
}
return await fetch("https://localhost:7061/api/dogovors/",
requestOptions)
.then(response => response.json())
.then(
(data) => {
console.log('Data:', data)
setDogovors(data)
},
(error) => {
console.log(error)
}
)
}
getDogovors()
}, [setDogovors])
const deleteItem = async ({ номер_договора }) => {
    const requestOptions = {
    method: 'DELETE'
    }
    return await fetch(`api/dogovors/${номер_договора}`,
    requestOptions)
    .then((response) => {
    if (response.ok) {
    removeDogovor(номер_договора);
    }
    },
    (error) => console.log(error)
    )
    }
return (
<React.Fragment>
<h3>Список договоров</h3>
{dogovors.map(({ номер_договора, номер_телефона, серийный_номер_сим_карты, дата_заключения, дата_расторжения, код_тарифа_FK, номер_клиента_FK }) => (
<div className="Dogovor" key={номер_договора} id={номер_договора} >
<h1> {'Номер договора: ' + номер_договора} </h1>
<p></p>
<h1> {'Номер телефона: ' + номер_телефона} </h1>
<p></p>
<h1> {'Серийный номер SIM-Card: ' + серийный_номер_сим_карты} </h1>
<p></p>
<h1 > {'Дата заключения: ' + дата_заключения} </h1>
<p></p>
<h1> {'Дата расторжения: ' + дата_расторжения} </h1>
<p></p>
<h1 > {'Код подключенного тарифа: ' + код_тарифа_FK} </h1>
<p></p>
<h1> {'Номер клиента оформленного договора: ' + номер_клиента_FK} </h1>
<p></p>
{user.isAuthenticated && user.userRole==="user"  ? (
    
<Space wrap>
        
        <Button onClick={() => deleteItem({ номер_договора })}  type="primary">Удалить</Button>
      </Space>
) : (
""
)}
</div>
))}
</React.Fragment>
)
}
export default Dogovor