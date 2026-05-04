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

  // Replace these URLs with your actual social profiles
  protected readonly socials = [
    { href: '#', label: 'GitHub' },
    { href: '#', label: 'LinkedIn' },
    { href: '#', label: 'Twitter' },
  ];
}
