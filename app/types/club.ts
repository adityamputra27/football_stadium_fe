import { FootballLeague } from "./league";

export interface FootballClub {
  id: number;
  name: string;
  logo_primary: string;
  logo_white: string;
  visit_count: number;
  status: "ACTIVE" | "INACTIVE";
  created_at: string;
  football_league_id: number;
  football_league: FootballLeague;
}
