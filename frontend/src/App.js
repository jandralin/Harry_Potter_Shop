import React, { useContext, useEffect, useState } from 'react';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { Context } from "./index";
import { Spinner } from 'react-bootstrap';
import { observer } from "mobx-react-lite";
import { check } from "./http/userAPI";
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';

const App = observer(() => {
  const { user } = useContext(Context)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      console.log(data.role)
      if (data.role === "ADMIN") {
        user.setIsAdmin(true)
      }
      user.setUser(data)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={"grow"} />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
