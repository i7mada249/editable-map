// constants.js
export const getMarkers = () => {
    const savedMarkers = localStorage.getItem('markers');
    return savedMarkers ? JSON.parse(savedMarkers) : [];
};

export const saveMarkers = (markers) => {
    localStorage.setItem('markers', JSON.stringify(markers));
};
