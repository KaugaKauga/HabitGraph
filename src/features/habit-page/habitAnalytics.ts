import { Habit } from "../../types";

/**
 * Calculates the current streak for a true/false habit
 * A streak is consecutive days with entries, starting from today and going backwards
 */
export const getCurrentStreak = (habit: Habit): number => {
  if (!habit.isTrueFalse) {
    return 0;
  }

  const entries = habit.data.map((entry) => entry.date).sort();
  if (entries.length === 0) {
    return 0;
  }

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  let currentStreak = 0;
  const checkDate = new Date(today);

  while (true) {
    const checkDateString = checkDate.toISOString().split("T")[0];

    if (entries.includes(checkDateString)) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      // If today has no entry, we still check yesterday to see if streak was broken today
      if (checkDateString === todayString) {
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  return currentStreak;
};

/**
 * Calculates the longest streak for a true/false habit
 */
export const getLongestStreak = (habit: Habit): number => {
  if (!habit.isTrueFalse) {
    return 0;
  }

  const entries = habit.data.map((entry) => entry.date).sort();
  if (entries.length === 0) {
    return 0;
  }

  let longestStreak = 0;
  let currentStreak = 0;
  let previousDate: Date | null = null;

  for (const dateString of entries) {
    const currentDate = new Date(dateString);

    if (previousDate === null) {
      currentStreak = 1;
    } else {
      const timeDiff = currentDate.getTime() - previousDate.getTime();
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

      if (daysDiff === 1) {
        // Consecutive day
        currentStreak++;
      } else {
        // Gap in streak
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    }

    previousDate = currentDate;
  }

  // Don't forget to check the final streak
  longestStreak = Math.max(longestStreak, currentStreak);

  return longestStreak;
};

/**
 * Gets entries from the last N days
 */
export const getEntriesFromLastNDays = (habit: Habit, days: number): number => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return habit.data.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate >= cutoffDate;
  }).length;
};

/**
 * Gets entries from a specific date range with offset from today
 * @param habit - The habit to analyze
 * @param days - Number of days in the period
 * @param offsetDays - Number of days to offset from today (0 = today, 7 = 7 days ago)
 *
 * Example: getEntriesFromOffsetDays(habit, 7, 0) gets entries from last 7 days
 * Example: getEntriesFromOffsetDays(habit, 7, 7) gets entries from days 7-14 ago
 */
export const getEntriesFromOffsetDays = (
  habit: Habit,
  days: number,
  offsetDays: number,
): number => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - offsetDays);

  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days);

  return habit.data.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate >= startDate && entryDate < endDate;
  }).length;
};

/**
 * Compares entries between two time periods
 * @param habit - The habit to analyze
 * @param days - Number of days in each period
 * @returns Object with current period count, previous period count, and percentage change
 *
 * Example: compareLastNDaysWithPrevious(habit, 7) compares last 7 days with 7 days before that
 */
export const compareLastNDaysWithPrevious = (habit: Habit, days: number) => {
  const currentPeriod = getEntriesFromOffsetDays(habit, days, 0);
  const previousPeriod = getEntriesFromOffsetDays(habit, days, days);

  let percentageChange = 0;
  if (previousPeriod > 0) {
    percentageChange = Math.round(
      ((currentPeriod - previousPeriod) / previousPeriod) * 100,
    );
  } else if (currentPeriod > 0) {
    percentageChange = 100; // If previous period had 0 entries but current has some
  }

  return {
    current: currentPeriod,
    previous: previousPeriod,
    change: percentageChange,
    isImprovement: currentPeriod >= previousPeriod,
  };
};

/**
 * Gets entries from the last 7 days
 */
export const getEntriesLastSevenDays = (habit: Habit): number => {
  return getEntriesFromLastNDays(habit, 7);
};

/**
 * Gets entries from the last 30 days (approximately 1 month)
 */
export const getEntriesLastMonth = (habit: Habit): number => {
  return getEntriesFromLastNDays(habit, 30);
};

/**
 * Gets entries from the last 90 days (approximately 3 months)
 */
export const getEntriesLastThreeMonths = (habit: Habit): number => {
  return getEntriesFromLastNDays(habit, 90);
};

/**
 * Gets total entries since the habit started
 */
export const getEntriesSinceStart = (habit: Habit): number => {
  return habit.data.length;
};

/**
 * Gets all analytics for a habit
 */
export const getHabitAnalytics = (habit: Habit) => {
  return {
    currentStreak: getCurrentStreak(habit),
    longestStreak: getLongestStreak(habit),
    entriesLastSevenDays: getEntriesLastSevenDays(habit),
    entriesLastMonth: getEntriesLastMonth(habit),
    entriesLastThreeMonths: getEntriesLastThreeMonths(habit),
    entriesSinceStart: getEntriesSinceStart(habit),
  };
};
