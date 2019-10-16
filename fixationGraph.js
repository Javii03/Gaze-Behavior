d3.csv("p3.graphFXD.csv").then(function(dataF) {
    d3.csv("mouse_EVD_graph.csv").then(function(DataM){
    
     var sumBlueTime = 0;
     var sumRedTime = 0;
     var sumGreenTime = 0;
     var blueFix = 0;
     var redFix = 0;
     var greenFix = 0;

     var mouseBlue = 0;
     var mouseRed = 0;
     var mouseGreen = 0;

     var minsConvert = 60000;
     var formatDecimal = d3.format(".2f")

     DataM.forEach(function(d) {
        d.Data1 = +d.Data1; //You need to use this 
        d.Data2 = +d.Data2;
    
        if(d.Data1 < 1280 && d.Data2 < 400)
        {
            mouseBlue += 1;
        }
        else if(d.Data1 < 640 && d.Data2 > 400)
        {
            mouseRed += 1;
        }
        else{
            mouseGreen += 1;
        }
    });



    dataF.forEach(function(d) {
        d.ScreenX = +d.ScreenX; //You need to use this 
        d.ScreenY = +d.ScreenY;
        d.Duration = +d.Duration;
        d.Time = +d.Time;
        if(d.ScreenX < 1280 && d.ScreenY < 400)
        {
            sumBlueTime += d.Duration;
            blueFix += 1;
        }
        else if(d.ScreenX < 640 && d.ScreenY > 400)
        {
            sumRedTime += d.Duration;
            redFix += 1;
        }
        else{
            sumGreenTime += d.Duration;
            greenFix += 1;
        }
    });

    

    sumRedTime = sumRedTime / minsConvert;
    sumBlueTime = sumBlueTime / minsConvert;
    sumGreenTime = sumGreenTime / minsConvert;

var fixPoints = d3.select("svg")
    .selectAll("g")
        .data(dataF)
        .enter()  //Will do a check if group variables are not created


fixPoints.append("circle")
         .attr("cx", function(d) { return d.ScreenX;})
         .attr("cy", function(d) { return d.ScreenY;})
         .attr("r", "5")
         .attr("fill", "yellow")

var mousePoints = d3.select("svg")
    .selectAll("g")
    .data(DataM)
    .enter()

mousePoints.append("circle").raise()
    .attr("cx", function(d) { return d.Data1;})
    .attr("cy", function(d) { return d.Data2;})
    .attr("r", "5")
    .attr("fill", "blue")

///////////////////////////////////////////////////////Title 

var title = d3.select("svg")
            .append("text")
                              
            .attr("x", "800")
            .attr("y", "100")
            .attr("font-size", "3em")
            .style("fill", "black")
            .text("GRAPH");


////////////////////////////////////////////////////CREATING QUADRANTS 
var barInfo = d3.select("svg") //To add the quads 

var bar1 = barInfo.append("rect")   
                  .attr("x", "0")
                  .attr("y", "5")
                  .attr('width', '1280')
                  .attr('height', '395')
                  .attr('fill', 'rgba(0,0,0,0)')
                  .attr('stroke', 'blue')
                  .attr('stroke-width', '5')
        .on("mouseover", function(d){
                      d3.select(this)
                      .attr("fill", "blue")
                      .attr("opacity", ".5");


        var blueBoxInfo = d3.select("svg").append("rect")
                       .attr("x", "800")
                       .attr("y", "250")
                       .attr('width', '320')
                       .attr('height', '80')
                       .attr('fill', 'white')
                       .attr('stroke', 'blue')
                       .attr('stroke-width', '5')
                       .attr("id", "blueRect")


                bar1 = d3.select("svg").append("text")
                              .attr("class", "infoText")
                              .attr("x", "800")
                              .attr("y", "270")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("Total fixation : " + formatDecimal(sumBlueTime) + " mins");

                bar1 = d3.select("svg").append("text")
                              .attr("class", "infoText")
                              .attr("x", "800")
                              .attr("y", "290")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("Total number of Fixations =" + blueFix);

                bar1 = d3.select("svg").append("text")
                              .attr("class", "infoText")
                              .attr("x", "800")
                              .attr("y", "310")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("Total mouse clicks =" + mouseBlue);
                            
                  })
                  .on("mouseout", function(d){
                      d3.select(this)
                      .attr('fill', 'rgba(0,0,0,0)')
                      d3.selectAll("text.infoText").remove()
                      d3.selectAll("#blueRect").remove();
                  })

var bar2 = barInfo.append("rect")
                   .attr("x", "0")
                   .attr("y", "405")
                   .attr('width', '640')
                   .attr('height', '615')
                   .attr('fill', 'rgba(0,0,0,0)') 
                   .attr('stroke', 'red')
                   .attr('stroke-width', '5')
        .on("mouseover", function(d){
                    d3.select(this)
                    .attr("fill", "red")
                    .attr("opacity", ".5")
                   
               
                  
                
                var redBoxInfo = d3.select("svg").append("rect")
                       .attr("x", "300")
                       .attr("y", "430")
                       .attr('width', '320')
                       .attr('height', '80')
                       .attr('fill', 'white')
                       .attr('stroke', 'red')
                       .attr('stroke-width', '5')
                       .attr("id", "redRect")


                bar2 = d3.select("svg").append("text")
                              .attr("class", "infoText")
                              .attr("x", "300")
                              .attr("y", "450")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("Total fixation : " + formatDecimal(sumRedTime) + " mins");

                bar2 = d3.select("svg").append("text")
                              .attr("class", "infoText")
                              .attr("x", "300")
                              .attr("y", "470")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("Total number of Fixations =" + redFix);

                bar2 = d3.select("svg").append("text")
                              .attr("class", "infoText")
                              .attr("x", "300")
                              .attr("y", "490")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("Total mouse clicks =" + mouseRed);
                            
                              
      
                    
                })
                .on("mouseout", function(d){
                    d3.select(this)
                    .attr('fill', 'rgba(0,0,0,0)')
                    d3.selectAll("text.infoText").remove()
                    d3.selectAll("#redRect").remove();
                })
           
var bar3 = barInfo.append("rect")
                  .attr("x", "640")
                  .attr("y", "405")
                  .attr('width', '640')
                  .attr('height', '615')
                  .attr('fill', 'rgba(0,0,0,0)')
                  .attr('stroke', 'green')
                  .attr('stroke-width', '5')
        .on("mouseover", function(d){
                    d3.select(this)
                    .attr("fill", "green")
                    .attr("opacity", ".5");


            var greenBoxInfo = d3.select("svg").append("rect")
                    .attr("x", "700")
                    .attr("y", "430")
                    .attr('width', '320')
                    .attr('height', '80')
                    .attr('fill', 'white')
                    .attr('stroke', 'green')
                    .attr('stroke-width', '5')
                    .attr("id", "greenRect")


             bar3 = d3.select("svg").append("text")
                           .attr("class", "infoText")
                           .attr("x", "700")
                           .attr("y", "450")
                           .attr("font-size", "1.5em")
                           .style("fill", "black")
                           .text("Total fixation : " + formatDecimal(sumGreenTime) + " mins");

             bar3 = d3.select("svg").append("text")
                           .attr("class", "infoText")
                           .attr("x", "700")
                           .attr("y", "470")
                           .attr("font-size", "1.5em")
                           .style("fill", "black")
                           .text("Total number of Fixations =" + greenFix);

             bar3 = d3.select("svg").append("text")
                           .attr("class", "infoText")
                           .attr("x", "700")
                           .attr("y", "490")
                           .attr("font-size", "1.5em")
                           .style("fill", "black")
                           .text("Total mouse clicks =" + mouseGreen);
                         
                })
                .on("mouseout", function(d){
                    d3.select(this)
                    .attr('fill', 'rgba(0,0,0,0)')
                    d3.selectAll("text.infoText").remove()
                    d3.selectAll("#greenRect").remove();
                })
         

        
//////////////////////////////////////////CREATING AXIS
            var width = 1280;
            var height = 1024;
             
             
             var dataX = [0, 150, 200, 250, 1280];
             var dataY = [0, 150, 200, 250, 1024];
             
             // Append SVG 
             var svg = d3.select("body").select("svg")
                         
             
             // Create scale
             var scale = d3.scaleLinear()
                           .domain([d3.min(dataX), d3.max(dataX)])
                           .range([0, width - 0]);
             
             var scale1 = d3.scaleLinear()
                            .domain([d3.min(dataY), d3.max(dataY)])
                            .range([height/2, 0]);
                           
             
             // Add scales to axis
             var x_axis = d3.axisBottom()
                            .scale(scale);
             
             var y_axis = d3.axisRight()
                             .scale(scale);
             //Append group and insert axis
             svg.append("g")
                .call(x_axis)
                .style("font-size", "20px")
               
             svg.append("g")
                .style("font-size", "20px")
                .attr("transform", "translate(10,10")
                .call(y_axis);

    });
});
