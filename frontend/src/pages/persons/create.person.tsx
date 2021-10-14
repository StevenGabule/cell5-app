import Button from '@restart/ui/esm/Button';
import axios from 'axios';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';

const INITIAL_VALUE = {
  avatar_url:
    'https://images.unsplash.com/profile-fb-1460825798-70fae2b76594.jpg?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff',
  username: 'jp_gabule',
  firstName: 'John Paul',
  lastName: 'Gabule',
  bornDate: '07/22/1990',
  height: "5'6",
  spouse: 'Secret spouce',
  motherName: 'Mother name',
  fatherName: 'Father name',
};

function PersonCreate({ history }: { history: any }) {
  const [person, setPerson] = useState(INITIAL_VALUE);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      history.push('/');
    }
  }, [success, history]);

  async function handleSubmit(e: SyntheticEvent) {
    try {
      setLoading(true);
      e.preventDefault();
      const res = await axios.post('/person', person);
      if (res.status === 201) {
        setSuccess(true);
      }
      console.log(res);
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
              <h2>Create an person</h2>
            </Card.Header>

            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formAvatarID'>
                  <Form.Label>Avatar URL</Form.Label>
                  <Form.Control
                    type='text'
                    name='avatar_url'
                    value={person.avatar_url}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formUsername'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='text'
                    name='username'
                    value={person.username}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formFirstName'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='firstName'
                    value={person.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formLastname'>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type='text'
                    name='lastName'
                    value={person.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBornDate'>
                  <Form.Label>Born Date</Form.Label>
                  <Form.Control
                    type='text'
                    name='bornDate'
                    value={person.bornDate}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formHeight'>
                  <Form.Label>Height</Form.Label>
                  <Form.Control
                    type='text'
                    name='height'
                    value={person.height}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formSpouse'>
                  <Form.Label>Spouse</Form.Label>
                  <Form.Control
                    type='text'
                    name='spouse'
                    value={person.spouse}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formMotherName'>
                  <Form.Label>Mother Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='motherName'
                    value={person.motherName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formFatherName'>
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

export default PersonCreate;
