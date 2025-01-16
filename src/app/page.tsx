import { HomePage } from "@/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home - Posts',
  description: 'Browse through our collection of posts.',
};

export default function Home() {
  return (
    <HomePage />
  );
}
