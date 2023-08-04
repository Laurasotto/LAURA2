import { useState } from "react";
import axios from "axios";

export default function useExitMovement() {
  const [exitMovement, setExitMovement] = useState({
    peso: 0,
    precio: 0,
    movimientoEntradaId: 0,
  });

  const handleChange = (e) => {
    setExitMovement({
      ...exitMovement,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/exitmovement", exitMovement);

      setExitMovement({
        peso: 0,
        precio: 0,
        movimientoEntradaId: 0,
      });

      return console.log(res);
    } catch (error) {
      return console.log(error);
    }
  };

  return {
    exitMovement,
    handleChange,
    handleSubmit,
  };
}
