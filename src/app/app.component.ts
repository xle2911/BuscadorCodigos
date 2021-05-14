import { Component } from '@angular/core';
import { ServicioService } from './services/servicio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'buscador';
  codesArray: string[] = [];

  // array de strings para los parametros encontrados
  bien: string[] = [];
  // array de strings para los parametros no encontrados
  mal: string[] = [];

  constructor( private _codes:ServicioService ){

  }

  // simple metodo del elemento padre para recivir el evento con la información del elemento hijo "add-codes"
  checkArticleCodes(codes: string[]){
    // console log para comprobar la comunicación
    console.log('Desde el padre');
    console.log(codes);
    // procesar aquí los datos recibidos
    this._codes.getCodes().subscribe(
      (data) => {
        // si el servicio recive una respuesta de la api se ejecuta esta parte y se procesa la respuesta
        console.log('informacion desde el servicio');
        console.log(data);
        this.codesArray = Object.values(data);
        console.log(this.codesArray);
        console.log(this.codesArray[0][0]);
        this.comparar( codes );
        this._codes.setFinds(this.bien, this.mal);
        this.bien = [];
        this.mal = [];
      },
      (error) => {
        // si hay error en la comunicación se levanta esta alerta, con información al respecto
        console.error(error);
        alert(`ERROR! Un error inesperado ha ocurrido.
        Intentelo de nuevo en unos segundos, si el error se repite,
        contacte a mantenimiento y brindele la siguiente información.
        --------------BUG REPORT--------------
        ${JSON.stringify(error)}`);
      }
    );
  }

  // separo el metodo de comparar para hacer mas legible y escalable el código
  // utilizo indexOf en vez de includes por su compatibilidad con navegadores mas viejos
  comparar( codes: string[] ){
    for (let i = 0; i < codes.length; i++) {
      if (this.codesArray[0].indexOf(codes[i]) >= 0) {
        console.log("valido"+codes[i]);

        this.bien.push(codes[i]);
      } else {
        console.log("invalido"+codes[i]);
        this.mal.push(codes[i]);
      }
    }
  }
}
