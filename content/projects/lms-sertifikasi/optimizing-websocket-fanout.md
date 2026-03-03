---
title: "Optimizing WebSocket Fan-out for 5,000 Concurrent Learners"
description: "How we reduced CPU load by 70% by moving from per-user topics to a multiplexed room model."
date: 2026-02-14
tags: ["websockets", "performance", "elixir"]
category: "challenge"
---

## The Problem

When 5,000 students joined a live quiz simultaneously, the application server CPU spiked to 100%. The bottleneck was in how individual socket connections iterated over channel topics.

## The Approach

We profiled the message broker and identified that the per-user topic model created O(n) fan-out for every broadcast message.

## The Solution

We moved from a per-user topic model to a multiplexed room model, where a single channel handles all subscribers for a given context (e.g., a quiz session).

## The Result

CPU load stabilized at ~30% during identical load tests — a 70% reduction.
