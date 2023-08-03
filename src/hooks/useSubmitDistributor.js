
import {useState} from 'react'
import axios from 'axios'

export default function useSubmitDistributor() {
    const [distributor, setDistributor] = useState({
        nombre: "",
        apellido: "",
        telefono: null,
        documento: null,
        negocio:  0
      })
    
      const handleDistributor = (e) => {
        setDistributor((prevState) => ({...prevState, [e.target.name]: e.target.value}))
      }
    

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const newDistributor = await axios.post("/api/distributor", {
            distributor
        })

        setDistributor({
            nombre: "",
            apellido: "",
            telefono: null,
            documento: null,
            negocio:  0
          })

        return console.log(newDistributor)
    } catch (error) {
        console.log(error)
    }
  }

  return {
    handleSubmit,
    handleDistributor
  }
}
