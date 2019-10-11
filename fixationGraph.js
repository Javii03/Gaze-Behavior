d3.csv("p3.graphFXD.csv").then(function(data) {
    
    data.forEach(function(d) {
        d.ScreenX = +d.ScreenX; //You need to use this 
        d.ScreenY = +d.ScreenY;
        d.Duration = +d.Duration;
        d.Time = +d.Time;
    });


var fixPoints = d3.select("svg")
    .selectAll("g")
        .data(data)
        .enter()  //Will do a check if group variables are not created 
        .append("g") //Will add them to a group once they are used with enter 
            .attr("class", "fixation")

fixPoints.append("circle")
    .attr("cx", function(d) { return d.ScreenX;})
    .attr("cy", function(d) { return d.ScreenY;})
    .attr("r", function(d){
        if(d.Duration < 100) {
            return 5;
        }
        else if(d.Duration < 300 && d.Duration > 100){
            return 10;
        }
        else if(d.Duration < 500 && d.Duration > 300){
            return 15;
        }
        else if(d.Duration < 700 && d.Duration > 500)
        {
            return 20;
        }
        else if(d.Duration < 1000 && d.Duration > 700)
        {
            return 25;
        }
        else if(d.Duration < 2000 && d.Duration > 1000)
        {
            return 30;
        }
        else {
            return 35;
        }
    });
fixPoints.attr("fill", function(d){
            if(d.Duration < 100) {
                return "yellow";
            }
            else if(d.Duration < 300 && d.Duration > 100){
                return "purple";
            }
            else if(d.Duration < 500 && d.Duration > 300){
                return "red";
            }
            else if(d.Duration < 700 && d.Duration > 500)
            {
                return "green";
            }
            else if(d.Duration < 1000 && d.Duration > 700)
            {
                return "black";
            }
            else
            {
                return "blue";
            }
            
        });



var fixationAmt = d3.nest()
  .key(function(d) { return d.DurationOptions})
  .entries(data);

var selector = d3.select("#selector");

selector
        .selectAll("options")
        .data(fixationAmt)
        .enter()
        .append("option")
            .text(function(d) { return d.key })
            .attr("value", function(d){ return d.key; })

selector
    .on("change", function(){
         d3.selectAll(".fixation")
         .attr("opacity", 1.0);
    var value = selector.property("value"); 
    d3.selectAll(".fixation")
        .filter(function(d) {return d.Duration < value})
        .attr("opacity", 0.1);
    })
    
});
