import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PageContainer, ContentCard } from '../components/PageLayout';
import { useNavigate, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiClock } from 'react-icons/fi';

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10');
        const data = await response.json();
        
        if (data.response_code === 0) {
          setQuestions(data.results.map(q => ({
            ...q,
            answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
          })));
        } else {
          setError('Falha ao carregar perguntas. Tente novamente!');
        }
      } catch (err) {
        setError('Erro de conexão. Verifique sua internet!');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && questions.length > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeOut();
    }
    return () => clearInterval(timer);
  }, [timeLeft, questions]);

  const handleTimeOut = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(30);
    } else {
      navigate('/results', { state: { score } });
    }
  };

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(s => s + 100);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(30);
    } else {
      navigate('/results', { state: { score } });
    }
  };

  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  if (loading) {
    return (
      <PageContainer background="#f8fafc">
        <ContentCard $maxWidth="800px">
          <LoadingMessage>Carregando perguntas...</LoadingMessage>
        </ContentCard>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer background="#f8fafc">
        <ContentCard $maxWidth="800px">
          <ErrorMessage>{error}</ErrorMessage>
          <ButtonGroup>
            <RetryButton onClick={() => window.location.reload()}>Tentar novamente</RetryButton>
            <LogoutButton onClick={logout}>Sair</LogoutButton>
          </ButtonGroup>
        </ContentCard>
      </PageContainer>
    );
  }

  if (!questions.length || currentQuestion >= questions.length) {
    return <Navigate to="/results" state={{ score }} replace />;
  }

  return (
    <PageContainer background="#f8fafc">
      <ContentCard $maxWidth="800px">
        <Header>
          <UserInfo>
            <UserName>{user?.username}</UserName>
            <Score>Pontuação: {score}</Score>
          </UserInfo>
          <LogoutButton onClick={logout}>Sair</LogoutButton>
        </Header>

        <TimerContainer>
          <FiClock /> {timeLeft}s
        </TimerContainer>

        <QuestionContainer>
          <QuestionText>
            {decodeHTML(questions[currentQuestion].question)}
          </QuestionText>
          
          <AnswersGrid>
            {questions[currentQuestion].answers.map((answer, i) => (
              <AnswerButton key={i} onClick={() => handleAnswer(answer)}>
                {decodeHTML(answer)}
              </AnswerButton>
            ))}
          </AnswersGrid>
        </QuestionContainer>
      </ContentCard>
    </PageContainer>
  );
};

// Estilos
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #2d3748;
  font-size: 1.1rem;
`;

const Score = styled.span`
  color: #718096;
  font-size: 0.9rem;
`;

const LogoutButton = styled.button`
  padding: 8px 20px;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #c53030;
    transform: translateY(-1px);
  }
`;

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e53e3e;
  font-weight: 600;
  margin-bottom: 2rem;
  padding: 10px 20px;
  background: #fff5f5;
  border-radius: 8px;
  width: fit-content;
`;

const QuestionContainer = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
`;

const QuestionText = styled.h2`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 2rem;
  line-height: 1.4;
`;

const AnswersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AnswerButton = styled.button`
  padding: 1.2rem;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 80px;

  &:hover {
    background: #667eea;
    color: white;
    border-color: #667eea;
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(102, 126, 234, 0.2);
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  padding: 1rem;
  margin: 1rem 0;
  background: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 8px;
  text-align: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #667eea;
  font-size: 1.2rem;
  padding: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const RetryButton = styled.button`
  padding: 10px 25px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #5a67d8;
    transform: translateY(-1px);
  }
`;

export default Game;
