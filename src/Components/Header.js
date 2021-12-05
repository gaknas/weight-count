import React, { Component, useState } from 'react'
import { Navbar, Nav, FormControl, Container, Button, Form } from 'react-bootstrap'
import '../CSS/header.css'
import logo from "../logo.svg"

export default function Header({unauth}) {
        return (
            <>
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="">
                            <img
                                src={logo}
                                height="30"
                                width="30"
                                className="d-inline-block align-top"
                                alt="Logo"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Главная</Nav.Link>
                                <Nav.Link href="/graph">Мониторинг</Nav.Link>
                            </Nav>
                            {localStorage.getItem('login') == null ? <></> : <div id='auth-info'>Вы зашли как {localStorage.getItem('login')}</div>}
                            <Form inline >
                                {localStorage.getItem('token') ? <></> : <Button variant="outline-light" href="/login">Войти</Button>}
                                {localStorage.getItem('token') ? <></> : <Button variant="outline-light" href="/register">Регистрация</Button>}
                            </Form>
                            {localStorage.getItem('token') ? <form onSubmit={unauth} style={{display: "flex", justifyContent: "center"}}><button type="submit">Выйти</button></form> : <></>}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }