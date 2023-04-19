import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Pagination } from 'antd';
import './Style.css';

const Тариф = ({ user }) => {
  const [тарифs, setТарифs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const getТарифs = async () => {
      const requestOptions = {
        method: 'GET'
      };
      return await fetch('https://localhost:7061/api/тарифs/', requestOptions)
        .then(response => response.json())
        .then(
          (data) => {
            console.log('Data:', data);
            setТарифs(data);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getТарифs();
  }, []);

  const deleteItem = async ({ код_тарифа }) => {
    const requestOptions = {
      method: 'DELETE'
    };
    return await fetch(`api/тарифs/${код_тарифа}`, requestOptions)
      .then(
        (response) => {
          if (response.ok) {
            const updatedТарифs = тарифs.filter((тариф) => тариф.код_тарифа !== код_тарифа);
            setТарифs(updatedТарифs);
          }
        },
        (error) => console.log(error)
      );
  };

  const columns = [
    {
      title: 'Код тарифа',
      dataIndex: 'код_тарифа',
      key: 'код_тарифа'
    },
    {
      title: 'Стоимость минуты разговора между городами',
      dataIndex: 'минута_межгород_стоимость',
      key: 'минута_межгород_стоимость'
    },
    {
      title: 'Стоимость минуты разговора в роуминге',
      dataIndex: 'минута_международная_стоимость',
      key: 'минута_международная_стоимость'
    },
    {
      title: 'Название тарифа',
      dataIndex: 'название_тарифа',
      key: 'название_тарифа'
    },
    {
      title: 'Плата за тариф',
      dataIndex: 'стоимость_перехода',
      key: 'стоимость_перехода'
    },
    {
      title: 'Код типа тарифа',
      dataIndex: 'код_типа_тарифа_FK',
      key: 'код_типа_тарифа_FK'
    },
    {
      title: 'Статус',
      dataIndex: 'статус',
      key: 'статус'
    },
    {
      title: 'Дата открытия',
      dataIndex: 'дата_открытия',
      key: 'дата_открытия',
      sorter: (a, b) => a.дата_открытия.localeCompare(b.дата_открытия),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Действия',
      key: 'action',
      render: (text, record) => (
        <Space wrap>
          {user.isAuthenticated && user.userRole === 'admin' ? (
            <Button onClick={() => deleteItem({ код_тарифа: record.код_тарифа })} type="primary">
              Удалить
            </Button>
          ) : (
            ''
          )}
        </Space>
      )
    }
  ];

  const handleChangePage = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const currentData = тарифs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <React.Fragment>
         
      <h3>Список тарифов:</h3>
      <Table columns={columns}  pagination={false} dataSource={currentData} rowKey="код_тарифа" />
      <Pagination
        current={currentPage}
        onChange={handleChangePage}
        total={тарифs.length}
        pageSize={pageSize}
        style={{ marginTop: '16px', textAlign: 'center' }}
      />
    </React.Fragment>
  );
};

export default Тариф;