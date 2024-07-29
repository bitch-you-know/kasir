import { Button, Card, CardBody, CardFooter, CardHeader, ListGroup, ListGroupItem, Modal } from "react-bootstrap"
import NavbarComponent from "../components/Navbar"
import { axiosinstance } from "../lib/axios"
import { useEffect, useState } from "react"

const OrderList = () => {
    const [pesanans, setPesanans] = useState([])

    const getPesanans = async () => {
        try {
            const result = await axiosinstance.get("pesanans")
            if (result.status === 200) {
                setPesanans(result.data)
                console.log(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPesanans()
    }, [])

    useEffect(() => {
        console.log(pesanans)
    }, [pesanans])

    return (
        <div>
            <NavbarComponent />
            <div className="d-flex justify-content-center " style={{ height: '100vh' }}>
                <Card style={{ width: '60%', height: '100vh', marginTop: '10rem' }}>
                    <CardHeader>
                        Riwayat transaksi
                    </CardHeader>
                    <CardBody>
                        {Array.isArray(pesanans) && pesanans.length > 0 ? (
                            <ListGroup>
                                {pesanans.map((pesanan) => (
                                    <ListGroupItem key={pesanan.id}>
                                        <h3><strong>Nomor meja : {pesanan.noMeja}</strong></h3>

                                        <Button className="ms-2"> Detail</Button>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        ) : (
                            <p>Tidak ada riwayat transaksi</p>
                        )}
                    </CardBody>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </div>

             <Modal>
                
             </Modal>
        </div>
    )
}

export default OrderList
