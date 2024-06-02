import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { useCookies } from 'react-cookie';

const FacultyEdit = () => {
    const initialFormState = {
        name: '',
        budgetPlaces: '',
        totalPlaces: ''
    };
    const [faculty, setFaculty] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();
    const [cookies] = useCookies(['XSRF-TOKEN']);

    useEffect(() => {
        if (id !== 'new') {
            fetch(`/getFaculty/${id}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setFaculty(data)
                });
        }
    }, [id, setFaculty]);

    const handleChange = (event) => {
        const { name, value } = event.target

        setFaculty({ ...faculty, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch(`/faculty${faculty.id ? `/${faculty.id}` : ''}`, {
            method: (faculty.id) ? 'PUT' : 'POST',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(faculty),
            credentials: 'include'
        });
        setFaculty(initialFormState);
        navigate('/getFaculties/1');
    }

    const title = <h2>{faculty.id ? 'Edit Faculty' : 'Add Faculty'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={faculty.name || ''}
                               onChange={handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="budgetPlaces">Budget places</Label>
                        <Input type="number" name="budgetPlaces" id="budgetPlaces" value={faculty.budgetPlaces || ''}
                               onChange={handleChange} autoComplete="address-level1"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="totalPlaces">Total places</Label>
                        <Input type="number" name="totalPlaces" id="totalPlaces" value={faculty.totalPlaces || ''}
                               onChange={handleChange} autoComplete="address-level1"/>
                    </FormGroup>
                    {/*<div className="row">
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="stateOrProvince">State/Province</Label>
                            <Input type="text" name="stateOrProvince" id="stateOrProvince" value={faculty.stateOrProvince || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="country">Country</Label>
                            <Input type="text" name="country" id="country" value={faculty.country || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="country">Postal Code</Label>
                            <Input type="text" name="postalCode" id="postalCode" value={faculty.postalCode || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                    </div>*/}
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/getFaculties/1">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default FacultyEdit;