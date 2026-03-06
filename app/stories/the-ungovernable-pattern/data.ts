// ══════════════════════════════════════════════════
// THE UNGOVERNABLE PATTERN — DATA
// Convergent Political Evolution
// Module 128
// ══════════════════════════════════════════════════

// ── THE PEOPLES ──

export interface People {
  name: string
  endonym: string
  meaning: string
  region: string
  population: string
  terrain: string
  states: string[]
  governance: string
  leaderTitle: string
  leaderMechanism: string
  law: string
  languageFamily: string
  languageStatus: string
  empiresOutlasted: string[]
  modernStatus: string
  stoneMarker?: string
  detail: string
}

export const PEOPLES: People[] = [
  {
    name: 'Amazigh', endonym: 'ⵉⵎⴰⵣⵉⵖⵏ (Imazighen)', meaning: 'Free people',
    region: 'North Africa — Atlas, Sahara, Mediterranean coast',
    population: '~30–40 million',
    terrain: 'Mountain ranges (Atlas, Rif, Aurès), desert (Sahara), oases, coastal plains. Vertical terrain that fragments central control.',
    states: ['Morocco', 'Algeria', 'Tunisia', 'Libya', 'Mali', 'Niger', 'Burkina Faso', 'Egypt (Siwa)'],
    governance: 'Jemaa (tribal assembly). Decisions by consensus of elders and notables. No permanent executive.',
    leaderTitle: 'Amghar (elected chief)',
    leaderMechanism: 'Elected annually by tribal assembly. Rotates between clans. The Ait Atta confederacy explicitly rotated among "five fifths" — no fifth could hold power consecutively. Term-limited centuries before modern democracies existed.',
    law: 'Izerf — customary law, orally transmitted, enforced by jemaa. Predates Islamic sharia in the region. Survived Arabisation, French colonisation, and post-independence legal reform. Some izerf codes were transcribed by French colonial ethnographers.',
    languageFamily: 'Afroasiatic (Tamazight, ~33 varieties)',
    languageStatus: 'Official in Morocco (2011), Algeria (2016). Previously banned/suppressed. Tifinagh script revived.',
    empiresOutlasted: ['Phoenician', 'Roman', 'Vandal', 'Byzantine', 'Arab', 'Ottoman', 'French', 'Spanish'],
    modernStatus: 'Constitutional recognition in Morocco and Algeria. Three distinct Amazigh cultural zones (Rif, Middle Atlas, Souss). No separatist movement — identity operates within existing states.',
    stoneMarker: 'Kerkour — stone cairns marking passes, graves, tribal boundaries. 8,000+ years.',
    detail: 'The jemaa system produced leaders who served the assembly, not the other way around. The amghar had administrative power but could be removed. Berber tribes used collective oath (tagallit) to form confederations for war, then dissolved them after. The Almoravid and Almohad empires — the closest the Amazigh came to centralised power — were both religiously motivated exceptions that collapsed within two generations.',
  },
  {
    name: 'Kurds', endonym: 'کورد (Kurd)', meaning: 'Disputed — possibly "mountain people" or from the Sumerian "Kardaka"',
    region: 'Kurdistan — Zagros Mountains, Mesopotamian plateau, Armenian highlands',
    population: '~30–45 million',
    terrain: 'Mountain ranges (Zagros, Taurus), high valleys, steep gorges. The most rugged terrain in the Middle East. Central armies have failed to control Kurdish mountains for 3,000 years.',
    states: ['Turkey (~15–20M)', 'Iran (~8–12M)', 'Iraq (~6–8M)', 'Syria (~2–3M)'],
    governance: 'Tribal confederations (ashiret) led by agha or beg. Confederations formed and dissolved based on threat. No single Kurdish authority ever unified all tribes.',
    leaderTitle: 'Agha / Beg / Mir',
    leaderMechanism: 'Hereditary within leading families, but authority contingent on tribal consent. Aghas who lost the confidence of their tribes were replaced. Large confederations had councils of tribal leaders who made decisions collectively.',
    law: 'Customary tribal law (urf). Blood feuds, hospitality codes, asylum rights. Parallel to — and often in tension with — state legal systems. Kurdish customary law survived Ottoman, Persian, Arab, and Turkish state law.',
    languageFamily: 'Indo-European, Iranian branch (Kurmanji, Sorani, Pehlewani, Gorani)',
    languageStatus: 'Official in Iraq (2005). Banned in Turkey 1924–1991. Suppressed in Iran and Syria. Kurdish media and education expanding.',
    empiresOutlasted: ['Assyrian', 'Persian (Achaemenid, Sassanid)', 'Greek (Seleucid)', 'Roman/Byzantine', 'Arab', 'Mongol', 'Ottoman', 'British Mandate', 'Ba\'athist Iraq'],
    modernStatus: 'Largest stateless nation on earth. Autonomous region in Iraq (KRI). No recognised state. Multiple failed independence movements. Peshmerga militias function as de facto armies.',
    detail: 'Saladin — the most famous Kurd in history — is illustrative. He unified the Muslim response to the Crusaders but did not create a Kurdish state. He built an empire in the name of Islam, not Kurdistan. The Kurdish pattern: brilliant individual leaders emerge, build something powerful, but the tribal structure reasserts itself within a generation. The terrain makes centralisation physically impossible. The Zagros Mountains are the Kurdish Atlas.',
  },
  {
    name: 'Mongols', endonym: 'Монгол (Mongol)', meaning: 'Disputed — possibly "brave" or "silver"',
    region: 'Mongolian Plateau, Central Asian steppe, Siberian border',
    population: '~10–12 million',
    terrain: 'Open steppe, grassland, Gobi desert. Flat and vast — the opposite of Kurdish mountains, yet equally resistant to centralisation for the same reason: distance.',
    states: ['Mongolia', 'China (Inner Mongolia, ~5–6M)', 'Russia (Buryatia, Kalmykia)'],
    governance: 'Kurultai (assembly of tribal chiefs). Major decisions — war, succession, law — required kurultai approval. Even Genghis Khan was elected by kurultai.',
    leaderTitle: 'Khan / Noyon',
    leaderMechanism: 'Khan elected by kurultai of tribal leaders. Hereditary lineage mattered but was not sufficient — incompetent heirs were bypassed. The Mongol Empire fragmented within one generation of Genghis Khan\'s death precisely because the system resisted permanent centralisation.',
    law: 'Yasa — Genghis Khan\'s legal code, partly customary, partly codified. Covered property, marriage, military discipline, religious tolerance. Enforced across the empire but dissolved with it.',
    languageFamily: 'Mongolic (Khalkha Mongolian primary)',
    languageStatus: 'Official in Mongolia. Traditional script suppressed under Soviet influence (Cyrillic imposed 1941). Script revival movement since 1990.',
    empiresOutlasted: ['Xiongnu', 'Turkic Khaganate', 'Tang China', 'Khitan Liao', 'Jin Dynasty', 'Qing Dynasty', 'Soviet Union'],
    modernStatus: 'Independent Mongolia (1921/1990). Inner Mongolia under Chinese administration. Buryats in Russia. Nomadic herding declining but culturally central.',
    stoneMarker: 'Ovoo — stone cairns for sky spirit worship, passage markers, territorial boundaries. Pre-Buddhist origins.',
    detail: 'The Mongol Empire is the exception that proves the rule. Genghis Khan temporarily overcame tribal fragmentation through military genius and the yasa — and built the largest contiguous land empire in history. But the system couldn\'t hold. Within 50 years of his death, the empire split into four khanates. Within 150 years, all four had collapsed or been absorbed. The steppe reasserted its logic: too vast for one centre to control.',
  },
  {
    name: 'Haudenosaunee', endonym: 'Haudenosaunee', meaning: 'People of the Longhouse',
    region: 'Northeast North America — Great Lakes, St. Lawrence, Mohawk Valley',
    population: '~125,000 (modern enrolled members)',
    terrain: 'Forest, river valleys, lake shores. Dense woodland that fragmented colonial armies and favoured decentralised, mobile communities.',
    states: ['United States (New York, Wisconsin)', 'Canada (Ontario, Quebec)'],
    governance: 'Grand Council of 50 sachems (chiefs) from six nations. Consensus-based. Clan mothers nominated and could remove sachems. No executive authority — the council was deliberative, not commanding.',
    leaderTitle: 'Sachem (Hoyaneh)',
    leaderMechanism: 'Nominated by clan mothers (senior women of each clan). If a sachem failed to represent his people, the clan mother issued three warnings, then removed him. The Great Law of Peace (Gayanashagowa) codified this process — possibly the oldest living constitution in the world.',
    law: 'Gayanashagowa — the Great Law of Peace. Oral constitution establishing the confederacy, defining roles, rights, procedures. 117 articles. Anthropologists and historians debate its age: some date it to the 12th century, others to the 15th.',
    languageFamily: 'Iroquoian (Mohawk, Oneida, Onondaga, Cayuga, Seneca, Tuscarora)',
    languageStatus: 'All six languages critically endangered. Mohawk (<4,000 speakers) strongest. Language immersion programs active.',
    empiresOutlasted: ['French colonial', 'British colonial', 'Dutch colonial', 'United States (ongoing)', 'Canada (ongoing)'],
    modernStatus: 'Six Nations of the Grand River (Canada) and multiple US reservations. The Haudenosaunee Confederacy still meets in council. Issues its own passports (accepted by some nations). The US Congress formally acknowledged Iroquois influence on the Constitution in 1988 (H.Con.Res.331).',
    detail: 'The Haudenosaunee system influenced Benjamin Franklin and other founders. Franklin explicitly referenced the Iroquois confederacy at the Albany Congress in 1754. The structure — independent nations united by a shared constitution, with checks on executive power and women holding nomination authority — is strikingly parallel to the Amazigh jemaa system. Neither people had contact with the other. Both arrived at governance by consent, term limits, and female political authority independently.',
  },
  {
    name: 'Sámi', endonym: 'Sámit', meaning: 'Disputed — possibly from Proto-Sámi *sāmē',
    region: 'Sápmi — Arctic Fennoscandia, Kola Peninsula',
    population: '~80,000–100,000',
    terrain: 'Arctic tundra, boreal forest, mountain plateaus, fjords. Above the tree line — the landscape that produces cairns (varde) and resists settled agriculture.',
    states: ['Norway (~50–65K)', 'Sweden (~20K)', 'Finland (~8K)', 'Russia (~2K)'],
    governance: 'Siida — a community of families sharing a territory and resources. Decisions made collectively. No permanent chief. Seasonal gatherings for dispute resolution and resource allocation.',
    leaderTitle: 'Siida-isit (siida headman, informal)',
    leaderMechanism: 'Leadership based on experience and competence, not heredity. The siida-isit coordinated reindeer herding and migration but did not command. Authority derived from demonstrated skill, not appointment.',
    law: 'Customary law governing reindeer herding rights, fishing areas, territorial boundaries. Oral tradition. Partially codified by Scandinavian states but originally enforced by siida consensus.',
    languageFamily: 'Uralic (9 distinct Sámi languages)',
    languageStatus: 'Official in parts of Norway, Sweden, Finland. Several languages critically endangered (<500 speakers). Kildin Sámi (Russia) ~300 speakers.',
    empiresOutlasted: ['Viking/Norse', 'Swedish Empire', 'Danish-Norwegian', 'Russian (Tsarist and Soviet)', 'Modern Scandinavian states'],
    modernStatus: 'Three Sámi parliaments (Norway, Sweden, Finland). Advisory, not sovereign. No Sámi parliament in Russia. Cultural revitalisation active. Reindeer herding legally protected.',
    stoneMarker: 'Varde — coastal and mountain cairns for navigation, still maintained as part of Scandinavian nautical marking systems.',
    detail: 'The Sámi political pattern is the quietest version of the ungovernable template. No wars of independence, no armed resistance in the modern era. Instead, the siida system simply continued functioning beneath whatever state claimed jurisdiction. The Norwegian, Swedish, and Finnish governments spent centuries trying to assimilate the Sámi (boarding schools, language bans, forced sedentarisation) and failed. The reindeer herding pattern requires seasonal migration across national borders — the Sámi ignored borders because the reindeer did.',
  },
  {
    name: 'Pashtun', endonym: 'پښتانه (Pashtana)', meaning: 'Disputed — possibly "free" or "highland"',
    region: 'Eastern Afghanistan, northwestern Pakistan — Hindu Kush, Sulaiman Mountains',
    population: '~50–60 million',
    terrain: 'Mountain ranges (Hindu Kush, Sulaiman, Safed Koh), high valleys, arid plateaus. The terrain that defeated Alexander, the British (three times), the Soviets, and NATO.',
    states: ['Afghanistan (~15–20M)', 'Pakistan (~35–40M)'],
    governance: 'Jirga (tribal assembly). All adult males participate. Decisions by consensus. No individual can impose a decision on the jirga.',
    leaderTitle: 'Malik / Khan / Spin Giri (white beard / elder)',
    leaderMechanism: 'Maliks are first among equals, not rulers. Authority comes from reputation, hospitality, and demonstrated wisdom. Hereditary in some tribes but always contingent on community respect. A malik who loses face loses followers.',
    law: 'Pashtunwali — comprehensive code of conduct covering hospitality (melmastia), revenge (badal), asylum (nanawatai), honour (nang), and courage (tureh). Predates Islam. Often overrides state law and even sharia in tribal areas.',
    languageFamily: 'Indo-European, Iranian branch (Pashto)',
    languageStatus: 'Official in Afghanistan. National language in Pakistan (not official). Strong oral and literary tradition.',
    empiresOutlasted: ['Achaemenid Persian', 'Macedonian (Alexander)', 'Maurya', 'Kushan', 'Sassanid', 'Arab', 'Mongol', 'Mughal', 'British (×3)', 'Soviet', 'NATO/US'],
    modernStatus: 'Divided by the Durand Line (1893) between Afghanistan and Pakistan — a border neither Pashtun community fully accepts. Tribal areas of Pakistan only brought under full state jurisdiction in 2018 (merger of FATA).',
    detail: 'The jirga and the jemaa are the same structure with different names. Both are assemblies of equals where consensus is required. Both have customary law codes (Pashtunwali / izerf) that predate the dominant religion. Both operate in mountain terrain that defeats central armies. The British called the Pashtun tribal areas "ungovernable" — the same word the French used for the Berber bled es-siba (land of dissidence). Neither people considers themselves ungovernable. They are self-governing.',
  },
  {
    name: 'Mapuche', endonym: 'Mapuche', meaning: 'People of the land (mapu = land, che = people)',
    region: 'South-central Chile, western Argentina — Araucanía, Patagonia',
    population: '~2 million',
    terrain: 'Temperate rainforest, river valleys, volcanic highland. The Araucanía — dense, wet, with rivers cutting deep valleys that fragment any invading force.',
    states: ['Chile (~1.7M)', 'Argentina (~300K)'],
    governance: 'Rewe (local community) led by lonko. Multiple rewe formed ayllarehue (nine rewe). For war, ayllarehue elected a toqui (war chief) whose authority lasted only for the duration of the conflict.',
    leaderTitle: 'Lonko (peacetime chief) / Toqui (war chief)',
    leaderMechanism: 'Lonko hereditary within leading families but confirmed by community. Toqui elected for specific military campaigns only — temporary executive authority. The system explicitly prevented permanent military command from becoming permanent political power.',
    law: 'Admapu — customary law governing land use, marriage, ceremonies, dispute resolution. Oral tradition. Enforced by community pressure and lonko mediation.',
    languageFamily: 'Araucanian (Mapudungun — language isolate, not related to any other known language family)',
    languageStatus: '~250,000 speakers. Declining but active revitalisation. Not an official language in Chile or Argentina.',
    empiresOutlasted: ['Inca (never conquered southern Mapuche)', 'Spanish (resisted 1541–1883, 342 years)', 'Chilean Republic (Occupation of Araucanía 1861–1883)'],
    modernStatus: 'Land rights conflict ongoing. Mapuche activists imprisoned. Forest industry and water rights central disputes. No constitutional recognition in Chile as of 2025.',
    detail: 'The Mapuche held off the Spanish Empire for 342 years — longer than any other indigenous people in the Americas. The Treaty of Quilín (1641) recognised Mapuche sovereignty south of the Biobío River — Spain formally acknowledged a border with a people they could not conquer. The Inca Empire also failed to subjugate the southern Mapuche. The terrain and the decentralised structure made conquest impossible: there was no capital to capture, no king to defeat, no single army to destroy.',
  },
  {
    name: 'Roma', endonym: 'Rromane (Romani people)', meaning: 'Disputed — possibly from the Romani word "rom" meaning "man/husband"',
    region: 'Global diaspora — largest concentrations in Europe (Balkans, Spain, France, UK, Romania, Hungary)',
    population: '~10–15 million',
    terrain: 'No fixed territory. The Roma are the ultimate proof that the ungovernable pattern doesn\'t require mountains — it requires mobility. When the terrain doesn\'t resist the state, the people move through the state.',
    states: ['No homeland. Present in every European country, plus the Americas, Middle East, and parts of Asia.'],
    governance: 'Kris Romani — a tribunal/court of elders convened to resolve disputes. Extended family (vitsa) and clan (kumpania) structures. No centralised Roma government or state.',
    leaderTitle: 'Rom Baro / Bulibasha / Kris elders',
    leaderMechanism: 'Elders gain authority through age, experience, and community respect. The Kris (tribunal) functions as both judiciary and legislature. Decisions are collective. No single Roma leader has ever commanded all Roma.',
    law: 'Romaniya — customary code governing purity, marriage, commerce, dispute resolution, and relations with non-Roma (gadje). Enforced by the Kris and by social exclusion (marime). Parallel legal system that has operated inside — and in defiance of — host country legal systems for 600+ years in Europe.',
    languageFamily: 'Indo-European, Indo-Aryan (Romani, ~60 dialects). Origin: northwestern India, migrated via Persia.',
    languageStatus: 'Spoken by ~3.5 million. No official status in any country. Dialects fragmenting due to geographic separation.',
    empiresOutlasted: ['Byzantine', 'Ottoman', 'Hapsburg', 'Tsarist Russia', 'Nazi Germany (survived Porajmos — 500,000+ murdered)', 'Soviet Union', 'Every European nation-state since the 14th century'],
    modernStatus: 'Most discriminated-against minority in Europe. No territory. No state. No seat at the UN. The European Roma Rights Centre documents ongoing systemic exclusion. Despite 600 years of persecution, the Roma have not assimilated and the Kris system continues to function.',
    detail: 'The Roma are the inverse case. Every other people in this dataset has mountains or steppe — terrain that physically resists central control. The Roma have nothing but mobility and a parallel legal system. They prove that the ungovernable pattern is not about geography alone — it is about a governance structure so resilient that it can operate without territory, without an army, and without recognition, for six centuries, inside the most powerful states on earth.',
  },
  {
    name: 'Tuareg', endonym: 'ⴾⵍ ⵜⵎⵛⵈ (Kel Tamasheq)', meaning: 'Those who speak Tamasheq',
    region: 'Central Sahara — southern Algeria, northern Mali, Niger, Libya, Burkina Faso',
    population: '~2.5–3 million',
    terrain: 'Sahara Desert, Sahel, Aïr Mountains, Hoggar Mountains, Tassili n\'Ajjer. The most extreme terrain on earth — the deep desert that no state has ever fully controlled.',
    states: ['Mali', 'Niger', 'Algeria', 'Libya', 'Burkina Faso'],
    governance: 'Amenokal — paramount chief of a confederation. Below: tribal chiefs (ettebel), clan heads. Hierarchical within castes but confederal between groups.',
    leaderTitle: 'Amenokal',
    leaderMechanism: 'Amenokal elected from the noble (imajeghen) caste by a council of tribal leaders. Authority real but bounded by the council. The Kel Ahaggar, Kel Aïr, Kel Tademaket, Iwellemmeden — each confederation had its own amenokal. No single Tuareg leader ever unified all confederations.',
    law: 'Customary law governing caravan routes, well-access rights, raiding protocols, caste obligations, and cross-desert passage. The Saharan legal system — unwritten, enforced by reputation and reciprocity.',
    languageFamily: 'Afroasiatic (Tamasheq — a Berber language). Script: Tifinagh (one of the oldest alphabets still in use).',
    languageStatus: 'No official status in any country. Spoken across five nations. Tifinagh script maintained — the Tuareg are the only Berber group that never lost their indigenous script.',
    empiresOutlasted: ['Roman', 'Arab', 'Songhai', 'Ottoman', 'French', 'Post-colonial nation-states (multiple rebellions: 1963, 1990, 2007, 2012)'],
    modernStatus: 'Multiple armed rebellions since independence of Mali and Niger. Azawad (northern Mali) briefly declared independence in 2012. Ongoing instability. The Sahara remains effectively ungoverned.',
    stoneMarker: 'Stone cairns, rock art (Tassili n\'Ajjer — 15,000+ paintings/engravings, UNESCO site). Navigation markers across the deep Sahara.',
    detail: 'The Tuareg are Amazigh who went deeper into the desert. Same language family (Tamasheq is a Berber language). Same script (Tifinagh — the Tuareg kept it while settled Berbers lost it). Same confederal structure. Same refusal to centralise. But the Tuareg took it further: they built a caste-based society in the harshest terrain on earth and controlled the trans-Saharan trade routes for centuries. They are the extreme case of what happens when ungovernable peoples enter ungovernable terrain.',
  },
]

