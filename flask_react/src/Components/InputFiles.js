import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';

function InputFiles() {
  const pdfRef = useRef(null);
  // const audioRef = useRef(null);
  const [text, setText] = useState('');

  let formData = new FormData();
  const onFileChange = (e) => {
    if (e.target && e.target.files[0]) {
      formData.append('file', e.target.files[0]);
    }
  };

  const submitFilesData = () => {
    axios
      .post('http://localhost:5000/data', formData)
      .then((res) => {
        setText(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const submitAudioFilesData = () => {
  //   axios
  //     .post('http://localhost:5000/data', formData)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
          Submit PDF
        </Button>

        {/* <hr></hr> */}
        {/* <Form.Group className="mb-3" controlId="audioFile">
          <Form.Label>Lecture Slides Audio</Form.Label>
          <Form.Control
            type="file"
            placeholder="Enter lecture slides in audio form (mp3, mp4, wav)"
            ref={audioRef}
            accept=".mp3, .mp4, .wav"
            onChange={onFileChange}
          />
        </Form.Group>
        <Button variant="custom" type="button" onClick={submitFilesData}>
          Submit Audio
        </Button> */}
      </Form>
      <div>{text}</div>
    </div>
  );
}

export default InputFiles;
