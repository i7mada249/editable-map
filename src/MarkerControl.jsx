import React, { useState } from 'react';
import { getMarkers, saveMarkers } from '../src/constants';

const EditMarkers = () => {
    const [markerList, setMarkerList] = useState(getMarkers());

    const handleInputChange = (index, field, value) => {
        const newMarkers = [...markerList];
        newMarkers[index][field] = value;
        setMarkerList(newMarkers);
        saveMarkers(newMarkers);
    };

    const handleDeleteMarker = (index) => {
        const newMarkers = markerList.filter((_, i) => i !== index);
        setMarkerList(newMarkers);
        saveMarkers(newMarkers);
    };

    return (
        <div>
            {markerList.map((marker, index) => (
                <div key={index}>
                    <h3>Marker {index + 1}</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        value={marker.name}
                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={marker.description}
                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Stars"
                        value={marker.stars}
                        onChange={(e) => handleInputChange(index, 'stars', e.target.value)}
                    />
                    <textarea
                        placeholder="Comments"
                        value={marker.comments.join(', ')}
                        onChange={(e) => handleInputChange(index, 'comments', e.target.value.split(', '))}
                    />
                    <button onClick={() => handleDeleteMarker(index)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default EditMarkers;
