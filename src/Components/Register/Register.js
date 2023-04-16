import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button,  Form, Input, Modal } from 'antd';
import LogOff from "../LogOff/LogOff";


const Register = ({ user, setUser }) => {
  const [open, setOpen] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const navigate = useNavigate()
  const showModal = () => {
    setOpen(true);
  };
  
  useEffect(() => {
    showModal()
  }, [])
  
  const Register = async (formValues) => {
    console.log("Success:", formValues)


    // console.log(email.value, password.value)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formValues.email,
        password: formValues.password,
        passwordConfirm: formValues.passwordConfirm,
      }),
    }
    return await fetch(
      "api/account/register",
      requestOptions
    )
      .then((response) => {
        // console.log(response.status)
        response.status === 200 &&
          setUser({ isAuthenticated: true, userName: "" })
        return response.json()
      })
      .then(
        (data) => {
          console.log("Data:", data)
          if (
            typeof data !== "undefined" &&
            typeof data.userName !== "undefined"
          ) {
            setUser({ isAuthenticated: true, userName: data.userName })
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
    <Modal open={open} onCancel={handleCancel} onOk={LogOff} footer={[null]}>
        {user.isAuthenticated ? (
          <h3>Оператор {user.userName} успешно зарегистрирован.</h3>   ) : (
          <>
            <h3>Вход</h3>
            <Form 
            onFinish={Register}
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
      <Form.Item label="PasswordConfirm" name="passwordConfirm" placeholder="Пароль"
      rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
                   ]}
        >
   <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
      <Button type="primary" htmlType="submit">Зарегистрироваться</Button>
      </Form.Item>
            </Form>          
          </>
        )}
        </Modal>
    
      {renderErrorMessage()}
    </>
  )
}

export default Register