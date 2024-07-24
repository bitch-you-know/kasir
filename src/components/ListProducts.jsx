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
            <Card id='gg' className="card h-60">
              <Card.Img className="custom-card-img" variant="top" src={`public/images/${list.category.nama}/${list.gambar}`} />
              <Card.Body className="d-flex flex-column flex-grow-1">
                <Card.Title><h5>{list.nama}</h5> <p>({list.kode})</p></Card.Title>
              </Card.Body>
              <Card.Footer>
                {formatRupiah(list.harga)} <br />
                <Button onClick={() => addList(list)} size='sm' variant="primary">pesan sekarang</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default ListProducts;
