import React from 'react';

import './loading.scss';

export const Loading = ({ el }: { el: string }) =>
  <p id='loading'>{el} Loading</p>;
