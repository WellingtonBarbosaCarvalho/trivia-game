// src/pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiMail, FiLock, FiAlertCircle, FiLogIn } from 'react-icons/fi';
import { PageContainer, ContentCard } from '../components/PageLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (login(email, password)) {
        navigate('/game');
      } else {
        setError('Credenciais inválidas!');
      }
    } catch (err) {
      setError('Erro ao fazer login');
    }
  };

  return (
    <PageContainer>
      <ContentCard $maxWidth="500px">
        <Title>Bem-vindo ao TriviaMaster</Title>
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <FiMail />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <FiLock />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>

          {error && <ErrorMessage><FiAlertCircle /> {error}</ErrorMessage>}

          <SubmitButton type="submit">
            <FiLogIn /> Entrar
          </SubmitButton>

          <Links>
            <Link to="/register">Criar conta</Link>
            <Link to="/forgot-password">Esqueceu a senha?</Link>
          </Links>
        </Form>
      </ContentCard>
    </PageContainer>
  );
};

// Estilos
const Title = styled.h1`
  text-align: center;
  color: #2d3748;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 15px;
    color: #4a5568;
    font-size: 1.2rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 40px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #667eea;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 15px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #5a67d8;
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  a {
    color: #667eea;
    text-decoration: none;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  padding: 10px;
  background: #fff5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
`;

export default Login;