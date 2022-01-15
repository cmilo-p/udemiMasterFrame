import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';

@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {

  public titulo: String;
  public peliculas: Pelicula[];

  constructor() {
    this.titulo = "Componente Peliculas";
    this.peliculas = [
      new Pelicula("Spiderman 4", 2019, ""),
      new Pelicula("Los Vengadores EndGame", 2018, ""),
      new Pelicula("Batman vs Superman", 2015, ""),
      new Pelicula("Batman 2", 2011, "")
    ]
  }

  ngOnInit(): void {
    console.log(this.peliculas);
    console.log("Componente Iniciado!!");
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

}
