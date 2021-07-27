import React from 'react';
import '../App.css';
import LocationData from '../LocationData';



class SearchBar extends React.Component {
    render() {
        const locations = LocationData.map((item, index)=>{
            return <option key={index}>{item}</option>
          })
        return (
            <div className="row form-group">
            <div className="col-4">
                <label>Source: </label>
                <select className="form-control" id="source">
                    {locations}
                </select>
            </div>
            <div className="col-4">
              <label>Destination: </label>
              <select className="form-control" id="destination">
                {locations}
              </select>
            </div>
            <div className="col-4 submitButton">
              <button type="submit" className="btn btn-info">Search</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button type="button" className="btn btn-primary">Booking History</button>
            </div>     
            </div>
        )
    }
}

export default SearchBar