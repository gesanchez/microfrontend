import { Component, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '@repo/ui/icon/icon.component';
import { ButtonComponent } from '@repo/ui/button/button.component';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, IconComponent, ButtonComponent],
  template: `
    <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ 'account.listTitle' | translate }}</h1>
          <p class="text-gray-500 font-medium">{{ 'account.listSubtitle' | translate }}</p>
        </div>
        <app-button 
          (clicked)="navigate('new')"
          variant="default"
        >
          <app-icon name="Plus" [size]="20"></app-icon>
          {{ 'account.newAccount' | translate }}
        </app-button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let account of accounts()" class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4 hover:shadow-md transition-shadow relative group">
          <button 
            (click)="delete.emit(account.id)"
            class="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
          >
            <app-icon name="Trash2" [size]="18"></app-icon>
          </button>
          
          <div class="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <app-icon name="User" [size]="24"></app-icon>
          </div>
          
          <div>
            <h3 class="font-bold text-gray-900 truncate pr-8">{{ account.name }}</h3>
            <p class="text-sm text-gray-500 font-medium truncate">{{ account.email }}</p>
          </div>
          
          <div class="pt-2 flex items-center justify-between">
            <span [class]="'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ' + (account.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700')">
              {{ account.status }}
            </span>
            <span class="text-xs text-gray-400 font-medium">{{ 'account.added' | translate }} Dec 2023</span>
          </div>
        </div>

        <div *ngIf="accounts().length === 0" class="col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
          <div class="p-4 bg-white rounded-2xl shadow-sm mb-4">
            <app-icon name="Users" [size]="32" className="text-gray-300"></app-icon>
          </div>
          <h3 class="font-bold text-gray-900">{{ 'account.noAccounts' | translate }}</h3>
          <p class="text-gray-500 text-sm mt-1 max-w-[200px]">{{ 'account.getStarted' | translate }}</p>
        </div>
      </div>
    </div>
  `,
})
export class AccountListComponent {
  accounts = input.required<any[]>();
  delete = output<number>();

  private router = inject(Router);

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
