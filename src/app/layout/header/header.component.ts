import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent {
  @Input() cartItemCount: number = 0;
  @Input() activeRoute: string = '';
  @Output() searchClick = new EventEmitter<void>();
  @Output() cartClick = new EventEmitter<void>();

  onSearchClick(): void {
    this.searchClick.emit();
  }

  onCartClick(): void {
    this.cartClick.emit();
  }
}