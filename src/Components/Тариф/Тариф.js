import React, { useEffect } from 'react'
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
<strong > {'Код тарифа: ' + код_тарифа} </strong>
<p></p>
<strong > {'Стоимость минуты разговора между городами: ' + минута_межгород_стоимость} </strong>
<p></p>
<strong > {'Стоимость минуты разговора в роуминге: ' + минута_международная_стоимость} </strong>
<p></p>
<strong > {'Название тарифа: ' + название_тарифа} </strong>
<p></p>
<strong > {'Плата за тариф: ' + стоимость_перехода} </strong>
<p></p>
<strong > {'Код типа тарифа: ' + код_типа_тарифа_FK} </strong>
<p></p>
<strong > {'Статус: ' + статус} </strong>
<p></p>
<strong > {'Дата_открытия: ' + дата_открытия} </strong>
<p></p>

{user.isAuthenticated ? (
<button onClick={() => deleteItem({ код_тарифа })}>Удалить</button>
) : (
""
)}
</div>
))}
</React.Fragment>
)
}
export default Тариф