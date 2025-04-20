import React from "react";
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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";

// Registrasi Chart.js modules
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const LineChartWithPoints = ({ dataChart, labels, tittle }) => {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: tittle || "Chart Peraturan",
                color: "#233b74",
                font: {
                    size: 22,
                    weight: "bold",
                    family: "Roboto",
                },
            },
            datalabels: {
                color: '#FFE54E',
                backgroundColor: '#233b74',
                borderRadius: 5,
                padding: 5,
                font: {
                    weight: 'bold'
                },
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label}\n${value}`;
                }
            },
            tooltip: {
                enabled: false // tooltip dimatikan karena kita pakai datalabels
            }
        },
        elements: {
            point: {
                radius: 6,
                backgroundColor: '#233b74',
                borderColor: '#FFE54E',
                borderWidth: 2,
                pointStyle: 'circle', // bisa diganti dengan 'rect', 'triangle', 'cross', dll.
            },
            line: {
                tension: 0.3, // smoothness
                borderColor: '#233b74',
                borderWidth: 3,
            }
        },
        scales: {
            y: {
                ticks: { autoSkip: false },
                beginAtZero: true,
            },
        },
    };

    const data = {
        labels: labels || [],
        datasets: dataChart || []
    };

    return <Line options={options} data={data} />;
};

export default LineChartWithPoints;
