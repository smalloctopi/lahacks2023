import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

function InputFiles({ sendData, setInput }) {
  const pdfRef = useRef(null);
  // const audioRef = useRef(null);
  // let formData = new FormData();

  const [formData, setFormData] = useState(new FormData());
  const [text, setText] = useState('');

  const [load, setLoad] = useState(false);

  const onFileChange = (e) => {
    if (e.target && e.target.files[0]) {
      formData.append('file', e.target.files[0]);
    }
  };

  const submitFilesData = () => {
    setLoad(true);
    axios
      .post('http://localhost:5000/data', formData)
      .then((res) => {
        setLoad(false);
        setText(res.data);
        sendData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const moreAccuracy = () => {
    setInput(true);
    axios
      .post('http://localhost:5000/moreAccuracy', { data: text })
      .then((res) => {
        setText(res.data);
        sendData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="input-files-container">
      <Form>
        <Form.Group className="mb-3" controlId="lecturePdf">
          <Form.Label>Lecture Slides PDF</Form.Label>
          <Form.Control
            type="file"
            placeholder="Enter lecture slides in pdf form"
            ref={pdfRef}
            accept=".pdf"
            onChange={onFileChange}
          />
        </Form.Group>
        <Button variant="custom" type="button" onClick={submitFilesData}>
          Start Generating
        </Button>{' '}
        <Button variant="custom" type="button" onClick={moreAccuracy}>
          More Accuracy
        </Button>
      </Form>
      {load ? <Spinner animation="border" variant="success" /> : null}
    </div>
  );
}

export default InputFiles;
