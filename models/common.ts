export enum ActivityType {
  Doctor = "Doctor",
  Test = "Test",
}

export interface Activity {
  id: string;
  type: ActivityType;
  date: string;
  time: string;
  theme: {
    bg: string;
    shadow: string;
    text: string;
  };
  // Only for Test type
  title?: string;
  subtitle?: string;
  icon?: string;
}
