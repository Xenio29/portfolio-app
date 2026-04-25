import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBar } from "./components/menu-bar/menu-bar";
import { Projets } from "./components/projets/projets";
import { Competences } from "./components/competences/competences";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuBar, Projets, Competences],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('portfolio');
}
