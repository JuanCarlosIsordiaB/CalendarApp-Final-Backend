const moment = require('moment');
//moment nos ayuda a verificar de que sea una fecha real

const isDate = ( value ) => {

    if(!value){
        return false;
    }

    const fecha = moment(value);

    if(fecha.isValid()){
        return true;
    }else{
        return false;
    }

}


module.exports = {
    isDate
}