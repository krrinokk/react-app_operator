import { ContactsOutlined, FormOutlined, InboxOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, Modal, theme } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import React, { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;


const App = ({ user }) => {
  const items1 = [
    {
      label: <Link to={'/login'}>Вход</Link>,
      key: '3',
    },
    {
      label: <Link to={'/logoff'}>Выход</Link>,
      key: '4',
    },
    {
      label: <Link to={'/register'}>Регистрация</Link>,
      key: '8',
    },
    {
      label: 'Аккаунт',
      key: '9',
      onClick: () => {
        Modal.info({
          title: 'Данные аккаунта',
          content: (
            <div>
              <p>Login: {user.userName}</p>
              <p>Role: {user.userRole}</p>
            </div>
          ),
          onOk() {},
        });
      },
    },
  ];
  
  const items2 = [
    {
      label: <Link to={'/dogovors'}>Договора</Link>,
      key: '7',
      icon: <FormOutlined />,
    },
    {
      label: <Link to={'/тарифs'}>Тарифы</Link>,
      key: '5',
      icon: <InboxOutlined />,
    },
    {
      label: <Link to={'/клиентs'}>Клиенты</Link>,
      icon: <ContactsOutlined />,
      key: '6',
    },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [modalVisible, setModalVisible] = useState(false);

  const showAccountModal = () => {
    Modal.info({
      title: 'Данные аккаунта',
      content: (
        <div>
          <p>Login: {user.userName}</p>
          <p>Role: {user.userRole}</p>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />

        <Menu theme="dark" mode="horizontal" items={items1} className="menu" />

        <Button type="primary" onClick={showAccountModal}>
          Аккаунт
        </Button>
      </Header>

      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
        
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Link to={'/home'}>Главная страница</Link>
          </Breadcrumb>
          <Content className="site-layout" style={{ padding: '0 50px' }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            MO - Mobile Operator ©2023 Created by Romanova Ekaterina, 3-42 ISPU
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;