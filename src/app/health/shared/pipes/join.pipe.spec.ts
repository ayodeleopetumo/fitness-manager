import { JoinPipe } from './join.pipe';

describe('Join Pipe', () => {
  let joinPipe: JoinPipe;

  beforeEach(() => {
    joinPipe = new JoinPipe();
  });

  it('should join passed value if array and return string representation', () => {
    const expected = '1, 2, 3, 4, 5, 6';

    expect(joinPipe.transform([1, 2, 3, 4, 5, 6])).toEqual(expected);
  });

  it('should return exact value passed in if not array', () => {
    const expected = { one: 1, two: 2 };

    expect(joinPipe.transform({ one: 1, two: 2 })).toEqual(expected);
  });
});
