import CalorieSummary from "./components/CalorieSummary";
import FoodCalculator from "./components/FoodCalculator";
import MacroProgress from "./components/MacroProgress";
import { useState } from "react";
import type { Food } from "./data/foods";

type DiaryEntry = {
  id: string;
  food: Food;
  grams: number;
};

function App(){
  const dailyCalories = 2100;
  const [diary, setDiary] = useState<DiaryEntry[]>([]);

  function handleAddFood(food: Food, grams: number){
    const newEntry: DiaryEntry = {
      id: crypto.randomUUID(),
      food: food,
      grams: grams,
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
            <ul className="mt-6 space-y-3">
              {diary.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
                >
                  <div>
                    <p className="font-medium">
                      {entry.food.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {entry.grams} g
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                      <span className="font-semibold">
                        {Math.round(
                          entry.food.calories * (entry.grams / 100)
                        )} kcal
                      </span>

                      <button 
                        type="button"
                        onClick={() => handleDeleteFood(entry.id)}
                        aria-label={`Obriši ${entry.food.name}`}
                        className="cursor-pointer rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100">
                        Obriši
                      </button>
                  </div>
                  
                </li>
              ))}
            </ul>
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