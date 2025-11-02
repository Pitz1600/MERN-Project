// utils/chartUtils.js

// ✅ Aggregate analyses by date for line chart
export const computeLineChartData = (analysesData) => {
  const dailyCounts = {};

  analysesData.forEach((analysis) => {
    const rawDate =
      analysis.createdAt || analysis.date || analysis.updatedAt || null;
    if (!rawDate) return;

    // Convert to YYYY-MM-DD for grouping
    const date = new Date(rawDate).toISOString().slice(0, 10);

    // Ensure structure exists
    if (!dailyCounts[date]) {
      dailyCounts[date] = { date, biased: 0, neutral: 0, reviewable: 0 };
    }

    // Count each category
    analysis.results?.forEach((r) => {
      const category = r.category?.toLowerCase();
      if (category === "biased") dailyCounts[date].biased += 1;
      else if (category === "neutral") dailyCounts[date].neutral += 1;
      else dailyCounts[date].reviewable += 1;
    });
  });

  // Convert object → sorted array by date
  const sortedData = Object.values(dailyCounts).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return sortedData;
};