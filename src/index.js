import React, { useEffect,useState } from 'react'
import ReactDOM from "react-dom/client"
import { Navigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'antd/dist/reset.css';
import Dogovor from './Components/Dogovor/Dogovor'
import DogovorCreate from './Components/DogovorCreate/DogovorCreate'

import Тариф from './Components/Тариф/Тариф'
import ТарифCreate from './Components/ТарифCreate/ТарифCreate'

import Клиент from './Components/Клиент/Клиент'
import КлиентCreate from './Components/КлиентCreate/КлиентCreate'

import Layout from "./Components/Layout/Layout"
import LogIn from "./Components/LogIn/LogIn"
import Register from './Components/Register/Register'
import LogOff from './Components/LogOff/LogOff'
import Home from './Components/Home/Home'
const App = () => {

const [dogovors, setDogovors] = useState([])
const addDogovor = (dogovor) => setDogovors([...dogovors, dogovor])
const removeDogovor = (removeId) => setDogovors(dogovors.filter(({ номер_договора }) => номер_договора
!== removeId));

const [тарифs, setТарифs] = useState([])
const addТариф = (тариф) => setТарифs([...тарифs, тариф])
const removeТариф = (removeId) => setТарифs(тарифs.filter(({ код_тарифа }) => код_тарифа
!== removeId));

const [клиентs, setКлиентs] = useState([])
const addКлиент = (клиент) => setКлиентs([...клиентs, клиент])
const removeКлиент= (removeId) => setКлиентs(клиентs.filter(({ номер_клиента }) => номер_клиента
!== removeId));

const [user, setUser] = useState({ isAuthenticated: false, userName: "",userRole: "" })
useEffect(() => {
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
}, [setUser])



return (
<BrowserRouter>
<Routes>
<Route path='/' element={<Layout user={user}/>}>
<Route index element={<Navigate to ="/home"
element={<Home user={user} setUser={setUser} />}
/>} />
<Route
path="/dogovors"
element={
<>
<DogovorCreate user={user}
addDogovor={addDogovor}/>
<Dogovor user={user}
dogovors={dogovors}
setDogovors={setDogovors}
removeDogovor={removeDogovor}
/>
</>
}
/>

<Route
path="/тарифs"
element={
<>
<ТарифCreate user={user}
addТариф={addТариф}/>
<Тариф user={user}
тарифs={тарифs}
setТарифs={setТарифs}
removeТариф={removeТариф}
/>
</>
}
/>

<Route
path="/клиентs"
element={
<>
<КлиентCreate user={user}
addКлиент={addКлиент}/>
<Клиент user={user}
клиентs={клиентs}
setКлиентs={setКлиентs}
removeКлиент={removeКлиент}
/>
</>
}
/>


<Route path="/login"
element={<LogIn user={user} setUser={setUser} />}
/>
<Route path="/register"
element={<Register user={user} setUser={setUser} />}
/>
<Route path="/logoff"
element={<LogOff user={user} setUser={setUser} />}
/>
<Route path="/home"
element={<Home user={user} setUser={setUser} />}
/>
<Route path="*" element={<h3>404</h3>} />
</Route>
</Routes>
</BrowserRouter>
)
}


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
// <React.StrictMode>
<App />
// </React.StrictMode>
)