# Phase 2: Hero & About Sections Requirements

## 📋 Phase Overview

**Duration:** 2-3 weeks  
**Priority:** High - First impression and personal narrative  
**Goal:** Create compelling hero section and authentic about experience  
**Dependencies:** Phase 1 (Foundation) must be complete

---

## 🎯 Objectives

### Primary Deliverables

1. Sophisticated hero section with breathing space
2. Personal, warm about section
3. Photo/illustration integration
4. Journey timeline visualization
5. Smooth scroll-triggered animations
6. First easter egg implementations

---

## 🎨 Hero Section Requirements

### 1.1 Visual Layout

**Design Specifications:**

- Viewport height: 85-100vh
- Asymmetric composition
- Large breathing space (40% empty)
- Offset text positioning
- Abstract illustrated element

**Layout Structure:**

```
┌────────────────────────────────────┐
│                                    │
│  [Illustrated       Your Name     │
│   Element]          Your Title    │
│                                    │
│                     Brief intro   │
│                     that feels    │
│                     personal      │
│                                    │
│                     [View Work →] │
│                                    │
└────────────────────────────────────┘
```

**Acceptance Criteria:**

- [ ] Asymmetric but balanced composition
- [ ] Minimum 40% whitespace
- [ ] Illustrated element custom-created
- [ ] Text offset vertically for dynamism
- [ ] Responsive on all devices

### 1.2 Typography & Content

**Heading Treatment:**

- Font: Fraunces or Playfair Display
- Size: 48-72px (desktop), 36-40px (mobile)
- Weight: 600-700
- Line-height: 1.1
- Letter-spacing: -0.02em (tight for display)

**Subheading Copy Examples:**

- "I craft digital experiences that feel intentional"
- "Creating thoughtful work at the intersection of art and code"
- "Designing with purpose, building with care"

**Requirements:**

- Maximum 3 lines of text
- Personal, not generic
- Action-oriented without buzzwords
- Reflects portfolio philosophy

**Acceptance Criteria:**

- [ ] Heading has proper semantic markup (h1)
- [ ] Subheading complements without repeating
- [ ] Copy approved by stakeholder
- [ ] Text remains readable on all backgrounds

### 1.3 Animation Behavior

**Entrance Animation:**

```javascript
// Staggered appearance
1. Name fades in + drift up (0-0.8s)
2. Title appears after 0.3s delay
3. Subheading after 0.6s delay
4. CTA button after 0.9s delay
5. Illustrated element throughout (subtle)
```

**Animation Specifications:**

- Fade: opacity 0 → 1
- Drift: translateY(30px) → translateY(0)
- Duration: 0.8s
- Easing: cubic-bezier(0.4, 0.0, 0.2, 1)

**Reduced Motion:**

- Simple fade only
- No transforms
- Duration: 0.2s

**Acceptance Criteria:**

- [ ] Smooth, not jarring
- [ ] Stagger timing feels natural
- [ ] No layout shift during animation
- [ ] Respects prefers-reduced-motion

### 1.4 Call-to-Action Design

**Primary CTA:**

- Text: "View My Work" or "Explore Projects"
- Style: Outlined, not filled
- Border: 2px solid var(--warm-brown)
- Padding: 16px 32px
- Border-radius: 8px

**Hover State:**

- Background fill: var(--warm-brown)
- Text color: var(--warm-cream)
- Transform: translateY(-2px)
- Shadow: 0 4px 12px rgba(107, 93, 79, 0.2)
- Transition: 0.3s ease-out

**Click State:**

- Transform: scale(0.98)
- Duration: 0.1s
- Slight bounce back

**Acceptance Criteria:**

- [ ] Button clearly actionable
- [ ] Hover state smooth
- [ ] Touch target 48px minimum (mobile)
- [ ] Keyboard focusable with clear indicator

### 1.5 Background Treatment

**Visual Elements:**

- Base: Warm cream to soft clay gradient
- Angle: 135deg for organic feel
- Paper texture overlay (2% opacity)
- Abstract organic shape in corner

**Texture Implementation:**

```css
.hero {
  background: linear-gradient(135deg, var(--warm-cream) 0%, var(--soft-clay) 100%);
  position: relative;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/textures/paper-grain.svg');
  opacity: 0.02;
  mix-blend-mode: multiply;
}
```

**Acceptance Criteria:**

- [ ] Gradient smooth, no banding
- [ ] Texture subtle, not distracting
- [ ] Performance impact minimal
- [ ] Works on all devices

### 1.6 Illustrated Element

**Requirements:**

