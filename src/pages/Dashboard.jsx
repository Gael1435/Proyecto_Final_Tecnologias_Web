import { useLocalStorage } from '../hooks/useLocalStorage';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [personal] = useLocalStorage('cv_personal', {});
    const [experiencias] = useLocalStorage('cv_experiencias', []);
    const [educaciones] = useLocalStorage('cv_educacion', []);
    const [proyectos] = useLocalStorage('cv_proyectos', []);
    const [habilidades] = useLocalStorage('cv_habilidades', []);

    const totalHabilidades = habilidades.length;
    const totalProyectos = proyectos.length;
    const totalExperiencias = experiencias.length;
    const totalEducaciones = educaciones.length;

    const habilidadesBlandas = habilidades.filter(h => h.categoria === 'Habilidades blandas').length;
    const habilidadesTecnicas = totalHabilidades - habilidadesBlandas;

    const pctTecnicas = totalHabilidades > 0 ? Math.round((habilidadesTecnicas / totalHabilidades) * 100) : 0;
    const pctBlandas = totalHabilidades > 0 ? Math.round((habilidadesBlandas / totalHabilidades) * 100) : 0;

    if (totalHabilidades === 0 && !personal.nombre) {
        return (
            <div className="dashboard-container flex flex-col items-center justify-center text-center">
                <div className="dashboard-card max-w-md">
                    <h2 className="text-2xl font-bold mb-3">Sin datos para resumir</h2>
                    <p className="text-sm opacity-70 mb-6">
                        Por favor, ingresa información en el editor para activar el resumen ejecutivo y las gráficas analíticas.
                    </p>
                    <Link to="/editor" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                        Ir al Editor
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            
            <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="dashboard-title">Resumen de Perfil</h1>
                    <p className="dashboard-subtitle">Métricas de balance de competencias e inventario general.</p>
                </div>
                <Link to="/preview" className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-md transition">
                    Ver CV Final →
                </Link>
            </header>

            <section className="dashboard-card mb-8">
                <h2 className="dashboard-section-title">Información General</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-xl font-bold">{personal.nombre || "Tu Nombre"}</h3>
                        <p className="text-sm text-blue-500 font-medium mt-1">{personal.carrera || "Tu Profesión / Cargo"}</p>
                        <p className="text-xs opacity-70 mt-3 leading-relaxed">
                            {personal.descripcion || "Sin descripción profesional registrada."}
                        </p>
                    </div>
                    <div className="space-y-2 text-xs opacity-80 md:pl-6">
                        <p><span className="font-bold block">Ubicación:</span> {personal.ciudad || '-'}</p>
                        <p><span className="font-bold block">Email:</span> {personal.email || '-'}</p>
                        <p><span className="font-bold block">Teléfono:</span> {personal.telefono || '-'}</p>
                    </div>
                    <div className="space-y-2 text-xs opacity-80">
                        <p><span className="font-bold block">GitHub:</span> {personal.github ? 'Vinculado' : 'No provisto'}</p>
                        <p><span className="font-bold block">LinkedIn:</span> {personal.linkedin ? 'Vinculado' : 'No provisto'}</p>
                        <p><span className="font-bold block">Portafolio:</span> {personal.portafolio ? 'Vinculado' : 'No provisto'}</p>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="dashboard-card flex flex-col justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider opacity-60">Skills</span>
                        <h4 className="text-4xl font-black mt-2">{totalHabilidades}</h4>
                    </div>
                    <div className="dashboard-card flex flex-col justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider opacity-60">Proyectos</span>
                        <h4 className="text-4xl font-black text-blue-500 mt-2">{totalProyectos}</h4>
                    </div>
                    <div className="dashboard-card flex flex-col justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider opacity-60">Experiencias</span>
                        <h4 className="text-4xl font-black text-purple-500 mt-2">{totalExperiencias}</h4>
                    </div>
                    <div className="dashboard-card flex flex-col justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider opacity-60">Educación</span>
                        <h4 className="text-4xl font-black text-emerald-500 mt-2">{totalEducaciones}</h4>
                    </div>
                </div>

                <div className="lg:col-span-2 dashboard-card flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="space-y-2 text-center sm:text-left">
                        <h2 className="text-lg font-bold">Balance de Competencias</h2>
                        <p className="text-xs opacity-60 max-w-xs">Ratio porcentual entre competencias técnicas duras frente a habilidades blandas.</p>
                        
                        <div className="pt-4 space-y-2 text-xs">
                            <div className="flex items-center gap-3 justify-center sm:justify-start">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                <span className="opacity-80">Técnicas / Hard Skills:</span>
                                <span className="font-bold">{habilidadesTecnicas} ({pctTecnicas}%)</span>
                            </div>
                            <div className="flex items-center gap-3 justify-center sm:justify-start">
                                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                                <span className="opacity-80">Blandas / Soft Skills:</span>
                                <span className="font-bold">{habilidadesBlandas} ({pctBlandas}%)</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-center flex-shrink-0">
                        {totalHabilidades > 0 ? (
                            <div 
                                className="w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 shadow-md"
                                style={{
                                    background: `conic-gradient(#3b82f6 0% ${pctTecnicas}%, #f43f5e ${pctTecnicas}% 100%)`
                                }}
                            >
                                <div className="dashboard-donut-inner">
                                    <span className="text-2xl font-black">{totalHabilidades}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-40">Totales</span>
                                </div>
                            </div>
                        ) : (
                            <div className="w-40 h-40 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-xs opacity-50">
                                Sin habilidades
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="dashboard-card">
                    <h3 className="dashboard-section-title">Proyectos Destacados</h3>
                    {proyectos.length === 0 ? (
                        <p className="text-xs opacity-50 italic">No hay proyectos añadidos.</p>
                    ) : (
                        <ul className="space-y-3 divide-y divide-gray-200 dark:divide-gray-800">
                            {proyectos.slice(0, 3).map((p, idx) => (
                                <li key={p.id} className={`text-xs ${idx > 0 ? 'pt-2.5' : ''}`}>
                                    <div className="flex justify-between font-bold">
                                        <span>{p.nombre}</span>
                                        <span className="text-blue-500 font-mono text-[10px]">{p.tecnologias?.split(',')[0]}</span>
                                    </div>
                                    <p className="opacity-60 mt-1 truncate">{p.descripcion}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="dashboard-card">
                    <h3 className="dashboard-section-title">Experiencia Laboral</h3>
                    {experiencias.length === 0 ? (
                        <p className="text-xs opacity-50 italic">No hay experiencias laborales añadidas.</p>
                    ) : (
                        <ul className="space-y-3 divide-y divide-gray-200 dark:divide-gray-800">
                            {experiencias.slice(0, 3).map((e, idx) => (
                                <li key={e.id} className={`text-xs ${idx > 0 ? 'pt-2.5' : ''}`}>
                                    <div className="flex justify-between font-bold">
                                        <span>{e.puesto}</span>
                                        <span className="opacity-40">{e.fechaInicio}</span>
                                    </div>
                                    <p className="opacity-60 mt-0.5">{e.empresa} — <span className="italic">{e.tipo}</span></p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>

        </div>
    );
}

export default Dashboard;