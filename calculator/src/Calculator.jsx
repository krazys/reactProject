import React, { useState, useEffect } from 'react';

const Child = () => {
  let numArr = Array.from(Array(10).keys());
  let symArr = ['+', '-', '*', '/', '%'];

  const [finalValue, setFinalValue] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [valueArr, setValueArr] = useState([]);
  const [operatorValueOps, setOperatorValueOps] = useState('+');

  const calcComp = (ele) => {
    let valueClic = ele.target.innerHTML;
    console.log(ele.target.innerHTML);
    console.log(typeof valueClic);
    valueArr.push(valueClic.trim());
    console.log(valueArr);
  };

  const operator = (ele) => {
    let operatorValue = ele.target.innerHTML;
    setOperatorValueOps(operatorValue);
    console.log(operatorValueOps);
    console.log('T', typeof operatorValueOps);
    console.log('o', valueArr);
    let xs = Number(valueArr.join(''));

    setNum1(xs);
    console.log('num1', num1);
    setValueArr([]);
  };

  console.log(valueArr);
  let operatorComputation = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
    '%': (x, y) => x % y,
  };
  console.log(operatorValueOps);

  const finalCompute = () => {
    let computation = operatorComputation[operatorValueOps](num1, num2);
    console.log('Comp', computation);
    setFinalValue(computation);
  };

  useEffect(() => {
    finalCompute();
  }, [num2]);
  const compute = () => {
    let xy = Number(valueArr.join(''));
    console.log(xy);
    setNum2(xy);
    console.log('num2', num2);
  };

  const clear = () => {
    setNum1(0);
    setNum2(0);
    setValueArr([]);
    setOperatorValueOps('+');
  };

  return (
    <div>
      <h4>Calculate Number</h4>
      <div className="calcConatiner">
        <div classname="numberSection">
          <p>Numbers</p>
          <ul className="numbers">
            {numArr.map((ele) => {
              return (
                <li id={ele} onClick={(ele) => calcComp(ele)}>
                  <button> {ele} </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="operatorContainer">
          <p>Operator</p>
          <ul className="numbers">
            {symArr.map((ele) => {
              return (
                <li id={ele} onClick={operator}>
                  <button>{ele}</button>{' '}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="buttonGroup">
          <button onClick={compute}>Compute</button>
          <button onClick={clear}> AC </button>
        </div>
      </div>
      <h4>
        {' '}
        Computation of numbers = {num1} {operatorValueOps} {num2}
      </h4>
      <h5>Answer is :&nbsp;{finalValue}</h5>
    </div>
  );
};
export default Child;
