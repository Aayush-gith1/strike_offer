export const useOnboardingTour = ({ showOnFirstLogin = false, navigate }: { showOnFirstLogin?: boolean; navigate?: any } = {}) => {
  return {
    startOnboardingTour: () => {
      const coursesSection = document.getElementById("courses");
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: "smooth" });
      }
    },
    resetOnboardingTour: () => {},
  };
};
