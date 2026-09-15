import * as teamRepository from "../repositories/team.repository.js";

export async function listTeamMembers() {
  return teamRepository.findTeamMembers();
}
