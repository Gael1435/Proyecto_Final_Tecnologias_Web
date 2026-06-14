// Formulario de educación: estado y validación (Editor)
import { useFormEducacion } from '../hooks/useFormEducacion';

function EducationForm({ onValidate }) {
    // Initialize education hook (data, handlers)
    const {
        educaciones,
        datos,
        errores,
        cambiarEntrada,
        agregarEducacion,
        eliminarEducacion,
        editarEducacion
    } = useFormEducacion(onValidate);

    const estados = ['Completado', 'En progreso', 'Abandonado'];

    return (
        <div className="w-full">
                {/* Sección de educación y formulario */}
                <h1 className="text-2xl font-bold mb-6">Educación</h1>

                <div className="p-4 rounded border border-gray-200 dark:border-gray-700 mb-6">
                    <h2 className="text-base font-semibold mb-4">Agregar Educación</h2>
                    
                    <form onSubmit={agregarEducacion} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div> <label htmlFor="institucion" className="block text-sm mb-1">Institución <span className="font-semibold">*</span></label><input id="institucion" type="text" name="institucion" value={datos.institucion} onChange={cambiarEntrada} placeholder="Universidad" className={`w-full px-3 py-2 border rounded text-sm ${errores.institucion ? 'border-current' : 'border-gray-300 dark:border-gray-600'}`} />{errores.institucion && <p className="text-xs mt-1">{errores.institucion}</p>} </div>
                            <div> <label htmlFor="titulo" className="block text-sm mb-1">Título <span className="font-semibold">*</span></label><input id="titulo" type="text" name="titulo" value={datos.titulo} onChange={cambiarEntrada} placeholder="Licenciatura" className={`w-full px-3 py-2 border rounded text-sm ${errores.titulo ? 'border-current' : 'border-gray-300 dark:border-gray-600'}`} />{errores.titulo && <p className="text-xs mt-1">{errores.titulo}</p>} </div>
                        </div>

                        <div> <label htmlFor="carrera" className="block text-sm mb-1">Carrera</label><input id="carrera" type="text" name="carrera" value={datos.carrera} onChange={cambiarEntrada} placeholder="Ingeniería en Sistemas" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm" /></div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3"> <div><label htmlFor="fechaInicio" className="block text-sm mb-1">Inicio</label><input id="fechaInicio" type="month" name="fechaInicio" value={datos.fechaInicio} onChange={cambiarEntrada} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm" /></div> <div><label htmlFor="fechaFin" className="block text-sm mb-1">Fin</label><input id="fechaFin" type="month" name="fechaFin" value={datos.fechaFin} onChange={cambiarEntrada} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm" /></div> <div><label htmlFor="estado" className="block text-sm mb-1">Estado</label><select id="estado" name="estado" value={datos.estado} onChange={cambiarEntrada} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm">{estados.map(e => (<option key={e} value={e}>{e}</option>))}</select></div> </div>

                        <div> <label htmlFor="descripcion" className="block text-sm mb-1">Descripción</label><textarea id="descripcion" name="descripcion" value={datos.descripcion} onChange={cambiarEntrada} rows="2" placeholder="Detalles..." className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm resize-none" /></div>

                    <button type="submit" className="px-4 py-2 rounded-full text-sm border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">Agregar</button>
                    </form>
                </div>

                <div className="p-4 rounded border border-gray-200 dark:border-gray-700">
                    <h2 className="text-base font-semibold mb-4">
                        Educación ({educaciones.length})
                    </h2>

                    {educaciones.length === 0 ? (
                        <p className="text-center text-sm py-6">Sin educación</p>
                    ) : (
                        <div className="space-y-2">
                            {educaciones.map(education => (
                                <div 
                                    key={education.id} 
                                    className="flex items-start justify-between p-3 border border-gray-300 dark:border-gray-600 rounded text-sm"
                                >
                                    <div className="flex-1">
                                        <div className="font-medium">
                                            {education.titulo}
                                        </div>
                                        <div className="text-xs">
                                            {education.institucion}
                                        </div>
                                        {education.carrera && (
                                            <div className="text-xs">
                                                {education.carrera}
                                            </div>
                                        )}
                                        {education.fechaInicio && (
                                            <div className="text-xs mt-1">
                                                {education.fechaInicio} {education.fechaFin && `- ${education.fechaFin}`}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2 ml-3">
                                        <button type="button" data-id={education.id} onClick={editarEducacion} className="text-xs">Editar</button>
                                        <button type="button" data-id={education.id} onClick={eliminarEducacion} className="text-xs">Eliminar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
        </div>
    );
}

export default EducationForm;