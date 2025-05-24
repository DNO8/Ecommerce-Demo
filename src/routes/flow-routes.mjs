import express from 'express'
import { FlowController } from '../API/Flow/controllers/FlowControllerDemo.mjs';

const router=express.Router();

//FLOW API CALLS
router.post('/pagar',FlowController.pasarela);
router.post('/confirmacion', FlowController.confirmacion);
router.post('/retorno', (req, res) => {
  console.log('¡POST recibido en /flow/retorno!');
  res.redirect('/pago-exitoso.html');
})
export default router;
