var width = 1000, height = 500;
var circles;

var svg = d3.select('#chart')
    .append('svg')
    .attr('width', width + 'px')
    .attr('height', height + 'px');


d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv').then(function(data){
    console.log(data);

    circles = svg.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx',function(d){
            return d.year / 30;
        })
        .attr('cy',function(d){
            return d.Amanda / 50;
        })
        .attr('r',function(d){
            return d.year/200;
        })
        .attr('fill','#000')
        .style('opacity', 0.5);
});