import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula.service';
import { Pelicula } from 'src/app/models/pelicula';

@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {

  public titulo: String;
  public peliculas: Pelicula[];
  public favorita!: Pelicula;
  public fecha: any;

  constructor(
    private _peliculaService: PeliculaService
  ) {
    this.titulo = "Componente Peliculas";
    this.peliculas = this._peliculaService.getPeliculas();
    this.fecha = new Date(2020, 8, 12);
  }

  ngOnInit(): void {
    console.log(this.peliculas);
    console.log("Componente Iniciado!!");
    console.log(this._peliculaService.holaMundo());
  }

  ngDoCheck(): void {
    console.log("DOCHECK LANZADO");
  }

  cambiarTitulo() {
    this.titulo = "El titulo ha sido cambiado";
  }

  ngOnDestroy(): void {
    console.log("EL COMPONENTE SE VA A ELIMINAR");
  }

  mostrarFavorita(event: any) {
    this.favorita = event.pelicula;
  }

}
