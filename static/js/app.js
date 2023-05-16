d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function(data) {
    // Create a horizontal bar chart
    let samples = data.samples;
    let dropdown = d3.select("#selDataset");
    let initialSample = samples[0];
    let initialSampleValues = initialSample.sample_values.slice(0, 10).reverse();
    let initialOtuIds = initialSample.otu_ids.slice(0, 10).reverse().map(id => "OTU " + id);
    let initialOtuLabels = initialSample.otu_labels.slice(0, 10).reverse();

    // Populate the dropdown options with test subject IDs
    samples.forEach(sample => {
      dropdown.append("option")
        .attr("value", sample.id)
        .text(sample.id);
    });

    let trace1 = {
      x: initialSampleValues,
      y: initialOtuIds,
      text: initialOtuLabels,
      type: "bar",
      orientation: "h"
    };

    let data1 = [trace1];

    let layout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };

    Plotly.newPlot("bar", data1, layout);

    // Update chart when a new sample is selected
    function optionChanged(selected_id) {
      let selectedSample = samples.find(sample => sample.id === selected_id);
      let selectedSampleValues = selectedSample.sample_values.slice(0, 10).reverse();
      let selectedOtuIds = selectedSample.otu_ids.slice(0, 10).reverse().map(id => "OTU " + id);
      let selectedOtuLabels = selectedSample.otu_labels.slice(0, 10).reverse();

      let trace1 = {
        x: selectedSampleValues,
        y: selectedOtuIds,
        text: selectedOtuLabels,
        type: "bar",
        orientation: "h"
      };

      let data1 = [trace1];

      let layout = {
        title: "Top 10 OTUs",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" }
      };

      Plotly.newPlot("bar", data, layout);
    }

    dropdown.on("change", function() {
      let selected_id = d3.select(this).property("value");
      optionChanged(selected_id);
    });

    // Create a bubble chart
    let initialOtuIdsBubble = initialSample.otu_ids;
    let initialSampleValuesBubble = initialSample.sample_values;
    let initialOtuLabelsBubble = initialSample.otu_labels;

    let trace2 = {
      x: initialOtuIdsBubble,
      y: initialSampleValuesBubble,
      text: initialOtuLabelsBubble,
      mode: 'markers',
      marker: {
        size: initialSampleValuesBubble,
        color: initialOtuIdsBubble,
        colorscale: 'Viridis'
      }
    };

    let data2 = [trace2];


    let layout2 = {
      title: 'Sample Bubble Chart',
      xaxis: { title: 'OTU IDs' },
      yaxis: { title: 'Sample Values' },
      showlegend: false,
      height: 600,
      width: 1200
    };

    Plotly.newPlot('bubble', data2, layout2);

    // Update bubble chart when a new sample is selected
    function optionChanged(selected_id) {
      let sample = samples.find(sample => sample.id === selected_id);
      let otu_ids = sample.otu_ids;
      let sample_values = sample.sample_values;
      let otu_labels = sample.otu_labels;

      let trace2 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: 'Viridis'
        }
      };

      let data2 = [trace2];

      let layout2 = {
        title: 'Sample Bubble Chart',
        xaxis: { title: 'OTU IDs' },
        yaxis: { title: 'Sample Values' },
        showlegend: false,
        height: 600,
        width: 1200
      };

      Plotly.newPlot('bubble', data2, layout2);
    }

// Dropdown
    dropdown.on("change", function() {
      let selected_id = d3.select(this).property("value");
      optionChanged(selected_id);
    });

// Display the sample metadata
    let metadata = data.metadata;
    let metadataContainer = d3.select("#sample-metadata");

// Function to populate the demographic info table
    function populateMetadata(selected_id) {
  // Find the selected sample's metadata
      let selectedMetadata = metadata.find(entry => entry.id === parseInt(selected_id));

  // Clear the existing table
      metadataContainer.html("");

  // Populate the table with the selected sample's metadata
    Object.entries(selectedMetadata).forEach(([key, value]) => {
        let keyValueContainer = metadataContainer.append("div").classed("key-value-container", true);
        keyValueContainer.append("p").text(`${key}:`);
        keyValueContainer.append("p").text(value);
      });
    }

// Display the sample metadata for the initial sample
    let initialMetadata = metadata.find(entry => entry.id === parseInt(initialSample.id));
    populateMetadata(initialSample.id);

// Function to handle changes in the dropdown selection
    function dropdownChange() {
      let selected_id = d3.select(this).property("value");
      optionChanged(selected_id);
      populateMetadata(selected_id);
    }

    dropdown.on("change", dropdownChange);

  })
  .catch(function(error) {
  console.log(error);
  });