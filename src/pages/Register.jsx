// src/pages/Register.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FiUser, FiMail, FiLock, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { PageContainer, ContentCard } from '../components/PageLayout';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      setSuccess(true);
      setTimeout(() => navigate('/game'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <PageContainer>
      <ContentCard $maxWidth="500px">
        <Title>Criar Nova Conta</Title>
        
        {success && (
          <SuccessMessage>
            <FiCheck /> Conta criada com sucesso!
          </SuccessMessage>
        )}

        {error && <ErrorMessage><FiAlertCircle /> {error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <FiUser />
            <Input
              type="text"
              name="username"
              placeholder="Nome de usuário"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <FiMail />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <FiLock />
            <Input
              type="password"
              name="password"
              placeholder="Senha (mínimo 6 caracteres)"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </InputGroup>

          <InputGroup>
            <FiLock />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <PasswordRules>
            <li>Mínimo 6 caracteres</li>
            <li>Pelo menos 1 número</li>
          </PasswordRules>

          <SubmitButton type="submit">
            Criar Conta
          </SubmitButton>

          <LoginLink>
            Já tem uma conta? <Link to="/">Faça login aqui</Link>
          </LoginLink>
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
  position: relative;

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
    transition: color 0.3s;
  }

  &:focus-within svg {
    color: #667eea;
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

const PasswordRules = styled.ul`
  padding-left: 1.5rem;
  color: #718096;
  font-size: 0.9rem;
  margin: -0.5rem 0 1rem;

  li {
    margin: 0.3rem 0;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: #5a67d8;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #718096;

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SuccessMessage = styled.div`
  color: #38a169;
  padding: 12px;
  background: #f0fff4;
  border: 1px solid #c6f6d5;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.95rem;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  padding: 12px;
  background: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.95rem;
`;

export default Register;