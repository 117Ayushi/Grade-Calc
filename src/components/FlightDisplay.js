import React from 'react';
import '../App.css';




class FlightDisplay extends React.Component {
    render() {
        const sampleData = [
            {
                source:"Mumbai",
                desination:"Delhi",
                time:"10:20",
                fare: 3000
            },
            {
                source:"Goa",
                desination:"Delhi",
                time:"10:40",
                fare: 5000
            },
            {
                source:"Mumbai",
                desination:"Bangalore",
                time:"09:20",
                fare: 2000
            }
        ]
        const flightData = sampleData.map((item, index)=>{
            return (
              <tr key={index}>
                <td>{item.source}</td>
                <td>{item.desination}</td>
                <td>{item.time}</td>
                <td>{item.fare}</td>
                <td><button type="button" className="btn btn-primary">Book Now</button></td>
              </tr>
            )
        })
        return (
            <div className="row">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Time</th>
                    <th>Fare</th>
                    <th>Book Now</th>
                  </tr>
                </thead>
                {flightData}
              </table>
            </div>
        )
    }
}

export default FlightDisplay