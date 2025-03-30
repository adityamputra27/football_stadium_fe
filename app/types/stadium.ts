export interface FootballStadium {
  id: number;
  football_club_id: number;
  name: string;
  capacity: string;
  country: string;
  city: string;
  cost: string;
  status: string;
  description: string;
  latest_file: string;
}

export interface FootballStadiumFile {
  id: number;
  file: string;
  football_stadium_id: number;
  file_size: number;
  file_path: string;
}
