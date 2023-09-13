import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import { createProduct, fetchProducts, fetchTypes } from "../../http/productAPI";
import { observer } from "mobx-react-lite";

const CreateProduct = observer(({ show, onHide }) => {
    const { product } = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    const [delflag, setdelflag] = useState(false)
    useEffect(() => {
        fetchProducts(null, null, 60).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [delflag])

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addProduct = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('typeId', product.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createProduct(formData).then(data => onHide())

        setdelflag(true)
    }

    function changeVisibility(sid) {

        var elem = document.getElementById(sid);
        var typedisp = window.getComputedStyle(elem, null).display;
        typedisp = typedisp === 'block' ? 'none' : 'block';
        elem.style.display = typedisp;
    }


    return (
        <Modal className="modal"
            show={show}
            onHide={onHide}
            centered
            style={{ height: 700, width: 900 }}
        >
            <Button className="Btv4" style={{ background: '#de4212' }} onClick={onHide}>Закрыть</Button>
            <Button className="Btv_4" onClick={addProduct}>Добавить</Button>
            <Modal.Title className="headmodal">
                Добавить товар
            </Modal.Title>
            <div className="wer">
                <div className="lhalf">
                    <ul className="dropdown2">
                        <li class="drop" >
                            <Dropdown.Toggle className="nameproduct2" onClick={() => { changeVisibility("givenName2") }}>
                                {product.selectedType.name || "Выберите тип"}
                            </Dropdown.Toggle>
                            <div id="givenName2" onClick={() => { changeVisibility("givenName2") }}
                                style={{ display: 'none' }}>
                                {product.types.map(type =>
                                    <li> <Dropdown.Item

                                        onClick={() => product.setSelectedType(type)}
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item></li>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>

                <Form.Control
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="num31"
                    placeholder="Введите название товара"
                />
                <Form.Control
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="num31"
                    placeholder="Введите стоимость товара $"
                    type="number"
                />
                <Form.Control
                    className="num32"
                    type="file"
                    onChange={selectFile}
                />
                <hr />
                <Button
                    onClick={addInfo}
                    className="num33"
                >
                    Добавить описание
                </Button>
                {info.map(i =>
                    <Row className="selecttype" key={i.number}>
                        <Col md={4}>
                            <Form.Control className="selecttyped"
                                value={i.title}
                                onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                placeholder="Введите название свойства"
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control className="selecttyped"
                                value={i.description}
                                onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                placeholder="Введите описание"
                            />
                        </Col>
                        <Col md={4}>
                            <Button
                                onClick={() => removeInfo(i.number)}
                                className="delete"
                            >
                                Удалить
                            </Button>
                        </Col>
                    </Row>
                )}</div>
        </Modal>
    );
});

export default CreateProduct;

