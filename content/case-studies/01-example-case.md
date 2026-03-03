---
title: "Optimizing High-Volume WebSocket Subscriptions"
description: "How we reduced CPU load by 70% in a real-time learning platform."
date: 2026-02-14
tags: ["websockets", "performance", "elixir"]
problem_statement: "The application server was crashing during peak load due to an inefficient fan-out architecture for real-time quiz updates."
---

## The Problem
When 5,000 students joined a live quiz simultaneously, the application server CPU spiked to 100%.

## The Approach
We profiled the message broker and identified the bottleneck in how individual socket connections were iterating over channel topics.

## The Solution
We moved from a per-user topic model to a multiplexed room model.

## The Result
CPU load stabilized at ~30% during identical load tests.
