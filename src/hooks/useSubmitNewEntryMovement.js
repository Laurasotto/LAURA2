import { useState } from "react";
import axios from "axios";

export default function useSubmitNewEntryMovement() {
  const [entryMovement, setEntryMovement] = useState({
    peso: 0,
    precio: 0,
    id_gd: 0,
    id_corte: 0,
  });

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

      setEntryMovement({
        peso: 0,
        precio: 0,
        id_gd: 0,
        id_corte: 0,
      });

      return console.log(response);
    } catch (error) {
      return console.log(error);
    }
  };

  return {
    entryMovement,
    handleChange,
    handleSubmit,
  };
}
