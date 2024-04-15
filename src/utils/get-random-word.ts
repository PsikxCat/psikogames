export default function getRandomWord(): string {
  const words = [
    'manos', 'perro', 'gatos', 'mesas', 'silla', 'libro', 'pluma', 'luzca', 'bravo',
    'miedo', 'risas', 'juego', 'papel', 'lapiz', 'radio', 'video', 'muslo', 'codos',
    'brazo', 'nariz', 'pecho', 'dedos', 'barba', 'cejas', 'talon', 'riñon', 'hueso',
    'atomo', 'quark', 'boson', 'negro', 'enano', 'calor', 'vapor', 'debil', 'vacio',
    'punto', 'linea', 'plano', 'forma', 'color', 'ancho', 'carga', 'metal', 'cuero',
    'arena', 'fuego', 'hielo', 'leche', 'carne', 'pollo', 'arroz', 'pasta', 'queso',
    'huevo', 'fruta', 'claro', 'decir', 'dejar', 'dicho', 'doble', 'donde', 'estar',
    'grado', 'grano', 'grupo', 'hacer', 'hacia', 'hasta', 'joven', 'jugar', 'largo',
    'mismo', 'meses', 'mundo', 'nuevo', 'nunca', 'pieza', 'pobre', 'pocos', 'poder',
    'ponte', 'puedo', 'punta', 'razon', 'saber', 'santo', 'sobre', 'suelo', 'talón',
    'tanto', 'tarea', 'tengo', 'terna', 'texto', 'tener', 'tiene', 'todas', 'trata',
    'trigo', 'venir', 'vista', 'volar'
  ]

  return words[Math.floor(Math.random() * words.length)]
}
