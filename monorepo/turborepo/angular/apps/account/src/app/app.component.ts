import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  accounts = signal([
    { id: 1, name: 'German Sanchez', email: 'german.sanchez@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@acme.inc', status: 'pending' },
    { id: 3, name: 'Robert Fox', email: 'robert@design.co', status: 'active' },
  ]);

  handleCreate(newAccount: any) {
    this.accounts.update(prev => [...prev, newAccount]);
  }

  handleDelete(id: number) {
    this.accounts.update(prev => prev.filter(a => a.id !== id));
  }
}
