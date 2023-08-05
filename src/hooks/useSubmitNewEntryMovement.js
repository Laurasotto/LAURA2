// useSubmitNewEntryMovement.js
import { useState } from "react";
import axios from "axios";

export default function useSubmitNewEntryMovement() {
  const [entryMovement, setEntryMovement] = useState({
    peso: 0,
    precio: 0,
    corteId: 0,
    distribuidorId: 0,
    granjaId: 0,
  });

  const getDistribuidor = async () => {
    return await axios.get("/api/auth/distributor");
  };

  const getCorte = async () => {
    return await axios.get("/api/cortes");
  };

  const getGranja = async () => {
    return await axios.get("/api/granjaRaza");
  };

  const handleChange = (e) => {
    setEntryMovement({
      ...entryMovement,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/entrymovement", entryMovement);
      console.log(response);

      // Refresh the entry movements after submitting a new one
      const entryMovementsResponse = await axios.get("/api/entrymovement");
      setEntryMovements(entryMovementsResponse.data);

      // Reset the form fields
      setEntryMovement({
        peso: 0,
        precio: 0,
        corteId: 0,
        distribuidorId: 0,
        granjaId: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    entryMovement,
    handleChange,
    handleSubmit,
    getDistribuidor,
    getCorte,
    getGranja,
  };
}
