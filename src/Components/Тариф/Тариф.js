import React, { useEffect } from 'react'
import {  Button, Space } from 'antd';

import './Style.css'
const Тариф = ({ user, тарифs, setТарифs, removeТариф }) => {
useEffect(() => {
const getТарифs = async () => {
const requestOptions = {
method: 'GET'
}
return await fetch("https://localhost:7061/api/тарифs/",
requestOptions)
.then(response => response.json())
.then(
(data) => {
console.log('Data:', data)
setТарифs(data)
},
(error) => {
console.log(error)
}
)
}
getТарифs()
}, [setТарифs])
const deleteItem = async ({ код_тарифа }) => {
    const requestOptions = {
    method: 'DELETE'
    }
    return await fetch(`api/тарифs/${код_тарифа}`,
    requestOptions)
    .then((response) => {
    if (response.ok) {
    removeТариф(код_тарифа);
    }
    },
    (error) => console.log(error)
    )
    }
return (
<React.Fragment>
<h3>Список тарифов:</h3>
{тарифs.map(({ минута_межгород_стоимость, минута_международная_стоимость,
     название_тарифа, стоимость_перехода, код_типа_тарифа_FK, код_тарифа, статус, дата_открытия }) => (

<div className="Тариф" key={код_тарифа} id={код_тарифа} >
<h1>  {'Код тарифа: ' + код_тарифа} </h1> 
<p></p>
<h1>  {'Стоимость минуты разговора между городами: ' + минута_межгород_стоимость}</h1> 
<p></p>
<h1>  {'Стоимость минуты разговора в роуминге: ' + минута_международная_стоимость} </h1> 
<p></p>
<h1>  {'Название тарифа: ' + название_тарифа} </h1> 
<p></p>
<h1>  {'Плата за тариф: ' + стоимость_перехода} </h1> 
<p></p>
<h1>{'Код типа тарифа: ' + код_типа_тарифа_FK} </h1> 
<p></p>
<h1>  {'Статус: ' + статус} </h1> 
<p></p>
<h1>  {'Дата_открытия: ' + дата_открытия}</h1> 
<p></p>

{user.isAuthenticated && user.userRole==="admin"  ? (
    <Space wrap>
        
    <Button onClick={() => deleteItem({ код_тарифа })}  type="primary">Удалить</Button>
  </Space>
) : (
""
)}

</div>

))}

</React.Fragment>
)
}
export default Тариф