import React from 'react';
import { shallow, render } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Routes from './Routes';
import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import { mockStore } from '../../mockData/mockStore';
import { CardContainer } from '../CardContainer/CardContainer';

describe('Routes', () => {
  it('should match snapshot of nowPlaying Route', () => {
    const category = 'nowPlaying';
    let nowPlayingWrapper = shallow(
      <Routes
        path="/"
        render={() => {
          return <CardContainer category={category} />;
        }}
      />
    );

    expect(nowPlayingWrapper).toMatchSnapshot();
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

  it('should match snapshot of favorites Route', () => {
    let category = 'favorites';
    let favoritesWrapper = shallow(
      <MemoryRouter
        initialIndex={[{ pathname: '/', key: 0 }]}
        // initialEntries={['/']}
      >
        <Routes
          path="/favorites"
          render={() => <CardContainer category={category} />}
        />
      </MemoryRouter>
    );
    expect(favoritesWrapper).toMatchSnapshot();
  });
});
