import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-it-cybersecurity',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <nav class="navbar">
      <div class="container">
        <a routerLink="/" class="logo">StaySyncOS</a>
        <ul class="nav-links">
          <li><a routerLink="/">Home</a></li>
          <li><a routerLink="/it-cybersecurity" style="color: #4f46e5;">IT & Cybersecurity</a></li>
          <li><a routerLink="/login" class="btn-primary">Client Portal</a></li>
        </ul>
      </div>
    </nav>

    <header class="page-header">
      <div class="container">
        <h1>IT Infrastructure & Cybersecurity</h1>
        <p>Defending your data and optimizing your network performance.</p>
      </div>
    </header>

    <section class="section">
      <div class="container">
        <div class="grid-2">
          <div class="content-block">
            <h2>Comprehensive IT Management</h2>
            <p>Our managed IT services ensure your daily operations run smoothly. We handle updates, patches, and user management so you can focus on your core business.</p>
            <ul class="check-list">
              <li>Remote Monitoring & Management (RMM)</li>
              <li>Help Desk Support</li>
              <li>Hardware Procurement</li>
            </ul>
          </div>
          <div class="content-block">
            <h2>Cybersecurity Defense</h2>
            <p>Cyber threats are evolving. Our multi-layered security approach protects your endpoints, network, and cloud data from ransomware and phishing attacks.</p>
            <ul class="check-list">
              <li>Threat Detection & Response (EDR)</li>
              <li>Firewall Configuration</li>
              <li>Security Audits & Compliance</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>Ready to secure your business?</h2>
        <p>Get a free security assessment today.</p>
        <button class="btn-white">Schedule Assessment</button>
      </div>
    </section>

    <footer>
      <div class="container">
        <p>&copy; 2024 StaySyncOS. All rights reserved.</p>
      </div>
    </footer>
  `,
    styles: [`
    .page-header {
      background: #111827;
      color: #fff;
      padding: 5rem 0;
      text-align: center;
    }
    .page-header h1 { font-size: 2.5rem; margin-bottom: 1rem; font-weight: 700; }
    .page-header p { font-size: 1.2rem; color: #9ca3af; }

    .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 4rem; align-items: start; }
    .content-block h2 { font-size: 1.8rem; margin-bottom: 1rem; color: #111827; }
    .content-block p { color: #4b5563; margin-bottom: 1.5rem; line-height: 1.6; }

    .check-list { list-style: none; padding: 0; }
    .check-list li { margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative; color: #374151; }
    .check-list li::before { content: '✓'; position: absolute; left: 0; color: #4f46e5; font-weight: bold; }

    .cta-section { background: #4f46e5; color: #fff; text-align: center; padding: 4rem 0; }
    .cta-section h2 { font-size: 2rem; margin-bottom: 0.5rem; }
    .btn-white { background: #fff; color: #4f46e5; padding: 0.75rem 1.5rem; border-radius: 0.375rem; border: none; font-weight: 600; margin-top: 1.5rem; cursor: pointer; }
    .btn-white:hover { background: #f3f4f6; }
  `]
})
export class ItCybersecurityComponent { }