- Custom hand-drawn or vector art
- Relates to your work (tools, abstract shapes)
- Warm color palette integration
- SVG format for crisp scaling

**Suggested Elements:**

- Sketched creative tools
- Abstract organic shapes
- Flowing lines or curves
- Minimal but meaningful

**Animation (Subtle):**

- Very gentle float or rotation
- Transform: rotate(-2deg) to rotate(2deg)
- Duration: 6s
- Infinite loop

**Acceptance Criteria:**

- [ ] Original artwork created
- [ ] SVG optimized (< 20KB)
- [ ] Scales without pixelation
- [ ] Animation adds to, not distracts from, content

---

## 📖 About Section Requirements

### 2.1 Section Layout Options

**Option A: Side-by-Side Layout**

```
┌──────────────────────────────────────┐
│                                      │
│  [Photo/        │  About Me Heading │
│   Illustration] │  Personal intro   │
│   (40%)         │  that tells your  │
│                 │  story naturally  │
│                 │  (60%)            │
│                                      │
└──────────────────────────────────────┘
```

**Option B: Centered Narrative**

```
┌──────────────────────────────────────┐
│                                      │
│          About Me Heading            │
│                                      │
│     [Photo centered, 400px max]      │
│                                      │
│     Your story in comfortable        │
│     reading width (680px max)        │
│     with illustrated elements        │
│     in margins for visual            │
│     interest and personality         │
│                                      │
└──────────────────────────────────────┘
```

**Selection Criteria:**

- Choose based on content length
- Side-by-side: shorter content (2-3 paragraphs)
- Centered: longer narrative (4-6 paragraphs)

**Acceptance Criteria:**

- [ ] Layout selected and approved
- [ ] Responsive behavior defined
- [ ] Reading comfort maintained
- [ ] Visual balance achieved

### 2.2 Photo/Portrait Treatment

**Image Specifications:**

- Format: WebP with JPG fallback
- Size: 800x800px minimum
- Aspect ratio: 1:1 or 3:4
- File size: < 150KB

**Styling Options:**

**Option 1: Organic Shape Mask**

```css
.about-photo {
  clip-path: polygon(0% 10%, 10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%);
  /* Soft organic shape */
}
```

**Option 2: Hand-Drawn Border**

- SVG border overlay
- Slightly imperfect line
- Warm brown color
- 3-4px thickness

**Option 3: Torn Paper Edge**

- Irregular edge effect
- Texture integration
- Warm shadow beneath

**Acceptance Criteria:**

- [ ] Image professionally appropriate
- [ ] Treatment enhances, not overwhelms
- [ ] Loads quickly (< 1s)
- [ ] Maintains quality on retina displays

### 2.3 About Copy Structure

**Content Framework:**

**Paragraph 1: Who You Are**

- Your background and approach
- 2-3 sentences
- Establishes credibility warmly

**Paragraph 2: What You Do**

- Your work focus and philosophy
- 3-4 sentences
- Explains value without boasting

**Paragraph 3: Why You Do It**

- Motivation and passion
- 2-3 sentences
- Personal but professional

**Optional Paragraph 4: Beyond Work**

- Interests that inform your work
- 2 sentences
- Humanizing details

**Copy Tone:**

- Warm but not overly casual
- Confident but not arrogant
- Personal but not self-centered
- Specific examples over generalizations

**Acceptance Criteria:**

- [ ] Copy edited and approved
- [ ] No jargon or buzzwords
- [ ] Reflects authentic voice
- [ ] Readable at 18px font size

### 2.4 Journey/Timeline Visualization

**Concept:**

- Not a straight line
- Meandering illustrated path
- Key milestones as nodes
- Click to expand stories

**Visual Design:**

```
    ○ 2015: Started journey
     \
      \
    ○ 2017: First major project
       \
        ○ 2019: Career shift
          \
           ○ 2022: Current focus
```

**Node Design:**

- Hand-drawn circles
- Warm color fills
- Year + brief label
- Hover for more info

**Interaction:**

- Hover: Node expands slightly
- Click: Story panel slides in
- Story: 2-3 sentences, personal anecdote
- Close: Smooth collapse

**Implementation:**

```javascript
const journeyMilestones = [
  {
    year: 2015,
    title: 'Started Journey',
    story: 'Discovered my passion for design...',
    position: { x: 20, y: 30 },
  },
  // more milestones
];
```

**Acceptance Criteria:**

- [ ] SVG path hand-drawn aesthetic
- [ ] Responsive path adjustment
- [ ] Touch-friendly on mobile
- [ ] Stories meaningful, not filler

