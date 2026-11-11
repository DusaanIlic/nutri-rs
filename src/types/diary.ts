import type { Food } from "../data/foods";
import type { Meal } from "../data/meals";

export type DiaryEntry = {
    id: string;
    food: Food;
    grams: number;
    meal: Meal;
};