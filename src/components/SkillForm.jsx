// Formulario de habilidades: estado, validaciones y manejadores (Editor)
import { useFormHabilidad } from '../hooks/useFormHabilidad';

function SkillForm({ onValidate }) {
    const {
        habilidades, datos, errores,
        cambiarEntrada, agregarHabilidad, eliminarHabilidad, editarHabilidad
    } = useFormHabilidad(onValidate);

    const categorias = [
        'Programación', 'Bases de datos', 'Diseño web', 'Idiomas', 'Herramientas de desarrollo', 'Habilidades blandas'
    ];

    const niveles = ['Básico', 'Intermedio', 'Avanzado'];

    return (
        <div className="w-full">
            {/* Formulario para agregar habilidades */}
            <form onSubmit={agregarHabilidad} className="space-y-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label htmlFor="nombre" className="block text-sm mb-1">Nombre <span className="font-semibold">*</span></label>
                        <input id="nombre" type="text" name="nombre" value={datos.nombre} onChange={cambiarEntrada} placeholder="JavaScript, Python" className={`w-full px-3 py-2 border rounded text-sm ${errores.nombre ? 'border-current' : 'border-gray-300 dark:border-gray-600'}`} />
                        {errores.nombre && <p className="text-xs mt-1">{errores.nombre}</p>}
                    </div>

                    <div>
                        <label htmlFor="categoria" className="block text-sm mb-1">Categoría <span className="font-semibold">*</span></label>
                        <select id="categoria" name="categoria" value={datos.categoria} onChange={cambiarEntrada} className={`w-full px-3 py-2 border rounded text-sm ${errores.categoria ? 'border-current' : 'border-gray-300 dark:border-gray-600'}`}>
                            <option value="">Selecciona</option>
                            {categorias.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                        </select>
                        {errores.categoria && <p className="text-xs mt-1">{errores.categoria}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-2">Nivel <span className="font-semibold">*</span></label>
                    <div className="flex gap-3">
                        {niveles.map(nivel => (
                            <label key={nivel} className="flex items-center gap-2">
                                <input type="radio" name="nivel" value={nivel} checked={datos.nivel === nivel} onChange={cambiarEntrada} className="w-4 h-4" />
                                <span className="text-sm">{nivel}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="descripcion" className="block text-sm mb-1">Descripción</label>
                    <textarea id="descripcion" name="descripcion" value={datos.descripcion} onChange={cambiarEntrada} rows="2" placeholder="Descripción..." className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm resize-none" />
                </div>

                <button type="submit" className="px-4 py-2 rounded-full text-sm border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">Agregar</button>
            </form>

            {/* Lista de habilidades agregadas */}
            {habilidades.length > 0 && (
                <div className="space-y-2">
                    {habilidades.map(skill => (
                        <div key={skill.id} className="flex items-start justify-between p-3 border border-gray-300 dark:border-gray-600 rounded text-sm">
                            <div className="flex-1">
                                <div className="font-medium mb-1">{skill.nombre}</div>
                                <div className="flex gap-2 mb-1">
                                    <span className="px-2 py-1 text-xs rounded">{skill.categoria}</span>
                                    <span className="px-2 py-1 text-xs rounded">{skill.nivel}</span>
                                </div>
                                {skill.descripcion && (<p className="text-xs">{skill.descripcion}</p>)}
                            </div>

                            <div className="flex gap-2 ml-3">
                                <button type="button" data-id={skill.id} onClick={editarHabilidad} className="text-xs">Editar</button>
                                <button type="button" data-id={skill.id} onClick={eliminarHabilidad} className="text-xs">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SkillForm;
