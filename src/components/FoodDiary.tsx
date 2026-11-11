import DiaryEntryItem from "./DiaryEntryItem";
import { mealOptions } from "../data/meals";
import type { DiaryEntry } from "../types/diary";

type FoodDiaryProps = {
  entries: DiaryEntry[];
  onDelete: (id: string) => void;
  onDeleteAll: () => void;
  onUpdate: (id: string, grams: number) => void;
};

function FoodDiary({
  entries,
  onDelete,
  onDeleteAll,
  onUpdate,
}: FoodDiaryProps) {
  return (
    <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold">
        Dnevnik ishrane
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Ukupno {entries.length}{" "}
        {entries.length === 1 ? "unos" : "unosa"}
      </p>

      {entries.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">
          Još nisi dodao nijednu namirnicu.
        </p>
      ) : (
        <div className="mt-6 space-y-6">
          {mealOptions.map((meal) => {
            const mealEntries = entries.filter(
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
                    <DiaryEntryItem
                      key={entry.id}
                      entry={entry}
                      onDelete={onDelete}
                      onUpdate={onUpdate}
                    />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}

      {entries.length > 0 && (
        <button
          type="button"
          onClick={onDeleteAll}
          className="mt-4 cursor-pointer rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
        >
          Obriši sve
        </button>
      )}
    </section>
  );
}

export default FoodDiary;
