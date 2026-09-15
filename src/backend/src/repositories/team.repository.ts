import { prisma } from "../db.js";

export async function findTeamMembers() {
  return prisma.teamMember.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
}
