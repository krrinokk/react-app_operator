import React from 'react'
const ТарифCreate = ({user, addТариф }) => {
const handleSubmit = (e) => {
e.preventDefault()
const  min_mezhgorod  = e.target.elements.минута_межгород_стоимость.value
    const    min_mir  = e.target.elements.минута_международная_стоимость.value
        const  name  = e.target.elements.название_тарифа.value
        const  price  = e.target.elements.стоимость_перехода.value
        const  tip_tarifa  = e.target.elements.код_типа_тарифа_FK.value
        const  kod_tarifa  = e.target.elements.код_тарифа.value
        const  status  = e.target.elements.статус.value
        const  date_start  = e.target.elements.дата_открытия.value

        const Тариф = { минута_межгород_стоимость: min_mezhgorod, минута_международная_стоимость: min_mir, название_тарифа: name,
        стоимость_перехода:price, код_типа_тарифа_FK:tip_tarifa, код_тарифа:kod_tarifa, статус:status, дата_открытия:date_start }
const createТариф = async () => {
const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(Тариф)
}
const response = await fetch("https://localhost:7061/api/тарифs/",

requestOptions)

return await response.json()
.then((data) => {
console.log(data)
// response.status === 201 && addDogovor(data)
if (response.ok) {
addТариф(data)
e.target.elements.минута_межгород_стоимость.min_mezhgorod= ""
e.target.elements.минута_международная_стоимость.min_mir = ""
e.target.elements.название_тарифа.name = ""
e.target.elements.стоимость_перехода.price = ""
e.target.elements.код_типа_тарифа_FK.tip_tarifa = ""
e.target.elements.код_тарифа.kod_tarifa = ""
e.target.elements.статус.status = ""
e.target.elements.дата_открытия.date_start = ""

}
},
(error) => console.log(error)
)
}
createТариф()
}
return (
    <>
    {user.isAuthenticated ? (
      <>
<h3>Открытие нового тарифного плана:</h3>
<form onSubmit={handleSubmit}>
<label>Код тарифа: </label>
<input type="number" name="код_тарифа" placeholder="Введите код_тарифа:" /> <br></br>
<label>Стоимость минуты разговора в роуминге: </label>
<input type="number" name="минута_международная_стоимость"  placeholder="Введите минута_международная_стоимость:" /><br></br>
<label>Стоимость минуты разговора между городами: </label>
<input type="number" name="минута_межгород_стоимость"  placeholder="Введите минута_межгород_стоимость:" /><br></br>
<label>Название тарифа: </label>
<input type="text" name="название_тарифа"  placeholder="Введите название_тарифа:" /><br></br>
<label>Ежемесячная плата за тариф: </label>
<input type="number" name="стоимость_перехода"  placeholder="Введите стоимость_перехода:" /><br></br>
<label>Код типа тарифа: </label>
<input type="number" name="код_типа_тарифа_FK"  placeholder="Введите код_типа_тарифа_FK:" /><br></br>
<label>Статус: </label>
<input type="text" name="статус"  placeholder="Введите статус:" /><br></br>
<label>Дата открытия: </label>
<input type="date" name="дата_открытия"  placeholder="Введите дата_открытия:" /><br></br>
<button type="submit">Создать</button>
</form>
</>
      ) : (
        ""
      )}
    </>
  )
}
export default ТарифCreate