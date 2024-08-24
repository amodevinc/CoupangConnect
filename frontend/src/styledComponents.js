import styled from 'styled-components';

/* PAGE LAYOUT */
export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: spcae-between;
  background: var(--background-5, #fafaff);
`;

/* BUTTONS */
export const Button = styled.button`
    background-color: black;
    color: white;
    border: none;
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

export const Wrapper = styled.div`
  width: 508px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
