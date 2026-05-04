import { Component, signal } from '@angular/core';
import { MenuBar } from "./components/menu-bar/menu-bar";
import { Projets } from "./components/projets/projets";
import { Competences } from "./components/competences/competences";
import { AboutMe } from "./components/about-me/about-me";
import { Contact } from "./components/contact/contact";
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [MenuBar, Projets, Competences, AboutMe, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('portfolio');
}
