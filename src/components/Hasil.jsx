import { Component, useEffect, useState, useContext } from "react";
import { Card, Col,Badge, CardBody, ListGroup, ListGroupItem, Row, CardHeader } from "react-bootstrap";
import { axiosinstance } from "../lib/axios";
import { ConvertToContext } from "./ConvertToContext";

const Hasil = () => {
    const [keranjang, setKeranjang] = useState([])
    const { formatRupiah } = useContext(ConvertToContext)

    const getKeranjangs = async () => {
        try {
            const result = await axiosinstance.get("/keranjangs");

            if (result.status === 200) {
                console.log(result)
                setKeranjang(result.data)
               
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getKeranjangs()
    }, [])

    return (



        <Col md={3} mt={2}>
            <h3>List order</h3>
            <hr />
            <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
                <CardHeader><h3>Pesan</h3></CardHeader>
                <CardBody>
                    <ListGroup>
                        {keranjang.map((list) => (
                            <ListGroupItem key={list.id}>
                                <Row>
                                    <Col>
                                    <Badge className="rounded-circle" bg="success">{list.jumlah}</Badge>
                                    </Col>
                                    <Col>
                                    {list.nama}
                                    </Col>
                                    <Col>
                                     {formatRupiah(list.harga)}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>

                </CardBody>
            </Card>
        </Col>


    )
}


export default Hasil
