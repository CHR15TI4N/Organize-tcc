import "../css/CadCursoTurma.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const CadCursoTurma = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
  
    const [cursos, setCursos] = useState([]);
    const [selectCurso, setSelectCurso] = useState("");
    const [ds_curso, setDs_curso] = useState("");
    const [ds_turma, setDs_turma] = useState("");
    const [error, setError] = useState(false);
    const [nr_anoletivo, setNr_anoletivo] = useState("");
  
    const buscarCurso = useCallback(async () => {
      try {
        const response = await axios.get("http://localhost:8080/consulta-curso", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.cursos;
        console.log(data)
        if (Array.isArray(data)) {
          setCursos(data);
        } else {
          console.error("Formato inexperado do respose de curso", data);
          setCursos([]);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    }, [token]);
  
    useEffect(() => {
      if (!isAuthenticated()) {
        navigate("/login");
      } else {
        buscarCurso();
      }
    }, [isAuthenticated, navigate, buscarCurso]);
  
    const handleSetCurso = (event) => {
      setSelectCurso(event.target.value);
    };
  
    const handleChangeCurso = (event) => {
        setDs_curso(event.target.value);
    };

    const handleChangeTurma = (event) => {
        const {name,value} = event.target
        switch (name) {
          case "ds_turma":
            setDs_turma(value);  
            break;
          case "nr_anoletivo":
            const isNumeric = /^[0-9]*$/.test(value);
  
            if (!isNumeric) {
              setError('Ano letivo deve conter apenas números!');
            } else if (value.length !== 4) {
                setError('Ano letivo deve ter exatamente 4 caracteres!');
            } else {
                setError('');
            }
            if (isNumeric) {
                setNr_anoletivo(value);
                console.log(ds_turma)
            }
            break;
          default:
            break;
        }
    };
  
    const handleCadastroCurso = async () => {
      const payload = {
        ds_curso: ds_curso,
      };
      try {
        const response = await axios.post("http://localhost:8080/curso", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDs_curso('');
        window.location.reload();
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
  
    const handleCadastroTurma = async () => {
      const payload = {
        ds_turma: ds_turma,
        nr_anoletivo: Number(nr_anoletivo),
        curso:{
            id_curso: Number(selectCurso)
        }
      };
      try {
        const response = await axios.post("http://localhost:8080/turma", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDs_turma('');
        setNr_anoletivo('');
        setSelectCurso('');
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
  
    return (
      <Layout title="Cadastro de Curso/Turma" icon={faBarsStaggered} next="disciplina">
        <form className="ajustes-cursoturma">
            <div>
                <label className="titulo-inputs-cursoturma-title">Curso</label>
                <label className="titulo-inputs-cursoturma">Nome do Curso</label>
                <div className="grid_cursoturma">
                <input
                    className="input-cursoturma"
                    type="text"
                    name="ds_curso"
                    value={ds_curso}
                    onChange={handleChangeCurso}
                    required
                />
                <button
                    className="adiciona-cursoturma"
                    type="button"
                    onClick={handleCadastroCurso}
                >
                    Gravar
                </button>
                </div>
            </div>
          <div>
            <div>
                <label className="titulo-inputs-cursoturma-title">Turma</label>
                <label className="titulo-inputs-cursoturma">Curso</label>
                <select
                className="select-cursoturma"
                id=""
                name="id_curso"
                value={selectCurso}
                onChange={handleSetCurso}
                required
                >
                <option value="">Selecione um curso</option>
                {cursos.map((curso) => (
                    <option
                        key={curso.id_curso}
                        value={curso.id_curso}
                    >
                        {curso.ds_curso}
                    </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="titulo-inputs-cursoturma">Ano Letivo</label>
                <div className="grid_cursoturma">
                <input
                    className="input-cursoturma"
                    type="text"
                    name="nr_anoletivo"
                    value={nr_anoletivo}
                    onChange={handleChangeTurma}
                    required
                />
                </div>
            </div>
            <div>
                <label className="titulo-inputs-cursoturma">Descrição da Turma</label>
                <div className="grid_cursoturma">
                <input
                    className="input-cursoturma"
                    type="text"
                    name="ds_turma"
                    value={ds_turma}
                    onChange={handleChangeTurma}
                    required
                />
                <button
                    className="adiciona-cursoturma"
                    type="button"
                    onClick={handleCadastroTurma}
                >
                    Gravar
                </button>
                </div>
                <text className="error-cursoturma">{error}</text>
            </div>
           </div>
        </form>
      </Layout>
    );
}

export default CadCursoTurma;