import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Registration = () => {
  const [registered, setRegistered] = useState(false);

  const emailRef = useRef(null);
  const password1Ref = useRef(null);
  let password2Ref = useRef(null);
  const fnameRef = useRef(null);
  const lnameRef = useRef(null);

  const navigate = useNavigate();

  const generateError = (err) => {
    if (err.response.data.error) {
      toast.error(err.response.data.error, {
        position: 'bottom-right',
      });
    } else {
      toast.error('User already registered!', {
        position: 'bottom-right',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post('http://localhost:5000/register', {
        email: emailRef.current.value,
        password: password1Ref.current.value,
        firstName: fnameRef.current.value,
        lastName: lnameRef.current.value,
      })
      .then((result) => {
        setRegistered(true);
        localStorage.setItem('jwt', result.data); // jwt is stored in result.data
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch((err) => generateError(err));
  };

  useEffect(() => {
    if (registered) {
      toast.success('Registered Successfully', {
        position: 'bottom-right',
      });
    }
  }, [registered]);

  return (
    <div className="log-reg-container">
      <div className="log-reg-container-border">
        <h2>Become a Member</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="fname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              ref={fnameRef}
              type="text"
              placeholder="Enter first name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              ref={lnameRef}
              type="text"
              placeholder="Enter last name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              ref={emailRef}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={password1Ref}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              ref={password2Ref}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="savePassword">
            <Form.Check type="checkbox" label="Save Password?" />
          </Form.Group>
          <Button variant="custom" type="submit">
            Submit
          </Button>

          <span style={{ display: 'block', marginTop: '15px' }}>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </Form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Registration;
