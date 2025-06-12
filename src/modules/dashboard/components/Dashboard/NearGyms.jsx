import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function NearGyms() {
  const [userLocation, setUserLocation] = useState(null);
  const [gyms, setGyms] = useState([]);
  const [locationSource, setLocationSource] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(true);
  const fallbackLocation = [30.0444, 31.2357]; // Cairo

  const getAccurateLocation = () => {
    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        setUserLocation(coords);
        setLocationSource('Using precise GPS location.');
        setLoadingLocation(false);
      },
      async (error) => {
        console.warn('Geolocation failed:', error.message);
        await useIPFallback();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  const useIPFallback = async () => {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      const coords = [response.data.latitude, response.data.longitude];
      console.log('IP-based location:', coords);
      setUserLocation(coords);
      setLocationSource('Using approximate IP-based location.');
    } catch (err) {
      console.error('IP location failed:', err);
      setUserLocation(fallbackLocation);
      setLocationSource('Using default fallback location.');
    } finally {
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported by this browser.');
      useIPFallback();
    } else {
      getAccurateLocation();
    }
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    const fetchGyms = async () => {
      const query = `
        [out:json];
        node["leisure"="fitness_centre"](around:5000,${userLocation[0]},${userLocation[1]});
        out;
      `;

      try {
        const response = await axios.post(
          'https://overpass-api.de/api/interpreter',
          query,
          { headers: { 'Content-Type': 'text/plain' } },
        );
        setGyms(response.data.elements || []);
      } catch (error) {
        console.error('Error fetching gyms:', error);
      }
    };

    fetchGyms();
  }, [userLocation]);

  return (
    <div className="bg-[#121212] min-h-screen text-[#ededed] flex flex-col px-7 py-5">
      <h2 className="font-family-sec text-4xl font-semibold mb-5">
        Nearby Gyms
      </h2>

      {loadingLocation ? (
        <p className="text-lg text-yellow-400 mb-4">
          Detecting your location...
        </p>
      ) : (
        <>
          <p className="text-sm mb-2 text-blue-400">{locationSource}</p>
          {userLocation && (
            <p className="text-green-400 text-sm mb-4">
              Your location: {userLocation[0].toFixed(5)},{' '}
              {userLocation[1].toFixed(5)}
            </p>
          )}
        </>
      )}

      <button
        onClick={getAccurateLocation}
        className="bg-[#daac00] hover:bg-yellow-500 text-black px-4 py-2 mb-4 rounded w-fit"
      >
        Retry Location
      </button>

      {userLocation ? (
        <MapContainer
          center={userLocation}
          zoom={13}
          scrollWheelZoom={true}
          style={{
            height: '500px',
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <Marker
            position={userLocation}
            icon={L.icon({
              iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
              iconSize: [30, 30],
              iconAnchor: [15, 30],
            })}
          >
            <Popup>You are here</Popup>
          </Marker>

          {gyms.map((gym, idx) => (
            <Marker
              key={idx}
              position={[gym.lat, gym.lon]}
              icon={L.icon({
                iconUrl:
                  'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                iconSize: [25, 25],
                iconAnchor: [12, 25],
              })}
            >
              <Popup>
                <strong>{gym.tags?.name || 'Unnamed Gym'}</strong>
                {gym.tags?.operator && (
                  <div>Operated by: {gym.tags.operator}</div>
                )}
              </Popup>
            </Marker>
          ))}

          {gyms.length === 0 && (
            <Popup position={userLocation}>
              <div>No gyms found within 5km.</div>
            </Popup>
          )}
        </MapContainer>
      ) : (
        <p className="text-lg mt-4">Waiting for location...</p>
      )}
    </div>
  );
}

export default NearGyms;
