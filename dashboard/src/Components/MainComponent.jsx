import React, { useState, useEffect } from "react";
import { Grid, Paper, Box, Typography, LinearProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MainComponent = () => {
  const [loading, setLoading] = useState(true);

  const chartData = {
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
                <Typography variant="h6">
                  Contributions in the last 5 month's
                </Typography>
                <Line data={chartData} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Task Progress</Typography>
                <LinearProgress variant="determinate" value={75} />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
};

export default MainComponent;
