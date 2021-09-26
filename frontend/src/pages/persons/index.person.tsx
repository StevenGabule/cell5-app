import React, { useEffect, useState } from 'react';
import { ButtonGroup, Col, Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

const PersonIndex: React.FC = () => {
  const [persons, setPersons] = useState<any[]>([]);

  const fetchPerson = async () => {
    try {
      const { data } = await axios.get('/person');
      setPersons(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  async function handleDelete(id: number) {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await axios.delete(`/person/${id}`);
      fetchPerson();
    }
  }

  return (
    <Container>
      <Row>
        <Col lg={12}>
          <h2>Person Page</h2>
          <Link to='/create' className='btn btn-primary btn-sm'>
            Create
          </Link>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Born Date</th>
                <th>Height</th>
                <th>Spouse</th>
                <th>Mother name</th>
                <th>Father name</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {persons?.map((person, i) => (
                <tr key={person._id}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={person.avatar_url}
                      alt={person.firstName}
                      width='50'
                    />
                  </td>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>{moment(person.bornDate).format('MMMM Do YYYY')}</td>
                  <td>{person.height}</td>
                  <td>{person.spouse}</td>
                  <td>{person.motherName}</td>
                  <td>{person.fatherName}</td>
                  <td>{person.createdAt}</td>
                  <td>
                    <ButtonGroup>
                      <Link
                        to={`/${person._id}/edit`}
                        className='btn btn-info btn-sm'
                      >
                        Edit
                      </Link>
                      <button
                        className='btn btn-danger btn-sm'
                        onClick={() => handleDelete(person._id)}
                      >
                        Delete
                      </button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonIndex;
