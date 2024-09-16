import Chart from 'react-apexcharts';
import React, {useState, useEffect} from 'react';

function App() {
    const [series, setSeries] = useState([{
        data: [[Date.now(), 34]]
    }]);
    const [options, setOptions] = useState({
        chart: {
            id: 'realtime', height: 350,  type: 'line', animations: {
                enabled: true, easing: 'linear', dynamicAnimation: {
                    speed: 500
                }
            }, toolbar: {
                show: false
            }, zoom: {
                enabled: false
            }
        }, dataLabels: {
            enabled: false
        }, stroke: {
            curve: 'straight',
            width: 1
        }, title: {
            text: 'Dynamic Updating Chart', align: 'left'
        }, markers: {
            size: 0
        }, xaxis: {
            show:false,
            type: 'datetime', range: 300000
        }, yaxis: {
            max: 100
        }, legend: {
            show: true
        },
        colors: ['#FFFFFF'],
        grid: {
            show: true,
            borderColor: '#0C1D31',
            position: 'back',
        },
        fill:{
            colors: '#FFFFFF',
            opacity: 0.9,
            type: 'gradient',

        },

    });

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimestamp = new Date().getTime();
            const newPrice = Math.floor(Math.random() * (100 - 10 + 1) + 10);
            setSeries([{data: [...series[0].data, [newTimestamp, newPrice]]}]);
        }, 1000);
        return () => clearInterval(interval);
    }, [series]);

    return (<div>
        <div id="chart">
            <Chart options={options} series={series} type="area" height={350}/>
        </div>
        <div id="html-dist"></div>
    </div>);
}

export default App;
