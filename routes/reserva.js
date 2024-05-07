const express = require("express");
const {
    listarReservas,
    buscarReservaId,
    gravarReserva,
    alterarReserva,
    deletarReserva,
} = require("../database/reserva");
const {buscarSalaId} = require("../database/sala");
const {buscarTurmaId} = require("../database/turma");
const {buscarUsuarioId} = require("../database/usuario");
const {buscarStatusId} = require("../database/status");
const router = express.Router();
const {auth} = require("../middleware/auth");
const {formatarDataISO} = require("../transformarData");
const prisma = require("../database/prisma");

router.get("/reserva", async (req,res) => {
    const reservas = await listarReservas()
    res.json({
        reservas,
    });
    console.log('Consulta realizada na tabela Reserva.')
});

router.get("/reserva/:id", async (req,res) => {
    const id = Number(req.params.id);
    const reserva = await buscarReservaId(id)

    console.log(reserva)

    if(!reserva){
        return res.status(404).json({error:"Reserva não encontrada!"});
    }

    res.json({reserva : reserva});
    console.log('Consulta realizada na tabela reserva, com o id: ' + id)
});

router.post("/reserva", auth, async (req,res) => {
    try{
        const sala = req.body.sala;
        const salaExiste = await buscarSalaId(sala.id_sala)

        if(!salaExiste){
          return res.status(404).json({ error: "Sala não encontrada!" });
        }

        const turma = req.body.turma;
        const turmaExiste = await buscarTurmaId(turma.id_turma)
    
        if(!turmaExiste){
          return res.status(404).json({ error: "Turma não encontrada!" });
        }

        const usuario = req.body.usuario;
        const usuarioExiste = await buscarUsuarioId(usuario.id_usuario)
        
        if(!usuarioExiste){
          return res.status(404).json({ error: "Usuario não encontrado!" });
        }
        
        const status = req.body.status
        const statusExiste = await buscarStatusId(status.cd_status)
        
        if(!statusExiste){
          return res.status(404).json({ error: "Status não encontrado!" });
        }
        //VALIDAÇÕES
        const grade = await prisma.grade.findMany({
            where: {turma_id:turmaExiste.id_turma}
        })

        console.log(grade);
        //END VALIDAÇÕES

        const dt_inicioForm = formatarDataISO(req.body.dt_inicio);
        const dt_fimForm = formatarDataISO(req.body.dt_fim);

        const reserva = {
            dt_inicio:      dt_inicioForm,
            dt_fim:         dt_fimForm,
            ds_observacao:  req.body.ds_observacao,
            status_cd:      status.cd_status,
            sala_id:        sala.id_sala,   
            turma_id:       turma.id_turma,
            usuario_id:     usuario.id_usuario,
        }
        const reservaSalva = await gravarReserva(reserva);

        res.json({
            reserva: reservaSalva,
        });
        console.log('Gravação realizada na tabela Reserva')
    }catch (error){
        console.error('Erro ao gravar Reserva:'+ error);
        res.status(500).json({message:"Server Error"});
    }
})

router.put("/reserva/:id", auth, async (req,res) => {
    try{

        const id = Number(req.params.id);
        const reservaExiste = await buscarReservaId(id);
        
        if(!reservaExiste){
            return res.status(404).json({error:"Reserva não encontrada!"});
        }

        const sala = req.body.sala;
        const salaExiste = await buscarSalaId(sala.id_sala)
    
        if(!salaExiste){
          return res.status(404).json({ error: "Sala não encontrada!" });
        }

        const turma = req.body.turma;
        const turmaExiste = await buscarTurmaId(turma.id_turma)
    
        if(!turmaExiste){
          return res.status(404).json({ error: "Turma não encontrada!" });
        }

        const usuario = req.body.usuario;
        const usuarioExiste = await buscarUsuarioId(usuario.id_usuario)
    
        if(!usuarioExiste){
          return res.status(404).json({ error: "Usuario não encontrado!" });
        }
        
        const status = req.body.status
        const statusExiste = await buscarStatusId(status.cd_status)
        
        if(!statusExiste){
          return res.status(404).json({ error: "Status não encontrado!" });
        }

        const dt_inicioForm = formatarDataISO(req.body.dt_inicio);
        const dt_fimForm = formatarDataISO(req.body.dt_fim);

        const reserva = {
            dt_inicio:      dt_inicioForm,
            dt_fim:         dt_fimForm,
            ds_observacao:  req.body.ds_observacao,
            status_cd:      status.status_cd,
            sala_id:        sala.id_sala,   
            turma_id:       turma.id_turma,
            usuario_id:     usuario.id_usuario,
        }
        
        const reservaAlterada = await alterarReserva(id, reserva);
        res.json({
            reserva: reservaAlterada
        })
        console.log('Alteração realizada na tabela reserva, com o id: ' + id);
    }catch (error) {
        console.error("Erro ao alterar reserva:" + error);
        res.status(500).json({ message: "Server Error" });
    }
    })

router.delete("/reserva/:id", auth, async (req,res) => {
    try{
        const id = Number(req.params.id);
        const reservaExiste = await buscarReservaId(id);
        
        if(!reservaExiste){
            return res.status(404).json({error:"Reserva não encontrada!"});
        }
        
        await deletarReserva(id);
        console.log('Deletada reserva com o id: ' + id);
        return res.status(200).json({ message: "Reserva deletada com sucesso!" });
    }catch (error) {
        console.error("Erro ao deletar sala:" + error);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = {
    router
}