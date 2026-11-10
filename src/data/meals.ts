export const mealOptions = [
    { id: "breakfast", label: "Doručak"},
    { id: "lunch", label: "Ručak"},
    { id: "dinner", label: "Večera"},
    { id: "snack", label: "Užina"},
] as const;

export type Meal = (typeof mealOptions)[number]["id"];

