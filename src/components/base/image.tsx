import styled from 'styled-components'
import { flexbox, space, color, position, layout, background, border, shadow, typography } from 'styled-system'
import type { FlexboxProps, ColorProps, SpaceProps, PositionProps, LayoutProps, BackgroundProps, BordersProps, ShadowProps, TypographyProps } from 'styled-system';

export type ImageProps = FlexboxProps & ColorProps & SpaceProps & PositionProps & LayoutProps & BackgroundProps & BordersProps & ShadowProps & TypographyProps & {filter?: any};

const Image = styled.img<ImageProps>`
  ${flexbox};
  ${space};
  ${color};
  ${position};
  ${layout};
  ${background};
  ${border};
  ${shadow};
  ${typography};
  ${(props: ImageProps) => props.filter ? `filter: ${props.filter};` : '' }
`;
Image.displayName = 'Image'
export default Image
