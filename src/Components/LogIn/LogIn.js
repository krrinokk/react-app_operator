import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Checkbox, Form, Input, Modal } from 'antd';


const LogIn = ({ user, setUser }) => {
  const [open, setOpen] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const navigate = useNavigate()

  const showModal = () => {
    setOpen(true);
  };
  
  useEffect(() => {
    showModal()
  }, [])

  const logIn = async (formValues) => {
    console.log("Success:", formValues)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formValues.email,
        password: formValues.password,
        rememberme: formValues.remember,
      }),
    }
    return await fetch(
      "api/account/login",
      requestOptions
    )
      .then((response) => {
         const getUser = async () => {
            return await fetch("api/account/isauthenticated")
              .then((response) => {
                response.status === 401 &&
                  setUser({ isAuthenticated: false, userName: "", userRole:"" })
                return response.json()
              })
              .then(
                (data) => {
                  if (
                    typeof data !== "undefined" &&
                    typeof data.userName !== "undefined" &&
                    typeof data.userRole !== "undefined"
                  ) {
                    setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole })
                  }
                },
                (error) => {
                  console.log(error)
                }
              )
          }
          getUser()
        // console.log(response.status)
        response.status === 200 &&
          setUser({ isAuthenticated: true, userName: "", userRole: "" })
        return response.json()
      })
      .then(
        (data) => {
          console.log("Data:", data)
          if (
            typeof data !== "undefined" &&
            typeof data.userName !== "undefined"
          ) {
            setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole})
            navigate("/")
          }
          typeof data !== "undefined" &&
            typeof data.error !== "undefined" &&
            setErrorMessages(data.error)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  const renderErrorMessage = () =>
    errorMessages.map((error, index) => <div key={index}>{error}</div>)

    const handleCancel = () => {
      console.log("Clicked cancel button")
      setOpen(false)
      navigate("/")
    }
    return (
      <>
      <Modal open={open} onCancel={handleCancel} footer={[null]}>
        {user.isAuthenticated ? (
          <h3>Пользователь {user.userName} успешно вошел в систему</h3>   ) : (
          <>
            <h3>Вход</h3>
            <Form 
            onFinish={logIn}
            name="basic"
            labelCol={{span: 8,}}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinishFailed={renderErrorMessage}
            autoComplete="off">
      <Form.Item label="Username" name="email" placeholder="Логин"
            rules={[
             {
               required: true,
               message: 'Please input your username!',
             },
                  ]}
      >
           <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" placeholder="Пароль" 
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
                   ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8,span: 16, }}>
              <Checkbox>Remember me</Checkbox>
              {renderErrorMessage()}
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
      <Button type="primary" htmlType="submit">Войти</Button>
      </Form.Item>
            </Form>          
          </>
        )}
        </Modal>
      </>
    )
  }
  
  export default LogIn