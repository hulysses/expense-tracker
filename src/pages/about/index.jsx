import React from 'react';
import './styles.css'; 
import  FototPerifl from '../../assets/images/fotoPerfil.jpg'
import NavBar from '../../components/navBar';

export default function Sobre() {
    return (
        <div>
            <NavBar />
            <div className="sobre-container">
                <header className="sobre-header">
                    <h2>Sobre o Projeto</h2>
                </header>
                <section className="sobre-content">
                    <img src={FototPerifl} alt="Hulysses Danciger" className="profile-image" />
                    <h2>Autor</h2>
                    <p>Este projeto foi criado por <strong>Hulysses Danciger Magalhães Fogaça</strong>, durante o 6º período do curso de Engenharia de Software no Centro Universitário FAG, como parte da matéria de Programação Web.</p>
                    
                    <div className="links">
                        <h2>Conecte-se</h2>
                        <p>
                            <a href="https://www.linkedin.com/in/hulysses/" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
                            <a href="https://github.com/Hulysses" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
