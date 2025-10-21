STASIK AND KOSHARA — ARCHITECTURE DOCUMENT (PLAIN TEXT)

App: Habit-tracking with adorable companions (Deer, Cat, Rabbit) + mascots (Stasik the guinea pig, Koshara the cat).
Platform: Web (mobile-first).
Stack: React 18 + Vite + TypeScript, React Router, Jotai (atoms), Dexie (IndexedDB), Tailwind CSS, date-fns, Vitest/RTL/Playwright, vite-plugin-pwa.

---

1. GOALS AND SCOPE

---

* Beginner-friendly codebase with clear feature boundaries.
* Local-first: data persists offline; no backend in v1.
* Habits with recurrences: daily / weekly / monthly.
* Reset at 23:59 device time (effectively next day at local 00:00).
* Onboarding flow with pet choice; motivational messages.
* Out of scope (v1): auth, cloud sync, push notifications.

---

2. HIGH-LEVEL ARCHITECTURE

---

UI (React components)
-> State (Jotai atoms and derived atoms)
-> Persistence (Dexie for durable data; atomWithStorage for small prefs)
-> Services (messages, scheduling)
-> Routing (React Router v6)

Rendering: SPA with app shell, error boundary, theme provider, i18n (optional).
Styling: Tailwind; tokens via CSS variables.
Dates: date-fns utilities.

---

3. PROJECT STRUCTURE

---

root
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ public/
│   ├─ icons/ (PWA)
│   └─ images/ (static used by index.html)
└─ src/
├─ app/
│   ├─ App.tsx
│   ├─ router.tsx
│   ├─ providers/
│   │   ├─ ThemeProvider.tsx
│   │   ├─ I18nProvider.tsx (optional)
│   │   └─ ErrorBoundary.tsx
│   └─ styles/
│       ├─ index.css (Tailwind entry)
│       └─ tokens.css (CSS variables mapped from Figma)
├─ features/
│   ├─ onboarding/
│   │   ├─ pages/ (Onboarding, Story, Choose)
│   │   └─ components/
│   ├─ tasks/
│   │   ├─ pages/ (Goals, AddTask, EditTask, Congrats, Fail)
│   │   ├─ components/ (TaskItem, TaskForm, ProgressBar)
│   │   └─ lib/ (recurrence.ts, resetScheduler.ts)
│   ├─ pets/
│   │   ├─ components/ (PetAvatar, PetCarousel, QuoteBubble)
│   │   └─ lib/ (petMood.ts)
│   ├─ settings/
│   │   └─ pages/ (optional)
│   └─ ui/
│       └─ components/ (Button, Card, Modal, Toast)
├─ state/
│   ├─ atoms/
│   │   ├─ tasks.ts
│   │   ├─ taskInstances.ts
│   │   ├─ pets.ts
│   │   ├─ settings.ts
│   │   └─ ui.ts
│   ├─ derived/
│   │   ├─ todayInstances.ts
│   │   ├─ allCompleteToday.ts
│   │   └─ progress.ts
│   └─ persistence/
│       ├─ dexie.ts
│       └─ effects.ts (helpers for syncing atoms <-> Dexie)
├─ db/
│   ├─ dexie.ts (DB init + schema)
│   └─ migrations.ts
├─ services/
│   ├─ messages.ts (motivational text per pet)
│   ├─ notifications.ts (placeholder)
│   └─ analytics.ts (no-op v1)
├─ hooks/
│   ├─ useMidnightReset.ts
│   ├─ useAppHydration.ts
│   ├─ useNow.ts
│   └─ useVisibilityCatchUp.ts
├─ types/
│   ├─ task.ts
│   ├─ pet.ts
│   └─ settings.ts
├─ assets/
│   ├─ pets/ (deer, cat, rabbit)
│   ├─ mascots/ (stasik, koshara)
│   └─ ui/
├─ utils/
│   ├─ time.ts
│   ├─ uuid.ts
│   └─ storage.ts
└─ tests/
├─ unit/
├─ integration/
└─ e2e/

---

4. DATA MODEL

---

Types

* Recurrence: "daily" | "weekly" | "monthly"
* Task:
  id: string
  title: string
  recurrence: Recurrence
  createdAt: ISO string
  archived?: boolean
  streak?: number
* TaskInstance (a specific occurrence to complete):
  id: string
  taskId: string
  dateKey: string (daily: YYYY-MM-DD; weekly: YYYY-Www; monthly: YYYY-MM)
  completedAt?: ISO string
