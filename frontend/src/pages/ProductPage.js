import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { addToBasket, fetchOneProduct } from "../http/productAPI";
import line from "../components/img/brown-line.svg"
import { Context } from '..';

const ProductPage = () => {
    const { user } = useContext(Context)
    const [product, setProduct] = useState({ info: [] })
    const { id } = useParams()

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [])

    const add = () => {
        const formData = new FormData()
        formData.append('productId', id)
        addToBasket(formData).then()
    }
    const form = () => {
        alert('Корзина доступна только авторизованным пользователям!')
    }

    return (
        <Container >
            <Row className="fon">
                <Col>

                    <Image className="fonkart" src={process.env.REACT_APP_API_URL + product.img} />
                </Col>
                <div className="levo">

                    <div className="productname">{product.name}</div><div className="line"><img src={line} /></div>
                    <div className="productprice">{product.price} $</div>
                    <div className="line"><img src={line} /></div>
                    {user.isAuth ?
                        <Button className="Btv2" onClick={add} >Добавить в корзину</Button>
                        :
                        <Button className="Btv2" onClick={form} >Добавить в корзину</Button>}
                    <div className="line"><img src={line} /></div>

                    <Row className="info">
                        {product.info.map((info, index) =>
                            <Row key={info.id} style={{ background: index % 2 === 0 ? '#71532d3d' : 'transparent', padding: 10 }}>
                                {
                                    info.title
                                }: {info.description}
                            </Row>
                        )}
                    </Row> </div>
            </Row>
        </Container>
    );
};

export default ProductPage;