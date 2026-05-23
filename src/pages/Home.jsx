import {
    FileText,
    Eye,
    Download,
    LayoutDashboard
} from "lucide-react";

function Home() {

    return (

        <div className="min-h-screen px-8 py-20 space-y-32">

            {/* HERO */}
            <section className="text-center space-y-10">
                <h1 className="text-7xl font-bold">
                    DevProfile
                </h1>

                <p className="text-2xl opacity-80 leading-[45px] max-w-5xl mx-auto">
                    DevProfile es una aplicación web desarrollada con React
                    que permite crear currículums profesionales de manera
                    dinámica mediante formularios interactivos, administración
                    de habilidades, proyectos y experiencia profesional.
                </p>

                <p className="text-2xl opacity-80 leading-[45px] max-w-5xl mx-auto">
                    La plataforma permite visualizar el CV en tiempo real,
                    gestionar información personal, generar estadísticas
                    de habilidades y exportar el currículum en formato PDF
                    con un diseño limpio, profesional y completamente funcional.
                </p>
            </section>

            {/* CARDS */}
            <section className="grid md:grid-cols-2 gap-12">
                <div className="rounded-3xl p-12 shadow-xl border w-full space-y-6">
                    <FileText size={65} className="mx-auto" />
                    <h2 className="text-3xl font-bold text-center">Editor</h2>
                    <p className="leading-8 opacity-80 text-lg text-center">
                        Captura, administra y actualiza toda tu
                        información profesional mediante formularios
                        dinámicos e interactivos.
                    </p>
                </div>

                <div className="rounded-3xl p-12 shadow-xl border w-full space-y-6">
                    <Eye size={65} className="mx-auto" />
                    <h2 className="text-3xl font-bold text-center">Preview</h2>
                    <p className="leading-8 opacity-80 text-lg text-center">
                        Visualiza en tiempo real cómo se verá tu
                        currículum antes de exportarlo a PDF.
                    </p>
                </div>

                <div className="rounded-3xl p-12 shadow-xl border w-full space-y-6">
                    <Download size={65} className="mx-auto" />
                    <h2 className="text-3xl font-bold text-center">PDF</h2>
                    <p className="leading-8 opacity-80 text-lg text-center">
                        Exporta tu CV en formato PDF con un diseño
                        profesional, limpio y organizado.
                    </p>
                </div>

                <div className="rounded-3xl p-12 shadow-xl border w-full space-y-6">
                    <LayoutDashboard size={65} className="mx-auto" />
                    <h2 className="text-3xl font-bold text-center">Dashboard</h2>
                    <p className="leading-8 opacity-80 text-lg text-center">
                        Analiza habilidades y estadísticas dinámicas
                        generadas automáticamente por la aplicación.
                    </p>
                </div>
            </section>

            {/* EXTRA INFO */}
            <section className="space-y-20">
                <h2 className="text-5xl font-bold text-center">
                    ¿Qué puedes hacer en DevProfile?
                </h2>

                <div className="grid md:grid-cols-2 gap-16">
                    <div className="rounded-3xl p-14 border shadow-xl space-y-6">
                        <h3 className="text-3xl font-semibold">
                            Administración Completa
                        </h3>
                        <p className="leading-9 opacity-80 text-lg">
                            Agrega, modifica y elimina información personal,
                            habilidades, proyectos, certificaciones, idiomas
                            y experiencia profesional mediante formularios
                            dinámicos, organizados y completamente validados.
                        </p>
                    </div>

                    <div className="rounded-3xl p-14 border shadow-xl space-y-6">
                        <h3 className="text-3xl font-semibold">
                            Exportación Profesional
                        </h3>
                        <p className="leading-9 opacity-80 text-lg">
                            Genera un currículum profesional en PDF
                            completamente estructurado, listo para compartir
                            en procesos académicos o laborales.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Home;
