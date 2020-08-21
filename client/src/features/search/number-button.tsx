import React from 'react';

const NumberButton = ({ text, clickAdd, clickSub }: { text: number, clickAdd: CallableFunction, clickSub: CallableFunction }) =>
  <>
    <button
      onClick={() => clickSub()}
    >
      -
      </button>
    <span>
      {text}
    </span>
    <button
      onClick={() => clickAdd()}
    >
      +
      </button>
  </>;

export default NumberButton;
