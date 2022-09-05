import { renderHook } from '@testing-library/react';
import useTimeOfTheDay from './useTimeOfTheDay';

describe('useTimeOfTheDay', () => {
  afterAll(() => {
    jest.useRealTimers();
  });

  it('should tell it is morning if it is 7 or later', () => {
    jest.useFakeTimers().setSystemTime(new Date('2021-09-24 07:00'));

    const { result } = renderHook(() => useTimeOfTheDay());

    expect(result.current.isMorning).toBeTruthy();
    expect(result.current.isAfternoon).toBeFalsy();
    expect(result.current.isNight).toBeFalsy();
  });

  it('should tell it is afternoon if it is 13 or later', () => {
    jest.useFakeTimers().setSystemTime(new Date('2021-09-24 13:00'));

    const { result } = renderHook(() => useTimeOfTheDay());

    expect(result.current.isAfternoon).toBeTruthy();
    expect(result.current.isMorning).toBeFalsy();
    expect(result.current.isNight).toBeFalsy();
  });

  it('should tell it is night if it is 19 or later', () => {
    jest.useFakeTimers().setSystemTime(new Date('2021-09-24 19:00'));

    const { result } = renderHook(() => useTimeOfTheDay());

    expect(result.current.isNight).toBeTruthy();
    expect(result.current.isMorning).toBeFalsy();
    expect(result.current.isAfternoon).toBeFalsy();
  });

  it('should tell it is night if it is before 7 am', () => {
    jest.useFakeTimers().setSystemTime(new Date('2021-09-24 06:00'));

    const { result } = renderHook(() => useTimeOfTheDay());

    expect(result.current.isNight).toBeTruthy();
    expect(result.current.isMorning).toBeFalsy();
    expect(result.current.isAfternoon).toBeFalsy();
  });
});
