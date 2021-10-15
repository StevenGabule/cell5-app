import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  Table,
  Button,
  Card,
  Image,
} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';

const BASE_URL = 'https://api.github.com/users';
const PersonIndex: React.FC = () => {
  const [persons, setPersons] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('asc');
  const [profile, setProfile] = useState<any>({});

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
    Swal.fire({
      title: 'Are you sure?',
      text: 'Deleting this record will not be undo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) await axios.delete(`/person/${id}`);
      await fetchPerson();
    });
  }

  async function handleChangeFilter(event: ChangeEvent<HTMLSelectElement>) {
    setFilter(event.target.value);
  }

  function handleSort(event: ChangeEvent<HTMLSelectElement>) {
    setSort(event.target.value);
  }

  async function handleFetchGithubProfile(username: string) {
    const { data }: { data: any } = await axios.get(`${BASE_URL}/${username}`);
    setProfile(data);
  }

  return (
    <Container>
      <Row>
        <Col lg={12}>
          <h2>Developer Page</h2>
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
              <Button className='btn btn-info' onClick={fetchPerson}>
                Apply
              </Button>
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
                      style={{ width: 32, height: 32, objectFit: 'cover' }}
                    />
                  </td>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>{person.bornDate}</td>
                  <td>{person.height}</td>
                  <td>{person.spouse}</td>
                  <td>{person.motherName}</td>
                  <td>{person.fatherName}</td>
                  <td>{moment(person.createdAt).fromNow()}</td>
                  <td>
                    <ButtonGroup>
                      <button
                        className='btn btn-dark btn-sm'
                        onClick={() =>
                          handleFetchGithubProfile(person.username)
                        }
                      >
                        Github Info
                      </button>
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
          {profile && Object.keys(profile).length !== 0 && (
            <Card>
              <Card.Body>
                <Image src={profile.avatar_url} alt={profile.name} /> <br />
                <p>
                  Name: {profile.name} <br />
                  Biography: {profile.bio} <br />
                  Blog: {profile.blog} <br />
                  Company: {profile.company} <br />
                  followers: {profile.followers} <br />
                  following: {profile.following} <br />
                  Created: {moment(profile.created_at).fromNow()} <br />
                </p>
                <a href={`https://github.com/${profile.login}`}>View Profile</a>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PersonIndex;
