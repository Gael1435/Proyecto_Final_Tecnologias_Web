// Reglas de validación reutilizables: URLs, longitudes y opciones limitadas
// Este fichero exporta funciones genéricas usadas por los validadores
// de los formularios (email, url, longitudes, listas permitidas).
export const isValidURL = (value) => {
  // Verifica si es una URL válida (new URL lanzará si no lo es)
  if (!value || typeof value !== 'string') return false;
  try {
    // new URL acepta URLs absolutas; permitimos también rutas relativas si fuera necesario
    new URL(value);
    return true;
  } catch (e) {
    return false;
  }
};

export const minLength = (value, n) => {
  // Comprueba longitud mínima (ignora espacios alrededor)
  if (typeof value !== 'string') return false;
  return value.trim().length >= n;
};

export const maxLength = (value, n) => {
  // Comprueba longitud máxima (ignora espacios alrededor)
  if (typeof value !== 'string') return false;
  return value.trim().length <= n;
};

export const within = (value, list) => {
  // Comprueba que el valor esté dentro de una lista permitida
  return list.includes(value);
};

export const normalize = (value) => (typeof value === 'string' ? value.trim() : value);

// Email validation
export const isValidEmail = (value) => {
  if (!value || typeof value !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

// Phone validation (allow digits, spaces, + - ( ) min length 7)
export const isValidPhone = (value) => {
  // Valida teléfono con caracteres permitidos y longitud mínima
  if (!value || typeof value !== 'string') return false;
  return /^[\d\s\-\+\(\)]{7,}$/.test(value);
};

export const nivelesPermitidos = ['Básico', 'Intermedio', 'Avanzado'];
