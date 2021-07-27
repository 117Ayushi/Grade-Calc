import React from 'react';
import '../App.css';


class AllocateGrade extends React.Component {
    constructor(props){
        super(props);
        this.state={
            method: "default"
        }
    }

    onChangeHandler = (e)=>{
        this.setState({
            method: e.target.value
        },()=>{
            console.log("state.....", this.state);
            
        })
    }

    render() {
        return (
            <form className="text-center">
                <div className="form-group">
                    <label>Choose Method:</label>
                    <select className="form-control" value={this.state.method} onChange={this.onChangeHandler}>
                        <option value="default">Default</option>
                        <option value="manual">Manual</option>
                        <option value="fuzzy">Fuzzy C-Means</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Calculate</button>
            </form>
        )
    }
}

export default AllocateGrade