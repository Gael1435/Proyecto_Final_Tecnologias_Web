import React from 'react';

function SkillChart({ totalHabilidades, habilidadesTecnicas, pctTecnicas, habilidadesBlandas, pctBlandas }) {
    return (
        <div className="lg:col-span-2 dashboard-card flex flex-col sm:flex-row items-center justify-around gap-6">
            <div className="space-y-2 text-center sm:text-left">
                <h2 className="text-lg font-bold">Balance de Competencias</h2>
                <p className="text-xs opacity-60 max-w-xs">Ratio porcentual entre competencias técnicas duras frente a habilidades blandas.</p>
                
                {/* Leyendas */}
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
    );
}

export default SkillChart;