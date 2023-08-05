import Image from "next/image";
import "./globals.css";

export default function Home() {
  return (
    <main>
      <div className="contenedor-1000">
        <div className="contenedor-1000px">
          <h1 className="h1-home">Sabias que...</h1>
          <p>
            La carne es un alimento bastante susceptible a la contaminación
            bacteriana, por lo que es importante seguir ciertas pautas de
            conservación de los alimentos como mantener las neveras con carne a
            unos 4ºC. Es importante tener en cuenta que no todas las carnes son
            iguales: la carne picada es más susceptible todavía a esta
            contaminación, por ejemplo, por E.Coli, ya que su superficie en
            contacto con el aire es mayor.
          </p>
        </div>

        <div className="contenedor-1000px">
          <div>
            <h1 className="h1-home">Variedad de cortes</h1>
            <img
              className="imgvaca"
              src="https://www.pujols.es/wp-content/uploads/2022/09/cortes-de-la-vaca-1-scaled.jpg"
            ></img>
          </div>

          <div className="flex-horizontal">
            <div>
              <p className="bold">Espalda:</p>
              <ul>
                <li>Morrillo.</li>
                <li>Aguja</li>
                <li>Carrillada</li>
                <li>Pescuezo</li>
                <li>Espaldilla</li>
                <li>Llana</li>
                <li>Pez</li>
                <li>Brazuelo</li>
                <li>Pecho</li>
                <li>Morcillo anterior.</li>
              </ul>
            </div>
            <div>
              <p className="bold">Lomo alto:</p>
              <ul>
                <li>Lomo alto.</li>
                <li>Costillar</li>
                <li>Aleta</li>
              </ul>
            </div>
            <div>
              <p className="bold">Lomo bajo:</p>
              <ul>
                <li>Solomillo</li>
                <li>Lomo bajo</li>
                <li>Falda</li>
              </ul>
            </div>
            <div>
              <p className="bold">Cadera:</p>
              <ul>
                <li>Cadera</li>
                <li>Babilla</li>
                <li>Rabillo de cadera</li>
                <li>Culata de contra</li>
                <li>Morcillo posterior</li>
              </ul>
            </div>
            <div>
              <p className="bold">Tapa:</p>
              <ul>
                <li>Rabo</li>
                <li>Tapa</li>
                <li>Tapilla</li>
                <li>Contra</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
