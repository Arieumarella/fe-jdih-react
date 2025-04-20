// src/components/DoughnutChart.jsx

import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ labels, data, colors, tittle }) => {
    const chartData = {
        labels: labels || ["UU", "Perpres", "Permen", "Keputusan"],
        datasets: [
            {
                label: "Jumlah Peraturan",
                data: data || [120, 90, 230, 60],
                backgroundColor: colors || [
                    '#003366', '#FFD700', '#4B8BBE', '#88C0D0',
                    '#D3D3D3', '#1C5D99', '#FFB400', '#A6CEE3',
                    '#F7DC6F', '#D9BF77', '#0F4C81', '#B0BEC5',
                    '#4A6572', '#7FDBFF', '#FFE066', '#89CFF0',
                    '#FAC858', '#8DA0CB', '#607D8B', '#C5CAE9'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: "60%", // untuk bikin jadi doughnut, bisa kamu ubah sesuai keinginan
        plugins: {
            legend: {
                display: false, // sembunyikan label bawah chart
            },
            tooltip: {
                backgroundColor: "#111827",
                titleColor: "#fff",
                bodyColor: "#fff",
            },
        },
    };

    return (
        <div className="max-w-md mx-auto mt-4">
            <h2 className="font-roboto font-bold text-bluePu text-[22px] text-center mb-4">
                {tittle || "Doughnut Chart"}
            </h2>
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default DoughnutChart;
