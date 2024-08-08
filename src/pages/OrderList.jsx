import { Button, Card, CardBody, CardFooter, CardHeader, ListGroup, ListGroupItem, Modal } from "react-bootstrap"
import NavbarComponent from "../components/Navbar"
import { axiosinstance } from "../lib/axios"
import { useEffect, useState } from "react"

const OrderList = () => {
    const [pesanans, setPesanans] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const closeModal = () => setOpenModal(false)
    const [selectDetais,setSelectDetails]=useState(null)
    const getPesanans = async () => {
        try {
            const result = await axiosinstance.get("pesanans")
            if (result.status === 200) {
                setPesanans(result.data)
                console.log(result)
                console.log(selectDetais)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleOpenModal = (id) => {
        setOpenModal(true)
        setSelectDetails(id)
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
                        Riwayat transaksi
                    </CardHeader>
                    <CardBody>
                        {Array.isArray(pesanans) && pesanans.length > 0 ? (
                            <ListGroup>
                                {pesanans.map((pesanan) => (
                                    <ListGroupItem key={pesanan.id}>
                                        <h3><strong>Nomor meja : {pesanan.noMeja}</strong></h3>


                                        <Button onClick={()=>{handleOpenModal(pesanan.items)}} className="ms-2"> Detail</Button>
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

            <Modal show={openModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Array.isArray(selectDetais) && selectDetais.length > 0 ? (
                    <ListGroup>
                            {selectDetais.map((detail)=>(
                            <ListGroupItem key={detail.id}>{detail.nama}</ListGroupItem>
                        ))}
                  
                    </ListGroup>
                    ):(<p>gada</p>)}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>

            </Modal.Footer>
        </Modal>
        </div >
    )
}

export default OrderList
