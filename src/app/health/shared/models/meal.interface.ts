export interface Meal {
  name: string;
  ingridients: string[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}
