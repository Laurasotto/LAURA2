// api/distribuidores/[id_distribuidor].js

import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const { id_distribuidor } = req.query;

  if (req.method === 'POST') {
    const { negociosSeleccionados } = req.body;

    try {
      // Obtener el distribuidor por su id_distribuidor
      const distribuidor = await prisma.distribuidor.findUnique({
        where: { id_distribuidor: parseInt(id_distribuidor) },
        include: { negocio_distribuidor: true },
      });

      // Asociar los nuevos negocios seleccionados al distribuidor
      const nuevosNegocios = negociosSeleccionados.filter((id_negocio) => {
        return !distribuidor.negocio_distribuidor.some(
          (nd) => nd.id_negocio === id_negocio
        );
      });

      const negociosAsociados = await Promise.all(
        nuevosNegocios.map((id_negocio) => {
          return prisma.negocio_distribuidor.create({
            data: {
              distribuidor: { connect: { id_distribuidor: parseInt(id_distribuidor) } },
              negocio: { connect: { id_negocio: parseInt(id_negocio) } },
            },
          });
        })
      );

      res.status(200).json(negociosAsociados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al vincular los negocios' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
