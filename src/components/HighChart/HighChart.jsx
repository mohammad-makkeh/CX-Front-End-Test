import './HighChart.css'
import HC_LOGO from '../../assets/highcharts.svg';
import * as hc from 'highcharts';
import {HCConfig} from '../../config';
import { useState, useEffect } from 'react';

const HighChart = () => {

    //manage state of fetched data
    const [data, setData] = useState(null);
    
    //fetch the data
    useEffect(()=>{
        fetch(HCConfig.dataURL)
            .then(res => res.json())
            .then(res => {
                const {data} = res;
                setData(data);
            })
    }, []);

    //draw the graph whever data changes
    useEffect(()=>{
        if(data){
            draw()
        }
    }, [data]);

    const draw = () => {

        hc.chart('chart', {


            chart: {
              backgroundColor: '#33334E',
              width: HCConfig.width,
              height: HCConfig.height,
              style: {
                fontFamily: 'Quicksand',
                color: "red"
              }
            },

            title: {
              text: 'Pageviews over Time',
              align: 'left',
              style: {
                font: '1.8rem Quicksand',
                color: '#cfd7df',
              }
            },
          
            yAxis: [
                {   //left axis
                    title: {
                      text: 'Pageviews',
                      style: {
                        color: '#9A9FA4',
                        fontSize: '1rem',
                      }
                    },
                    tickInterval: 200000, //gap between each y axis tick
                    min: 0,
                    tickAmount: 5,  //we want 5 ticks on the y axis
                    labels:{
                      style: {
                        color: '#9A9FA4',
                        font: '1rem Quicksand'
                      }
                    }
                },
                {   //right axis
                    title: {
                      text: 'Published Accounts',
                      style: {
                        color: '#9A9FA4',
                        fontSize: '1rem',
                      }
                    },
                    labels:{
                      style: {
                        color: '#9A9FA4',
                        font: '1rem Quicksand'
                      }
                    },
                    opposite: true, //y axis on the opposite(right) side
                    tickInterval: 50,
                    tickAmount: 5,

                },
            ],
          
            xAxis: {
              tickLength: 10,
              tickWidth: 2,
              tickInterval: 24 * 3600 * 1000,
              type: 'datetime',

              labels: {
                format: '{value:%d. %b}',
                style: {
                  color: '#9A9FA4',
                  font: '1rem Quicksand',
                },
                padding: 6,   //spacing between tick and label
              },
              categories : data.map(d=>Date.parse(d.timestamp)),
              showFirstLabel: false
            },

            credits: {
                enabled: false
            },
          
            legend: {
              layout: 'horizontal',
              align: 'right',
              verticalAlign: 'bottom',
              itemMarginTop: 10,
              itemMarginBottom: 10,
              symbolHeight: 10,
              symbolWidth: 20,
              symbolRadius: 5,
              itemStyle: {
                color: '#9A9FA4',
                fontSize: '1rem',
              }
            },
           
          
            
          
            series: [
                {
                    type: 'spline',
                    lineWidth: 4,
                    name: 'Pageviews',
                    data: data.map(d=>[Date.parse(d.timestamp), d.pageviews]),
                    yAxis: 0,
                    color: '#C57666',
                    marker : {
                      enabled: false
                    },

                },
                {
                    name: 'Published Articles',
                    data: data.map(d=>[Date.parse(d.timestamp), d.published_count]),
                    yAxis: 1,
                    color: '#49B3E9',
                    marker: {
                      fillColor: '#49B3E9',
                      symbol: 'circle',
                      radius: 5
                    },
                    dashStyle: 'ShortDash',
                    lineWidth: 3,
                     dataLabels: {
                        enabled: true
                      },

                }
            ],
          
          
          });

    }

    return (
        <>
        <div className='chart-container'>
          <img src={HC_LOGO} alt={'Highcharts Logo'}/>
          <div id='chart'></div>
        </div>
          
        </>
    )
}

export default HighChart;
