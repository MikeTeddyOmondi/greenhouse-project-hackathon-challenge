const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const countryInput = document.querySelector("country");
const barChartDiv = document.querySelector(".barchart-div");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");
});

window.onscroll = function () {
  const header = document.querySelector("header");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add("scrolled"); // Add class when scrolled down
  } else {
    header.classList.remove("scrolled"); // Remove class when at the top
  }
};

let co2Chart; // Reference to the chart instance

async function fetchData() {
  try {
    const country = document.getElementById("country").value; // Get country from input

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
