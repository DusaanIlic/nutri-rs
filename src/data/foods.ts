export type Food = {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
};

export const foods: Food[] = [
    {
        id: 1,
        name: "Jabuka",
        calories: 52,
        protein: 0.3,
        carbs: 14,
        fat: 0.2,
    },
    {
        id: 2,
        name: "Ovsene pahuljice",
        calories: 389,
        protein: 16.9,
        carbs: 66.3,
        fat: 6.9,
    },
    {
        id: 3,
        name: "Kisela pavlaka (20% m.m.)",
        calories: 206,
        protein: 2.5,
        carbs: 3.6,
        fat: 20,
    },
    {
        id: 4,
        name: "Banana",
        calories: 89,
        protein: 1.1,
        carbs: 22.8,
        fat: 0.3,
    },
];