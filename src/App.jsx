import NavbarComponent from "./components/NavbarComponent"
import { Col, Row, Container, DropdownDivider } from "react-bootstrap"
import ListCategories from "./components/ListCategories"
import { Component } from "react"
import { API_URL } from "./lib/constants"
import axios from "axios"


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
    }
  }

   componentDidMount(){
   axios 
   .get(API_URL+"products2")
   .then(res => {
    console.log("Rsponse : ",res)
    const menus = res.data;
    this.setState({menus})
   })
   .catch(error =>{
    console.log("eror ya bro",error)
   })
   }


  render(){
    console.log(this.state.menus)
    return(
      <div className="app">

      <NavbarComponent />
      <div className="mt-2">
        <Container fluid>
          <Row>
            <ListCategories />
            <Col>
              <h4><strong>Daftar Prodak</strong></h4>
              <div>
                <ul></ul>
              </div>
            </Col>
            <Hasil />
          </Row>
        </Container>
        <DropdownDivider/>
      
      </div>

      </div>
    )
  }
}
