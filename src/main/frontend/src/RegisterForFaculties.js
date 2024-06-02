import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, ButtonGroup, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {useCookies} from 'react-cookie';
import Select from 'react-select'

const RegistrationForm = () => {
    const initialFormState = {
        selectedFaculties: '',
        mark1: '',
        mark2: '',
        mark3: '',
        avgCerMark: ''
    };
    const [registrationForm, setRegistrationForm] = useState(initialFormState);
    const [faculties, setFaculties] = useState([]);
    const navigate = useNavigate();
    const [cookies] = useCookies(['XSRF-TOKEN']);

    useEffect(() => {
        fetch(`/getFacultiesWithoutUser`)
            .then(response => response.json())
            .then(data => {
                setFaculties(data);
                console.log(data);
            });
    }, [setFaculties]);

    const handleChange = (data) => {
        if(!data?.length) {
            setRegistrationForm({ ...registrationForm, [data.target.name]: data.target.value })
            return;
        }
        setRegistrationForm({...registrationForm, selectedFaculties: data.map(el => el.value)})
        /*data.forEach(element => {
            const {label: name, value} = element;
            setRegistrationForm({...registrationForm, selectedFaculties: value})
        })*/
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(registrationForm);
        await fetch(`/registerForFaculties`, {
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



    const facultyList = faculties?.map(faculty => ({
        value: faculty.id,
        label: faculty.name
    }));

    const title = <h2>Registration for faculties</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="row">
                        <Select options={facultyList} onChange={handleChange} name="selectedFaculties" isMulti/>
                        {/*<select style={{width: 300, height: 300}} name="faculties" multiple="multiple">
                            {facultyList}
                        </select>*/}
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="mark1">Mark1</Label>
                            <Input type="number" name="mark1" id="mark1"
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="mark2">Mark2</Label>
                            <Input type="number" name="mark2" id="mark2"
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="mark3">Mark3</Label>
                            <Input type="number" name="mark3" id="mark3"
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="avgCerMark">Avg certificate mark</Label>
                            <Input type="number" name="avgCerMark" id="avgCerMark"
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