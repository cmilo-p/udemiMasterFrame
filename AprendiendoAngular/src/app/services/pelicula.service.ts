import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  public peliculas: Pelicula[];

  constructor() {
    this.peliculas = [
      new Pelicula("Spiderman 4", 2019, ""),
      new Pelicula("Los Vengadores EndGame", 2018, ""),
      new Pelicula("Batman vs Superman", 2015, ""),
      new Pelicula("Batman 2", 2011, "")
    ];
  }

  holaMundo() {
    return "Hola mundo desde un servicio de Angular!!!"
  }

  getPeliculas() {
    return this.peliculas;
  }




}
