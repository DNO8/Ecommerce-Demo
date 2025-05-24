export class ShipitModel {
  static async cotizarEnvio(data) {
    console.log('[DEMO] cotizando envío con:', data);

    // Simulación de respuesta
    return {
      precio: 4990,
      courier: 'Chilexpress',
      tiempo_estimado: '2 a 4 días'
    };
  }

  static async crearEnvio(data) {
    console.log('[DEMO] creando envío con:', data);

    // Simulación de respuesta 
    return {
      success: true,
      tracking_number: 'SHIP123456789',
      courier: 'Chilexpress'
    };
  }

  static async obtenerCouriers() {
    console.log('[DEMO] obteniendo couriers');

    return [{name:'Chilexpress',id:1,image_original_url:'https://mir-s3-cdn-cf.behance.net/projects/404/7262c0102689435.Y3JvcCw3NTUsNTkwLDI2LDIy.png'}, {name:'Starken',id:2,image_original_url:'https://jumpseller.cl/images/share/starken.png'}, {name:'Bluexpress',id:8,image_original_url:'https://jumpseller.cl/generated/images/support/bluexpress/bluexpress-logo-256-91fdf6b6b.png'}];
  }
}
