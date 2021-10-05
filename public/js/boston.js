var width = 1000, height = 500, margin = 30;

var marginWidth = width-margin;
var marginHeight = height-margin;
var minDotSize = 2, maxDotSize = 15;

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
function getHorizontalScale(data, label){

    let minMax = getExtentRange(data, label);
    
    Scale = d3.scaleLinear()
        .domain([minMax[1], minMax[0]])
        .range([margin, marginWidth]);

    return Scale;
}

/**
 * collect a linear scale in the vertical plane for the extent of the data given a specific label
 * @param {[list{object}]} data 
 * @param {'String'} label 
 */
function getVerticalScale(data, label){

    let minMax = getExtentRange(data, label);
    Scale = d3.scaleLinear()
        .domain([minMax[1], minMax[0]])
        .range([margin, marginHeight]);

    return Scale;
}

/**
 * collect a square root scale in the size dimension for the extent of the data given a specific label
 * @param {[list{object}]} data 
 * @param {'String'} label 
 */
function getSizeScale(data, label){

    let minMax = getExtentRange(data, label);

    Scale = d3.scaleSqrt()
        .domain([minMax[0], minMax[1]])
        .range([minDotSize, maxDotSize]);

    return Scale;
}

/**
 * collect a square root scale in the size dimension for the extent of the data given a specific label
 * @param {[list{object}]} data 
 * @param {'String'} label 
 */
function getColorScale(data, label){

    let minMax = getExtentRange(data, label);

    Scale = d3.scaleOrdinal()
        .domain([minMax[0], minMax[1]])
        .range(['#FA7D97', '#64D0FA']);
        //'#AD455A', '#FAF596', '#FA7D97', '#64D0FA', '#4E93AD']);

    return Scale;
}


var data = d3.json('http://localhost:3000/api/boston')
    .then((data)=>{

        let xScale = getHorizontalScale(data, 'poor');
        let yScale = getVerticalScale(data, 'rooms');
        let rScale = getSizeScale(data, 'value');
        let cScale = getColorScale(data, 'charles')
            
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
                return parseInt(d.charles) ? 'charles-dot': 'non-charles-dot';
            })

    })

