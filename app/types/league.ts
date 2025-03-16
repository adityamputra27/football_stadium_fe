export interface FootballLeague {
  id: number;
  name: string;
  logo_primary: string;
  logo_white: string;
  visit_count: number;
  status: "ACTIVE" | "INACTIVE";
  created_at: string;
}
