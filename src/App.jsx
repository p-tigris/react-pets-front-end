// src/App.jsx
import { useState, useEffect } from 'react';
import * as petServices from './services/petService.js';

import PetList from './components/PetList/PetList.jsx';

const App = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const fetchedPets = await petServices.index();

        if (fetchPets.error) {
          throw new Error(fetchPets.error);
        }

        setPets(fetchedPets)
      } catch (error) {
        console.log(error);
      }
    }
    fetchPets();
  }, []);

  return (
    <>
      <PetList pets={pets} />
    </>
  );
};

export default App;

