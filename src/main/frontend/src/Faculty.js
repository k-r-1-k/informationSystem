import React, {useEffect, useState, useMemo} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {useCookies} from "react-cookie";
import ReactDOM from "react-dom/client";


const Faculty = () => {
    const [facultyInfo, setFacultyInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [cookies] = useCookies(['XSRF-TOKEN']);

    useEffect(() => {
        setLoading(true);

        fetch(`/getFacultyInfo/${id}`)
            .then(response => response.json())
            .then(data => {
                setFacultyInfo(data);
                setLoading(false);
                console.log(data);
            })
    }, []);

    if (loading) {
        return <p style={{
            display: "flex",
            justifyContent: "center"
        }}>Loading...</p>;
    }

    const permit = async (id) => {
        await fetch(`statementPermit/${id}`, {
            method: 'PUT',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            fetch(`/getFacultyInfo/${id}`)
                .then(response => response.json())
                .then(data => {
                    setFacultyInfo(data);
                    setLoading(false);
                })
            /*facultyInfo.statementList.find((i) => i.id === id).passed = true;
            setFacultyInfo(facultyInfo);
            console.log(facultyInfo);*/
        });
    }

    //const calculation = useMemo(() => expensiveCalculation(count), [count]);

    const forbid = async (id) => {
        await fetch(`statementForbid/${id}`, {
            method: 'PUT',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            fetch(`/getFacultyInfo/${id}`)
                .then(response => response.json())
                .then(data => {
                    setFacultyInfo(data);
                    setLoading(false);
                })
           /* let updatedFacultyInfo = facultyInfo.statementList.find((i) => i.id === id).passed = false;
            setFacultyInfo(updatedFacultyInfo);*/
        });
    }

    const userListNew = facultyInfo?.userList?.map(user => {
        let statementList = facultyInfo.statementList;
        let rating = statementList.find((i) => i.userId === user.id).mark1 * 0.3 +
            statementList.find((i) => i.userId === user.id).mark2 * 0.5 +
            statementList.find((i) => i.userId === user.id).mark3 * 0.2 +
            statementList.find((i) => i.userId === user.id).avgCerMark;

        return <tr key={user.id}>
            <td style={{ whiteSpace: 'nowrap' }}>{user.name}</td>
            <td>{facultyInfo.statementList
                .find((i) => i.userId === user.id).mark1} {statementList
                .find((i) => i.userId === user.id).mark2} {statementList
                .find((i) => i.userId === user.id).mark3} {statementList
                .find((i) => i.userId === user.id).avgCerMark}
            </td>
            <td>
                {rating}
            </td>
            <td>
                {statementList.find((i) => i.userId === user.id).passed ? "true" : "false"}
            </td>
            <td>
                <ButtonGroup>
                    {statementList.find((i) => i.userId === user.id).passed ?
                        <Button size="sm" color="danger" onClick={() => forbid(statementList.find((i) => i.userId === user.id).id)}>Forbid</Button> :
                        <Button size="sm" color="primary" onClick={() => permit(statementList.find((i) => i.userId === user.id).id)}>Permit</Button>
                    }
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <h3>{facultyInfo?.faculty?.name}</h3>
                <p>Budget places: {facultyInfo?.faculty?.budgetPlaces} Total places: {facultyInfo?.faculty?.totalPlaces}</p>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Name</th>
                        <th width="20%">Marks</th>
                        <th width="20%">Rating</th>
                        <th>Passed</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {userListNew}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default Faculty;