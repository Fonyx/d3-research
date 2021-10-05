var width = 1000, height = 500, margin = 30;

var marginWidth = width-margin;
var marginHeight = height-margin;
var dotSize = [2, 25]

var xMinMax, yMinMax, rMinMax;
var xScale, yScale, rScale;

var dots;

var svg = d3.select('#chart')
    .append('svg')
    .attr('width', width + 'px')
    .attr('height', height + 'px');


function getExtentRange(data, label){
    var minMax = d3.extent(data, (element)=>{
        return parseFloat(element[label]);
    });
    return minMax
}

var data = d3.json('http://localhost:3000/api/boston')
    .then((data)=>{

        xMinMax = getExtentRange(data, 'poor');
        yMinMax = getExtentRange(data, 'rooms');
        rMinMax = getExtentRange(data, 'value');

        xScale = d3.scaleLinear()
            .domain([xMinMax[0], xMinMax[1]])
            .range([margin+dotSize[1]+1, marginWidth-dotSize[1]-1]);

        yScale = d3.scaleLinear()
            .domain([yMinMax[1], yMinMax[0]])
            .range([margin+dotSize[1]+1, marginHeight-dotSize[1]-1]);

        rScale = d3.scaleLinear()
            .domain([rMinMax[0], rMinMax[1]])
            .range([dotSize[0], dotSize[1]]);

        // sort by charles value
        data = data.sort(function(a, b){
            return a.charles - b.charles;
        });
            
        dots = svg.selectAll('.dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('r',"0")
            .attr('cx', 0)
            .attr('cy', height)
            // change class assigned based on the charles boolean for fill rendering
            .attr('class', (d)=>{
                return parseInt(d.charles) ? 'dot charles': 'dot non-charles';
            })
        
        // axis details
        xAxis = d3.axisBottom(xScale).tickValues([xMinMax[0], xMinMax[1]]);
        xAxisG = svg.append('g')
            .attr('id', 'xAxis')
            .attr('class', 'axis');

        xAxisG.call(xAxis)
            .attr('transform', 'translate(0,'+marginHeight+')');
            
        yAxis = d3.axisLeft(yScale).tickValues([yMinMax[0], yMinMax[1]]);
        yAxisG = svg.append('g')
        .attr('id', 'yAxis')
        .attr('class', 'axis');

        yAxisG.call(yAxis)
            .attr('transform', 'translate('+margin+', 0)');

        update();
    });

function update(){
    dots.transition()
        .delay(function(d, i){
            return i*3;
        })
        .attr("r", function(d){
            return rScale(d.value);
        })
        .attr("cx", function(d){
            return xScale(d.poor);
        })
        .attr("cy", function(d){
            return yScale(d.rooms);
        })
}


