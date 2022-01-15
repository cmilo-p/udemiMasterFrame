import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {

  public nombre: string;
  public apellidos: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.nombre = "";
    this.apellidos = "";
  }

  ngOnInit(): void {

    //método subscribe() es un observable que puede recoger los datos del servicio en el cual se utiliza, funciona como callback
    this._route.params.subscribe((params: Params) => {
      this.nombre = params['nombre'];
      this.apellidos = params['apellidos'];
    });
  }

  redireccion() {
    //el método navigate() redirecciona a otro componente o sector de la página / navigate(URL, PARAMETR1, PARAMETR2, ...)
    this._router.navigate(['/pagina-de-pruebas', 'Victor', 'Robles Web']);
  }

}
