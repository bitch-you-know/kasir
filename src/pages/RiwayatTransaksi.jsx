import { Card, CardBody, CardFooter, CardHeader, ListGroup, ListGroupItem } from "react-bootstrap"
import NavbarComponent from "../components/NavbarComponent"
import { axiosinstance } from "../lib/axios"
import { useEffect, useState } from "react"

const RiwayatTransaksi = () => {
    const [pesanans, setPesanans] = useState([])

    const getPesanans = async () => {
        try {
            const result = await axiosinstance.get("pesanans")
            if (result.status == 200) {
                console.log(result.data)
                setPesanans(result)
            }
        } catch (error) {
            console.log()
        }
    }

    useEffect(() => {
        getPesanans()

    }, [])

    return (
        <>
            <NavbarComponent />
            <div className="d-flex justify-content-center " style={{ height: '100vh' }} >
                <Card style={{ width: '60%', height: '60%', marginTop: '10rem' }}>
                    <CardHeader>
                        Riwayat transaksi
                    </CardHeader>
                    <CardBody>
                    {/* <ListGroup>
                {pesanans && pesanans.map((list) => (
                    <ListGroup.Item 
                        key={list.id} 
                    >
                        {list.nama} {list.nama}
                    </ListGroup.Item>
                ))}
            </ListGroup> */}
                    </CardBody>
                    <CardFooter>

                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default RiwayatTransaksi