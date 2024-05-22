import '../css/HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faFloppyDisk, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeaderComponents from '../components/HeaderComponents';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { useEffect } from 'react';

const HomePage = () => {
    const {isAuthenticated} = useAuth();

    const navigate = useNavigate()

    useEffect(() => {
        if(!isAuthenticated()){
            navigate('/login')
        }
    },[isAuthenticated, navigate])

    const handleCadastro = (cadastros) => {
        navigate(`/cadastro-${cadastros}`)
    }

    const handleReserva = (acao) => {
        navigate(`/${acao}-reserva`)
    }
    return (
        <div>
            <HeaderComponents/>
            <body className='body-home'>
                <div className='grid-principal'>
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faFloppyDisk} style={{color: "#ffffff",}} size='3x'/>
                            <p className='titulos-home'>Cadastro</p>
                            <div className='btn-gerais scrollable'>
                            {/* <div className='btn-gerais'> */}
                                <button className='btn' type="button" onClick={() => handleCadastro('municipio')}>Município</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('instituicao')}>Instituição</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('polo')}>Polo</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('bloco')}>Bloco</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('sala')}>Sala</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('materiais')}>Materiais</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('usuarios')}>Usuários</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('curso')}>Curso</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('disciplina')}>Disciplina</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('turma')}>Turma</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('grade')}>Grade</button>
                            </div>
                        </div>
                    </div>
                    <div className='item-da-grid'>
                        <div className='interior'>  
                            <FontAwesomeIcon icon={faMagnifyingGlass} size='3x'/>
                            <p className='titulos-home'>Consulta</p>
                            <div className='btn-gerais scrollable'>
                                <button className='btn' type="button">Instituição</button>
                                <button className='btn' type="button">Polo</button>
                                <button className='btn' type="button">Bloco</button>
                                <button className='btn' type="button">Sala</button>
                                <button className='btn' type="button">Materiais</button>
                                <button className='btn' type="button">Usuários</button>
                            </div>
                        </div>
                    </div>
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faCalendarDays} size='3x'/>
                            <p className='titulos-home'>Reserva</p>
                            <div className='btn-gerais'>
                                <button className='btn' type="button" onClick={() => handleReserva('cadastro')}>Cadastrar</button>
                                <button className='btn' type="button" onClick={() => handleReserva('consulta')}>Consultar</button>
                                <button className='btn' type="button">Relatório</button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default HomePage;