import xp_tables from '../../constants/xp_tables';
import { ExperienceCalculationResult } from '../../types/common';
import {
  DungeonFloorsClass,
  IDungeonFloors,
  DungeonFloorsProps,
  IGetDungeons,
  IGetDungeonsLitePlayer,
  IGetDungeonsLiteCheck,
} from '../../types/hypixelStats/dungeon';
import { toTitleCase } from '../../utils/stringCase';

const rankToScore = {
  C: 0,
  B: 175,
  A: 240,
  S: 270,
  'S+': 300,
};

function calcCatacombs(experience: number, infinite?: boolean): ExperienceCalculationResult {
  const table = 'catacombs';

  if (experience <= 0) {
    return {
      xp: 0,
      level: 0,
      levelWithProgress: 0,
      xpCurrent: 0,
      xpForNext: xp_tables[table][0],
      progress: 0,
    };
  }

  let xp = 0;
  let level = 0;
  let xpForNext = 0;
  let progress = 0;
  let maxLevel = 0;

  if (xp_tables.max_levels.dungeoneering) {
    maxLevel = xp_tables.max_levels.dungeoneering;
  }

  for (let i = 1; i <= maxLevel; i++) {
    xp += xp_tables[table][i - 1] || 200000000;

    if (xp > experience) {
      xp -= xp_tables[table][i - 1] || 200000000;
    } else {
      if (i <= maxLevel) level = i;
    }
  }

  let xpCurrent = Math.floor(experience - xp);

  if (infinite) {
    const maxExperience = xp_tables[table].at(-1)!;

    const levelAddition = Math.floor(xpCurrent / maxExperience);
    level += levelAddition;
    xp += levelAddition * maxExperience;
    xpCurrent = Math.floor(experience - xp);
  }

  if (infinite || level < maxLevel) {
    xpForNext = Math.ceil(xp_tables[table][level] || 200000000);
    progress = Math.max(0, Math.min(xpCurrent / xpForNext, 1));
  } else {
    xpForNext = 0;
    progress = 0;
  }

  const levelWithProgress = level + (progress !== 1 ? progress : 0);
  xp = experience;

  return {
    xp,
    level,
    levelWithProgress,
    xpCurrent,
    xpForNext,
    progress,
  };
}

function getScoreName(score: number): string {
  let name = 'C';
  for (const rank of Object.keys(rankToScore)) {
    if (score < rankToScore[rank as keyof typeof rankToScore]) break;
    name = rank;
  }
  return name;
}

export const getDungeons = function getDungeons(player: any, profile: any): IGetDungeons | null {
  try {
    const { dungeons } = profile;
    const { catacombs } = dungeons.dungeon_types;
    const { master_catacombs } = dungeons.dungeon_types;

    const floors: IDungeonFloors = {};
    const master_mode_floors: IDungeonFloors = {};

    const floorNameList: DungeonFloorsProps = Object.keys(new DungeonFloorsClass()) as DungeonFloorsProps;

    for (const [i, floor_name] of floorNameList.entries()) {
      floors[floor_name] = {
        times_played: catacombs?.times_played?.[i] ?? 0,
        completions: catacombs?.tier_completions?.[i] ?? 0,
        best_score: {
          score: catacombs?.best_score?.[i] ?? 0,
          name: getScoreName(catacombs?.best_score?.[i] ?? 0),
        },
        fastest: catacombs?.fastest_time?.[i] ?? null,
        fastest_s: catacombs?.fastest_time_s?.[i] ?? null,
        fastest_s_plus: catacombs?.fastest_time_s_plus?.[i] ?? null,
        mobs_killed: catacombs?.mobs_killed?.[i] ?? 0,
      };
      if (floor_name === 'entrance') continue;
      master_mode_floors[floor_name] = {
        times_played: master_catacombs?.times_played?.[i] ?? 0,
        completions: master_catacombs?.tier_completions?.[i] ?? 0,
        best_score: {
          score: master_catacombs?.best_score?.[i] ?? 0,
          name: getScoreName(master_catacombs?.best_score?.[i] ?? 0),
        },
        fastest: master_catacombs?.fastest_time?.[i] ?? null,
        fastest_s: master_catacombs?.fastest_time_s?.[i] ?? null,
        fastest_s_plus: master_catacombs?.fastest_time_s_plus?.[i] ?? null,
        mobs_killed: master_catacombs?.mobs_killed?.[i] ?? 0,
      };
    }

    let highest_tier_completed = null;
    if (catacombs) {
      if (master_catacombs.highest_tier_completed) {
        highest_tier_completed = `M${master_catacombs.highest_tier_completed}`;
      } else if (catacombs.highest_tier_completed) {
        highest_tier_completed = `F${catacombs.highest_tier_completed}`;
      }
    }

    return {
      selected_class: toTitleCase(dungeons.selected_dungeon_class),
      secrets_found: player.dungeons.secrets,
      classes: {
        healer: calcCatacombs(dungeons.player_classes.healer.experience || 0),
        mage: calcCatacombs(dungeons.player_classes.mage.experience || 0),
        berserk: calcCatacombs(dungeons.player_classes.berserk.experience || 0),
        archer: calcCatacombs(dungeons.player_classes.archer.experience || 0),
        tank: calcCatacombs(dungeons.player_classes.tank.experience || 0),
      },
      catacombs: {
        skill: calcCatacombs(dungeons.dungeon_types.catacombs.experience || 0, true),
        highest_tier_completed,
        floors,
        master_mode_floors,
      },
    };
  } catch (err: any) {
    return null;
  }
};

