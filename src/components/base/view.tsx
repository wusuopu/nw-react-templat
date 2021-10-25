import styled from 'styled-components'
import { flexbox, space, color, position, layout, background, border, shadow, typography } from 'styled-system'
import type { FlexboxProps, ColorProps, SpaceProps, PositionProps, LayoutProps, BackgroundProps, BordersProps, ShadowProps, TypographyProps } from 'styled-system';

export type ViewProps = FlexboxProps & ColorProps & SpaceProps & PositionProps & LayoutProps & BackgroundProps & BordersProps & ShadowProps & TypographyProps;

const Box = styled.div<ViewProps>`
  ${flexbox};
  ${space};
  ${color};
  ${position};
  ${layout};
  ${background};
  ${border};
  ${shadow};
  ${typography};
`;
Box.displayName = 'Box'
const Flex = styled(Box).attrs({
  display: 'flex',
})``;
Flex.displayName = 'Flex'

const FlexCol = styled(Flex).attrs({
  flexDirection: 'column'
})``;
FlexCol.displayName = 'FlexCol'

const FlexRow = styled(Flex).attrs({
  flexDirection: 'row'
})``;
FlexRow.displayName = 'FlexRow'

export {
  FlexCol,
  FlexRow,
  Flex,
  Box,
}
