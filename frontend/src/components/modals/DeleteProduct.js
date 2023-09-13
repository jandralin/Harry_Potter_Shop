import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Spinner } from "react-bootstrap";
import { Context } from "../../index";
import { deleteProduct, fetchProducts } from "../../http/productAPI";
import { observer } from "mobx-react-lite";

const DeleteProduct = observer(({ show, onHide }) => {


    const { product } = useContext(Context)

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchProducts(null, null, 60).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        }).finally(() => setLoading(false))
    }, [])
    if (loading) {
        return <Spinner animation={"grow"} />
    }

    const delProduct = () => {
        deleteProduct(product.selectedProduct.id).then(data => onHide())
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
            <Button className="Btv_4" onClick={delProduct}>Удалить</Button>
            <Modal.Title className="headmodal">
                Удалить товар
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
                                    <Dropdown.Item
                                        onClick={() => product.setSelectedProduct(prod)}
                                        key={prod.id}
                                    >
                                        {prod.name}
                                    </Dropdown.Item>
                                </li>
                            )}
                        </div>
                    </li>
                </ul>
            </div>

        </Modal>
    );
});

export default DeleteProduct;

