import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import Demo from '.'

storiesOf('Demo', module)
.add('demo1', () => {
  const name = text('Name', 'James');
  return (
    <Demo name={name} onClick={action('click')} />
  )
});
