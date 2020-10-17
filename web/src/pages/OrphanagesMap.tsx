import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import '../styles/pages/orphanages-map.css';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

import { OrphanageInterface } from '../utils/interfaces';

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<OrphanageInterface[]>([]);

  useEffect(() => {
    api.get('/orphanages').then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Localização" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-23.5811647, -46.7575315]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {renderMarkers(orphanages)}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

function renderMarkers(orphanages: OrphanageInterface[]): JSX.Element[] {
  return orphanages.map((orphanage) => {
    return (
      <Marker
        key={orphanage.id}
        icon={mapIcon}
        position={[orphanage.latitude, orphanage.longitude]}
      >
        <Popup
          closeButton={false}
          minWidth={240}
          maxWidth={240}
          className="map-popup"
        >
          {orphanage.name}
          <Link to={`/orphanages/${orphanage.id}`}>
            <FiArrowRight size={20} color="FFF" />
          </Link>
        </Popup>
      </Marker>
    );
  });
}

export default OrphanagesMap;