// ── THE SHARED ARCHITECTURE ──

export interface StructuralParallel {
  feature: string
  description: string
  peoples: string[]
}

export const ARCHITECTURE: StructuralParallel[] = [
  {
    feature: 'Assembly governance',
    description: 'Decisions made by a council of elders/representatives, not by a single ruler. Consensus required. Executive authority limited, temporary, or both.',
    peoples: ['Amazigh (jemaa)', 'Kurd (tribal diwan)', 'Mongol (kurultai)', 'Haudenosaunee (Grand Council)', 'Sámi (siida)', 'Pashtun (jirga)', 'Mapuche (rewe council)', 'Roma (Kris)', 'Tuareg (amenokal council)'],
  },
  {
    feature: 'Rotating or removable leadership',
    description: 'Leaders serve the assembly, not the other way around. Incompetent or tyrannical leaders can be removed. Some systems explicitly rotate power between clans or lineages.',
    peoples: ['Amazigh (amghar elected annually, rotates between fifths)', 'Haudenosaunee (clan mothers remove sachems)', 'Mapuche (toqui authority ends with campaign)', 'Sámi (siida-isit based on competence)', 'Mongol (khan elected by kurultai)'],
  },
  {
    feature: 'Customary law parallel to state law',
    description: 'An unwritten (or orally transmitted) legal code that predates the dominant religion and often operates in tension with or defiance of official state law.',
    peoples: ['Amazigh (izerf)', 'Pashtun (Pashtunwali)', 'Roma (Romaniya)', 'Mapuche (Admapu)', 'Mongol (yasa)', 'Kurd (urf)', 'Tuareg (customary caravan law)'],
  },
  {
    feature: 'Multi-state existence',
    description: 'The people span multiple modern nation-states. No single state is "theirs." Borders were drawn through them, not by them.',
    peoples: ['Amazigh (8 states)', 'Kurd (4 states)', 'Mongol (3 states)', 'Sámi (4 states)', 'Pashtun (2 states)', 'Tuareg (5 states)', 'Roma (all European states)', 'Mapuche (2 states)', 'Haudenosaunee (2 states)'],
  },
  {
    feature: 'Language suppression survived',
    description: 'The dominant state attempted to kill the language. The language survived. In every case, language suppression was the first tool of assimilation, and in every case it failed.',
    peoples: ['Amazigh (banned in Algeria until 2002)', 'Kurd (banned in Turkey 1924–1991)', 'Sámi (boarding schools, Norwegianisation)', 'Mongol (Cyrillic imposed 1941)', 'Haudenosaunee (residential schools)', 'Mapuche (Spanish-only education)', 'Roma (no official recognition anywhere)'],
  },
  {
    feature: 'Female political authority',
    description: 'Women hold formal or informal veto power over leadership. Not universal across all nine peoples, but present in a striking number.',
    peoples: ['Haudenosaunee (clan mothers nominate and remove chiefs)', 'Amazigh (Tuareg matrilineal descent, women own tents)', 'Mongol (khatun — wives of khans held significant political and military authority)', 'Sámi (women owned lavvu/tent and household property)'],
  },
  {
    feature: 'Confederation for war, dissolution after',
    description: 'Tribes unite under temporary military leadership when threatened, then dissolve the alliance when the threat passes. Prevents permanent military command from becoming permanent political power.',
    peoples: ['Amazigh (tagallit — collective oath for war)', 'Mapuche (toqui elected for campaign only)', 'Mongol (kurultai for war decisions)', 'Pashtun (lashkar — tribal militia assembled for specific conflict)', 'Haudenosaunee (war chiefs separate from peace chiefs)'],
  },
  {
    feature: 'Terrain as co-governor',
    description: 'The landscape itself makes centralisation impossible. Mountains fragment armies. Deserts exhaust supply lines. Steppe dissolves borders. Forest hides populations. The terrain selects for decentralisation.',
    peoples: ['Amazigh (Atlas/Sahara)', 'Kurd (Zagros)', 'Pashtun (Hindu Kush)', 'Mapuche (Araucanía rainforest)', 'Mongol (steppe)', 'Tuareg (deep Sahara)', 'Sámi (Arctic tundra)'],
  },
]

