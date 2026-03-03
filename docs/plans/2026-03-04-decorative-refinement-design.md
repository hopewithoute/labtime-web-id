# Design: Neo-Technical Decorative Refinements

## Goal
To refine the existing "Brutalist-lite" design of LabTime with "Neo-Technical" decorative elements that enhance the aesthetic without compromising the sharp, high-contrast look.

## Proposed Design: Metric Corner Approach

The refinements focus on a "Metric Corner" aesthetic, introducing technical markers and framing elements that evoke a high-end terminal or HUD interface.

### 1. New Component: `MetricTag`
A lightweight component used for displaying technical status or data markers.
- **Font**: Monospace, small caps.
- **Styling**: 
  - Subtle background (`bg-foreground/5`) in light mode, (`bg-primary/10`) in dark mode.
  - Thin borders.
  - Status indicators (dots for OK, ERR, WARN).
- **Placement**: Corners of content blocks, header, and footer.

### 2. Corner-Only Borders
Instead of full bounding boxes, featured sections will use "L-shaped" corner accents.
- **Implementation**: Four absolute-positioned `div` components (approx. 15px wide/high) at the corners of a container.
- **Use Cases**: Hero section, Project Cards, and maybe the main content container.

### 3. Tactile Interactivity
- **Button Hover**: Text will be wrapped in `[` and `]` characters on hover, accompanied by a slight horizontal shift or "nudge" effect.
- **Active cursor**: Add a subtle, periodic "flicker" animation to the existing cursor element (`▮`) to make it feel "live".

## Architecture
- `app/components/MetricTag.vue`: New UI component.
- `app/components/CornerFrame.vue`: New wrapper component for corner accents.
- Styling updates to `app/assets/css/tailwind.css` for the flicker animation and global decorative tokens.

## User Approval
User approved the "Metric Corner" approach on 2026-03-04.
