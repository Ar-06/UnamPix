export interface User {
  idUsuario: string;
  nombres: string;
  apellidos: string;
  contraseña: string;
}

export interface LoginUser {
  idUsuario: string;
  contraseña: string;
}
