# TeenCareer

Career-readiness website for teens ages 15 to 18: first resume, interview practice, and (later) job and internship matches.

## Status

- Landing page
- First-resume builder at `/resume` (saves in the browser only, print or save as PDF)
- Massachusetts work rules guide at `/jobs-guide` (hours, work permit, banned jobs by age). Data lives in `data/massachusetts-rules.ts` with source links and a last-checked date; re-verify against mass.gov before editing.

Planned: job and internship listings, outreach scripts, application tracker, interview practice.

## Privacy

No accounts, no tracking, and no server-side storage. Resume data lives in the browser's `localStorage`.

## Development

Requires Node.js 20 or newer.

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

Built with Next.js (App Router), TypeScript and Tailwind CSS.
