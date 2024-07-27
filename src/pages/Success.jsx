import React from 'react';
import NavbarComponent from "../components/Navbar";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Succes = () => {
    const navigate = useNavigate()
const toDashboardPages = ()=>{
    navigate("/")
}

    return (
        <>
            <NavbarComponent />
            <div className="d-flex justify-content-center " style={{ height: '100vh' }}>
                
                <div style={{ width: '50%', height: '60%', marginTop: '5rem' }}>
              
                    <img src="/images2/Success.png" alt="Success" style={{ width: '50%', height: 'auto' }} />
                    <h3>PEMBAYARAN TELAH BERHASIL</h3>
                    <p><strong>silahkan cek di Riwayat transaksi</strong></p>
                    <Button onClick={toDashboardPages} >kembali</Button>
                </div>
                
            </div>
        </>
    )
}

export default Succes;

