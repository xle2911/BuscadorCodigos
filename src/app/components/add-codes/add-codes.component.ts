import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-codes',
  templateUrl: './add-codes.component.html'
})
export class AddCodesComponent implements OnInit {

  // una expreción regular para acelerar la validación
  codeRegExp: RegExp = /^\d{8}$/ ;

  // array de strings para los parametros correctos
  bien: string[] = [];
  // array de strings para los parametros incorrectos
  mal: string[] = [];

  // metodo output para comunicarse con el componente padre y eventemiter para emitir el evento
  @Output() codes = new EventEmitter();

  constructor( private router:Router ) { }

  ngOnInit(): void {
  }

  // metodo de validación de datos, recive un elemento input para manejarlo, podria solo recibir un string tomando
  // el value del elemento input pero para mas adelante puede servir si se quiere manejar el elemento después de la validación.
  buscarCod(input: HTMLInputElement){
    // limpio los arreglos
    this.bien = [];
    this.mal = [];
    // paso el value del input para una variable local para manejarlo más facil
    let busqueda: string = input.value;
    let codigos: string[] = [''];
    let test = '';
    // busco si hay comas, corto el string por las comas y cada parte la guardo en una posición de un array para más facil validación,
    // si no hay comas toda el string pasa a la posición cero del array
    if (busqueda.indexOf(',') >= 0) {
      codigos = busqueda.split(',');
    } else {
      codigos[0] = busqueda;
    }
    // una vez tengo un array con cada código en cada posición recorro cada posición para validar cada código
    codigos.forEach(codigo => {
      // les quito los posibles espacios en blanco que pueda tener despues o antes de la coma y recorro el código carácter
      // por carácter
      let toTest = codigo.trim();
      for (let j = 0; j < toTest.length; j++) {
        // los puntos estan permitidos pero no son necesarios asi que simplemente los quito y paso el código sin puntos
        // a una variable local
        if ( toTest[j] !== '.' ) {
          test += toTest[j]
        }
      }
      // evaluo el código resultante con la expreción regular, solo 8 digitos son validos
      // si es correcto almaceno en el array de códigos correctos
      // sino en el de incorrectos
      if ( this.codeRegExp.test(test) ) {
        this.bien.push(test);
      } else {
        this.mal.push(test);
      }
      // limpio la variable de pruebas para poder almacenar el siguiente codigo en la proxima iteracion
      test = '';
    });
    // muestro todo en consola para validación durante el desarrollo
    console.log('terminos de busqueda');
    console.log(codigos);
    console.log('terminos de busqueda correctos');
    console.log(this.bien);
    console.error('terminos de busqueda incorrectos');
    console.error(this.mal);
    // valido si hubo errores si los hay muestro que el input esta mal con una clase de bootstrap
    if (this.mal.length > 0) {
      input.classList.add('is-invalid');
    } else {
      // si no hay errores muestro que el input fue valido, con una clase de bootstrap
      // emito el evento que va a pasar el array de códigos correctos para el elemento padre
      input.classList.add('is-valid');
      this.codes.emit(this.bien);
    }
    // limpio todos los campos dejando un margen de 2 segundos para mejorar la experiencia de usuario
    setTimeout(() => {
      input.classList.remove('is-invalid', 'is-valid');
      input.value = '';
      // navego a la ruta que muestra los datos
      this.router.navigate( ['/result'] );
    }, 2000);
  }
}
