import * as Joi from 'joi';


export const JoiValidationShema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(27)

})



// // Definir el esquema de validación con Joi
// const userSchema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   age: Joi.number().integer().min(0).max(120).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(8).required(),
// });

// // Tipo de TypeScript para el objeto User
// interface User {
//   name: string;
//   age: number;
//   email: string;
//   password: string;
// }

// // Ejemplo de función para validar el objeto User
// const validateUser = (user: User) => {
//   const { error, value } = userSchema.validate(user);
//   if (error) {
//     throw new Error(`Validation error: ${error.message}`);
//   }
//   return value;
// };

// // Prueba de validación
// const user: User = {
//   name: 'Juan',
//   age: 25,
//   email: 'juan@example.com',
//   password: 'securePassword123',
// };

// try {
//   const validatedUser = validateUser(user);
//   console.log('Usuario validado:', validatedUser);
// } catch (error) {
//   console.error(error.message);
// }
