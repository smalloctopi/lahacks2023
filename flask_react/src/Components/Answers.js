import React, { useEffect, useState } from 'react';
import Useranswers from './Useranswers';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Answers({ answers }) {
  const [showAns, setShowAns] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(answers);

  const handleSwitch = () => {
    setShowAns(!showAns);
  };

  useEffect(() => {
    // console.log(userAnswer);
    fetchAnswers();
  }, [userAnswer]);

  const fetchAnswers = () => {
    axios
      .post('http://localhost:5000/checkAnswers', {
        user: userAnswer,
        corrAns: correctAnswer,
      })
      .then((res) => {
        console.log(res.data);
        console.log('check answer success');
        // console.log('success');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Form>
        <Form.Check
          type="switch"
          id="ans-switch"
          label="Show Answer"
          onChange={handleSwitch}
        />
      </Form>
      {showAns && <div className="answers">{answers}</div>}

      <Useranswers sendUserData={(d) => setUserAnswer(d)} />
    </>
  );
}

export default Answers;
