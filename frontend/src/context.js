import React, { useEffect, useState } from "react";
import { createContext} from "react";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
    // const [username, setUsername] = useState('');
    const [coordinates, setCoordinates] = useState(() => {
      const storedLocation = localStorage.getItem('coordinates');
      return storedLocation ? JSON.parse(storedLocation) : { latitude: null, longitude: null };
    });

useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            const newcoordinates = { latitude, longitude };
            setCoordinates(newcoordinates);
            localStorage.setItem('coordinates', JSON.stringify(newcoordinates)); // Update local storage
          },
          error => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };


    getLocation();
    
  }, []);

return (
    <LocationContext.Provider value={{ coordinates }}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };