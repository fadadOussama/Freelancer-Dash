"use client";
export type referralSourceType = "LinkedIn" | "Ads" | "Github" | "Freelance Platform" | "Personal Network" | "Others";
export type ClientType = {
  id: string;
  name: string;
  email: string;
  country: string;
  projects: number;
  referralSource: referralSourceType;
};
