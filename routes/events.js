//CRUD
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEventos, actualizarEventos, eliminarEvento } = require('../controllers/events');
const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos} = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

//Validar todos las peticiones
router.use(validarJWT); //con sto puedes quitar "validarJWT" en la parte de abajo
//validaJWT va a ser global


//Obtener eventos
router.get(
    '/',
    
     getEventos
);

//Crear un nuevo evento 
router.post(
    '/',
    [
        check('title', 'El titlo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es  obligatorio').custom(isDate),
        check('end', 'La fecha final es  obligatorio').custom(isDate),
        validarCampos
    ]
    ,crearEventos
);

//Actualizar un nuevo evento 
router.put('/:id',actualizarEventos);

//Borrar un evento 
router.delete('/:id',eliminarEvento);

module.exports = router;
