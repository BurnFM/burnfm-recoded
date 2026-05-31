"use client";

import React, { useState } from "react";
import { Profile } from "@/lib/types";
import styles from "@/app/about/about.module.css";
import PillTabBar from "@/components/PillTabBar/PillTabBar";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import Motion from "@/components/motion";
import HScroll from "@/components/HScroll/HScroll";

type Props = { committees: Profile[] };

// helper to normalize year everywhere
const normalizeYear = (year: number) =>
  year < 100 ? 2000 + year : year;

export default function CommitteeSection({ committees }: Props) {
  // normalize dataset once
  const normalizedCommittees = committees.map((p) => ({
    ...p,
    year: normalizeYear(p.year),
  }));

  const years = Array.from(
    new Set(normalizedCommittees.map((p) => p.year))
  ).sort((a, b) => b - a);

  const pillsData = years.map((year, i) => {
    const nextYearShort = String((year + 1) % 100).padStart(2, "0");

    return {
      id: i,
      year,
      text: `${year}-${nextYearShort}`,
    };
  });

  const [selectedYear, setSelectedYear] = useState(years[0]);

  const handlePillSelect = (id: number) => {
    setSelectedYear(pillsData[id].year);
  };

  return (
    <div className={styles.Team_Section}>
      <h2 className={styles.Header}>The Team</h2>

      <HScroll color={"rgba(0, 0, 0, 0)"} className={"-m-1"}>
        <PillTabBar data={pillsData} onSelect={handlePillSelect} />
      </HScroll>

      <Motion className={styles.ProfileGrid}>
        {normalizedCommittees
          .filter((p) => p.year === selectedYear)
          .map((profile, i) => (
            <ProfileCard
              key={`${profile.year}-${i}`}
              profile={profile}
              priority={i < 3}
              id={`${selectedYear}-${i}`}
            />
          ))}
      </Motion>
    </div>
  );
}