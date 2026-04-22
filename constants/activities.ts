import { Activity, ActivityType } from "@/models/common";

// Configuration Array: A mix of specific doctor visits (by ID) and lab tests
export const RECENT_ACTIVITIES: Activity[] = [
  {
    id: "10",
    type: ActivityType.Doctor,
    date: "23 Mar",
    time: "16:00",
    theme: {
      bg: "bg-[#6B8FE8]",
      shadow: "shadow-blue-200",
      text: "text-blue-100",
    },
  },
  {
    id: "11",
    type: ActivityType.Test,
    title: "Blood test",
    subtitle: "Complete Hemogram (CBC)",
    date: "23 Mar",
    time: "08:00",
    icon: "🩸",
    theme: {
      bg: "bg-[#F47E60]",
      shadow: "shadow-orange-200",
      text: "text-orange-100",
    },
  },
  {
    id: "9",
    type: ActivityType.Doctor,
    date: "15 Mar",
    time: "10:30",
    theme: {
      bg: "bg-[#9B7EDE]",
      shadow: "shadow-purple-200",
      text: "text-purple-100",
    },
  },
  {
    id: "12",
    type: ActivityType.Test,
    title: "X-Ray",
    subtitle: "Chest PA View",
    date: "10 Mar",
    time: "14:00",
    icon: "🩻",
    theme: {
      bg: "bg-[#4DB6AC]",
      shadow: "shadow-teal-200",
      text: "text-teal-100",
    },
  },
  {
    id: "7",
    type: ActivityType.Doctor,
    date: "02 Mar",
    time: "18:00",
    theme: {
      bg: "bg-[#5C6BC0]",
      shadow: "shadow-indigo-200",
      text: "text-indigo-100",
    },
  },
];
