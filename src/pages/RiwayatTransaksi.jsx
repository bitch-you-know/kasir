import { Button, Card, CardBody, CardFooter, CardHeader, ListGroup, ListGroupItem } from "react-bootstrap"
import NavbarComponent from "../components/Navbar"
import { axiosinstance } from "../lib/axios"
import { useEffect, useState } from "react"

const RiwayatTransaksi = () => {
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
                <Card style={{ width: '60%', height: '60%', marginTop: '10rem' }}>
                    <CardHeader>
                        Riwayat transaksi
                    </CardHeader>
                    <CardBody>
                        {Array.isArray(pesanans) && pesanans.length > 0 ? (
                            <ListGroup>
                                {pesanans.map((list) => (
                                    <ListGroupItem key={list.id}>
                                        <strong>pesanan No {list.id}</strong>
                                          {list.items.map(item=>(
                                            <h1>{item.id}</h1>
                                          ))}
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
        </div>
    )
}

export default RiwayatTransaksi
