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
        <div className="min-h-screen bg-slate-100 py-10 flex flex-col items-center print:block print:p-0 print:m-0 bg-transparent dark:bg-slate-900 print:dark:bg-white">
            
            <div className="mb-6 flex gap-4 print:hidden">
                <Link to="/editor" className="px-4 py-2 bg-slate-600 text-white rounded shadow hover:bg-slate-700 transition">
                    ← Volver al Editor
                </Link>
                <button onClick={handlePrint} className="px-4 py-2 bg-blue-600 text-white font-bold rounded shadow hover:bg-blue-700 transition">
                    Descargar PDF
                </button>
            </div>

            <div className="w-[210mm] min-h-[297mm] bg-white text-slate-800 shadow-2xl print:shadow-none flex flex-row overflow-hidden print:w-[210mm] print:h-[297mm] print:max-h-[297mm] print:overflow-hidden">
                
                <aside className="w-1/3 bg-slate-800 text-white p-8 flex flex-col print:bg-slate-800 print:text-white" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                    
                    <div className="w-32 h-32 mx-auto rounded-full bg-slate-600 border-4 border-slate-700 overflow-hidden mb-6 flex items-center justify-center">
                        {imagen ? (
                            <img src={imagen} alt="Perfil" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-3xl font-bold text-slate-400">{nombre.charAt(0)}</span>
                        )}
                    </div>

                    <div className="mb-8">
                        <h2 className="text-sm tracking-widest uppercase font-bold text-slate-400 mb-4 border-b border-slate-600 pb-1">Contacto</h2>
                        <ul className="text-sm space-y-3 break-words">
                            {personal.email && <li><span className="font-semibold block text-slate-300">Email</span>{personal.email}</li>}
                            {personal.telefono && <li><span className="font-semibold block text-slate-300">Teléfono</span>{personal.telefono}</li>}
                            {personal.ciudad && <li><span className="font-semibold block text-slate-300">Ubicación</span>{personal.ciudad}</li>}
                        </ul>
                    </div>

                    {(personal.github || personal.linkedin || personal.portafolio) && (
                        <div className="mb-8">
                            <h2 className="text-sm tracking-widest uppercase font-bold text-slate-400 mb-4 border-b border-slate-600 pb-1">Enlaces</h2>
                            <ul className="text-sm space-y-3 break-words">
                                {personal.github && <li><span className="font-semibold block text-slate-300">GitHub</span><a href={personal.github}>{personal.github.replace('https://', '')}</a></li>}
                                {personal.linkedin && <li><span className="font-semibold block text-slate-300">LinkedIn</span><a href={personal.linkedin}>{personal.linkedin.replace('https://', '')}</a></li>}
                                {personal.portafolio && <li><span className="font-semibold block text-slate-300">Portafolio</span><a href={personal.portafolio}>{personal.portafolio.replace('https://', '')}</a></li>}
                            </ul>
                        </div>
                    )}

                    {habilidades && habilidades.length > 0 && (
                        <div>
                            <h2 className="text-sm tracking-widest uppercase font-bold text-slate-400 mb-4 border-b border-slate-600 pb-1">Habilidades</h2>
                            <div className="flex flex-wrap gap-2">
                                {habilidades.map((hab) => (
                                    <span key={hab.id} className="bg-slate-700 text-xs px-2 py-1 rounded">
                                        {hab.nombre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>

                <main className="w-2/3 p-8">
                    
                    <header className="mb-8">
                        <h1 className="text-4xl font-extrabold text-slate-900 uppercase tracking-tight leading-none mb-2">
                            {nombre}
                        </h1>
                        <h2 className="text-xl font-medium text-blue-600">
                            {carrera}
                        </h2>
                        {personal.descripcion && (
                            <p className="mt-4 text-sm text-slate-600 leading-relaxed text-justify">
                                {personal.descripcion}
                            </p>
                        )}
                    </header>

                    {experiencias && experiencias.length > 0 && (
                        <section className="mb-8">
                            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="w-5 h-5 bg-blue-600 rounded-full inline-block"></span>
                                Experiencia
                            </h3>
                            <div className="space-y-5">
                                {experiencias.map(exp => (
                                    <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                                        <div className="absolute w-2 h-2 bg-blue-600 rounded-full -left-[5px] top-1.5"></div>
                                        <h4 className="font-bold text-slate-800">{exp.puesto}</h4>
                                        <div className="text-sm text-blue-600 font-medium mb-1">
                                            {exp.empresa} <span className="text-slate-400">| {exp.fechaInicio} - {exp.presente ? 'Presente' : exp.fechaFin}</span>
                                        </div>
                                        {exp.descripcion && <p className="text-sm text-slate-600 whitespace-pre-line">{exp.descripcion}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {proyectos && proyectos.length > 0 && (
                        <section className="mb-8">
                            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="w-5 h-5 bg-blue-600 rounded-full inline-block"></span>
                                Proyectos
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {proyectos.map(proj => (
                                    <div key={proj.id} className="border border-slate-200 p-3 rounded bg-slate-50">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-slate-800">{proj.nombre}</h4>
                                            <span className="text-xs text-slate-500">{proj.fechaInicio}</span>
                                        </div>
                                        {proj.descripcion && <p className="text-sm text-slate-600 mb-2">{proj.descripcion}</p>}
                                        {proj.tecnologias && (
                                            <p className="text-xs font-mono text-blue-600">{proj.tecnologias}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {educaciones && educaciones.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="w-5 h-5 bg-blue-600 rounded-full inline-block"></span>
                                Educación
                            </h3>
                            <div className="space-y-4">
                                {educaciones.map(edu => (
                                    <div key={edu.id}>
                                        <h4 className="font-bold text-slate-800">{edu.titulo} {edu.carrera && `- ${edu.carrera}`}</h4>
                                        <p className="text-sm text-slate-600">{edu.institucion}</p>
                                        <p className="text-xs text-slate-400 mt-1">{edu.fechaInicio} {edu.fechaFin && `- ${edu.fechaFin}`} ({edu.estado})</p>
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