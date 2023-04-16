import React from 'react';
import { Navigate } from 'react-router-dom';



import { Layout, Row, Col, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Home = (user) => {


  const { Content } = Layout;
  const { Meta } = Card;

  return (user.isAuthenticated ?
    <Navigate to={{ pathname: '/home' }} /> :

    <Layout>
    
      <Content>
        <Row style={{ padding: 20 }}>
          <Col span="4"></Col>
          <Col span="4"></Col>
        </Row>

        <Row style={{ padding: 20 }}>
          <Col span="4"></Col>
          <Col style={{ padding: 10 }} span="4">

            <Card
              cover={
                <img
                  alt="ИГЭУ"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkRWe1Ab9khWO5r95E0q3IFWSYxuk1XBF4KXx2cPwvZ4K6yyKsJKxAHREM8_GIT_3rHC0&usqp=CAU"
                  height="150px"
                />
              }
              actions={[
                <a href="http://ispu.ru/" > <SearchOutlined key="ellipsis" /></a>
              ]}
            >

              <Meta title="ИГЭУ"/>
            </Card>
          </Col>

          <Col style={{ padding: 10 }} span="4">

            <Card
              cover={
                <img
                  alt="Ant.Design"
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                  height="150px"
                />
              }
              actions={[
                <a href="https://ant.design/" > <SearchOutlined key="ellipsis" /></a>
              ]}
            >

              <Meta title="Ant.Design"/>

            </Card>
          </Col>

          <Col style={{ padding: 10 }} span="4">

            <Card
              cover={
                <img
                  alt="React"
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                  height="150px"

                />
              }
              actions={[
                <a href="https://reactjs.org/" > <SearchOutlined key="ellipsis" /></a>
              ]}
            >

              <Meta title="React"/>

            </Card>
          </Col>

          <Col style={{ padding: 10 }} span="4">

            <Card
              cover={
                <img
                  alt="ИВТФ"
                  src="http://ivt.ispu.ru/images/logo/2.gif"
                  height="150px"
                  width="50px"
                />
              }
              actions={[
                <a href="http://ivt.ispu.ru/" > <SearchOutlined key="ellipsis" /></a>
              ]}
            >

              <Meta title="ИВТФ"/>

           </Card>
          </Col>
        </Row>
      </Content>


    </Layout>
  );
};
export default Home;