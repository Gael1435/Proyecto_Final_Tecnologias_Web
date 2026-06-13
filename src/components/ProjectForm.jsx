import { useFormProyecto } from '../hooks/useFormProyecto';

function ProjectForm({ onValidate }) {
    const {
        proyectos,
        datos,
        errores,
        cambiarEntrada,
        agregarProyecto,
        eliminarProyecto,
        editarProyecto
    } = useFormProyecto(onValidate);

    return (
        <div className="w-full">
                <h1 className="text-2xl font-bold mb-6">Proyectos</h1>

                <div className="p-4 rounded border border-gray-200 dark:border-gray-700 mb-6">
                    <h2 className="text-base font-semibold mb-4">Agregar Proyecto</h2>
                    
                    <form onSubmit={agregarProyecto} className="space-y-4">
                        <div>
                            <label htmlFor="nombre" className="block text-sm mb-1">
                                Nombre <span className="font-semibold">*</span>
                            </label>
                            <input 
                                id="nombre" 
                                type="text" 
                                name="nombre"
                                value={datos.nombre}
                                onChange={cambiarEntrada}
                                placeholder="Nombre del proyecto" 
                                className={`w-full px-3 py-2 border rounded text-sm ${errores.nombre ? 'border-current' : 'border-gray-300 dark:border-gray-600'}`}
                            />
                            {errores.nombre && <p className="text-xs mt-1">{errores.nombre}</p>}
                        </div>

                        <div>
                            <label htmlFor="descripcion" className="block text-sm mb-1">
                                Descripción <span className="font-semibold">*</span>
                            </label>
                            <textarea 
                                id="descripcion" 
                                name="descripcion"
                                value={datos.descripcion}
                                onChange={cambiarEntrada}
                                rows="2"
                                placeholder="Descripción..." 
                                className={`w-full px-3 py-2 border rounded text-sm resize-none ${errores.descripcion ? 'border-current' : 'border-gray-300 dark:border-gray-600'}`}
                            />
                            {errores.descripcion && <p className="text-xs mt-1">{errores.descripcion}</p>}
                        </div>

                        <div>
                            <label htmlFor="tecnologias" className="block text-sm mb-1">
                                Tecnologías (separadas por comas)
                            </label>
                            <input 
                                id="tecnologias" 
                                type="text" 
                                name="tecnologias"
                                value={datos.tecnologias}
                                onChange={cambiarEntrada}
                                placeholder="React, Node.js, MongoDB" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="enlace" className="block text-sm mb-1">
                                    Enlace del Proyecto
                                </label>
                                <input 
                                    id="enlace" 
                                    type="url" 
                                    name="enlace"
                                    value={datos.enlace}
                                    onChange={cambiarEntrada}
                                    placeholder="https://proyecto.com" 
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="github" className="block text-sm mb-1">
                                    GitHub
                                </label>
                                <input 
                                    id="github" 
                                    type="url" 
                                    name="github"
                                    value={datos.github}
                                    onChange={cambiarEntrada}
                                    placeholder="https://github.com/usuario/repo" 
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="fechaInicio" className="block text-sm mb-1">
                                    Inicio
                                </label>
                                <input 
                                    id="fechaInicio" 
                                    type="month" 
                                    name="fechaInicio"
                                    value={datos.fechaInicio}
                                    onChange={cambiarEntrada}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="fechaFin" className="block text-sm mb-1">
                                    Fin
                                </label>
                                <input 
                                    id="fechaFin" 
                                    type="month" 
                                    name="fechaFin"
                                    value={datos.fechaFin}
                                    onChange={cambiarEntrada}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input 
                                id="destacado" 
                                type="checkbox" 
                                name="destacado"
                                checked={datos.destacado}
                                onChange={cambiarEntrada}
                                className="w-4 h-4"
                            />
                            <label htmlFor="destacado" className="text-sm">
                                Marcar como destacado
                            </label>
                        </div>

                        <button 
                            type="submit" 
                            className="px-3 py-2 rounded text-sm"
                        >
                            Agregar
                        </button>
                    </form>
                </div>

                <div className="p-4 rounded border border-gray-200 dark:border-gray-700">
                    <h2 className="text-base font-semibold mb-4">
                        Proyectos ({proyectos.length})
                    </h2>

                    {proyectos.length === 0 ? (
                        <p className="text-center text-sm py-6">Sin proyectos</p>
                    ) : (
                        <div className="space-y-2">
                            {proyectos.map(project => (
                                <div 
                                    key={project.id} 
                                    className={`p-3 border rounded text-sm ${project.destacado ? 'border-gray-500 dark:border-gray-500' : 'border-gray-300 dark:border-gray-600'}`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <div className="font-medium">
                                                {project.nombre} {project.destacado && <span className="text-xs px-2 py-1 rounded">Destacado</span>}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => editarProyecto(project)}
                                                className="text-xs"
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => eliminarProyecto(project.id)}
                                                className="text-xs"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-xs mb-2">
                                        {project.descripcion}
                                    </p>

                                    {project.tecnologias && (
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {project.tecnologias.split(',').map((tech, idx) => (
                                                <span key={idx} className="px-2 py-1 text-xs rounded">
                                                    {tech.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {(project.enlace || project.github) && (
                                        <div className="flex gap-2 text-xs">
                                            {project.enlace && (
                                                <a href={project.enlace} target="_blank" rel="noopener noreferrer" className="">
                                                    Ver
                                                </a>
                                            )}
                                            {project.github && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="">
                                                    GitHub
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
        </div>
    );
}

export default ProjectForm;