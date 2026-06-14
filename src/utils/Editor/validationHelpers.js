// Helpers de validación reutilizables para el editor (p.ej. required)
export const required = (fields, data) => {
  const errors = {};
  fields.forEach(f => {
    const name = typeof f === 'string' ? f : f.name;
    const message = typeof f === 'string' ? 'Este campo es obligatorio' : f.message;
    if (!data[name] || (typeof data[name] === 'string' && data[name].trim() === '')) {
      errors[name] = message;
    }
  });
  return errors;
};
