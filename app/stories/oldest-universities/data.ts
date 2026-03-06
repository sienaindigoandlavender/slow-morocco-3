// ─────────────────────────────────────────────────
// The World's Oldest Universities
// Module 081 — Educational & Cultural Intelligence
// ─────────────────────────────────────────────────

export interface Institution {
  name: string
  arabic: string
  location: string
  founded: string
  founder: string
  status: string
  detail: string
  keyFact: string
}

export const INSTITUTIONS: Institution[] = [
  {
    name: 'Al-Qarawiyyin',
    arabic: 'جامعة القرويين',
    location: 'Fez Medina, Morocco',
    founded: '857–859 CE (Ramadan 245 AH)',
    founder: 'Fatima al-Fihri (c. 800–880 CE) — daughter of wealthy Tunisian merchant Mohammed al-Fihri, who migrated from Kairouan to Fez',
    status: 'Guinness World Record: oldest existing, continually operating educational institution. UNESCO World Heritage (as part of Medina of Fez, 1981). Incorporated into modern state university system 1963. Five campuses today: Fez (×2), Marrakech, Agadir, Tetouan',
    detail: 'Founded as a mosque by Fatima al-Fihri, who used her entire inheritance to build a place of worship and learning for the Qayrawaniyyin community. Her sister Mariam built the Al-Andalus Mosque across the river. Construction took ~2 years. Fatima fasted daily throughout construction. The institution evolved from mosque to madrasa to university over centuries. At its zenith (13th–14th C, under the Marinids), hundreds of students attended, supported by dozens of surrounding madrasas. The library once held 30,000+ volumes. Subjects expanded from Quran, hadith, and fiqh to include mathematics, astronomy, medicine, grammar, logic, and philosophy. The ijazah system (licence to teach a subject after demonstrating mastery) prefigured the modern degree. Non-Muslims attended — Maimonides, Gerbert d\'Aurillac (later Pope Sylvester II). Today concentrates on Islamic sciences, Maliki law, and Classical Arabic.',
    keyFact: 'Founded by a woman 229 years before Bologna and 237 years before Oxford',
  },
  {
    name: 'Ben Youssef Madrasa',
    arabic: 'مدرسة ابن يوسف',
    location: 'Marrakech Medina, Morocco',
    founded: 'First madrasa on site: c. 1340 (Marinid Sultan Abu al-Hasan). Current building: 1564–65 CE (Saadian Sultan Abdallah al-Ghalib)',
    founder: 'Marinid dynasty (original). Saadian Sultan Abdallah al-Ghalib (reconstruction)',
    status: 'Historical site since 1960 closure. Reopened to public 1982. Restored 2018–2022. Major tourist attraction. No longer active as educational institution',
    detail: 'Named after the adjacent mosque founded by Almoravid Sultan Ali ibn Yusuf (r. 1106–1142). The largest Islamic college in the Maghreb at its height — 130 dormitory rooms, up to 900 students from across North Africa and beyond. The current Saadian building replaced the Marinid original entirely. A masterpiece of Saadian architecture: zellige tilework, carved stucco, muqarnas, painted cedar, arabesques. The student cells are stark — decoration lavished on the courtyard and prayer hall. An 11th-century marble basin from Madinat al-Zahra (Córdoba, Spain) is on display — likely imported by Ali ibn Yusuf in the 12th century. Inscription above gateway: "You who enter my door, may your highest hopes be exceeded."',
    keyFact: '900 students in 130 rooms — and the inscription promised their highest hopes would be exceeded',
  },
]

export interface Scholar {
  name: string
  lifespan: string
  connection: string
  field: string
  contribution: string
}

