// src/components/PageLayout.jsx
import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: ${props => props.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: ${props => props.$maxWidth || '800px'};
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  margin: 2rem;

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
    border-radius: 15px;
  }
`;