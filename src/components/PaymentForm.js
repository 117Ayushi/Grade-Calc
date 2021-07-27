import React from 'react';
import '../App.css';
import { withRouter } from 'react-router-dom'


class PaymentForm extends React.Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(event){
        event.preventDefault();
        window.location = '/'
    }

    render() {
        return (
            <form className="form-group" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Card Number:</label>
                    <input type="text" className="form-control" id="cardNumber" placeholder="Card Number"/>
                </div>
                <div className="form-group">
                    <label>Card Holder:</label>
                    <input type="text" className="form-control" id="cardHolder" placeholder="Name On Card"/>
                </div>
                <div className="row form-group">
                    <div className="col-6">
                        <label>Expiry:</label>
                        <input type="text" className="form-control" id="expiry" placeholder="EXPIRY" />
                    </div>
                    <div className="col-6">
                        <label>CVV:</label>
                        <input type="password" className="form-control" id="cvv" placeholder="CVV" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary proceedButton">Make Payment</button>
            </form>
        )
    }
}

export default withRouter(PaymentForm)