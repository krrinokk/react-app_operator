import React, { useState } from 'react'
import { Button, Modal, Input } from 'antd';

const ТарифCreate = ({ user, addТариф }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Тариф, setТариф] = useState({
    минута_межгород_стоимость: "",
    минута_международная_стоимость: "",
    название_тарифа: "",
    стоимость_перехода: "",
    код_типа_тарифа_FK: "",
    код_тарифа: "",
    статус: "",
    дата_открытия: ""
  })

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const createТариф = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Тариф)
      }
      const response = await fetch("https://localhost:7061/api/тарифs/", requestOptions)

      return await response.json()
        .then((data) => {
          console.log(data)
          if (response.ok) {
            addТариф(data)
            setIsModalVisible(false);
            setТариф({
              минута_межгород_стоимость: "",
              минута_международная_стоимость: "",
              название_тарифа: "",
              стоимость_перехода: "",
              код_типа_тарифа_FK: "",
              код_тарифа: "",
              статус: "",
              дата_открытия: ""
            })
          }
        },
          (error) => console.log(error)
        )
    }
    createТариф()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setТариф({ ...Тариф, [e.target.name]: e.target.value })
  }

  return (
    <>
      {user.isAuthenticated && user.userRole === "admin" ? (
        <>
          <h3><strong>Открытие нового тарифного плана:</strong></h3>
    
          <Button type="primary" onClick={showModal}>Создать</Button>

          <Modal title="Создание нового тарифа" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <label>Кода тарифа: </label>
            <Input type="number" name="код_тарифа" placeholder="Введите код тарифа" value={Тариф.код_тарифа} onChange={handleChange} /><br></br>
            <label>Стоимость минуты разговора в роуминге: </label>
            <Input type="number" name="минута_международная_стоимость" placeholder="Введите стоимость минуты в роуминге" value={Тариф.минута_международная_стоимость} onChange={handleChange} /><br></br>
            <label>Стоимость минуты разговора между городами: </label>
            <Input type="number" name="минута_межгород_стоимость" placeholder="Введите стоимость минуты разговора между городами" value={Тариф.минута_межгород_стоимость} onChange={handleChange} /><br></br>
            <label>Название тарифа: </label>
            <Input type="text" name="название_тарифа" placeholder="Введите название тарифа" value={Тариф.название_тарифа} onChange={handleChange} /><br></br>
            <label>Ежемесячная плата за тариф: </label>
            <Input type="number" name="стоимость_перехода" placeholder="Введите плату за тариф, в рублях" value={Тариф.стоимость_перехода} onChange={handleChange} /><br></br>
            <label>Код типа тарифа: </label>
            <Input type="number" name="код_типа_тарифа_FK" placeholder="Введите код типа тарифа" value={Тариф.код_типа_тарифа_FK} onChange={handleChange} /><br></br>
            <label>Статус: </label>
            <Input type="text" name="статус" placeholder="Введите статус" value={Тариф.статус} onChange={handleChange} /><br></br>
            <label>Дата открытия: </label>
            <Input type="date" name="дата_открытия" placeholder="Введите дату открытия тарифа" value={Тариф.дата_открытия} onChange={handleChange} /><br></br>
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  )
}

export default ТарифCreate