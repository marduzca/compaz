import { isFeatureFlagSet } from './FeatureFlag';

describe('can read feature toggle by key', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window.location;
    window.location = {
      search: '',
    } as Location;

    localStorage.clear();
  });

  it('shows feature when url param is set', () => {
    window.location.search = '?some-feature=true';
    const result = isFeatureFlagSet('some-feature');
    expect(result).toBe(true);
  });

  it('writes flag to local storage when url param is read', () => {
    window.location.search = '?some-other-feature=true';
    isFeatureFlagSet('some-other-feature');
    const result = localStorage.getItem('some-other-feature');
    expect(result).toBe('true');
  });

  it('shows feature when local storage param is set', () => {
    localStorage.setItem('some-otherest-feature', 'true');

    const result = isFeatureFlagSet('some-otherest-feature');
    expect(result).toBe(true);
  });

  it('defaults to false', () => {
    const result = isFeatureFlagSet('some-otherer-feature');
    expect(result).toBe(false);
  });
});
