import React from 'react';
import Answers from './Answers';
import Useranswers from './Useranswers';

function Results({ data }) {
  let questions = [];

  // console.log(data);
  const cleanData = () => {
    // Answer:|A:
    questions = data.split(/\d(?=\.)|\n/);
    questions = questions.filter((x) => x !== '');
  };

  cleanData();
  // console.log(questions);
  return (
    <div>
      <h1>Practice Questions</h1>
      {questions.map((x) =>
        x[0] === '.' ? <h4>{x.slice(1)}</h4> : <Answers answers={x} />
      )}
    </div>
  );
}

export default Results;
