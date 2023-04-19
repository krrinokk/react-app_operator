import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import { Pagination } from 'antd';
import './Style.css';

const Dogovor = ({ user, dogovors, setDogovors, removeDogovor }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const getDogovors = async () => {
      const requestOptions = {
        method: 'GET',
      };
      return await fetch('https://localhost:7061/api/dogovors/', requestOptions)
        .then(response => response.json())
        .then(
          data => {
            console.log('Data:', data);
            setDogovors(data);
          },
          error => {
            console.log(error);
          }
        );
    };
    getDogovors();
  }, [setDogovors]);

  const deleteItem = async ({ номер_договора }) => {
    const requestOptions = {
      method: 'DELETE',
    };
    return await fetch(`api/dogovors/${номер_договора}`, requestOptions).then(
      response => {
        if (response.ok) {
          removeDogovor(номер_договора);
        }
      },
      error => console.log(error)
    );
  };

  const columns = [
    {
      title: 'Номер договора',
      dataIndex: 'номер_договора',
      key: 'номер_договора',
    },
    {
      title: 'Номер телефона',
      dataIndex: 'номер_телефона',
      key: 'номер_телефона',
    },
    {
      title: 'Серийный номер SIM-Card',
      dataIndex: 'серийный_номер_сим_карты',
      key: 'серийный_номер_сим_карты',
    },
    {
      title: 'Дата заключения',
      dataIndex: 'дата_заключения',
      key: 'дата_заключения',
      sorter: (a, b) => a.дата_заключения.localeCompare(b.дата_заключения),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Дата расторжения',
      dataIndex: 'дата_расторжения',
      key: 'дата_расторжения',
      sorter: (a, b) => a.дата_расторжения.localeCompare(b.дата_расторжения),
  sortDirections: ['ascend', 'descend'],

    },
    {
      title: 'Код подключенного тарифа',
      dataIndex: 'код_тарифа_FK',
      key: 'код_тарифа_FK',
    },
    {
      title: 'Номер клиента оформленного договора',
      dataIndex: 'номер_клиента_FK',
      key: 'номер_клиента_FK',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (text, record) => (
        <Space wrap>
          {user.isAuthenticated && user.userRole === 'user' ? (
            <Button onClick={() => deleteItem(record)} type="primary">
              Удалить
            </Button>
          ) : (
            ''
          )}
        </Space>
      ),
    },
  ];
  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  const filteredData = dogovors.filter((item, index) => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return index >= start && index < end;
  });

  return (
    <React.Fragment>
       <br></br>
          
            
      <h3>Список договоров</h3>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="номер_договора"
        pagination={false}
      />
   <Pagination
        current={currentPage}
        onChange={handleChangePage}
        total={dogovors.length}
        pageSize={pageSize}
        style={{ marginTop: '16px', textAlign: 'center' }}
      />
    </React.Fragment>
  );
};

export default Dogovor;