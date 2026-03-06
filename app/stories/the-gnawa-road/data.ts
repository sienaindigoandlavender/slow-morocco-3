// ─────────────────────────────────────────────────
// The Gnawa Atlas
// Module 083 — Musical & Spiritual Intelligence
// ─────────────────────────────────────────────────

export interface Instrument {
  name: string
  aliases: string[]
  arabic: string
  description: string
  materials: string
  construction: string
  playing: string
  role: string
  ancestor: string
}

export const INSTRUMENTS: Instrument[] = [
  {
    name: 'Guembri',
    aliases: ['Sintir', 'Hajhouj', 'Gimbri'],
    arabic: 'الكمبري / سنتير',
    description: 'Three-stringed bass plucked lute. Only played by the maalem (master musician). Guitar-sized, with a body carved from a single log and covered with camel skin.',
    materials: 'Body: single piece of walnut, mahogany, poplar, fig, acacia, or iroko wood, hollowed out. Soundboard: dromedary (camel) neck skin, stretched taut and nailed or stitched. Strings: three strings of goat gut (modern: sometimes nylon). Tuning: sliding leather rings. Sound modifier: sersera — metal rings attached to neck that create a distinctive buzzing rattle.',
    construction: 'Body hollowed from a halved tree trunk into a rectangular or canoe shape. Camel skin stretched over the playing side, functioning like a banjo membrane. The neck passes through the body, emerging through the skin at the base as a string carrier. Three strings of different thickness: the lowest is a drone (never fretted), the middle tuned an octave higher (also a drone, half-neck length), the highest is melodic. Approximately 1.2m total length; box approximately 55cm × 19cm × 14cm.',
    playing: 'Strings plucked downward with knuckle side of index finger and inside of thumb. The player simultaneously slaps the camel skin body with free fingers for percussive tones — pizzicato cello meets hand drum. Both melodic and percussive at once. Common tunings: C, D, F, G. Pentatonic scales predominate.',
    role: 'Attracts the mluk (spirits) into the dance space and drives trance. Only the maalem plays it. In the lila, the guembri opens the treq (path) — the encoded sequence of ritual repertoire.',
    ancestor: 'Derived from the West African ngoni (4-stringed lute of the Sahel griots). Also related to the xalam and hoddu. The sliding leather tuning rings and percussive playing style are directly traceable to Malian and Sahelian instruments. Some scholars draw connections to the American banjo through shared African ancestry.',
  },
  {
    name: 'Qraqeb',
    aliases: ['Krakebs', 'Karkabat', 'Chkacheks'],
    arabic: 'قراقب',
    description: 'Large iron castanets in a figure-8 shape. Played by the ensemble (kouyou) accompanying the maalem.',
    materials: 'Forged iron or steel. Two pairs of concave metal discs connected by a curved handle. Heavy — the weight is part of the sound.',
    construction: 'Each castanet is two metal shells joined at one end. The player holds one pair in each hand. When struck together, they produce a sharp, penetrating, metallic clap.',
    playing: 'Played with both hands simultaneously, marking and maintaining constant binary and tertiary rhythms that overlap and alternate. The qraqeb keep a relentless, incisive rhythm throughout the lila — they are the thread that places participants in the Gnawa universe. When not playing qraqeb, ensemble members clap.',
    role: 'The qraqeb maintain rhythmic foundation while the guembri leads melodically. Together they create the polyrhythmic 3:2 hemiola characteristic of trance music worldwide.',
    ancestor: 'No direct West African ancestor identified, but iron percussion instruments are widespread across the Sahel. The figure-8 shape may be unique to Gnawa adaptation in Morocco.',
  },
  {
    name: 'Tbel',
    aliases: ['Ganga', 'Tbal'],
    arabic: 'طبل',
    description: 'Large cylindrical drum. Used in the opening processional phase (aada) and in rural/Berber-influenced Gnawa styles.',
    materials: 'Wooden shell with goatskin heads on both sides. Struck with curved sticks.',
    construction: 'Double-headed drum, larger than most Moroccan percussion. Carried on a strap or placed on the ground.',
    playing: 'Struck with curved sticks on both heads. Creates deep, resonant, processional beats. In urban lila ceremonies, the tbel is used primarily in the opening aada phase, then set aside when the guembri takes over for the treq.',
    role: 'Opens the ceremony. In rural areas (particularly Berber-influenced regions), the ganga/tbel has greater prominence. In urban imperial cities (Marrakech, Fez, Essaouira), the guembri dominates. This urban/rural distinction marks two broad Gnawa stylistic traditions.',
    ancestor: 'Related to West African djembe and dundun drum traditions.',
  },
]

