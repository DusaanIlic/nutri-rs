import { useState } from "react";
import { foods } from "../data/foods";
import type { Food } from "../data/foods";

type FoodCalculatorProps = {
    onAddFood: (food: Food, grams: number) => void;
}

function FoodCalculator({onAddFood, }: FoodCalculatorProps) {
    const [selectedFoodId, setSelectedFoodId] = useState(1);
    const [grams, setGrams] = useState<string>("100");

    const selectedFood = foods.find(
        (food) => food.id === selectedFoodId
    );

    if(!selectedFood){
        return <p>Namirnica nije pronađena.</p>;
    }

    const gramsNumber = Math.max(0, Number(grams) || 0);
    const ratio = gramsNumber / 100;

    const isValidGrams = grams.trim() !== "" &&
        Number.isFinite(Number(grams)) &&
        gramsNumber > 0;

    const calories = Math.round(
        selectedFood.calories * ratio
    );

    const protein = (selectedFood.protein * ratio).toFixed(1);
    const carbs = (selectedFood.carbs * ratio).toFixed(1);
    const fat = (selectedFood.fat * ratio).toFixed(1);

    return(
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold">
                Kalkulator namirnica
            </h2>

            <p className="mt-2 text-sm text-gray-500">
                Izaberi namirnicu i unesi količinu.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="food" className="mb-2 block text-sm font-medium">
                        Namirnica
                    </label>

                    <select id="food" value={selectedFoodId}
                    onChange={(event) => setSelectedFoodId(Number(event.target.value))}
                    className="w-full rounded-xl border border-gray-300 bg-white p-3">
                        {foods.map((food) => (
                            <option key={food.id} value={food.id}>
                                {food.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="grams" className="mb-2 block text-sm font-medium">
                        Količina (g)
                    </label>

                    <input id="grams" type="number" min="0" value={grams}
                    onChange={(event) => setGrams(event.target.value)} 
                    className="w-full rounded-xl border border-gray-300 p-3"/>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">Kalorije</p>
                    <p className="mt-2 text-xl font-bold">{calories} kcal</p>
                </div>
                
                <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">Proteini</p>
                    <p className="mt-2 text-xl font-bold">{protein} g</p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">UH</p>
                    <p className="mt-2 text-xl font-bold">{carbs} g</p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">Masti</p>
                    <p className="mt-2 text-xl font-bold">{fat} g</p>
                </div>
            </div>

            <button type="button" onClick={() => onAddFood(selectedFood, gramsNumber)}
                disabled={!isValidGrams} 
                className="mt-6 w-full cursor-pointer rounded-xl bg-[#169b74] py-5 py-3 font-medium text-white transition-colors hover:bg-[#128563] disabled:cursor-not-allowed disabled:opacity-50">
                + Dodaj u dnevnik
            </button>
        </section>
    );
}

export default FoodCalculator;