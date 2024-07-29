import { axiosinstance } from "./lib/axios"
import DashBoard from "./pages/Dashboard"
import { useEffect } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom"
import OrderList from "./pages/OrderList"
import { ConvertContextProvider } from "./components/ConvertToContext"
import Succes from "./pages/Success"



const App = () => {

  return (
    <>
    <ConvertContextProvider>
      <Routes>
        <Route element={<DashBoard />} path="/" />
        <Route element={<OrderList />} path="/riwayat"/>
        <Route element={<Succes />} path="/Success" />
      </Routes>
    </ConvertContextProvider>
    </>
    



  )
}

export default App