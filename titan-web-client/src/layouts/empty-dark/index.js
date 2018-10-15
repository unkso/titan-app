import styled, { withTheme } from 'styled-components'

const EmptyDarkLayout = styled.div`
  background-color: ${props => props.theme.palette.backgroundInversePrimary};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export default withTheme(EmptyDarkLayout)
