# Acquisitions Tracker

A private CRM for tracking distribution company acquisition targets — built
from your `Dad_list.xlsx` (117 companies, all fields carried over).

## Tabs (left sidebar, hover to expand)

- **Dashboard** — "Welcome, Toby" overview with quick stats and shortcuts.
- **Company Profiles** — searchable list of every company; click through to
  a full profile page (address, owner, phone, product types, size, branch
  count, and an editable notes box).
- **Sales Pipeline** — a Kanban board across 9 stages (Researching →
  Closed – Won/Lost). Change a company's stage from its profile page or
  directly on the board; it moves columns immediately.
- **Contacts** — every owner, sortable, with one-click call/email.
- **Email / Phone** — outreach hub. Log calls and emails, and save email
  addresses as you collect them (the original list only had phone numbers).
- **Map** — every company plotted with OpenStreetMap/Leaflet. Hover a pin
  for name + city/state, click to jump to its profile. Search bar filters
  the pins live.
- **Notes** — a general scratchpad, separate from each company's own notes.

## Important: how "email" actually works here

This site does **not** send email itself and doesn't have its own inbox —
that would require connecting a real email provider (like Gmail or
Outlook) with its own account setup and API credentials, which is a
bigger, separate task. What it does instead: "Email" buttons open **your
own** default email app (Mail, Outlook, Gmail in browser, etc.) with the
recipient and subject pre-filled, the same way clicking an email address
on any website works. If you want true in-app sending/tracking later,
that's addable, but it's a real project of its own — say the word if you
want to go there.

## Important: where your data lives

Everything you *change* on this site (pipeline stages, notes, saved
emails, contact logs) is saved in **your browser's local storage**, not a
real database. That means:
- It stays there even after closing the site or your laptop. ✅
- It does **not** sync between devices or browsers. ❌
- Clearing your browser data would erase it. ⚠️

If this becomes something you rely on long-term or want to access from
your phone with the same data, the next step would be adding a real
database (e.g. Vercel Postgres) — happy to build that when you're ready.

## Running locally (optional)

```bash
npm install
npm run dev
```

## Deploy

Same process as your other site: push this folder to a new GitHub repo,
import it into Vercel, deploy. Ask Claude if you want a walkthrough again.
