import { Badge, Button, Card, CardBody, CardFooter, CardHeader, ListGroup, ListGroupItem, Modal } from "react-bootstrap"
import NavbarComponent from "../components/Navbar"
import { axiosinstance } from "../lib/axios"
import { useEffect, useState } from "react"

const OrderList = () => {
    const [pesanans, setPesanans] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const closeModal = () => setOpenModal(false)
    const [selectDetais, setSelectDetails] = useState(null)
    const getPesanans = async () => {
        try {
            const result = await axiosinstance.get("/pesanans")
            if (result.status === 200) {
                setPesanans(result.data)
                console.log(result)
                
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleOpenModal = (id) => {
        setOpenModal(true)
        setSelectDetails(id)
    }
    const handleAccept =async (data) => {
        try {
            const acceptById=await axiosinstance.post("transsaction",data)
            await acceptDelete(data)
            await getPesanans()
            console.log(data)
        } catch (error) {
             console.log(error)
        }
    }
    const acceptDelete=async(data)=>{
         try {
            const accDelete=await axiosinstance.delete(`/pesanans/${data.id}`)
         } catch (error) {
            console.log(error)
         }
    }
    useEffect(() => {
        getPesanans()
    }, [])



    return (
        <div>
            <NavbarComponent />
            <div className="d-flex justify-content-center " style={{ height: '100vh' }}>
                <Card style={{ width: '60%', height: '100vh', marginTop: '10rem' }}>
                    <CardHeader>
                        <h1><strong>Order List</strong></h1>
                    </CardHeader>
                    <CardBody>
                        {Array.isArray(pesanans) && pesanans.length > 0 ? (
                            <ListGroup className="">
                                {pesanans.map((pesanan) => (
                                    <ListGroupItem key={pesanan.id}>
                                        <h3><strong>Nomor meja : {pesanan.noMeja}</strong></h3>
                                       
                                           {pesanan.items.map((foods)=>(
                                         <ListGroupItem>
                                            {foods.nama} <Badge>{foods.jumlah}</Badge>
                                            <br />
                                            
                                         </ListGroupItem>
                                           ))}
                                      
                                       <Button variant="success" onClick={()=>{handleAccept(pesanan)}}>accept</Button>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        ) : (
                            <p>Belum ada list Order</p>
                        )}
                    </CardBody>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </div>

            
        </div >
    )
}

export default OrderList
