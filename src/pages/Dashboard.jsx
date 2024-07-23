import NavbarComponent from "../components/NavbarComponent"
import ListCategories from "../components/ListCategories"
import Hasil from "../components/Hasil"
import {Container,Row,Col,DropdownDivider} from 'react-bootstrap'
import ListProducts from "../components/ListProducts"

const DashBoard= () => {
  
    
   


  return(
    <div className="app">

      <NavbarComponent />
      
      
        <Container fluid>
          <Row>
            <ListCategories className="" />
            
             <ListProducts/>
            
            <Hasil />
            
            
          </Row>
          
        </Container>
        <DropdownDivider/>
      
      

      </div>
  )
}

export default DashBoard
