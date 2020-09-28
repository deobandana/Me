// Reading in json data from a file
var bioData; 

d3.json("samples.json").then((importedData) => {
    console.log(importedData);
    bioData = importedData;
    console.log(bioData);


// Adding id #s to dropdown menu
for (var i = 0; i < bioData.names.length; i++) {
    d3.select("#selDataset").append("option").text(bioData.names[i]);
}
});

// Write a  function (with the same name as referred to in html) 
//that will filter data by person id based on the 
//one selected in the dropdown

function optionChanged(id) {
    // This is the function that's called (from the HTML) whenever the dropdown list changes.  
    // (I.e. someone picked a new test candidate)
    
    // Filter the samples to only those for the single test candidate (functional parameter "id").
    // The results will be an array (with only one matching element), so return the first [0] element in that array.
    function filterbyId(person) {
        return person.id == id;
    }
    // returns an array of samples for all people who matched
    var samples = bioData.samples.filter(filterbyId);
    // gets the matched sample
    var sample = samples[0];
    
    // Start with empty arrays
      var otuIds = [];
      var labels = [];
      var values = [];
      var hover = [];

    // Loop through the first/top-ten OTUs for this test candidate.
    // Add their OTU ID, value, and labels to the arrays.
    for (var i = 0; i < 10; i++) {
        otuIds.push(sample.otu_ids[i]);
        labels.push('OTU ' + sample.otu_ids[i]);
        values.push(sample.sample_values[i]);
        hover.push(sample.otu_labels[i]);
      }
    
    otuIds = otuIds.reverse();
    labels = labels.reverse();
    values = values.reverse();
    hover = hover.reverse();

    //Build bar chart with OTU data
    var trace = {
        x: values,
        y: labels,
        type: "bar",
        orientation: "h"
      };

    var data = [trace];

    // Define our plot layout
      var layout = {
        title: "Top OTUs Found in Navel",
      };
      
      //Plot the chart to a div tag with id "bar-plot"
      Plotly.newPlot("bar", data, layout);

    /// METADATA table
    // Define filter for metadata
    // returns an array of samples for all people who matched
    var people = bioData.metadata.filter(filterbyId);
    // gets the matched sample
    var person = people[0];

    d3.select("#sample-metadata").text("");
    d3.select("#sample-metadata").append("div").text("id: " + person.id);
    d3.select("#sample-metadata").append("div").text("ethnicity: " + person.ethnicity);
    d3.select("#sample-metadata").append("div").text("gender: " + person.gender);
    d3.select("#sample-metadata").append("div").text("age: " + person.age);
    d3.select("#sample-metadata").append("div").text("location: " + person.location);
    d3.select("#sample-metadata").append("div").text("bbtype: " + person.bbtype);
    d3.select("#sample-metadata").append("div").text("wash freq: " + person.wfreq);

    ///BUBBLE CHART
    // Start with empty arrays
      var otuIds = [];
      var labels = [];
      var values = [];
      var hover = [];

    // Loop through the first/top-ten OTUs for this test candidate.
    // Add their OTU ID, value, and labels to the arrays.
    for (var i = 0; i < sample.otu_ids.length; i++) {
        otuIds.push(sample.otu_ids[i]);
        labels.push('OTU ' + sample.otu_ids[i]);
        values.push(sample.sample_values[i]);
        hover.push(sample.otu_labels[i]);
      }

    //Build bar chart with OTU data
    var trace1 = {
        x: otuIds,
        y: values,
        mode: 'markers',
        marker: {
            color: otuIds,
            size: values
          }
        };

    var data = [trace1];

    // Define our plot layout
      var layout = {
        title: "Samples of OTU Bacteria",
        height: 600,
        width: 1200
      };
      
      //Plot the chart to a div tag with id "bar-plot"
      Plotly.newPlot("bubble", data, layout);

};





