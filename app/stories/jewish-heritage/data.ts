// ─────────────────────────────────────────────────
// Jewish Heritage in Morocco
// Module 077 — Cultural & Demographic Intelligence
// ─────────────────────────────────────────────────

export interface Mellah {
  city: string
  lat: number
  lng: number
  founded: string
  detail: string
  status: string
}

export const MELLAHS: Mellah[] = [
  { city: 'Fez', lat: 34.0598, lng: -4.9780, founded: '1438', detail: 'The first mellah. Created under Marinid sultan Abd al-Haqq — Jewish merchants moved from the qaysariyya in Fes el-Bali to a walled quarter beside the Royal Palace in Fes Jdid. Two communities: Toshavim (indigenous Moroccan Jews, Arabic and Tamazight speaking) and Megorashim (Sephardic exiles from Spain after 1492). Separate synagogues and cemeteries until the 18th century. 17 active synagogues at its peak. Today: two restored (Aben Danan, Slat al-Fassiyin). Cemetery with 22,000 white tombs restored 2015.', status: 'Restored — Muslim guardians' },
  { city: 'Marrakech', lat: 31.6225, lng: -7.9870, founded: '1558', detail: 'Second oldest. Created by Saadian sultan Abdallah al-Ghalib beside El Badi Palace. The mellah became a thriving commercial district with fountains and gardens. Lazama Synagogue built by Spanish exiles in 1492. Stars of David still visible on doorframes. Three Jewish families remain. $20M restoration ordered by Mohammed VI in 2016.', status: '3 families remain' },
  { city: 'Essaouira', lat: 31.5085, lng: -9.7595, founded: '18th C', detail: 'Built by Mohammed III to boost European trade. At one point the city\'s population was over half Jewish. Essaouira\'s Jews were known for jewellery, sugar, and the fishing trade. Chaim Pinto synagogue overlooks the Atlantic. Bayt Dakira (House of Memory) opened 2020. Josef Sebag, the last Jewish resident, died May 2025.', status: 'Bayt Dakira — heritage site' },
  { city: 'Meknès', lat: 33.8935, lng: -5.5473, founded: '17th C', detail: 'Near the Kasbah. Significant community augmented by Spanish Inquisition refugees. Two cemeteries with graves of prominent rabbis: Haim Messas, David Boussidan, Raphael Berdugo.', status: 'Heritage preservation' },
  { city: 'Tangier', lat: 35.7595, lng: -5.8340, founded: 'Historic', detail: 'International zone until 1956. Unique blend of Andalusian, Spanish, and European influences. Art Deco architecture from Jewish merchants. Central position within the medina.', status: 'Architectural traces' },
  { city: 'Casablanca', lat: 33.5731, lng: -7.5898, founded: 'Modern', detail: 'Over 100,000 Jews in the 1950s. Hub of Operation Yachin departures. Today home to Morocco\'s largest remaining Jewish community (~1,000). Museum of Moroccan Judaism — only Jewish museum in the Arab world. Beth-El Synagogue. Ettedgui Synagogue rededicated with royal attendance.', status: 'Largest living community' },
]

export interface EmigrationWave {
  period: string
  numbers: string
  detail: string
  destination: string
  color: string
}

export const EMIGRATION_WAVES: EmigrationWave[] = [
  { period: '1948–1949', numbers: '~18,000', detail: 'Triggered by the declaration of the State of Israel and anti-Jewish riots in Oujda and Jerada (44 killed, June 1948). Fear and urgency. First departures via Oujda to Algeria then onward.', destination: 'Israel', color: '#2D5F8A' },
  { period: '1949–1956', numbers: '~90,000', detail: 'Cadima apparatus — Zionist operation run by Jewish Agency and Mossad Le\'Aliyah from a Casablanca office. Transit camp near El Jadida. Departures via Marseille. Seleqseya policy (1951–53) discriminated against poor families, those without breadwinners aged 18–45, or families with medical needs.', destination: 'Israel', color: '#2D5F8A' },
  { period: '1956–1961', numbers: '~29,400', detail: 'Emigration officially prohibited after independence (banned outright for Israel in 1959 under Arab League pressure). Clandestine departures continued. Mohammed V granted Jews full citizenship and political positions.', destination: 'Israel (clandestine)', color: '#F59E0B' },
  { period: '1961–1964', numbers: '~97,000', detail: 'Operation Yachin. Secret agreement between Mossad\'s Alex Gatmon and Hassan II\'s government. HIAS as the public front. $500,000 down payment + $100 per emigrant (rising to $250 after 50,000th). Families departed by ship from Casablanca and Tangier via Italy, France, or Spain. Entire families required — no individuals.', destination: 'Israel', color: '#A0452E' },
  { period: '1967–1973', numbers: 'Decline to 35,000', detail: 'Six-Day War (1967) and Yom Kippur War (1973) heightened Arab-Jewish tensions. This wave went primarily to France, Canada, and North America rather than Israel. By 1971: 35,000 Jews remained.', destination: 'France / Canada / USA', color: '#7B506F' },
  { period: '1973–present', numbers: '35,000 → ~1,000', detail: 'Steady decline. Ageing community. Young men continue to leave for Israel and France. In 2025 the Jewish population in Morocco numbers approximately 1,000. Most in Casablanca. Josef Sebag, last Jew of Essaouira, died May 2025.', destination: 'Israel / France', color: '#6B7280' },
]