### 2.5 "Things I Love" Section

**Design:**

- Small illustrated icons
- Grid or scattered layout
- Hover for subtle animation
- Shows personality

**Icon Examples:**

- Coffee cup (if relevant)
- Books or notebook
- Favorite tools
- Hobbies related to craft
- 6-8 items total

**Icon Specifications:**

- SVG format
- 64x64px - 96x96px
- Consistent style
- Warm color palette

**Animation:**

- Hover: Gentle bounce
- Scale: 1.0 → 1.1
- Duration: 0.3s
- Rotate: -3deg to 3deg

**Acceptance Criteria:**

- [ ] Icons custom-designed or sourced
- [ ] Each icon tells a story
- [ ] Layout adapts on mobile
- [ ] Animations feel playful not childish

### 2.6 Scroll-Triggered Animations

**About Section Entrance:**

- Trigger: 10% of section in viewport
- Heading: Fade + drift up
- Photo: Fade + scale from 0.95
- Text paragraphs: Stagger fade-in
- Timeline: Draw path animation

**Stagger Timing:**

```javascript
Heading: 0ms
Photo: 100ms
Paragraph 1: 200ms
Paragraph 2: 350ms
Paragraph 3: 500ms
Timeline: 650ms
```

**Implementation:**

- Intersection Observer API
- Threshold: 0.1
- Remove class on exit (optional)

**Acceptance Criteria:**

- [ ] Smooth entrance animations
- [ ] No animation on initial load if above fold
- [ ] Respects reduced motion
- [ ] No layout shift

---

## 🥚 First Easter Eggs Implementation

### 3.1 Logo Click Counter

**Trigger:** Click logo 7 times (steady pace)

**Behavior:**

1. Clicks 1-6: Logo subtle transform
2. Click 7: Creative process timeline reveals
3. Achievement: "Patient Explorer"

**Logo Transformations:**

```javascript
// Each click
transforms = [
  'rotate(5deg)',
  'scale(1.1)',
  'rotate(-5deg)',
  'scale(0.9)',
  'rotate(3deg)',
  'scale(1.05)',
  'rotate(0) scale(1)', // Reset before reveal
];
```

**Process Timeline Reveal:**

- Modal or slide-in panel
- Shows your creative evolution
- Hand-drawn aesthetic
- Close button prominent

**Acceptance Criteria:**

- [ ] Click tracking accurate
- [ ] Rapid clicks ignored (debounce 300ms)
- [ ] Timeline content created
- [ ] Achievement notification appears

### 3.2 Scroll Milestone Markers

**Implementation:**

- Track scroll depth
- Show gentle notifications at milestones
- 25%, 50%, 75%, 100%

**Notifications:**

- 25%: Sketch appears in margin
- 50%: "Halfway there" + small illustration
- 75%: Color palette shifts warmer
- 100%: "Journey complete" + achievement

**Visual Design:**

- Small toast in bottom-left
- Warm background
- Hand-drawn accent
- Auto-dismiss after 3s

**Acceptance Criteria:**

- [ ] Scroll tracking accurate
- [ ] Notifications don't overlap
- [ ] Mobile-friendly positioning
- [ ] Dismissible by click

### 3.3 Long Hover Revelations

**Targets:**

- Hero CTA button
- About photo
- Timeline nodes

**Hero CTA (3s hover):**

- Reveals fun fact or Easter egg hint
- "Psst... this site rewards curiosity"
- Appears above button

**About Photo (5s hover):**

- Behind-the-scenes sketch appears
- Or personal fun fact
- Soft fade-in

**Timeline Nodes (3s hover):**

- Extended story excerpt
- Additional detail not in click version

**Implementation:**

```javascript
let hoverTimer;
element.addEventListener('mouseenter', () => {
  hoverTimer = setTimeout(() => {
    revealHiddenContent();
  }, 3000);
});
element.addEventListener('mouseleave', () => {
  clearTimeout(hoverTimer);
});
```

**Acceptance Criteria:**

- [ ] Timer resets on mouse move
- [ ] Content meaningful
- [ ] Mobile: tap and hold works
- [ ] Doesn't interfere with normal interaction

---

## 🎨 Animation & Interaction Details

### 4.1 Smooth Scrolling

**Requirements:**

- Smooth scroll between sections
- CTA buttons trigger scroll
- Offset for fixed header (if applicable)
- Duration: 800-1000ms

**Implementation:**

```javascript
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});
```

**Acceptance Criteria:**

- [ ] All anchor links work
- [ ] Scroll speed feels natural
- [ ] Browser back button works
- [ ] URL updates with hash

