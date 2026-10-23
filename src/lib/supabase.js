import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are valid (and not placeholder text)
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.includes('supabase.co') &&
  !supabaseUrl.includes('your-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Submit contact form inquiry directly to Supabase
 * @param {Object} data - Form data
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function submitContactToSupabase(data) {
  if (!supabase) {
    return { 
      success: false, 
      error: 'Supabase is not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.' 
    };
  }

  try {
    const { data: insertedData, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          ticket_id: data.ticketId || `SVM-${Math.floor(1000 + Math.random() * 9000)}`,
          name: data.name,
          email: data.email,
          purpose: data.purpose || 'New Business',
          source: data.source || '',
          message: data.message,
          signature: data.signature || '',
          status: 'unread',
          metadata: {
            origin: typeof window !== 'undefined' ? window.location.origin : '',
            submitted_at: new Date().toISOString(),
          }
        }
      ])
      .select();

    if (error) {
      console.error('[Supabase Contact Error]:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: insertedData };
  } catch (err) {
    console.error('[Supabase Unexpected Error]:', err);
    return { success: false, error: err.message || 'Network error occurred while connecting to Supabase.' };
  }
}
