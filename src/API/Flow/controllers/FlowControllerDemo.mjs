
import { FlowModel } from "../model/FlowModelDemo.mjs";
export class FlowController
{
    static async pasarela(req,res) {
         try {
            const data=req.body;
            const result = await FlowModel.iniciarPagoConFlow(data);
            res.json(result);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    static async confirmacion(req, res) {
      try {
        const data = req.body;
        console.log("Confirmación recibida de Flow:", data);

        res.status(200).send("Confirmación recibida");
      } catch (error) {
        console.error("Error en confirmación Flow:", error);
        res.status(500).send("Error interno");
      }
    }
}