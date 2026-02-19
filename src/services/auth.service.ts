import { Injectable, signal, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User as SupabaseUser } from '@supabase/supabase-js';
import { environment } from '../environment';
import { toSignal } from '@angular/core/rxjs-interop';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'Admin' | 'Manager' | 'Reception' | 'Maintenance' | 'SuperAdmin' | 'Staff';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private router = new Router(); // Injecting Router manually if needed, or use constructor injection

  // Signal to hold the current raw Supabase user
  private _supabaseUser = signal<SupabaseUser | null>(null);
  public user$ = toSignal(this.authStateChange(), { initialValue: null });

  // Reactive role from database profile (will be populated by DataService or fetched here)
  public profileRole = signal<User['role'] | null>(null);

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabasePublishableKey);

    // Initialize session
    this.supabase.auth.getSession().then(({ data: { session } }) => {
      this._supabaseUser.set(session?.user ?? null);
      if (session?.user) {
        this.fetchProfile(session.user.id);
      }
    });

    // Listen for auth changes
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this._supabaseUser.set(session?.user ?? null);
      if (session?.user) {
        this.fetchProfile(session.user.id);
      } else {
        this.profileRole.set(null);
      }
    });
  }

  // Observable helper for compatibility if needed
  private authStateChange(): Observable<SupabaseUser | null> {
    return new Observable((observer) => {
      this.supabase.auth.getSession().then(({ data: { session } }) => {
        observer.next(session?.user ?? null);
      });

      const { data: { subscription } } = this.supabase.auth.onAuthStateChange((_event, session) => {
        observer.next(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    });
  }

  // Computed "App User" with dynamic role
  currentUser = computed<User | null>(() => {
    const u = this._supabaseUser();
    if (!u) return null;

    // Hardcoded fallback for the primary workspace account
    let role = this.profileRole();
    if (!role && u.email === 'jruizdesign@gmail.com') {
      role = 'SuperAdmin';
    }

    return {
      id: u.id,
      email: u.email || '',
      username: u.user_metadata?.['full_name'] || u.email || 'User',
      role: role || 'Staff'
    };
  });

  // Simplified permission check
  isManager = computed(() => {
    const role = this.currentUser()?.role;
    return role === 'Manager' || role === 'Admin' || role === 'SuperAdmin';
  });

  isLoggedIn() {
    return !!this.currentUser();
  }

  // Fetch profile separately to get the role
  private async fetchProfile(uid: string) {
    // Schema: user_roles (user_id, role_id) -> roles (id, name)
    const { data, error } = await this.supabase
      .from('user_roles')
      .select('roles(name)')
      .eq('user_id', uid)
      .limit(1)
      .maybeSingle();

    if (data?.roles) {
      // Supabase returns array or object depending on query, asserting type
      const roleName = (Array.isArray(data.roles) ? data.roles[0]?.name : (data.roles as any)?.name) as User['role'];
      this.profileRole.set(roleName || 'Staff');
    } else {
      // Check if super admin
      const { data: userData } = await this.supabase.from('users').select('is_super_admin').eq('id', uid).single();
      if (userData?.is_super_admin) {
        this.profileRole.set('SuperAdmin');
      } else {
        this.profileRole.set('Staff');
      }
    }
  }

  get auth() {
    return {
      currentUser: this._supabaseUser()
    }
  }


  async login(email: string, pass: string): Promise<void> {
    // DEV BYPASS
    if ((email === 'admin@staysync.com' || email === 'admin@ss.com') && pass === 'dev123') {
      console.log('Using Dev Bypass Login for ' + email);
      const mockUser: any = {
        id: 'dev-admin-id',
        email: email,
        user_metadata: { full_name: 'Dev Admin' },
        aud: 'authenticated',
        created_at: new Date().toISOString()
      };
      this._supabaseUser.set(mockUser);
      this.profileRole.set('Admin');
      return;
    }

    const { error } = await this.supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (error) throw error;
  }

  async signup(email: string, pass: string): Promise<void> {
    const { error } = await this.supabase.auth.signUp({
      email,
      password: pass,
    });
    if (error) throw error;
  }

  async logout() {
    await this.supabase.auth.signOut();
    // Assuming Router is available via DI in a real app, 
    // but simplified here for the replacement content.
    // In a real Angular app, you'd inject Router in the constructor.
    // For now, we will rely on key-based navigation or the component handling the redirect.
    window.location.href = '/login';
  }
}