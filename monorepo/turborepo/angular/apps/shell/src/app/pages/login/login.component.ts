import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '@repo/ui/icon/icon.component';
import { ButtonComponent } from '@repo/ui/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IconComponent, ButtonComponent, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center p-4 font-sans">
      <div class="max-w-md w-full animate-in fade-in zoom-in duration-500">
        <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 space-y-8 border border-white/20">
          <div class="text-center space-y-2">
            <div class="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              <app-icon name="Lock" className="text-blue-600" [size]="32"></app-icon>
            </div>
            <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h1>
            <p class="text-gray-500 font-medium">Please sign in to your project</p>
          </div>

          <form (submit)="handleLogin($event)" class="space-y-5">
            <div class="space-y-2">
              <label class="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <app-icon name="Mail" [size]="18"></app-icon>
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-900 font-medium"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-gray-700 ml-1">Password</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <app-icon name="ShieldCheck" [size]="18"></app-icon>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-900 font-medium"
                />
              </div>
            </div>

            <div class="flex items-center justify-between text-sm px-1">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                <span class="text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
              </label>
              <a href="#" class="font-bold text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</a>
            </div>

            <app-button
              type="submit"
              variant="default"
              size="full-size"
            >
              Sign In
            </app-button>
          </form>

          <p class="text-center text-gray-500 text-sm">
            Don't have an account?
            <a href="#" class="font-bold text-blue-600 hover:text-blue-700 transition-colors">Create account</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private router = inject(Router);

  handleLogin(e: Event) {
    e.preventDefault();
    this.router.navigate(['/dashboard']);
  }
}
