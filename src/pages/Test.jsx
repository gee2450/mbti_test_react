import { Button, ProgressBar } from 'react-bootstrap';
import { React, useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import StyledArticle from '../component/Article';

const Test = () => {
  const { getValues, setValue, control } = useForm({
    defaultValues: {
      types: []
    }
  });
  const { fields, append } = useFieldArray(
    {
      control,
      name: `types`,
    }
  );

  // 임시 problems
  const problems = useMemo(() => {
    var tempProblems = [
      {"test-no": "문제 1번", "test-content": "문제내용", "type": "EI", "A":"E", "B":"I"},
      {"test-no": "문제 2번", "test-content": "문제내용", "type": "JP", "A":"J", "B":"P"},
      {"test-no": "문제 3번", "test-content": "문제내용", "type": "SN", "A":"S", "B":"N"},
      {"test-no": "문제 4번", "test-content": "문제내용", "type": "JP", "A":"J", "B":"P"},
      {"test-no": "문제 5번", "test-content": "문제내용", "type": "EI", "A":"E", "B":"I"},
      {"test-no": "문제 6번", "test-content": "문제내용", "type": "TF", "A":"T", "B":"F"},
      {"test-no": "문제 7번", "test-content": "문제내용", "type": "TF", "A":"T", "B":"F"},
      {"test-no": "문제 8번", "test-content": "문제내용", "type": "SN", "A":"S", "B":"N"},
      {"test-no": "문제 9번", "test-content": "문제내용", "type": "EI", "A":"E", "B":"I"},
      {"test-no": "문제 10번", "test-content": "문제내용", "type": "TF", "A":"T", "B":"F"},
      {"test-no": "문제 11번", "test-content": "문제내용", "type": "JP", "A":"J", "B":"P"},
      {"test-no": "문제 12번", "test-content": "문제내용", "type": "SN", "A":"S", "B":"N"},
    ];
    return tempProblems;
  }, []);

  const typeArray = useMemo(() => {
    let _set = new Set();
    problems.forEach(problem => {
      _set.add(problem["type"]);
    });
    return Array.from(_set);
  }, [problems])

  useEffect(() => {
    if (fields.length < 1) {
      typeArray.forEach((type) => {
        append({name: type, score: 0});
      })
    }
  }, [append, fields.length, typeArray]);

  const problemNum = problems.length;
  const [progress, setProgress] = useState(1);
  const navigate = useNavigate();

  function next(type, state) {
    if (type.indexOf(state) === 0) {
      const idx = typeArray.indexOf(type);
      setValue(`types.${idx}.score`, getValues(`types.${idx}.score`)+1);
    }
    console.log(getValues('types'));

    if (progress === problemNum)
    {
      var result = "";
      ["EI", "SN", "TF", "JP"].forEach((state) => {
        const _score = getValues(`types.${typeArray.indexOf(state)}.score`);
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
        problems
        .filter((content, idx) => progress === idx + 1)
        .map((content, idx) => {
          return(
            <div key={idx}>
              <h1 className='test-no text-center'>{content["test-no"]}</h1>
              <h3 className='test-content text-center'>{content["test-content"]}</h3>
              <div className="btn-wrap d-grid gap-2">
                <Button className='btn-test-start' variant="dark" size="lg" 
                  onClick={ () => {next(content["type"], content["A"])} }>{content["A"]}</Button>
                <Button className='btn-test-start' variant="dark" size="lg" 
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