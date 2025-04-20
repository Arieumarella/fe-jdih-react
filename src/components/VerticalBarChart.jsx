import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

// Registrasi Chart.js modules
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);


const VerticalBarChart = ({ dataChart, labels, tittle }) => {
    const options = {
        indexAxis: "y", // horizontal bar
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { autoSkip: false },
            },
        },
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
                anchor: 'end',
                align: 'right',
                color: '#FFE54E',
                backgroundColor: '#233b74',
                borderRadius: 4,
                padding: 6,
                font: {
                    weight: 'bold'
                },
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label}\n${value}`;
                }
            },
            tooltip: {
                enabled: false,
            }
        },
        elements: {
            bar: {
                categoryPercentage: 0.6,
                barPercentage: 0.9,
            },
        },
    };

    const data = {
        labels: labels || [],
        datasets: [
            {
                label: "Jumlah Peraturan",
                data: dataChart || [],
                backgroundColor: [
                    "#233b74",
                    "#E6C81E",
                    "#FFD700",
                    "#8E44AD",
                    "#2ECC71",
                    "#E74C3C"
                ],
            },
        ],
    };

    return (
        <Bar options={options} data={data} />
    );
};

export default VerticalBarChart;
