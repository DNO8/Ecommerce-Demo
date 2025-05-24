export class FlowModel
{
    static async iniciarPagoConFlow(data) {
        console.log('[DEMO] iniciando pago con datos:', data);
        return {
        success: true,
        url: 'https://sandbox.flow.cl/app/web/pay.php?token=DEMO12345'
        };
    }
}