import {
  addMinutesToDate,
  parseToSimpleDate,
  parseToEnglishDateString,
  parseToSpanishDateString,
  parseToSimpleTime,
  reduceMinutesToDate,
  isWeekday,
} from './dateFormatter';

describe('dateFormatter', () => {
  describe('english', () => {
    it('parses a date to english long format correctly', () => {
      const dateInLongFormat = parseToEnglishDateString(
        new Date('2021-09-24 17:30'),
        false
      );

      expect(dateInLongFormat).toBe('Friday 24 September');
    });

    it('parses a date to english short format correctly', () => {
      const dateInLongFormat = parseToEnglishDateString(
        new Date('2021-09-24 17:30'),
        true
      );

      expect(dateInLongFormat).toBe('Fri 24 Sep');
    });

    it('adds english today indicator if given date is today', () => {
      const dateInLongFormat = parseToEnglishDateString(new Date(), false);

      expect(dateInLongFormat).toContain('Today, ');
    });
  });

  describe('spanish', () => {
    it('parses a date to spanish long format correctly', () => {
      const dateInLongFormat = parseToSpanishDateString(
        new Date('2021-09-24 17:30'),
        false
      );

      expect(dateInLongFormat).toBe('Viernes 24 Septiembre');
    });

    it('parses a date to spanish short format correctly', () => {
      const dateInLongFormat = parseToSpanishDateString(
        new Date('2021-09-24 17:30'),
        true
      );

      expect(dateInLongFormat).toBe('Vie 24 Sept');
    });

    it('adds spanish today indicator if given date is today', () => {
      const dateInLongFormat = parseToSpanishDateString(new Date(), false);

      expect(dateInLongFormat).toContain('Hoy, ');
    });
  });

  describe('isWeekday', () => {
    it('returns true if date is during the week', () => {
      const isDayDuringWeek = isWeekday('1993-03-17');

      expect(isDayDuringWeek).toBeTruthy();
    });

    it('returns false if date is during the weekend', () => {
      const isDayDuringWeek = isWeekday('1993-03-13');

      expect(isDayDuringWeek).toBeFalsy();
    });
  });

  it('parses date to input date format correctly', () => {
    const timeInSimpleFormat = parseToSimpleDate(new Date('2021-09-24 17:30'));

    expect(timeInSimpleFormat).toBe('2021-09-24');
  });

  it('adds given minutes to given date correctly', () => {
    const dateWithAddedMinutes = addMinutesToDate(
      new Date('2021-09-24 17:35'),
      30
    );

    expect(dateWithAddedMinutes.getHours()).toBe(18);
    expect(dateWithAddedMinutes.getMinutes()).toBe(5);
  });

  it('reduces given minutes to given date correctly', () => {
    const dateWithAddedMinutes = reduceMinutesToDate(
      new Date('2021-09-24 17:35'),
      40
    );

    expect(dateWithAddedMinutes.getHours()).toBe(16);
    expect(dateWithAddedMinutes.getMinutes()).toBe(55);
  });

  it('parses date to simple time format correctly', () => {
    const timeInSimpleFormat = parseToSimpleTime(new Date('2021-09-24 17:30'));

    expect(timeInSimpleFormat).toBe('17:30');
  });
});
