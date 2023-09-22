import React, { useEffect, useRef } from "react";

const GenderPieChart = ({ maleCount, femaleCount }) => {
  const pieChartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (pieChartRef.current) {
      if (chartInstanceRef.current) {
        // If a chart instance already exists, destroy it before creating a new one
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new window.Chart(pieChartRef.current, {
        type: "pie",
        data: {
          labels: ["Male", "Female"],
          datasets: [
            {
              data: [maleCount, femaleCount],
              backgroundColor: ["#34487a", "#D0DB97"],
              hoverBackgroundColor: ["#34487a", "#D0DB97"],
            },
          ],
        },
        options: {
          responsive: true, // Set to false if you want a fixed size
          maintainAspectRatio: false, // Set to true if you want to maintain the aspect ratio
          // Add other options to customize the appearance of the chart
          // For example, you can use the 'legend', 'tooltips', 'title', etc.
        },
      });
    }
  }, [maleCount, femaleCount]);

  return (
    <div style={{ width: "400px", height: "400px" }}>
      <h2>Gender Representation</h2>
      <canvas ref={pieChartRef} />
    </div>
  );
};

export default GenderPieChart;
