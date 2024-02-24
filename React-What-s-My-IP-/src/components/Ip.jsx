import React, {useState, useEffect} from 'react';
import { Box, Card, CardBody, ChakraProvider, Flex, Text, Image, Center, List} from '@chakra-ui/react';
import { MapContainer, TileLayer, useMap, Marker,Popup,  } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { DateTime } from "luxon";






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
  const flag = `https://flagcdn.com/w20/${country.toLowerCase()}.png`;


  const localNow = DateTime.local();
 
  const buenosAiresNow = DateTime.now().setZone('America/Argentina/Buenos_Aires');
 
  const timeDiff = buenosAiresNow.diff(localNow, ['days', 'hours']);

  const localNowString = localNow.toLocaleString(DateTime.DATETIME_FULL);
  const timeDiffString = timeDiff.toFormat("d 'days' h 'hours'");
 
  const position = [lat, lng];
  
  return (
<>
<Flex >
<Card background="whitesmoke" >
<CardBody>

<List spacing={3} >

<Text color="black">IP: {ip}</Text>

<Text color="black">Location: {city}, {country}</Text>

<Image src={flag}></Image>
<Text color="black">Time: {localNowString}</Text>
<Text color="black">Buenos Aires time difference: {timeDiffString}</Text>

</List>

</CardBody>
</Card>
<Box>
</Box>
</Flex>

  
  <MapContainer center={position} zoom={13} scrollWheelZoom={true}  style={{ height: '500px', width:'500px' }}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={position}>
    <Popup>
    {[lat, lng]}  <br /> {city}, {region}, {country}
    </Popup>
  </Marker>
</MapContainer>



</>
  );
};


export default Ip;




