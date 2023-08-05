'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import './navbar.css'

function Navbar() {
  const { data: session } = useSession();

  return (
     <nav className="nav-barra">
    <div className="div-block-16">
    <ul className="ulnav">
          {session ? (
            <>
              <li className="link-navbar">
                <Link href="/dashboard/profile">Perfil</Link>
              </li>
              <button
          className="cerrar-sesion"
          onClick={() => {
            signOut();
          }}
        >
          Log out
        </button>
            </>
          ) : (
            <>
              <li className="login">
                <Link href="/login">Ingresar</Link>
              </li>
              <li className="registrarse">
                <Link href="/register">Registrarse</Link>
              </li>  
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;