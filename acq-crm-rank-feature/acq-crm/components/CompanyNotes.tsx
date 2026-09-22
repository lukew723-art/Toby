"use client";

import NotesField from "./NotesField";

// Thin wrapper kept so existing usage (<CompanyNotes companyId={...} />) on
// the company detail page is unchanged. The actual logic now lives in
// NotesField, shared with the compact notes box on the Company Profiles
// and Ranks list page.
export default function CompanyNotes({ companyId }: { companyId: string }) {
  return <NotesField companyId={companyId} />;
}