export interface SpiritFamily {
  colour: string
  hex: string
  name: string
  arabic: string
  spirits: string
  character: string
  incense: string
  domain: string
}

export const SEVEN_COLOURS: SpiritFamily[] = [
  { colour: 'White', hex: '#F5F5F5', name: 'Moulay Abdelqader al-Jilani', arabic: 'مولاي عبد القادر الجيلاني', spirits: 'Holy Muslim saints. The most beatific spirits.', character: 'Bestows well-being, grace, and spiritual peace. The opening of the sacred repertoire. Participants draped in white.', incense: 'Frankincense, sandalwood', domain: 'Purity, holiness, Sufi sainthood' },
  { colour: 'Light Blue', hex: '#87CEEB', name: 'Sidi Moussa', arabic: 'سيدي موسى', spirits: 'Lord of the Sea. Water spirits.', character: 'Connected to the ocean and its mysteries. Randy Weston described "blue entering his spirit" at a lila in 1969 — the blues connection. Gentle but vast.', incense: 'Ambergris', domain: 'Sea, water, vastness, the blues' },
  { colour: 'Dark Blue', hex: '#1E3A5F', name: 'Sidi Sma', arabic: 'سيدي سما', spirits: 'Lord of the Sky. Celestial spirits.', character: 'The counterpart to Sidi Moussa\'s sea — the sky above. Air, wind, distance.', incense: 'Benzoin', domain: 'Sky, air, the heavens' },
  { colour: 'Red', hex: '#C62828', name: 'Sidi Hamou', arabic: 'سيدي حمو', spirits: 'Master of the slaughterhouses. Blood spirits.', character: 'Wild, fearsome, very demanding. Related to blood and sacrifice. Difficult to manage. During possession, participants may handle knives.', incense: 'Henna, blood-coloured resins', domain: 'Blood, sacrifice, the slaughterhouse, ferocity' },
  { colour: 'Green', hex: '#2E7D32', name: 'Moulay Brahim / Islamic saints', arabic: 'مولاي ابراهيم', spirits: 'Holy Islamic spirits. Green is the colour of Islam.', character: 'Sacred, devout, protective. These spirits are Muslim. Their invocation carries deep religious gravity.', incense: 'Myrrh', domain: 'Islam, faith, prophetic lineage, protection' },
  { colour: 'Black', hex: '#1a1a1a', name: 'Sidi Mimoun / Lalla Mimouna', arabic: 'سيدي ميمون / للا ميمونة', spirits: 'Jinn of the forest. Male and female. The most dangerous and wild of all.', character: 'During possession, adepts may morph into animals, eat raw flesh, cut themselves with knives, or attack the audience. Sidi Mimoun obliges the possessed to self-mortification. The most feared suite.', incense: 'Dark resins, heavy smoke', domain: 'Forests, darkness, wildness, transformation, danger' },
  { colour: 'Yellow', hex: '#F9A825', name: 'Lalla Mira', arabic: 'للا ميرة', spirits: 'Queen of the female spirits. Joyous, laughing, radiant.', character: 'A laughing, joyous spirit. Her name alone makes people smile. She loves perfume, beauty, and celebration. The lighter end of the spectrum — after the darkness of Sidi Mimoun.', incense: 'Musk', domain: 'Femininity, joy, laughter, perfume, celebration' },
]

export interface Maalem {
  name: string
  years: string
  city: string
  lineage: string
  significance: string
  collaborations: string
  style: string
}

