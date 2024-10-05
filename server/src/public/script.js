const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

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

async function fetchData() {
  try {
    // Fetch data from the /api/data endpoint
    const response = await fetch('/api/data');
    const data = await response.json();

    // Extract year and CO2 emissions
    const years = data.message.map(item => item.Year);
    const emissions = data.message.map(item => parseFloat(item['Per capita consumption-based CO₂ emissions']));

    // create the chart
    createChart(years, emissions);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function createChart(labels, data) {
  const ctx = document.getElementById('co2Chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,  // Years (x-axis)
      datasets: [{
        label: 'Per Capita CO₂ Emissions',
        data: data,  // Emissions data (y axis)
        borderColor: 'rgba(255, 165, 0)',
        backgroundColor: 'rgba(0,0,0)',
        borderWidth: 1,
        fill: true
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true  // y-axis starts at 0
        }
      }
    }
  });
}
// Fetch the data on page load and create the chart
fetchData();
