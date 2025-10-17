import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  template: `
    <header class="text-blanc shadow-lg backdrop-blur-md">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <img src="assets/images/logo.jpg" alt="Tanzil Corporation" class="h-10 w-auto">
            <h1 class="text-xl font-montserrat font-bold">Tanzil Corporation</h1>
          </div>

          <div class="hidden md:flex space-x-6">
            <a routerLink="/accueil" routerLinkActive="text-accent-jaune" class="hover:text-accent-jaune transition-colors">
              {{ 'NAVIGATION.ACCUEIL' | translate }}
            </a>
            <a routerLink="/a-propos" routerLinkActive="text-accent-jaune" class="hover:text-accent-jaune transition-colors">
              {{ 'NAVIGATION.A_PROPOS' | translate }}
            </a>
            <a routerLink="/activites" routerLinkActive="text-accent-jaune" class="hover:text-accent-jaune transition-colors">
              {{ 'NAVIGATION.ACTIVITES' | translate }}
            </a>
            <a routerLink="/projets" routerLinkActive="text-accent-jaune" class="hover:text-accent-jaune transition-colors">
              {{ 'NAVIGATION.PROJETS' | translate }}
            </a>
            <a routerLink="/investissement" routerLinkActive="text-accent-jaune" class="hover:text-accent-jaune transition-colors">
              {{ 'NAVIGATION.INVESTISSEMENT' | translate }}
            </a>
            <a routerLink="/blog" routerLinkActive="text-accent-jaune" class="hover:text-accent-jaune transition-colors">
              {{ 'NAVIGATION.BLOG' | translate }}
            </a>
            <a routerLink="/contact" routerLinkActive="text-accent-jaune" class="hover:text-accent-jaune transition-colors">
              {{ 'NAVIGATION.CONTACT' | translate }}
            </a>
          </div>

          <div class="flex items-center space-x-4">
            <button (click)="changerLangue('fr')" [class.text-accent-jaune]="langueCourante === 'fr'" class="text-sm hover:text-accent-jaune transition-colors">FR</button>
            <button (click)="changerLangue('en')" [class.text-accent-jaune]="langueCourante === 'en'" class="text-sm hover:text-accent-jaune transition-colors">EN</button>
            <button class="bg-accent-jaune text-bleu-fonce px-4 py-2 rounded hover:bg-accent-orange transition-colors">
              {{ 'NAVIGATION.CONNEXION' | translate }}
            </button>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    header {
      background: rgba(0, 0, 0, 0.3);
    }
  `]
})
export class HeaderComponent {
  langueCourante: string = 'fr';

  constructor(private translate: TranslateService) {
    this.langueCourante = this.translate.currentLang || 'fr';
  }

  changerLangue(langue: string) {
    this.translate.use(langue);
    this.langueCourante = langue;
    localStorage.setItem('langue', langue);
  }
}