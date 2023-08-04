import { useState } from "react";
import axios from "axios";

export default function useSubmitDistributor() {
  const [distributor, setDistributor] = useState({
    nombre: "",
    apellido: "",
    telefono: undefined,
    documento: undefined,
  });

  const handleDistributor = (e) => {
    setDistributor({
      ...distributor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newDistributor = await axios.post("/api/distributor", distributor);

      setDistributor({
        nombre: "",
        apellido: "",
        telefono: null,
        documento: null,
        negocio: null,
      });

      return console.log(newDistributor.data);
    } catch (error) {
      return console.log(error);
    }
  };

  return {
    handleSubmit,
    handleDistributor,
    distributor,
  };
}
