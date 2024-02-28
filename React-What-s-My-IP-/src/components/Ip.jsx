import React, {useState, useEffect} from 'react';
import { Box, Card, CardBody, ChakraProvider, Flex, Text, Image, Center, List, Stack, CardFooter,Button, UnorderedList, ListItem } from '@chakra-ui/react';
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
  const flag = `https://flagcdn.com/w160/${country.toLowerCase()}.png`;


  const localNow = DateTime.local();
 
  const localNowString = localNow.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
 
  const position = [lat, lng];
  
  return (
  
  <Center>
<Box p={4}>
<Card background="whitesmoke" direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
  axW='sm' borderWidth='1px' borderRadius='lg' boxShadow='lg' >
  
  
<Image src={flag}
  borderRadius='full'
  boxSize='150px'
 alt='flag' marginTop="20px" marginLeft="20px"></Image>
<Stack>
<CardBody>
<UnorderedList listStyleType="none">
<List >
<ListItem><Text as="kbd">IP: {ip}</Text></ListItem>
<ListItem><Text as="kbd">City: {city}</Text></ListItem>
<ListItem><Text as="kbd">Region: {region}</Text></ListItem>
<ListItem><Text as="kbd">Country: {country}</Text></ListItem>
<ListItem><Text as="kbd">Latitude: {lat}</Text></ListItem>
<ListItem><Text as="kbd">Longitude: {lng}</Text></ListItem>
<ListItem><Text as="kbd">Local Time: {localNowString}</Text></ListItem>
</List>
</UnorderedList>

</CardBody>
</Stack>


  <MapContainer center={position} zoom={13} scrollWheelZoom={true}  style={{ height: '500px', width:'500px' }}
  >
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
</Card>
</Box>
</Center>
  );
};


export default Ip;