// ── THE TERRAIN EQUATION ──

export interface TerrainType {
  terrain: string
  mechanism: string
  peoples: string[]
}

export const TERRAIN_EQUATION: TerrainType[] = [
  { terrain: 'Mountains', mechanism: 'Vertical terrain fragments invading forces. Each valley becomes a fortress. Supply lines fail. Armies that conquer the valley floor cannot hold the peaks.', peoples: ['Amazigh (Atlas, Rif, Aurès)', 'Kurd (Zagros, Taurus)', 'Pashtun (Hindu Kush, Sulaiman)', 'Mapuche (Andes foothills)'] },
  { terrain: 'Desert', mechanism: 'Distance and aridity exhaust supply lines. No roads. No water for occupying armies. The people who know the wells control the terrain.', peoples: ['Tuareg (Sahara)', 'Amazigh (Sahara fringe)', 'Pashtun (Afghan desert plateaus)'] },
  { terrain: 'Steppe', mechanism: 'Flat and vast. Mobile populations simply move away from invading armies. Cavalry-based societies outrun infantry. No fixed point to capture.', peoples: ['Mongol (Central Asian steppe)'] },
  { terrain: 'Arctic tundra', mechanism: 'Cold, dark, treeless. No agriculture possible. Only reindeer herding works. States cannot settle populations there. The indigenous economy is the only viable economy.', peoples: ['Sámi (Sápmi)'] },
  { terrain: 'Dense forest', mechanism: 'Visibility near zero. Ambush terrain. Settled populations can disperse into the woods and reform elsewhere. Colonial armies cannot bring artillery through the canopy.', peoples: ['Haudenosaunee (Northeast forest)', 'Mapuche (Araucanía rainforest)'] },
  { terrain: 'No fixed territory', mechanism: 'When the terrain doesn\'t resist the state, the people move through the state. Mobility replaces geography. The parallel legal system replaces the parallel terrain.', peoples: ['Roma (European diaspora)'] },
]