export interface Synagogue {
  name: string
  city: string
  detail: string
}

export const SYNAGOGUES: Synagogue[] = [
  { name: 'Slat al-Fassiyin', city: 'Fez', detail: 'Possibly the oldest synagogue in the Fez mellah, dating to the 14th century. Housed the rituals of the Toshavim — indigenous Moroccan Jews. Used as a carpet workshop and boxing gym after the community left. Restored 2013.' },
  { name: 'Aben Danan', city: 'Fez', detail: '17th century. Dedicated to the Megorashim — Spanish exiles. Hidden behind a tiny unmarked door. Restored with UNESCO support in 1999. Now cared for by Muslim guardians. Open to visitors.' },
  { name: 'Lazama (Slat al-Azama)', city: 'Marrakech', detail: 'Built 1492 by Jews fleeing Spain. Interior courtyard in Moroccan architectural style. Stars of David on doorposts. One of the few remaining active synagogues — one Jewish family maintains it.' },
  { name: 'Chaim Pinto', city: 'Essaouira', detail: 'Named after the revered rabbi (1748–1845). Overlooks the Atlantic Ocean. Part of the pilgrimage circuit. Restored.' },
  { name: 'Beth-El', city: 'Casablanca', detail: 'Active synagogue in Morocco\'s largest remaining community. Alongside the Ettedgui Synagogue, rededicated with royal attendance.' },
  { name: 'Mohammed VI Polytechnic', city: 'Marrakech', detail: 'Opened November 2022 — first university synagogue in the Arab world. Project led by Mimouna Association and American Sephardi Federation. Inaugurated by Rabbi Elie Abadie.' },
]

export interface HistoryEvent {
  year: string
  event: string
  thread: 'ancient' | 'medieval' | 'colonial' | 'departure' | 'preservation'
}

export const HISTORY: HistoryEvent[] = [
  { year: 'c. 6th C BCE', event: 'Possible arrival of Jews in North Africa after the destruction of the First Temple. Predates Islam in Morocco by over a millennium.', thread: 'ancient' },
  { year: 'c. 1st C CE', event: 'Jewish communities established across Roman Mauretania Tingitana. Archaeological evidence at Volubilis.', thread: 'ancient' },
  { year: '8th–9th C', event: 'Jews present in Fez from its founding by Idris II. Foundouk el-Yihoudi ("Jewish Caravanserai") district in Fes el-Bali. Toshavim community speaks Arabic and Tamazight.', thread: 'ancient' },
  { year: '1438', event: 'First mellah created in Fez. Marinid sultan Abd al-Haqq moves Jewish merchants from the qaysariyya to a walled quarter beside the Royal Palace in Fes Jdid.', thread: 'medieval' },
  { year: '1492', event: 'Alhambra Decree expels Jews from Spain. Megorashim arrive in Morocco — tens of thousands settle in Fez and Marrakech. Two communities coexist: Toshavim and Megorashim, with separate synagogues, cemeteries, and languages.', thread: 'medieval' },
  { year: '1558', event: 'Mellah of Marrakech created by Saadian sultan Abdallah al-Ghalib beside El Badi Palace. Pattern for all subsequent mellahs.', thread: 'medieval' },
  { year: '1862', event: 'Alliance Israélite Universelle opens first school in Tetouan. French-language Jewish education begins — transforming the community\'s relationship to Europe.', thread: 'colonial' },
  { year: '1912', event: 'French Protectorate established. Jews granted equality and religious autonomy. Many move from mellahs to European-built ville nouvelles.', thread: 'colonial' },
  { year: '1941', event: 'Vichy regime imposes anti-Jewish laws: quotas on doctors and lawyers, expulsion from French schools, relocation to mellahs. Mohammed V refuses enforcement. Telegram: "I do not have Jews or Muslims. I only have Moroccan subjects."', thread: 'colonial' },
  { year: '1948', event: 'State of Israel declared. Anti-Jewish riots in Oujda and Jerada: 44 killed. 18,000 Jews leave Morocco. Population: ~265,000 — largest Jewish community in the Muslim world.', thread: 'departure' },
  { year: '1949–1956', event: 'Cadima operation: ~90,000 emigrate to Israel. Seleqseya discrimination policy. Transit camp near El Jadida. Departures via Marseille.', thread: 'departure' },
  { year: '1956', event: 'Morocco independent. Jews granted full citizenship. Several Jews serve in Parliament. Minister of Posts and Telegraphs is Jewish. Mohammed V mourned by Jews and Muslims equally at his death.', thread: 'colonial' },
  { year: '1961–1964', event: 'Operation Yachin: ~97,000 emigrate. Secret Mossad-Hassan II agreement. $100–250 per capita paid to Morocco. HIAS as front. Ships from Casablanca and Tangier via Italy and France.', thread: 'departure' },
  { year: '1967–1973', event: 'Six-Day War and Yom Kippur War accelerate departure. This wave goes to France, Canada, North America. By 1971: 35,000 remain.', thread: 'departure' },
  { year: '2011', event: 'New constitution recognises "Hebraic influences" as an enriching part of Moroccan identity. First Arab country to constitutionally acknowledge Jewish heritage.', thread: 'preservation' },
  { year: '2020', event: 'Bayt Dakira (House of Memory) opens in Essaouira. Morocco normalises relations with Israel (Abraham Accords). 50,000+ Israelis visit Morocco annually.', thread: 'preservation' },
  { year: '2021', event: 'Mohammed VI launches initiative to restore hundreds of Jewish sites: synagogues, cemeteries, mellahs. Original street names reinstated. 110 synagogues restored. 200+ cemeteries renovated.', thread: 'preservation' },
  { year: '2025', event: 'Jewish population ~1,000. Josef Sebag, last Jew of Essaouira, dies. The community that numbered 265,000 in 1948 reduced to its smallest form. Morocco retains the largest Jewish community in the Arab world.', thread: 'preservation' },
]

