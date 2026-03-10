---
title: "Modeling the mess"
description: "How Digital School normalizes complex real-world scheduling constraints into a clean mathematical payload before hitting the optimizer."
date: 2026-03-09
order: 6
tags: ["domain-driven-design", "laravel", "scheduling", "optimization", "architecture"]
category: "Backend"
---

### The messy reality of school scheduling
School scheduling sounds tidy until it touches real constraints.

Teachers cannot be in two places at once. Some subjects need specific rooms, like labs or studios. Each class still owes a fixed number of learning hours, and no one wants a timetable full of awkward gaps that make the day worse for teachers and students.

This is where a normal web app starts to fall apart. If Laravel tries to brute-force millions of schedule combinations inside a request, you get timeouts, memory pressure, and code nobody wants to maintain six months later.

![Automatic Scheduling Architecture](/projects/digital-school/automatic-scheduling-infographic.png)

### The application boundary and the solver boundary
I kept the split pretty strict. Laravel owns business rules, state, and workflow. The solver runtime owns the search problem.

That split matters because a solver does not care about application models. It does not know what a class group or curriculum subject is. It only understands a smaller world made of slots, capacities, and constraints.

The handoff between those two worlds is the unified input payload. That payload is the contract. The application turns messy school state into integers and sets. The solver takes it from there.

### Extracting state before solving
Before the solver can do anything useful, the application has to normalize the input.

- Time and space. The system loads active periods and rooms, then flags scarce rooms early so the solver treats them as real constraints instead of discovering them too late.
- Demand. The system calculates what each class still needs after subtracting anything already scheduled. By the time the solver sees the payload, the question is no longer vague. It is closer to: this class still needs four hours of math.
- Supply. The system maps teaching assignments to actual teaching capacity so the solver works with available supply, not assumptions.

I do that subtraction and grouping before the payload leaves the application boundary. The solver should not waste time guessing what work is left.

### The busy mask pattern
Incremental solving is the part that gets annoying fast. Schools often lock a few classes first, then ask the system to fill the rest around them.

I did not want the solver reaching back into the database every time it needed to ask whether a slot was free. So the application builds a busy mask first. It walks the locked schedule and produces simple occupancy maps for teachers, class groups, and rooms.

From the solver's perspective, the rule becomes blunt and easy to enforce: this teacher is unavailable in period 4, this room is taken in period 7, this class is already occupied on Tuesday morning. The solver does not need the story behind the conflict. It just needs the constraint.

### Execution in the background
The extraction step is not expensive by accident. It is expensive because the application is compressing a messy operational state into something the solver can actually use.

That is why the whole flow runs in a background job. The pipeline builds the payload, starts the external solver process, and stores the result so the frontend can poll for status and retrieve the finished output without holding an HTTP request open.

### The result
This boundary keeps both sides honest.

Laravel does not pretend to be an optimizer. The solver does not pretend to understand the whole school domain. They meet at a typed payload with a narrow contract, and that is what makes the scheduling feature practical to run and practical to maintain.
