import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  Table,
  Button,
} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

const PersonIndex: React.FC = () => {
  const [persons, setPersons] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('asc');

  const fetchPerson = async () => {
    try {
      const { data } = await axios.get(
        `${filter !== '' ? `/person?sort=${sort}&${filter}=true` : '/person'}`
      );
      setPersons(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPerson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(id: number) {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await axios.delete(`/person/${id}`);
      await fetchPerson();
    }
  }

  async function handleChangeFilter(event: ChangeEvent<HTMLSelectElement>) {
    setFilter(event.target.value);
  }

  function handleSort(event: ChangeEvent<HTMLSelectElement>) {
    setSort(event.target.value);
  }

  return (
    <Container>
      <Row>
        <Col lg={12}>
          <h2>Person Page</h2>
          <div className='d-flex justify-content-between mb-3'>
            <Link
              to='/create'
              className='btn btn-primary btn-sm align-self-center'
            >
              Create
            </Link>

            <div className='align-self-center d-flex w-50'>
              <Form.Select
                onChange={handleSort}
                value={sort}
                aria-label='Default select example'
              >
                <option>Sort By</option>
                <option value='asc'>ASCENDING</option>
                <option value='desc'>DESCENDING</option>
              </Form.Select>

              <Form.Select
                onChange={handleChangeFilter}
                value={filter}
                aria-label='Default select example'
              >
                <option>Filter By</option>
                <option value='firstName'>Firstname</option>
                <option value='lastName'>Lastname</option>
              </Form.Select>
              <Button onClick={fetchPerson}>Change</Button>
            </div>
          </div>

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