// ── TIMELINE ──

export interface TimelineEvent {
  year: string
  event: string
  people: string
  significance: string
}

export const TIMELINE: TimelineEvent[] = [
  { year: '~1142 CE (disputed)', event: 'Great Law of Peace (Gayanashagowa) established', people: 'Haudenosaunee', significance: 'Possibly the oldest participatory constitution in the world. Five (later six) nations united by consensus governance.' },
  { year: '1235', event: 'Kurultai elects Ögedei Khan', people: 'Mongol', significance: 'Even at the height of the largest land empire in history, succession required election by assembly. The centralised empire lasted less than 150 years.' },
  { year: '1541–1883', event: 'Arauco War (342 years)', people: 'Mapuche', significance: 'Longest sustained indigenous resistance to European colonialism. Spain never conquered the Mapuche south of the Biobío River.' },
  { year: '1641', event: 'Treaty of Quilín', people: 'Mapuche', significance: 'Spain formally recognised Mapuche sovereignty south of the Biobío. One of the few treaties where a European empire acknowledged an indigenous border.' },
  { year: '1893', event: 'Durand Line drawn', people: 'Pashtun', significance: 'British diplomat Mortimer Durand drew a border through Pashtun territory. Neither Afghanistan nor the Pashtun tribes ever fully accepted it. Still contested 130+ years later.' },
  { year: '1916', event: 'Sykes-Picot Agreement', people: 'Kurd', significance: 'Britain and France divided the Ottoman Middle East. Kurdistan was split between Turkey, Iraq, Syria, and Persia/Iran. No Kurdish state was created despite wartime promises.' },
  { year: '1920', event: 'Treaty of Sèvres promises Kurdistan', people: 'Kurd', significance: 'Post-WWI treaty included provisions for Kurdish autonomy. Never implemented. Replaced by Treaty of Lausanne (1923) which recognised Turkey with no Kurdish provisions.' },
  { year: '1924–1991', event: 'Kurdish language banned in Turkey', people: 'Kurd', significance: '67 years of language suppression. Kurdish was illegal in schools, courts, government, and public life. The language survived.' },
  { year: '1941', event: 'Mongolian script replaced with Cyrillic', people: 'Mongol', significance: 'Soviet Union imposed Cyrillic alphabet on Mongolia. Traditional Mongolian script — used for 800 years — was banned from official use.' },
  { year: '1966', event: 'Amazigh cultural movement (Académie Berbère) founded in Paris', people: 'Amazigh', significance: 'Diaspora Berbers began the modern Amazigh identity movement. The Tifinagh script was revived. Cultural recognition campaigns launched.' },
  { year: '1988', event: 'US Congress acknowledges Iroquois influence on Constitution', people: 'Haudenosaunee', significance: 'H.Con.Res.331 formally recognised "the contribution of the Iroquois Confederacy of Nations to the development of the United States Constitution."' },
  { year: '2005', event: 'Iraqi Kurdistan Region gains constitutional autonomy', people: 'Kurd', significance: 'New Iraqi constitution recognised Kurdistan Region with its own parliament, president, and Peshmerga forces. The closest any Kurdish population has come to statehood.' },
  { year: '2011', event: 'Tamazight becomes official language of Morocco', people: 'Amazigh', significance: 'New constitution made Tamazight an official language alongside Arabic. First North African state to constitutionally recognise Amazigh identity.' },
  { year: '2012', event: 'Azawad declares independence', people: 'Tuareg', significance: 'Tuareg separatists declared independence of northern Mali. Lasted months before Islamist groups hijacked the movement. French military intervention followed. The Tuareg quest for self-governance continues.' },
]

