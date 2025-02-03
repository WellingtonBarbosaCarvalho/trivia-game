import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PageContainer, ContentCard } from '../components/PageLayout';
import styled from 'styled-components';
import { FiAward, FiRepeat, FiLogOut } from 'react-icons/fi';

const Results = () => {
  const { state } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ContentCard $maxWidth="600px">
        <ResultContainer>
          <TrophyIcon>
            <FiAward />
          </TrophyIcon>
          <Title>Parabéns, {user?.username}!</Title>
          <Score>{state?.score || 0} pontos</Score>
          
          <ButtonGroup>
            <PlayAgainButton onClick={() => navigate('/game')}>
              <FiRepeat /> Jogar Novamente
            </PlayAgainButton>
            <LogoutButton onClick={logout}>
              <FiLogOut /> Sair
            </LogoutButton>
          </ButtonGroup>
        </ResultContainer>
      </ContentCard>
    </PageContainer>
  );
};

// Estilos
const ResultContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const TrophyIcon = styled.div`
  font-size: 4rem;
  color: #f6e05e;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Score = styled.div`
  font-size: 3rem;
  color: #667eea;
  margin: 2rem 0;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const PlayAgainButton = styled.button`
  padding: 1rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s;

  &:hover {
    background: #5a67d8;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(102, 126, 234, 0.2);
  }
`;

const LogoutButton = styled.button`
  padding: 1rem 2rem;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s;

  &:hover {
    background: #c53030;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(229, 62, 62, 0.2);
  }
`;

export default Results;
