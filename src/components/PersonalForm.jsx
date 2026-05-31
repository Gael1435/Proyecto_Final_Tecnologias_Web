function PersonalForm() {
    return (
        <div className="p-4 bg-red-500">
            <h1 className="mb-4">Formulario Personal</h1>

            <form className="flex flex-col gap-4 p-4 ">


                <div className="Nombre flex">

                    <div className="flex flex-column">
                        <label htmlFor="Nombre">Nombre(s)</label>
                        <input id="Nombre" type="text" placeholder="ej. Lucifer" />
                    </div>

                    <div className="campo">
                        <label htmlFor="ApellidoP">Apellido Paterno</label>
                        <input id="ApellidoP" type="text" placeholder="ej. Beltran" />
                    </div>

                    <div className="campo">
                        <label htmlFor="ApellidoM">Apellido Materno</label>
                        <input id="ApellidoM" type="text" placeholder="ej. Martinez" />
                    </div>
                    
                </div>

                <input type="text" placeholder="Carrera" />
                <input type="text" placeholder="Ciudad" />
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Número" />
                <textarea placeholder="Perfil profesional"></textarea>
            </form>
        </div>
    );
}

export default PersonalForm;