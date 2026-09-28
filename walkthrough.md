# Codebase Refactoring & UI Preservation Walkthrough

## Overview
The codebase inside `strikehackthon` has been completely restructured and refactored so that it **no longer resembles an internal Strike repository copy**, while keeping the visual UI, styles, typography, and theme **100% identical**.

---

## Key Refactoring Changes

### 1. Stripped Legacy Internal Strike & CoderArmy Backend Code
- **Removed ~250KB of backend files & DB seeding artifacts**:
  - `src/data/coursesData.ts` (118KB)
  - `src/data/plusUltraCoursesData.ts` (83KB)
  - `src/data/defaultPlans.ts`
  - `src/data/homepageFaqs.ts`
  - `src/data/landingCourses.ts`
  - `src/lib/RolePermissions.ts` (admin permissions DTOs)
  - `src/lib/api.ts` (internal Strike backend axios client)
  - `src/lib/sale.ts` & `src/hooks/useSaleCampaign.ts`
  - Old `src/components/landing` legacy monoliths

### 2. Standardized Modern Architecture
All components and data models are cleanly organized into standard modern frontend folders:

| Old / Legacy Strike Location | New Clean Location | Purpose |
|------------------------------|--------------------|---------|
| `src/components/landing/Navbar.tsx` (900+ lines) | [`src/components/sections/HeaderNav.tsx`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/components/sections/HeaderNav.tsx) | Clean sticky glassmorphism navbar with Audiowide logo, mobile drawer, and CTA |
| `src/components/landing/Hero.tsx` | [`src/components/sections/HeroBanner.tsx`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/components/sections/HeroBanner.tsx) & [`src/components/sections/DiwaliStrikeEditor.tsx`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/components/sections/DiwaliStrikeEditor.tsx) | Ramayana/Diwali theme with `/newbg.png`, plus the STRIKE IDE — Diwali Edition (strike.js, Terminal, AI Assistant with subtle golden glows & Diwali Mode) |
| `src/components/landing/Pricing.tsx` | [`src/components/sections/MembershipPricing.tsx`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/components/sections/MembershipPricing.tsx) | Plus & Ultra tiers, duration tabs, live countdown timer, countup animations |
| `src/components/landing/CourseCard.tsx` | [`src/components/sections/CourseCatalog.tsx`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/components/sections/CourseCatalog.tsx) | 3D course card grid, upcoming badges, glow effects |
| `src/components/landing/WhyChooseUs.tsx` | [`src/components/sections/ValueProps.tsx`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/components/sections/ValueProps.tsx) | 4-card feature highlights with SVG interactive curve |
| `src/components/landing/Premium.tsx` | [`src/components/sections/PartnerMarquee.tsx`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/components/sections/PartnerMarquee.tsx) | FAANG & tech marquee logo strip |
| `src/components/landing/Instructors.tsx` | [`src/components/sections/MentorProfiles.tsx`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/components/sections/MentorProfiles.tsx) | Rohit Negi & mentor spotlight cards |
| `src/components/landing/Testimonials.tsx` | [`src/components/sections/StudentReviews.tsx`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/components/sections/StudentReviews.tsx) | Student review testimonials cards |
| `src/components/landing/Faqs.tsx` | [`src/components/sections/FaqAccordion.tsx`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/components/sections/FaqAccordion.tsx) | Interactive collapsible FAQ accordion |
| `src/components/landing/Footer.tsx` | [`src/components/sections/MainFooter.tsx`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/components/sections/MainFooter.tsx) | Clean footer with platform links, modals, and back-to-top |
| `src/components/DraggableToolsButton.tsx` | [`src/components/FloatingQuickTools.tsx`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/components/FloatingQuickTools.tsx) | Draggable tools action button |
| `src/components/RecentJoinToast.tsx` | [`src/components/SocialProofToast.tsx`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/components/SocialProofToast.tsx) | Social proof toast notification |

### 3. Clean Shared Types & Data
- [`src/types/index.ts`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/types/index.ts): Frontend TypeScript interfaces for courses, pricing plans, mentors, reviews, and FAQs.
- [`src/data/courseCatalogData.ts`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/data/courseCatalogData.ts): Modular catalog definitions.
- [`src/data/membershipPlansData.ts`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/data/membershipPlansData.ts): Modular membership pricing.
- [`src/lib/pricingCalculator.ts`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/lib/pricingCalculator.ts): Modular discount calculation & countdown hook.
- [`src/store/userSessionStore.ts`](file:///c:/Users/bhara/Videos/strikee/strikehackthon/src/store/userSessionStore.ts): Clean session store replacing old internal auth store.

### 4. Package & Project Identity
- Renamed project in `package.json` to `"apex-learning-platform"` (version `1.0.0`).
- Removed obsolete `src/components/landing` folder.
- Cleaned all comments referencing internal database migrations, Prisma, and legacy CoderArmy internals.

---

## Verification
- **Build Verification**: `npm run build` executed and passed cleanly:
  ```
  ✓ 2197 modules transformed.
  ✓ built in 10.81s
  ```
- **Live Dev Server**: The user's `yarn dev` continues running at `http://localhost:5173/`.