export const SCHOLARS: Scholar[] = [
  { name: 'Maimonides (Ibn Maymun)', lifespan: '1135–1204', connection: 'Studied at Al-Qarawiyyin under Abdul Arab Ibn Muwashah', field: 'Jewish philosophy & theology', contribution: 'One of the most prolific Torah scholars of the Middle Ages. Compiled the thirteen principles of the Jewish faith. Fled Andalusia with his family, lived in Fez c. 1160. His exposure to Islamic philosophy at Al-Qarawiyyin deeply influenced his major works.' },
  { name: 'Ibn Khaldun', lifespan: '1332–1395', connection: 'Studied and taught at Al-Qarawiyyin', field: 'History, sociology, economics', contribution: 'Author of the Muqaddimah — considered a foundational work of sociology and historiography. The original manuscript of Al-\'Ibar, gifted by the author in 1396, is still housed in the Al-Qarawiyyin library.' },
  { name: 'Ibn Rushd (Averroes)', lifespan: '1126–1198', connection: 'Taught and studied at Al-Qarawiyyin', field: 'Philosophy, medicine, Islamic law', contribution: 'The great Aristotelian commentator. His interpretations of Aristotle reached Europe through Latin translations and shaped medieval Scholasticism. A copy of his Al-Bayan Wa-al-Tahsil dating from 1320 remains in the library.' },
  { name: 'Gerbert d\'Aurillac (Pope Sylvester II)', lifespan: '946–1003', connection: 'Claimed by 19th-C orientalist Krestovitch to have studied at Al-Qarawiyyin in the 10th C', field: 'Mathematics, astronomy', contribution: 'Credited with introducing Arabic numerals and the concept of zero to Europe. Pope from 999–1003. ' },
  { name: 'Leo Africanus (Hassan al-Wazzan)', lifespan: 'c. 1494–c. 1554', connection: 'Studied at Al-Qarawiyyin', field: 'Geography, diplomacy', contribution: 'Andalusi-born diplomat and geographer. His "Description of Africa" (1550) was the primary European source on Africa for centuries. Captured by pirates, converted to Christianity under Pope Leo X\'s patronage, then likely returned to Islam in Tunisia.' },
  { name: 'Al-Idrisi', lifespan: 'c. 1100–1165', connection: 'Settled in Fez for considerable time — likely studied or worked at Al-Qarawiyyin', field: 'Cartography, geography', contribution: 'Creator of the Tabula Rogeriana (1154) — one of the most detailed medieval world maps. Used by Christopher Columbus and Vasco da Gama. Commissioned by Roger II of Sicily.' },
  { name: 'Muhammad Ibn al-Hajj al-Abdari', lifespan: 'd. 1336', connection: 'Leading Al-Qarawiyyin scholar', field: 'Maliki jurisprudence', contribution: 'Leading scholar of the Maliki school of Islamic thought. Author of Al-Madkhal. Taught at Al-Qarawiyyin during the golden age of the Marinid period.' },
  { name: 'Aziza Chaouni', lifespan: 'Contemporary', connection: 'Architect of the 2016 Al-Qarawiyyin library restoration', field: 'Architecture, conservation', contribution: 'Toronto-based Moroccan-Canadian architect who restored the Al-Qarawiyyin library. Added solar panels, humidity control, a manuscript conservation laboratory, and a gutter system. Secured 4,000+ ancient manuscripts for future generations.' },
]

export interface DebatePoint {
  claim: string
  forMorocco: string
  counterArgument: string
}

export const THE_DEBATE: DebatePoint[] = [
  { claim: 'Oldest continuously operating educational institution', forMorocco: 'Guinness World Records and UNESCO recognise Al-Qarawiyyin as "the oldest existing, and continually operating educational institution in the world." Founded 859 CE. Teaching has occurred continuously since.', counterArgument: 'Many scholars argue that Al-Qarawiyyin was effectively a madrasa (Islamic college) until WWII, not a "university" in the European sense. The modern concept of a university — with faculties, autonomous governance, degree-granting structures — is a distinctly European innovation (Bologna, 1088).' },
  { claim: 'Mosque vs. university', forMorocco: 'Mosques in the Islamic world were always multi-functional: worship, education, political discussion, social gathering. The distinction between "mosque" and "university" is a Western categorisation that doesn\'t map onto Islamic educational traditions.', counterArgument: 'A foundation inscription discovered on-site dates to 877 CE and credits Dawud ibn Idris, not Fatima al-Fihri. Historian Chafik Benchekroun argues Fatima may be a figure. Contested.' },
  { claim: 'Degree system (ijazah)', forMorocco: 'Al-Qarawiyyin pioneered the ijazah — a licence granted after demonstrating mastery of a subject. This system prefigured the modern degree and was adopted across the Islamic world centuries before European equivalents.', counterArgument: 'The ijazah was granted by individual scholars to individual students, not by an institution. It lacked the corporate, institutional character of European university degrees (Bologna\'s legal studium, Oxford\'s papal charter).' },
  { claim: 'The Encyclopædia Britannica position', forMorocco: 'Britannica dates Al-Qarawiyyin\'s foundation to 859 and generally considers that "universities" existed outside Europe before the European model.', counterArgument: 'UNESCO itself describes Bologna (1088) as the "oldest university of the Western world" — implicitly acknowledging a different tradition. ' },
]

export interface LibraryFact {
  detail: string
}

