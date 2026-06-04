//Parte 1 completar los datos
let miNombre = "Andres Felipe Murillo";
let miEdad = 30 + " " + "años";
let misCalificaciones = [5.0, 4.5, 3.0, 4.0, 5.0];
let soyPremiado = false;
console.log(miNombre, miEdad, misCalificaciones, soyPremiado);

//Parte 2 Operadores y calculos

//funcion 1 calcular Promedio
function calcularPromedio(misCalificaciones){
let suma =0;
for(let i=0; i<misCalificaciones.length; i++){
suma += misCalificaciones[i];
}
return suma / misCalificaciones.length;
}
console.log("Mi promedio es:", calcularPromedio(misCalificaciones));

//funcion 2 verificar si aprobo
const notaMinima = 3.0;
function aprobo(calcularPromedio){
if(calcularPromedio >= notaMinima){
return "Aprobado";
}else{
return "Reprobado";}
}
console.log("Estado:", aprobo(calcularPromedio(misCalificaciones)));

//Funcion 3 Años para graduarse
const duracionCarrera = 4;
let añoActual = new Date().getFullYear();
function calcularañosparaGraduarse(miEdad){
return añoActual + (duracionCarrera);
}
console.log("Año de graduacion:", calcularañosparaGraduarse(miEdad));

//Parte 3 Condicionales
function evaluarDesempeño(calcularPromedio){
if(calcularPromedio >= 4.0){
return "Excelente";
}else if(calcularPromedio >= 3.5){
return "Bueno";
}else if(calcularPromedio >= 3.0){
return "Regular";
}else{
return "Deficiente";}}
console.log("Mi desempeño es :", evaluarDesempeño(calcularPromedio(misCalificaciones)));

//Parte 4 Bucles for
function mostrarCalificaciones(misCalificaciones){
for(let i=0; i<misCalificaciones.length; i++){
console.log("Corte"+" "+(i+1) +": "+ misCalificaciones[i]);}}
mostrarCalificaciones(misCalificaciones);

//Desafio extra
let estudiantes = [
    { nombre: "Juan", calificaciones: [4.2, 4.5, 4.8, 4.0, 4.3] },
    { nombre: "María", calificaciones: [3.5, 3.8, 3.9, 3.6, 3.7] },
    { nombre: "Pedro", calificaciones: [4.7, 4.9, 4.8, 5.0, 4.6] }
];
function calcularPromedioEstudiantes(estudiantes){
    let promedios = [];
    for(let i = 0; i < estudiantes.length; i++){
        let estudiante = estudiantes[i];
        let suma = 0;
        for(let j = 0; j < estudiante.calificaciones.length; j++){
            suma += estudiante.calificaciones[j];
        }
        let promedio = suma / estudiante.calificaciones.length;
        promedios.push({ nombre: estudiante.nombre, promedio: promedio });
    }
    return promedios;
}

//Contar cuantos estudiantes aprobaron con nota minima de >= 3.0
function contarAprobados(estudiantes){
    let contador = 0;   
    for(let i = 0; i < estudiantes.length; i++){
        let estudiante = estudiantes[i];
        let suma = 0;
        for(let j = 0; j < estudiante.calificaciones.length; j++){
            suma += estudiante.calificaciones[j];
        }
        let promedio = suma / estudiante.calificaciones.length;
        if(promedio >= 3.0){
            contador++;}}    return contador;}

//calcular promedio general del grupo
function calcularPromedioGeneral(estudiantes){
    let sumaTotal = 0;
    let totalCalificaciones = 0;
    for(let i = 0; i < estudiantes.length; i++){
        let estudiante = estudiantes[i];
        for(let j = 0; j < estudiante.calificaciones.length; j++){
            sumaTotal += estudiante.calificaciones[j];
            totalCalificaciones++;}}
    return sumaTotal / totalCalificaciones;
}   

//encontrar estudiante con la calificacion mas alta
function encontrarEstudianteConCalificacionMasAlta(estudiantes){
    let calificacionMaxima = 0;
    let estudianteConCalificacionMaxima = null;
    for(let i = 0; i < estudiantes.length; i++){
        let estudiante = estudiantes[i];
        for(let j = 0; j < estudiante.calificaciones.length; j++){
            if(estudiante.calificaciones[j] > calificacionMaxima){
                calificacionMaxima = estudiante.calificaciones[j];
                estudianteConCalificacionMaxima = estudiante;
            }
        }
    }
    return estudianteConCalificacionMaxima;
}


console.log("Promedios de los estudiantes:", calcularPromedioEstudiantes(estudiantes));
console.log("Cantidad de estudiantes aprobados:", contarAprobados(estudiantes));
console.log("Promedio general del grupo:", calcularPromedioGeneral(estudiantes).toFixed(2));
console.log("Estudiante con calificación más alta:", encontrarEstudianteConCalificacionMasAlta(estudiantes));
