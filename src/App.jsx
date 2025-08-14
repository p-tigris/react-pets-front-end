// src/App.jsx
import { useState, useEffect } from 'react';
import * as petServices from './services/petService.js';

import PetList from './components/PetList/PetList.jsx';
import PetDetail from './components/PetDetail/PetDetail.jsx';
import PetForm from './components/PetForm/PetForm.jsx';

const App = () => {
  const [pets, setPets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSelect = (pet) => {
    setSelected(pet);
  };

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

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
      <PetList 
        pets={pets} 
        handleSelect={handleSelect} 
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      { isFormOpen ? (
        <PetForm />
      ) : (
        <PetDetail selected={selected} />
      )}
    </>
  );
};

export default App;

