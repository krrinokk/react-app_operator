import React, { useEffect } from 'react'
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
<strong > {'Номер договора: ' + номер_договора} </strong>
<p></p>
<strong > {'Номер телефона: ' + номер_телефона} </strong>
<p></p>
<strong > {'Серийный номер SIM-Card: ' + серийный_номер_сим_карты} </strong>
<p></p>
<strong > {'Дата заключения: ' + дата_заключения} </strong>
<p></p>
<strong > {'Дата расторжения: ' + дата_расторжения} </strong>
<p></p>
<strong > {'Код подключенного тарифа: ' + код_тарифа_FK} </strong>
<p></p>
<strong > {'Номер клиента оформленного договора: ' + номер_клиента_FK} </strong>
<p></p>
{user.isAuthenticated ? (
<button onClick={() => deleteItem({ номер_договора })}>Удалить</button>
) : (
""
)}
</div>
))}
</React.Fragment>
)
}
export default Dogovor