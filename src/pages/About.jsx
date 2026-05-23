function About() {

    return (

        <div className="min-h-screen px-8 py-16 max-w-6xl mx-auto space-y-20">

            {/* Título principal */}
            <section className="text-center space-y-6">
                <h1 className="text-5xl font-bold">
                    About DevProfile
                </h1>

                <p className="text-lg leading-8 max-w-4xl mx-auto opacity-80">
                    DevProfile es una aplicación desarrollada con React
                    que permite crear currículums profesionales de manera
                    dinámica mediante formularios, visualización web
                    y exportación PDF.
                </p>
            </section>

            {/* Tecnologías y Objetivo */}
            <section className="grid md:grid-cols-2 gap-12">
                <div className="border rounded-2xl p-8 shadow-lg space-y-4">
                    <h2 className="text-2xl font-bold">Tecnologías</h2>
                    <ul className="space-y-2 text-lg opacity-90">
                        <li>React</li>
                        <li>Tailwind CSS</li>
                        <li>React Router</li>
                        <li>jsPDF</li>
                        <li>Recharts</li>
                    </ul>
                </div>

                <div className="border rounded-2xl p-8 shadow-lg space-y-4">
                    <h2 className="text-2xl font-bold">Objetivo</h2>
                    <p className="text-lg leading-8 opacity-90">
                        Facilitar la generación de CVs modernos,
                        editables y exportables mediante tecnologías web.
                    </p>
                </div>
            </section>

            {/* Integrantes */}
            <section className="space-y-12">
                <h2 className="text-4xl font-bold text-center">Integrantes</h2>

                <div className="grid md:grid-cols-3 gap-10">

                    <div className="border rounded-2xl p-8 shadow-lg space-y-4">
                        <h3 className="text-2xl font-semibold">Brandon Javier Becerra Dávila</h3>
                        <p className="text-lg opacity-80 leading-7">
                            Desarrollador enfocado en la arquitectura backend.
                            Apasionado por optimizar bases de datos y crear APIs
                            robustas que conecten de manera eficiente el frontend
                            con los servicios en la nube.
                        </p>
                    </div>

                    <div className="border rounded-2xl p-8 shadow-lg space-y-4">
                        <h3 className="text-2xl font-semibold">Francisco Javier Sánchez Vallín</h3>
                        <p className="text-lg opacity-80 leading-7">
                            Especialista en diseño de interfaces y experiencia de usuario.
                            Su objetivo es lograr que cada aplicación sea intuitiva,
                            atractiva y accesible para todos los usuarios.
                        </p>
                    </div>

                    <div className="border rounded-2xl p-8 shadow-lg space-y-4">
                        <h3 className="text-2xl font-semibold">Gael Emiliano Nafarrate López</h3>
                        <p className="text-lg opacity-80 leading-7">
                            Integrador full-stack con enfoque en despliegue en la nube.
                            Le apasiona la automatización de procesos y la implementación
                            de flujos CI/CD para proyectos escalables y modernos.
                        </p>
                    </div>

                </div>
            </section>

        </div>

    );
}

export default About;
