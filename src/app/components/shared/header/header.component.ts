import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
  
})
export class HeaderComponent {
  searchQuery = signal('');
  userName = signal('Ryman Alex');
  userAvatar = signal('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face');

  onSearch(): void {
    const query = this.searchQuery();
    if (query.trim()) {
      // Implement search logic here
    }
  }

  toggleCart(): void {
    // Implement cart toggle logic
  }

  toggleWishlist(): void {
    // Implement wishlist toggle logic
  }

  toggleUserMenu(): void {
    // Implement user menu toggle logic
  }
}