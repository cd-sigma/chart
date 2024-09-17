import Chart from 'react-apexcharts';
import React, {useState, useEffect} from 'react';

function App() {
    const [series, setSeries] = useState([{
        data: [[Date.now(), 34]]
    }]);
    const [options, setOptions] = useState({
        chart: {
            id: 'realtime', height: 350, type: 'line', animations: {
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
            curve: 'straight', width: 1
        }, title: {
            text: 'Dynamic Updating Chart', align: 'left'
        }, markers: {
            size: 0
        }, xaxis: {
            show: false, type: 'datetime', range: 30000, axisBorder: {
                show: false, color: '#10baee'
            }, axisTicks: {
                show: false
            }
        }, legend: {
            show: true
        }, yaxis: {
            axisTicks: {
                show: false,
            },
        }, colors: ['#FFFFFF'],
        grid: {
            show: true, borderColor: '#0C1D31', position: 'back',  padding: {
                top: 0,
                right: 50,
                bottom: 0,
                left: 0
            },
        }, fill: {
            colors: '#FFFFFF', opacity: 0.5, type: 'gradient',
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimestamp = new Date().getTime();
            const newPrice = Math.floor(Math.random() * (100 - 80 + 1) + 80);
            setSeries([{data: [...series[0].data, [newTimestamp, newPrice]]}]);
            setOptions({...options,markers: {
                    size: series[0].data.map((_, index) =>
                        index === series[0].data.length - 1 ? 6 : 0
                    ),
                    colors: ['#FF4560'], // Color of the last point marker
                    strokeColor: '#fff', // Outline color of the marker
                    strokeWidth: 2,
                }});
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
