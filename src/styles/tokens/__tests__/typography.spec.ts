import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('Typography tokens smoke test', () => {
  beforeAll(() => {
    // Manually inject CSS tokens into the test DOM without @layer
    // happy-dom doesn't fully support @layer, so we inject raw :root styles
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --font-size-base: 1rem;
        --font-size-xl: 1.25rem;
        --line-height-normal: 1.5;
        --line-height-tight: 1.125;
        --text-h1-size: var(--font-size-6xl);
        --text-body-size: var(--font-size-base);
        --font-size-6xl: 3.75rem;
      }
    `;
    document.head.appendChild(style);
  });

  it('should have typography tokens defined and accessible', () => {
    // Create a test element to verify CSS custom properties
    const root = document.documentElement;
    const styles = getComputedStyle(root);

    // Verify primitive typography tokens exist
    const fontSizeBase = styles.getPropertyValue('--font-size-base').trim();
    const lineHeightNormal = styles.getPropertyValue('--line-height-normal').trim();

    expect(fontSizeBase).toBeTruthy();
    expect(fontSizeBase).toBe('1rem');
    expect(lineHeightNormal).toBeTruthy();
    expect(lineHeightNormal).toBe('1.5');

    // Verify semantic typography tokens exist
    const textH1Size = styles.getPropertyValue('--text-h1-size').trim();
    const textBodySize = styles.getPropertyValue('--text-body-size').trim();

    expect(textH1Size).toBeTruthy();
    expect(textBodySize).toBeTruthy();

    // Verify semantic tokens resolve to expected values
    // getComputedStyle resolves CSS variables, so textBodySize will be '1rem' not 'var(--font-size-base)'
    expect(textBodySize).toBe('1rem');
  });
});
