type CalorieSummaryProps = {
    target: number;
    consumed: number;
};

function CalorieSummary({
    target,
    consumed,
}: CalorieSummaryProps) {
    const remaining = target - consumed;

    const percentage = target > 0 ? Math.round((consumed / target) * 100) : 0;

    const progress = Math.min(Math.max(percentage, 0), 100);

    return(
        <section className="h-full rounded-3xl bg-[#124638] p-6 text-white shadow-lg sm:p-8">
            <p className="text-sm text-white/70">
                Uneto kalorija
            </p>
    
            <div className="mt-4 flex items-baseline gap-3">
                <span className="text-5xl font-bold">
                    {consumed}
                </span>

                <span className="text-white/70">
                    / {target} kcal
                </span>
            </div>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/20">
                <div className="h-full rounded-full bg-[#70e0b0]" style={{ width: `${progress}%` }}/>
             </div>

            <div className="mt-4 flex justify-between text-sm">
                <span>Preostalo: {remaining} kcal</span>
                <span>{percentage}% ostvareno</span>
            </div>
           
        </section>
        
    );
}

export default CalorieSummary;