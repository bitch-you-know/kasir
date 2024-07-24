import { Component, useEffect, useState } from "react";
import { Card, Col, Button, CardBody, ListGroup, ListGroupItem } from "react-bootstrap";
import { axiosinstance } from "../lib/axios";
const Hasil = () => {
    const [keranjang,setKeranjang] =useState([])

    const getKeranjangs = async () => {
        try {
            const result = await axiosinstance.get("/keranjangs");
           
           if(result.status === 200){
            console.log(result)
            setKeranjang(result.data)

           }
        } catch (error) {
            console.log(error);
        }
    };

 useEffect(()=>{
    getKeranjangs()
 },[])

    return (


        
            <Col md={3} mt={2}>
                <h4>Hasil</h4>
                <hr />
                <Card>
                    {keranjang.map((list)=>(
                      <ListGroup key={list.id}>
                        <ListGroupItem>
                           {list.id} {list.nama}
                        </ListGroupItem>
                      </ListGroup>
                    ))}
                </Card>
            </Col>
       

    )
}


export default Hasil
