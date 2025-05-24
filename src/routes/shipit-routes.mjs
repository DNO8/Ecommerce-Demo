import express from 'express'
import { ShipitController } from '../API/Shipit/controllers/shipitDemo.mjs';

const router=express.Router();


//SHIPIT API CALLS
router.post('/cotizar',ShipitController.cotizar);
router.post('/crear-envio',ShipitController.crearEnvio);
router.get('/couriers', ShipitController.getCouriers);
export default router;