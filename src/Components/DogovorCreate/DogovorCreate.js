import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { Input, Button, Space, Modal } from 'antd';

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const DogovorCreate = ({ user, addDogovor }) => {
  const [visible, setVisible] = useState(false);

  const handleCreate = () => {
    setVisible(true);
  };

  const handleOk = () => {
    const nom_dogv = document.getElementById('nom_dogv').value;
    const nom_tel = document.getElementById('nom_tel').value;
    const sim_card = document.getElementById('sim_card').value;
    const data0 = document.getElementById('data0').value;
    const data1 = document.getElementById('data1').value;
    const kod_tarifa = document.getElementById('kod_tarifa').value;
    const nomer_client = document.getElementById('nomer_client').value;

    const Dogovor = {
      номер_договора: nom_dogv,
      номер_телефона: nom_tel,
      серийный_номер_сим_карты: sim_card,
      дата_заключения: data0,
      дата_расторжения: data1,
      код_тарифа_FK: kod_tarifa,
      номер_клиента_FK: nomer_client,
    };

    const createDogovor = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Dogovor),
      };
      const response = await fetch('https://localhost:7061/api/dogovors/', requestOptions);
      const data = await response.json();
      if (response.ok) {
        addDogovor(data);
        setVisible(false);
        document.getElementById('create-form').reset();
      }
    };
    createDogovor();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      {user.isAuthenticated && user.userRole === 'user' ? (
        <>
          <h3>Заключение нового договора</h3>
          <Space wrap>
        
            <Button type="primary" onClick={handleCreate}>
             Заключить новый договор
            </Button>
            <br></br>
          </Space>
          <Modal title="Заключение нового договора" visible={visible} onOk={handleOk} onCancel={handleCancel}>
            <form id="create-form">
              <label>Номер_договора: </label>
              <Input type="number" id="nom_dogv" placeholder="Введите Номер_договора:" /> <br></br>
              <label>Номер_телефона: </label>
              <Input type="text" id="nom_tel" placeholder="Введите Номер_телефона:" />
              <br></br>
              <label>Серийный_номер_сим_карты: </label>
              <Input type="text" id="sim_card" placeholder="Введите Серийный_номер_сим_карты:" />
              <br></br>
              <label>Дата_заключения: </label>
              <DatePicker onChange={onChange} id="data0" placeholder="Введите дата_заключения:" />
              <br></br>
              <label>Дата_расторжения: </label>
              <DatePicker onChange={onChange} id="data1" placeholder="Введите дата_расторжения:" />
              <br></br>
              <label>Код_тарифа_FK: </label>
              <Input type="number" id="kod_tarifa" placeholder="Введите Код_тарифа_FK:" />
              <br></br>
              <label>Номер_клиента_FK: </label>
              <Input type="number" id="nomer_client" placeholder="Введите Номер_клиента_FK:" />
              <br></br>
            </form>
          </Modal>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default DogovorCreate;