import React from 'react';
import InputFiles from '../Components/InputFiles';
import Filler from '../Components/Filler';
import Results from '../Components/Results';
import { useState } from 'react';

// work onthis later
function Home() {
  const [input, setInput] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
  };

  const searchInput = (e) => {
    const { name, value } = e.target;
  };

  const handleClick = () => {
    setInput(false);
  };

  return (
    <div className="Home">
      <div className="Home-left-box">
        <div className="Home-left-top">
          <h2 className="Home-heading">Let’s buzz through your materials</h2>
          <p className="Home-paragraph">
            Beeline takes the materials you commonly use in your courses and
            generates a number of questions that can help supplement your
            studying. Note that the more relevant resources you upload, the more
            accurate and relevant your Beeline will be.
          </p>
        </div>
        <div className="Home-textbook">
          <h2 className="Home-textbook-heading">Textbook(s)</h2>
          <p className="Home-textbook-paragraph">
            Search using the DOI or ISBN numbers of the textbook(s) your
            professor uses for your class. If you have specific chapters that
            you’d like to focus on, please indicate them in the boxes below.
          </p>
          <input
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput}
          />
        </div>
        <div className="Home-practice-questions">
          <h2 className="Home-practice-heading">Practice Questions</h2>
          <p className="Home-practicing-paragraph">
            These questions will help our AI generate questions that are more
            targeted toward your class and professor’s expectations. Example
            questions may include previous midterms, finals, quizzes, or any
            other test prompts that your professor may have given you.
          </p>
          <InputFiles />
        </div>
      </div>

      <div className="Home-right-box">
        {input ? <Filler handleClick={handleClick} /> : <Results />}
      </div>
    </div>
  );
}

export default Home;
