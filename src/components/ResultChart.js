import React from 'react';
import '../App.css';
import {Chart} from 'primereact/chart';


class ResultChart extends React.Component {
    render() {
        const data = {
            labels: ['A', 'A-', 'B', 'B-', 'C', 'C-', 'D', 'D-', 'E', 'E-', 'F'],
			datasets: [{
				type: 'line',
				label: 'Grades Trend',
				borderColor: '#2196F3',
				borderWidth: 2,
				fill: false,
				data: this.props.data
			}, {
				type: 'bar',
				label: 'Grades in category',
				backgroundColor: '#4CAF50',
				data: this.props.data,
				borderColor: 'white',
				borderWidth: 2
			}]
        };

        const options = {
            responsive: true,
            title: {
                display: false,
                text: 'Results Trend'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            }
        };

        return (
			<div className="content-section implementation">
				<h3>Grade Chart</h3>
				<Chart type="bar" data={data} options={options} />
			</div>
        )
    }
}

export default ResultChart