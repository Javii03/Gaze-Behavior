//////////////////////////
//Add rectangle to be safe
//////////////////////////
var bar1 = d3.select("svg")
             .attr('transform', 'translate(0,0)')
             .append("rect")
             .attr('width', '1280')
             .attr('height', '500')
             .attr('fill', 'rgba(0,0,0,0)')
             .attr('stroke', '#2378ae')
             .attr('stroke-width', '3')
///////////////////////////////////////


    var width = 1280;


var data = [0, 150, 200, 250, 1280];

// Append SVG 
var svg = d3.select("body").select("svg")
            

// Create scale
var scale = d3.scaleLinear()
              .domain([d3.min(data), d3.max(data)])
              .range([0, width - 600]);

// Add scales to axis
var x_axis = d3.axisBottom()
               .scale(scale);

//Append group and insert axis
svg.append("g")
   .call(x_axis);
