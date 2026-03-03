---
title: "LMS Sertifikasi"
description: "A full-stack learning management system for professional certification with real-time tracking and assessment."
date: 2026-01-15
tags: ["elixir", "react", "websockets", "postgresql"]
role: "Lead Full-Stack Developer"
tech_stack: ["Elixir/Phoenix", "React 19", "TanStack Router/Query", "PostgreSQL"]
problem: "Organizations needed a scalable platform to manage certification programs, track learning progress in real-time, and deliver reliable assessments to thousands of concurrent learners."
approach: "Built a modular system using Ash Framework for domain logic, Phoenix Channels for real-time sync, and a React 19 frontend with granular progress tracking via xAPI."
outcome: "Serving 5,000+ concurrent learners with 99.9% uptime, 70% reduction in WebSocket CPU load, and sub-second progress synchronization."
---

## Overview

A comprehensive learning management system designed for professional certification bodies. The platform handles the full certification lifecycle — from course content delivery and real-time progress tracking to timed assessments and automated grading.

## Key Technical Highlights

- **Real-time Learning Sync** — Phoenix Channels with multiplexed room model for efficient fan-out
- **Granular Progress Tracking** — Vanilla TypeScript External Store with O(1) UI updates
- **Assessment Engine** — Timed exams with snapshot-based grading and remedial cooldown logic
- **xAPI Integration** — Full LRS compliance for learning analytics and session resumption
