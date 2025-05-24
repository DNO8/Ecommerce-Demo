import { ShipitModel } from "../model/shipitModelDemo.mjs";
export class ShipitController
{
    static async cotizar(req,res) {
         try {
            console.log('llegue al controlador cotizar');
            const result = await ShipitModel.cotizarEnvio(req.body);
            res.json(result);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    static async getCouriers(req,res){
        try {
            const result = await ShipitModel.obtenerCouriers();
            res.json(result);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    static async crearEnvio(req,res){
        try {
            const result=await ShipitModel.crearEnvio(req.body);
            res.json(result)
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}