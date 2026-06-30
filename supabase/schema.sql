-- ─────────────────────────────────────────────────────────────────────────
-- Lead capture table for the /request wizard.
-- Run this once in your Supabase project: SQL Editor → New query → paste → Run.
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  name            text not null,
  needs           text[] not null default '{}',   -- what they want (service keys)
  business_name   text,
  business_about  text,
  situation       text,                            -- from_scratch / needs_refresh / add_features
  budget          text,                            -- under_1k / 1k_3k / 3k_7k / 7k_plus / unsure
  timeline        text,                            -- asap / 1_3_months / 3_6_months / exploring
  details         text,
  email           text not null,
  phone           text,
  contact_method  text,                            -- email / phone / whatsapp / telegram
  consent         boolean not null default false,
  lang            text,                            -- en / el
  source          text default 'request-wizard',   -- request-wizard / espa-assessment
  extra           jsonb,                           -- ESPA assessment details (vat, kad, region…)
  user_agent      text
);

-- If you already created the table before the ESPA feature, add the column:
--   alter table public.leads add column if not exists extra jsonb;

-- Newest leads first when you browse the table.
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- ── Security ──
-- Lock the table down with Row Level Security and add NO policies. The API
-- route (src/app/api/lead/route.ts) writes with the service_role key, which
-- bypasses RLS, so inserts keep working — but the public anon key can neither
-- read nor write this table. Your leads stay private.
alter table public.leads enable row level security;
