import axios from "axios";
import Layout from "../components/Layout";
import "../consCss/ConsReserva.css";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConsReserva = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [reservas, setReservas] = useState([]);

    const [tp_filtro, setTp_filtro] = useState("");
    const [dt_filtro, setDt_filtro] = useState("");
    const [ds_filtro, setDs_filtro] = useState("");

const consultaReserva = useCallback(async () =>{
    try{
        const response = await axios.get("http://localhost:8080/reserva", {
            headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.reservas;
        setReservas(data);
        }catch(error){
            console.error(error)
        }
    }, [token]);

    useEffect(() => {
        if (!isAuthenticated()) {
        navigate("/login");
        } else {
        consultaReserva();
        }
    }, [isAuthenticated, navigate, consultaReserva]);

    const handleSetTipoFiltro = (event) =>{
        setTp_filtro(event.target.value)
    }

    const handleClearFiltro = () => {
        setTp_filtro("");
        setDt_filtro("");
        setDs_filtro("");
    }

    const handleChange = (event) =>{
        const {name,value} = event.target
        switch(name){
            case "dt_filtro":
                setDt_filtro(value);
                break;
            case "ds_filtro":
                setDs_filtro(value);
                break;
            default:
                break;
        }
    }

    return (
       <Layout title='Consulta da Reserva' noicon>
        <div className="ajustes-consulta-reserva">
            <div className="conteudo-consulta-reserva">
                <div className="grid-cons-reserva">
                    <select 
                        className="select-consulta-reserva" 
                        name="Tipo Filtro" 
                        value={tp_filtro}
                        onChange={handleSetTipoFiltro}
                        id="tp_filtro"
                    >
                        <option value="Tipos" selected hidden>Selecione o tipo</option>
                        <option value="tp_idReserva" >Nr Reserva</option>
                        <option value="tp_nmSala" >Sala</option>
                        <option value="tp_nmUsuario" >Usuário</option>
                        <option value="tp_dsCurso" >Curso</option>
                        <option value="tp_dtReserva" >Data</option>
                        <option value="tp_stReserva" >Status</option>
                    </select>
                    <input 
                        disabled={!tp_filtro || tp_filtro !== 'tp_dtReserva'}
                        className="inputs-data-reserva"
                        type="date"     
                        name="dt_filtro"     
                        id=""
                        value={dt_filtro}
                        onChange={handleChange}
                    />
                    <input 
                        disabled={!tp_filtro || tp_filtro === 'tp_dtReserva'}
                        className="inputs-consulta-reserva"
                        type="search" 
                        name="ds_filtro" 
                        placeholder="Pesquise de acordo com o tipo"
                        value={ds_filtro}
                        onChange={handleChange}
                        id="" 
                    />
                    <button disabled={!tp_filtro} className={`botao-consulta-reserva ${!tp_filtro ? 'disabled-hover' : ''}`} type="button">Pesquisar</button>
                    <button className="botao-limpa-filtro" type="button" onClick={handleClearFiltro}><FontAwesomeIcon icon={faX} /></button>
                </div>
                <div className="tabela">
                    <table>
                        <thead className="cabecalho">
                            <tr>
                                <th className="colunas-cabecalho">Nr Reserva</th>
                                <th className="colunas-cabecalho">Sala</th>
                                <th className="colunas-cabecalho">Usuário</th>
                                <th className="colunas-cabecalho">Turma - Curso</th>
                                <th className="colunas-cabecalho">Início</th>
                                <th className="colunas-cabecalho">Fim</th>
                                <th className="colunas-cabecalho">Status</th>
                                <th className="colunas-cabecalho">Observação</th>
                            </tr>
                        </thead>
                        <tbody className="contudo-tabela">
                            {reservas.map((reserva) => (
                                <tr key={reserva.id_reserva}>
                                <td className="colunas-body">{reserva.id_reserva}</td>
                                <td className="colunas-body"><button className="button-coluna-body">{reserva.sala.nm_sala}</button></td>
                                <td className="colunas-body"><button className="button-coluna-body">{reserva.usuario.nm_usuario}</button></td>
                                <td className="colunas-body"><button className="button-coluna-body">{reserva.grade.turma.ds_turma} - {reserva.grade.turma.curso.ds_curso}</button></td>
                                <td className="colunas-body">{new Date(reserva.dt_inicio).toLocaleString('default', { dateStyle: 'short', timeStyle: 'short', timeZone: 'UTC'}).replace(",","")}</td>
                                <td className="colunas-body">{new Date(reserva.dt_fim).toLocaleString('default', { dateStyle: 'short', timeStyle: 'short', timeZone: 'UTC'}).replace(",","")}</td>
                                <td className="colunas-body">{reserva.status.ds_status}</td>
                                <td className="colunas-body">{reserva.ds_observacao}</td>
                                <td className="colunas-body" style={{background: "#003d99"}}><button className="btn-editar">Editar</button></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>           
        </div>
       </Layout>
    );
}

export default ConsReserva;