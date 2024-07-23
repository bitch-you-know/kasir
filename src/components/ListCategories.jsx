import { Col, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { axiosinstance } from "../lib/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCoffee, faChess } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

// Fungsi untuk memilih ikon yang sesuai
const getIcon = (nama) => {
    if (nama.toLowerCase() === "makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
    if (nama.toLowerCase() === "minuman") return <FontAwesomeIcon icon={faCoffee} className="mr-2" />;
    if (nama.toLowerCase() === "cemilan") return <FontAwesomeIcon icon={faChess} className="mr-2" />;
};

const ListCategories = () => {
    const [categories, setCategories] = useState([]);
    const [valueCategory, setValueCategory] = useState("");
    const dispatch = useDispatch();

    const getCategories = async () => {
        try {
            const result = await axiosinstance.get("/categories");
            setCategories(result.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleCategoryClick = (category) => {
        console.log('Clicked category:', category);
        setValueCategory(category);
        if (category === "Makanan") {
            dispatch({ type: "SET_MINUMAN" });
        } else if (category === "Minuman") {
            dispatch({ type: "SET_MINUMAN" });
        } else if (category === "Cemilan") {
            dispatch({ type: "SET_CEMILAN" });
        }
    };

    return (
        <Col md={2}>
            <h4>Daftar Kategori</h4>
            <hr />
            <ListGroup>
                {categories && categories.map((list) => (
                    <ListGroup.Item 
                        key={list.id} 
                        onClick={() => handleCategoryClick(list.nama)} 
                        style={{ cursor: 'pointer' }}
                    >
                        {getIcon(list.nama)} {list.nama}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Col>
    );
};

export default ListCategories;

