

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
