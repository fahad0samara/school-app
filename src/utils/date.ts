// Helper function to convert a number to a string with leading zero if needed
export function padNumber(num: number): string {
  return num.toString().padStart(2, "0");
}

// Function to convert datePost to "time ago" format with support for different locales
export function getTimeAgo(
  datePost: string | Date,
  locale: "en" | "ar" = "en"
): string {
  const currentDate = new Date();
  const postDate = new Date(datePost);

  const seconds = Math.floor(
    (currentDate.getTime() - postDate.getTime()) / 1000
  );
  if (seconds < 60) {
    return locale === "en" ? `${seconds} seconds ago` : `${seconds} ثواني مضت`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return locale === "en" ? `${minutes} minutes ago` : `${minutes} دقائق مضت`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return locale === "en" ? `${hours} hours ago` : `${hours} ساعات مضت`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return locale === "en" ? `${days} days ago` : `${days} أيام مضت`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return locale === "en" ? `${months} months ago` : `${months} أشهر مضت`;
  }

  const years = Math.floor(months / 12);
  return locale === "en" ? `${years} years ago` : `${years} سنوات مضت`;
}
