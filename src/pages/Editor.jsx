import FormStepper from "../components/FormStepper";
import PersonalForm from "../components/PersonalForm";
import SkillForm from "../components/SkillForm";
import ProjectForm from "../components/ProjectForm";
import EducationForm from "../components/EducationForm";
import ExtraInfoForm from "../components/ExtraInfoForm";
import { useFormStepper } from "../hooks/useFormStepper";

function Editor() {
    const steps = [
        "Datos Personales",
        "Habilidades",
        "Proyectos",
        "Educación",
        "Experiencia"
    ];

    const totalSteps = steps.length;

    const { actual, siguiente, anterior } = useFormStepper(totalSteps);

    return (
        <div className="editor-container flex h-[calc(100vh-4.5rem)]">

            <FormStepper actual={actual} totalSteps={totalSteps} steps={steps} />

            <div className="flex flex-col flex-auto">

                <div className="form-content flex-initial bg-blue-500">
                    {actual === 1 && <PersonalForm />}
                    {actual === 2 && <SkillForm />}
                    {actual === 3 && <ProjectForm />}
                    {actual === 4 && <EducationForm />}
                    {actual === 5 && <ExtraInfoForm />}
                </div>

                <div className="form-navigation p-4 flex justify-between items-center">
                    <button
                        onClick={anterior}
                        disabled={actual === 1}
                        className="btn-prev bg-red-500"
                    >
                        Anterior
                    </button>

                    <button
                        onClick={siguiente}
                        disabled={actual === totalSteps}
                        className="btn-next bg-blue-500"
                    >
                        Siguiente
                    </button>
                </div>

            </div>

        </div>
    );
}

export default Editor;