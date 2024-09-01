import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';

const ChartComponent = ({ municipio }) => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        d3.dsv(';', '/assets/pr_af_area.csv').then(data => {
            const filteredData = data.filter(row => row.mun === municipio);
            const groupedData = processData(filteredData);

            const chartConfig = {
                labels: groupedData.labels,
                datasets: [
                    {
                        label: 'Agricultura Familiar',
                        data: groupedData.agriculturaFamiliar,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                    {
                        label: 'Não Agricultura Familiar',
                        data: groupedData.naoAgriculturaFamiliar,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    }
                ]
            };

            setChartData(chartConfig);
        });
    }, [municipio]);

    useEffect(() => {
        if (chartData && chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy(); // Destruir o gráfico existente
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            beginAtZero: true
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [chartData]);

    const processData = (data) => {
        const labels = [];
        const agriculturaFamiliar = [];
        const naoAgriculturaFamiliar = [];

        data.forEach(row => {
            if (!labels.includes(row.grupos)) {
                labels.push(row.grupos);
                agriculturaFamiliar.push(0);
                naoAgriculturaFamiliar.push(0);
            }

            const index = labels.indexOf(row.grupos);
            agriculturaFamiliar[index] += +row.n_af_sim;
            naoAgriculturaFamiliar[index] += +row.n_af_nao;
        });

        return { labels, agriculturaFamiliar, naoAgriculturaFamiliar };
    };

    return <canvas ref={chartRef}></canvas>;
};

export default ChartComponent;
