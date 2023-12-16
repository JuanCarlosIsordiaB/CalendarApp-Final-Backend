const {response} = require('express');
const Evento = require('../models/Evento');

const getEventos = async(req, res = response) => {

    //Regresa todos los eventos
    const eventos = await Evento.find()
                                    .populate('user','name'); //Datos que trae

    res.json({
        ok:true,
        msg: 'getEventos',
        eventos    
    })
    
}
const crearEventos = async(req, res = response) => {
   
    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;
        
        const eventoGuardado= await evento.save();
        res.json({
            ok:true,
            user: evento.user,
            msg: 'crearEventos',
            evento: eventoGuardado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'No se pudo crear el evento'
        })
    }

    

}
const actualizarEventos = async(req, res = response) => {
    
    const eventoId = req.params.id; //sacaamos id de donde viene el evento a actualizar
    const  uid  = req.uid;

    try {

        const evento = await Evento.findById(eventoId); //Verificamos que el evento exista

        //Si no existe el evento
        if(!evento){
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe port id'
            })
        }

        //Si otro usuario quiere actualizar el evento de alguien mas
       if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No es posible editar el evento'
            })
        }

        //Si llega a este punto es por que es la misma perosna que creo el evento
        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        //evento a actualizar | nuevo evento
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new:true});

        res.json({
            ok: true,
            evento: eventoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo actualizar el evento'
        })
    }
    

}
const eliminarEvento = async (req, res=response) => {
    
    const eventoId = req.params.id; 
    const uid  = req.uid;

    try {

        const evento = await Evento.findById(eventoId); //Verificamos que el evento exista

        //Si no existe el evento
        if(!evento){
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe port id'
            })
        }

        //Si otro usuario quiere actualizar el evento de alguien mas
       if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No es posible editar el evento'
            })
        }

        //evento a eliminar
        await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
            msg: 'Se ha eliminado Correctamente'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo actualizar el evento'
        })
    }
}

module.exports = {
    getEventos,
    crearEventos,
    actualizarEventos,
    eliminarEvento
}