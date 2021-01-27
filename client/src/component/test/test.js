/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App.jsx';

// eslint-disable-next-line new-parens
Enzyme.configure({ adapter: new Adapter });

// describe('App component testing', () => {
//   it('should render reviews title',  () => {
//     const wrapper = shallow(<App />);
//     const text = wrapper.find('h2').text;
//     expect(text).toEqual('Customer Reviews(32)');
//   });
// });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App />, div
  );
  ReactDOM.unmountComponentAtNode(div);
});