* PetId: "deer" | "cat" | "rabbit" 
* PetPref:
  current: PetId
  favorites: PetId[]
* Settings:
  firstDayOfWeek: 0 | 1
  locale: string
  theme: "light" | "dark" | "system"
  lastResetAt?: ISO string

Dexie Tables

* tasks (Task) [index: id]
* taskInstances (TaskInstance) [indexes: taskId, dateKey, [taskId+dateKey]]
* meta (key/value) e.g., "settings", "petPref"

Rationale

* TaskInstance enables simple queries for “today” and proper history/streaks.

---

5. STATE MANAGEMENT (JOTAI)

---

Atoms

* tasksAtom: Task[]
* taskInstancesAtom: TaskInstance[] (or Dexie-backed queries)
* petPrefAtom: PetPref (atomWithStorage for quick prefs)
* settingsAtom: Settings (atomWithStorage for small fields; Dexie for lastResetAt if needed)
* uiAtom: { toasts, modal, loading flags }

Derived Atoms

* currentPeriodKeyAtom: computes dateKey/weekKey/monthKey for “now”
* todayInstancesAtom: list of TaskInstances for current period (auto-generated if missing)
* allCompleteTodayAtom: boolean if all active tasks have completed instance
* progressAtom: ratio of completed today / total today

Actions (Write-Only Atoms)

* addTaskAtom({ title, recurrence })
* updateTaskAtom(id, patch)
* archiveTaskAtom(id)
* toggleCompleteInstanceAtom(taskId) (creates instance if missing, sets completedAt)
* hydrateFromDexieAtom() and persistToDexieAtom()

Persistence Strategy

* Small prefs via atomWithStorage (localStorage).
* Durable task data via Dexie. Use helper effects:

  * on write atom -> save to Dexie.
  * on app load -> hydrate atoms from Dexie.

---

6. ROUTING (MAPS TO FIGMA)

---

/                Onboarding (вход) → CTA to /story
/story           Meet your helpers (рассказ) → CTA to /choose
/choose          Choose your lazy buster (Frame 3) → sets pet + onboarding done
/goals           Goals (Frame 8/14), shows Today, tasks, Add button
/tasks/new     Add new task (Frame 40)
/tasks/:id/edit Edit task (Frame 29)
/congrats        All tasks complete for today (Frame 20)
/fail            Shown on app open when previous period incomplete (Frame 23)

Guards

* If not onboarded → redirect to /.
* If no pet chosen → redirect to /choose.

---

7. SCREENS AND KEY COMPONENTS

---

Onboarding: Title (Lazy busters), image, text, CTA → /story
Meet Helpers: image + text + CTA → /choose
Choose Lazy Buster: 3 options (deer/cat/rabbit) + confirm
Goals: header with Today’s date; pet avatar + message; tasks list; Add Task
Add Task: title input; recurrence (daily/weekly/monthly)
Edit Task: edit fields; delete/archive
Congrats: random motivational message; CTA “Plan your next day”
Fail: shown on reopen if prior period had incomplete tasks; CTA “Plan your next day”

Reusable UI: Button, Card, Modal, Header, ProgressBar, PetAvatar, QuoteBubble,
TaskItem, TaskForm, EmptyState, Toast.

---

8. RECURRENCE AND RESET LOGIC

---

Keys (local time)

* Daily: YYYY-MM-DD (startOfDay local)
* Weekly: YYYY-Www (respect firstDayOfWeek setting)
* Monthly: YYYY-MM

Generating Instances

* On task create: generate instance for the current period if not exists.
* On midnight reset: generate new instances for all active tasks for the new period.

Scheduling the Reset

* Hook useMidnightReset:

  * Compute next local midnight using startOfTomorrow (handle DST).
  * setTimeout to fire at midnight; then reschedule daily.
  * On visibility/resume, run catch-up if lastResetAt < startOfToday.

Completion Rules

* A task is complete for the current period if its TaskInstance has completedAt.
* “All complete” = every active task has its current-period instance completed.

Edge Cases

* DST changes: recompute schedule daily (do not rely on fixed 24h).
* Timezone change / manual clock change: check on visibility and hydration.
* Weekly boundaries: configurable first day of week; display hint in UI.
* Monthly: handle varying last days.

---

9. MOTIVATIONAL MESSAGES AND PETS

---

* services/messages.ts contains arrays of kind/encouraging messages per pet.
* Selection: weighted random (avoid repeating last N); optionally vary by streak.
* Pet mood/asset variant based on completion percentage today.

