/**
 * Array de rutas publicas.
 * Estas rutas no requieren autenticación.
 */
export const publicRoutes: string[] = [
  '/'
]

/**
 * Array de rutas de autenticación.
 * Estas rutas redireccionan a /home si el usuario esta autenticado.
 */
export const authRoutes: string[] = [
  '/auth/login',
  '/auth/register'
]

/**
 * Prefijo de las rutas de la API de autenticación.
 * Las rutas de la API de autenticación no deben ser protegidas por el middleware de autenticación.
 */
export const authApiPrefix: string = '/api/auth'

/**
 * RRuta por defecto a la que se redirecciona al iniciar sesión.
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/home'

/**
 * Ruta por defecto a la que se redirecciona al cerrar sesión.
 */
export const DEFAULT_LOGOUT_REDIRECT: string = '/'