export const LIBRARY: LibraryFact[] = [
  { detail: '4,000+ manuscripts preserved — one of the oldest libraries in the world, in continual use since 859 CE' },
  { detail: 'Volumes from the Muwatta of Imam Malik inscribed on gazelle parchment — among the oldest Islamic legal manuscripts extant' },
  { detail: 'A 9th-century Quran in Kufic calligraphy on leather — among the oldest Quran manuscripts in Morocco' },
  { detail: 'The original copy of Ibn Khaldun\'s Al-\'Ibar (including the Muqaddimah), gifted by the author himself in 1396' },
  { detail: 'A copy of the Quran given by Sultan Ahmad al-Mansur in 1602' },
  { detail: 'What may be the world\'s oldest surviving medical degree (ijazah) — from 1207 CE, written on deer parchment' },
  { detail: 'Sultan Abu Yusuf Ya\'qub (r. 1258–1286) persuaded Sancho IV of Castile to hand over manuscripts from the libraries of Seville, Córdoba, and Granada' },
  { detail: 'Before restoration, the library was sealed behind a copper door with four locks — four keys held by four different officials' },
  { detail: 'Restored in 2016 by Moroccan-Canadian architect Aziza Chaouni: solar panels, humidity control, manuscript conservation laboratory, digitisation facilities' },
  { detail: 'A 1323 fire destroyed most of the original collection. Ibn Abi Zar wrote his Rawd al-Qirtas shortly after, preserving much of the institutional history' },
]

export interface HistoryEvent {
  year: string
  event: string
  thread: string
}

export const HISTORY: HistoryEvent[] = [
  { year: '~800 CE', event: 'Fatima al-Fihri born in Kairouan (modern Tunisia). Her father Mohammed al-Fihri is a successful merchant', thread: 'founding' },
  { year: '~825', event: 'The al-Fihri family migrates from Kairouan to Fez — then capital of the Idrisid dynasty', thread: 'founding' },
  { year: '848', event: 'Mohammed al-Fihri dies. Fatima and her sister Mariam inherit a substantial fortune', thread: 'founding' },
  { year: '857–859', event: 'Fatima founds the Al-Qarawiyyin Mosque. Mariam founds the Al-Andalus Mosque. Fatima fasts daily throughout construction', thread: 'founding' },
  { year: '~880', event: 'Fatima al-Fihri dies. She is known as "Umm al-Banayn" — Mother of Boys — for taking students under her wing', thread: 'founding' },
  { year: '10th C', event: 'Al-Qarawiyyin designated as Fez\'s official Friday Mosque. The mu\'azzin of Al-Qarawiyyin is the first in Fez to call from the minaret — all others wait for his call', thread: 'growth' },
  { year: '1135', event: 'Almoravid Emir Ali ibn Yusuf extends the mosque from 18 to 21 aisles (3,000+ m²). Andalusian architects brought in', thread: 'growth' },
  { year: '~1160', event: 'Maimonides arrives in Fez. Studies at Al-Qarawiyyin. Islamic philosophy shapes his major works', thread: 'scholars' },
  { year: '13th–14th C', event: 'Marinid golden age. Dozens of madrasas built around Al-Qarawiyyin to house overflow students. Library exceeds 30,000 volumes', thread: 'growth' },
  { year: '1323', event: 'Fire ravages the Al-Qarawiyyin library. Most original manuscripts destroyed. Ibn Abi Zar writes Rawd al-Qirtas, preserving institutional history', thread: 'library' },
  { year: 'c. 1340', event: 'Marinid Sultan Abu al-Hasan founds the first Ben Youssef Madrasa in Marrakech', thread: 'benyoussef' },
  { year: '1396', event: 'Ibn Khaldun gifts his original manuscript of Al-\'Ibar (including the Muqaddimah) to the Al-Qarawiyyin library', thread: 'library' },
  { year: '1564–65', event: 'Saadian Sultan Abdallah al-Ghalib rebuilds Ben Youssef Madrasa entirely. 130 rooms, 900 students. Largest in the Maghreb', thread: 'benyoussef' },
  { year: '1912', event: 'French Protectorate begins. French administration reforms Al-Qarawiyyin: calendars, teacher salaries, schedules. Curriculum unchanged', thread: 'modern' },
  { year: '1940s', event: 'Al-Qarawiyyin begins admitting female students. During colonial period, the university serves as centre of resistance and financial independence', thread: 'modern' },
  { year: '1960', event: 'Ben Youssef Madrasa in Marrakech closes as an active school', thread: 'benyoussef' },
  { year: '1963', event: 'Al-Qarawiyyin incorporated into Morocco\'s modern state university system by royal decree', thread: 'modern' },
  { year: '1975', event: 'General studies moved to new Sidi Mohamed Ben Abdellah University. Al-Qarawiyyin retains Islamic sciences focus', thread: 'modern' },
  { year: '1988', event: 'King Hassan II resumes traditional Islamic education at Al-Qarawiyyin after nearly 30-year hiatus', thread: 'modern' },
  { year: '2016', event: 'Aziza Chaouni completes Al-Qarawiyyin library restoration. Solar panels, humidity control, conservation lab. 4,000+ manuscripts secured', thread: 'library' },
  { year: '2022', event: 'Ben Youssef Madrasa reopens after 2018–2022 restoration', thread: 'benyoussef' },
]