---

10. THEMING, ACCESSIBILITY, ASSETS

---

* Tailwind utilities; tokens.css mirrors Figma colors/spacing/typography.
* Dark mode (system default) with toggle in Settings (optional).
* Accessible components: focus states, ARIA labels, semantic tags, color contrast >= 4.5:1.
* Prefer small SVG/PNG; optional Lottie animations for pets.

---

11. TESTING STRATEGY

---

Unit (Vitest): recurrence utils, reset scheduler, key derived atoms.
Component (React Testing Library): TaskForm interactions, Goals list behavior.
E2E (Playwright): onboarding → choose pet → add task → complete → congrats; reopen fail flow.
Use fake timers to simulate midnight and verify instance generation.

---

12. PWA AND OFFLINE

---

* vite-plugin-pwa: app shell caching, offline page, manifest + icons.
* Dexie for offline data; read-first from IndexedDB on startup.
* Prompt “Install app” for mobile homescreen.

---

13. ERROR HANDLING AND LOGGING

---

* Root ErrorBoundary with friendly fallback and retry.
* Toasts for recoverable issues (e.g., Dexie upgrade problem).
* Minimal analytics (no-op in v1; later integrate privacy-friendly tool).

---

14. SECURITY AND DATA

---

* Local-only storage; no sensitive PII.
* Optional export/import JSON of tasks and settings in v1.1.

---

15. BUILD, CI/CD, DEPLOY

---

Scripts: dev, build, preview, test, lint.
CI: GitHub Actions (lint + test + build).
Hosting: Vercel/Netlify; SPA fallback to index.html.

---

16. IMPLEMENTATION NOTES (KEY PIECES)

---

recurrence.ts

* getCurrentKey(recurrence, date, firstDayOfWeek) -> string key
* isBoundaryPassed(prevResetAt, now) -> boolean

resetScheduler.ts (pseudo)

* scheduleDailyReset(cb): setTimeout to startOfTomorrowLocal(now) - now; on fire, cb(); reschedule.

useMidnightReset hook

* On mount: if settings.lastResetAt < startOfToday -> run resetNow().
* Schedule next reset; update lastResetAt after.
* On visibility change to visible: rerun catch-up.

Congrats/Fail routing

* After each completion: if allCompleteTodayAtom true -> navigate /congrats.
* On app start: if any incomplete instance from previous period -> show /fail once.

---

17. JOTAI EXAMPLES (SNIPPETS)

---

tasks.ts
tasksAtom: Task[]
addTaskAtom(write): push new Task; create TaskInstance for current period
updateTaskAtom(write): patch by id
archiveTaskAtom(write): set archived

taskInstances.ts
taskInstancesAtom: TaskInstance[]
toggleCompleteInstanceAtom(write): upsert instance for current key; set completedAt

derived/todayInstances.ts
atom(get): filter instances by current period key; if missing for an active task, create in memory (persist on write path)

derived/allCompleteToday.ts
atom(get): every active task has completed instance for current period

settings.ts
settingsAtom: atomWithStorage<Settings>("settings", defaults)
petPrefAtom: atomWithStorage<PetPref>("pet-pref", { current: "cat", favorites: ["cat"] })

---

18. FIGMA → ROUTE MAPPING (REFERENCE)

---

Onboarding (вход)         -> /
Meet your helpers (рассказ)-> /story
Choose lazy buster (Frame 3)-> /choose
Goals (Frames 8/14)       -> /goals
Add new task (Frame 40)   -> /tasks/new
Task edit (Frame 29)      -> /tasks/:id/edit
Congratulations (Frame 20)-> /congrats
Fail (Frame 23)           -> /fail

---

19. MILESTONES

---

M1 Skeleton (1–2 days): Vite + TS + Tailwind; Router; atoms; base pages.
M2 Tasks Core (2–3 days): Add/Edit; instances; completion; Goals list.
M3 Reset & Flows (1–2 days): midnight reset; congrats/fail; messages.
M4 Polish & PWA (1–2 days): animations, a11y, tests, deploy.

---

20. ACCEPTANCE CRITERIA (V1)

---

* User completes onboarding and chooses a pet.
* User can add/edit/delete tasks with daily/weekly/monthly recurrence.
* Instances refresh automatically at local midnight (handles DST/visibility changes).
* Completing all tasks shows Congratulations with a random motivational message.
* Reopening with previous period incomplete shows Fail screen once.
* Data persists across reloads and offline via IndexedDB.

END OF DOCUMENT.
