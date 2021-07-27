import React from 'react';
import './App.css';
import Header from './components/Header';
import UserForm from './components/UserForm';

class Profile extends React.Component {
  render(){

    return (
      <div id="main">
        <Header />
        <UserForm />
      </div>
    )
  }
}

export default Profile;
