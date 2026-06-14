// Formulario de experiencia laboral: estado y validación (Editor)
import { useFormExperiencia } from '../hooks/useFormExperiencia';

function ExtraInfoForm({ onValidate }) {
    // Initialize experience hook (list, form data, handlers)
    const {
        experiencias,
        datos,
        errores,
        cambiarEntrada,
        agregarExperiencia,
        eliminarExperiencia,
        editarExperiencia
    } = useFormExperiencia(onValidate);

    const tipos = ['Tiempo completo', 'Tiempo parcial', 'Contrato', 'Temporal', 'Freelance', 'Prácticas'];

    return (
        <div className="w-full">
                {/* Sección de experiencia y formulario */}
                <h1 className="text-2xl font-bold mb-6">Experiencia Laboral</h1>

                <div className="p-4 rounded border border-gray-200 dark:border-gray-700 mb-6">
                    <h2 className="text-base font-semibold mb-4">Agregar Experiencia</h2>
                    
                    <form onSubmit={agregarExperiencia} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"> <div> <label htmlFor="empresa" className="block text-sm mb-1">Empresa <span className="font-semibold">*</span></label><input id="empresa" type="text" name="empresa" value={datos.empresa} onChange={cambiarEntrada} placeholder="Nombre empresa" className={`w-full px-3 py-2 border rounded text-sm ${errores.empresa ? 'border-current' : 'border-gray-300 dark:border-gray-600'}`} />{errores.empresa && <p className="text-xs mt-1">{errores.empresa}</p>} </div> <div> <label htmlFor="puesto" className="block text-sm mb-1">Puesto <span className="font-semibold">*</span></label><input id="puesto" type="text" name="puesto" value={datos.puesto} onChange={cambiarEntrada} placeholder="Desarrollador" className={`w-full px-3 py-2 border rounded text-sm ${errores.puesto ? 'border-current' : 'border-gray-300 dark:border-gray-600'}`} />{errores.puesto && <p className="text-xs mt-1">{errores.puesto}</p>} </div> </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"> <div><label htmlFor="tipo" className="block text-sm mb-1">Tipo</label><select id="tipo" name="tipo" value={datos.tipo} onChange={cambiarEntrada} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm">{tipos.map(t => (<option key={t} value={t}>{t}</option>))}</select></div> <div><label htmlFor="ubicacion" className="block text-sm mb-1">Ubicación</label><input id="ubicacion" type="text" name="ubicacion" value={datos.ubicacion} onChange={cambiarEntrada} placeholder="Ciudad, País" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm" /></div> </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"> <div><label htmlFor="fechaInicio" className="block text-sm mb-1">Inicio</label><input id="fechaInicio" type="month" name="fechaInicio" value={datos.fechaInicio} onChange={cambiarEntrada} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm" /></div> <div><label htmlFor="fechaFin" className="block text-sm mb-1">Fin</label><input id="fechaFin" type="month" name="fechaFin" value={datos.fechaFin} onChange={cambiarEntrada} disabled={datos.presente} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed" /></div> </div>

                        <div className="flex items-center gap-2">
                            <input 
                                id="presente" 
                                type="checkbox" 
                                name="presente"
                                checked={datos.presente}
                                onChange={cambiarEntrada}
                                className="w-4 h-4"
                            />
                            <label htmlFor="presente" className="text-sm">
                                Actualmente trabajo aquí
                            </label>
                        </div>

                        <div> <label htmlFor="descripcion" className="block text-sm mb-1">Descripción</label><textarea id="descripcion" name="descripcion" value={datos.descripcion} onChange={cambiarEntrada} rows="2" placeholder="Responsabilidades..." className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm resize-none" /></div>

                    <button type="submit" className="px-4 py-2 rounded-full text-sm border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">Agregar</button>
                    </form>
                </div>

                <div className="p-4 rounded border border-gray-200 dark:border-gray-700">
                    <h2 className="text-base font-semibold mb-4">
                        Experiencia ({experiencias.length})
                    </h2>

                    {experiencias.length === 0 ? (
                        <p className="text-center text-sm py-6">Sin experiencia</p>
                    ) : (
                        <div className="space-y-2">
                            {experiencias.map(experience => (
                                <div 
                                    key={experience.id} 
                                    className="flex items-start justify-between p-3 border border-gray-300 dark:border-gray-600 rounded text-sm"
                                >
                                    <div className="flex-1">
                                        <div className="font-medium mb-1">
                                            {experience.puesto}
                                        </div>
                                        <div className="text-xs mb-1">
                                            {experience.empresa}
                                        </div>
                                        {experience.ubicacion && (
                                            <div className="text-xs mb-1">
                                                📍 {experience.ubicacion}
                                            </div>
                                        )}
                                        {experience.fechaInicio && (
                                            <div className="text-xs mb-1">
                                                {experience.fechaInicio} {experience.presente ? '- Presente' : experience.fechaFin ? `- ${experience.fechaFin}` : ''}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2 ml-3"> <button type="button" data-id={experience.id} onClick={editarExperiencia} className="text-xs">Editar</button> <button type="button" data-id={experience.id} onClick={eliminarExperiencia} className="text-xs">Eliminar</button> </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
        </div>
    );
}

export default ExtraInfoForm;