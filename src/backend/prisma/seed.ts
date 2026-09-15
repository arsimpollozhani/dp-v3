import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const menuItems: Prisma.MenuItemCreateManyInput[] = [
  {
    category: "starter",
    price: 280.0,
    imageUrl: "/images/shopska_salad.jpeg",
    isAvailable: true,
    nameEn: "Shopska Salad",
    nameMk: "Шопска салата",
    nameSq: "Sallatë Shopska",
    descEn:
      "Chopped tomatoes, cucumber, peppers and grated white cheese with olive oil.",
    descMk:
      "Сечкани домати, краставица, пиперки и рендано бело сирење со маслиново масло.",
    descSq:
      "Domate, kastravec, speca të copëtuara dhe djathë i bardhë i grirë me vaj ulliri.",
  },
  {
    category: "starter",
    price: 220.0,
    imageUrl: "/images/selsko_meso.jpg",
    isAvailable: true,
    nameEn: "Selsko Meso",
    nameMk: "Селско месо",
    nameSq: "Mish fshati",
    descEn:
      "Rustic oven-baked pork with mushrooms, peppers and smoked paprika.",
    descMk:
      "Селско свинско месо со печурки, пиперки и чадена пипер, печено во фурна.",
    descSq:
      "Mish derri fshati me kërpudha, speca dhe paprika të tymosur, i pjekur në furrë.",
  },
  {
    category: "main",
    price: 350.0,
    imageUrl: "/images/tavche_gravche.jpeg",
    isAvailable: true,
    nameEn: "Tavche Gravche",
    nameMk: "Тавче гравче",
    nameSq: "Tavçe gravçe",
    descEn:
      "Slow-baked beans in an earthenware pot with peppers, onion and smoked paprika.",
    descMk:
      "Бавно печен грав во земјена тава со пиперки, кромид и чадена пипер.",
    descSq:
      "Fasule të pjekura ngadalë në enë balte me speca, qepë dhe paprika të tymosur.",
  },
  {
    category: "main",
    price: 520.0,
    imageUrl: "/images/trout.jpg",
    isAvailable: true,
    nameEn: "Grilled Ohrid-Style Trout",
    nameMk: "Охридска пастрмка на скара",
    nameSq: "Troftë e Ohrid në skarë",
    descEn:
      "Grilled trout with garlic butter, lemon and blitva, served with baked potatoes.",
    descMk:
      "Пастрмка на скара со путер од лук, лимон и блитва, послужена со печени компири.",
    descSq:
      "Troftë në skarë me gjalpë hudhre, limon dhe blitva, shërbyer me patate të pjekura.",
  },
  {
    category: "dessert",
    price: 180.0,
    imageUrl: "/images/trileche.jpeg",
    isAvailable: true,
    nameEn: "Trilece",
    nameMk: "Трилече",
    nameSq: "Trileçe",
    descEn: "Milk-soaked sponge cake with caramel and whipped cream.",
    descMk: "Сунѓерест колач натопен со млеко, со карамел и шлаг.",
    descSq: "Ëmbëlsirë sfungjerore me qumësht, karamel dhe pana.",
  },
  {
    category: "drink",
    price: 200.0,
    imageUrl: "/images/wine.jpeg",
    isAvailable: true,
    nameEn: "Vranec Red Wine (glass)",
    nameMk: "Вранец црвено вино (чаша)",
    nameSq: "Verë e kuqe Vranec (gotë)",
    descEn: "Glass of domestic Vranec red wine from the Tikvesh valley.",
    descMk: "Чаша домашно црвено вино вранец од Тиквешијата.",
    descSq: "Gotë verë e kuqe Vranec nga lugina e Tikveshit.",
  },
];

const teamMembers: Prisma.TeamMemberCreateManyInput[] = [
  {
    name: "Michael Scott",
    roleEn: "Head Chef",
    roleMk: "Главен готвач",
    roleSq: "Kuzhiniere kryesore",
    bioEn:
      "Michael leads the kitchen with 15 years of experience in traditional Macedonian cuisine.",
    bioMk:
      "Michael ја води кујната со 15 години искуство во традиционалната македонска кујна.",
    bioSq:
      "Michael drejton kuzhinën me 15 vjet përvojë në kuzhinën tradicionale maqedonase.",
    photoUrl: "/images/virtual_person.jpg",
    sortOrder: 1,
  },
  {
    name: "John Doe",
    roleEn: "Restaurant Manager",
    roleMk: "Управител на ресторанот",
    roleSq: "Menaxher i restorantit",
    bioEn:
      "John takes care of guests and the daily rhythm of the restaurant floor.",
    bioMk:
      "John се грижи за гостите и за секојдневното функционирање на ресторанот.",
    bioSq:
      "John kujdeset për mysafirët dhe ritmin e përditshëm të restorantit.",
    photoUrl: "/images/virtual_person.jpg",
    sortOrder: 2,
  },
  {
    name: "Alice Williams",
    roleEn: "Pastry Chef",
    roleMk: "Слаткар",
    roleSq: "Pastiçiere",
    bioEn:
      "Alice prepares our desserts and bakes fresh pogacha every morning.",
    bioMk:
      "Alice ги подготвува нашите десерти и секое утро пече свежа погача.",
    bioSq:
      "Alice përgatit ëmbëlsirat tona dhe çdo mëngjes pjek pogaçë të freskët.",
    photoUrl: "/images/virtual_person.jpg",
    sortOrder: 3,
  },
];

