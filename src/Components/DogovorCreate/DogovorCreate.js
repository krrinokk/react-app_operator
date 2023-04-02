import React from 'react'
const DogovorCreate = ({user, addDogovor }) => {
const handleSubmit = (e) => {
e.preventDefault()
const  nom_dogv  = e.target.elements.номер_договора.value
        const nom_tel  = e.target.elements.номер_телефона.value
        const  sim_card  = e.target.elements.серийный_номер_сим_карты.value
        const  data0  = e.target.elements.дата_заключения.value
        const  data1  = e.target.elements.дата_расторжения.value
        const  kod_tarifa  = e.target.elements.код_тарифа_FK.value
        const  nomer_client  = e.target.elements.номер_клиента_FK.value

        const Dogovor = { номер_договора: nom_dogv, номер_телефона: nom_tel, серийный_номер_сим_карты: sim_card, дата_заключения:data0, дата_расторжения:data1, 
            код_тарифа_FK: kod_tarifa, номер_клиента_FK:nomer_client }
const createDogovor = async () => {
const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(Dogovor)
}
const response = await fetch("https://localhost:7061/api/dogovors/",

requestOptions)

return await response.json()
.then((data) => {
console.log(data)
// response.status === 201 && addDogovor(data)
if (response.ok) {
addDogovor(data)
e.target.elements.номер_договора.nom_dogv= ""
e.target.elements.номер_телефона.nom_tel = ""
e.target.elements.серийный_номер_сим_карты.sim_card = ""
e.target.elements.дата_заключения.data0 = ""
e.target.elements.дата_расторжения.data1= ""
e.target.elements.код_тарифа_FK.kod_tarifa= ""
e.target.elements.номер_клиента_FK.nomer_client= ""
}
},
(error) => console.log(error)
)
}
createDogovor()
}
return (
    <>
    {user.isAuthenticated ? (
      <>
<h3>Заключение нового договора</h3>
<form onSubmit={handleSubmit}>
<label>Номер_договора: </label>
<input type="number" name="номер_договора" placeholder="Введите Номер_договора:" /> <br></br>
<label>Номер_телефона: </label>
<input type="text" name="номер_телефона"  placeholder="Введите Номер_телефона:" /><br></br>
<label>Серийный_номер_сим_карты: </label>
<input type="text" name="серийный_номер_сим_карты"  placeholder="Введите Серийный_номер_сим_карты:" /><br></br>
<label>Дата_заключения: </label>
<input type="date" name="дата_заключения" placeholder="Введите Дата_заключения:" /><br></br>
<label>Дата_расторжения: </label>
<input type="date" name="дата_расторжения" placeholder="Введите Дата_расторжения:" /><br></br>
<label>Код_тарифа_FK: </label>
<input type="number" name="код_тарифа_FK" placeholder="Введите Код_тарифа_FK:" /><br></br>
<label>Номер_клиента_FK: </label>
<input type="number" name="номер_клиента_FK" placeholder="Введите Номер_клиента_FK:" /><br></br>

<button type="submit">Создать</button>
</form>

</>
      ) : (
        ""
      )}
    </>
  )
}
export default DogovorCreate