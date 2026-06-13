export const validarEducacion = (data) => {
  const errors = {};

  if (!data.institucion || data.institucion.trim() === '') {
    errors.institucion = 'La institución es obligatoria';
  }

  if (!data.titulo || data.titulo.trim() === '') {
    errors.titulo = 'El título es obligatorio';
  }

  return errors;
};

export const esEducacionCompleta = (data) => {
  return (
    data.institucion &&
    data.titulo &&
    !Object.keys(validarEducacion(data)).length
  );
};
