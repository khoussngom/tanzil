import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '../../components/card/card.component';
import { ButtonCTAComponent } from '../../components/button-cta/button-cta.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContentService } from '../../services/content.service';
import { Router } from '@angular/router';

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, CardComponent, ButtonCTAComponent],
  template: `
    <section class="hero-section relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl md:text-7xl font-montserrat font-bold mb-6 fade-in">
          {{ 'HOME.HERO_TITRE' | translate }}
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto fade-in">
          {{ 'HOME.HERO_SOUS_TITRE' | translate }}
        </p>
        <app-button-cta
            [texte]="'HOME.DECOUVRIR' | translate"
          variante="primaire"
          taille="grand"
          (onClick)="defilerVersSections()"
        ></app-button-cta>
      </div>
    </section>

    <section class="vision-section py-20 ">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-montserrat font-bold text-bleu-fonce mb-6 slide-up">
            {{ 'HOME.VISION_TITRE' | translate }}
          </h2>
          <p class="text-xl text-gris-acier max-w-3xl mx-auto slide-up">
            {{ 'HOME.VISION_DESCRIPTION' | translate }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center slide-up" *ngFor="let item of visionItems; let i = index">
            <div class="w-20 h-20 bg-accent-jaune rounded-full flex items-center justify-center mx-auto mb-4 parallax">
              <span class="text-2xl">{{ item.icone }}</span>
            </div>
            <h3 class="text-2xl font-montserrat font-bold text-bleu-fonce mb-4">
              {{ 'HOME.VISION_ITEM_' + (i+1) | translate }}
            </h3>
            <p class="text-gris-acier">
              {{ 'HOME.VISION_ITEM_' + (i+1) + '_DESC' | translate }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="projets-section py-20 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-montserrat font-bold text-bleu-fonce mb-6 slide-up">
            {{ 'HOME.PROJETS_TITRE' | translate }}
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <app-card
            *ngFor="let projet of projetsRecents"
            [titre]="projet.titre"
            [description]="projet.description"
            [imageUrl]="projet.imageUrl"
            [boutonTexte]="'Voir le projet'"
          ></app-card>
        </div>
      </div>
    </section>

    <section class="cta-section py-20 bg-bleu-fonce text-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-montserrat font-bold mb-6 slide-up">
          {{ 'HOME.CTA_INVESTIR' | translate }}
        </h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto slide-up">
          Rejoignez notre programme d'investissement participatif.
        </p>
        <app-button-cta
          [texte]="'HOME.CTA_INVESTIR' | translate"
          variante="secondaire"
          taille="grand"
          (onClick)="naviguerVersInvestissement()"
        ></app-button-cta>
      </div>
    </section>

    <section class="partenaires-section py-20  backdrop-blur-md">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-montserrat font-bold text-bleu-fonce mb-6 slide-up">
            {{ 'HOME.PARTENAIRES_TITRE' | translate }}
          </h2>
        </div>

        <div class="flex flex-wrap justify-center items-center gap-8">
          <div
            *ngFor="let partenaire of partenaires"
            class="grayscale hover:grayscale-0 transition-all duration-300"
          >
            <img [src]="partenaire.logo" [alt]="partenaire.nom" class="h-16 w-auto">
          </div>
                </div>
      </div>
    </section>

    <button (click)="retourHaut()" class="fixed bottom-4 right-4 bg-accent-jaune text-bleu-fonce p-3 rounded-full shadow-lg hover:bg-accent-orange transition-colors z-50">
      ↑
    </button>
  `,
  styles: [`
  `]
})
export class HomeComponent implements OnInit, AfterViewInit {
  homeData: any;
  visionItems: any[] = [];
  projetsRecents: any[] = [];
  partenaires: any[] = [];

  constructor(private contentService: ContentService, private router: Router) {}

  ngOnInit() {
    this.homeData = this.contentService.getHomeData();
    this.visionItems = this.homeData.visionItems;
    this.projetsRecents = this.homeData.projetsRecents;
    this.partenaires = [
      { nom: 'Partenaire 1', logo: 'https://via.placeholder.com/150x50?text=Partenaire+1' },
      { nom: 'Partenaire 2', logo: 'https://via.placeholder.com/150x50?text=Partenaire+2' },
      { nom: 'Partenaire 3', logo: 'https://via.placeholder.com/150x50?text=Partenaire+3' }
    ];
  }

  ngAfterViewInit() {
    this.initialiserAnimations();
  }

  initialiserAnimations() {
    // Animations ScrollTrigger
    gsap.utils.toArray('.fade-in').forEach((element: any) => {
      gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 6,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    gsap.utils.toArray('.slide-up').forEach((element: any, index) => {
      gsap.from(element, {
        opacity: 0,
        y: 100,
        duration: 3,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    gsap.utils.toArray('.parallax').forEach((element: any) => {
      gsap.from(element, {
        y: -50,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true
        }
      });
    });
  }

  defilerVersSections() {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: '.vision-section', offsetY: 80 },
      ease: 'power2.out'
    });
  }

  retourHaut() {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: 'power2.out'
    });
  }

  naviguerVersInvestissement() {
    this.router.navigate(['/investissement']);
  }
}