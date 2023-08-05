'use client'
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import './profile.css'

function ProfilePage() {
  const { data: session, status } = useSession();

  return (
    <div className="contenedor">
      {/* Perfil */}
      <div className="perfil">
          <div className="flex">
           <img className="imageprofile" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt=""  />
              <div className="user">
              <h1 className="texto">{session?.user?.nombre} {session?.user?.apellido}</h1>
              <p className="texto">{session?.user?.email}</p>
            </div>
          </div>
          
          <div className="flex-div">
            <p className="subtitulo">ID de usuario:</p>
            <p className="texto">{session?.user?.id}</p>
          </div>
          <div className="flex-div">
            <p className="subtitulo">Teléfono:</p>
            <p className="texto">{session?.user?.telefono}</p>
          </div>
          <div className="flex-div">
            <p className="subtitulo">Documento:</p>
            <p className="texto">{session?.user?.documento}</p>
          </div>
      </div>

      {/* Botones */}
      <div className="interacciones">
        <div className="p-4">
          {session?.user?.roleId === 1 ? (
            <div className="elementos-int">
              <div >
                <Link className="texto-acciones" href="negocio">Crear negocio</Link>
              </div>
              <div className="">
                <Link className="texto-acciones" href="animal">Crear Animal</Link>
              </div>
              <div className="">
                <Link className="texto-acciones" href="granja">Crear Granja</Link>
              </div>
              <div className="">
                <Link className="texto-acciones" href="distributor">Crear Distribuidor</Link>
              </div>
              <div>
                <Link className="texto-acciones" href="../entrymovement">Crear Movimiento entrada</Link>
              </div>
              <div >
                <Link className="texto-acciones" href="../exitmovement">Crear Movimiento salida</Link>
              </div>
            </div>
            
          ): (
            <div >
              <div className="p-4">
                <div>
                  <Link className="texto-acciones" href="../entrymovement">Crear Movimiento entrada</Link>
                </div>
                <div >
                  <Link className="texto-acciones" href="../exitmovement">Crear Movimiento salida</Link>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
        </div>
      );
    }

export default ProfilePage;