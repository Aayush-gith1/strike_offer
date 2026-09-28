import { membershipPlansData } from "@/data/membershipPlansData";
import { courseCatalogData } from "@/data/courseCatalogData";

export const recentActivityService = {
  fetchRecentJoin: async () => ({
    data: { success: true, data: { user: "Rahul Sharma from Bangalore" } },
  }),
};

export const membershipService = {
  getActivePlans: async () => ({
    data: { success: true, data: membershipPlansData },
  }),
  getPlanBySlug: async (slug: string) => ({
    data: {
      success: true,
      data: membershipPlansData.find((p) => p.slug === slug) || membershipPlansData[0],
    },
  }),
};

export const courseService = {
  getCatalogCourses: async () => ({
    data: { success: true, data: courseCatalogData },
  }),
};
