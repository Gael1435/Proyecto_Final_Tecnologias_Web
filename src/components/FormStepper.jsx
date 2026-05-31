function FormStepper({ steps }) {
    return (
            <div className="form-content flex-initial bg-blue-500 p-4">
                {steps.map((step, index) => (
                    <div key={index} className="step">
                        <div className="step-label mb-8">{step}</div>
                    </div>
                ))}
            </div>
    );
}

export default FormStepper;
