import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {createType} from "../../http/productAPI";

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('')
    
    const addType = () => {
        createType({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }

    return (
        <Modal className="modal"
            show={show}
            onHide={onHide}
            centered
            style={{ height: 700, width: 900 }}
        >
            <Button className="Btv4" style={{background:'#de4212'}} onClick={onHide}>Закрыть</Button>
            <Button className="Btv_4" onClick={addType}>Добавить</Button>
            
                
            <Modal.Header>
                <Modal.Title className="headmodal">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        className="nametype"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название типа"}
                    />
                </Form>
            </Modal.Body>
            
        </Modal>
    );
};

export default CreateType;