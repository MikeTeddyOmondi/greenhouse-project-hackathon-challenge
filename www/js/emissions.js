const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const countryInput = document.querySelector("country");
const barChartDiv = document.querySelector(".barchart-div");
const filteredChartDiv = document.querySelector(".filterchart-div");

const filterDataByYearBtn = document.getElementById("filterDataByYear");

let co2Chart; // Reference to the chart instance
let filteredChart;

burger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");
});

filterDataByYearBtn.addEventListener("click", () => {
  filterData()
})

window.onscroll = function () {
  const header = document.querySelector("header");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add("scrolled"); // Add class when scrolled down
  } else {
    header.classList.remove("scrolled"); // Remove class when at the top
  }
};

async function fetchData() {
  try {
    const country = document.getElementById("country").value; // Get country from input
    // const year = document.getElementById("year").value;
    // Fetch data for the specific country

    const response = await fetch(
      `http://localhost:3000/api/data?country=${encodeURIComponent(country)}`
    );
    if (!response.ok) {
      throw new Error("No data found for the selected country.");
    }
    const data = await response.json();

    // Extract relevant fields (year and CO2 emissions)
    const years = data.message.map((item) => item.Year);
    const emissions = data.message.map((item) =>
      parseFloat(item["Per capita consumption-based CO₂ emissions"])
    );

    // Call function to create the chart
    createChart(years, emissions);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error.message); // Show alert if there's an error (e.g., no data found)
  }
}

function createChart(labels, data) {
  const ctx = document.getElementById("co2Chart").getContext("2d");

  barChartDiv.style.display = "block";

  // Destroy the previous chart instance if it exists
  if (co2Chart) {
    co2Chart.destroy();
  }

  // Create a new chart instance
  co2Chart = new Chart(ctx, {
    type: "line", // You can change this to 'bar', 'pie', etc.
    data: {
      labels: labels, // Years will be displayed on the x-axis
      datasets: [
        {
          label: "Per Capita CO₂ Emissions",
          data: data, // Emissions data for the y-axis
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 1,
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true, // Ensure the y-axis starts at 0
        },
      },
    },
  });
}

function removeBarChartDiv() {
  barChartDiv.style.display = "none";
}

// Initial chart creation with no data
// createChart([], []);


async function filterData() {
  try {
    const country = document.getElementById("country").value; // Get country from input
    const year = document.getElementById("year").value;
    // Fetch data for the specific country
    console.log({year}, {country})
    const response = await fetch(
      `http://localhost:3000/api/emissions-by-sector?year=${encodeURIComponent(year)}&country=${encodeURIComponent(country)}`
    );

    if (!response.ok) {
      throw new Error("No data found for the selected country.");
    }
    const data = await response.json();

    // Extract relevant fields (year and CO2 emissions)
    const years = data.message.map((item) => item.Entity);
    const emissionKeys = [
      "agriculture and land use",
      "fossil fuels and industry",
      "methane emissions from fossil fuels and industry",
      "methane emissions from agriculture and land use",
      "CO2 emissions from fossil fuels and industry",
      "CO2 emissions from agriculture and land use",
    ];

    const emissions = data.message.map((item) => [
      parseFloat(item["agriculture and land use"]),
      parseFloat(item["fossil fuels and industry"]),
      parseFloat(item["methane emissions from fossil fuels and industry"]),
      parseFloat(item["methane emissions from agriculture and land use"]),
      parseFloat(item["CO2 emissions from fossil fuels and industry"]),
      parseFloat(item["CO2 emissions from agriculture and land use"]),]

    );

    let emissionsChart;
    function createEmissionsChart(years, emissions) {


    const ctx = document.getElementById('emissionsChart').getContext('2d');
    if (emissionsChart) {
      emissionsChart.destroy();
    }
      // Create a new chart instance
     emissionsChart =  new Chart(ctx, {
        type: 'bar', // Use 'bar' chart type
        data: {
          labels: years,  // X-axis labels (Countries/Entities)
          datasets: [{
            label: 'agriculture and land use',
            data: emissions[0],  // Y-axis data (Emissions)
            backgroundColor:[
              'rgb(255, 99, 132)',
            ], // Bar color
            borderColor: 'rgba(75, 192, 192, 1)',        // Border color
            borderWidth: 1
          },
          {
            label: 'fossil fuels and industry',
            data: emissions[1],  // Y-axis data (Emissions)
            backgroundColor:[
              'rgb(54, 162, 235)',
            ], // Bar color
            borderColor: 'rgba(75, 192, 192, 1)',        // Border color
            borderWidth: 1
          },
          {
            label: 'methane emissions from fossil fuels and industry',
            data: emissions[2],  // Y-axis data (Emissions)
            backgroundColor:[
              'rgb(75, 192, 192)',
            ], // Bar color
            borderColor: 'rgba(75, 192, 192, 1)',        // Border color
            borderWidth: 1
          },
          {
            label: 'methane emissions from agriculture and land use',
            data: emissions[3],  // Y-axis data (Emissions)
            backgroundColor:[
              'rgb(54, 162, 235)',
            ], // Bar color
            borderColor: 'rgba(75, 192, 192, 1)',        // Border color
            borderWidth: 1
          },
          {
            label: 'CO2 emissions from fossil fuels and industry',
            data: emissions[4],  // Y-axis data (Emissions)
            backgroundColor:[
              'rgb(153, 102, 255)',
            ], // Bar color
            borderColor: 'rgba(75, 192, 192, 1)',        // Border color
            borderWidth: 1
          },
          {
            label: 'CO2 emissions from agriculture and land use',
            data: emissions[5],  // Y-axis data (Emissions)
            backgroundColor:[
              'rgb(54, 162, 235)',
            ], // Bar color
            borderColor: 'rgb(255, 206, 86)',        // Border color
            borderWidth: 1
          }

        ]
        },
      });
    }
    // Call the function to create the chart with the extracted data
    createEmissionsChart(years, emissions);

  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error.message); // Show alert if there's an error (e.g., no data found)
  }
}

function removefilteredChartDiv() {
  filteredChartDiv.style.display = "none";
}
