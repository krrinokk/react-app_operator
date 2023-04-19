import React, { useEffect, useState } from 'react'
import './Style.css'
import { Table, Button, Pagination, Input } from 'antd';

const Клиент = ({ user, клиентs, setКлиентs, removeКлиент }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingKey, setEditingKey] = useState('');
  const [newData, setNewData] = useState({});

  useEffect(() => {
    const getКлиентs = async () => {
      const requestOptions = {
        method: 'GET'
      }
      return await fetch("https://localhost:7061/api/клиентs/", requestOptions)
        .then(response => response.json())
        .then(
          (data) => {
            console.log('Data:', data)
            setКлиентs(data)
          },
          (error) => {
            console.log(error)
          }
        )
    }
    getКлиентs()
  }, [setКлиентs])

  const columns = [
    {
      title: 'Номер клиента',
      dataIndex: 'номер_клиента',
      key: 'номер_клиента'
    },
    {
      title: 'ФИО',
      dataIndex: 'фио',
      key: 'фио',
      sorter: (a, b) => a.фио.localeCompare(b.фио),
      sortDirections: ['ascend', 'descend'],
      
    },
    {
      title: 'Баланс',
      dataIndex: 'баланс',
      key: 'баланс',

    },
    {
      title: 'Действия',
      key: 'action',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <div>
            <Button onClick={() => save(record['номер_клиента'])} type="primary" style={{ marginRight: 8 }}>
              Сохранить
            </Button>
            <Button onClick={() => cancel()}>Отмена</Button>
          </div>
        ) : (
          <>
            {user.isAuthenticated && user.userRole === "user" ? (
              <Button onClick={() => deleteItem(record)} type="primary">Удалить</Button>
            ) : (
              ''
            )}
          </>
        );
      }
    },
  ];

  const deleteItem = async ({ номер_клиента }) => {
    const requestOptions = {
      method: 'DELETE'
    }
    return await fetch(`https://localhost:7061/api/клиентs/${номер_клиента}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          removeКлиент(номер_клиента);
        }
      },
        (error) => console.log(error)
      )
  }

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const клиентsPage = клиентs.slice(startIndex, endIndex);

  const isEditing = (record) => record['номер_клиента'] === editingKey;

  const edit = (record) => {
    setNewData(record);
    setEditingKey(record['номер_клиента']);
  };

  const cancel = () => {
    setEditingKey('');
    setNewData({});
  };

  const save = async (номер_клиента) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    }
    return await fetch(`https://localhost:7061/api/клиентs/${номер_клиента}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          setEditingKey('');
          setNewData({});
          const updatedКлиентs = клиентs.map((item) => {
            if (item['номер_клиента'] === номер_клиента) {
              return { ...item, ...newData };
            }
            return item;
          });
          setКлиентs(updatedКлиентs);
        }
      },
        (error) => console.log(error)
      )
  };

  return (
    <React.Fragment>

               
      <h3>Клиентская база</h3>
      <Table
        dataSource={клиентsPage}
        columns={columns}
        rowKey="номер_клиента"
        pagination={false}
      />
      <Pagination
        current={currentPage}
        onChange={handleChangePage}
        total={клиентs.length}
        pageSize={pageSize}
        style={{ marginTop: '16px', textAlign: 'center' }}
      />
    </React.Fragment>
  )
}

export default Клиент