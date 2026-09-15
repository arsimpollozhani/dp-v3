import { apiGet } from "./client";

export interface TeamMember {
  id: number;
  name: string;
  roleEn: string;
  roleMk: string;
  bioEn: string;
  bioMk: string;
  photoUrl?: string | null;
}

export function getTeam(): Promise<TeamMember[]> {
  return apiGet<TeamMember[]>("/api/team");
}
