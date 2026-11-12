import { useEffect, useState } from "react";
import CalorieSummary from "./components/CalorieSummary";
import FoodCalculator from "./components/FoodCalculator";
import MacroProgress from "./components/MacroProgress";
import FoodDiary from "./components/FoodDiary";
import type { Food } from "./data/foods";
import type { Meal } from "./data/meals";
import type { DiaryEntry } from "./types/diary";

const STORAGE_KEY = "nutrirs-diary-v1";

function getLocalDate(){
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function App(){
  const dailyCalories = 2100;
  
  const [diary, setDiary] = useState<DiaryEntry[]>(() => {
    try {
      const savedDiary = localStorage.getItem(STORAGE_KEY);

      if (!savedDiary){
        return [];
      }

      const parsed: unknown = JSON.parse(savedDiary);

      return Array.isArray(parsed)
        ? (parsed as DiaryEntry[])
        : [];
    } catch (error) {
      console.error("Greška pri učitavanju dnevnika:", error);
      return [];
    }
  });

  const [selectedDate, setSelectedDate] = useState(getLocalDate());

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(diary)
      );
    } catch (error) {
      console.error("Greška pri čuvanju dnevnika:", error);
    }
  }, [diary]);

  function handleAddFood(food: Food, grams: number, meal: Meal){
    const newEntry: DiaryEntry = {
      id: crypto.randomUUID(),
      food: food,
      grams: grams,
      meal: meal,
      date: selectedDate,
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
    setDiary((previous) =>
      previous.filter((entry) => entry.date !== selectedDate)
    );
  }

  const selectedDayEntries = diary.filter(
    (entry) => entry.date === selectedDate
  );

  const totals = selectedDayEntries.reduce(
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

        
        <div className="mt-6 w-full max-w-md">
          <label
            htmlFor="selected-date"
            className="mb-2 block text-sm font-medium"
          >
            Izaberi datum
          </label>

          <div className="flex items-center gap-3">
            <input
              id="selected-date"
              type="date"
              value={selectedDate}
              onChange={(event) => {
                if (event.target.value) {
                  setSelectedDate(event.target.value);
                }
              }}
              className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white p-3"
            />

            <button
              type="button"
              onClick={() => setSelectedDate(getLocalDate())}
              className="shrink-0 cursor-pointer rounded-xl bg-[#169b74] px-5 py-3 text-white transition-colors hover:bg-[#128563]"
            >
              Danas
            </button>
          </div>
        </div>

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
          entries={selectedDayEntries}
          onDelete={handleDeleteFood}
          onDeleteAll={handleDeleteAllFood}
          onUpdate={handleUpdateFood}
        />
      </div>
    </main>
  );
}

export default App;