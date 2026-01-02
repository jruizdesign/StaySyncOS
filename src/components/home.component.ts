import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <nav class="navbar">
      <div class="container">
        <a routerLink="/" class="logo">StaySyncOS</a>
        <ul class="nav-links">
          <li><a routerLink="/">Home</a></li>
          <li><a routerLink="/it-cybersecurity">IT & Cybersecurity</a></li>
          <li><a routerLink="/login" class="btn-primary">Client Portal</a></li>
        </ul>
      </div>
    </nav>

    <header class="hero">
      <div class="container">
        <h1>Empowering Your Digital Future</h1>
        <p>We provide cutting-edge technology solutions to help your business grow securely and efficiently.</p>
        <div class="hero-buttons">
          <a routerLink="/it-cybersecurity" class="btn-primary">View IT Solutions</a>
        </div>
      </div>
    </header>

    <section class="section">
      <div class="container">
        <h2 class="section-title">Our Expertise</h2>
        <div class="grid-3">
          <div class="card">
            <h3>Software Development</h3>
            <p>Custom applications tailored to your specific business needs and workflows.</p>
          </div>
          <div class="card">
            <h3>Cloud Integration</h3>
            <p>Seamless migration and management of cloud infrastructure for scalability.</p>
          </div>
          <div class="card highlight-card">
            <h3>IT & Cybersecurity</h3>
            <p>Protect your assets with our enterprise-grade security and IT management.</p>
            <a routerLink="/it-cybersecurity" style="color: #4f46e5; font-weight: 600; margin-top: 1rem; display: inline-block;">Learn More &rarr;</a>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <div class="container">
        <p>&copy; 2024 StaySyncOS. All rights reserved.</p>
      </div>
    </footer>
  `,
    styles: [`
    .hero {
      background: linear-gradient(rgba(79, 70, 229, 0.9), rgba(67, 56, 202, 0.8)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1352&q=80') no-repeat center center/cover;
      color: #fff;
      padding: 8rem 0;
      text-align: center;
    }
    .hero h1 { font-size: 3rem; margin-bottom: 1rem; font-weight: 800; }
    .hero p { font-size: 1.25rem; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto; opacity: 0.9; }
    
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    
    .card { 
      background: #fff; 
      padding: 2rem; 
      border-radius: 1rem; 
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); 
      transition: transform 0.2s;
    }
    .card:hover { transform: translateY(-5px); }
    .card h3 { font-size: 1.5rem; margin-bottom: 0.75rem; color: #111827; font-weight: 600; }
    .card p { color: #4b5563; line-height: 1.6; }
    
    .highlight-card { border-top: 4px solid #4f46e5; }
  `]
})
export class HomeComponent { }