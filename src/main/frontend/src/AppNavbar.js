import React, {useEffect, useState} from 'react';
import {Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import {useCookies} from "react-cookie";

const AppNavbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState([]);
    const [cookies] = useCookies(['XSRF-TOKEN']);

    useEffect(() => {
        fetch(`/getUser`)
            .then(response => response.json())
            .then(data => setUser(data));
    }, [setUser]);

    const logOut = async () => {
        await fetch(`/logOut`, {
            method: 'POST',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            fetch(`/getUser`)
                .then(response => response.json())
                .then(data => setUser(data))
        });
    }

    return (
        <Navbar  className="navbar navbar-expand-lg">
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            <NavbarToggler onClick={() => {
                setIsOpen(!isOpen)
            }}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="navbar-nav mr-auto" style={{width: "100%"}} navbar>
                    <NavItem>
                        <NavLink href="/getFaculties/1">Faculty List</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/faculty/new">Add new Faculty</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/getUsers">User List</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/registerForFaculties">Register for faculties</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/logIn">Log in</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/" onClick={() => logOut()}>Log out</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{color: "currentColor"}}>{user.name}</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default AppNavbar;