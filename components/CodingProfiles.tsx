import React, { useEffect, useState } from "react";
import { Button } from "./ui/MovingBorders";

const codingProfilesData = [
  {
    id: 1,
    name: "LeetCode",
    url: "https://leetcode.com/u/Tusharr2004/",
    logo: "/leetcode-logo.svg",
    baseStreak: 500,
    description: "Solved over 880 questions.",
  },
  {
    id: 2,
    name: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/user/tusharbhard2004/",
    logo: "/gfg-logo.svg",
    baseStreak: 325,
    description: "Institute Rank 75, solved 540 questions.",
  },
  {
    id: 3,
    name: "CodeChef",
    url: "https://www.codechef.com/users/tushar2004b",
    logo: "/codelogo.svg",
    baseStreak: 705,
    description: "Division 3 ranking.",
  },
  {
    id: 4,
    name: "Coding Ninjas",
    url: "https://www.naukri.com/code360/profile/Bhar_dwajTushar",
    logo: "/cnlogo.svg",
    baseStreak: 335,
    description: "Solved over 720 MCQs and 70 coding problems.",
  },
];

// Function to get updated streak
const getUpdatedStreak = (profileId: number, baseStreak: number) => {
  const storedData = localStorage.getItem(`streak_${profileId}`);
  const lastUpdated = storedData ? JSON.parse(storedData).lastUpdated : null;
  const storedStreak = storedData ? JSON.parse(storedData).streak : baseStreak;

  const lastDate = lastUpdated ? new Date(lastUpdated) : new Date();
  const currentDate = new Date();

  // Calculate difference in days
  const diffTime = currentDate.getTime() - lastDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Update streak only if days have passed
  const newStreak = storedStreak + Math.max(0, diffDays);

  // Store updated values in localStorage
  localStorage.setItem(
    `streak_${profileId}`,
    JSON.stringify({ streak: newStreak, lastUpdated: currentDate.toISOString() })
  );

  return newStreak;
};

const CodingProfiles = () => {
  const [profiles, setProfiles] = useState(codingProfilesData);

  useEffect(() => {
    const updatedProfiles = profiles.map((profile) => ({
      ...profile,
      streak: getUpdatedStreak(profile.id, profile.baseStreak),
    }));
    setProfiles(updatedProfiles);
  }, []);

  return (
    <div className="py-20 w-full" id="code">
      <h1 className="heading text-center text-4xl font-semibold text-gray-900 dark:text-white mb-8">
        My <span className="text-purple">Coding Profiles</span>
      </h1>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 mx-auto max-w-5xl">
        {profiles.map((profile) => (
          <Button
            key={profile.id}
            duration={Math.floor(Math.random() * 10000) + 10000} // Random animation duration
            borderRadius="1.75rem"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem * 0.96)`,
            }}
            className="relative text-black dark:text-white border-neutral-200 dark:border-slate-800 flex flex-col items-center p-6 transition-transform transform hover:scale-105 shadow-lg rounded-xl overflow-hidden"
          >
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center"
            >
              <img
                src={profile.logo}
                alt={`${profile.name} logo`}
                className="w-20 h-20 mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2">{profile.name}</h2>
              <p className="text-sm text-gray-300 text-center px-4">
                {profile.description}
                <br />
                <span className="font-bold">🔥 Streak: {profile.streak} days</span>
              </p>
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CodingProfiles;
