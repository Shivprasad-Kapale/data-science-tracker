# Data Science Course

A React + Tailwind CSS learning tracker for Shiv, Prajakta, and their mentor. Syllabus changes, theme preference, and each learner's completion progress are saved in the browser's `localStorage`. Shared progress views compare both students with Chart.js overall and module-progress graphs.

## Run without installing npm

1. Make sure your computer is connected to the internet.
2. Open `index.html` in a web browser (double-click it in File Explorer, or right-click and choose **Open with**).

The standalone page loads React, Tailwind CSS, Babel, and Chart.js from CDNs, so it needs internet access. You do not need Node.js, npm, a terminal, or a local server.

Because this demo stores data in `localStorage`, progress is visible to every profile in the same browser profile. It does not sync between different computers or browser profiles.

## Frontend, backend, and deployment

This project currently has a **frontend only**: there is no API server or database. Each page load asks for the site password before showing the profile picker or dashboard. The password check runs in the browser and the password is included in the frontend code, so it is only a lightweight gate—not secure authentication. Use a backend with server-side authentication to protect a public deployment. Anyone who passes the gate can choose any profile; the profile picker does not enforce roles securely. Topics, theme, and progress are stored in the current browser's `localStorage`; users on different devices or browser profiles do not share data.

For a public **demo deployment**, publish `index.html` with any static hosting provider (for example, GitHub Pages, Netlify, or Cloudflare Pages). No build command is required for this standalone page. It needs internet access to fetch its CDN libraries and fonts. Verify the published URL on a phone and desktop after deployment.

The React source is in `src/` and the optional Vite scripts are in `package.json`. Install Node.js 20.19 or newer, then run `npm install`, `npm run dev`, or `npm run build`. The current standalone `index.html` is the no-install app entry point; it does not load `src/main.jsx`. Consequently, the Vite scripts are not a production bundle of the React source.

For a production application with real accounts or shared cross-device progress, add a backend that authenticates users, enforces roles server-side, and stores progress securely. A static deploy of this current project is suitable only as a client-side demo.

The main layout adapts to phone, tablet, and desktop widths. On phones, the sidebar becomes a slide-out navigation drawer; charts and module comparisons stack vertically.

## Demo profiles

| Account | Role |
| --- | --- |
| Shiv | Learner |
| Prajakta | Learner |
| Teacher | Mentor (read-only) |

Shiv and Prajakta can check off, add, rename, and remove syllabus topics. They can also view each other's completion progress without changing it. The Teacher profile opens a read-only comparison dashboard with both students' overall and per-module progress. Module names in the navigation expand to show their subtopics. The bright/dark theme preference is saved in the browser, and an inspirational quote rotates every five seconds. Topic edits are shared in the browser; completion checkboxes are saved separately for each profile.

The current syllabus follows the Programming Foundation and Modules 1–13 roadmap, including the supplied due dates, weekend-only DSA practice, and project statuses. Items marked completed are initially checked for both learners. The current syllabus and progress use new browser-storage keys so checkmarks from the previous syllabus are not applied to unrelated topics; the older saved data remains untouched. The site password is not saved in browser storage, and each full page load requires it again. For production use with real accounts, add a backend with secure authentication and server-enforced roles.
