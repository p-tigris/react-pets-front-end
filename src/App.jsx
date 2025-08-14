// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
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

  const handleFormView = (pet) => {
    if (!pet._id) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petServices.create(formData);

      if (newPet.error) {
        throw new Error(newPet.error);
      }
      setPets([newPet, ...pets]);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdatePet = async (formData, _id) => {
    try {
      const updatedPet = await petServices.update(formData, _id);
      if (updatedPet.error) {
        throw new Error(updatedPet.error);
      }
      setPets([...pets.map((pet) => pet._id === updatedPet._id ? updatedPet : pet)]);
      setIsFormOpen(false);
      setSelected(updatedPet);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeletePet = async (_id) => {
    try {
      const deletedPet = await petServices.deletePet(_id);
      if (deletedPet.error) {
        throw new Error(deletedPet.error);
      }
      setPets(pets.filter(pet => pet._id !== deletedPet._id));
      setSelected(null);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

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
        <PetForm 
        handleAddPet={handleAddPet} 
        handleUpdatePet={handleUpdatePet}
        selected={selected}
        />
      ) : (
        <PetDetail 
        selected={selected} 
        handleFormView={handleFormView}
        handleDeletePet={handleDeletePet}
        />
      )}
    </>
  );
};

export default App;

