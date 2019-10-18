d3.csv("p3.graphFXD.csv").then(function(dataF) {    //Reading the data from the csv files 
    d3.csv("mouse_EVD_graph.csv").then(function(DataM){
    
     var sumBlueTime = 0;   //Initializing values for fixationTime
     var sumRedTime = 0;
     var sumGreenTime = 0;

     var blueFix = 0;    //Initializing values for number of fixations
     var redFix = 0;
     var greenFix = 0;

     var mouseBlue = 0;  //Initializing values for mouse clicks 
     var mouseRed = 0;
     var mouseGreen = 0;

     var bluePerF = 0;
     var redPerF = 0;
     var greenPerF = 0;
     var totalFix = 0;

     var bluePerM = 0;
     var redPerM = 0;
     var greenPerM = 0;
     var totalMouse;

     var minsConvert = 60000;  //To convert miliseconds to minutes 
     var formatDecimal = d3.format(".2f") // To round to the second decimal 

     DataM.forEach(function(d) {
        d.Data1 = +d.Data1;  //To convert the csv string to an int 
        d.Data2 = +d.Data2;
    
        if(d.Data1 < 1280 && d.Data2 < 400)  //Look at value and place it in the 
        {                                   //section they belong 
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
        d.ScreenX = +d.ScreenX;  //To convert the csv string to an int 
        d.ScreenY = +d.ScreenY;
        d.Duration = +d.Duration;
        d.Time = +d.Time;
        if(d.ScreenX < 1280 && d.ScreenY < 400)   //Look at value and place it in the 
        {                                         //section they belong 
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

    

    totalFix = redFix + blueFix + greenFix;      //The total fixation amount 
    
    redPerF = formatDecimal((redFix/totalFix) * 100); //Percent for each quadrant 
    bluePerF = formatDecimal((blueFix/totalFix) * 100);
    greenPerF = formatDecimal((greenFix/totalFix) * 100);

    totalMouse = mouseRed + mouseBlue + mouseGreen;

    redPerM = formatDecimal((mouseRed/totalMouse) * 100);
    bluePerM = formatDecimal((mouseBlue/totalMouse) * 100);
    greenPerM = formatDecimal((mouseGreen/totalMouse) * 100);

    sumRedTime = sumRedTime / minsConvert;    //Convert the seconds to minutes 
    sumBlueTime = sumBlueTime / minsConvert;
    sumGreenTime = sumGreenTime / minsConvert;




var fixPoints = d3.select("svg")      //Add the fixation points to the graphs 
    .selectAll("g")
        .data(dataF)
        .enter()  //Will do a check if group variables are not created


fixPoints.append("circle")
         .attr("cx", function(d) { return d.ScreenX;})
         .attr("cy", function(d) { return d.ScreenY;})
         .attr("r", "5")
         .attr("fill", "yellow")
         .attr('stroke', 'black')
         .attr('stroke-width', '1')

var mousePoints = d3.select("svg")  //Add the mouse events to the graphs 
    .selectAll("g")
    .data(DataM)
    .enter()

mousePoints.append("circle")
    .attr("cx", function(d) { return d.Data1;})
    .attr("cy", function(d) { return d.Data2;})
    .attr("r", "5")
    .attr("fill", "blue")

///////////////////////////////////////////////////////Title for the visualization

var title = d3.select("svg")
            .append("text")
            .attr("x", "800")
            .attr("y", "100")
            .attr("font-size", "3em")
            .style("fill", "black")
            .text("GRAPH");


////////////////////////////////////////////////////CREATING QUADRANTS 
var barInfo = d3.select("svg") //To add the quads 

/////////////////////////////////////////// LEGEND
barInfo.append("circle")
       .attr("cx", "830")
       .attr("cy", "150")
       .attr("r", "15")
       .attr("fill", "yellow")
       .attr("stroke", "black")
       .attr("stroke-width", "5")

barInfo.append("circle")
       .attr("cx", "830")
       .attr("cy", "200")
       .attr("r", "15")
       .attr("fill", "blue")
       .attr("stroke", "black")
       .attr("stroke-width", "5")

barInfo.append("text")  //Information about top box fixation time
       .attr("x", "850")
       .attr("y", "150")
       .attr("font-size", "1.5em")
       .style("fill", "black")
       .text(" = Fixation Point");

barInfo.append("text")  //Information about top box fixation time
       .attr("x", "850")
       .attr("y", "200")
       .attr("font-size", "1.5em")
       .style("fill", "black")
       .text(" = Mouse Click");

///////////////////////////////////////////// LEGEND 

var bar1 = barInfo.append("rect")    //Create the rectangle for top     
                  .attr("x", "0")
                  .attr("y", "5")
                  .attr('width', '1280')
                  .attr('height', '395')
                  .attr('fill', 'rgba(0,0,0,0)')
                  .attr('stroke', 'blue')
                  .attr('stroke-width', '5')
        .on("mouseover", function(d){    //Highlight the box when user hovers over 
                      d3.select(this)
                      .attr("fill", "blue")
                      .attr("opacity", ".5");


        var blueBoxInfo = d3.select("svg").append("rect")  //Add box to enter text in 
                            .attr("x", "820")
                            .attr("y", "230")
                            .attr('width', '320')
                            .attr('height', '110')
                            .attr('fill', 'white')
                            .attr('stroke', 'blue')
                            .attr('stroke-width', '5')
                            .attr("id", "blueRect")


                bar1 = d3.select("svg").append("text")  //Information about top box fixation time
                              .attr("class", "infoText")
                              .attr("x", "820")
                              .attr("y", "250")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("Total fixation time : " + formatDecimal(sumBlueTime) + " mins");

                bar1 = d3.select("svg").append("text")  //Information about top box number of fixations 
                              .attr("class", "infoText")
                              .attr("x", "820")
                              .attr("y", "270")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("Total number of fixations =" + blueFix);

                bar1 = d3.select("svg").append("text") //Information about top box mouse clicks 
                              .attr("class", "infoText")
                              .attr("x", "820")
                              .attr("y", "290")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("Total mouse clicks =" + mouseBlue);

                bar1 = d3.select("svg").append("text")     //Percent total
                              .attr("class", "infoText")
                              .attr("x", "820")
                              .attr("y", "310")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("fixPercent = " + bluePerF +"%");

                bar1 = d3.select("svg").append("text")     //Percent total
                              .attr("class", "infoText")
                              .attr("x", "820")
                              .attr("y", "330")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("mousePercent = " + bluePerM +"%");
                            
                  })
                  .on("mouseout", function(d){   //When user hovers out remove the box and text with information 
                      d3.select(this)
                      .attr('fill', 'rgba(0,0,0,0)')
                      d3.selectAll("text.infoText").remove()
                      d3.selectAll("#blueRect").remove();
                  })

var bar2 = barInfo.append("rect")   //Create the rectangle for bottom left 
                   .attr("x", "0")
                   .attr("y", "405")
                   .attr('width', '640')
                   .attr('height', '615')
                   .attr('fill', 'rgba(0,0,0,0)') 
                   .attr('stroke', 'red')
                   .attr('stroke-width', '5')
        .on("mouseover", function(d){   //Highlight the box when user hovers over 
                    d3.select(this)
                    .attr("fill", "red")
                    .attr("opacity", ".5")
                   
               
                  
                
                var redBoxInfo = d3.select("svg").append("rect") //Add box to enter text in 
                                    .attr("x", "820")
                                    .attr("y", "230")
                                    .attr('width', '320')
                                    .attr('height', '110')
                                    .attr('fill', 'white')
                                    .attr('stroke', 'red')
                                    .attr('stroke-width', '5')
                                    .attr("id", "redRect")


                bar2 = d3.select("svg").append("text")  //Information about box fixation time
                              .attr("class", "infoText")
                              .attr("x", "820")
                              .attr("y", "250")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("Total fixation time: " + formatDecimal(sumRedTime) + " mins");

                bar2 = d3.select("svg").append("text")  //Information about number of fixations
                              .attr("class", "infoText")
                              .attr("x", "820")
                              .attr("y", "270")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("Total number of fixations =" + redFix);

                bar2 = d3.select("svg").append("text")     //Information about mouse clicks 
                              .attr("class", "infoText")
                              .attr("x", "820")
                              .attr("y", "290")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("Total mouse clicks =" + mouseRed);

                bar2 = d3.select("svg").append("text")     //Percent total
                              .attr("class", "infoText")
                              .attr("x", "820")
                              .attr("y", "310")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("fixPercent = " + redPerF +"%");


                bar2 = d3.select("svg").append("text")     //Percent total
                              .attr("class", "infoText")
                              .attr("x", "820")
                              .attr("y", "330")
                              .attr("font-size", "1.5em")
                              .style("fill", "black")
                              .text("mousePercent = " + redPerF +"%");
                            
                              
      
                    
                })
                .on("mouseout", function(d){    //When user hovers out remove the box and text with information
                    d3.select(this)
                    .attr('fill', 'rgba(0,0,0,0)')
                    d3.selectAll("text.infoText").remove()
                    d3.selectAll("#redRect").remove();
                })
           
var bar3 = barInfo.append("rect")   //Create the rectangle for bottom right 
                  .attr("x", "640")
                  .attr("y", "405")
                  .attr('width', '640')
                  .attr('height', '615')
                  .attr('fill', 'rgba(0,0,0,0)')
                  .attr('stroke', 'green')
                  .attr('stroke-width', '5')
        .on("mouseover", function(d){   //Highlight the box when user hovers over 
                    d3.select(this)
                    .attr("fill", "green")
                    .attr("opacity", ".5");

            var redBoxInfo = d3.select("svg").append("rect") //Add box to enter text in 
                    .attr("x", "820")
                    .attr("y", "230")
                    .attr('width', '320')
                    .attr('height', '110')
                    .attr('fill', 'white')
                    .attr('stroke', 'green')
                    .attr('stroke-width', '5')
                    .attr("id", "greenRect")
             
            bar3 = d3.select("svg").append("text")  //Information about box fixation time
                           .attr("class", "infoText")
                           .attr("x", "820")
                           .attr("y", "250")
                           .attr("font-size", "1.5em")
                           .style("fill", "black")
                           .text("Total fixation time: " + formatDecimal(sumGreenTime) + " mins");

             bar3 = d3.select("svg").append("text")    //Information about number of fixations
                           .attr("class", "infoText")
                           .attr("x", "820")
                           .attr("y", "270")
                           .attr("font-size", "1.5em")
                           .style("fill", "black")
                           .text("Total number of fixations =" + greenFix);

             bar3 = d3.select("svg").append("text")     //Information about mouse clicks 
                           .attr("class", "infoText")
                           .attr("x", "820")
                           .attr("y", "290")
                           .attr("font-size", "1.5em")
                           .style("fill", "black")
                           .text("Total mouse clicks =" + mouseGreen);

            bar3 = d3.select("svg").append("text")     //Percent total
                           .attr("class", "infoText")
                           .attr("x", "820")
                           .attr("y", "310")
                           .attr("font-size", "1.5em")
                           .style("fill", "black")
                           .text("fixPercent = " + greenPerF +"%");


             bar3 = d3.select("svg").append("text")     //Percent total
                           .attr("class", "infoText")
                           .attr("x", "820")
                           .attr("y", "330")
                           .attr("font-size", "1.5em")
                           .style("fill", "black")
                           .text("mousePercent = " + greenPerM +"%");
                         
                })
                .on("mouseout", function(d){        //When user hovers out remove the box and text with information
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
