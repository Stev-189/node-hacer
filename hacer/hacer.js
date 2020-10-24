const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = _ => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(`db/data.json`, data, e => {
        if (e) throw new Error(`No se puedo guardar los datos`, e)
    })
}

const cargarDB = _ => {
    try {
        listadoPorHacer = require('../db/data.json'); // carga archvio json y automatica lo parsea
    } catch (error) {
        listadoPorHacer = [];
    }
}
const getListado = _ => {
    cargarDB()
    return listadoPorHacer;
};

const crear = (descripcion) => {
    cargarDB()
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(e => e.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(e => e.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
    //F2 como lo hiso el profe
    // let nuevoListado=listadoPorHacer.filter(e=>{
    // return e.descripcion!==descripcion
    // });
    // if (listadoPorHacer.length===nuevoListado.length){
    // return false;
    // } else{
    // listadoPorHacer=nuevoListado;
    // guardarDB();
    // return true;
    // }
}

module.exports = { crear, guardarDB, getListado, actualizar, borrar }