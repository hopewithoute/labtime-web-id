# Design: Navigation Animation Refinement (Kernel Panic/Refresh)

**Date**: 2026-03-08
**Topic**: Navigation Animation Refinement
**Status**: Approved

## Overview
Refine the page navigation experience to align with a "Terminal Authenticity" aesthetic. The goal is to move away from smooth modern fades towards a "minimalist-authentic" terminal refresh, simulating a CRT de-energizing and buffer re-rendering.

## Proposed Design

### 1. Page Transitions (`app/app.vue`)
Replace the current blur/translate effect with a sharp, staccato flicker and wipe.

- **Leave Active**: `terminal-flicker` animation (rapid opacity jumps) played in reverse.
- **Enter Active**: `terminal-reveal` (vertical `clip-path` wipe) combined with `terminal-flicker`.
- **Timing**: ~300ms for the reveal, ~200ms for the flicker.

### 2. Loader Integration (`NavigationLoader.vue`)
Polish the terminal-themed loader to feel more active during the "Kernel Refresh".

- **Status Messages**: Cycle through technical tasks (`FETCH_PAGE_BUFFER`, `COMPILING_VNODE`, `MOUNTING_DOM`).
- **Visuals**: Add a subtle scanline overlay to the absolute-positioned loader bar.
- **Completion**: A single sharp "invert" flash or flicker when `progress == 100` to bridge the gap into the page reveal.

### 3. Aesthetics
- **Blinking**: Maintain consistent blinking cursors.
- **Sharpness**: Avoid blurs; prefer `steps()` timing functions for a digital/mechanical feel.

## Verification Plan
- **Visual Check**: Navigation should feel "sharp" and "clippy" rather than "smooth" and "cloudy".
- **Performance**: Ensure animations don't stutter on mobile (use `transform` and `clip-path`).
- **Timing**: Verify the loader disappears exactly when the page content is ready to "wipe" in.
