import { Component, useEffect, useState, useContext } from "react";
import { Card, Col, Badge, CardBody, ListGroup, ListGroupItem, Row, CardHeader, CardFooter, Button, InputGroup } from "react-bootstrap";
import { axiosinstance } from "../lib/axios";
import { ConvertToContext } from "./ConvertToContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import { useNavigate } from "react-router-dom";

const Hasil = () => {
    const [keranjang, setKeranjang] = useState([])
    const { formatRupiah } = useContext(ConvertToContext)
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()
    const [tableNumber,setTableNumber]=useState()

    // GET KERANJANG
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
        }
    };

    // POST TO PESANAN
    const postToPesanan = async () => {
        const data = {

        }
        try {
            const result = await axiosinstance.post("/pesanans", { items: keranjang });
            if (result.status === 201) {
                console.log("Pesanan berhasil dibuat:", result);
                deleteAllKeranjangs(); // Hapus semua item di keranjang setelah pesanan berhasil dibuat
                navigate("/success")
            }
        } catch (error) {
            console.log(error);
        }
    };

    // DELETE KERANJANGS
    const deleteAllKeranjangs = async () => {
        try {
            const deletePromises = keranjang.map(item => axiosinstance.delete(`/keranjangs/${item.id}`));
            await Promise.all(deletePromises);
            console.log("Semua item keranjang berhasil dihapus.");
            setKeranjang([]); // Perbarui tampilan keranjang agar kosong
            setTotal(0); // Set total harga menjadi 0
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getKeranjangs();
    }, []);

    return (
        <Col md={3} mt={2}>
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
                                        {formatRupiah(list.total_harga)} <br />
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </CardBody>
                <CardFooter>
                    <Col>      <p>No meja</p>
                              <input type="number"/>
                            <Row><strong>Total Harga :  {formatRupiah(total)}</strong></Row>
                            <Button variant="outline-success" onClick={postToPesanan} onChange={""}>
                                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />Bayar Sekarang
                            </Button>
                    </Col>
                </CardFooter>
            </Card>
        </Col>
    )
}

export default Hasil
