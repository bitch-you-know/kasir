import { Col, Card, Button, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { axiosinstance } from '../lib/axios';
import { useSelector } from 'react-redux';
import { ConvertToContext } from '../components/ConvertToContext';
import '../App.css';

const ListProducts = ({ addList }) => {
  const [products, setProduct] = useState([]);
  const menu = useSelector((store) => store.category.menu);
  const { formatRupiah } = useContext(ConvertToContext);

  const getProduct = async () => {
    try {
      const result = await axiosinstance.get(`/products?category.nama=${menu}`);
      setProduct(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [menu]);

  return (
    <Col>
      <h4>Daftar Products</h4>
      <hr />
      <Row>
        {products.map((list) => (
          <Col key={list.id} md={4} xs={6} className="mb-4">
            <Card id='gg' className="card h-60 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
              <Card.Img className="custom-card-img" variant="top" src={`public/images/${list.category.nama}/${list.gambar}`} />
              <Card.Body className="d-flex flex-column flex-grow-1">
                <Card.Title><h5>{list.nama}</h5>({list.kode})</Card.Title>
                {formatRupiah(list.harga)}
              </Card.Body>
              <Card.Footer>
                <Button style={{ cursor: 'pointer' }} onClick={() => addList(list)} size='sm' variant="primary">Tambah Pesanan</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default ListProducts;
