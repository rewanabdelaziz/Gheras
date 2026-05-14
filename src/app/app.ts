import { Component, inject, computed } from '@angular/core';
import { GherasData } from '../shared/gheras-data';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = computed(()=> this.gheras.lang() ==='ar' ? 'غِراس' : 'Gheras',);
  public gheras = inject(GherasData);
}