export const HERO_STATS = [
  { value: '265K', label: 'Jews in 1948' },
  { value: '~1,000', label: 'Remain in 2025' },
  { value: '2,000+', label: 'Years of presence' },
  { value: '110', label: 'Synagogues restored' },
]

export const KEY_NUMBERS = [
  { value: '265,000', unit: 'Jews in 1948', note: 'The largest Jewish community in the Muslim world. Hundreds of communities across the country. By 2025: approximately 1,000 remain.' },
  { value: '~1,000', unit: 'remain today', note: 'Mostly in Casablanca. Small communities in Rabat, Marrakech, Meknès, Tangier, Fez. Morocco still has more Jews than any other Arab nation.' },
  { value: '97,000', unit: 'Operation Yachin', note: '1961–1964. Secret Mossad-Hassan II agreement. $100–250 per emigrant. Ships from Casablanca via Italy and France. 54.6% of the remaining community left in three years.' },
  { value: '200+', unit: 'cemeteries renovated', note: 'Across the country. Pilgrimage sites at tombs of 13 holy sages. Annual hilloula gatherings draw Moroccan Jews from Israel, France, and Canada.' },
  { value: '22,000', unit: 'white tombs in Fez', note: 'Jewish cemetery of Fez. Restored 2015 with three small synagogues. Resting place of Rabbi Yehuda Ben Attar (d. 1733) — subject of major annual pilgrimage.' },
  { value: '1438', unit: 'first mellah', note: 'Fez. Beside the Royal Palace. The word "mellah" from the Arabic for salt — origin debated: salt trade, cursed ground, or a mark of respect.' },
]

export interface BibliographyEntry {
  author: string
  title: string
  year: string
  detail: string
}

export const BIBLIOGRAPHY: BibliographyEntry[] = [
  { author: 'Zafrani, Haim', title: 'Two Thousand Years of Jewish Life in Morocco', year: '2005', detail: 'Ktav House. The definitive work. Zafrani — a Moroccan-born scholar — traces Jewish presence from pre-Islamic antiquity through the great departure. Music, liturgy, law, language, daily life. He also retrieved the 1941 telegram in which Mohammed V refused to distinguish between Jewish and Muslim subjects.' },
  { author: 'Gottreich, Emily Benichou', title: 'The Mellah of Marrakesh: Jewish and Muslim Space in Morocco\'s Red City', year: '2007', detail: 'Indiana University Press. Spatial history of the Marrakech mellah. How the physical quarter shaped social relations, economic networks, and identity for both communities across centuries.' },
  { author: 'Bin-Nun, Yigal', title: 'Psychosis or Willingness: The Mass Emigration of Moroccan Jews to Israel', year: '2013', detail: 'Academic study of Operation Yachin and Cadima. Documents the Mossad operations, the secret negotiations with Hassan II, the financial agreements, and the voices of those who left and those who stayed.' },
  { author: 'Boum, Aomar & Park, Thomas K.', title: 'Historical Dictionary of Morocco', year: '2016', detail: 'Scarecrow Press. Comprehensive reference including entries on every major mellah, the Alliance Israélite Universelle, dhimmi status, and the post-independence transformation of Jewish communities.' },
  { author: 'Hachkar, Kamal (dir.)', title: 'Tinghir-Jerusalem: Les Échos du Mellah', year: '2013', detail: 'Documentary. Follows the fate of the Jewish community of Tinghir who left for Israel in the 1950s and 60s. Returns to both places. The mellah\'s silence speaks as loudly as the testimonies.' },
  { author: 'Schroeter, Daniel J.', title: 'The Sultan\'s Jew: Morocco and the Sephardi World', year: '2002', detail: 'Stanford University Press. Examines the role of Jewish merchants as intermediaries between Morocco and Europe, particularly in Essaouira. The "tujjar al-sultan" — merchants of the king — who connected continents.' },
]