### 4.2 Parallax Effects (Subtle)

**Hero Section:**

- Background gradient: 0.3x scroll speed
- Illustrated element: 0.5x scroll speed
- Text: 1.0x (normal)

**About Section:**

- Photo: 0.7x scroll speed
- Text: 1.0x
- Creates depth

**Implementation:**

```javascript
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  element.style.transform = `translateY(${scrolled * 0.5}px)`;
});
```

**Important:**

- Disable on mobile (performance)
- Disable for reduced motion
- Keep multipliers < 0.7 (subtle)

**Acceptance Criteria:**

- [ ] Smooth, no jank
- [ ] 60fps maintained
- [ ] Disabled conditions respected
- [ ] Adds to experience, not distracts

---

## 📱 Responsive Behavior

### 5.1 Mobile Adaptations

**Hero Section:**

- Single column layout
- Text centered
- Illustrated element smaller or hidden
- CTA button full-width option
- Padding: 24px sides

**About Section:**

- Photo above text (stacked)
- Photo width: 80% max, centered
- Timeline: vertical, simplified
- "Things I Love": 2-column grid

**Breakpoint Behavior:**

```css
/* Mobile: < 768px */
- Stack everything
- Increase touch targets
- Simplify animations

/* Tablet: 768-1023px */
- Side-by-side where space allows
- Medium padding

/* Desktop: 1024px+ */
- Full layout
- All interactions enabled
```

**Acceptance Criteria:**

- [ ] Tested on iPhone SE
- [ ] Tested on iPad
- [ ] Tested on Android phone
- [ ] No horizontal scroll
- [ ] Content remains readable

### 5.2 Touch Interactions

**Requirements:**

- All hover states have tap equivalent
- Long press = long hover
- Tap outside to close modals
- Swipe gestures considered

**Implementation:**

- Haptic feedback where supported
- Clear tap feedback (brief scale)
- No reliance on hover alone

**Acceptance Criteria:**

- [ ] Easter eggs work on mobile
- [ ] No dead zones
- [ ] Feedback immediate
- [ ] Natural gesture support

---

## 🧪 Testing Requirements

### 6.1 Content Testing

**Copy Review:**

- [ ] Proofread by 2+ people
- [ ] No typos or grammar issues
- [ ] Tone consistent throughout
- [ ] Facts accurate

**Visual Review:**

- [ ] Images high quality
- [ ] No pixelation
- [ ] Colors print-tested if needed
- [ ] Illustrations brand-consistent

### 6.2 Interaction Testing

**Hero Section:**

- [ ] CTA scrolls to projects
- [ ] Animations smooth
- [ ] Easter egg triggers work
- [ ] Mobile tap targets adequate

**About Section:**

- [ ] Timeline interactive
- [ ] Photos load properly
- [ ] Text readable
- [ ] Easter eggs discoverable

### 6.3 Performance Testing

**Targets:**

- [ ] LCP < 2.5s (hero image/text)
- [ ] FID < 100ms (interactions)
- [ ] CLS < 0.1 (no layout shift)
- [ ] Total section weight < 500KB

**Tools:**

- Lighthouse
- WebPageTest
- Chrome DevTools Performance tab

---

## 📦 Deliverables Checklist

### Code Deliverables

- [ ] Hero section HTML/CSS/JS
- [ ] About section HTML/CSS/JS
- [ ] Timeline component
- [ ] Photo component with treatments
- [ ] First 3 easter eggs
- [ ] Scroll animations
- [ ] Achievement notification system

### Content Deliverables

- [ ] Final hero copy
- [ ] Complete about narrative
- [ ] Timeline milestone stories
- [ ] Illustrated elements
- [ ] Professional photo
- [ ] Icon set for "Things I Love"

### Documentation

- [ ] Component usage guide
- [ ] Easter egg documentation
- [ ] Content update instructions
- [ ] Animation timing reference

---

## 🎯 Success Criteria

### Must Pass Before Phase 3:

1. Hero makes strong first impression
2. About section feels authentic
3. All animations smooth (60fps)
4. 3 easter eggs functional
5. Responsive on all devices
6. Copy approved and polished
7. Photos/illustrations finalized
8. Performance budget met

### Phase 2 Complete When:

- Stakeholder approval received
- All acceptance criteria checked
- No critical bugs
- Documentation complete
- Ready for project showcase integration

---

## 📝 Notes

- This phase establishes your personal brand
- Take time with copy - it matters
- Easter eggs should feel rewarding
- Quality over speed
- Get feedback early and often
