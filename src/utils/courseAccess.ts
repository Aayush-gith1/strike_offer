/**
 * Access Verification and Membership Entitlement Utilities
 */

/**
 * List of item_names that grant full access to the entire platform
 */
export const FULL_ACCESS_COURSES = [
  "strike plus (2 year)",
  "strike plus (3 year)",
  "strike plus (4 year)",
  "strike ultra (2 year)",
  "strike ultra (3 year)",
  "strike ultra (4 year)",
];

/**
 * Minimal course reference shape — compatible with both DB responses and
 * local CourseData objects. Only the title fields needed for access matching.
 */
export interface CourseRef {
  courseId: string;
  title: string;
  shortTitle: string;
}

/**
 * Normalize string for comparison
 */
const normalize = (s: string) => s.trim().toLowerCase();

/**
 * Check if the user's purchased course list grants full platform access
 */
export const hasFullPlatformAccess = (
  purchasedCourses?: string[] | null
): boolean => {
  if (
    !purchasedCourses ||
    !Array.isArray(purchasedCourses) ||
    purchasedCourses.length === 0
  ) {
    return false;
  }

  return purchasedCourses.some((course) => {
    if (!course || typeof course !== "string") return false;
    const normalized = course.trim().toLowerCase().replace(/\s+/g, " ");
    return (
      FULL_ACCESS_COURSES.includes(normalized) ||
      FULL_ACCESS_COURSES.some(
        (fullCourse) =>
          normalized === fullCourse || normalized.includes(fullCourse)
      )
    );
  });
};

/** Return the highest membership tier found in the user's purchased items. */
export const getMembershipTier = (
  purchasedCourses?: string[] | null
): "plus" | "ultra" | null => {
  if (!Array.isArray(purchasedCourses) || purchasedCourses.length === 0) return null;

  const normalizedCourses = purchasedCourses
    .filter((course): course is string => typeof course === "string")
    .map((course) => course.trim().toLowerCase().replace(/\s+/g, " "));

  if (
    normalizedCourses.some(
      (course) =>
        course.includes("strike ultra") ||
        course.includes("ultra (") ||
        course === "ultra"
    )
  ) {
    return "ultra";
  }

  if (
    normalizedCourses.some(
      (course) =>
        course.includes("strike plus") ||
        course.includes("plus (") ||
        course === "plus"
    )
  ) {
    return "plus";
  }

  return null;
};

export const hasUltraAccess = (purchasedCourses?: string[] | null): boolean =>
  getMembershipTier(purchasedCourses) === "ultra";

export const hasPlusAccess = (purchasedCourses?: string[] | null): boolean =>
  getMembershipTier(purchasedCourses) === "plus";

/**
 * Backend item_name to frontend shortTitle mapping.
 *
 * Each purchase grants access to that specific course page only.
 * Combo purchase = Combo page only (NOT individual DSA/GenAI pages).
 */
const COURSE_MAPPINGS: Record<string, string[]> = {
  "data structure and algorithm premium course": [
    "data structures & algorithms",
  ],
  "dsa and genai course": [
    "dsa + genai combo",
  ],
  "genai live course": [
    "generative ai",
  ],
  "web development + system design + security": [
    "thunder: 100 days of code",
  ],
  "web development + system design + security + devops (new)": [
    "thunder: 100 days of code",
  ],
  "devops full course": [
    "devops course",
  ],
  "devops course": [
    "devops course",
  ],
};

/**
 * Check if user has purchased a specific course.
 *
 * @param purchasedCourses - Array of course names from user.item_name
 * @param course - A shortTitle/title string (DB course or legacy courseId)
 */
export const hasAccessToCourse = (
  purchasedCourses: string[],
  course: CourseRef | string
): boolean => {
  if (!purchasedCourses || purchasedCourses.length === 0) return false;
  if (!course) return false;

  // Full platform access holders can access every course
  if (hasFullPlatformAccess(purchasedCourses)) {
    return true;
  }

  const targetTitles: string[] = [];
  if (typeof course === "string") {
    targetTitles.push(normalize(course));
  } else {
    targetTitles.push(normalize(course.courseId));
    targetTitles.push(normalize(course.title));
    targetTitles.push(normalize(course.shortTitle));
  }

  for (const purchased of purchasedCourses) {
    const purchasedNormalized = normalize(purchased);

    for (const target of targetTitles) {
      if (purchasedNormalized === target) return true;
      if (purchasedNormalized.includes(target) || target.includes(purchasedNormalized)) return true;
    }

    // Check via mapping
    const mappedCourses = COURSE_MAPPINGS[purchasedNormalized];
    if (mappedCourses) {
      for (const mapped of mappedCourses) {
        const mappedNorm = normalize(mapped);
        for (const target of targetTitles) {
          if (mappedNorm === target || mappedNorm.includes(target) || target.includes(mappedNorm)) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

/**
 * Check if purchased courses include combo course or full platform access.
 */
export const hasComboAccess = (purchasedCourses: string[]): boolean => {
  if (hasFullPlatformAccess(purchasedCourses)) {
    return true;
  }

  return purchasedCourses.some((course) => {
    const normalized = normalize(course);
    return (
      normalized.includes("combo") ||
      normalized.includes("+") ||
      (normalized.includes("dsa") && normalized.includes("genai")) ||
      (normalized.includes("dsa") && normalized.includes("gen"))
    );
  });
};
