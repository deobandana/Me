/////////////////////////////////////////////////////////////////////////////////////////////////////
// function1: get the top 10 OTU
/////////////////////////////////////////////////////////////////////////////////////////////////////
function getTop10OOTU(sample, name) {
  //lookup the data by experiment name 
  var sampleResult = sample.filter(item => item.id === name)[0];

  // rowData list for json data struction
  var rowDataList = [];

  //loop all experiment record for the certain id
  for (var i = 0; i < sampleResult.otu_ids.length; i++) {
    //create a json dict and push it into list
    newDict = {
      sampleValues: sampleResult.sample_values[i],
      otuId: sampleResult.otu_ids[i],
      otuLabel: sampleResult.otu_labels[i]
    }
    rowDataList.push(newDict)
  }
  // Sorted json by the sampleValues
  var sortedList = rowDataList.sort((a, b) => b.sampleValues - a.sampleValues);

  // get the top ten json data
  var showData = sortedList.slice(0, 10)

  return showData;

}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// function1: End
/////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
// function2: show bar chart
/////////////////////////////////////////////////////////////////////////////////////////////////////
function showbarChart(sample, name) {
  var showData = getTop10OOTU(sample, name);
  //create trace for display
  var traceDisplay1 = [{
    // x value 
    x: showData.map(item => item.sampleValues).reverse(),
    // y value 
    y: showData.map(item => 'OTU ' + item.otuId).reverse(),
    // set y value as the lable 
    labels: showData.map(item => 'OTU ' + item.otuId).reverse(),
    //show label for text display 
    text: showData.map(item => item.otuLabel).reverse(),
    //show bar chart
    type: "bar",
    //set the orient
    orientation: "h"
  }];
  // Bar layout
  var disPlayLayout1 = {
    title: { text: "The top 10 OTUs" },
    autosize: true,
    // height: 400,
    // width: 400,
    margin: {
      l: 100,
      r: 10,
      b: 20,
      t: 30,
      pad: 0
    },
    showlegend: false
  };
  //Plotly to plot bar chart layout 
  Plotly.newPlot("bar", traceDisplay1, disPlayLayout1, { displayModeBar: false });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// function2: End
/////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////
// function3: show pie chart
/////////////////////////////////////////////////////////////////////////////////////////////////////

function showpieChart(sample, name) {

  var showData = getTop10OOTU(sample, name);
  var trace1 = {
    labels: showData.map(item => item.otuId),
    values: showData.map(item => item.sampleValues),
    type: 'pie'
  };

  var traceDisplay1 = [trace1];

  var disPlayLayout1 = {
    title: { text: "The top 10 OTUs" },
    autosize: true,
    showlegend: true
  };

  Plotly.newPlot("bar", traceDisplay1, disPlayLayout1);

}
/////////////////////////////////////////////////////////////////////////////////////////////////////
// function3: End
/////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////
// function4: bubble chart
/////////////////////////////////////////////////////////////////////////////////////////////////////

function showbubbleChart(sample, name) {

  //lookup the data by experiment name 
  var sampleResult = sample.filter(item => item.id === name)[0];

  //create a trace bubble
  var traceDisplay2 = [{
    x: sampleResult.otu_ids, //X axis, show experiment ID
    y: sampleResult.sample_values, //Y axis, show experiment result
    text: sampleResult.otu_labels, // show dynamic info on the bar

    mode: 'markers',
    marker: {
      size: sampleResult.sample_values, // the size of the bubble by the value of experiment 
      // color: sampleResult.sample_values.map(element => element * 100),


      color: sampleResult.otu_ids,
      colorscale: "Earth"



    }
  }];

  // BUbble chart layout 
  var disPlayLayout2 = {
    autosize: true,
    xaxis: { title: "OTU ID" },
    title: "Bubble chart",
    config: {
      'displayModeBar': true
  }
  };
  // bubble chart layout
  Plotly.newPlot('bubble', traceDisplay2, disPlayLayout2);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// function4: End
/////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
// function5: show Gauge chart
/////////////////////////////////////////////////////////////////////////////////////////////////////

function showGauge(metadata, name) {

  //lookup the data by experiment name 
  var sampleMeta = metadata.filter(m => m.id === parseInt(name));

  var traceDisplay3 = [
    {
      // setup gauge type
      type: "indicator",
      mode: "gauge+number+delta",
      // setup the value of indicator
      value: sampleMeta[0].wfreq,
      // setup the display title
      title: {
        text: "Belly Button Wash Frequency (Scrubs Per Week)",
        font: { size: 14, color: 'black' }
      },
      delta: { reference: 0, increasing: { color: "RebeccaPurple" } },
      gauge: {
        axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        //setup gauge color
        steps: [
          { range: [0, 1], color: "#009a60" },
          { range: [1, 2], color: '#4aa84e' },
          { range: [2, 3], color: '#92b73a' },
          { range: [3, 4], color: '#c6bf22' },
          { range: [4, 5], color: '#edbd02' },
          { range: [5, 6], color: '#ffad00' },
          { range: [6, 7], color: '#ff8c00' },
          { range: [7, 8], color: '#fc6114' },
          { range: [8, 9], color: '#f43021' }

        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 490
        }
      }
    }
  ];
  // gauge chart layout 
  var disPlayLayout3 = {
    // width: 400,
    // height: 400,
    autosize: true,
    margin: { t: 0, r: 25, l: 25, b: 25, pad: 0 },

    paper_bgcolor: "white",
    font: { color: "darkblue", family: "Arial" }
  };
  // gauge chart layout
  Plotly.newPlot('gauge', traceDisplay3, disPlayLayout3);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
// function5 : end
/////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////
// function6: show otu info
/////////////////////////////////////////////////////////////////////////////////////////////////////

function showInfo(metadata, name) {
  //lookup the data by experiment name 
  var sampleMeta = metadata.filter(item => item.id === parseInt(name));
  // selection variable in order to update info
  var sample_metadata = d3.select("#sample-metadata");
  // clear the html
  sample_metadata.html("");

  // Use Object.entries to add each key and value pair to the panel
  Object.entries(sampleMeta[0]).forEach(([key, value]) => {
    var row = sample_metadata.append("p");
    row.text(`${key.toUpperCase()}: ${value}`);
  })

}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// function6 : end
/////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
// function7: get Checked RadioValue
/////////////////////////////////////////////////////////////////////////////////////////////////////
function getCheckedRadioValue(radioGroupName) {
  var rads = document.getElementsByName(radioGroupName),
    i;
  for (i = 0; i < rads.length; i++)
    if (rads[i].checked)
      return rads[i].value;
  return null; // or undefined, or your preferred default for none checked
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
// function7 : end
/////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////
// program entrance
/////////////////////////////////////////////////////////////////////////////////////////////////////
// retrieve data from json file and update dropdown menu
d3.json("data/samples.json").then((dataset) => {
  var selectDrop = d3.select("#selDataset");
  selectDrop.selectAll('option')
    .data(dataset.names.map(item => "BB_" + item))
    .enter().append('option')
    .text(text => text)

  //retrieve lab test lable list from dataset
  var names = dataset.names;

  //retrieve lab sample data from dataset
  var sample = dataset.samples;

  //retrieve lab metadata data from dataset
  var metadata = dataset.metadata;


  //show the first lab data's bar and bubble chart
  showbarChart(sample, names[0])
  //show the first lab's data info
  showInfo(metadata, names[0])
  //show the first lab data's Gauge chart
  showGauge(metadata, names[0])

  //show the first bubble chart
  showbubbleChart(sample, names[0])

  selectDrop.on("change", triggerDropdownList);
  // The event handler function triggerDropdownList()
  function triggerDropdownList() {
    // Stopped refreshing with .prevent
    d3.event.preventDefault();
    // Select the inputElement
    var inputElement = d3.select("select");
    // Acquire the value property of the inputEelement and remove BB_.
    var userSample = inputElement.property("value").replace('BB_', '');

    //Acquire the the value property of the radio input
    checkedValue = getCheckedRadioValue("type");

    if (checkedValue==='bar'){
    //show the bar chart
      showbarChart(sample, userSample);
    } else {
    //show the Pie chart
      showpieChart(sample, userSample);
    }

    //show data info
    showInfo(metadata, userSample)
    //show Gauge chart
    showGauge(metadata, userSample)
    //show bubble chart
    showbubbleChart(sample, userSample)
  }


});
