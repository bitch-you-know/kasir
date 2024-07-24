import NavbarComponent from "../components/NavbarComponent";
import ListCategories from "../components/ListCategories";
import Hasil from "../components/Hasil";
import { Container, Row, Col, DropdownDivider } from 'react-bootstrap';
import ListProducts from "../components/ListProducts";
import { ConvertContextProvider } from "../components/ConvertToContext";
import { axiosinstance } from "../lib/axios";
import { useEffect } from "react";

const DashBoard = () => {
  const addKeranjang = async (list) => {
    const keranjangItem = {
      jumlah: 1,
      nama: list.nama,
      total_harga: list.harga,
      product: list
    };

    try {
      const result = await axiosinstance.post("keranjangs", keranjangItem);
      if (result.status === 201) {
        
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ConvertContextProvider>
      <NavbarComponent />
      <Container fluid>
        <Row>
          <ListCategories />
          <ListProducts addList={addKeranjang} />
          <Hasil response={""}/>
        </Row>
      </Container>
      <DropdownDivider />
    </ConvertContextProvider>
  );
};

export default DashBoard;

