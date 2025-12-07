/**
 * Supabase Client Configuration
 *
 * Creates and exports Supabase client instances for:
 * - Browser (client-side) usage
 * - Server (SSR) usage
 *
 * Uses the same Supabase instance as TISAverse main app:
 * qaypyjkcrctzzmcygqyl.supabase.co
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl) {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_URL - Supabase features will be disabled');
}

if (!supabaseAnonKey) {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY - Supabase features will be disabled');
}

/**
 * Browser client for client-side operations
 * Safe to use in React components
 *
 * Note: Using untyped client because table names have hyphens (e.g., 'progress-books')
 * which TypeScript's strict mode doesn't handle well with Supabase's typed client
 */
export const supabase: SupabaseClient | null = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Check if Supabase is configured and available
 */
export function isSupabaseConfigured(): boolean {
  return supabase !== null;
}

/**
 * Get the Supabase client, throwing if not configured
 * Use this when Supabase is required
 */
export function getSupabaseClient() {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.'
    );
  }
  return supabase;
}

/**
 * Get current user session
 */
export async function getCurrentUser() {
  if (!supabase) return null;

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting user:', error);
    return null;
  }
  return user;
}

/**
 * Get current session
 */
export async function getSession() {
  if (!supabase) return null;

  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  return session;
}
