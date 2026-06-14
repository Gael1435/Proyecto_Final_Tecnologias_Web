import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage'; 

function Preview() {
    const [personal] = useLocalStorage('cv_personal', {});
    const [imagen] = useLocalStorage('cv_personal_imagen', null);
    const [experiencias] = useLocalStorage('cv_experiencias', []);
    const [educaciones] = useLocalStorage('cv_educacion', []); 
    const [proyectos] = useLocalStorage('cv_proyectos', []);
    const [habilidades] = useLocalStorage('cv_habilidades', []);

    const handlePrint = () => {
        window.print();
    };

    const nombre = personal.nombre || "Tu Nombre Aquí";
    const carrera = personal.carrera || "Tu Profesión";

    return (
        <div className="preview-workspace">
            
            <div className="mb-8 flex gap-4 print:!hidden">
                <Link to="/editor" className="preview-btn-back shadow-sm hover:opacity-80">
                    ← Volver al Editor
                </Link>
                <button 
                    onClick={handlePrint} 
                    className="px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
                >
                    Descargar PDF
                </button>
            </div>

            <div className="cv-paper">
                
                <aside 
                    className="w-1/3 bg-slate-800 text-white p-8 flex flex-col print:bg-slate-800 print:text-white" 
                    style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                >
                    <div className="w-32 h-32 mx-auto rounded-full bg-slate-600 border-4 border-slate-700 overflow-hidden mb-6 flex items-center justify-center flex-shrink-0">
                        {imagen ? (
                            <img src={imagen} alt="Perfil" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-3xl font-bold text-slate-400">{nombre.charAt(0)}</span>
                        )}
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xs tracking-widest uppercase font-bold text-slate-400 mb-4 border-b border-slate-600 pb-1">Contacto</h2>
                        <ul className="text-xs space-y-3 break-words opacity-90">
                            {personal.email && <li><span className="font-semibold block text-slate-300">Email</span>{personal.email}</li>}
                            {personal.telefono && <li><span className="font-semibold block text-slate-300">Teléfono</span>{personal.telefono}</li>}
                            {personal.ciudad && <li><span className="font-semibold block text-slate-300">Ubicación</span>{personal.ciudad}</li>}
                        </ul>
                    </div>

                    {(personal.github || personal.linkedin || personal.portafolio) && (
                        <div className="mb-8">
                            <h2 className="text-xs tracking-widest uppercase font-bold text-slate-400 mb-4 border-b border-slate-600 pb-1">Enlaces</h2>
                            <ul className="text-xs space-y-3 break-words opacity-90">
                                {personal.github && <li><span className="font-semibold block text-slate-300">GitHub</span><a href={personal.github} target="_blank" rel="noreferrer" className="hover:underline">{personal.github.replace('https://', '')}</a></li>}
                                {personal.linkedin && <li><span className="font-semibold block text-slate-300">LinkedIn</span><a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline">{personal.linkedin.replace('https://', '')}</a></li>}
                                {personal.portafolio && <li><span className="font-semibold block text-slate-300">Portafolio</span><a href={personal.portafolio} target="_blank" rel="noreferrer" className="hover:underline">{personal.portafolio.replace('https://', '')}</a></li>}
                            </ul>
                        </div>
                    )}

                    {habilidades && habilidades.length > 0 && (
                        <div>
                            <h2 className="text-xs tracking-widest uppercase font-bold text-slate-400 mb-4 border-b border-slate-600 pb-1">Habilidades</h2>
                            <div className="flex flex-wrap gap-1.5">
                                {habilidades.map((hab) => (
                                    <span key={hab.id} className="bg-slate-700/60 text-[11px] px-2 py-1 rounded font-medium">
                                        {hab.nombre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>

                <main className="w-2/3 p-8 bg-white">
                    
                    <header className="mb-8">
                        <h1 className="text-4xl font-extrabold text-slate-900 uppercase tracking-tight leading-none mb-1">
                            {nombre}
                        </h1>
                        <h2 className="text-lg font-medium text-blue-600">
                            {carrera}
                        </h2>
                        {personal.descripcion && (
                            <p className="mt-4 text-xs text-slate-600 leading-relaxed text-justify">
                                {personal.descripcion}
                            </p>
                        )}
                    </header>

                    {experiencias && experiencias.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-100 pb-1">
                                <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                                Experiencia Laboral
                            </h3>
                            <div className="space-y-4">
                                {experiencias.map(exp => (
                                    <div key={exp.id} className="relative pl-4 border-l border-slate-200">
                                        <div className="absolute w-1.5 h-1.5 bg-blue-600 rounded-full -left-[3.5px] top-1.5"></div>
                                        <h4 className="text-xs font-bold text-slate-800">{exp.puesto}</h4>
                                        <div className="text-[11px] text-blue-600 font-medium mb-1">
                                            {exp.empresa} <span className="text-slate-400">| {exp.fechaInicio} - {exp.presente ? 'Presente' : exp.fechaFin}</span>
                                        </div>
                                        {exp.descripcion && <p className="text-[11px] text-slate-500 whitespace-pre-line leading-relaxed">{exp.descripcion}</p>}
                                    </div>
                                ))}
                             </div>
                        </section>
                    )}

                    {proyectos && proyectos.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-100 pb-1">
                                <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                                Proyectos de Desarrollo
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {proyectos.map(proj => (
                                    <div key={proj.id} className="border border-slate-100 p-3 rounded bg-slate-50/50">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-xs font-bold text-slate-800">{proj.nombre}</h4>
                                            <span className="text-[10px] text-slate-400 font-medium">{proj.fechaInicio}</span>
                                        </div>
                                        {proj.descripcion && <p className="text-[11px] text-slate-500 mb-1.5 leading-relaxed">{proj.descripcion}</p>}
                                        {proj.tecnologias && (
                                            <p className="text-[10px] font-mono font-semibold text-blue-600">{proj.tecnologias}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {educaciones && educaciones.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-100 pb-1">
                                <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                                Formación Académica
                            </h3>
                            <div className="space-y-3">
                                {educaciones.map(edu => (
                                    <div key={edu.id} className="text-xs">
                                        <h4 className="font-bold text-slate-800">{edu.titulo} {edu.carrera && `en ${edu.carrera}`}</h4>
                                        <p className="text-[11px] text-slate-600">{edu.institucion}</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">{edu.fechaInicio} {edu.fechaFin && `- ${edu.fechaFin}`} ({edu.estado})</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </main>
            </div>
        </div>
    );
}

export default Preview;