import React, { useEffect, useState } from 'react';
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Read() {
    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        axios.get('https://62dbe8744438813a260d107c.mockapi.io/Crud')
            .then((getData) => {
                setApiData(getData.data);
            })
    }, [])
    const setData = (id, name, email, age, occupation, address) => {
        console.log(id, name, email, age, occupation, address)
        localStorage.setItem('ID', id)
        localStorage.setItem('name', name)
        localStorage.setItem('email', email)
        localStorage.setItem('age', age)
        localStorage.setItem('occupation', occupation)
        localStorage.setItem('address', address)
    }

    const getData = () => {
        axios.get('https://62dbe8744438813a260d107c.mockapi.io/Crud')
            .then((getData) => {
                setApiData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`https://62dbe8744438813a260d107c.mockapi.io/Crud/${id}`)
            .then(() => {
                getData();
            })
    }

    return (
        <div>

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Age</Table.HeaderCell>
                        <Table.HeaderCell>Occupation</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {apiData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.id}</Table.Cell>
                                <Table.Cell>{data.name}</Table.Cell>
                                <Table.Cell>{data.email}</Table.Cell>
                                <Table.Cell>{data.age}</Table.Cell>
                                <Table.Cell>{data.occupation}</Table.Cell>
                                <Table.Cell>{data.address}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/update'>
                                        <Button color="green" onClick={() => setData(data.id, data.name, data.email, data.age, data.occupation, data.address)}>
                                            Update
                                        </Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color="red" onClick={() => onDelete(data.id)}>
                                        Delete
                                    </Button>

                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
