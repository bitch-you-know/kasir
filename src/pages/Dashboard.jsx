import NavbarComponent from "../components/NavbarComponent";
import ListCategories from "../components/ListCategories";
import Hasil from "../components/Hasil";
import { Container, Row, Col, DropdownDivider } from 'react-bootstrap';
import ListProducts from "../components/ListProducts";
import { axiosinstance } from "../lib/axios";
import swal from "sweetalert";
const DashBoard = () => {


  const addKeranjang = async (list) => {
    const keranjangItem = {
      jumlah: 1,
      nama: list.nama,
      total_harga: list.harga,
      product: list
    };

    try {
      // Cek apakah produk dengan ID yang sama sudah ada di keranjang
      const getResult = await axiosinstance.get(`/keranjangs?product.id=${list.id}`);

      if (getResult.data.length === 0) {
        // Jika tidak ada, tambahkan produk ke keranjang
        const result = await axiosinstance.post("/keranjangs", keranjangItem);
        if (result.status === 201) {
          console.log("Produk berhasil ditambahkan ke keranjang.");
        }
      } else {
        // Jika sudah ada, update jumlah produk di keranjang
        const existingItem = getResult.data[0];
        const updatedItem = {
          ...existingItem,
          jumlah: existingItem.jumlah + 1 ,
          total_harga:existingItem.total_harga + list.harga
        };

        const updateResult = await axiosinstance.put(`/keranjangs/${existingItem.id}`, updatedItem);
        if (updateResult.status === 200) {
          console.log("Jumlah produk di keranjang berhasil diperbarui.");
        }
      }
      swal("Berhasil Di tambahkan", "You clicked the button!", "success")
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <Row>
          <ListCategories />
          <ListProducts addList={addKeranjang} />
          <Hasil response={""} />
        </Row>
      </Container>
      <DropdownDivider />
    </>
  );
};

export default DashBoard;

