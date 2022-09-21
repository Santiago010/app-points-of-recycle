import {Location} from '../interfaces/AppInterfaces';

export const GetAddress = async (coords: Location) => {
  let geocoding = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=AIzaSyBi6a1rVILuICtZnx_sd2QTv3-ndTaEdfY`;
  let res = await fetch(geocoding);
  let data = res.json();
  return data;
};
