import NavbarComponent from "./components/NavbarComponent"
import { Col, Row, Container, DropdownDivider } from "react-bootstrap"
import ListCategories from "./components/ListCategories"
import Hasil from "./components/Hasil"
import { Component } from "react"
import { API_URL } from "./lib/constants"
import axios from "axios"
import Menus from "./components/Menus"


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
    }
  }

  componentDidMount() {
    axios
      .get(API_URL + "products")
      .then(res => {
        const menus = res.data;
        this.setState({ menus })
        console.log(menus)
      })
      .catch(error => {
        console.log("eror ya bro", error)
      })
  }


  render() {
   const {menus} =this.state
   
    return (
      <div className="app">

        <NavbarComponent />
        <div className="mt-2">
          <Container fluid>
            <Row>
              <ListCategories />
              <Col>
                <h4><strong>Daftar Prodak</strong></h4>
                <hr/>
                <Row>
                  {menus && menus.map((menu)=>(
                    <h2>{menu.nama}</h2>
                  ))}
              </Row>
              </Col>
              
              <Hasil />
            </Row>
          </Container>
          <DropdownDivider />

        </div>

      </div>
    )
  }
}
