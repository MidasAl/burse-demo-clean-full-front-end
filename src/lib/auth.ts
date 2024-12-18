import { supabase } from './supabase';

export interface RegisterFormData {
  name: string;
  companyName: string;
  workEmail: string;
  password: string;
  isAdmin: boolean;
}

export const handleRegistration = async (formData: RegisterFormData) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.workEmail,
    password: formData.password,
    options: {
      data: {
        name: formData.name,
        company_name: formData.companyName,
        is_admin: formData.isAdmin,
      },
      emailRedirectTo: undefined,
    },
  });

  return { data, error };
};