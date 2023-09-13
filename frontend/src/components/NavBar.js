import React, { useContext } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from "../utils/consts";
import { Button, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom'
import emblem from "./img/emblem.png";
import bask from "./img/cart.svg";
import SearchProduct from './modals/SearchProduct';

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const history = useHistory()
    const { product } = useContext(Context)

    console.log(user.isAuth)
    console.log(user.isAdmin)
    //console.log(localStorage.getItem('token'))

    const logOut = () => {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
        history.push(SHOP_ROUTE)
    }

    const homepage = () => {
        product.setSelectedType("")
        product.setPage(1)
    }

    return (
        <Navbar>
            <div className="search"><SearchProduct /></div>
            <Container className="navb">
                <NavLink className="navbar-brand"
                    onClick={() => homepage()}
                    to={SHOP_ROUTE}
                >
                    <img src={emblem} alt="emblem" width="140" height="140" /></NavLink>
                {user.isAuth ?
                    <Nav className="navbar-wrap">
                        <div> </div>
                        <Nav className="navbar-menu">
                            {user.isAdmin ?
                                <Button className="admin"
                                    onClick={() => history.push(ADMIN_ROUTE)}
                                >
                                    Админ панель
                                </Button> :
                                <Button className="bask"
                                    onClick={() => history.push(BASKET_ROUTE)}>
                                    <img src={bask} alt="bask" />
                                </Button>
                            }

                            <Button className="exit"
                                onClick={() => logOut()}
                            >
                                Выйти
                            </Button>
                        </Nav>
                    </Nav>
                    :
                    <Nav className="navbar-wrap">
                        <Nav className="navbar-menu">
                            <Button className="avto"
                                onClick={() => history.push(LOGIN_ROUTE)}

                            >Авторизация
                            </Button>
                        </Nav>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});
export default NavBar;