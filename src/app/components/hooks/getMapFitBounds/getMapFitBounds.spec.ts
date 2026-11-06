import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import getMapFitBounds from './getMapFitBounds';
import { MapMode } from '../../organisms/map/MapContainer';

const fitBoundsMock = vi.fn();
const panByMock = vi.fn();
const setZoomMock = vi.fn();

// `function` (not arrow) so the mocks can be called with `new`
function MapMock() {
  return {
    fitBounds: fitBoundsMock,
    panBy: panByMock,
    setZoom: setZoomMock,
  };
}

function LatLngBoundsMock() {
  return { extend: vi.fn() };
}

const google = {
  maps: {
    Map: vi.fn().mockImplementation(MapMock),
    LatLngBounds: vi.fn().mockImplementation(LatLngBoundsMock),
    event: { addListenerOnce: vi.fn() },
  },
};

// @ts-ignore
global.window.google = google;

// Mock the event listener
google.maps.event.addListenerOnce.mockImplementation(
  (_instance, _eventName, callback) => {
    callback();

    return vi.fn();
  },
);

describe('getMapFitBounds', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('SHOULD trigger the corresponding map post adjustments WHEN on ROUTE mode', () => {
    const { result } = renderHook(() => getMapFitBounds(new google.maps.Map()));

    result.current.fitScreenToBounds([], MapMode.ROUTE);

    expect(fitBoundsMock).toHaveBeenCalled();
    expect(panByMock).toHaveBeenCalledWith(
      window.innerWidth * -0.1,
      window.innerHeight * -0.03,
    );
  });

  it('SHOULD trigger the corresponding map post adjustments WHEN on LINES mode', () => {
    const { result } = renderHook(() => getMapFitBounds(new google.maps.Map()));

    result.current.fitScreenToBounds([], MapMode.LINES);

    expect(fitBoundsMock).toHaveBeenCalled();
    expect(panByMock).toHaveBeenCalledWith(0, window.innerHeight * -0.03);
    expect(setZoomMock).not.toHaveBeenCalled();
  });

  it('SHOULD trigger the corresponding map post adjustments WHEN on CURRENT_LOCATION mode', () => {
    const { result } = renderHook(() => getMapFitBounds(new google.maps.Map()));

    result.current.fitScreenToBounds([], MapMode.CURRENT_LOCATION);

    expect(fitBoundsMock).toHaveBeenCalled();
    expect(setZoomMock).toHaveBeenCalledWith(15);
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
        getMapFitBounds(new google.maps.Map()),
      );

      result.current.fitScreenToBounds([], MapMode.ROUTE);

      expect(fitBoundsMock).toHaveBeenCalled();
      expect(panByMock).toHaveBeenCalledWith(0, window.innerHeight * 0.2);
    });

    it('SHOULD trigger the corresponding map post adjustments WHEN on LINES mode', () => {
      const { result } = renderHook(() =>
        getMapFitBounds(new google.maps.Map()),
      );

      result.current.fitScreenToBounds([], MapMode.LINES);

      expect(fitBoundsMock).toHaveBeenCalled();
      expect(setZoomMock).toHaveBeenCalledWith(13);
      expect(panByMock).not.toHaveBeenCalled();
    });
  });
});
