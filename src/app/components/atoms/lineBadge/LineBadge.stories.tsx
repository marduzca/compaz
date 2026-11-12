import React from 'react';
import { Meta } from '@storybook/react-vite';
import LineBadge, { LineBadgeSize, LineBadgeVariant } from './LineBadge';
import { LineColor } from '../../domain';

export default {
  component: LineBadge,
  title: 'Atoms / LineBadge',
} satisfies Meta;

const variants: LineBadgeVariant[] = ['cabin', 'bar'];
const sizes: LineBadgeSize[] = ['header', 'row'];

const Grid: React.FC<{ background: string }> = ({ background }) => (
  <div style={{ background, padding: '1rem' }}>
    {variants.map((variant) =>
      sizes.map((size) => (
        <section key={`${variant}-${size}`} style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '0.75rem' }}>
            {variant} / {size}
          </h3>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {Object.values(LineColor).map((line) => (
              <LineBadge key={line} line={line} size={size} variant={variant} />
            ))}
          </div>
        </section>
      )),
    )}
  </div>
);

export const OnWhiteBackground: React.FC = () => <Grid background="#ffffff" />;

// Light grey tint, as used by the sticky group header in the station menu
export const OnMenuBackground: React.FC = () => <Grid background="#f0f0f0" />;
