import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { useCookies } from 'react-cookie';

export default function UserList() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cookies] = useCookies(['XSRF-TOKEN']);

    useEffect(() => {
        setLoading(true);

        fetch('/getUsers')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
                console.log(data);
            })
    }, []);

    const block = async (id) => {
        await fetch(`/getUsers/blockUser/${id}`, {
            method: 'PUT',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            fetch('/getUsers')
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
                    setLoading(false);
                })
        });
    }

    const unblock = async (id) => {
        await fetch(`/getUsers/unblockUser/${id}`, {
            method: 'PUT',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            fetch('/getUsers')
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
                    setLoading(false);
                })
        });
    }

    const makeAdmin = async (id) => {
        await fetch(`/getUsers/makeAdmin/${id}`, {
            method: 'PUT',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            fetch('/getUsers')
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
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

    const userList = users.map(user => {
        return <tr key={user.id}>
            <td style={{ whiteSpace: 'nowrap' }}>{user.name}</td>
            <td>Login: {user.login} Email: {user.email} Role: {user.role}</td>
            <td>
                <ButtonGroup>
                    {user.role !== 'ADMIN' ?
                        <Button size="sm" color="primary" onClick={() => makeAdmin(user.id)}>Make admin</Button> :
                        null
                    }
                    {user.blocked ?
                        <Button size="sm" color="warning" onClick={() => unblock(user.id)}>Unblock</Button> :
                        <Button size="sm" color="warning" onClick={() => block(user.id)}>Block</Button>
                    }
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <h3>List of Users</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Name</th>
                        <th width="70%">Info</th>
                        {/*<th>Total Places</th>*/}
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {userList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};



