import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './resources/assets/sass/home/app.scss';
import './resources/assets/icomoon/icon.scss';
import './resources/assets/sass/profile.scss'
import './resources/assets/sass/login.scss';
import './resources/assets/sass/seed.scss';
import './resources/assets/sass/home/chatbox.scss';
import './resources/assets/sass/home/addpromise.scss';
import './resources/assets/sass/home/list_friend.scss';
import './resources/assets/sass/home/notification.scss';
import './resources/assets/sass/user/cover_image.scss';
import Home from './resources/assets/components/home/Home';
import Login from './resources/assets/components/sign-up/Login';
import Profile from './resources/assets/components/set-profile/Profile';
import SeedPhase from './resources/assets/components/create-account/SeedPhase';
import User from './resources/assets/components/user/User';

const mapStateToProps =  (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (state) => {
  return {
    ...state
  }
}

class App extends Component {
  
  componentWillMount = () => {
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/profile" component={Profile} />
          <Route exact path="/login/seed" component={SeedPhase} />
          <Route exact path="/profile/user" component={User} />
        </Switch>
      </Router>

    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
