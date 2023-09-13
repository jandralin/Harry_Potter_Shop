import React, { useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import ProductList from "../components/ProductList";
import { fetchProducts, fetchTypes } from "../http/productAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const { product } = useContext(Context)

    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(true)

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
        fetchProducts(null, 1, 10).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        }).finally(() => setLoading1(false))
    }, [])

    useEffect(() => {
        fetchProducts(product.selectedType.id, product.page, 10).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        }).finally(() => setLoading(false))
    }, [product.page, product.selectedType])

    if (loading || loading1) {
        return <Spinner animation={"grow"} />
    }

    return (
        <Container>
            <Row >

                <Col>
                    <TypeBar />
                    <Col className="fon" >
                        <ProductList />
                        <Pages />
                    </Col>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
