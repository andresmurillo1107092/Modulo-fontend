let parametro1 = 10;
let parametro2 = 20;

console.log("La suma es: " + (parametro1 + parametro2));
console.log("La resta es: " + (parametro1 - parametro2));
console.log("La multiplicacion es: " + (parametro1 * parametro2));
console.log("La division es: " + (parametro1 / parametro2));
console.log("El modulo es: " + (parametro1 % parametro2));
console.log("La potencia es: " + (parametro1 ** parametro2));
console.log("El incremento es: " + (++parametro1));
console.log("El decremento es: " + (--parametro2));
console.log("La igualdad es: " + (parametro1 == parametro2));
console.log("La desigualdad es: " + (parametro1 != parametro2));
console.log("La igualdad estricta es: " + (parametro1 === parametro2));
console.log("La desigualdad estricta es: " + (parametro1 !== parametro2));  

console.log("el parametro1 es:" + (parametro1 > parametro2 ? "mayor" : "menor"));
console.log("el parametro2 es:" + (parametro2 < parametro1 ? "mayor" : "menor"));
console.log("el parametro1 es:" + (parametro1 >= parametro2 ? "mayor o igual" : "menor"));
console.log("el parametro2 es:" + (parametro2 <= parametro1 ? "mayor o igual" : "menor"));
console.log("el parametro1 es:" + (parametro1 == parametro2 ? "igual" : "diferente"));
console.log("el parametro2 es:" + (parametro2 === parametro1 ? "igual" : "diferente"));
console.log("el parametro1 es:" + (parametro1 != parametro2 ? "diferente" : "igual"));
console.log("el parametro2 es:" + (parametro2 !== parametro1 ? "diferente" : "igual"));

let edad = 25;

console.log("La edad es:" + (edad > 18 && edad < 60 ? "Es mayor de edad y menor de 65 años" : "No es mayor de edad o es mayor de 60 años"));
console.log("La edad es:" + (edad < 18 || edad > 60 ? "No es mayor de edad o es mayor de 60 años" : "Es mayor de edad y menor de 65 años"));
console.log("La edad es:" + (!(edad < 18) ? "Es mayor de edad y menor de 65 años" : "No es mayor de edad o es mayor de 60 años"));

let numero = "";
let numero3 = 15;

if(numero3 < 10 && numero3 < 20){
    console.log("numero 3 esVerdadero");
} else {
    console.log(" numero 3 es Falso");
}

// while mientras se cumpla la condicion se ejecuta el bloque de codigo
let contador = 0;
while(contador < 15){
    console.log("fronted");
    contador = contador + 1;

}   

//for se ejecuta un bloque de codigo un numero determinado de veces
for(let i = 0; i < 5; i++){
    console.log("Desarrollo web");
}


let multiplicador = 9 ;

for(let i = 0; i < 11; i++){
    console.log(multiplicador + " x " + i + " = " + (multiplicador * i));
}

// concatenacion de cadenas de texto
let nombre = "Pachito";
let apellido = "Eche";
console.log("Hola mi nombre es " + nombre + " " + apellido);
console.log("hola mi nombre es " + nombre,apellido);
console.log(`Hola mi nombre es ${nombre} ${apellido}`);//clean code
