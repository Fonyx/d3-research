var width = 1000, height = 500, margin = 150;

var marginWidth = width-margin;
var marginHeight = height-margin;

var circles;

var svg = d3.select('#chart')
    .append('svg')
    .attr('width', width + 'px')
    .attr('height', height + 'px');


var data = d3.json('http://localhost:3000/api/boston')
    .then((data)=>{

        var xMinMax = d3.extent(data, (element)=>{
            return parseFloat(element.poor);
        });
        
        xScale = d3.scaleLinear()
            .domain([xMinMax[0], xMinMax[1]])
            .range([margin, marginWidth]);
                var yMinMax = d3.extent(data, (element)=>{
            return parseFloat(element.rooms);
        });
        
        yScale = d3.scaleLinear()
            .domain([yMinMax[0], yMinMax[1]])
            .range([margin, marginHeight]);
        
        circles = svg.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx',function(d){
            return xScale(d.poor);
        })
        .attr('cy',function(d){
            return yScale(d.rooms);
        })
        .attr('r',function(d){
            return parseFloat(d.value)/2;
        })
        .attr('fill','#000')
        .style('opacity', 0.5);
    })

