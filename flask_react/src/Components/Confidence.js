import React from 'react';
import Alert from 'react-bootstrap/Alert';

function Confidence({ confidence }) {
  return (
    <Alert id="custom-alert" variant="success">
      <p>{confidence}</p>
    </Alert>
  );
}

export default Confidence;
