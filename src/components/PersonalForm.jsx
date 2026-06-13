import { useFormPersonal } from '../hooks/useFormPersonal';

function PersonalForm({ onValidate }) {
    const { prevImagen, cambiarImagen, datos, errores, cambiarEntrada, validarAlDesenfoque } = useFormPersonal(onValidate);

    return (
        <div className="w-full">
            <form className="space-y-6">
                <div className="p-4 rounded border border-gray-200 dark:border-gray-700">
                    <h2 className="text-base font-semibold mb-4">Foto de Perfil</h2>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        
                        <div>
                            {prevImagen ? ( <img src={prevImagen} alt="Perfil" 
                                            className="w-20 h-20 rounded-full object-cover border border-gray-300"/>) 
                                            : ( <div className="w-20 h-20 rounded-full flex items-center justify-center text-xs">
                                                Sin foto </div>)}
                        </div>

                        <div className="flex-1 w-full">
                            <input type="file" accept="image/*" onChange={cambiarImagen} className="w-full text-sm" />
                        </div>

                    </div>

                    <div className="mt-3">
                        <label htmlFor="imageUrl" className="block text-sm mb-2">
                            O URL de imagen
                        </label>
                        <input id="imageUrl" type="url" placeholder="https://ejemplo.com/foto.jpg"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm"/>
                    </div>
                
                </div>

                <div className="p-4 rounded border border-gray-200 dark:border-gray-700">
                    <h2 className="text-base font-semibold mb-4">Datos Personales</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
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
                                onBlur={() => validarAlDesenfoque('nombre')}
                                placeholder="Tu nombre" 
                                className={`w-full px-3 py-2 border rounded text-sm ${errores.nombre ? 'border-current' : 'border-gray-300 dark:border-gray-600'}`}
                            />
                            {errores.nombre && <p className="text-xs mt-1">{errores.nombre}</p>}
                        </div>

                        <div>
                            <label htmlFor="carrera" className="block text-sm mb-1">
                                Carrera <span className="font-semibold">*</span>
                            </label>
                            <input 
                                id="carrera" 
                                type="text" 
                                name="carrera"
                                value={datos.carrera}
                                onChange={cambiarEntrada}
                                onBlur={() => validarAlDesenfoque('carrera')}
                                placeholder="Ej: Ingeniería en Sistemas" 
                                className={`w-full px-3 py-2 border rounded text-sm ${errores.carrera ? 'border-current' : 'border-gray-300 dark:border-gray-600'}`}
                            />
                            {errores.carrera && <p className="text-xs mt-1">{errores.carrera}</p>}
                        </div>

                        <div>
                            <label htmlFor="ciudad" className="block text-sm mb-1">
                                Ciudad <span className="font-semibold">*</span>
                            </label>
                            <input 
                                id="ciudad" 
                                type="text" 
                                name="ciudad"
                                value={datos.ciudad}
                                onChange={cambiarEntrada}
                                onBlur={() => validarAlDesenfoque('ciudad')}
                                placeholder="Tu ciudad" 
                                className={`w-full px-3 py-2 border rounded text-sm ${errores.ciudad ? 'border-current' : 'border-gray-300 dark:border-gray-600'}`}
                            />
                            {errores.ciudad && <p className="text-xs mt-1">{errores.ciudad}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm mb-1">
                                Email <span className="font-semibold">*</span>
                            </label>
                            <input 
                                id="email" 
                                type="email" 
                                name="email"
                                value={datos.email}
                                onChange={cambiarEntrada}
                                onBlur={() => validarAlDesenfoque('email')}
                                placeholder="tu@correo.com" 
                                className={`w-full px-3 py-2 border rounded text-sm ${errores.email ? 'border-current' : 'border-gray-300 dark:border-gray-600'}`}
                            />
                            {errores.email && <p className="text-xs mt-1">{errores.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="telefono" className="block text-sm mb-1">
                                Teléfono
                            </label>
                            <input 
                                id="telefono" 
                                type="tel" 
                                name="telefono"
                                value={datos.telefono}
                                onChange={cambiarEntrada}
                                onBlur={() => validarAlDesenfoque('telefono')}
                                placeholder="+34 600 123 456" 
                                className={`w-full px-3 py-2 border rounded text-sm ${errores.telefono ? 'border-current' : 'border-gray-300 dark:border-gray-600'}`}
                            />
                            {errores.telefono && <p className="text-xs mt-1">{errores.telefono}</p>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="descripcion" className="block text-sm mb-1">
                            Descripción Profesional <span className="font-semibold">*</span>
                        </label>
                        <textarea 
                            id="descripcion" 
                            name="descripcion"
                            value={datos.descripcion}
                            onChange={cambiarEntrada}
                            onBlur={() => validarAlDesenfoque('descripcion')}
                            rows="4"
                            placeholder="Cuéntame sobre ti..." 
                            className={`w-full px-3 py-2 border rounded text-sm resize-none ${errores.descripcion ? 'border-current' : 'border-gray-300 dark:border-gray-600'}`}
                        />
                        {errores.descripcion && <p className="text-xs mt-1">{errores.descripcion}</p>}
                    </div>
                </div>

                <div className="p-4 rounded border border-gray-200 dark:border-gray-700">
                    <h2 className="text-base font-semibold mb-4">Enlaces Profesionales</h2>
                    
                    <div className="space-y-3">
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
                                placeholder="https://github.com/usuario" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="linkedin" className="block text-sm mb-1">
                                LinkedIn
                            </label>
                            <input 
                                id="linkedin" 
                                type="url" 
                                name="linkedin"
                                value={datos.linkedin}
                                onChange={cambiarEntrada}
                                placeholder="https://linkedin.com/in/usuario" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="portafolio" className="block text-sm mb-1">
                                Portafolio
                            </label>
                            <input 
                                id="portafolio" 
                                type="url" 
                                name="portafolio"
                                value={datos.portafolio}
                                onChange={cambiarEntrada}
                                placeholder="https://miportafolio.com" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="repositorio" className="block text-sm mb-1">
                                Repositorio Principal
                            </label>
                            <input 
                                id="repositorio" 
                                type="url" 
                                name="repositorio"
                                value={datos.repositorio}
                                onChange={cambiarEntrada}
                                placeholder="https://github.com/usuario/principal" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="enlacePersonal" className="block text-sm mb-1">
                                Enlace Personalizado
                            </label>
                            <input 
                                id="enlacePersonal" 
                                type="url" 
                                name="enlacePersonal"
                                value={datos.enlacePersonal}
                                onChange={cambiarEntrada}
                                placeholder="https://ejemplo.com" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PersonalForm;