export const getDungeonsLitePlayer = function getDungeonsLitePlayer(profile: any): IGetDungeonsLitePlayer | null {
  try {
    const { dungeons } = profile;
    return {
      catacombs: {
        skill: calcCatacombs(dungeons.dungeon_types.catacombs.experience || 0, true),
      },
    };
  } catch (error) {
    return null;
  }
};

export const getDungeonsLiteCheck = function getDungeonsLiteCheck(player: any, profile: any): IGetDungeonsLiteCheck | null {
  try {
    const { dungeons } = profile;
    const { catacombs } = dungeons.dungeon_types;
    const { master_catacombs } = dungeons.dungeon_types;

    const floors: IDungeonFloors = {};
    const master_mode_floors: IDungeonFloors = {};

    const floorNameList: DungeonFloorsProps = Object.keys(new DungeonFloorsClass()) as DungeonFloorsProps;

    for (const [i, floor_name] of floorNameList.entries()) {
      floors[floor_name] = {
        times_played: catacombs?.times_played?.[i] ?? 0,
        completions: catacombs?.tier_completions?.[i] ?? 0,
        best_score: {
          score: catacombs?.best_score?.[i] ?? 0,
          name: getScoreName(catacombs?.best_score?.[i] ?? 0),
        },
        fastest: catacombs?.fastest_time?.[i] ?? null,
        fastest_s: catacombs?.fastest_time_s?.[i] ?? null,
        fastest_s_plus: catacombs?.fastest_time_s_plus?.[i] ?? null,
        mobs_killed: catacombs?.mobs_killed?.[i] ?? 0,
      };
      if (floor_name === 'entrance') continue;
      master_mode_floors[floor_name] = {
        times_played: master_catacombs?.times_played?.[i] ?? 0,
        completions: master_catacombs?.tier_completions?.[i] ?? 0,
        best_score: {
          score: master_catacombs?.best_score?.[i] ?? 0,
          name: getScoreName(master_catacombs?.best_score?.[i] ?? 0),
        },
        fastest: master_catacombs?.fastest_time?.[i] ?? null,
        fastest_s: master_catacombs?.fastest_time_s?.[i] ?? null,
        fastest_s_plus: master_catacombs?.fastest_time_s_plus?.[i] ?? null,
        mobs_killed: master_catacombs?.mobs_killed?.[i] ?? 0,
      };
    }

    let highest_tier_completed = null;
    if (catacombs) {
      if (master_catacombs.highest_tier_completed) {
        highest_tier_completed = `M${master_catacombs.highest_tier_completed}`;
      } else if (catacombs.highest_tier_completed) {
        highest_tier_completed = `F${catacombs.highest_tier_completed}`;
      }
    }

    return {
      selected_class: toTitleCase(dungeons.selected_dungeon_class),
      secrets_found: player.dungeons.secrets,
      catacombs: {
        skill: calcCatacombs(dungeons.dungeon_types.catacombs.experience || 0, true),
        highest_tier_completed,
        floors,
        master_mode_floors,
      },
    };
  } catch (err) {
    return null;
  }
};
