d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function(data) {
    // Create a horizontal bar chart
    let samples = data.samples;
    let dropdown = d3.select("#selDataset");
    let initialSample = samples[0];
    let initialSampleValues = initialSample.sample_values.slice(0, 10).reverse();
    let initialOtuIds = initialSample.otu_ids.slice(0, 10).reverse().map(id => "OTU " + id);
    let initialOtuLabels = initialSample.otu_labels.slice(0, 10).reverse();

    let trace1 = {
      x: initialSampleValues,
      y: initialOtuIds,
      text: initialOtuLabels,
      type: "bar",
      orientation: "h"
    };

    let data = [trace1];

    let layout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };

    Plotly.newPlot("bar", data, layout);

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

      let data = [trace1];

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

    dropdown.on("change", function() {
      let selected_id = d3.select(this).property("value");
      optionChanged(selected_id);
    });

    // Display the sample metadata
    let metadata = data.metadata;
    let sampleMetadata = metadata[0];

    let metadataContainer = d3.select("#metadata-container");

    Object.entries(sampleMetadata).forEach(([key, value]) => {
      let keyValueContainer = metadataContainer.append("div").classed("key-value-container", true);
      keyValueContainer.append("p").text(`${key}:`);
      keyValueContainer.append("p").text(value);
    });
  })
  .catch(function(error) {
    console.log(error);
  });



