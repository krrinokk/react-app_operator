import React, { useState } from 'react';
import 'antd/dist/reset.css';
import { Input, Button, Modal } from 'antd';
import { ContactsOutlined } from '@ant-design/icons';

const КлиентCreate = ({ user, addКлиент }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [номер_клиента, setНомерКлиента] = useState("");
  const [баланс, setБаланс] = useState("");
  const [фио, setФИО] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const Клиент = { номер_клиента: номер_клиента, фио: фио, баланс: баланс };
    const createКлиент = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Клиент)
      };
      const response = await fetch("api/клиентs/", requestOptions);
      return await response.json().then(
        (data) => {
          console.log(data);
          if (response.ok) {
            addКлиент(data);
            setНомерКлиента("");
            setБаланс("");
            setФИО("");
            setIsModalVisible(false);
          }
        },
        (error) => console.log(error)
      );
    };
    createКлиент();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {user.isAuthenticated && user.userRole === "user" ? (
        <>
          <h3>Добавление нового клиента в клиентскую базу</h3>
          <Button type="primary" onClick={showModal}>
            Создать
          </Button>
          <br></br>
     
          <Modal
            title="Добавление нового клиента"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <label>Номер клиента: </label>
            <Input
              type="number"
              name="номер_клиента"
              placeholder="Введите номер клиента"
              value={номер_клиента}
              onChange={(e) => setНомерКлиента(e.target.value)}
            />
            <br />
            <label>Баланс: </label>
            <Input
              type="number"
              name="баланс"
              placeholder="Введите баланс"
              value={баланс}
              onChange={(e) => setБаланс(e.target.value)}
            />
            <br />
            <label>ФИО: </label>
            <Input
              type="text"
              icon={<ContactsOutlined />}
              name="фио"
              placeholder="Введите ФИО"
              value={фио}
              onChange={(e) => setФИО(e.target.value)}
            />
            <br />
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default КлиентCreate;