import { render, screen } from '@testing-library/react';
import i18n from 'i18next';
import { LineColor } from '../../domain';
import LineBadge from './LineBadge';

const lineNames: Record<string, Record<LineColor, string>> = {
  en: {
    [LineColor.BLUE]: 'Blue line',
    [LineColor.BROWN]: 'Brown line',
    [LineColor.GREEN]: 'Green line',
    [LineColor.LIGHT_BLUE]: 'Light blue line',
    [LineColor.ORANGE]: 'Orange line',
    [LineColor.PURPLE]: 'Purple line',
    [LineColor.RED]: 'Red line',
    [LineColor.SILVER]: 'Silver line',
    [LineColor.WHITE]: 'White line',
    [LineColor.YELLOW]: 'Yellow line',
  },
  es: {
    [LineColor.BLUE]: 'Linea azul',
    [LineColor.BROWN]: 'Linea cafe',
    [LineColor.GREEN]: 'Linea verde',
    [LineColor.LIGHT_BLUE]: 'Linea celeste',
    [LineColor.ORANGE]: 'Linea naranja',
    [LineColor.PURPLE]: 'Linea morada',
    [LineColor.RED]: 'Linea roja',
    [LineColor.SILVER]: 'Linea plateada',
    [LineColor.WHITE]: 'Linea blanca',
    [LineColor.YELLOW]: 'Linea amarilla',
  },
};

describe('LineBadge', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  describe.each(['en', 'es'])('in %s', (language) => {
    it.each(Object.values(LineColor))(
      'SHOULD show the translated name WHEN the line is %s',
      async (line) => {
        await i18n.changeLanguage(language);

        render(<LineBadge line={line} />);

        expect(screen.getByText(lineNames[language]![line])).toBeVisible();
      },
    );
  });

  it.each(['cabin', 'bar'] as const)(
    'SHOULD hide the decoration from assistive tech WHEN the variant is %s',
    (variant) => {
      const { container } = render(
        <LineBadge line={LineColor.RED} variant={variant} />,
      );

      expect(screen.getByText('Red line')).not.toHaveAttribute('aria-hidden');
      expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    },
  );
});
