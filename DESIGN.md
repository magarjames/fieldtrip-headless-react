---
name: Northline
description: Dawn editorial commerce for city movement
colors:
  deep-ink: "#000d10"
  pure-white: "#ffffff"
  cool-ash: "#8e8e95"
  pebble: "#d5d3d4"
  midnight-hull: "#0f0f1c"
  charcoal-deck: "#151623"
  clay-ember: "#bc7155"
  dawn-sky-top: "#d7eafa"
  dawn-sky-mid: "#eff6f7"
  dawn-sky-base: "#fbf7ef"
  world-ground: "#081315"
  world-ground-deep: "#071114"
  world-ink: "#f5f4ef"
typography:
  scale:
    control-xs: "0.82rem"
    control-sm: "0.84rem"
    control-md: "0.88rem"
    control-label: "0.89rem"
    control: "0.9rem"
    caption: "0.94rem"
    body-rem: "1rem"
    body-large: "1.15rem"
    nav-wordmark: "1.24rem"
    feature-title: "1.28rem"
    mobile-nav: "1.3rem"
    product-title: "1.35rem"
    product-title-max: "1.7rem"
    mobile-body: "17px"
    desktop-body: "18px"
    dialog-min: "2.4rem"
    drawer-min: "2.7rem"
    mobile-hero-min: "2.72rem"
    section-min: "3rem"
    mobile-section-min: "3.05rem"
    mobile-hero-max: "3.2rem"
    footer-min: "3.4rem"
    hero-min: "3.45rem"
    mobile-footer-min: "3.6rem"
    collection-min: "3.65rem"
    mobile-wordmark-min: "4.2rem"
    dialog-max: "4.25rem"
    footer-mobile-max: "5rem"
    hero-max: "5.15rem"
    section-max: "5.65rem"
    mobile-wordmark-max: "5.75rem"
    footer-max: "7rem"
    collection-max: "7.8rem"
    wordmark-max: "10.6rem"
    world-rail: "0.58rem"
    world-meta: "0.64rem"
    world-micro: "0.66rem"
    world-tag: "0.69rem"
    world-cue: "0.7rem"
    world-control: "0.72rem"
    world-action: "0.75rem"
    world-footer: "0.76rem"
    world-display-min: "3.25rem"
    world-display-max: "8.25rem"
    world-mobile-display-max: "5.3rem"
  display:
    fontFamily: "Helvetica Neue, Arial Nova, Nimbus Sans, sans-serif"
    fontSize: "clamp(3.45rem, 4.8vw, 5.15rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.055em"
  wordmark:
    fontFamily: "Helvetica Neue, Arial Nova, Nimbus Sans, sans-serif"
    fontSize: "clamp(5rem, 10.3vw, 10.6rem)"
    fontWeight: 700
    lineHeight: 0.8
    letterSpacing: "-0.075em"
  body:
    fontFamily: "Helvetica Neue, Arial Nova, Nimbus Sans, sans-serif"
    fontSize: "18px"
    lineHeight: 1.61
  scroll-world:
    fontFamily: "Archivo, Neue Haas Grotesk Display, Helvetica Neue, sans-serif"
    displayFontSize: "clamp(3.25rem, 7vw, 8.25rem)"
    microFontSize: "0.58rem to 0.76rem"
rounded:
  action: "1000px"
  panel: "0px"
spacing:
  page-gutter: "clamp(1.25rem, 5vw, 5rem)"
  section: "clamp(5.5rem, 10vw, 9.5rem)"
  action: "0.87rem 1.25rem 0.9rem"
components:
  button-primary:
    backgroundColor: "{colors.deep-ink}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.action}"
    padding: "{spacing.action}"
  button-quiet:
    backgroundColor: "rgba(255, 255, 255, 0.56)"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.action}"
    padding: "{spacing.action}"
  filter:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.action}"
  email-input:
    backgroundColor: "transparent"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.action}"
---

# Design System: Northline

## Overview

**Creative North Star: "The Dawn Transit Editorial"**

Northline treats practical city clothing like a considered travel object. The storefront opens on a pale blue-to-cream sky and one black campaign silhouette, then alternates a white editorial canvas with midnight support bands. Deep Ink is the structural color; Clay Ember appears once as the chosen product-set feature.

The redesign follows the Hyer-style reference's restraint and hierarchy, adapted for apparel rather than aviation. The result is light, typographically confident, and product-led, with the existing catalog controls left functional.

## Core Rules

### Color

- **Deep Ink `#000d10`:** headings, filled actions, footer, icon strokes, and navigation structure.
- **Pure White `#ffffff`:** primary canvas, content bands, dialog and drawer surfaces.
- **Cool Ash `#8e8e95`:** supporting copy and muted metadata.
- **Pebble `#d5d3d4`:** hairline dividers and quiet control borders.
- **Midnight Hull `#0f0f1c` and Charcoal Deck `#151623`:** full-width support and signup bands.
- **Clay Ember `#bc7155`:** one hard-edged featured system block only.

