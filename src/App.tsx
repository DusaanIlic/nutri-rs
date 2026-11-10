import CalorieSummary from "./components/CalorieSummary";
import FoodCalculator from "./components/FoodCalculator";
import MacroProgress from "./components/MacroProgress";
import { useState } from "react";
import type { Food } from "./data/foods";
import type { Meal } from "./data/meals";
import { mealOptions } from "./data/meals";


type DiaryEntry = {
  id: string;
  food: Food;
  grams: number;
  meal: Meal;
};

function App(){
  const dailyCalories = 2100;
  const [diary, setDiary] = useState<DiaryEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editGrams, setEditGrams] = useState<string>("");

  const isEditGramsValid = 
    editGrams.trim() !== "" && Number.isFinite(Number(editGrams)) && Number(editGrams) > 0;


  function handleAddFood(food: Food, grams: number, meal: Meal){
    const newEntry: DiaryEntry = {
      id: crypto.randomUUID(),
      food: food,
      grams: grams,
      meal: meal
    };

    setDiary((previous) => [...previous, newEntry]);
  }

  function handleDeleteFood(id: string){
    setDiary((previous) =>
      previous.filter((entry) => entry.id !== id)
    );
  }

  function handleDeleteAllFood(){
    setDiary([]);
  }

  function handleStartEdit(entry: DiaryEntry){
    setEditingId(entry.id);
    setEditGrams(String(entry.grams));
  }

  function handleSaveEdit(){
    if (editingId === null || !isEditGramsValid){
      return;
    }

    setDiary((previous) => 
      previous.map((entry) =>
        entry.id === editingId ? {...entry, grams: Number(editGrams)} : entry
      )
    );

    setEditingId(null);
  }

  function handleCancelEdit(){
    setEditingId(null);
  }


  const totals = diary.reduce(
    (total, entry) =>  {
      const ratio = entry.grams / 100;

      return{
        calories:
          total.calories + entry.food.calories * ratio,

        protein:
          total.protein + entry.food.protein * ratio,

        carbs:
          total.carbs + entry.food.carbs * ratio,

        fat:
          total.fat + entry.food.fat * ratio,
      };
    },
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    }
  );

  return(
    <main className="min-h-screen bg-[#f7faf8] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-4xl">

        <p className="text-sm font-bold text-[#169b74]">
          NUTRIRS
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Jedan dan bliže cilju.
        </h1>

        <p className="mt-2 text-gray-500">
          Prati svoju ishranu i dnevni napredak.
        </p>

        <CalorieSummary
          target={dailyCalories}
          consumed={Math.round(totals.calories)}
        />

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">
            Makronutrijenti
          </h2>

          <div className="mt-6 space-y-6">
            <MacroProgress 
              label="Proteini"
              consumed={Number(totals.protein.toFixed(1))}
              target={140}
              color="#159d82"
            />

            <MacroProgress 
              label="Ugljeni hidrati"
              consumed={Number(totals.carbs.toFixed(1))}
              target={250}
              color="#e6a75c"
            />

            <MacroProgress 
              label="Masti"
              consumed={Number(totals.fat.toFixed(1))}
              target={70}
              color="#9674d1"
            />
          </div>

        </section>

        <FoodCalculator onAddFood={handleAddFood}/>

        
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">
            Dnevnik ishrane
          </h2>
          <p>
            Ukupno unosa: {diary.length}
          </p>

          
          {diary.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500">
              Još nisi dodao nijednu namirnicu.
            </p>
          ) : (
            <div className="mt-6 space-y-6">
              {mealOptions.map((meal) => {
                const mealEntries = diary.filter(
                  (entry) => entry.meal === meal.id
                );

                if (mealEntries.length === 0) {
                  return null;
                }

                const mealCalories = mealEntries.reduce(
                  (total, entry) =>
                    total +
                    entry.food.calories * (entry.grams / 100),
                  0
                );

                return (
                  <section
                    key={meal.id}
                    className="rounded-2xl border border-gray-100 p-4"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {meal.label}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Broj unosa: {mealEntries.length}
                        </p>
                      </div>

                      <span className="font-semibold text-[#169b74]">
                        {Math.round(mealCalories)} kcal
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {mealEntries.map((entry) => (
                        <li
                          key={entry.id}
                          className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          {editingId === entry.id ? (
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
                                  {isEditGramsValid ? (
                                    <>
                                      Nova vrednost:{" "}
                                      {Math.round(
                                        entry.food.calories *
                                          (Number(editGrams) / 100)
                                      )} kcal
                                    </>
                                  ) : (
                                    "Unesi ispravnu količinu."
                                  )}
                                </p>
                              </div>

                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={handleSaveEdit}
                                  disabled={!isEditGramsValid}
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

                              <div className="flex items-center gap-3">
                                <span className="font-semibold">
                                  {Math.round(
                                    entry.food.calories *
                                      (entry.grams / 100)
                                  )} kcal
                                </span>

                                <button
                                  type="button"
                                  onClick={() => handleStartEdit(entry)}
                                  className="cursor-pointer rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
                                >
                                  Izmeni
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteFood(entry.id)}
                                  className="cursor-pointer rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                                >
                                  Obriši
                                </button>
                              </div>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          )}


          
          {diary.length > 0 && (
            <button
              type="button"
              onClick={handleDeleteAllFood}
              className="mt-4 cursor-pointer rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              Obriši sve
            </button>
          )}
        </section>

      </div>
    </main>
  );
}

export default App;