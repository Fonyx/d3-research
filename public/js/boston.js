var width = 1000, height = 500;
var circles;

var svg = d3.select('#chart')
    .append('svg')
    .attr('width', width + 'px')
    .attr('height', height + 'px');


// async function loadBoston(){
//     let response = await fetch('http://localhost:3000/api/boston');
//     let data = await response.json();
//     return data
// }

// loadBoston();


var data = d3.json('http://localhost:3000/api/boston')
    .then((data)=>{
        circles = svg.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx',function(d){
            return parseFloat(d.poor);
        })
        .attr('cy',function(d){
            return parseFloat(d.rooms) * 50;
        })
        .attr('r',function(d){
            return parseFloat(d.value)/2;
        })
        .attr('fill','#000')
        .style('opacity', 0.5);
    })

