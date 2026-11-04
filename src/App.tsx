import CalorieSummary from "./components/CalorieSummary";
import MacroProgress from "./components/MacroProgress";
import { useState } from "react";

function App(){
  const dailyCalories = 2100;
  const [consumedCalories, setConsumedCalories] = useState(1750);

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
          consumed={consumedCalories}
        />

        <div className="mt-4 flex gap-3">
          <button 
            onClick={() => setConsumedCalories(
              previous => previous + 100
            )}
            className="cursor-pointer rounded-xl bg-[#169b74] px-5 py-3 text-white transition-colors hover:bg-[#128563]"
          >
            +100 kcal
          </button>

          <button 
            onClick={() => setConsumedCalories(
              previous => Math.max(0, previous - 100)
            )}
            className="rounded-xl border border-gray-300 px-5 py-3 bg-white cursor-pointer transition-colors hover:bg-[#F3F4F6]"
          >
            -100 kcal
          </button>

          <button 
            onClick={() => setConsumedCalories(1750)}
            className="rounded-xl border border-gray-300 px-5 py-3 bg-white cursor-pointer transition-colors hover:bg-[#F3F4F6]"
          >
            Reset
        </button>
        </div>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">
            Makronutrijenti
          </h2>

          <div className="mt-6 space-y-6">
            <MacroProgress 
              label="Proteini"
              consumed={110}
              target={140}
              color="#159d82"
            />

            <MacroProgress 
              label="Ugljeni hidrati"
              consumed={210}
              target={250}
              color="#e6a75c"
            />

            <MacroProgress 
              label="Masti"
              consumed={52}
              target={70}
              color="#9674d1"
            />
          </div>

        </section>
      </div>
    </main>
  );
}

export default App;