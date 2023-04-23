import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Spinner from 'react-bootstrap/esm/Spinner';
import InputFiles from '../Components/InputFiles';

import React, { useState } from 'react';
import axios from 'axios';

function GenerateExams() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [load, setLoad] = useState(false);
    const clearChat = () => {
        setMessage('');
        setResponse('');
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        setLoad(true);
    
        axios
          .post('http://localhost:5000/data', { message })
          .then((res) => {
            setResponse(res.data);
            setMessage('');
            setLoad(false);
          })
          .catch((err) => {
            console.log(err);
          });
      };  

      
  return (
    <Container>
      <Row className="justify-content-center">
        {/* <h1 style={{ textAlign: 'center' }}>Practice Exam Generator</h1> */}
        {/* <InputFiles /> */}
        <Form onSubmit={handleSubmit} className="d-flex justify-content-center">
          <textarea
            style={{ width: '500px', height: '200px' }}
            className="input-box"
            placeholder="Upload PDF."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          >
            hello
          </textarea>
          <Button variant="custom" className="ml-3" type="submit">
            Submit
          </Button>
          <Button className="btn btn-danger" type="button" onClick={clearChat}>
            Clear
          </Button>
        </Form>
        {response && (
          <div style={{ textAlign: 'center' }}>
            <b>Professor Chatty McChatty says </b> {response}
          </div>
        )}
        {load ? <Spinner animation="border" variant="success" /> : null}
      </Row>
    </Container>
  );
}

export default GenerateExams;

