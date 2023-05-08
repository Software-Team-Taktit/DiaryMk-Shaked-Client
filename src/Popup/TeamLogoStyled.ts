import styled from 'styled-components';
import teamLogo from "../assets/teamLogoWithText.png";
import {lightColorTheme} from "./styledComponentsThemes/ColorThemes";

export const TeamLogoStyled = styled.img.attrs({
    src: teamLogo,
    alt: 'teamLogo'
})`
  width: 140px;
  height: 183px;
  padding: 0;
  filter: ${() => lightColorTheme.teamLogo.filter};
  cursor: pointer;
  display: block;
  margin-inline: auto;
  margin-top: 30px;
  &:hover {
    filter: ${() => lightColorTheme.teamLogo.filterHover};
  }
`;