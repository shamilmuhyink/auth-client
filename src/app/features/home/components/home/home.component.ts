import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HeaderComponent } from '../../../layout/header/header.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent]
})
export class HomeComponent {
  // Color options for the watch bands
  colorOptions = [
    { id: 1, color: '#8B0000', active: true }, // Dark red
    { id: 2, color: '#FF6700', active: false }, // Orange
    { id: 3, color: '#000000', active: false }, // Black
    { id: 4, color: '#663399', active: false }, // Purple
  ];
  
  // Change active color
  selectColor(selectedColor: any): void {
    this.colorOptions.forEach(color => {
      color.active = color.id === selectedColor.id;
    });
  }
  
  // Product sizes
  sizes = [
    { size: 'M', active: true },
    { size: 'L', active: false }
  ];
  
  // Select size
  selectSize(selectedSize: any): void {
    this.sizes.forEach(size => {
      size.active = size.size === selectedSize.size;
    });
  }
  
  // Catalog filters
  filters = [
    { name: 'Case Size', expanded: false },
    { name: 'Collection', expanded: false },
    { name: 'Band Type', expanded: false },
    { name: 'Band Color', expanded: false },
    { name: 'All Hermes', expanded: false, active: true }
  ];
  
  // Toggle filter expansion
  toggleFilter(filter: any): void {
    filter.expanded = !filter.expanded;
  }
  
  // Watch variants gallery
  watchVariants = [
    { 
      id: 1, 
      name: 'Nike Sport Band', 
      image: 'assets/watch-variant.jpg' 
    },
    { 
      id: 2, 
      name: 'Hermès Single Tour', 
      image: 'assets/hermes-single-tour.jpg' 
    },
    { 
      id: 3, 
      name: 'Sport Loop', 
      image: 'assets/sport-loop.jpg' 
    },
    { 
      id: 4, 
      name: 'Milanese Loop', 
      image: 'assets/milanese-loop.jpg' 
    },
    { 
      id: 5, 
      name: 'Solo Loop', 
      image: 'assets/solo-loop.jpg' 
    }
  ];
  
  currentVariantIndex = 0;
  
  // Navigation for watch variants
  nextVariant(): void {
    this.currentVariantIndex = (this.currentVariantIndex + 1) % this.watchVariants.length;
  }
  
  prevVariant(): void {
    this.currentVariantIndex = (this.currentVariantIndex - 1 + this.watchVariants.length) % this.watchVariants.length;
  }
  
  // Get current variant
  get currentVariant() {
    return this.watchVariants[this.currentVariantIndex];
  }
  
  // Get current pagination
  get currentPagination() {
    return `${this.currentVariantIndex + 1} / ${this.watchVariants.length}`;
  }

  handleImageError(event: any) {
    event.target.src = '/assets/images/placeholder.jpg'; // Fallback image
    console.error('Image failed to load:', event.target.src);
  }
}