export const MAALEMS: Maalem[] = [
  { name: 'Maâlem Mahmoud Guinia', years: '1951–2015', city: 'Essaouira', lineage: 'Son of Maâlem Boubker Guinia (1927–2000) and moqaddema A\'isha Qabral. Family from present-day Mali and Mauritania — soldiers in the sultan\'s army, not slave-descended. Brothers Abdellah (d. 2013), Mokhtar, and Bilal also maalems. Sister Zaida is a moqaddema.', significance: 'Most revered Gnawa musician internationally. His 1994 album "The Trance of Seven Colors" (with Pharoah Sanders, produced by Bill Laswell) remains the reference recording. At his final Essaouira concert (May 2015), visibly ill, he handed his guembri to his son Houssam. Died August 2, 2015.', collaborations: 'Pharoah Sanders, Carlos Santana, Peter Gabriel, Peter Brötzmann, Bill Laswell, James Holden, Floating Points', style: 'Marsaoui (Essaouira style). Trance-inducing vocals and virtuosic guembri.' },
  { name: 'Maâlem Mustapha Baqbou', years: 'c. 1953–2025', city: 'Marrakech', lineage: 'Born into a Gnawa family in Marrakech. Brother Ahmed Baqbou also a maalem.', significance: 'Bridge between Gnawa ritual percussion and Morocco\'s 1970s folk revival (member of Jil Jilala). Preserved the Marrakchi style — more percussive and urban than the Essaouira school.', collaborations: 'Jil Jilala, various European festival partnerships', style: 'Marrakchi style. Urban, percussive, traditional. Purist approach to lila ceremony.' },
  { name: 'Maâlem Hamid El Kasri', years: 'b. Ksar El Kebir', city: 'Rabat (from Ksar El Kebir)', lineage: 'Northern Moroccan origins. Began apprenticeship at age 7 in Tangier under master Abdelwahab "Stitou."', significance: 'Bridges northern (gharbaoui/shamali), Essaouira (marsaoui), and southern Berber (soussi) styles. Introduced Gnawa to mainstream Moroccan audiences.', collaborations: 'Jacob Collier, Snarky Puppy, numerous international festivals', style: 'Fusion of northern, southern, and coastal Gnawa styles. Powerful vocals.' },
  { name: 'Maâlem Hassan Hakmoun', years: 'b. 1963, Marrakech', city: 'Marrakech → New York City', lineage: 'Mother is a mystic healer in Marrakech. Performing from age 4 in Djemaa el-Fna.', significance: 'First Gnawa musician to establish a major career in the West. Based in NYC since late 1980s. Debut at Lincoln Center 1987. Rolling Stone "Hot Pick of \'94."', collaborations: 'Peter Gabriel, Don Cherry, various world music projects', style: 'Marrakchi roots with Western concert sensibility.' },
  { name: 'Maâlem H\'mida Boussou', years: '1939–2007', city: 'Casablanca (from Marrakech)', lineage: 'Family traced to the Boussou tribe, originally near Lake Chad, later deported to Mauritania by Touareg. Taught by Maâlem Ahmed Oueld Dijja. Became maalem at 16.', significance: 'One of the most respected traditionalists. His Casablanca ceremonies were known for their spiritual intensity. Son Hassan Boussou continues the tradition.', collaborations: 'Primarily ceremonial. Rare festival appearances.', style: 'Pure traditional. Casablanca base, Marrakchi roots. Ceremony over performance.' },
  { name: 'Maâlem Abdellah El Gourd', years: 'Active from Tangier', city: 'Tangier', lineage: 'Self-taught. Learned Gnawa while working as a radio engineer. Tangier school — northern Gnawa with shamali influences.', significance: 'Key collaborator with Randy Weston, the jazz pianist who relocated to Morocco in 1968. Co-produced "The Splendid Master Gnawa Musicians of Morocco" — 1996 Grammy nomination, Best World Music Album.', collaborations: 'Randy Weston, Archie Shepp, Johnny Copeland', style: 'Northern (shamali) Gnawa. Jazz-adjacent. Improvisational openness.' },
  { name: 'Maâlem Houssam Guinia', years: 'Active (son of Mahmoud)', city: 'Essaouira', lineage: 'Son of Mahmoud Guinia. Received his father\'s guembri at the final Essaouira festival concert in May 2015. Brother Mokhtar Guinia Jr. also a maalem.', significance: 'Heir to the Guinia dynasty. Tours internationally. 2025 collaboration with Nigerian artist CKay blended Gnawa with Afrobeats — the next evolution. "I grew up in this art since my birth. Gnawa music is more important than ever, because it has become a universal music."', collaborations: 'James Holden, CKay, Floating Points, international festival circuit', style: 'Marsaoui lineage. Preserving ancestral repertoire while embracing global collaboration.' },
  { name: 'Maâlem Majid Bekkas', years: 'b. Salé', city: 'Salé / Rabat', lineage: 'Started playing banjo in 1972 with Moroccan "Jil" groups. Established Gnaoua Blues Band in 1990s.', significance: 'His album "African Gnaoua Blues" (2001) made explicit the connections between Gnawa pentatonic scales, call-and-response, and American blues. Plays guembri, oud, and slide guitar.', collaborations: 'Ramon Lopez, various European jazz musicians', style: 'Gnaoua Blues fusion. Guitar and oud alongside guembri.' },
]

export interface LilaPhase {
  name: string
  arabic: string
  description: string
  duration: string
  music: string
}

