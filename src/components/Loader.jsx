// src/components/Loader.jsx
import styled, { keyframes } from 'styled-components';

// Animação de rotação
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Componente estilizado
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #667eea;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

function Loader() {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
}

export default Loader;
