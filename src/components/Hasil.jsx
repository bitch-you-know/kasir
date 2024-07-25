import { Component, useEffect, useState, useContext } from "react";
import { Card, Col, Badge, CardBody, ListGroup, ListGroupItem, Row, CardHeader, CardFooter, Button } from "react-bootstrap";
import { axiosinstance } from "../lib/axios";
import { ConvertToContext } from "./ConvertToContext";
import { faUtensils, faCoffee, faChess } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart";

const Hasil = () => {
    const [keranjang, setKeranjang] = useState([])
    const { formatRupiah } = useContext(ConvertToContext)
    const [total, setTotal] = useState([])


    const getKeranjangs = async () => {
        try {
            const result = await axiosinstance.get("/keranjangs");
            const totalPrice = result.data.reduce((accumulator, current) => accumulator + current.total_harga, 0);
            if (result.status === 200) {
                console.log(result)
                setKeranjang(result.data)
                
                setTotal(totalPrice)
            }
        } catch (error) {
            console.log(error);
        }};

    const deleteKeranjangs = async(id)=>{
          try {
            const result =await axiosinstance.delete(`keranjangs/${id}`)
            console.log("Item keranjang berhasil dihapus:", result.data);
            getKeranjangs()
          } catch (error) {
            console.log(error.message)
          }
    }

    useEffect(() => {
        getKeranjangs()
    }, [])

    return (



        <Col  md={3} mt={2}>
            <h3>List order</h3>
            <hr />
            <Card id="card" className="shadow p-3 mb-5 bg-body-tertiary rounded">
                <CardHeader><h3>Pesan</h3></CardHeader>
                <CardBody>
                    <ListGroup>
                        {keranjang.map((list) => (
                            <ListGroupItem key={list.id}>
                                <Row>
                                    <Col className="p-1 m-1 g-col-6">
                                        <Badge className="rounded-circle" bg="success">{list.jumlah}</Badge>
                                    </Col>
                                    <Col>
                                        {list.nama}
                                    </Col>
                                    <Col>
                                        {formatRupiah(list.total_harga)}
                                        <Button onClick={() => deleteKeranjangs(list.id)} className="btn btn-danger btn-sm">Hapus</Button>
                                        
                                    </Col>                                   
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </CardBody>
                <CardFooter>

                    <Col>              
                        <Row><strong>Total Harga :  {total}</strong></Row> 
                        <Button  variant="outline-success"> <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />Bayar Sekarang</Button>            
                    </Col>

                </CardFooter>
            </Card>
        </Col>


    )
}


export default Hasil
