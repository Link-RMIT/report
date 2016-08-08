import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';


import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Chart from 'chart.js';
import { Line as LineChart} from 'react-chartjs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'



import { ClosedElement } from '../../collections';

//https://github.com/reactjs/react-chartjs
//http://www.chartjs.org/docs/#chart-configuration-creating-a-chart-with-optiosn
//https://github.com/Hacker0x01/react-datepicker

//var LineChart = require("react-chartjs").Line;

function chartData() {
    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                fillColor: 'rgba(220,220,220,0.2)',
                strokeColor: 'rgba(220,220,220,1)',
                pointColor: 'rgba(220,220,220,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: [65, 59, 80, 81, 56, 55, 40],
            },
            {
                label: 'My Second dataset',
                fillColor: 'rgba(151,187,205,0.2)',
                strokeColor: 'rgba(151,187,205,1)',
                pointColor: 'rgba(151,187,205,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: [28, 48, 40, 19, 86, 27, 90],
            },
        ]
    }
}

function genDateLabels(results){
    let endDate='1970-01-01';
    let startDate='2999-12-31';
    for(var i in results){
        for(var date in results[i]){
            console.log(date);
            startDate = startDate < date ? startDate : date;
            endDate = date < endDate  ? endDate : date;
        }
    }
    console.log(startDate,endDate);
    let current = moment(startDate);
    let array = [];
    let d = moment.duration({days:1});
    while (!current.isAfter(endDate)){
        array.push(current.format('YYYY-MM-DD'));
        current.add(d);
    }
    return array;
}


function toChartDate(results){
    const labels = genDateLabels(results);
    const datasets = Object.keys(results).map((name,index)=>({
        label: name,
        strokeColor: 'hsl('+(index*30%360)+',68%,50%)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: labels.map((date)=>
            results[name][date] || 0
        )
    }));
    const r = { labels, datasets };
    return r;
}

const options = {
    scaleShowGridLines: true,
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: false,
    //bezierCurveTension: 0.4,
    pointDot: true,
    //pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    //pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: false,
    legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
}

const styles = {
    graphContainer: {
        border: '1px solid black',
        padding: '15px'
    }
}

class DashBoard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data: chartData(),
            startDate: moment(),
            endDate: moment(),
        }

    }
    onStartDateChange(date){
        this.setState({startDate: date});
    }
    onEndDateChange(date){
        this.setState({endDate: date});
        console.log(date.format('YYYY-MM-DD'));
    }
    onGenerate(){
        const startDate = this.state.startDate.format('YYYY-MM-DD');
        const endDate = this.state.endDate.format('YYYY-MM-DD');
        const that = this;
        Meteor.call(
            'query',
            startDate,
            endDate,
            (error, result)=>{
                console.log(result);
                that.setState({data:toChartDate(result)});
            });

    }
    onTest(){
        this.setState({data:testChartDate()});
    }
    render(){
        return (
            <div>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.onStartDateChange.bind(this)}
                />
                <DatePicker
                    selected={this.state.endDate}
                    onChange={this.onEndDateChange.bind(this)}
                />
                <Button bsStyle ="success"  onClick={this.onGenerate.bind(this)}> Generate </Button>
                <Button bsStyle ="success"  onClick={this.onTest.bind(this)}> Test </Button>
                <LineChart data={this.state.data} options={ options } width="600" height="250" redraw/>
            </div>)
    }
}

/*
DashBoard.propTypes = {
    //pins: React.PropTypes.array.isRequired,
};
*/
export default createContainer(()=>{
    return {
        //pins: PinModel.Pins.find({userId: Meteor.userId()}).fetch(),
    };
}, DashBoard );
