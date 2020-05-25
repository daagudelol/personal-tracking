import { Component, OnInit } from '@angular/core';
import { Candidato } from '../../models/candidato.model';
import { CandidatoService } from '../../services/service.index';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss']
})
export class CandidatosComponent implements OnInit {

  candidatos: Candidato[] = [];

  constructor(
    public _candidatoService: CandidatoService
  ) { }

  ngOnInit() {
    this.cargarCandidatos();
  }

  cargarCandidatos() {
    this._candidatoService.cargarCandidatos()
          .subscribe( candidatos => this.candidatos = candidatos );
  }

  buscarCandidato( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarCandidatos();
      return;
    }

    this._candidatoService.buscarCandidatos( termino )
            .subscribe( candidatos =>  this.candidatos = candidatos );
  }

  borrarCandidato( candidato: Candidato ) {

    this._candidatoService.borrarCandidato( candidato._id )
            .subscribe( () =>  this.cargarCandidatos() );

  }

}