export interface Comparison {
  institution: string
  location: string
  founded: string
  claim: string
}

export const COMPARISONS: Comparison[] = [
  { institution: 'University of Al-Qarawiyyin', location: 'Fez, Morocco', founded: '859 CE', claim: 'Oldest existing, continually operating educational institution (Guinness, UNESCO)' },
  { institution: 'Al-Azhar University', location: 'Cairo, Egypt', founded: '970 CE', claim: 'Oldest degree-granting university in Egypt. Founded as Fatimid mosque-university' },
  { institution: 'University of Bologna', location: 'Bologna, Italy', founded: '1088 CE', claim: 'Oldest university in the Western world (UNESCO). Model for the European university system' },
  { institution: 'University of Oxford', location: 'Oxford, England', founded: 'c. 1096–1167 CE', claim: 'Oldest university in the English-speaking world. Teaching since at least 1096, expanded 1167' },
  { institution: 'University of Paris (Sorbonne)', location: 'Paris, France', founded: 'c. 1150–1257 CE', claim: 'Charter 1150, reorganised by Robert de Sorbon 1257. Model for northern European universities' },
  { institution: 'University of Cambridge', location: 'Cambridge, England', founded: '1209 CE', claim: 'Founded by Oxford scholars who fled after disputes. Second-oldest English-speaking university' },
]

export const HERO_STATS = [
  { value: '859', label: 'CE — Al-Qarawiyyin founded' },
  { value: '4,000+', label: 'manuscripts in the library' },
  { value: '1,166', label: 'years of continuous operation' },
  { value: '229', label: 'years older than Bologna' },
]

export const KEY_NUMBERS = [
  { number: '859', context: 'CE — the year Fatima al-Fihri completed the Al-Qarawiyyin Mosque. 229 years before Bologna (1088), 237 before Oxford (c. 1096)' },
  { number: '30,000+', context: 'Volumes held in the Al-Qarawiyyin library at its zenith during the Marinid period (13th–14th C)' },
  { number: '900', context: 'Students housed at Ben Youssef Madrasa in Marrakech at its peak — the largest Islamic college in the Maghreb' },
  { number: '4', context: 'Keys held by 4 different officials to open the copper library door — a medieval security protocol for priceless manuscripts' },
  { number: '1963', context: 'Year Al-Qarawiyyin was incorporated into Morocco\'s modern state university system. Over 1,100 years after its founding' },
  { number: '5', context: 'Campuses today: Fez (Islamic education + Sharia), Marrakech (Arabic Language), Agadir (Sharia), Tetouan (Theology & Philosophy)' },
]

export const BIBLIOGRAPHY = [
  { source: 'Guinness World Records', detail: 'Oldest higher-learning institution, oldest university. Entry for University of al-Qarawiyyin', url: 'https://www.guinnessworldrecords.com/world-records/oldest-university' },
  { source: 'UNESCO World Heritage Centre', detail: 'Medina of Fez (1981). Description references Al-Qarawiyyin as "oldest university in the world"', url: 'https://whc.unesco.org/en/list/170' },
  { source: 'World History Encyclopedia', detail: 'Fatima Al-Fihri and Al-Qarawiyyin University (2025). Sikeena Karmali Ahmed' },
  { source: 'Abdelhadi Tazi', detail: 'Eleven Centuries in the University of Al-Qarawiyyin. Indian University Press, 1960. Comprehensive PhD thesis' },
  { source: 'Ibn Abi Zar', detail: 'Rawd al-Qirtas (The Garden of Paper). 14th-century chronicle — primary historical source on Al-Qarawiyyin\'s founding' },
  { source: 'Chafik Benchekroun', detail: 'Argued that a 877 CE foundation inscription may be the original — and that Fatima al-Fihri may be rather than historical' },
  { source: 'Wikipedia / Multiple Academic Sources', detail: 'University of al-Qarawiyyin. Ben Youssef Madrasa. Comparative data on Bologna, Oxford, Cambridge, Paris' },
]
