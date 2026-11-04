type MacroProgressProps = {
    label: string;
    consumed: number;
    target: number;
    color: string;
};

function MacroProgress({
    label,
    consumed,
    target,
    color,
}: MacroProgressProps) {
    const percentage = target > 0 ? Math.round((consumed / target) * 100) : 0;

    const progress = Math.min(Math.max(percentage, 0), 100);

    return (
        <div>
            <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium">
                    {label}
                </span>

                <span className="text-gray-500">
                    {consumed} / {target} g
                </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full transition-all"
                    style={{width: `${progress}%`, backgroundColor: color,}}/>
                
            </div>
            <span>
                {percentage}% ostvareno
            </span>
        </div>
    );
}

export default MacroProgress;