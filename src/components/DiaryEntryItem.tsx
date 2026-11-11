import { useState } from "react";
import type { DiaryEntry } from "../types/diary";

type DiaryEntryItemProps = {
    entry: DiaryEntry;
    onDelete: (id: string) => void;
    onUpdate: (id: string, grams: number) => void;
};

function DiaryEntryItem({
    entry,
    onDelete,
    onUpdate,
}: DiaryEntryItemProps){
    const [isEditing, setIsEditing] = useState(false);
    const [editGrams, setEditGrams] = useState(String(entry.grams));

    const gramsNumber = Number(editGrams);

    const isValid = 
        editGrams.trim() !== "" && Number.isFinite(gramsNumber) && gramsNumber > 0;

    const calories = Math.round(entry.food.calories * (entry.grams / 100));

    function handleStartEdit(){
        setEditGrams(String(entry.grams));
        setIsEditing(true);
    }

    function handleSaveEdit(){
        if(!isValid){
            return;
        }

        onUpdate(entry.id, gramsNumber);
        setIsEditing(false);
    }

    function handleCancelEdit(){
        setIsEditing(false);
    }


    return (
        <li className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            {isEditing ? (
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end">

                <div className="flex-1">
                <label
                    htmlFor={`edit-${entry.id}`}
                    className="mb-2 block text-sm font-medium"
                >
                    Izmeni količinu: {entry.food.name}
                </label>

                <input
                    id={`edit-${entry.id}`}
                    type="number"
                    min="0"
                    step="any"
                    value={editGrams}
                    onChange={(event) =>
                    setEditGrams(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white p-3"
                />

                <p className="mt-2 text-sm text-gray-500">
                    {isValid
                    ? `Nova vrednost: ${Math.round(
                        entry.food.calories * (gramsNumber / 100)
                        )} kcal`
                    : "Unesi ispravnu količinu."}
                </p>
                </div>

                <div className="flex gap-2">
                <button
                    type="button"
                    onClick={handleSaveEdit}
                    disabled={!isValid}
                    className="cursor-pointer rounded-xl bg-[#169b74] px-4 py-3 text-white hover:bg-[#128563] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Sačuvaj
                </button>

                <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-3 hover:bg-gray-100"
                >
                    Otkaži
                </button>
                </div>
            </div>
            ) : (
            <>
                <div>
                <p className="font-medium">
                    {entry.food.name}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                    {entry.grams} g
                </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                <span className="font-semibold">
                    {calories} kcal
                </span>

                <button
                    type="button"
                    onClick={handleStartEdit}
                    className="cursor-pointer rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
                >
                    Izmeni
                </button>

                <button
                    type="button"
                    onClick={() => onDelete(entry.id)}
                    className="cursor-pointer rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                >
                    Obriši
                </button>
                </div>
            </>
            )}
        </li>
    );

}

export default DiaryEntryItem;