export const LILA_PHASES: LilaPhase[] = [
  { name: 'Preparation', arabic: '', description: 'A communal meal is shared. A sacrifice (often a black goat) is performed to assure the presence of spirits. The moqaddma (female ritual leader) cleans the space with herbs, candles, and recitations. The ceremony takes place inside a private house, shrine, or zawiya.', duration: 'Before nightfall', music: 'No formal music yet' },
  { name: 'Aada', arabic: 'العادة', description: 'The opening processional. "Habit" or "traditional norm." The kouyou (ensemble) performs swirling acrobatic dances, playing the qraqeb and tbel drums. This phase consecrates the space and recalls the origins of the Gnawa — songs of slavery, displacement, the Bambara ancestors, and ultimately redemption. Called "Oulad da Bambara" (Sons of the Bambara).', duration: '~1–2 hours', music: 'Tbel drums, qraqeb, processional chanting. No guembri yet.' },
  { name: 'Treq (The Path)', arabic: 'الطريق', description: 'The guembri enters. The maalem opens the treq — the strictly encoded ritual sequence of music, dances, colours, and incenses. The path moves through the realms of the seven mluk (spirit families), each with its own colour, incense, rhythm, suite of songs, and style of dance. Participants who are called by a particular spirit rise to trance (jedba), are draped in that spirit\'s coloured veils, and negotiate their relationship with the possessing entity.', duration: '~4–6 hours (the bulk of the night)', music: 'Guembri leads. Qraqeb maintain rhythm. Call-and-response vocals. Seven suites in sequence.' },
  { name: 'Renaissance', arabic: '', description: 'At the first lights of dawn, the journey through the seven realms is complete. Participants return to the common world. The ceremony closes. Those who tranced have had their spirits placated — not exorcised, but negotiated with and integrated.', duration: 'Dawn', music: 'Final chants. Gradual quieting.' },
]

export interface HistoryEvent {
  year: string
  event: string
  thread: string
}

export const HISTORY: HistoryEvent[] = [
  { year: '8th–9th C', event: 'Earliest documented presence of sub-Saharan Black Africans in Morocco. Arab traders bring enslaved peoples across the Sahara. Gnawa ancestors begin arriving — primarily from regions of present-day Guinea, Mali, Senegal, Chad, and Nigeria', thread: 'origin' },
  { year: '11th C', event: 'Under Almoravid Sultan Yusuf Ibn Tashfin, Black Africans conscripted into military service. Slave trade intensifies along trans-Saharan routes', thread: 'origin' },
  { year: '15th–16th C', event: 'Major influx under the Saadian dynasty. Moroccan conquest of parts of the Songhai Empire brings large numbers of captives from Timbuktu. Marrakech and Essaouira (then called "port of Timbuktu") become major slave markets', thread: 'origin' },
  { year: 'Late 17th C', event: 'Sultan Moulay Ismail creates the Abid al-Bukhari — a Black slave army of 150,000. Gnawa communities coalesce in imperial cities around military settlements. Spiritual practices begin fusing West African possession traditions with Sufi Islam', thread: 'formation' },
  { year: '18th C', event: 'The sintir/guembri gains recognition as a sacred instrument within organized Gnawa brotherhoods (taifa). Lila ceremonies formalize into the structure of seven mluk/seven colours. The figure of Sidi Bilal (first muezzin of Islam, Ethiopian-born) becomes the founding ancestor', thread: 'formation' },
  { year: '1920s', event: 'Slavery formally ends in Morocco under French colonial pressure, though informal practices continue into mid-20th century. Gnawa communities remain as descendants of forcibly relocated groups', thread: 'modern' },
  { year: '1960s', event: 'Gnawa musicians begin moving from purely ceremonial contexts into professional music. Randy Weston, American jazz pianist, relocates to Morocco in 1968 and begins collaborating with Gnawa masters — recognizing shared African musical DNA between Gnawa and jazz/blues', thread: 'global' },
  { year: '1970s', event: 'Mahmoud Guinia and Hassan Hakmoun begin bringing Gnawa to international audiences. Mustapha Baqbou joins folk revival group Jil Jilala, bridging Gnawa and Moroccan popular music', thread: 'global' },
  { year: '1987', event: 'Hassan Hakmoun debuts at Lincoln Center, New York — first major Western concert appearance by a Gnawa musician', thread: 'global' },
  { year: '1994', event: 'The Trance of Seven Colors recorded in Essaouira: Mahmoud Guinia with Pharoah Sanders, produced by Bill Laswell. The defining international Gnawa recording. Grammy-nominated "The Splendid Master" (Weston/El Gourd) follows in 1996', thread: 'global' },
  { year: '1998', event: 'First Gnaoua and World Music Festival in Essaouira. Free concerts draw 20,000 initially, growing to 200,000+ by 2006. Becomes Morocco\'s largest music festival and the global crossroads for Gnawa-fusion', thread: 'festival' },
  { year: '2015', event: 'Death of Maâlem Mahmoud Guinia (August 2). At his final concert in Essaouira, he handed his guembri to son Houssam — the passing of the lineage. Renewed global interest in Gnawa follows', thread: 'modern' },
  { year: '2019', event: 'UNESCO inscribes Gnawa on the Representative List of the Intangible Cultural Heritage of Humanity. Morocco\'s nomination describes it as "a set of musical productions, fraternal practices and therapeutic rituals where the secular mixes with the sacred"', thread: 'recognition' },
  { year: '2025', event: 'Maâlem Houssam Guinia collaborates with Nigerian Afrobeats artist CKay. Maâlem Khalid Sansi pairs with Cuban group Cimafunk. The next generation pushes Gnawa into new global fusions while the lila tradition continues in private homes across Morocco', thread: 'global' },
]

