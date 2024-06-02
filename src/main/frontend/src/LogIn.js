import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {useCookies} from 'react-cookie';
import {Text} from "react-native";

const FacultyEdit = () => {
    const initialFormState = {
        login: '',
        password: ''
    };
    const [logIn, setLogIn] = useState(initialFormState);
    const navigate = useNavigate();
    const [cookies] = useCookies(['XSRF-TOKEN']);

    const handleChange = (event) => {
        const { name, value } = event.target

        setLogIn({ ...logIn, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch(`/logIn`, {
            method: 'POST',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logIn),
            credentials: 'include'
        });
        setLogIn(initialFormState);
        navigate('/');
    }

    const title = <h2>{'Log in'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="login">Login</Label>
                        <Input type="text" name="login" id="login" value={logIn.login || ''}
                               onChange={handleChange} autoComplete="login"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" value={logIn.password || ''}
                               onChange={handleChange} autoComplete="address-level1"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Log in</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                    <FormGroup>
                        <Text>Don`t have an account </Text>
                        <Link tag={Link} to="/userRegistration">createOne.</Link>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default FacultyEdit;