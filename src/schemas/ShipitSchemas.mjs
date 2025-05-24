import {z} from 'zod'
const shipitSchema=z.object({
    kind:z.number().int().max(0),
    platform:z.number().int().max(3),
    reference:z.string({
      required_error:'reference es requerido'
    }),
    destiny:z.object({
      street: z.string({
        invalid_type_error:'Direccion solo debe contener letras',
        required_error:'Direccion es requerida'
      }),
       number: z.number({
        required_error:'Numero es requerido'}
        ).int({message:'debe ser un numero entero'}).positive({message:'debe ser un numero positivo'}).finite(),
        commune_id: z.number({
        invalid_type_error:'comuna ID solo debe contener Numeros',
        required_error:'Comuna ID es requerida'
        }).int(),
        commune_name: z.string({
        invalid_type_error:'Comuna solo debe contener letras',
        required_error:'Comedia es requerida'
        }).toUpperCase({message:'comuna NO fué transformada correctamente a Mayusculas'}),
        full_name:z.string({
        invalid_type_error:'Nombre solo debe contener letras',
        required_error:'Nombre es requerido'
        }),
        email: z.string({
        required_error:'Region es requerida'
        }).email({message:'debe ser un formato permitido: example@example.com'}),
        phone:z.number().int().positive().finite(),
        kind:z.string(),
      }),
      size:z.object({
        weight: z.number(),
        height: z.number(),
        width: z.number(),
        length: z.number(),
      }),
      items:z.number().int().positive(),
      courier:z.object({
        id: z.number().int().positive(), 
        client:z.string(), 
        selected: z.boolean()
      }), 
      insurance:z.object({
        ticket_number: z.string(),
        ticket_amount: z.number().int().positive(),
        detail: z.string(),
        extra: z.boolean(),
      }), 
})
const shipitCotizar=z.object({
  parcel:z.object({
    courier_for_client:z.string({
        invalid_type_error:'tipo del dato recibido invalido',
        required_error:'el nombre del repartidor no fué recibido'
      }),
    origin_id:z.number().int().positive(),
    destiny_id:z.number().int().positive(),
    type_of_destiny:z.string(),
    height: z.number().int().positive(),
    width: z.number().int().positive(),
    length: z.number().int().positive(),
    weight: z.number().positive(),
  })
})
export function validateCrearEnvio(object)
{
    return shipitSchema.safeParseAsync(object)
}
export function validateCotizar(object)
{
    return shipitCotizar.safeParseAsync(object)
}