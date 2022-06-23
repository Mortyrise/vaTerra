import React from 'react';
import renderer from 'react-test-renderer';
import Loading from './Loading';

test('The Loading screen has not changed', () => {
  const loadingScreen = renderer.create(<Loading />).toJSON();
  expect(loadingScreen).toMatchSnapshot();
  expect(loadingScreen.props).toEqual({ style: { flex: 1 } });
});