// ── BIBLIOGRAPHY ──

export const BIBLIOGRAPHY = [
  'Hart, D.M. (2000). Tribe and Society in Rural Morocco. Frank Cass.',
  'Hoffman, K.E. & Miller, S.G. (2010). Berbers and Others: Beyond Tribe and Nation in the Maghrib. Indiana University Press.',
  'Van Bruinessen, M. (1992). Agha, Shaikh and State: The Social and Political Structures of Kurdistan. Zed Books.',
  'Weatherford, J. (2004). Genghis Khan and the Making of the Modern World. Crown.',
  'Johansen, B.E. (1998). Debating Democracy: Native American Legacy of Freedom. Clear Light Publishers.',
  'Henriksen, J.B. (2008). Key Principles in Implementing ILO Convention No. 169. International Labour Organization.',
  'Barfield, T. (2010). Afghanistan: A Cultural and Political History. Princeton University Press.',
  'Dillehay, T.D. (2007). Monuments, Empires, and Resistance: The Araucanian Polity and Ritual Narratives. Cambridge University Press.',
  'Hancock, I. (2002). We are the Romani People. University of Hertfordshire Press.',
  'Keenan, J. (2004). The Lesser Gods of the Sahara: Social Change and Contested Terrain Amongst the Tuareg. Frank Cass.',
  'Clastres, P. (1987). Society Against the State: Essays in Political Anthropology. Zone Books.',
  'Scott, J.C. (2009). The Art of Not Being Governed: An Anarchist History of Upland Southeast Asia. Yale University Press.',
]
