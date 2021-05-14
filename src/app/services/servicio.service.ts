import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  $emitter = new EventEmitter;

  // array de strings para los parametros encontrados
  private bien: string[] = [];
  // array de strings para los parametros no encontrados
  private mal: string[] = [];

  codesURL: string = 'http://demo4651719.mockable.io/array';

  constructor(public http:HttpClient) { }

  getCodes(){
    return this.http.get( this.codesURL );
  }

  getFinds(){
    return {
      bien: this.bien,
      mal: this.mal
    }
  }

  setFinds(bien: string[], mal: string[]){
    this.bien = bien;
    this.mal = mal;
    this.$emitter.emit();
  }
}
