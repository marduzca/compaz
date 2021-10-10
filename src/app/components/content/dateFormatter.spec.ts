import {
  addMinutesToDate,
  parseToSimpleDate,
  parseToEnglishDateString,
  parseToSpanishDate,
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

      expect(dateInLongFormat).toEqual('Friday 24 September');
    });

    it('parses a date to english short format correctly', () => {
      const dateInLongFormat = parseToEnglishDateString(
        new Date('2021-09-24 17:30'),
        true
      );

      expect(dateInLongFormat).toEqual('Fri 24 Sep');
    });

    it('adds english today indicator if given date is today', () => {
      const dateInLongFormat = parseToEnglishDateString(new Date(), false);

      expect(dateInLongFormat).toContain('Today, ');
    });
  });

  describe('spanish', () => {
    it('parses a date to spanish long format correctly', () => {
      const dateInLongFormat = parseToSpanishDate(
        new Date('2021-09-24 17:30'),
        false
      );

      expect(dateInLongFormat).toEqual('Viernes 24 Septiembre');
    });

    it('parses a date to spanish short format correctly', () => {
      const dateInLongFormat = parseToSpanishDate(
        new Date('2021-09-24 17:30'),
        true
      );

      expect(dateInLongFormat).toEqual('Vie 24 Sept');
    });

    it('adds spanish today indicator if given date is today', () => {
      const dateInLongFormat = parseToSpanishDate(new Date(), false);

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

    expect(timeInSimpleFormat).toEqual('2021-09-24');
  });

  it('adds given minutes to given date correctly', () => {
    const dateWithAddedMinutes = addMinutesToDate(
      new Date('2021-09-24 17:35'),
      30
    );

    expect(dateWithAddedMinutes.getHours()).toEqual(18);
    expect(dateWithAddedMinutes.getMinutes()).toEqual(5);
  });

  it('reduces given minutes to given date correctly', () => {
    const dateWithAddedMinutes = reduceMinutesToDate(
      new Date('2021-09-24 17:35'),
      40
    );

    expect(dateWithAddedMinutes.getHours()).toEqual(16);
    expect(dateWithAddedMinutes.getMinutes()).toEqual(55);
  });

  it('parses date to simple time format correctly', () => {
    const timeInSimpleFormat = parseToSimpleTime(new Date('2021-09-24 17:30'));

    expect(timeInSimpleFormat).toEqual('17:30');
  });
});
