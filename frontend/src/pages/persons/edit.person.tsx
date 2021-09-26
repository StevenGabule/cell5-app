import axios from 'axios';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';

const INITIAL_VALUE = {
  avatar_url: '',
  firstName: '',
  lastName: '',
  bornDate: '',
  height: '',
  spouse: '',
  motherName: '',
  fatherName: '',
};

function PersonEdit({ history, match }: { history: any; match: any }) {
  const [person, setPerson] = useState(INITIAL_VALUE);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      history.push('/');
    }
  }, [success, history]);

  useEffect(() => {
    fetchPerson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchPerson() {
    try {
      const id = match.params.id;
      const { data } = await axios.get(`/person/${id}`);
      setPerson(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handleSubmit(e: SyntheticEvent) {
    try {
      setLoading(true);
      e.preventDefault();
      const id = match.params.id;
      const res = await axios.put(`/person/${id}`, person);
      if (res.status === 201) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      alert('Something goes wrong!');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPerson((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ margin: 'auto', width: '50%' }}>
            <Card.Header>
              <h2>Edit an person</h2>
            </Card.Header>

            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Avatar URL</Form.Label>
                  <Form.Control
                    type='text'
                    name='avatar_url'
                    value={person.avatar_url}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='firstName'
                    value={person.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type='text'
                    name='lastName'
                    value={person.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Born Date</Form.Label>
                  <Form.Control
                    type='date'
                    name='bornDate'
                    value={person.bornDate}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Height</Form.Label>
                  <Form.Control
                    type='text'
                    name='height'
                    value={person.height}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Spouse</Form.Label>
                  <Form.Control
                    type='text'
                    name='spouse'
                    value={person.spouse}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Mother Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='motherName'
                    value={person.motherName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Father Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='fatherName'
                    value={person.fatherName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  disabled={loading}
                  type='submit'
                  className='btn btn-primary'
                >
                  {loading ? 'Submiting...' : 'Submit'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PersonEdit;
