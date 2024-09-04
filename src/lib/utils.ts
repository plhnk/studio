import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function smoothScrollTo(
  targetPosition: number,
  offset: number = 0,
  duration: number = 500
) {
  const startPosition = window.scrollY;
  const adjustedTargetPosition = targetPosition - offset;
  const distance = adjustedTargetPosition - startPosition;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

export function scrollDownByPercentage(
  percentage: number,
  duration: number = 500
) {
  const targetPosition =
    window.scrollY + window.innerHeight * (percentage / 100);
  smoothScrollTo(targetPosition, duration);
}

export function onPageNav(
  href: string,
  offset: number = 0,
  duration: number = 500
) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(targetPosition, offset, duration);
    }
  };
}

export const isScrolledPast = (percentage: number): boolean => {
  const scrollY = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;

  return scrollY > (documentHeight - windowHeight) * (percentage / 100);
};

export function getDateInfo() {
  const date = new Date();
  const year = date.toLocaleDateString('en-US', { year: 'numeric' });
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const today = date.toLocaleDateString('en-US', { day: 'numeric' });
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const dayOfWeekNo = date.getDay();
  const remainingDays =
    new Date(date.getFullYear(), 11, 31).getTime() - date.getTime();
  const daysLeft = Math.ceil(remainingDays / (1000 * 60 * 60 * 24));
  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };
  const daysInYear = isLeapYear(date.getFullYear()) ? 366 : 365;

  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const daysPassed: number = Math.ceil(
    (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
  );
  const percentageOfYearPassed = (daysPassed / daysInYear) * 100;

  return {
    year,
    month,
    today,
    dayOfWeek,
    dayOfWeekNo,
    daysLeft,
    percentageOfYearPassed: percentageOfYearPassed.toFixed(0),
  };
}
