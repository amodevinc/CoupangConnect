import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import logo from '../coupang_connect/coupang_connect_logo.svg';
import CreateCart from '../CartCreate';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const glowAndSpark = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 5px var(--brand-400)) brightness(1);
  }
  25%, 75% { 
    filter: drop-shadow(0 0 20px var(--brand-400)) brightness(1.2);
  }
  50% { 
    filter: drop-shadow(0 0 30px var(--brand-400)) brightness(1.5);
  }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const HomeScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--neutral-50) 0%, var(--brand-200) 100%);
`;

const TopNavigation = styled.nav`
  background-color: var(--brand-400);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavButton = styled.button`
  background-color: var(--neutral-0);
  color: var(--brand-400);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--brand-200);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
`;

const TransitionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  animation: ${float} 3s ease-in-out infinite;
`;

const LogoWrapper = styled.div`
  position: relative;
  animation: ${pulse} 2s ease-in-out infinite
`;

const GlowingLogo = styled.img`
  width: 500px;
  height: auto;
  animation: ${glowAndSpark} 3s infinite;
`;

const Sparkle = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  animation: ${sparkle} 1.5s infinite;
  
  &:nth-child(1) { top: 0; left: 50%; animation-delay: 0s; }
  &:nth-child(2) { top: 25%; right: 0; animation-delay: 0.3s; }
  &:nth-child(3) { bottom: 0; left: 50%; animation-delay: 0.6s; }
  &:nth-child(4) { top: 25%; left: 0; animation-delay: 0.9s; }
`;

const HomeScreen = ({userId}) => {
  const [showTransition, setShowTransition] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTransition(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    setShowTransition(true);
    setTimeout(() => setShowTransition(false), 5000);
  };

  return (
    <HomeScreenContainer>
      <TopNavigation>
        <NavButton onClick={handleGoHome}>Home</NavButton>
        <NavButton onClick={() => navigate('/carts')}>Carts</NavButton>
      </TopNavigation>
      <ContentContainer>
        {showTransition ? (
          <TransitionContainer>
            <LogoWrapper>
              <GlowingLogo src={logo} alt="logo" />
              <Sparkle />
              <Sparkle />
              <Sparkle />
              <Sparkle />
            </LogoWrapper>
          </TransitionContainer>
        ) : (
          <CreateCart userId={userId}/>
        )}
      </ContentContainer>
    </HomeScreenContainer>
  );
};

export default HomeScreen;