# 9U Baseball Team Site

Static site for a 9U team — practice plans, schedule, stats — deployable to GitHub Pages.

## Layout

```
Baseball/
├── index.html        Home (roster, next event, rules)
├── schedule.html     Games + practices
├── practices.html    Practice plan library
├── stats.html        Season batting stats + game log
├── css/style.css
├── js/app.js
└── data/
    ├── team.json         Team metadata + roster
    ├── schedule.json     Events (games + practices)
    ├── practices.json    Practice plans + drill library
    └── stats.json        Season stats + game log
```

No build step. Edit JSON, commit, push. Pages updates in ~30 seconds.

## Local preview

Double-click `index.html`. That's it. Site loads data from `data/*.js` via `<script>` tags — no server required.

(Optional) serve over HTTP:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Put these files at the root of your repo (or under `/docs`).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Branch: `main` (or whichever), folder: `/ (root)` or `/docs` to match step 1.
5. Save. Site publishes at `https://<user>.github.io/<repo>/` after ~30 seconds.

## Editing data

Everything parents see is driven by the `data/*.js` files. Each is a plain JS file that assigns an object to `window` — edit the object literal and save. The matching `.json` file is kept in sync as human-readable source.

> **Edit** the `.js` files (what the site loads). The `.json` mirrors are reference copies.

### `team.json`
- `team.name`, `team.season`, `team.coach.*`
- `roster[]` — one entry per player: `num`, `name`, `pos` (array), `bats`, `throws`

### `schedule.json`
Add one entry per event:
```json
{ "type": "game",     "date": "2026-05-01T18:00", "opponent": "Tigers",
  "home": true, "location": "Main Field", "notes": "Arrive 45 min early" }

{ "type": "practice", "date": "2026-05-03T17:30", "location": "Main Field",
  "notes": "Defense-heavy", "practiceId": "p-2026-05-03" }
```
`practiceId` links to the matching plan in `practices.json`.

### `practices.json`
Each practice has:
- `id`, `date`, `location`, `duration` (min)
- `focus[]`, `equipment[]`, `coachingPoints[]`
- `blocks[]` — each block has `start` (min), `duration` (min), `title`, `tag`, and either `drills[]` or `stations[]` (3-station rotation)

Copy an existing plan and edit. The clock renders automatically from `start` + `duration`.

### `stats.json`
After each game:
1. Append a summary to `games[]`:
   ```json
   { "date": "2026-05-01", "opponent": "Tigers", "home": true,
     "teamRuns": 9, "oppRuns": 4, "result": "W", "notes": "..." }
   ```
2. Increment each player's row in `season.batting` with: `G`, `AB`, `H`, `BB`, `K`, `R`, `RBI`.

AVG and OBP compute automatically.

## Commit + push

```bash
git add -A
git commit -m "Update stats after game vs Tigers"
git push
```

Pages rebuilds automatically.

## League rules baked in

- Kid pitch innings 1-2, coach pitch innings 3+
- 5-run cap per inning
- 6 innings

Shown on the home page for parents who need a refresher.

## Ideas for next

- Batting lineup generator (rotation + fairness-aware)
- Position chart builder (drag/drop, equal-play checker)
- Pitch count tracker (mandatory for kid-pitch innings)
- Season HR / big-hit leaderboard
- Practice plan templates by focus (hitting day vs defense day)

Ping the coach (`andrewjcornish@gmail.com`) and we'll wire any of those in.