export const HERO_STATS = [
  { value: '2019', label: 'UNESCO Intangible Heritage inscription' },
  { value: '7', label: 'spirit families, colours, suites, incenses' },
  { value: '3', label: 'strings on the guembri — goat gut on camel skin' },
  { value: '500+', label: 'years of continuous practice in Morocco' },
]

export const KEY_NUMBERS = [
  { number: '7', context: 'Spirit families (mluk), each with its own colour, incense, rhythm, suite of songs, and dance. The lila moves through all seven realms, white to yellow, dusk to dawn' },
  { number: '3', context: 'Strings on the guembri. Goat gut on a body of hollowed wood covered in camel skin. The lowest string is a drone, never fretted' },
  { number: '1998', context: 'First Gnaoua and World Music Festival in Essaouira. From 20,000 attendees to 200,000+ by 2006. Free concerts' },
  { number: '1951–2015', context: 'Lifespan of Maâlem Mahmoud Guinia. Son of Boubker Guinia, father of Houssam. Three generations, all from Essaouira' },
  { number: '200,000+', context: 'Peak annual attendance at the Essaouira Gnaoua Festival. Morocco\'s largest music event' },
  { number: '16th C', context: 'Earliest documentation of Gnawa practice in Morocco. Enslaved West Africans arrived earlier. Five hundred years of unbroken tradition' },
]

export const REGIONAL_STYLES = [
  { name: 'Marsaoui', city: 'Essaouira', character: 'Atlantic coast style. Greater prominence of the guembri. The Guinia family dynasty. Named for the city\'s old name: al-Sawira / Mogador' },
  { name: 'Marrakchi', city: 'Marrakech', character: 'Urban imperial city style. More percussive, stronger tbel and ganga elements. The Baqbou family. Djemaa el-Fna street performance tradition' },
  { name: 'Shamali / Gharbaoui', city: 'Tangier / Ksar El Kebir / Northern Morocco', character: 'Northern style. Influenced by Andalusian and Jebala music. Abdellah El Gourd (Tangier). Hamid El Kasri bridges north and south' },
  { name: 'Soussi', city: 'Agadir / Southern Morocco', character: 'Berber-influenced. Greater role for ganga (drum). Rural ceremonial context. May preserve pre-Islamic African elements' },
  { name: 'Casablanca', city: 'Casablanca', character: 'Urban synthesis. H\'mida Boussou\'s ceremonies. Draws from multiple regional traditions' },
]

