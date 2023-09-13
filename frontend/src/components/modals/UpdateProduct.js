import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { createInfo, fetchOneProduct, fetchProducts, fetchTypes, updateInfo, updateProduct } from "../../http/productAPI";

const UpdateProduct = observer(({ show, onHide }) => {

    const { product } = useContext(Context)

    const [oneProduct, setOneProduct] = useState({ info: [] })

    const [name, setName] = useState('')
    const [img, setImg] = useState(null)
    const [price, setPrice] = useState(null)
    const [info, setInfo] = useState([])

    //Флаги выбора параметров (выбран для изменения или нет)
    const [choiceName, setChoiseName] = useState(false)
    const [choiceImg, setChoiceImg] = useState(false)
    const [choiceInfo, setChoiceInfo] = useState(false)
    const [choiceType, setChoiceType] = useState(false)
    const [choicePrice, setChoicePrice] = useState(false)


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
        setImg(e.target.files[0])
    }

    useEffect(() => {
        fetchProducts(product.selectedType.id, null, 60).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })

        fetchTypes().then(data => {
            product.setTypes(data)
        })
    }, [])


    const onSwitchActionName = () => { setChoiseName(!choiceName); };
    const onSwitchActionImg = () => { setChoiceImg(!choiceImg); };
    const onSwitchActionInfo = () => { setChoiceInfo(!choiceInfo); };
    const onSwitchActionType = () => { setChoiceType(!choiceType); };
    const onSwitchActionPrice = () => { setChoicePrice(!choicePrice); };

    const updProduct = () => {
        const formData = new FormData()

        if (choiceName) {
            formData.append('name', name)
            updateProduct(product.selectedProduct.id, "Name", formData).then(data => onHide())
        }
        if (choiceImg) {
            formData.append('img', img)
            updateProduct(product.selectedProduct.id, "Img", formData).then(data => onHide())
        }
        if (choicePrice) {
            formData.append('price', `${price}`)
            updateProduct(product.selectedProduct.id, "Price", formData).then(data => onHide())
        }
        if (choiceInfo) {
            let flag
            info.map(i => {
                flag = 0
                oneProduct.info.map((info) => {

                    if (info.title === i.title) {
                        console.log("Изменить" + i.title + " id: " + info.id)
                        const formData = new FormData()
                        formData.append('description', i.description)
                        updateInfo(info.id, "info", formData).then(data => onHide())
                        flag = 1
                    }
                })

                if (flag === 0) {
                    console.log("Добавить" + i.title)
                    const formData = new FormData()
                    formData.append('title', i.title)
                    formData.append('description', i.description)
                    createInfo(product.selectedProduct.id, "info", formData).then(data => onHide())

                }
            }
            )
        }
        if (choiceType) {
            formData.append('type', product.selectedType.id)
            updateProduct(product.selectedProduct.id, "Type", formData).then(data => onHide())
        }


        if (!(choiceName || choiceImg || choiceInfo ||
            choiceType || choicePrice)) { console.log("Не будет изменено") }
    }


    const selectProd = (prod) => {
        product.setSelectedProduct(prod)
        fetchOneProduct(prod.id).then(data => setOneProduct(data))
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
            <Button className="Btv_4" onClick={updProduct}>Изменить</Button>
            <Modal.Title className="headmodal">
                Изменить товар
            </Modal.Title>
            <div className="lhalf">
                <ul className="dropdown">
                    <li class="drop" >
                        <Dropdown.Toggle className="nameproduct" onClick={() => { changeVisibility("givenName") }}>
                            {product.selectedProduct.name || "Выберите товар"}
                        </Dropdown.Toggle >
                        <div id="givenName" onClick={() => { changeVisibility("givenName") }}
                            style={{ display: 'none' }}>

                            {product.products.map(prod =>
                                <li>
                                    <Dropdown.Item id="givenName"
                                        onClick={() => selectProd(prod)}
                                        key={prod.id}>

                                        {prod.name}
                                    </Dropdown.Item>
                                </li>
                            )}
                        </div>
                    </li>
                </ul>
            </div>

            <div className="param">
                <p className="vv">Измените параметры:</p>
                <Row>


                </Row>
                <Form.Switch onChange={onSwitchActionName} className="plus" />
                <Form.Control
                    disabled={!choiceName}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="num3"
                    placeholder="Название товара"
                />

                <Form.Switch className="plus" onChange={onSwitchActionType} />
                <div className="lhalf">
                    <ul className="dropdown2">
                        <li class="drop" >
                            <Dropdown.Toggle disabled={!choiceType} className="nameproduct2" onClick={() => { changeVisibility("givenName2") }}>
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

                <p className="vv1">Изображение:</p>
                <Form.Switch className="plus1" onChange={onSwitchActionImg} />
                <Form.Control className="num4" disabled={!choiceImg} type="file" onChange={selectFile} />

                <p className="vv1"></p>
                <Col>
                    <Form.Switch className="plus" onChange={onSwitchActionPrice} />
                    <Form.Control
                        disabled={!choicePrice}
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="num3"
                        placeholder="Стоимость">
                    </Form.Control>
                </Col>
                <Col>


                </Col>
                <Form.Switch className="plus" onChange={onSwitchActionInfo} />
                <Dropdown.Toggle className="num3" disabled={!choiceInfo}
                    onClick={addInfo}
                >
                    Добавить/изменить описание
                </Dropdown.Toggle>

                <Dropdown>
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

                    )}
                </Dropdown>
            </div>
        </Modal>
    );
})

export default UpdateProduct;
