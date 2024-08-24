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
`
export const Wrapper = styled.div`
  width: 508px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 508px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: white;
  padding: 0 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 14px;
  margin-top: 8px;
`;


export const Button = styled.button`
  background-color: black;
  color: white;
  border: none;
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  max-width: 508px;
  height: 56px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f76800;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;