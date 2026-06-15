import React from 'react';

function ProjectCard({ project }) {
    return (
        <div className="border border-slate-100 p-3 rounded bg-slate-50/50">
            <div className="flex justify-between items-start mb-1">
                <h4 className="text-xs font-bold text-slate-800">{project.nombre}</h4>
                <span className="text-[10px] text-slate-400 font-medium">{project.fechaInicio}</span>
            </div>
            {project.descripcion && (
                <p className="text-[11px] text-slate-500 mb-1.5 leading-relaxed">
                    {project.descripcion}
                </p>
            )}
            {project.tecnologias && (
                <p className="text-[10px] font-mono font-semibold text-blue-600">
                    {project.tecnologias}
                </p>
            )}
        </div>
    );
}

export default ProjectCard;