export const KEY_VOCABULARY = [
  { term: 'Maalem', arabic: 'معلم', definition: 'Master musician. Honorary title reserved for musicians deeply versed in Gnawa music and culture. Often attained after decades of practice. The maalem plays the guembri, leads the lila, and commands the spirits' },
  { term: 'Lila', arabic: 'ليلة', definition: '"Night." The all-night healing ceremony. Also called derdeba. Begins at dusk, ends at dawn. A journey through the seven realms of the mluk. Private, communal, therapeutic, sacred' },
  { term: 'Mluk', arabic: 'ملوك', definition: 'Possessing spirits (singular: melk). From the verb malaka — "to own." Seven families, seven colours. Not exorcised but negotiated with and integrated. Some are Muslim, some Jewish, some pagan' },
  { term: 'Jedba', arabic: 'جذبة', definition: 'Trance state. The ecstatic condition entered by participants during the lila. Spectacular dancing, self-mortification, speaking in tongues. The body becomes inhabited (meskun) by a spirit' },
  { term: 'Moqaddma', arabic: 'مقدمة', definition: 'Female ritual leader / clairvoyant (also shuwafa). She determines the accessories, clothing, and incense needed during the ceremony. She diagnoses which spirit possesses each participant. The maalem controls the music; the moqaddma controls the ritual' },
  { term: 'Treq', arabic: 'طريق', definition: '"Path." The strictly encoded ritual sequence of music, dances, colours, and incenses that guides the ecstatic journey through the seven mluk realms from dusk to dawn' },
  { term: 'Taifa', arabic: 'طائفة', definition: 'Brotherhood / confraternity. The organisational unit of Gnawa communities. Each taifa has a maalem, a moqaddma, kouyou (ensemble musicians), and affiliated families' },
  { term: 'Kouyou', arabic: 'كويو', definition: 'The ensemble of qraqeb players and backing singers who accompany the maalem. They provide call-and-response vocals and rhythmic foundation' },
  { term: 'Sidi Bilal', arabic: 'سيدي بلال', definition: 'Bilal ibn Rabah — Ethiopian-born first muezzin of Islam, freed slave of the Prophet Muhammad. Spiritual ancestor of all Gnawa. His story places Gnawa identity within Islam' },
  { term: 'Fraja', arabic: 'فرجة', definition: '"Show" or "spectacle." Distinguishes secular public performances from sacred lila ceremonies. Concerts are fraja; private healing ceremonies are lila' },
]

export const BIBLIOGRAPHY = [
  { source: 'UNESCO Intangible Cultural Heritage', detail: 'Gnawa inscription (2019, 14.COM). Representative List. Morocco nomination file. Official description of practices and significance' },
  { source: 'Wikipedia', detail: 'Gnawa music, Gnawa people, Sintir, Mahmoud Guinia. Comprehensive scholarly citations. Lila ceremony structure, mluk descriptions, maalem lineages' },
  { source: 'IEMed (European Institute of the Mediterranean)', detail: '"Gnawa: Music and Spirit." Regional styles (marsaoui, shamali, soussi). Brotherhood structure. Historical slave trade context. Essaouira festival origins' },
  { source: 'Deborah Kapchan / Afropop Worldwide', detail: 'Ethnographic interviews. Seven colour descriptions. Spirit characters (Sidi Hamou, Lalla Mira, Sidi Mimoun). Incense associations. Lila ritual phases' },
  { source: 'Penn Museum / Expedition Magazine', detail: '"Moroccan Gnawa and Transglobal Trance." Spirit possession analysis. Mluk as "possessors" (malaka). Sidi Chamharouch as king of jnun. Somatic memories of slavery' },
  { source: 'Bandcamp Daily', detail: '"The Transcendental Sound of Moroccan Gnawa Music." Album guide. Mahmoud Guinia discography. Houssam Guinia as heir. Mokhtar Gania/Bill Laswell fusion' },
  { source: 'Mohammed Ennaji / Afropop Worldwide', detail: 'Historian interview. Gnawa origins in Guinea/West Africa. Integration patterns. 19th century documentation. Southern Morocco "slave parties" tradition' },
  { source: 'Dar Gnawa', detail: 'Guembri construction and symbolism. Maalem biographies (Guinia, Baqbou, Boussou, El Kasri, Hakmoun). Manufacturing process documentation' },
]

export const MAP_POINTS = [
  { name: 'Essaouira', lat: 31.5085, lng: -9.7595, label: 'Marsaoui school', detail: 'Guinia dynasty. Atlantic coast style. Guembri dominance.', color: '#6A4C93' },
  { name: 'Marrakech', lat: 31.6295, lng: -7.9811, label: 'Marrakchi school', detail: 'Baqbou lineage. Urban, percussive. Djemaa el-Fna origins.', color: '#6A4C93' },
  { name: 'Tangier', lat: 35.7595, lng: -5.8340, label: 'Northern school', detail: 'El Gourd, Stitou. Shamali influences. Jazz adjacency.', color: '#6A4C93' },
  { name: 'Casablanca', lat: 33.5731, lng: -7.5898, label: 'Urban base', detail: 'Boussou family. Ceremony over performance.', color: '#6A4C93' },
  { name: 'Rabat / Salé', lat: 34.0209, lng: -6.8416, label: 'Gnaoua Blues', detail: 'Bekkas, El Kasri. Bridge between styles.', color: '#6A4C93' },
  { name: 'Khamlia', lat: 31.0833, lng: -4.0000, label: 'Desert Gnawa', detail: 'Sub-Saharan origins preserved. Khamlia village near Erg Chebbi.', color: '#6A4C93' },
  { name: 'Agadir', lat: 30.4278, lng: -9.5981, label: 'Southern coast', detail: 'Soussi Gnawa. Berber-influenced traditions.', color: '#6A4C93' },
  { name: 'Meknès', lat: 33.8931, lng: -5.5547, label: 'Black Guard', detail: 'Moulay Ismail\'s 150,000 Abid al-Bukhari. Gnawa trace directly to this garrison.', color: '#6A4C93' },
]

