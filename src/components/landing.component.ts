import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="landing-container">
      <!-- Navigation -->
      <nav class="navbar">
        <div class="logo">
          <div class="logo-icon">S</div>
          <span class="logo-text">StaySync OS</span>
        </div>
        <div class="nav-links">
          <a routerLink="/it-cybersecurity" class="btn-link">IT & Cybersecurity</a>
          <!-- Link to existing app login -->
          <a routerLink="/login" class="btn-login">Login to Property</a>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="hero">
        <div class="hero-bg-glow"></div>
        <div class="hero-content">
          <h1>The Operating System for <span class="highlight">Modern Hospitality</span></h1>
          <p class="subtitle">
            Streamline operations, automate guest communication, and manage your property with AI-driven insights. 
            Everything you need to run your hotel, in one place.
          </p>
          <div class="cta-group">
            <a routerLink="/login" class="btn-primary">Get Started</a>
            <button class="btn-secondary">View Demo</button>
          </div>
        </div>
      </header>

      <!-- Features Grid -->
      <section class="features">
        <div class="section-header">
          <h2>Why StaySync?</h2>
          <p>Powerful tools designed for property managers.</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="icon-wrapper">🏨</div>
            <h3>Property Management</h3>
            <p>Real-time room availability, housekeeping status, and maintenance tracking in one intuitive dashboard.</p>
          </div>
          
          <div class="feature-card">
            <div class="icon-wrapper">🤖</div>
            <h3>AI Automation</h3>
            <p>Automated guest messaging, document analysis, and predictive insights powered by advanced AI.</p>
          </div>
          
          <div class="feature-card">
            <div class="icon-wrapper">📈</div>
            <h3>Financial Control</h3>
            <p>Integrated invoicing, expense tracking, and revenue reporting to keep your business profitable.</p>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer>
        <div class="footer-content">
          <div class="footer-brand">
            <span class="footer-logo">StaySync OS</span>
            <p>&copy; 2026 StaySync Technologies. All rights reserved.</p>
          </div>
          <div class="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1f2937;
      line-height: 1.5;
    }
    
    .landing-container {
      min-height: 100vh;
      background-color: #f9fafb;
      display: flex;
      flex-direction: column;
    }

    /* Navbar */
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid #e5e7eb;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 700;
      font-size: 1.25rem;
      color: #111827;
    }

    .logo-icon {
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      color: white;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
    }

    .btn-login {
      background-color: #4f46e5;
      color: white;
      padding: 0.6rem 1.2rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;
      box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
    }

    .btn-login:hover {
      background-color: #4338ca;
      transform: translateY(-1px);
    }
    
    .btn-link {
        color: #4b5563;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s;
    }
    .btn-link:hover {
        color: #4f46e5;
    }

    /* Hero */
    .hero {
      padding: 8rem 2rem 6rem;
      text-align: center;
      position: relative;
      overflow: hidden;
      background: white;
    }

    .hero-bg-glow {
      position: absolute;
      top: -50%;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 200%;
      background: radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    }

    .hero-content {
      max-width: 900px;
      margin: 0 auto;
      position: relative;
      z-index: 10;
    }

    h1 {
      font-size: clamp(2.5rem, 5vw, 4.5rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 1.5rem;
      line-height: 1.1;
      color: #111827;
    }

    .highlight {
      background: linear-gradient(135deg, #4f46e5, #9333ea);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      font-size: 1.25rem;
      color: #4b5563;
      margin-bottom: 3rem;
      max-width: 650px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.6;
    }

    .cta-group {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-primary {
      background-color: #4f46e5;
      color: white;
      padding: 1rem 2.5rem;
      border-radius: 0.75rem;
      font-weight: 600;
      text-decoration: none;
      font-size: 1.125rem;
      transition: all 0.2s;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(79, 70, 229, 0.4);
    }

    .btn-secondary {
      background-color: white;
      color: #374151;
      border: 1px solid #d1d5db;
      padding: 1rem 2.5rem;
      border-radius: 0.75rem;
      font-weight: 600;
      font-size: 1.125rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-secondary:hover {
      background-color: #f9fafb;
      border-color: #9ca3af;
    }

    /* Features */
    .features {
      max-width: 1200px;
      margin: 0 auto;
      padding: 6rem 2rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #111827;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2.5rem;
    }

    .feature-card {
      background: white;
      padding: 2.5rem;
      border-radius: 1.5rem;
      border: 1px solid #f3f4f6;
      transition: all 0.3s ease;
      position: relative;
      top: 0;
    }

    .feature-card:hover {
      top: -5px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01);
      border-color: #e5e7eb;
    }

    .icon-wrapper {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      background: #eef2ff;
      width: 4rem;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 1rem;
      color: #4f46e5;
    }

    .feature-card h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: #111827;
    }

    .feature-card p {
      color: #6b7280;
      line-height: 1.6;
    }

    /* Footer */
    footer {
      margin-top: auto;
      background: #111827;
      color: #9ca3af;
      padding: 4rem 2rem;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 2rem;
    }

    .footer-logo {
      color: white;
      font-weight: 700;
      font-size: 1.5rem;
      display: block;
      margin-bottom: 0.5rem;
    }

    .footer-links {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .footer-links a {
      color: #9ca3af;
      text-decoration: none;
      transition: color 0.2s;
    }

    .footer-links a:hover {
      color: white;
    }

    @media (min-width: 768px) {
      .footer-content {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
      }
    }
  `]
})
export class LandingComponent { }