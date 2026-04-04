import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonComponent } from '@repo/ui/button/button.component';
import { CardComponent } from '@repo/ui/card/card.component';
import { ChartContainerComponent, SimpleStatComponent } from '@repo/ui/chart/chart.component';
import { IconComponent } from '@repo/ui/icon/icon.component';
import { navigateTo } from '@repo/utilities';
import { finalize } from 'rxjs/operators';

interface DashboardData {
  revenue: { month: string; value: number }[];
  users: number;
  activeSessions: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonComponent,
    CardComponent,
    ChartContainerComponent,
    SimpleStatComponent,
    IconComponent
  ],
  template: `
    <div class="dashboard-mfe p-6 min-h-screen bg-gray-50 text-deep-space">      
      <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-deep-space">{{ 'dashboard.title' | translate }}</h1>
          <p class="text-blue-green">{{ 'dashboard.subtitle' | translate }}</p>
        </div>
        <div class="flex gap-4">
          <app-button (clicked)="fetchData()" className="flex items-center gap-2 bg-blue-green">
            <app-icon name="RefreshCw" [size]="18" [className]="loading() ? 'animate-spin' : ''"></app-icon>
            {{ 'dashboard.refresh' | translate }}
          </app-button>
          <app-button (clicked)="goBack()" className="flex items-center gap-2 bg-tiger-orange border-none">
            <app-icon name="ArrowLeft" [size]="18"></app-icon>
            {{ 'dashboard.back' | translate }}
          </app-button>
        </div>
      </header>

      <div *ngIf="error()" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
        <app-icon name="Activity" [size]="20"></app-icon>
        {{ error() }}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <app-card className="hover:ring-2 hover:ring-sky-blue transition-all">
          <app-simple-stat 
            [label]="'dashboard.totalUsers' | translate" 
            [value]="data()?.users || '---'" 
            [trend]="'dashboard.trendUsers' | translate" 
            trendType="up" 
          ></app-simple-stat>
          <div class="mt-4 p-2 bg-sky-blue/10 rounded-full w-fit">
            <app-icon name="Users" className="text-blue-green" [size]="24"></app-icon>
          </div>
        </app-card>
        
        <app-card className="hover:ring-2 hover:ring-amber-flame transition-all">
          <app-simple-stat 
            [label]="'dashboard.activeSessions' | translate" 
            [value]="data()?.activeSessions || '---'" 
            [trend]="'dashboard.trendSessions' | translate" 
            trendType="neutral" 
          ></app-simple-stat>
          <div class="mt-4 p-2 bg-amber-flame/10 rounded-full w-fit">
            <app-icon name="Activity" className="text-tiger-orange" [size]="24"></app-icon>
          </div>
        </app-card>

        <app-card className="hover:ring-2 hover:ring-blue-green transition-all">
          <app-simple-stat 
            [label]="'dashboard.estRevenue' | translate" 
            [value]="totalRevenue()" 
            [trend]="'dashboard.trendRevenue' | translate" 
            trendType="up" 
          ></app-simple-stat>
          <div class="mt-4 p-2 bg-blue-green/10 rounded-full w-fit">
            <app-icon name="DollarSign" className="text-deep-space" [size]="24"></app-icon>
          </div>
        </app-card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <app-card [hasHeader]="true" className="h-full">
          <span card-header>{{ 'dashboard.revenueTrends' | translate }}</span>
          <app-chart-container [title]="'dashboard.revenueTitle' | translate">
            <div class="flex items-end gap-3 w-full px-4 h-40">
              <ng-container *ngIf="data(); else noData">
                <div *ngFor="let item of data()?.revenue" class="flex-1 flex flex-col items-center gap-2">
                  <div 
                    class="w-full bg-blue-green rounded-t-sm transition-all hover:bg-tiger-orange" 
                    [style.height.%]="(item.value / 4000) * 100"
                  ></div>
                  <span class="text-[10px] text-gray-400 font-medium rotate-45">{{ item.month }}</span>
                </div>
              </ng-container>
              <ng-template #noData>
                <div class="text-gray-400 italic">{{ 'dashboard.noData' | translate }}</div>
              </ng-template>
            </div>
          </app-chart-container>
        </app-card>

        <app-card [hasHeader]="true" [hasFooter]="true">
          <span card-header>{{ 'dashboard.systemHealth' | translate }}</span>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium">{{ 'dashboard.apiResponse' | translate }}</span>
              <span class="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded">24ms</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div class="bg-blue-green h-2 rounded-full" style="width: 85%"></div>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium">{{ 'dashboard.memoryUsage' | translate }}</span>
              <span class="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded">42%</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div class="bg-amber-flame h-2 rounded-full" style="width: 42%"></div>
            </div>

            <div class="flex justify-between items-center pt-4 border-t border-gray-50">
              <div class="flex items-center gap-2 text-sm text-blue-green">
                <app-icon name="TrendingUp" [size]="16"></app-icon>
                <span>{{ 'dashboard.overallPerformance' | translate }}</span>
              </div>
              <span class="font-bold text-deep-space">{{ 'dashboard.high' | translate }}</span>
            </div>
          </div>
          <span card-footer>{{ 'dashboard.systemOperational' | translate }}</span>
        </app-card>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  private http = inject(HttpClient);
  private translate = inject(TranslateService);

  data = signal<DashboardData | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  totalRevenue = computed(() => {
    const revenue = this.data()?.revenue || [];
    const total = revenue.reduce((acc, curr) => acc + curr.value, 0);
    return total > 0 ? `$${total.toLocaleString()}` : '---';
  });

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading.set(true);
    this.http.get<DashboardData>('http://localhost:5005/api/dashboard')
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.data.set(response);
          this.error.set(null);
        },
        error: () => {
          this.error.set(this.translate.instant('dashboard.errorLoading'));
        }
      });
  }

  goBack() {
    navigateTo('/');
  }
}
