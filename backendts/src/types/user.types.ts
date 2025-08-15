export interface RegisterUserBody {
  idUsuario: string;
  nombres: string;
  apellidos: string;
  contraseña: string;
}

export interface LoginUserBody {
  idUsuario: string;
  contraseña: string;
}

export interface Usuario {
  idUsuario: string;
  nombres: string;
  contraseña: string;
}
