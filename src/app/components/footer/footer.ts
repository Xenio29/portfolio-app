import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly year = signal(new Date().getFullYear());
  protected readonly ownerName = 'Tigane Guelloul';

  protected readonly pages = [
    { href: '#about-me', label: 'À propos' },
    { href: '#projets', label: 'Projets' },
    { href: '#competences', label: 'Compétences' },
    { href: '#contact', label: 'Contact' },
  ];

  protected readonly socials = [
    { href: 'https://github.com/Xenio29', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/tigane-guelloul-077699406', label: 'LinkedIn' }
  ];
}
