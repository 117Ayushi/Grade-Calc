import React from 'react';
import '../App.css';



class UserForm extends React.Component {
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
                    <label>Name:</label>
                    <input type="name" className="form-control" id="name" />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group">
                    <label>Mobile Number:</label>
                    <input type="number" className="form-control" id="mobile_number" />
                </div>
                <button type="submit" className="btn btn-primary proceedButton">Proceed</button>
            </form>
        )
    }
}

export default UserForm