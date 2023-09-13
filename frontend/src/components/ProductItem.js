import React from 'react';
import { Row, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom"
import { PRODUCT_ROUTE } from "../utils/consts";

const ProductItem = ({ product }) => {
    const history = useHistory()
    return (
        <Col className="prpage" onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}>
            <Row className="card">
                <Image className="improd" src={process.env.REACT_APP_API_URL + product.img} />
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div className="price" >{product.price} $</div>
                    </div>
                </div>
                <div>{product.name} </div>
            </Row>
        </Col>
    );
};

export default ProductItem;