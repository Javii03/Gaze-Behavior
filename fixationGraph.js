//////////////////////////
//Add rectangle to be safe
//////////////////////////
var bar1 = d3.select("svg")
             .attr('transform', 'translate(0,0)')
             .append("rect")
             .attr('width', '1280')
             .attr('height', '1024')
             .attr('fill', 'rgba(0,0,0,0)')
             .attr('stroke', '#2378ae')
             .attr('stroke-width', '3')
///////////////////////////////////////


    var width = 1280;
    var height = 1024;


var data = [0, 150, 200, 250, 1280];
var data1 = [0, 150, 200, 250, 1024];

// Append SVG 
var svg = d3.select("body").select("svg")
            

// Create scale
var scale = d3.scaleLinear()
              .domain([d3.min(data), d3.max(data)])
              .range([0, width - 0]);

var scale1 = d3.scaleLinear()
               .domain([d3.min(data1), d3.max(data1)])
               .range([height/2, 0]);
              

// Add scales to axis
var x_axis = d3.axisBottom()
               .scale(scale);

var y_axis = d3.axisRight()
                .scale(scale);
//Append group and insert axis
svg.append("g")
   .call(x_axis);
  
svg.append("g")
    .attr("transform", "translate(10,10")
   .call(y_axis);


