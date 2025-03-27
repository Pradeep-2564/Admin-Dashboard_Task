import React, { useState, useEffect } from "react";
import { Grid, Paper, Box, Typography, LinearProgress } from "@mui/material";
import { Line, Pie, Bar } from "react-chartjs-2"; // Import Bar chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, 
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MainComponent = () => {
  const [loading, setLoading] = useState(true);
  const [taskProgress] = useState(75); 

  const chartDataLine = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "User Contributions",
        data: [10, 20, 15, 30, 25],
        borderColor: "rgb(186, 75, 192)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  const chartDataPie = {
    labels: ["Sold", "In Progress", "Pending"],
    datasets: [
      {
        data: [75, 15, 10],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  const chartDataBar = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [
      {
        label: "Bar Chart Example",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">Dashboard Section</Typography>
      <Box sx={{ p: 3 }}>
        {loading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Contributions in the last 5 months</Typography>
                <Line data={chartDataLine} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Example Bar Chart</Typography>
                <Bar data={chartDataBar} />
              </Paper>
            </Grid>           

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Sales Performance</Typography>
                <Pie data={chartDataPie} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Task Progress</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LinearProgress variant="determinate" value={taskProgress} sx={{ width: "80%", mr: 2 }} />
                  <Typography variant="body1">{taskProgress}%</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
};

export default MainComponent;
