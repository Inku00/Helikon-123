import React, { useEffect, useState } from 'react'

function ParcelMachines() {
  const [parcelMachines, setParcelMachines] = useState([]);

  // uef
  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(response => response.json())
      .then(json => setParcelMachines(json))
  }, []);

  // const [parcelMachines, setParcelMachines] = useState(parcelMachinesFromFile);

  return (
    <select>{parcelMachines
      // .filter(pm => pm.NAME !== "1. eelistus/Picapac pakiautomaat")
      .filter(pm => pm.A0_NAME === "EE")
      .map(pm => <option key={pm.NAME}>{pm.NAME}</option>)}
    </select>
  )
}

export default ParcelMachines