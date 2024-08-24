/* PageTitleBar.js
 *  - Adds custom title bar
 *
 *  Versions
 *  I.  Title with Left & Right Icons (Center-aligned)
 *  II. Logo (Left-aligned)
 * 
 *  Usage.
 *  <CustomTitleBar
 *      leftIcon=""           // empty
 *      rightIcon="close"     // close icon
 *      title="Create Cart"   // title
 *  />
 *   
 *  OR
 *
 *  <CustomTitleBar
 *      logoVersion={true}    // enable logo version
 *  />
 * 
 */


import React from 'react';
import styled from 'styled-components';
import { ICONS } from './Icons.js'; // Import the icon mapping
import { ReactComponent as LogoSVG } from '../coupang_connect/coupang_connect_logo_small.svg';

// Styled container with Flexbox
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 530px;
  padding: 16px;
  margin: 20px;
`;

// Styled p
const Title = styled.p`
  flex-grow: 1;
  text-align: center;
  margin: 0;
`;

// Styled SVG container
const IconContainer = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  cursor: pointer;
  svg {
    height: 24px; // Adjust size as needed
    width: 24px;
  }
`;

// Styled logo container
const LogoContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: left;
  align-items: left;
  img {
    height: 50px; // Adjust size as needed
    width: auto;
  }
`;

// Main component
const CustomTitleBar = ({
  leftIcon,
  rightIcon,
  title = 'My Title',
  logoVersion = false,
}) => {
  const LeftIconComponent = ICONS[leftIcon];
  const RightIconComponent = ICONS[rightIcon];

  return (
    <HeaderContainer>
      {logoVersion ? (
        <LogoContainer>
          <LogoSVG />
        </LogoContainer>
      ) : (
        <>
          <IconContainer visible={!!LeftIconComponent}>
            {LeftIconComponent && <LeftIconComponent />}
          </IconContainer>
          <Title>{title}</Title>
          <IconContainer visible={!!RightIconComponent}>
            {RightIconComponent && <RightIconComponent />}
          </IconContainer>
        </>
      )}
    </HeaderContainer>
  );
};
export default CustomTitleBar;
