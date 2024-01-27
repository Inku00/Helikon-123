import { useState } from 'react';
import Map from '../../components/Map';
import { Button } from '@mui/material';

function Shops() {
  const [coordinaates, setCoordinates] = useState({lngLat: [59.4378, 24.7574], zoom: 11});

  // KODUS: Võtta andmebaasist kõik Poed ja kuvada neid välja ning kontrollida kas click toimib

  return (<div>
    <Button onClick={() => setCoordinates({lngLat: [58.7921, 25.7572], zoom: 6})}>Kõik poed</Button>
    <Button onClick={() => setCoordinates({lngLat: [59.4378, 24.7574], zoom: 11})}>Kõik Tallinna poed</Button>
    
    <Button onClick={() => setCoordinates({lngLat: [59.4231, 24.7991], zoom: 13})}>Ülemiste</Button>
    <Button onClick={() => setCoordinates({lngLat: [59.4277, 24.7193], zoom: 13})}>Kristiine</Button>
    <Button onClick={() => setCoordinates({lngLat: [58.3779, 26.7306], zoom: 13})}>Tasku keskus</Button>
    <Map mapCoordinaates={coordinaates}  />
  </div>)
}

export default Shops;