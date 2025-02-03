// src/components/Layout.jsx
import styled from 'styled-components';

export const MainLayout = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Uso em qualquer página:
import { MainLayout } from './Layout';

function Results() {
  return (
    <MainLayout>
      {/* Conteúdo da página */}
    </MainLayout>
  );
}
