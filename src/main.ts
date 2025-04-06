// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    // Provides essential Angular browser functionality
    importProvidersFrom(BrowserModule),

    // Provides HttpClient for your services
    importProvidersFrom(HttpClientModule),

    // Provides your Angular router
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
