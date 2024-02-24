import React, {useState, useEffect} from 'react';
import { Box, Card, CardBody, ChakraProvider, Flex, Text } from '@chakra-ui/react';
import { MapContainer, TileLayer, useMap, Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';




const Ip = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    fetch(`https://geo.ipify.org/api/v1?apiKey=${import.meta.env.VITE_API_KEY}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
  }, []);


  const ip = data.ip;
  const location = data.location;
  const region = location ? location.region : '';
  const lat = location ? location.lat : '';
  const lng = location ? location.lng : '';
  const country = location ? location.country : '';
  const city = location ? location.city : '';

  const position = [lat, lng];
  
  
  

  return (
<>
<Flex background="black">
<Card background="black" >
<CardBody>
<Text color="whitesmoke">Location: {city}, {country}</Text>
<Text color="whitesmoke">IP: {ip}</Text>
</CardBody>
</Card>
</Flex>

  
  <MapContainer center={position} zoom={13} scrollWheelZoom={true}  style={{ height: '500px', width:'500px' }}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={position}>
    <Popup>
    {[lat, lng]}<br /> {city}, {region}, {country}
    </Popup>
  </Marker>
</MapContainer>
</>
  );
};

export default Ip;
