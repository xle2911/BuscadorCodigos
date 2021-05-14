import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-show-codes',
  templateUrl: './show-codes.component.html'
})
export class ShowCodesComponent implements OnInit {

// declaro los dos array que contendran la informacion
  validos: string[] = [];
  invalidos: string[] = [];

  constructor( private _codes:ServicioService ) {

    // como ya habia usado comunicacion padre hijo en el otro elemento en este muestro comunicacion a travez de un servicio
    // primero muestro la información que viene del servicio
    this.getBusquedas();
    // luego cada vez que en el servicio se cambian los datos este emite un evento que es recivido aqui
    // y dispara el metodo getBusquedas para actualizar los datos
    _codes.$emitter.subscribe(() => {
      this.getBusquedas();
    });
  }

  ngOnInit(): void {
  }

  getBusquedas(){
    this.validos = this._codes.getFinds().bien;
    this.invalidos = this._codes.getFinds().mal;
  }

}
