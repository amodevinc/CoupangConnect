import styled from 'styled-components';

/* PAGE LAYOUT */
export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--base);
`;

/* BUTTONS */
export const Button = styled.button`
    background-color: var(--primary);
    color: var(--base);
    border: none;
    font-size: 20px;
    font-weight: 600;
    width: 508px;
    height: 56px;
    border-radius: 6px;
    text-align: center;
    
    &:hover {
      background-color: var(--pressed-primary); 
    }
`

export const ButtonDisabled = styled.button`
    background-color: var(--disabled);
    color: var(--textbordericon-disabled);
    border: none;
    font-size: 20px;
    font-weight: 600;
    width: 508px;
    height: 56px;
    border-radius: 6px;
    text-align: center;
`

export const ButtonOutlineGhost = styled.button`
    background-color: var(--base);
    color: var(--textbordericon-disabled);
    border: 1px solid var(--textbordericon-disabled);
    box-sizing: border-box;
    font-size: 20px;
    font-weight: 600;
    width: 508px;
    height: 56px;
    border-radius: 6px;
    text-align: center;
`
export const ButtonOutlinePrimary = styled.button`
    background-color: var(--base);
    color: var(--textbordericon-emphasis);
    border: 1px solid var(--textbordericon-emphasis);
    box-sizing: border-box;
    font-size: 20px;
    font-weight: 600;
    width: 508px;
    height: 56px;
    border-radius: 6px;
    text-align: center;
`

export const ButtonOutlinePrimaryGreen = styled.button`
    background-color: var(--base);
    color: var(--green);
    border: 1px solid var(--green);
    box-sizing: border-box;
    font-size: 20px;
    font-weight: 600;
    width: 508px;
    height: 56px;
    border-radius: 6px;
    text-align: center;
`
export const ButtonOutlinePrimaryRed = styled.button`
    background-color: var(--base);
    color: var(--red);
    border: 1px solid var(--red);
    box-sizing: border-box;
    font-size: 20px;
    font-weight: 600;
    width: 508px;
    height: 56px;
    border-radius: 6px;
    text-align: center;
`

/* INPUT */
export const Input = styled.input`
    width: 508px;
    height: 48px;
    font-size: 20px;
    border-radius: 8px;
    border: 1px solid gray;
    background-color: white;
    padding-left: 16px;
`

/* WRAPPERS */
export const InputWrapper = styled.div`
  width: 508px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: auto; /* Pushes the button to the bottom */
`;

export const ButtonsVerticalWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: auto;
`;

export const ButtonsHorizontalWrapper = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 48vh;
  justify-content: center;
  margin: auto;
`

export const Wrapper = styled.div`
  width: 508px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
