import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import axios from 'axios';

function Useranswers({ sendUserData }) {
  const [userAns, setUserAns] = useState('');
  //   const [correctAnswer, setCorrectAnswer] = useState(''); // from AI
  //   const [match, setMatch] = useState(false);

  const checkAnswer = (e) => {
    e.preventDefault();
    sendUserData(userAns);
  };

  //   onChange={e => setText(e.target.value)}
  return (
    <Form onSubmit={checkAnswer}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>User Entry:</Form.Label>
        <Form.Control
          onChange={(e) => setUserAns(e.target.value)}
          value={userAns}
          as="textarea"
          rows={3}
        />
      </Form.Group>
      <Button variant="custom" type="submit">
        Submit to Check Answer
      </Button>
    </Form>
  );
}

export default Useranswers;
