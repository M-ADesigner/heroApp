import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [],
})
export class SearchPageComponent {
  constructor(private heroService: HeroService) {}

  public heroes: Hero[] = [];
  public selectedHero?: Hero;
  searchInput = new FormControl();

  searchHero() {
    const query: string = this.searchInput.value || '';

    if (query)
      this.heroService.getSuggestions(query).subscribe((hero) => {
        this.heroes = hero;
      });
    return;
  }
  onselectedOption(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
}