// ── SOURCE KINGDOMS (trans-Saharan origins) ─────

export interface SourceKingdom {
  name: string
  modernCountry: string
  lat: number
  lng: number
  peoples: string
  era: string
  note: string
}

export const SOURCE_KINGDOMS: SourceKingdom[] = [
  { name: 'Kingdom of Ghana (Wagadou)', modernCountry: 'Mauritania/Mali', lat: 15.7, lng: -7.5, peoples: 'Soninke', era: '11th–13th c.', note: '"Gnawa" may derive from "Ghana" — the kingdom, not the modern country. The Almoravid conquest of 1076 intensified slave-taking from this region.' },
  { name: 'Djenné', modernCountry: 'Mali', lat: 13.91, lng: -4.55, peoples: 'Bambara, Fulani', era: '13th–17th c.', note: '"Gnawi" may be a deformation of "Jennawi" (from Djenné). One of the great slave markets of West Africa.' },
  { name: 'Timbuktu', modernCountry: 'Mali', lat: 16.77, lng: -3.01, peoples: 'Songhai, Bambara', era: '14th–16th c.', note: 'Caravan terminus. After Sultan Ahmed al-Mansur conquered the Songhai Empire in 1591, the flow of enslaved peoples to Morocco intensified dramatically.' },
  { name: 'Songhai Empire', modernCountry: 'Mali/Niger', lat: 14.5, lng: 1.5, peoples: 'Songhai, Hausa', era: '15th–16th c.', note: 'Morocco\'s 1591 conquest was a turning point. Thousands of captives were marched north. The Saadian dynasty depended on this labor and military power.' },
  { name: 'Hausaland', modernCountry: 'Nigeria/Niger', lat: 12.0, lng: 8.5, peoples: 'Hausa', era: '16th–19th c.', note: 'The Hausa Bori possession tradition is the closest parallel to Gnawa lila ceremonies. Both use music to invoke spirits. The connection may predate the slave trade.' },
  { name: 'Senegambia', modernCountry: 'Senegal/Gambia', lat: 14.5, lng: -15.5, peoples: 'Wolof, Mandinka', era: '11th–19th c.', note: 'Western terminus of the Sahel slave corridor. The griot tradition — hereditary musicians as keepers of history — parallels the Gnawa maalem lineage.' },
  { name: 'Bornu Empire', modernCountry: 'Nigeria/Chad', lat: 12.1, lng: 14.0, peoples: 'Kanuri', era: '16th–19th c.', note: 'Eastern source. Kanuri captives entered the Saharan trade routes. Stambali songs in Tunisia still contain Kanuri words.' },
]

// ── TRADE ROUTES ────────────────────────────────

export interface TradeRoute {
  name: string
  color: string
  era: string
  description: string
  coords: [number, number][]
}

export const TRADE_ROUTES: TradeRoute[] = [
  {
    name: 'Western Route (Ghana → Sijilmasa → Fes)',
    color: '#C17F28', era: '11th–16th c.',
    description: 'The oldest corridor. From the Ghana/Mali heartland through Oualata and Sijilmasa to the imperial cities of Morocco. 40–60 days across the Sahara.',
    coords: [[-7.5, 15.7], [-7.1, 17.5], [-6.5, 20.0], [-4.3, 25.5], [-4.1, 31.2], [-4.9, 34.0]],
  },
  {
    name: 'Timbuktu–Marrakech Route',
    color: '#C8A415', era: '14th–17th c.',
    description: 'The golden route. Timbuktu to Marrakech via Taghaza salt mines and the Draa Valley. Essaouira was called "the Port of Timbuktu."',
    coords: [[-3.0, 16.77], [-4.0, 19.5], [-5.5, 23.0], [-6.0, 27.0], [-6.8, 30.3], [-8.0, 31.63]],
  },
  {
    name: 'Songhai Conquest Route (1591)',
    color: '#722F37', era: '1591–1620s',
    description: 'After Ahmad al-Mansur\'s army conquered the Songhai Empire, thousands of captives were marched north. This single campaign permanently changed Morocco.',
    coords: [[1.5, 14.5], [-0.5, 16.0], [-3.0, 16.77], [-4.0, 19.5], [-5.0, 23.0], [-5.5, 27.5], [-6.5, 30.0], [-7.6, 31.6]],
  },
  {
    name: 'Central Saharan Route (Hausaland → Fezzan → Tripoli)',
    color: '#8B6E4E', era: '16th–19th c.',
    description: 'Eastern corridor feeding North Africa. Hausa captives passed through the Fezzan (Libya). Some redirected westward to Morocco. The Bori tradition is the closest parallel to Gnawa.',
    coords: [[8.5, 12.0], [10.0, 15.0], [13.0, 20.0], [14.0, 26.0], [13.1, 32.9]],
  },
]

