import { WorkoutPipe } from './workout.pipe';

describe('Workout Pipe', () => {
  let workoutPipe: WorkoutPipe;

  beforeEach(() => {
    workoutPipe = new WorkoutPipe();
  });

  it('should return distance and duration if value passed is endurance', () => {
    const value = {
      type: 'endurance',
      endurance: {
        distance: 30,
        duration: 30
      }
    };
    const expected = `Distance: 30km, Duration: 30mins`;

    expect(workoutPipe.transform(value)).toEqual(expected);
  });

  it('should return weights, sets, and reps if value passed is strength', () => {
    const value = {
      type: 'strength',
      strength: {
        weight: 30,
        reps: 10,
        sets: 5
      }
    };
    const expected = `Weight: 30kg, Reps: 10, Sets: 5`;

    expect(workoutPipe.transform(value)).toEqual(expected);
  });
});
