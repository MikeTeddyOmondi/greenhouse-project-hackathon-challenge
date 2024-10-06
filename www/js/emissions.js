const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const countryInput = document.querySelector("country");
const barChartDiv = document.querySelector(".barchart-div");
const filteredChartDiv = document.querySelector(".filterchart-div");

const filterDataByYearCountryBtn = document.getElementById(
  "filterDataByYearCountry"
);

burger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");
});

filterDataByYearCountryBtn.addEventListener("click", () => {
  filterData();
});

window.onscroll = function () {
  const header = document.querySelector("header");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add("scrolled"); // Add class when scrolled down
  } else {
    header.classList.remove("scrolled"); // Remove class when at the top
  }
};

// let co2Chart; // Reference to the chart instance
let filteredChart;

function removeBarChartDiv() {
  barChartDiv.style.display = "none";
}

async function filterData() {
  try {
    const country = document.getElementById("country").value; // Get country from input
    const year = document.getElementById("year").value;
    // Fetch data for the specific country
    console.log({ year });
    const response = await fetch(
      `http://localhost:3000/api/emissions-by-sector?year=${encodeURIComponent(
        year
      )}&country=${encodeURIComponent(country)}`
    );

    if (!response.ok) {
      throw new Error("No data found for the selected country.");
    }
    const data = await response.json();
    console.log({ data });

    // Extract relevant fields (year and CO2 emissions)
    const years = data.message.map((item) => {
      console.log(item);
      return item.Year;
    });
    const emissions = data.message.map((item) => [
      parseFloat(item["agriculture and land use"]),
      parseFloat(item["fossil fuels and industry"]),
      parseFloat(item["methane emissions from fossil fuels and industry"]),
      parseFloat(item["methane emissions from agriculture and land use"]),
      parseFloat(item["CO2 emissions from fossil fuels and industry"]),
      parseFloat(item["CO2 emissions from agriculture and land use"]),
    ]);

    // console.log({ emissions });

    // Call function to create the chart
    createFilterChart(years, emissions);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error.message); // Show alert if there's an error (e.g., no data found)
  }
}

function createFilterChart(labels, data) {
  const ctx = document.getElementById("filteredChart").getContext("2d");

  filteredChartDiv.style.display = "block";

  // Destroy the previous chart instance if it exists
  if (filteredChart) {
    filteredChart.destroy();
  }

  console.log({ Chart });
  console.log(new Chart(ctx));

  // Create a new chart instance
  filteredChart = new Chart(ctx, {
    type: "line", // You can change this to 'bar', 'pie', etc.
    data: {
      labels: labels, // Years will be displayed on the x-axis
      datasets: [
        {
          label: "Emissions",
          data: data, // Emissions data for the y-axis
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderWidth: 1,
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Emission Bi.T Numbers",
          },
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: "Year",
          },
        },
      },
    },
  });
}

function removefilteredChartDiv() {
  filteredChartDiv.style.display = "none";
}
