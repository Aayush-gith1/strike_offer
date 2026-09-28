// Core Application Type Definitions

export interface UserSession {
  id?: string;
  email?: string;
  username?: string;
  name?: string;
  profilePicture?: string;
  role: "GUEST" | "STUDENT" | "PRO_MEMBER" | "ADMIN";
  enrolledPrograms?: string[];
  permissions?: string[];
}

export interface ProgramTierVariant {
  label: string;
  originalPrice: number | string;
  sellingPrice: number | string;
  currency: string;
  isBestValue: boolean;
  bestValueLabel?: string | null;
  isActive: boolean;
  displayOrder: number;
}

export interface ProgramTierFeature {
  name: string;
  included: boolean;
  isActive: boolean;
  displayOrder: number;
}

export interface SpecialPromotionalOffer {
  name: string;
  code?: string | null;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  applicableVariantIds?: string[];
  startAt?: string | null;
  endAt?: string | null;
  isActive: boolean;
  displayOrder: number;
}

export interface MembershipPlanTier {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  learnerCount: number;
  tagline?: string | null;
  isMostPopular: boolean;
  popularLabel?: string | null;
  isActive: boolean;
  displayOrder: number;
  variants: ProgramTierVariant[];
  features: ProgramTierFeature[];
  offers?: SpecialPromotionalOffer[];
}

export interface CourseCatalogCard {
  courseId: string;
  stats: string;
  imageUrl: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  badgeLabel?: string;
  enrolledStudents: string;
  isPopular?: boolean;
  isComboCourse?: boolean;
  showTopText?: boolean;
  displayOrder?: number;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface MentorProfile {
  id: number;
  name: string;
  role: string;
  company: string;
  education: string;
  package: string;
  expertise: string;
  description: string;
  image: string;
  linkedin: string;
}

export interface StudentReview {
  id: number;
  name: string;
  role: string;
  company?: string;
  testimonial: string;
  avatar?: string;
  rating?: number;
  package?: string;
  previousRole?: string;
  hike?: string;
  cohort?: string;
  verified?: boolean;
  linkedin?: string;
  skills?: string[];
  highlight?: string;
  category?: "faang" | "switch" | "fresher" | "high-package";
}

