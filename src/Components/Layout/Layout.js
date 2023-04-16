import {ContactsOutlined , FormOutlined, InboxOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import {  Outlet, Link } from "react-router-dom"
import React from 'react';
const { Header, Content,Footer, Sider } = Layout;
const items1 = [


  {
    label: <Link to={"/login"}       >Вход</Link>,
    key: "3",
  },
  {
    label: <Link to={"/logoff"}>Выход</Link>,
    key: "4",
  },
  {
    label: <Link to={"/register"}>Регистрация</Link>,
    key: "8",
  },

]
const items2 = [
  {
    label: <Link to={"/dogovors"}>Договора</Link>,
    key: "7",
    icon: <FormOutlined/>,
  },
  {
    label: <Link to={"/тарифs"}>Тарифы</Link>,
    key: "5",
   icon: <InboxOutlined />,
  },
  {

    label: <Link to={"/клиентs"}      >Клиенты</Link>,
    icon: <ContactsOutlined />,
    key: "6",
  },
]

const App = ({user}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        
        <Menu theme="dark" mode="horizontal" items={items1} className="menu" />
        
      </Header>

      <Layout>
        
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
          
        >
           
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
                {user.isAuthenticated ? (
<h3> <UserOutlined />Login: {user.userName}, role: {user.userRole}</h3>

) : (
<h4>Пользователь: Гость</h4>
)}
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
        <Link to={"/home"}>Главная страница</Link>
        
          </Breadcrumb>
          <Content className="site-layout" style={{ padding: "0 50px" }}>
        <Outlet />
      
      </Content>
      <Footer style={{ textAlign: 'center' }}>MO - Mobile Operator ©2023 Created by Romanova Ekaterina, 3-42 ISPU</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;