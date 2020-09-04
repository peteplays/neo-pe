import React, { ReactEventHandler } from 'react';

import { Action } from './search';

const Btn = ({ text, click }: { text: string, click: ReactEventHandler }) =>
  <button onClick={click}>
    {text}
  </button>;

const NumberButton = ({ text, click }: { text: number, click: CallableFunction }) =>
  <>
    <Btn text={'-'} click={() => click(Action.sub)} />
    <span>{text}</span>
    <Btn text={'+'} click={() => click(Action.add)} />
  </>;

export default NumberButton;
