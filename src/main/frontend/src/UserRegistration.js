import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {useCookies} from 'react-cookie';

const RegistrationForm = () => {
    const initialFormState = {
        login: '',
        password: '',
        role: 'USER',
        name: '',
        email: '',
        city: '',
        region: '',
        educationalInstitution: '',
        blocked: false,
    };
    const [registrationForm, setRegistrationForm] = useState(initialFormState);
    const navigate = useNavigate();
    const [cookies] = useCookies(['XSRF-TOKEN']);

    const handleChange = (event) => {
        const { name, value } = event.target

        setRegistrationForm({ ...registrationForm, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(registrationForm);
        await fetch(`/userRegistration`, {
            method: 'POST',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationForm),
            credentials: 'include'
        });
        setRegistrationForm(initialFormState);
        navigate('/');
    }

    const title = <h2>Registration</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="login">Login</Label>
                            <Input type="text" name="login" id="login" value={registrationForm.login || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" value={registrationForm.password || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" value={registrationForm.name || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" value={registrationForm.email || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="city">City</Label>
                            <Input type="text" name="city" id="city" value={registrationForm.city || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="region">Region</Label>
                            <Input type="text" name="region" id="region" value={registrationForm.region || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-6 mb-3">
                            <Label for="educationalInstitution">Educational institution</Label>
                            <Input type="text" name="educationalInstitution" id="educationalInstitution"
                                   value={registrationForm.educationalInstitution || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Create</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default RegistrationForm;