---
title: "Picking a workspace"
description: "How I designed contextual role and school selection so access control reflects real institutional responsibility instead of a flat permission map."
date: 2026-03-09
tags: ["authorization", "workspace", "laravel", "roles", "architecture"]
category: "Security"
---

### Access control has to reflect how schools actually operate
Flat role maps get weak as soon as one person can work across more than one school or hold more than one responsibility.

![Workspace Context Pattern Architecture](/projects/digital-school/workspace-pattern.png)

I wanted Digital School to model access in context. Users do not just authenticate and inherit a permanent permission set. They activate a workspace made up of role, school, and academic context. That makes the active operating position explicit.

### The workspace is part of application state
The role-selection flow merges global permissions with institution-scoped permissions, validates the selection, and stores the active context in session.

That sounds small, but it changes the whole request model. The application no longer asks, "What roles has this user ever had?" It asks, "Which responsibility is active for this request, and in which school context?"

### Middleware enforces the boundary early
Requests without a valid workspace are blocked before feature logic runs. Authorization then checks route access against the active workspace instead of some permission the user once held somewhere else.

That keeps the rest of the product cleaner. Features do not need to recover context on their own. Queries can scope directly to the active school. The frontend can render valid options for the current operator instead of guessing.

### Why this pattern fits the product
This platform has school admins, teachers, curriculum operators, finance staff, and super admins. Some users legitimately span several of those roles.

The workspace pattern matches that reality without flattening it. It gives the system one clear assumption before feature code runs: the request already knows who is acting, in what role, and for which school.

### The result
Authorization becomes more predictable because responsibility is modeled in context.

That helps every layer above it. Scheduling, finance, academic operations, and filtering all work from the same active workspace instead of rebuilding access rules feature by feature.
