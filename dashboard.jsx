import { useState } from "react";
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
import "./Dashboard.css";
import { Navbar } from "../../App";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [reportText, setReportText] = useState("No reports available yet.");

  const refreshReports = () => {
    setReportText("Fetching reports...");
    setTimeout(() => {
      setReportText("No new reports found.");
    }, 1000);
  };

  // Labels for time intervals (shared by all graphs)
  const labels = [
    "09:00 AM", "09:15 AM", "09:30 AM", "09:45 AM", "10:00 AM", "10:15 AM",
    "10:30 AM", "10:45 AM", "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM", "12:00 PM"
  ];

  // Active Users graph data
  const activeUserData = {
    labels,
    datasets: [
      {
        label: "Active Users",
        data: [1, 1, 1, 1, 2, 1, 3, 2, 1, 2, 3, 4, 1],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Fake News Checked graph data
  const fakeNewsData = {
    labels,
    datasets: [
      {
        label: "Fake News Checked",
        data: [0, 1, 1, 2, 2, 3, 4, 4, 5, 7, 8, 10, 12],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Reported News graph data (example fake data)
  const reportedNewsData = {
    labels,
    datasets: [
      {
        label: "Reported News",
        data: [0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 15, 18, 20],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Compute totals for cumulative graphs (last value in data arrays)
  const totalFakeNewsChecked = fakeNewsData.datasets[0].data.slice(-1)[0];
  const totalReportedNews = reportedNewsData.datasets[0].data.slice(-1)[0];

  // Graph options (shared)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number",
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Track reports and monitor issues.</p>
        </div>

        <div className="dashboard-reports-overview">
          <h2>Reports Overview</h2>
          {/* Active Users Graph */}
          <div className="dashboard-graph">
            <h2>Active Users</h2>
            <Line data={activeUserData} options={options} />
          </div>
          {/* Fake News Checked Graph */}
          <div className="dashboard-graph">
            <h2>Fake News Checked</h2>
            <Line data={fakeNewsData} options={options} />
            <p className="dashboard-total-fake-news">
              Total Fake News Checked: <strong> 167</strong>
            </p>
          </div>
          {/* Reported News Graph */}
          <div className="dashboard-graph">
            <h2>Reported News</h2>
            <Line data={reportedNewsData} options={options} />
            <p className="dashboard-total-reported-news">
              Total Reported News: <strong>60</strong>
            </p>
          </div>

          <div className="dashboard-refresh-button">
            <button onClick={refreshReports}>Refresh</button>
          </div>
        </div>
      </div>
    </>
  );
}