// ── DIASPORA PARALLELS ──────────────────────────

export interface DiasporaTradition {
  name: string
  region: string
  spiritTerm: string
  possessionMetaphor: string
  leadInstrument: string
  colourSystem: boolean
  origin: string
  practitioners: string
  note: string
}

export const DIASPORA: DiasporaTradition[] = [
  { name: 'Gnawa', region: 'Morocco', spiritTerm: 'Mluk', possessionMetaphor: 'Spirit inhabits (meskun)', leadInstrument: 'Guembri (3-string lute)', colourSystem: true, origin: 'Trans-Saharan slave trade (Hausa, Songhai, Bambara)', practitioners: 'Widespread across Morocco', note: 'UNESCO Intangible Heritage 2019. Syncretised with Sufi Islam.' },
  { name: 'Stambali', region: 'Tunisia', spiritTerm: 'Mlouks', possessionMetaphor: 'Spirit welcomed into body', leadInstrument: 'Gumbri (nearly identical to guembri)', colourSystem: true, origin: 'Trans-Saharan slave trade (Hausa, Kanuri)', practitioners: 'Near extinction — one active house in Tunis', note: 'Songs still contain Hausa and Kanuri words. Directly descended from Bori.' },
  { name: 'Diwan', region: 'Algeria', spiritTerm: 'Mluk', possessionMetaphor: 'Possession trance', leadInstrument: 'Gumbri', colourSystem: true, origin: 'Trans-Saharan slave trade', practitioners: 'Active but less documented than Gnawa', note: 'Also called derdeba, "the Seven Springs."' },
  { name: 'Bori', region: 'Nigeria / Niger', spiritTerm: 'Iskoki / Aljanu', possessionMetaphor: 'Doki (horse) / Godiya (mare)', leadInstrument: 'Goge (1-string fiddle)', colourSystem: true, origin: 'Pre-Islamic Hausa religion', practitioners: 'Suppressed after 1804 Sokoto jihad; survives in rural areas', note: 'Closest structural parallel. Possessed are "horses," attendants are "grooms." May be the direct ancestor of Gnawa.' },
  { name: 'Vodou', region: 'Haiti', spiritTerm: 'Lwa', possessionMetaphor: 'Chwal (horse) — lwa "mounts" and "rides"', leadInstrument: 'Three sacred drums (Manman, Segon, Boula)', colourSystem: true, origin: 'Atlantic slave trade (Fon, Kongo, Yoruba)', practitioners: '~8 million (Haiti + diaspora)', note: 'Central to Haitian identity. Bois Caïman ceremony (1791) sparked largest successful slave revolt in history.' },
  { name: 'Candomblé', region: 'Brazil', spiritTerm: 'Orixás', possessionMetaphor: 'Cavalo (horse) — orixá "descends" into devotee', leadInstrument: 'Three atabaque drums (Rum, Rumpi, Lé)', colourSystem: true, origin: 'Atlantic slave trade (Yoruba, Fon, Kongo, Bantu)', practitioners: '~3 million (Brazil + South America)', note: 'Largest Afro-diasporic religion in South America. Syncretised with Catholic saints.' },
  { name: 'Santería / Lucumí', region: 'Cuba', spiritTerm: 'Orishas', possessionMetaphor: 'Orisha "mounts" the devotee', leadInstrument: 'Batá drums (sacred, double-headed)', colourSystem: true, origin: 'Atlantic slave trade (Yoruba)', practitioners: 'Widespread in Cuba + US diaspora', note: 'Obatalá = white, Changó = red, Yemayá = blue. Same Yoruba pantheon as Candomblé.' },
]
