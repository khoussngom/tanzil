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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonCTAComponent],
  template: `
    <section class="hero-section relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Vidéo fixée en arrière-plan -->
      <video
        class="object-cover w-full h-full"
        muted
        autoplay
        loop
        playsinline
        preload="auto"
        style="position:fixed; top:0; left:0; width:100%; height:100%; object-fit:cover; z-index:-1; pointer-events:none;"
      >
        <source src="assets/media/video.mp4" type="video/mp4">
      </video>

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
    // Utiliser des batches et des timelines pour des transitions plus fluides et performantes
    gsap.defaults({ ease: 'power3.out' });

    // Batch pour les fade-in: apparaître par groupes avec léger stagger
    ScrollTrigger.batch('.fade-in', {
      onEnter: (batch) => {
        gsap.fromTo(batch, { opacity: 0, y: 30 }, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08
        });
      },
      start: 'top 85%'
    });

    // Batch pour les éléments slide-up (cards / titres) avec un petit décalage entre eux
    ScrollTrigger.batch('.slide-up', {
      onEnter: (batch) => {
        gsap.fromTo(batch, { opacity: 0, y: 60 }, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12
        });
      },
      start: 'top 85%'
    });

    // Parallax léger et plus fluide
    gsap.utils.toArray('.parallax').forEach((element: any) => {
      gsap.to(element, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          end: 'bottom 10%',
          scrub: 0.6
        }
      });
    });

    // Découper le scroll en pourcentages et positionner la vidéo à chaque % (snap par pourcent)
    const video = document.querySelector('.hero-section video') as HTMLVideoElement;
    if (video) {
      // attendre les métadonnées pour connaître la durée
      video.addEventListener('loadedmetadata', () => {
        let lastPercent = -1;

        // Créer un ScrollTrigger qui suit la progression et met à jour la vidéo uniquement quand le pourcent change
        ScrollTrigger.create({
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          // scrub true pour que ScrollTrigger calcule progress en continu, mais on n'utilise que l'entier %
          scrub: true,
          onUpdate: (self) => {
            const percent = Math.round(self.progress * 100);
            if (percent !== lastPercent) {
              lastPercent = percent;
              const targetTime = Math.min(video.duration, (percent / 100) * video.duration);

              // Mettre à jour la position de la vidéo. On utilise requestAnimationFrame pour être sûr d'être dans un frame.
              requestAnimationFrame(() => {
                try {
                  // Définir currentTime directement pour "snap" à chaque pourcent
                  video.currentTime = targetTime;
                } catch (e) {
                  // Certains navigateurs peuvent lancer si manipulé trop souvent ; on ignore les erreurs silencieusement
                  // (ou on pourrait fallback en faisant un petit gsap.to si nécessaire)
                }
              });
            }
          }
        });
      });
    }
  }

  defilerVersSections() {
    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: '.vision-section', offsetY: 80 },
      ease: 'power2.out'
    });
  }

  retourHaut() {
    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: 0 },
      ease: 'power2.out'
    });
  }

  naviguerVersInvestissement() {
    this.router.navigate(['/investissement']);
  }
}