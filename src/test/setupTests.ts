import { vi } from 'vitest';
import './i18nForTests';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';

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
