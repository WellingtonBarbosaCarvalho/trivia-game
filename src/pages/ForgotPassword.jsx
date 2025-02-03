// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import { FiMail, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { PageContainer, ContentCard } from '../components/PageLayout';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simular verificação de e-mail
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some(u => u.email === email);
      
      if (!userExists) {
        throw new Error('E-mail não cadastrado!');
      }

      // Simular envio de e-mail (mock)
      setTimeout(() => {
        setSuccess(true);
        setIsLoading(false);
      }, 1500);

    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <ContentCard $maxWidth="500px">
        <Title>Redefinir Senha</Title>
        
        {success ? (
          <SuccessMessage>
            <FiCheck /> Instruções enviadas para {email}
          </SuccessMessage>
        ) : (
          <>
            <Description>
              Digite seu e-mail cadastrado para receber as instruções de redefinição de senha.
            </Description>

            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <FiMail />
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>

              {error && <ErrorMessage><FiAlertCircle /> {error}</ErrorMessage>}

              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar Instruções'}
              </SubmitButton>
            </Form>
          </>
        )}

        <Links>
          <Link to="/">Voltar para Login</Link>
        </Links>
      </ContentCard>
    </PageContainer>
  );
};

// Estilos
const Title = styled.h1`
  text-align: center;
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-size: 2rem;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: #667eea;
    margin: 1rem auto 0;
    border-radius: 2px;
  }
`;

const Description = styled.p`
  color: #718096;
  text-align: center;
  margin-bottom: 2rem;
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
  transition: all 0.3s;

  &:focus {
    border-color: #667eea;
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }
`;

const SubmitButton = styled.button`
  padding: 15px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #5a67d8;
    transform: translateY(-1px);
  }
`;

const Links = styled.div`
  text-align: center;
  margin-top: 2rem;

  a {
    color: #667eea;
    text-decoration: none;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SuccessMessage = styled.div`
  padding: 1.5rem;
  background: #f0fff4;
  border: 1px solid #c6f6d5;
  border-radius: 8px;
  color: #38a169;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  background: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 8px;
  color: #e53e3e;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default ForgotPassword;
