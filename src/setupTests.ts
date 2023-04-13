import '@testing-library/jest-dom';
import { vi } from 'vitest';

window.matchMedia = () => ({
  matches: false,
  media: '',
  onchange: null,
  addListener: vi.fn(), // deprecated
  removeListener: vi.fn(), // deprecated
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});
