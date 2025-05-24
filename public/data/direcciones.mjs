import direcciones from './regionesyciudades.json' with {type:"json"};
let _Direcciones=null;
export async function obtenerDirecciones() {
  if (_Direcciones) return _Direcciones;
  _Direcciones = direcciones;
  return direcciones;

}
export async function obtenerComuna(str) {
    const response = await obtenerDirecciones();
    const dirEncontrada=response.find(direccion=>direccion.name===str);
    if(dirEncontrada)
    {
        const comuna=dirEncontrada.id
        return comuna;
    }
    return;
    

}
