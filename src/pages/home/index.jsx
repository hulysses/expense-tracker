// import { auth } from '../../libs/firebase';
import './styles.css'
import NavBar from '../../components/navBar';

export default function Home() {
    return (
        <div>
            <NavBar />
            <div className="home-container">
                <header className="home-header">
                    <h2>Gerenciador de Orçamentos </h2>
                    <p>Organize sua vida financeira de forma simples e eficiente!</p>
                </header>
                <section className="home-content">
                    <div className="feature">
                        <h2>Controle suas finanças</h2>
                        <p>Adicione e gerencie suas receitas e despesas em poucos cliques.</p>
                    </div>
                    <div className="feature">
                        <h2>Visualize gráficos</h2>
                        <p>Acompanhe suas finanças com gráficos e resumos visuais.</p>
                    </div>
                    <div className="feature">
                        <h2>Fácil de usar</h2>
                        <p>Simples, intuitivo e acessível em qualquer dispositivo.</p>
                    </div>
                </section>
                <footer className="home-footer">
                    <button className="get-started-button">Comece agora</button>
                </footer>
            </div>
        </div>
    );
}