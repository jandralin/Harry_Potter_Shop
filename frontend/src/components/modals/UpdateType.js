import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { fetchTypes, updateType } from "../../http/productAPI";

const UpdateType = observer(({ show, onHide }) => {

    const { product } = useContext(Context)

    const [name, setName] = useState('')

    //Флаги выбора параметров (выбран для изменения или нет)
    const [choiceName, setChoiseName] = useState(false)

    useEffect(() => {
        fetchTypes().then(data => {
            product.setTypes(data)
        })
    }, [])

    const onSwitchActionName = () => { setChoiseName(!choiceName); };

    const updType = () => {
        const formData = new FormData()
        if (choiceName) {
            formData.append('name', name)
            updateType(product.selectedType.id, "Name", formData).then(data => onHide())
        }

        if (!(choiceName)) { console.log("Не будет изменено") }
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
            <Button className="Btv_4" onClick={updType}>Изменить</Button>

            <Modal.Title className="headmodal">
                Изменить тип
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

            <div className="param">
                <p className="vv">Измените параметры:</p>

                <Form.Switch className="plus" onChange={onSwitchActionName} />
                <Form.Control className="num3"
                    disabled={!choiceName}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Название типа"
                />
            </div>

        </Modal>
    );
});

export default UpdateType;