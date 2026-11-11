import { useState } from "react";

import CalorieSummary from "./components/CalorieSummary";
import FoodCalculator from "./components/FoodCalculator";
import MacroProgress from "./components/MacroProgress";
import FoodDiary from "./components/FoodDiary";

import type { Food } from "./data/foods";
import type { Meal } from "./data/meals";
import type { DiaryEntry } from "./types/diary";


function App(){
  const dailyCalories = 2100;
  const [diary, setDiary] = useState<DiaryEntry[]>([]);


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

  function handleUpdateFood(id: string, grams: number){
    setDiary((previous) =>
      previous.map((entry) =>
        entry.id === id
          ? {...entry, grams: grams} : entry
      )
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

        <FoodDiary
          entries={diary}
          onDelete={handleDeleteFood}
          onDeleteAll={handleDeleteAllFood}
          onUpdate={handleUpdateFood}
        />
      </div>
    </main>
  );
}

export default App;