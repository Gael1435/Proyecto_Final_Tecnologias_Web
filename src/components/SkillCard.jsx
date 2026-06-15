import React from 'react';

function SkillCard({ skill }) {
    return (
        <span className="bg-slate-700/60 text-[11px] px-2 py-1 rounded font-medium">
            {skill.nombre}
        </span>
    );
}

export default SkillCard;