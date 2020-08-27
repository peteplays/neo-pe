import React from 'react';

import { Action } from './search';

const NumberButton = ({ text, click }: { text: number, click: CallableFunction }) =>
  <>
    <button onClick={() => click(Action.sub)}>
      -
    </button>
    <span>
      {text}
    </span>
    <button onClick={() => click(Action.add)}>
      +
    </button>
  </>;

export default NumberButton;
