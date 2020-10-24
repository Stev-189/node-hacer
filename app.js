//const yargs = require('yargs/yargs') //no se que pico pero parse que yargs cambio la forma de trabajo
//const { hideBin } = require('yargs/helpers');
//const { require } = require('yargs');
//const argv = yargs(hideBin(process.argv)).argv;
const argv = require('./config/yargs').argv;
const porHacer = require('./hacer/hacer');
const colors = require('colors');
const { actualizar } = require('./hacer/hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log('********Por Hacer********'.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('************************\n'.green);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado)
        actualizado ?
            console.log(`Datos actualizados`) :
            console.log(`Ocurrio un error`);
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion)
        borrado ?
            console.log(`Datos Borrados`) :
            console.log(`Ocurrio un error`);
        break;
    default:
        console.log('comando no es reconocido.');
        break;
}