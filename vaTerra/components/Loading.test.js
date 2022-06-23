import React from 'react';
import renderer from 'react-test-renderer';
import Loading from './Loading';

test('The Loading screen has not changed', () => {
  const tree = renderer.create(<Loading />).toJSON();
  expect(tree).toMatchSnapshot();
});
