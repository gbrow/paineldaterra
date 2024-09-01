import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importar CSS do Leaflet

// Função para remover acentuação, espaços e converter para minúsculas
const normalizeMunicipioName = (name) => {
    return name
        .normalize('NFD') // Normaliza o texto para decompô-lo
        .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
        .toLowerCase() // Converte para minúsculas
        .replace(/ /g, '_'); // Substitui espaços por underscores
};

const MapComponent = ({ municipio }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        // Inicializar o mapa
        console.log('Container do mapa:', mapRef.current);

        const map = L.map(mapRef.current, {
            center: [-23.5, -51.5],
            zoom: 7,
            scrollWheelZoom: true,
            zoomControl: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        const updateMap = () => {
            let geojsonFile = '';
            const formattedMunicipio = normalizeMunicipioName(municipio);
            geojsonFile = `/assets/municipio_${formattedMunicipio}.geojson`;
                        
            d3.json(geojsonFile).then(geojsonData => {
                
                // Remove o GeoJSON existente antes de adicionar o novo
                map.eachLayer(layer => {
                    if (layer instanceof L.GeoJSON) {
                        map.removeLayer(layer);
                    }
                });

                const geojsonLayer = L.geoJSON(geojsonData).addTo(map);
                map.fitBounds(geojsonLayer.getBounds()); // Ajusta o zoom para se ajustar aos limites do GeoJSON
            }).catch(error => {
                console.error('Erro ao carregar o arquivo GeoJSON:', error);
            });
        };

        updateMap();

        // Redimensionar o mapa ao alterar o tamanho da janela
        window.addEventListener('resize', updateMap);

        return () => {
            map.remove();
            window.removeEventListener('resize', updateMap);
        };
    }, [municipio]);

    return <div ref={mapRef} id="map" className="map-container"></div>;
};

export default MapComponent;
