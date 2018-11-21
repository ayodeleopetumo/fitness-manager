import { Meal } from '../meals/meal.interface';
import { Workout } from '../workouts/workout.interface';

export interface ScheduleItem {
  meals: Meal[];
  workouts: Workout[];
  section: string;
  timestamp: number;
  key?: string;
}
