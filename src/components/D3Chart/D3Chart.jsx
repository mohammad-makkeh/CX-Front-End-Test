import './D3Chart.css'
import D3_LOGO from '../../assets/d3.png'
import {d3Config} from '../../config';
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';


const Chart = () => {

    //manage state of fetched data
    const [data, setData] = useState(null);
    const ref = useRef();
    
    //fetch the data
    useEffect(()=>{
        fetch(d3Config.dataURL)
            .then(res => res.json())
            .then(res => {
                const {data} = res;
                data.map(record=>{
                    record.timestamp = d3.timeParse('%Y-%m-%d')(record.timestamp.substring(0, 10));
                });
                setData(data);
            })
    
    }, []);

    //draw the graph whever data changes
    useEffect(()=>{
        if(data){
            console.log(data)
            draw()
        }
    }, [data]);

    
    const draw = () => {
        //empty our container before we append a new chart
        ref.current.innerHTML = '';
        const axisPadding = 30; //variable used to adjust the distance bwetween the axis and the labels

        
        //creating the paretn svg
        const svg = d3
            .select(ref.current)
            .append('svg')
            .attr('width', d3Config.width + d3Config.margin.left + d3Config.margin.right)
            .attr('height', d3Config.height + d3Config.margin.top + d3Config.margin.bottom)
            .append("g")
            .attr("transform", `translate(${d3Config.margin.left},${d3Config.margin.top})`);

        // Add X axis
        //create it
        const x = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.timestamp; }))
            .range([ 0, d3Config.width ])
        //append to the svg
        svg.append("g")
            .attr("transform", `translate(-10, ${d3Config.height})`)  //cz initially it's on top
            .attr("class", 'xAxis')
            .call(d3.axisBottom(x)
                    .ticks(d3.timeDay.every(1))
                    .tickFormat(d3.timeFormat("%d.%b"))
                    .tickSizeOuter(0)
                    .tickSize(12)
                    .tickPadding(8)
                    .tickValues(data.map(d=>d.timestamp).filter((d, i)=> i != data.length - 1))
                );

        // Add Y axis - 1
        //create it
        const y1 = d3.scaleLinear()
            .domain([0, 800000])
            .range([ d3Config.height, 0 ]);
        //append to the svg
        svg.append("g")
            .attr("transform", `translate(${- axisPadding}, 0)`)
            .attr("class", 'vAxis')
            .call(d3.axisLeft(y1)
                    .ticks(5)
                    .tickFormat(d3Config.pageReviewsFormat)
                    .tickSize(0)
                );


        // Add Y axis - 2
        //create it
        const y2 = d3.scaleLinear()
            .domain([100, 300])
            .range([ d3Config.height, 0 ]);
        //append to the svg
        svg.append("g")
            .attr("transform", `translate(${d3Config.width + axisPadding}, 0)`)
            .attr("class", 'vAxis supports-hLines')
            .call(d3.axisRight(y2)
                    .ticks(5)
                    .tickSize(-d3Config.width)
                );
            
        

        // Add line1 (pagereviews)
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#C57666")
            .attr("stroke-width", 3)
            .attr("d", d3.line()
                .x(function(d) { return x(d.timestamp) })
                .y(function(d) { return y1(d.pageviews) })
                .curve(d3.curveNatural)
                )
        
        // Add line (articles published)
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#49B3E9")
            .attr("stroke-width", 3)
            .attr("d", d3.line()
                .x(function(d) { return x(d.timestamp) })
                .y(function(d) { return y2(d.published_count) })
                )
            .attr('stroke-dasharray', '8, 3');
        
        // Add the marker circles on inline data points
        svg.selectAll("myCircles")
            .data(data)
            .enter()
            .append("circle")
              .attr("fill", "#49B3E9")
              .attr("stroke", "none")
              .attr("cx", function(d) { return x(d.timestamp) })
              .attr("cy", function(d) { return y2(d.published_count) })
              .attr("r", 5)
        
        //add tha inline graph value labels
        let label = svg.selectAll(".label")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "label")
            .attr("transform", function(d) { return "translate(" + x(d.timestamp) + "," + (y2(d.published_count)) + ")"; });

        label.append("text")
            .attr("dy", (d) => d.published_count >= 280 ? '1.5rem' : '-.75rem')
            .text(function(d) { return d.published_count; })
        
        label.append("text")
            .datum(data)
            .attr("x", 20)
            .attr("y", 20)
            .attr("width", function() { return d3Config.width + 2 * 20; })
            .attr("height", function() { return d3Config.height + 2 * 20; });


        //title for y-axis 1
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", - d3Config.margin.left)
            .attr("x", - (d3Config.height / 2))
            .attr("dy", "1em")
            .attr("fill", "#6a6d70")
            .attr("font-weight", "900")
            .style("text-anchor", "middle")
            .text("Pageviews");

        //title for y-axis 2
        svg.append("text")
            .attr("transform", "rotate(90)")
            .attr("y", - (d3Config.width + d3Config.margin.right - 20))
            .attr("x",  (d3Config.height / 2))
            .attr("dy", "1em")
            .attr("fill", "#6a6d70")
            .attr("font-weight", "900")
            .style("text-anchor", "middle")
            .text("Published Articles");
    }


    return(
        <>
            <div className="chart-container">
                <img src={D3_LOGO} alt={'D3 Logo'}/>
                <h1 className="title">Pageview over Time</h1>
                <div ref={ref}></div>
            </div>
        </>
    )
}

export default Chart;



