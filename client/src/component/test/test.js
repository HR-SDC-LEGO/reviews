import React from 'react';
import App from '../App.jsx';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter});

describe('App component testing', () => {
  it('should render reviews title',  () => {
    const wrapper = shallow(<App />);
    const header = <h1>Customer Reviews</h1>;
    expect(wrapper.contains(header)).toEqual(true);
  });
});