Do not introduce lime, route blue, a second accent color, or drop shadows. The sky in the hero is image atmosphere, not a reusable UI accent.

**Scroll World companion route:** `Northline World` may use the darker `#081315` stage and `#071114` terminal surface behind its generated scene posters. Clay remains the sole warm route signal. It uses Archivo as a contained editorial display face rather than changing the storefront's Helvetica-based system.

### Typography

Use a single compressed sans family for every element. The visual hierarchy comes from scale, tight tracking, and strong 700 weight rather than mixing display and body typefaces.

- Hero wordmark: `clamp(5rem, 10.3vw, 10.6rem)`, 700, `0.8` line-height, `-0.075em` tracking.
- Major statements: `clamp(3rem, 5.2vw, 5.65rem)`, 700, `0.9` line-height, `-0.055em` tracking.
- Body: `18px` with `1.61` line-height on desktop, scaling modestly to `16px` on mobile.
- Labels and controls: 17px or smaller, 700, direct and readable.
- Scroll World micro-navigation may use the documented `0.58rem` to `0.76rem` range so the pinned scene copy remains the only dominant reading layer. Its stage headings may extend to `clamp(3.25rem, 7vw, 8.25rem)`.

Hero headings should end with a period. On desktop, keep the main statement to two intentional lines. On mobile, prioritize readable scale and clean line breaks over matching the desktop geometry.

### Shapes And Elevation

Actions, filters, options, the bag control, and email field are full pills with a `1000px` radius. Media, featured surfaces, drawers, dialogs, and editorial sections are square. There is no shadow system. Temporary overlay state is separated by a dark backdrop and a hairline border.

## Layout

### Hero

The hero is a pale dawn canvas with:

- A massive Northline wordmark flush to the upper left.
- One original black outerwear campaign image held in the lower-left field and softly faded into the sky.
- A right-aligned two-line statement, support copy, and two pill actions.

At mobile widths, the hero removes the small label and gives the image its own band above the statement. This keeps the wordmark, model, copy, and actions from competing.

### Content Rhythm

1. **White collection canvas:** oversized type at the right, pill filters, and image-led products with Pebble hairlines.
2. **Midnight materials band:** grayscale material image left, features right.
3. **Clay Ember system block:** the page's one warm focal surface for the starting set.
4. **Scroll campaign film:** one continuous 300-frame dawn walk held in a sticky viewport while three campaign messages trade places around the moving figure.
5. **Charcoal signup band:** direct white-on-dark email interaction.
6. **Deep Ink footer:** a terminal wordmark and clear operational links.

Use generous section rhythm. Avoid repeating the same split layout more than twice in sequence.

## Components

### Primary Action

- Background: Deep Ink.
- Text: Pure White.
- Hover: Clay Ember background with white text.
- Shape: full pill.

### Quiet Action

- Background: translucent white.
- Border and text: Deep Ink.
- Hover: Clay Ember border and text.
- Shape: full pill.

### Filter And Product Options

- Resting state: white field, Pebble border, Deep Ink text.
- Selected state: Deep Ink field, Pure White text.
- Shape: full pill.

### Featured System Block

- Background: Clay Ember.
- Corners: square.
- Text: Pure White.
- Rule: no other Clay Ember panel or broad Clay Ember surface on the page.

### Dialogs And Bag

- Surface: Pure White.
- Border: 1px Pebble.
- Shadow: none.
- Temporary layer: Deep Ink translucent backdrop.

## Motion

Motion is a short campaign arrival, product media hover scale, a scroll-driven campaign film, and responsive button state. It should clarify hierarchy and feedback, not become a decorative system.

- Hero image and type enter once with a 760ms to 900ms cubic-bezier transition.
- Product images scale subtly on hover.
- Buttons shift by 1px to 2px on hover.
- The campaign film scrubs an adaptive 300-frame WebP sequence through a canvas: sharpened 1920×1080 frames on desktop and lighter 1280×720 frames on mobile. Three copy moments crossfade and travel around the figure from the same smoothed scroll progress, while the first poster and all copy remain available as static fallbacks.
- Under `prefers-reduced-motion`, animations and transitions resolve immediately.

## Responsive Behavior

- At `920px`, navigation collapses to the bag and Menu controls; large asymmetric sections become a single flow.
- At `640px`, the hero separates wordmark, image, and copy vertically; products are one column; newsletter controls stack; dialogs become one column.
- Mobile content keeps 1.25rem side gutters and no horizontal overflow.

## Do's And Don'ts

### Do

- Use original campaign photography and grayscale product imagery.
- Make each action's state obvious through color and text, not motion alone.
- Preserve filtering, quick view, bag, keyboard escape, focus visibility, and form feedback.
- Keep the concept storefront language honest about sample catalog and checkout data.

### Don't

- Do not bring back the former dark-lime or blue-gradient world.
- Do not add a second clay focal block.
- Do not add rounded editorial cards or drop shadows.
- Do not make the apparel shop look like an aviation site. The reference informs composition and restraint, not content or identity.
