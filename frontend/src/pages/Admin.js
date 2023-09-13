import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import CreateProduct from "../components/modals/CreateProduct";
import CreateType from "../components/modals/CreateType";
import DeleteProduct from '../components/modals/DeleteProduct';
import DeleteType from '../components/modals/DeleteType';
import UpdateType from '../components/modals/UpdateType';
import UpdateProduct from '../components/modals/UpdateProduct';

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)
    const [deleteProduct, setDeleteProduct] = useState(false)
    const [deleteType, setDeleteType] = useState(false)
    const [updateType, setUpdateType] = useState(false)
    const [updateProduct, setUpdateProduct] = useState(false)

    return (
        <Container className="adminpan">
            <div className="tex">Панель администратора</div>
            <Button
                className="admbut"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                className="admbut"
                onClick={() => setDeleteType(true)}
            >
                Удалить тип
            </Button>
            <Button
                className="admbut"
                onClick={() => setUpdateType(true)}
            >
                Изменить тип
            </Button>
            <Button
                className="admbut"
                onClick={() => setProductVisible(true)}
            >
                Добавить товар
            </Button>
            <Button
                className="admbut"
                onClick={() => setDeleteProduct(true)}
            >
                Удалить товар
            </Button>
            <Button
                className="admbut"
                onClick={() => setUpdateProduct(true)}
            >
                Изменить товар
            </Button>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <DeleteProduct show={deleteProduct} onHide={() => setDeleteProduct(false)} />
            <DeleteType show={deleteType} onHide={() => setDeleteType(false)} />
            <UpdateType show={updateType} onHide={() => setUpdateType(false)} />
            <UpdateProduct show={updateProduct} onHide={() => setUpdateProduct(false)} />
        </Container>
    );
};

export default Admin;