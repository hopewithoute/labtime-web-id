# Article 7: Architecting a Resilient Assessment Engine

## Title
Architecting a Resilient Assessment Engine

## Narrative Angle
**State Management, Concurrency, and Background Jobs**
Building an exam engine isn't just about forms and scores; it's about handling concurrency gracefully, preventing cheating through temporal manipulation, and guaranteeing that timed exams automatically submit even if the client's laptop dies.

## Outline
1. **Point-in-Time Integrity (Question Snapshotting)**
   - Instructors might edit a Question Bank's correct answer while a student is mid-exam.
   - We solve this by taking a JSONB snapshot (`questions_snapshot`) of the entire exam structure the exact microsecond the `start` action is invoked. Grading is strictly performed against this immutable snapshot.
2. **Preventing Race Conditions (Optimistic Locking)**
   - What happens if a user submits twice simultaneously, or an auto-submit script fires exactly as the user clicks submit?
   - Using Ash Framework's `optimistic_lock(:version)` on the `submit` and `grade` actions to instantly abort concurrent modifications.
3. **The Invisible Hand (AshOban Cron Workers)**
   - Timed exams must enforce their deadlines on the server. We cannot rely on the React frontend to trigger a submit when the timer hits zero (the user could just close their lid).
   - Showcasing `AshOban`: A cron scheduler (`* * * * *`) that triggers an `auto_complete` worker every minute, cleanly sweeping the database for `in_progress` attempts that have passed their deadline + a 5-minute grace period.

## Image Prompt Concept (Nano Banana Style)
Three pillars. Pillar 1: 'Question Snapshot' (Exam Attempt holding a JSONB document). Pillar 2: 'Optimistic Locking' (Two concurrent submit requests hitting a version check barrier). Pillar 3: 'AshOban Cron' (A clock/scheduler triggering an 'Auto-Complete Worker' into the database).
