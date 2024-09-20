import { React, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../../assets/logo/logo.svg';
import Input from "../../components/input";
import Button from '../../components/button';
import './styles.css';
import { auth } from '../../libs/firebase';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  console.log(auth);
  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
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
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          setIsAuthenticated(true);
          localStorage.setItem('is_authenticated', JSON.stringify(true));
          console.log(auth);

          Swal.fire({
            icon: 'success',
            title: 'Login realizado com sucesso.',
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
        text: 'Senha ou email incorretos ou usuário não cadastrado.',
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
            title: 'Login realizado com sucesso.',
            showConfirmButton: false,
            timer: 1500,
          });

          navigate('/home');
          console.log(auth);
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
      <form onSubmit={handleLogin}>
        <div className='content'>
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
            Text="Entrar"
            onClick={handleLogin}
            styleType="button-default"
          />
          <Button
            Text="Entrar com o Google"
            onClick={handleLoginGoogle}
            styleType="button-google"
          />
          <label className='label'>
            Não tem uma conta?
            <strong>
              <a className='link' href="/signup">&nbsp; Registre-se</a>
            </strong>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Login;