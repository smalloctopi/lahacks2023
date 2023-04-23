import axios from 'axios';
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../App.css';

const LoginPage = () => {
  const emailRef = useRef(null);
  const password1Ref = useRef(null);
  const navigate = useNavigate();

  const generateError = (err) => {
    if (err.response.data.message) {
      toast.error(err.response.data.message, {
        position: 'bottom-right',
      });
    } else {
      toast.error(err.response.data, {
        position: 'bottom-right',
      });
    }
  };s

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios
      .post('http://localhost:5000/login', {
        email: emailRef.current.value,
        password: password1Ref.current.value,
      })
      .then((result) => {
        localStorage.setItem('jwt', result.data); // jwt is stored in result.data
        console.log(result);
        navigate('/');
      })
      .catch((err) => generateError(err));
  };

  return (
    <div className="log-reg-container">
      <div className="log-reg-container-border">
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
             className="box" 
              type="email"
              placeholder="Enter email"
              required={true}
              ref={emailRef}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
            className="box1"
              type="password"
              placeholder="Password"
              required={true}
              ref={password1Ref}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Save password" />
          </Form.Group>

          <Button variant="custom" type="submit">
            Log In
          </Button>
          <span style={{ marginLeft: '10px' }}>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
