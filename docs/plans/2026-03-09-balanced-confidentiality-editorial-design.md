# Balanced Confidentiality Editorial Design

**Date:** 2026-03-09  
**Status:** Approved for execution  
**Audience:** Recruiters, hiring managers, and technical reviewers

## Overview

This design defines how LabTime project writeups should present prior work without giving the impression that proprietary employer details are being disclosed. The goal is to preserve technical credibility while making the material read like professional case studies rather than internal architecture notes.

## Problem Statement

Several project pages communicate strong engineering judgment, but some of them currently include identifiers, snippets, metrics, and workflow details that feel too close to production internals. Even if the content is substantially original, a recruiter could still read it as "this person is comfortable exposing company implementation detail."

## Goals

- Keep the portfolio technically credible
- Reduce signals of proprietary disclosure
- Preserve architectural decision-making and trade-off reasoning
- Standardize tone across project writeups
- Make confidentiality judgment visible to recruiters

## Non-Goals

- Removing all technical specificity
- Rebranding the projects or changing their core narratives
- Rewriting sample/demo articles unrelated to prior employer work
- Introducing new site UI for legal notices

## Editorial Strategy

### Keep

- Problem framing
- Constraints and operational realities
- Architectural decisions
- Trade-offs and why a given boundary was chosen
- Outcome statements at a qualitative level

### Generalize

- Internal class, table, controller, middleware, and helper names
- Queue, cache, and authorization flow details that read like implementation notes
- Metrics and scale claims that appear non-public or operationally sensitive
- Security and integration mechanisms that are more specific than necessary

### Remove or Replace

- Verbatim code snippets from employer-style systems
- Schema definitions and request-handling examples
- Exact internal channel names, issue codes, and storage keys
- Framework API calls where the concept is more important than the function name

## Standard Article Shape

Each project writeup should emphasize:

1. Problem
2. Constraint
3. Decision
4. Trade-off
5. Outcome

This structure lets the writing stay technical while shifting attention from implementation artifacts to engineering judgment.

## Tone Guidelines

- Write like a system designer explaining a decision after the fact
- Prefer concepts over internals
- Use concrete but non-sensitive language
- Avoid sounding like an internal design review or production postmortem
- Make discretion visible without sounding defensive

## Project-Level Framing

The two main project index pages should explicitly state that some identifiers and implementation details are intentionally generalized to respect prior employer confidentiality while preserving the technical decisions and trade-offs.

## Verification Criteria

The rewrite is successful when:

- employer-style code snippets are removed from project case studies
- internal identifiers are generalized across high-risk pages
- recruiter-facing tone remains technically strong
- overview pages include confidentiality-aware framing

