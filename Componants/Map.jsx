import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import "../src/App.css";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { getMarkers, saveMarkers } from '../src/constants';
// import Navbar from './Navbar';

const Map = () => {
    const [markers, setMarkers] = useState(getMarkers());
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'a' || event.key === 'A') {
                setIsAdding(true);
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const MapEvents = () => {
        useMapEvents({
            contextmenu: (event) => {
                if (isAdding) {
                    const { lat, lng } = event.latlng;
                    const newMarker = { lat, lng, name: '', description: '', stars: 0, comments: [], isNew: true };
                    const updatedMarkers = [...markers, newMarker];
                    setMarkers(updatedMarkers);
                    saveMarkers(updatedMarkers);
                    setIsAdding(false);
                }
            }
        });
        return null;
    };

    const handleInputChange = (index, field, value) => {
        const newMarkers = [...markers];
        newMarkers[index][field] = value;
        setMarkers(newMarkers);
        saveMarkers(newMarkers);
    };

    const handleDeleteMarker = (index) => {
        const newMarkers = markers.filter((_, i) => i !== index);
        setMarkers(newMarkers);
        saveMarkers(newMarkers);
    };

    return (

            <MapContainer center={[24.70706502979077, 46.67049745678526]} zoom={6} scrollWheelZoom={true} zoomControl={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEvents />
                {markers.map((marker, index) => (
                    <Marker key={index} position={[marker.lat, marker.lng]}>
                        <Popup>
                            {marker.isNew ? (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={marker.name}
                                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                    />
                                    <textarea
                                        placeholder="Location"
                                        value={marker.description}
                                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                    />
                                    <input
                                        type="Rating"
                                        placeholder="Stars"
                                        value={marker.stars}
                                        onChange={(e) => handleInputChange(index, 'stars', e.target.value)}
                                    />
                                    <textarea
                                        placeholder="Details"
                                        value={marker.comments.join(', ')}
                                        onChange={(e) => handleInputChange(index, 'comments', e.target.value.split(', '))}
                                    />
                                    <button onClick={() => {
                                        const newMarkers = [...markers];
                                        newMarkers[index].isNew = false;
                                        setMarkers(newMarkers);
                                        saveMarkers(newMarkers);
                                    }}>Save</button>
                                </div>
                            ) : (
                                <div>
                                    <h3>{marker.name}</h3>
                                    <p>{marker.description}</p>
                                    <p>Stars: {marker.stars}</p>
                                    <p>Comments: {marker.comments.join(', ')}</p>
                                    <button onClick={() => handleDeleteMarker(index)}>Delete</button>
                                </div>
                            )}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

    );
};

export default Map;