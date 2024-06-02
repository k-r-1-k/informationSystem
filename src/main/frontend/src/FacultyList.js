import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

export default function FacultyList() {

    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cookies] = useCookies(['XSRF-TOKEN']);
    let { pageNumber } = useParams();

    useEffect(() => {
        setLoading(true);

        fetch(`/getFaculties/${pageNumber}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setFaculties(data);
                setLoading(false);
            })
    }, []);

    const reloadL = () => {
        pageNumber = parseInt(pageNumber, 10) - 1
        setLoading(true);

        fetch(`/getFaculties/${pageNumber}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setFaculties(data);
                setLoading(false);
            })
    }

    const reloadR = () => {
        pageNumber = parseInt(pageNumber, 10) + 1
        setLoading(true);

        fetch(`/getFaculties/${pageNumber}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setFaculties(data);
                setLoading(false);
            })
    }

    const remove = async (id) => {
        await fetch(`faculty/${id}`, {
            method: 'DELETE',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            fetch('/getFaculties/1')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setFaculties(data);
                    setLoading(false);
                })
        });
    }

    if (loading) {
        return <p style={{
            display: "flex",
            justifyContent: "center"
        }}>Loading...</p>;
    }


    const facultyList = faculties.map(faculty => {
        return <tr key={faculty.id}>
            <td style={{ whiteSpace: 'nowrap' }}>{faculty.name}</td>
            <td>{faculty.budgetPlaces}</td>
            <td>{faculty.totalPlaces}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/getFaculty/" + faculty.id}>More</Button>
                    <Button size="sm" color="warning" tag={Link} to={"/faculty/" + faculty.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(faculty.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                {/*<div className="float-end">
                    <Button color="success" tag={Link} to="/faculty/new">Add Faculty</Button>
                </div>*/}
                <h3>List of faculties</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Name</th>
                        <th width="20%">Marks</th>
                        <th>Total Places</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {facultyList}
                    </tbody>
                </Table>
                {pageNumber}
                <Button tag={Link} to={"/getFaculties/" + (parseInt(pageNumber, 10) - 1)} onClick={() => reloadL()}> - </Button>
                <Button tag={Link} to={"/getFaculties/" + (parseInt(pageNumber, 10) + 1)} onClick={() => reloadR()}> + </Button>
            </Container>
        </div>
    );
};



