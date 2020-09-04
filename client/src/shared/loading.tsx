import React from 'react';

import './loading.scss';

export const Loading = ({ name }: { name: string }) =>
  <p id='loading'>{name} Loading</p>;
