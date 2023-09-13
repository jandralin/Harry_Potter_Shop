import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";


const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data)
            user.setIsAuth(true)
            if (data.role === "ADMIN") {
                user.setIsAdmin(true)
            }
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }


    }
    return (
        <Container
            className="ramka"
        >
            <Card className="card">
                <div className="mauto">{isLogin ? 'Авторизация' : "Регистрация"}</div>
                <Form className="form">
                    <Form.Control
                        className="fr"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="frm"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="Bt">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink className="Btt" to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink className="Btt" to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button className="Btv"

                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});


export default Auth;
