import React from 'react';
import './App.css';
import Header from './components/Header';
import PaymentForm from './components/PaymentForm';


class Payment extends React.Component {
  render(){

    return (
      <div id="main">
        <Header />
        <PaymentForm />
      </div>
    )
  }
}

export default Payment;
