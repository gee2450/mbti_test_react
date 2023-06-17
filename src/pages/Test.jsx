import { Button, ProgressBar } from 'react-bootstrap';
import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm, useFieldArray } from "react-hook-form";
import StyledArticle from '../component/Article';

const Test = () => {
  const { watch ,setValue, control } = useForm({
    defaultValues: {
      types: [],
      scores: [],
      tests: []
    }
  });
  const { append: typeAppend } = useFieldArray(
    {
      control,
      name: `types`,
    }
  );
  const { append: scoreAppend } = useFieldArray(
    {
      control,
      name: `scores`,
    }
  );
  const { fields: testFields, append: testAppend } = useFieldArray(
    {
      control,
      name: `tests`,
    }
  );
  
  // get test data and make test-data, types, scores fields
  useEffect(() => {
    axios('/data/ko-KR/test.json')
      .then((problems) => {
        if (testFields.length < 1 && problems.data.length != 0) {
          let _typeSet = new Set();

          problems.data.forEach((problem) => {
            testAppend(problem);
            _typeSet.add(problem["type"]);
          });

          const typeArray = Array.from(_typeSet);

          typeArray.forEach((type) => {
            typeAppend(type);
            scoreAppend({name: type, score: 0});
          });
        }
    });
  }, []);

  // button click method
  const problemNum = testFields.length;
  const [progress, setProgress] = useState(1);
  const navigate = useNavigate();

  function next(type, state) {
    if (type.indexOf(state) === 0) {
      const idx = watch('types').indexOf(type);
      setValue(`scores.${idx}.score`, watch(`scores.${idx}.score`)+1);
    }
    console.log(watch(`scores`));

    if (progress === problemNum)
    {
      var result = "";
      ["EI", "SN", "TF", "JP"].forEach((state) => {
        const _score = watch(`types.${watch('types').indexOf(state)}.score`);
        result += (_score >= 2) ? "1" : "0";
      })
      
      console.log(`before: ${result}, after: ${parseInt(result, 2)}`);
      navigate(`/result?code=${parseInt(result, 2)}`);
    }
    else {
      setProgress(progress + 1)
    }
  }

  return (
    <StyledArticle>
      <ProgressBar variant="warning" now={100 / problemNum * progress}></ProgressBar>
      <h4>{progress}</h4>
      {
        watch('tests')
        .filter((_, idx) => progress === idx + 1)
        .map((content, idx) => {
          return(
            <div key={idx}>
              <h1 className='test-name text-center'>{content["name"]}</h1>
              <h3 className='test-content text-center'>{content["content"]}</h3>
              <div className="btn-wrap d-grid gap-2">
                <Button className='test-btn-A' variant="dark" size="lg" 
                  onClick={ () => {next(content["type"], content["A"])} }>{content["A"]}</Button>
                <Button className='test-btn-B' variant="dark" size="lg" 
                  onClick={ () => {next(content["type"], content["B"])} }>{content["B"]}</Button>
              </div>
            </div>
          );
        })
      }
      {

      }
    </StyledArticle>
  );
};

export default Test;