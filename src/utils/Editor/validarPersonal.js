export const validarPersonal = (data) => {
  const errors = {};

  if (!data.nombre || data.nombre.trim() === '') {
    errors.nombre = 'El nombre es obligatorio';
  }

  if (!data.carrera || data.carrera.trim() === '') {
    errors.carrera = 'La carrera es obligatoria';
  }

  if (!data.ciudad || data.ciudad.trim() === '') {
    errors.ciudad = 'La ciudad es obligatoria';
  }

  if (!data.email || data.email.trim() === '') {
    errors.email = 'El email es obligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email inválido';
  }

  if (data.telefono && !/^[\d\s\-\+\(\)]{7,}$/.test(data.telefono)) {
    errors.telefono = 'Teléfono inválido';
  }

  if (!data.descripcion || data.descripcion.trim() === '') {
    errors.descripcion = 'La descripción es obligatoria';
  }

  return errors;
};

export const esPersonalCompleto = (data) => {
  return (
    data.nombre &&
    data.carrera &&
    data.ciudad &&
    data.email &&
    data.descripcion &&
    !Object.keys(validarPersonal(data)).length
  );
};
