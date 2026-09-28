export const useStreakData = () => {
  return {
    currentStreak: 5,
    maxStreak: 12,
    hasSubmittedToday: true,
    streakStatus: "active" as const,
    message: "Come tomorrow to maintain streak!",
    isLoading: false,
    error: null,
  };
};
