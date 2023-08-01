'use client'

import { signOut, useSession } from "next-auth/react";

function ProfilePage() {
  const { data: session, status } = useSession(); // Añade los paréntesis para invocar la función

  console.log(session, status); // Usa 'session' en lugar de 'data'
  
  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center gap-y-5"> 
      <h1 className="font-bold text-3xl">Profile</h1>
      
      <pre  className="bg-zinc-800 p-4">
        {
          JSON.stringify({
            session,
            status,
          },
          null,
          2
          )}
      </pre>

      <button className="bg-zinc-800 px-4 py-2 block mb-2"
      onClick={() => {
        signOut();
      }}>Log out</button>
    </div>
  );
}

export default ProfilePage;
