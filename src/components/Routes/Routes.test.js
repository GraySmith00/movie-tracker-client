import React from 'react';
import { shallow } from 'enzyme';
import { Routes } from './Routes';
import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import { CardContainer } from '../../containers/CardContainer/CardContainer';

describe('Routes', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Routes />);
  });

  it('should match snapshot of nowPlaying Route', () => {
    const category = 'nowPlaying';
    wrapper = shallow(
      <Routes
        path="/"
        render={() => {
          return <CardContainer category={category} />;
        }}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapShot of login Route', () => {
    let loginWrapper = shallow(<Routes path="/login" component={Login} />);
    expect(loginWrapper).toMatchSnapshot();
  });

  it('should match snapShot of register Route', () => {
    let registerWrapper = shallow(
      <Routes path="/register" component={Register} />
    );
    expect(registerWrapper).toMatchSnapshot();
  });
});
