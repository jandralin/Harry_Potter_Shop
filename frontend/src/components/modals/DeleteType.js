import React, { useContext, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown } from "react-bootstrap";
import { Context } from "../../index";
import { fetchTypes, deleteType } from "../../http/productAPI";
import { observer } from "mobx-react-lite";

const DeleteType = observer(({ show, onHide }) => {


    const { product } = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => {
            product.setType(data)
        })
    }, [])

    const delType = () => {
        deleteType(product.selectedType.id).then(data => onHide())
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
            <Button className="Btv_4" onClick={delType}>Удалить</Button>

            <Modal.Title className="headmodal">
                Удалить тип
            </Modal.Title>
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

        </Modal>
    );
});

export default DeleteType;