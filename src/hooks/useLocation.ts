import Geolocation from 'react-native-geolocation-service';
import {useEffect, useState} from 'react';
import {Location} from '../interfaces/AppInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getLocationCurrent().then(location => {
      setInitialPosition(location);
      setHasLocation(true);
    });
  }, []);

  const getLocationCurrent = (): Promise<Location> => {
    return new Promise((res, rej) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          res({latitude: coords.latitude, longitude: coords.longitude});
        },
        err => rej({err}),
        {enableHighAccuracy: true},
      );
    });
  };

  return {
    hasLocation,
    initialPosition,
    getLocationCurrent,
  };
};
