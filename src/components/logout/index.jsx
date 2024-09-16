import React from 'react';
import Swal from 'sweetalert2';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Button from '../button';

const Logout = () => {

  const navigate = useNavigate();

    const handleLogout = () => {
      const auth = getAuth();
      signOut(auth).then(() => {
        Swal.fire({
            icon: 'question',
            title: 'Sair',
            text: 'Deseja sair do sistema?',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
          }).then(result => {
            if (result.value) {
              Swal.fire({
                timer: 1500,
                showConfirmButton: false,
                willOpen: () => {
                  Swal.showLoading();
                },
                willClose: () => {
                  localStorage.setItem('is_authenticated', false);
                  navigate('/');
                },
              });
            }
          });
      }).catch((error) => {
          console.log(error);
      });
  };

  return (
    <Button
      styleType="button-logout" 
      Text="Sair" 
      onClick={handleLogout}
    />
  );
};

export default Logout;