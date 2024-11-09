import React, {useState, useEffect} from 'react';
import { Box, Card, CardBody, ChakraProvider, Flex, Text, Image, Center, List, Stack, CardFooter,Button, UnorderedList, ListItem } from '@chakra-ui/react';
import { MapContainer, TileLayer, useMap, Marker,Popup,  } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { DateTime } from "luxon";








const Ip = () => {
  const [data, setData] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${import.meta.env.VITE_API_KEY}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      }
    };

    fetchData();
  }, [])

  if (error) {
    return <Center h="100vh" bg="linear-gradient(to right, #ffd89b, #19547b)"><Text>Error: {error}</Text></Center>;
  }
  
  if (!data) {
    return <Center h="100vh" bg="linear-gradient(to right, #ffd89b, #19547b)"><Text>Loading...</Text></Center>;
  }


  const { ip, location } = data;
  const { region, lat, lng, country, city } = location;
  const flag = `https://flagcdn.com/w160/${country.toLowerCase()}.png`;
  const localNowString = DateTime.local().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
  const position = [lat, lng];
  
  return (
    <Flex 
    direction="column" align="center" justify="center"
    bg="linear-gradient(to right, #ffd89b, #19547b)" height
    ="100vh"
  
     >
        <Box
        marginTop={4}
        marginBottom={2}
      

        >
         
          <Card background="whitesmoke" direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'   boxShadow='lg'
          borderRadius="lg"
          >
            <Center>
              <Image src={flag} borderRadius='full'alt='flag' margin={4} 
              boxShadow='md'
              fit="cover"
              width="10vh"
              height="10vh"
              />
              <Stack>
                <CardBody>
                  <UnorderedList listStyleType="none" p={0} textAlign="left" fontSize="md" fontWeight="bold" color="black" m={4}>
                    <List>
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
            </Center>
          </Card>
          </Box>
          <Box
          marginTop={2}
          marginBottom={4}
          marginLeft={4}
          marginRight={4}
          
          width={{ base: '100%', sm: '50%' }}

          >
          <Card
          background="whitesmoke" direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'   boxShadow='lg'
          borderRadius="lg" 
          >
            <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={true} style={{ height: '300px', width: '100%' }}>
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[lat, lng]}>
                <Popup>
                  {[lat, lng]} <br /> {city}, {region}, {country}
                </Popup>
              </Marker>
            </MapContainer>
          </Card>
          </Box>
 
    </Flex>
  );
};


export default Ip;




