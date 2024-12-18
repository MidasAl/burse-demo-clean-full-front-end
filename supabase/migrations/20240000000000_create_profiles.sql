-- Create the profiles table if it doesn't exist
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  company_name text,
  is_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Public profiles are viewable by everyone" on profiles;
drop policy if exists "Users can insert their own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;

-- Create new policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Enable insert for authenticated users only"
  on profiles for insert
  with check ( auth.role() = 'authenticated' );

create policy "Enable update for users based on id"
  on profiles for update
  using ( auth.uid() = id );

-- Set up realtime
alter publication supabase_realtime add table profiles;

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, company_name, is_admin)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'company_name',
    (new.raw_user_meta_data->>'is_admin')::boolean
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Create trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Disable email confirmation requirement
update auth.config
set confirm_email_on_signup = false;