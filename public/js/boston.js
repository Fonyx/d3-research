var width = 1000, height = 500, margin = 30;

var marginWidth = width-margin;
var marginHeight = height-margin;
var minDotSize = 2, maxDotSize = 15;

var xMinMax, yMinMax, rMinMax;
var xScale, yScale, rScale;

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

/**
 * collect a linear scale in the horizontal plane for the extent of the data given a specific label
 * @param {[list{object}]} data 
 * @param {'String'} label 
 */
function getHorizontalScale(data, label, minMax){

    let scale = d3.scaleLinear()
        .domain([minMax[0], minMax[1]])
        .range([margin, marginWidth]);

    return scale;
}

/**
 * collect a linear scale in the vertical plane for the extent of the data given a specific label
 * @param {[list{object}]} data 
 * @param {'String'} label 
 */
function getVerticalScale(data, label, minMax){

    let scale = d3.scaleLinear()
        .domain([minMax[1], minMax[0]])
        .range([margin, marginHeight]);

    return scale;
}

/**
 * collect a square root scale in the size dimension for the extent of the data given a specific label
 * @param {[list{object}]} data 
 * @param {'String'} label 
 */
function getSizeScale(data, label, minMax){

    let scale = d3.scaleSqrt()
        .domain([minMax[0], minMax[1]])
        .range([minDotSize, maxDotSize]);

    return scale;
}


var data = d3.json('http://localhost:3000/api/boston')
    .then((data)=>{

        xMinMax = getExtentRange(data, 'poor');
        yMinMax = getExtentRange(data, 'rooms');
        rMinMax = getExtentRange(data, 'value');
        xScale = getHorizontalScale(data, 'poor', xMinMax);
        yScale = getVerticalScale(data, 'rooms', yMinMax);
        rScale = getSizeScale(data, 'value', rMinMax);

        // sort by charles value
        data = data.sort(function(a, b){
            return a.charles - b.charles;
        });
            
        var dots = svg.selectAll('.dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx',function(d){
                return xScale(d.poor);
            })
            .attr('cy',function(d){
                return yScale(d.rooms);
            })
            .attr('r',function(d){
                return rScale(d.value);
            })
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
            .attr('transform', 'translate('+marginWidth+', 0)');
    })

