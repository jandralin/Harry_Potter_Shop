import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Context } from '..';
import { deleteBasket, getBasket } from '../http/productAPI';
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import line from "../components/img/brown-line.svg"

const Basket = observer((onHide) => {
    const { product } = useContext(Context)

    const [delflag, setdelflag] = useState(false)
    useEffect(() => {
        getBasket().then(data => product.setBaskets(data))
        setdelflag(false);
    }, [delflag])


    const del = (id) => {
        deleteBasket(id).then(data => onHide())
        console.log(id)
        setdelflag(true);
    }

    const bye = (id) => {
        alert('Покупка успешно совершена!')
    }
    const dbye = (id) => {
        alert('Сначала добавьте товары в корзину!')
    }

    let prices = 0;
    {
        product.basket.map(price =>
            prices += Number(price.product.price)
        )
    }
    return (
        <Container
            className="fon">
            <h1 className="hh">Корзина</h1>
            <div className="line"><img src={line} /></div>

            <div className="div1">
                <h1 className="pr2">Итого: {prices} $</h1>

            </div>
            <div className="line"><img src={line} /></div>

            {product.basket.map(productt =>
                <Card className="baskets" key={productt.id}>
                    <Row >
                        <div className="btv7"><Button className="btv8" onClick={() => del(productt.id)}>Х</Button></div>
                        <Col>
                            <div className="zenz">
                                <div className="zen">{productt.product.price} $</div>
                            </div>
                            <div className="text">{productt.product.name}</div>
                        </Col>
                        <Col >
                            <div className="d-flex flex-row align-items-center">
                                <img src={process.env.REACT_APP_API_URL + productt.product.img} width={200} height={200} />

                            </div>


                        </Col>

                    </Row>

                </Card>
            )}
            <div className="line"><img src={line} /></div>
            {prices > 0 ?
                <Button className="aaa" onClick={bye}>Купить</Button>
                : <Button className="aaa" onClick={dbye}>Купить</Button>}
        </Container>
    );
});

export default Basket;