import { React, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword , GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../../assets/logo/logo.svg';
import Input from "../../components/input";
import Button from '../../components/button';
import './styles.css'

const Signup = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Por favor, preencha todos os campos.',
        showConfirmButton: true,
      });
      return;
    }

    const auth = getAuth();
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      auth.currentUser.displayName = name;
      
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          setIsAuthenticated(true);
          localStorage.setItem('is_authenticated', JSON.stringify(true));

          Swal.fire({
            icon: 'success',
            title: 'Registo e login realizado com sucesso',
            showConfirmButton: false,
            timer: 1500,
          });

          navigate('/home');
        },
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  const handleLoginGoogle = async (e) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider)
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          setIsAuthenticated(true);
          localStorage.setItem('is_authenticated', JSON.stringify(true));

          Swal.fire({
            icon: 'success',
            title: 'Registro e login realizado com sucesso.',
            showConfirmButton: false,
            timer: 1500,
          });

          navigate('/home');
        },
      });
    } catch (error) {
      const errorMessage = error.message;

      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: { errorMessage },
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="container">
      <img src={Logo} alt="Logo Finantrack" className='image' />
      <form onSubmit={handleSignup}>
        <div className='content'>
          <Input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            label="Nome"
            onChange={e => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            label="E-mail"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            label="Senha"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            Text="Registrar-se"
            onClick={handleSignup}
            styleType="button-default"
          />
          <Button
            Text="Registrar com o Google"
            onClick={handleLoginGoogle}
            styleType="button-google"
          />
          <label className='label'>
            Já possui uma conta?
            <strong>
              <a className='link' href="/home">&nbsp; Entrar</a>
            </strong>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Signup;