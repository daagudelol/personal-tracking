import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Candidato } from '../../models/candidato.model';

import { Observable } from 'rxjs';

import { map, catchError, timeout, switchAll } from 'rxjs/operators';
import  swal from 'sweetalert';

//import 'rxjs/add/operator/map'


@Injectable()
export class CandidatoService {

  totalCandidatos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarCandidatos() {

    let url = URL_SERVICIOS + '/candidato';

    return this.http.get( url )
              .pipe(map( (resp: any) => {

                this.totalCandidatos = resp.total;
                return resp.candidatos;
              }));

  }

  cargarCandidato( id: string ) {

    let url = URL_SERVICIOS + '/candidato/' + id;

    return this.http.get( url )
              .pipe(map( (resp: any) => resp.candidato ));

  }

  buscarCandidatos( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/candidatos/' + termino;
    return this.http.get( url )
                .pipe(map( (resp: any) => resp.candidatos ));

  }

  borrarCandidato( id: string ) {

    let url = URL_SERVICIOS + '/candidato/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .pipe(map( resp => {
                swal( 'Candidato Borrado', 'Candidato borrado correctamente', 'success' );
                return resp;
              }));

  }

  guardarCandidato( candidato: Candidato ) {

    let url = URL_SERVICIOS + '/candidato';

    if ( candidato._id ) {
      // actualizando
      url += '/' + candidato._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, candidato )
                .pipe( map( (resp: any) => {
                  swal('Candidato Actualizado', candidato.nombre, 'success');
                  return resp.candidato;

                }));

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, candidato )
              .pipe( map( (resp: any) => {
                swal('Candidato Creado', candidato.nombre, 'success');
                return resp.candidato;
              }));
    }




  }

}
