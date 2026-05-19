# SmartScale.it — Claude Working Guide

Affiliate-Site für KI-Tools, Agenten & Automatisierung. Astro + Tailwind. DACH-Fokus.

## Geschäftsmodell

Traffic-Quelle: Google/SEO + AI-Suche (Perplexity, Google AI Overviews). Conversion: Klick auf Affiliate-Links in Tool-Karten, CTAs in Blog-Posts, Vergleichstabellen.

## Tech Stack

- **Framework:** Astro 5+ (statisch, `output: 'static'`)
- **Styling:** Tailwind CSS 4+
- **Content:** Astro Content Collections (MDX)
- **SEO:** Schema.org JSON-LD (in MainLayout), Sitemap, RSS, robots.txt
- **Hosting:** Hostinger (FTP), Cloudflare DNS
- **Deploy:** launchd pollt alle 2 Min (`deploy.sh`), Push to `main` reicht

## Content Collections

| Collection | Zweck | URL-Pfad |
|---|---|---|
| `tools` | Tool-Bewertungen mit Rating, Pros/Cons, Pricing | `/tools/` |
| `news` | News-Artikel, Updates | `/news/` |
| `tutorials` | How-To Anleitungen | `/tutorials/` |
| `vergleiche` | Tool-Vergleiche (A vs B) | `/vergleiche/` |
| `lexikon` | KI-Begriffe erklärt | `/lexikon/` |
| `agents` | KI-Agenten Reviews | `/agents/` |
| `automation` | Workflow-Automatisierung | `/automation/` |
| `business` | KI für Unternehmen | `/business/` |
| `case-studies` | Erfolgsgeschichten | `/case-studies/` |

## SEO-Regeln (MUSS)

1. **Jeder Artikel braucht:** `title`, `description`, `publishedAt`, `tags`
2. **SEO-Title** max 60 Zeichen, **Meta-Description** max 155 Zeichen
3. **FAQ-Block** am Ende jedes Artikels (für FAQPage Schema + AI Visibility)
4. **Interne Links:** Min. 2-3 pro Artikel zu verwandten Tools/Artikeln
5. **Affiliate-CTAs:** 2-4 pro Artikel, als `affiliateLinks` im Frontmatter
6. **Bilder:** Immer `width`/`height` Attribute, `loading="lazy"` (außer Hero)
7. **E-E-A-T:** `reviewedBy` und `sources` Felder nutzen

## Schreibstil

- Deutsch, Du-Form gemischt mit Sie
- Länge Blog: 1500-2500 Wörter
- Länge Tool: 400-800 Wörter
- Länge Vergleich: 800-1200 Wörter + Vergleichstabelle
- Tone: kompetent, ehrlich, DACH-spezifisch
- Keine erfundenen Affiliate-IDs

## Affiliate-CTA (HTML-Snippet)

```html
<div class="text-center my-8">
  <a href="AFFILIATE_URL" rel="nofollow sponsored"
     class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
    CTA-Text →
  </a>
</div>
```

## Team / Rollen (Agent-Prompts)

1. **Tool-Profiler** — legt `src/content/tools/<slug>.mdx` an
2. **Comparison-Builder** — legt `src/content/vergleiche/<a>-vs-<b>.mdx` an
3. **Blog-Writer** — legt `src/content/news/<slug>.mdx` an
4. **Internal-Linker** — verknüpft neue/alte Posts
5. **SEO-Auditor** — prüft Meta-Daten, Heading-Struktur, Keyword-Dichte
6. **Build-Doctor** — `npm run build`, fixt Schema-/Type-Fehler
7. **Trend-Researcher** — findet DACH-Trendthemen

## Workflow für autonome Runden

1. Trend-Researcher findet Topic
2. Tool-Profiler legt fehlende Tool-Einträge an
3. Comparison-Builder + Blog-Writer parallel
4. Internal-Linker verknüpft alles
5. SEO-Auditor validiert
6. Build-Doctor verifiziert
7. Commit + Push

## Don'ts

- Niemals neue Top-Level-Pages ohne Header/Footer-Anpassung
- Niemals `featured: true` für mehr als 6 Tools / 3 Vergleiche gleichzeitig
- Niemals Affiliate-Links mit Platzhalter-IDs committen
- Keine Mock-Awin-IDs erfinden
- **KEINE erfundenen internen Links** — nur auf existierende Seiten verlinken
- Niemals `npm run build` ohne vorherigen `npm install`
