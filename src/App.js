import React, { useEffect, useState } from 'react';
import ChartComponent from './components/ChartComponent';
import MapComponent from './components/MapComponent';
import * as d3 from 'd3';
import './styles/main.css'; // Certifique-se de importar o CSS

const App = () => {
    const [selectedMunicipio, setSelectedMunicipio] = useState("Paraná");
    const [municipios, setMunicipios] = useState([]);
    
    useEffect(() => {
        d3.dsv(';','/assets/pr_af_area.csv').then(data => {
            const municipiosList = [...new Set(data.map(row => row.mun))];
            setMunicipios(municipiosList);
            setSelectedMunicipio(municipiosList.at(0))
            
        });
    }, []);
    
    return (
        <div className="container">
            <h1>Dashboard Interativo</h1>

            <label htmlFor="municipio-select">Escolha um município:</label>
            <select
                id="municipio-select"
                value={selectedMunicipio}
                onChange={(e) => setSelectedMunicipio(e.target.value)}
            >
                {municipios.map(mun => (
                    <option key={mun} value={mun}>{mun}</option>
                ))}
            </select>

            <div className="map-container">
                <MapComponent municipio={selectedMunicipio} />
            </div>
            <div className="chart-container">
                <ChartComponent municipio={selectedMunicipio} />
            </div>
        </div>
    );
};

export default App;
