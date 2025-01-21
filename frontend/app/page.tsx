"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  console.log(theme);
  return (
    <div>
      <Button onClick={toggleTheme}>Theme</Button>
    </div>
  );
}