interface NewsSeedInput {
  slug: string;
  imageUrl: string | null;
  publishedAt: Date;
  titleEn: string;
  titleMk: string;
  titleSq: string;
  bodyEn: string;
  bodyMk: string;
  bodySq: string;
}

const newsPosts: NewsSeedInput[] = [
  {
    slug: "garden-terrace-open",
    imageUrl: null,
    publishedAt: new Date("2026-08-24T10:00:00Z"),
    titleEn: "Our Garden Terrace Is Open",
    titleMk: "Нашата градинарска тераса е отворена",
    titleSq: "Tarraca jonë e kopshtit është hapur",
    bodyEn:
      "Summer evenings are back. Join us on the garden terrace for grilled specials and a glass of Vranec under the lights.",
    bodyMk:
      "Летните вечери се вратија. Придружете ни се на градинарската тераса за специјалитети од скара и чаша вранец под светилките.",
    bodySq:
      "Mbrëmjet e verës u kthyen. Na bashkohuni në tarracën e kopshtit për specialitete në skarë dhe një gotë Vranec nën drita.",
  },
  {
    slug: "live-music-fridays",
    imageUrl: null,
    publishedAt: new Date("2026-08-31T18:00:00Z"),
    titleEn: "Live Music Fridays Return",
    titleMk: "Се враќаат музичките петоци",
    titleSq: "Rikthehen të premtet me muzikë live",
    bodyEn:
      "Every Friday evening a small acoustic trio plays Macedonian evergreens. Table reservations are recommended.",
    bodyMk:
      "Секој петок навечер мало акустично трио свири македонски евергрини. Се препорачуваат резервации на маса.",
    bodySq:
      "Çdo të premte në mbrëmje një trio e vogël akustike luan këngë maqedonase. Rekomandohen rezervimet e tavolinave.",
  },
  {
    slug: "winter-menu-2026",
    imageUrl: null,
    publishedAt: new Date("2026-09-12T09:00:00Z"),
    titleEn: "Taste Our Autumn Menu",
    titleMk: "Пробајте го нашето есенско мени",
    titleSq: "Provoni menunë tonë të vjeshtës",
    bodyEn:
      "Slow-cooked tavche gravche, roasted peppers and warm tulumba: our autumn menu celebrates the harvest season.",
    bodyMk:
      "Бавно готвено тавче гравче, печени пиперки и топли тулумби: нашето есенско мени ја слави сезоната на берба.",
    bodySq:
      "Tavçe gravçe e gatuar ngadalë, speca të pjekur dhe tulumba të ngrohta: menuja jonë e vjeshtës feston sezonin e të korrave.",
  },
];

const sampleContactEmails: string[] = [
  "sample.guest@example.com",
  "sample.event@example.com",
];

const sampleContacts: Prisma.ContactMessageCreateManyInput[] = [
  {
    name: "Sample Guest",
    email: "sample.guest@example.com",
    phone: "+389 70 000 001",
    subject: "Sample: table reservation question",
    message:
      "Sample message: do you take reservations for Friday evenings for a group of six?",
  },
  {
    name: "Sample Event Planner",
    email: "sample.event@example.com",
    phone: null,
    subject: "Sample: birthday dinner enquiry",
    message:
      "Sample message: we would like to book the terrace corner for a small birthday dinner next month.",
  },
];

async function main(): Promise<void> {
  // Menu and team have no natural unique key, so reseed them wholesale.
  // Contact messages from real guests must survive reseeds, so only the
  // clearly-marked sample rows are replaced.
  await prisma.contactMessage.deleteMany({
    where: { email: { in: sampleContactEmails } },
  });
  await prisma.menuItem.deleteMany();
  await prisma.teamMember.deleteMany();

  await prisma.menuItem.createMany({ data: menuItems });
  await prisma.teamMember.createMany({ data: teamMembers });

  for (const post of newsPosts) {
    await prisma.newsPost.upsert({
      where: { slug: post.slug },
      update: {
        imageUrl: post.imageUrl,
        publishedAt: post.publishedAt,
        titleEn: post.titleEn,
        titleMk: post.titleMk,
        titleSq: post.titleSq,
        bodyEn: post.bodyEn,
        bodyMk: post.bodyMk,
        bodySq: post.bodySq,
      },
      create: post,
    });
  }

  await prisma.contactMessage.createMany({ data: sampleContacts });

  const counts = {
    menuItems: await prisma.menuItem.count(),
    teamMembers: await prisma.teamMember.count(),
    newsPosts: await prisma.newsPost.count(),
    contactMessages: await prisma.contactMessage.count(),
  };
  console.log(`Seed complete: ${JSON.stringify(counts)}`);
}

main()
  .catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
