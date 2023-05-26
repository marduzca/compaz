import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import useMapFitBounds from './useMapFitBounds';
import { MapMode } from '../../organisms/map/MapContainer';

const fitBoundsMock = vi.fn();
const panByMock = vi.fn();
const setZoomMock = vi.fn();

const google = {
  maps: {
    Map: vi.fn().mockImplementation(() =>
      // Mocked LatLngBounds object
      ({
        fitBounds: fitBoundsMock,
        panBy: panByMock,
        setZoom: setZoomMock,
      })
    ),
    LatLngBounds: vi.fn().mockImplementation(() => ({
      extend: vi.fn(),
    })),
    event: { addListenerOnce: vi.fn() },
  },
};

// @ts-ignore
global.window.google = google;

// Mock the event listener
google.maps.event.addListenerOnce.mockImplementation(
  (instance, eventName, callback) => {
    callback();

    return vi.fn();
  }
);

describe('useMapFitBounds', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('SHOULD trigger the corresponding map post adjustments WHEN on ROUTE mode', () => {
    const { result } = renderHook(() => useMapFitBounds(new google.maps.Map()));

    result.current.fitScreenToBounds([], MapMode.ROUTE);

    expect(fitBoundsMock).toHaveBeenCalled();
    expect(panByMock).toHaveBeenCalledWith(
      window.innerWidth * -0.1,
      window.innerHeight * -0.03
    );
  });

  it('SHOULD trigger the corresponding map post adjustments WHEN on LINES mode', () => {
    const { result } = renderHook(() => useMapFitBounds(new google.maps.Map()));

    result.current.fitScreenToBounds([], MapMode.LINES);

    expect(fitBoundsMock).toHaveBeenCalled();
    expect(panByMock).toHaveBeenCalledWith(0, window.innerHeight * -0.03);
    expect(setZoomMock).not.toHaveBeenCalled();
  });

  describe('WHEN on mobile', () => {
    const originalInnerWidth = window.innerWidth;
    const originalInnerHeight = window.innerHeight;

    beforeAll(() => {
      // Height is bigger than width
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: 667,
      });

      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 375,
      });
    });

    afterAll(() => {
      // Go back to real values
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: originalInnerHeight,
      });

      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: originalInnerWidth,
      });
    });

    it('SHOULD trigger the corresponding map post adjustments WHEN on ROUTE mode', () => {
      const { result } = renderHook(() =>
        useMapFitBounds(new google.maps.Map())
      );

      result.current.fitScreenToBounds([], MapMode.ROUTE);

      expect(fitBoundsMock).toHaveBeenCalled();
      expect(panByMock).toHaveBeenCalledWith(0, window.innerHeight * 0.2);
    });

    it('SHOULD trigger the corresponding map post adjustments WHEN on LINES mode', () => {
      const { result } = renderHook(() =>
        useMapFitBounds(new google.maps.Map())
      );

      result.current.fitScreenToBounds([], MapMode.LINES);

      expect(fitBoundsMock).toHaveBeenCalled();
      expect(setZoomMock).toHaveBeenCalledWith(13);
      expect(panByMock).not.toHaveBeenCalled();
    });
  });
});
