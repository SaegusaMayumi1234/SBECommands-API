import { IExperienceCalculationResult } from '../common';

interface IDungeonBestScore {
  score: number;
  name: string;
}

interface IDungeonFloorsResult {
  times_played: number;
  completions: number;
  best_score: IDungeonBestScore;
  fastest: number | null;
  fastest_s: number | null;
  fastest_s_plus: number | null;
  mobs_killed: number;
}

export class DungeonFloorsClass {
  entrance?: IDungeonFloorsResult;
  floor_1?: IDungeonFloorsResult;
  floor_2?: IDungeonFloorsResult;
  floor_3?: IDungeonFloorsResult;
  floor_4?: IDungeonFloorsResult;
  floor_5?: IDungeonFloorsResult;
  floor_6?: IDungeonFloorsResult;
  floor_7?: IDungeonFloorsResult;
}

export interface IDungeonFloors extends DungeonFloorsClass {}

export type DungeonFloorsProps = Array<keyof IDungeonFloors>;

interface IDungeonClass {
  healer: IExperienceCalculationResult;
  mage: IExperienceCalculationResult;
  berserk: IExperienceCalculationResult;
  archer: IExperienceCalculationResult;
  tank: IExperienceCalculationResult;
}

interface IDungeonCatacombs {
  skill: IExperienceCalculationResult;
  highest_tier_completed: string | null;
  floors: IDungeonFloors;
  master_mode_floors: IDungeonFloors;
}

export interface IGetDungeons {
  selected_class: string;
  secrets_found: number;
  classes: IDungeonClass;
  catacombs: IDungeonCatacombs;
}

interface IDungeonSkill {
  skill: IExperienceCalculationResult;
}

export interface IGetDungeonsLitePlayer {
  catacombs: IDungeonSkill;
}

export interface IGetDungeonsLiteCheck {
  selected_class: string;
  secrets_found: number;
  catacombs: IDungeonCatacombs;
}
