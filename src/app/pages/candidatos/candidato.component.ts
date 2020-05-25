import { Component, OnInit } from '@angular/core';
import { Candidato } from '../../models/candidato.model';
import { CandidatoService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-candidato',
  templateUrl: './candidato.component.html',
  styleUrls: ['./candidato.component.scss']
})
export class CandidatoComponent implements OnInit {

  empresas: Empresa[] = [];
  candidato: Candidato = new Candidato('', '', '', '', '');
  empresa: Empresa = new Empresa('');

  constructor(
    public _candidatoService: CandidatoService,
    public _empresaService: EmpresaService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarCandidato( id );
      }

    });

  }

  ngOnInit() {

    this._empresaService.cargarEmpresas()
          .subscribe( empresas => this.empresas = empresas );

    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.candidato.img = resp.candidato.img;
          });

  }

  cargarCandidato( id: string ) {
    this._candidatoService.cargarCandidato( id )
          .subscribe( candidato => {

            console.log( candidato );
            this.candidato = candidato;
            this.candidato.empresa = candidato.empresa._id;
            this.cambioEmpresa( this.candidato.empresa );
          });
  }

  guardarCandidato( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._candidatoService.guardarCandidato( this.candidato )
            .subscribe( candidato => {

              this.candidato._id = candidato._id;

              this.router.navigate(['/candidato', candidato._id ]);

            });

  }

  cambioEmpresa( id: string ) {

    this._empresaService.obtenerEmpresa( id )
          .subscribe( empresa => this.empresa = empresa );

  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'candidatos', this.candidato._id );

  }


}
