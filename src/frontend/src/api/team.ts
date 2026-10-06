export interface TeamMember {
  id: number;
  name: string;
  roleEn: string;
  roleMk: string;
  bioEn: string;
  bioMk: string;
  photoUrl?: string | null;
}

const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Michael Scott",
    roleEn: "Head Chef",
    roleMk: "Главен готвач",
    bioEn:
      "Michael leads the kitchen with 15 years of experience in traditional Macedonian cuisine.",
    bioMk:
      "Michael ја води кујната со 15 години искуство во традиционалната македонска кујна.",
    photoUrl: "/images/virtual_person.jpg",
  },
  {
    id: 2,
    name: "John Doe",
    roleEn: "Restaurant Manager",
    roleMk: "Управител на ресторанот",
    bioEn:
      "John takes care of guests and the daily rhythm of the restaurant floor.",
    bioMk:
      "John се грижи за гостите и за секојдневното функционирање на ресторанот.",
    photoUrl: "/images/virtual_person.jpg",
  },
  {
    id: 3,
    name: "Alice Williams",
    roleEn: "Pastry Chef",
    roleMk: "Слаткар",
    bioEn:
      "Alice prepares our desserts and bakes fresh pogacha every morning.",
    bioMk:
      "Alice ги подготвува нашите десерти и секое утро пече свежа погача.",
    photoUrl: "/images/virtual_person.jpg",
  },
];

export function getTeam(): Promise<TeamMember[]> {
  return Promise.resolve(TEAM);
}
