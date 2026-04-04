import { Component, signal, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '@repo/ui/icon/icon.component';
import { ButtonComponent } from '@repo/ui/button/button.component';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, IconComponent, ButtonComponent],
  template: `
    <div class="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
        <header class="flex items-center gap-4">
          <app-button 
            (clicked)="goBack()"
            variant="outline"
            size="icon-sm"
          >
            <app-icon name="ArrowLeft" [size]="24"></app-icon>
          </app-button>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ 'account.createTitle' | translate }}</h1>
            <p class="text-gray-500 font-medium text-sm">{{ 'account.createSubtitle' | translate }}</p>
          </div>
        </header>

        <form (submit)="handleSubmit($event)" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-bold text-gray-600 ml-1">{{ 'account.fullName' | translate }}</label>
              <input 
                required
                type="text" 
                [(ngModel)]="formData().name"
                name="name"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none transition-all font-medium" 
                [placeholder]="'account.placeholderName' | translate"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-gray-600 ml-1">{{ 'account.email' | translate }}</label>
              <input 
                required
                type="email" 
                [(ngModel)]="formData().email"
                name="email"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none transition-all font-medium" 
                [placeholder]="'account.placeholderEmail' | translate"
              />
            </div>
            <div class="space-y-2 md:col-span-2">
              <label class="text-sm font-bold text-gray-600 ml-1">{{ 'account.shortBio' | translate }}</label>
              <textarea 
                rows="4" 
                [(ngModel)]="formData().bio"
                name="bio"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none transition-all font-medium resize-none" 
                [placeholder]="'account.placeholderBio' | translate"
              ></textarea>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <app-button 
              type="button"
              (clicked)="goBack()"
              variant="outline"
            >
              {{ 'account.cancel' | translate }}
            </app-button>
            <app-button 
              type="submit"
              variant="secondary"
            >
              {{ 'account.createAction' | translate }}
            </app-button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class CreateAccountComponent {
  createAccount = output<any>();
  formData = signal({ name: '', email: '', bio: '' });

  private router = inject(Router);

  handleSubmit(e: Event) {
    e.preventDefault();
    this.createAccount.emit({ ...this.formData(), id: Date.now(), status: 'active' });
    this.router.navigate(['..']);
  }

  goBack() {
    this.router.navigate(['..']);
  }
}
