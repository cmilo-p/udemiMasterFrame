import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mi-componente',
  templateUrl: './mi-componente.component.html',
  styleUrls: ['./mi-componente.component.css']
})
export class MiComponenteComponent implements OnInit {

  public titulo: string;
  public comentario: string;
  public year: number;
  public mostrarPeliculas: boolean;

  constructor() { 
    console.log("Mi componente cargado");

    this.titulo = "Hola Mundo, Soy mi componente";
    this.comentario = "Este es el primer componente";
    this.year = 2022;
    this.mostrarPeliculas = true;
  }

  ngOnInit(): void {
  }

  ocultarPeliculas() {
    this.mostrarPeliculas = false;
  }

}
