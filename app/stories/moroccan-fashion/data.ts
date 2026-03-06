// ─────────────────────────────────────────────────
// Moroccan Fashion Intelligence
// Module 078 — Cultural & Design Intelligence
// ─────────────────────────────────────────────────

export interface Garment {
  name: string
  arabic: string
  origin: string
  gender: string
  detail: string
  keyFeature: string
}

export const GARMENTS: Garment[] = [
  { name: 'Caftan', arabic: 'قفطان', origin: 'Ottoman via Andalusia, 15th–16th C', gender: 'Originally unisex, now primarily women', detail: 'One-piece tunic. Central opening. Sfifa braid trim. Aakad cherry-shaped buttons. Rich fabrics — silk, velvet, brocade. Each city has its own style: Fassi, Rbati, Tetouani. UNESCO Intangible Cultural Heritage since December 2025. Originally royal attire under the Marinids. Democratised across classes over centuries. The garment a bride wears two to eleven times in one wedding.', keyFeature: 'Central opening with sfifa and aakad' },
  { name: 'Takchita', arabic: 'تكشيطة', origin: 'Saadian dynasty, 16th C', gender: 'Women', detail: 'Two-piece caftan. Inner layer (tahtiya) plus transparent outer layer (dfina). Invented under Sultan Ahmad al-Mansur — hence "Mansouria." Heavier handwork, more ornate, more formal. Worn exclusively for grand celebrations. The bride\'s garment above all others. Preparation begins months before the wedding. Each year, new fabrics and patterns trend. The classic styles remain timeless.', keyFeature: 'Two layers — the Mansouria overlay' },
  { name: 'Djellaba', arabic: 'جلابة', origin: 'Amazigh (Berber), pre-Islamic', gender: 'Unisex', detail: 'Long hooded robe. Pointed hood (qob) protects from sun, wind, sand, snow. Wool for winter. Cotton for summer. The qob doubles as a pocket — fits loaves of bread. Originally men only. Women adopted it during the French Protectorate, replacing the haik. Berber marital status once readable from djellaba colour. The King of Morocco\'s djellaba choices set trends for the coming year.', keyFeature: 'The qob — pointed hood' },
  { name: 'Babouche', arabic: 'بابوش / بلغة', origin: 'Persian papush — "foot cover," 14th C Fez', gender: 'Unisex — balgha (men), cherbil (women)', detail: 'Heelless leather slipper. Handmade by mâalem craftsmen. Pointed toe (Arab/urban Fassi) or rounded toe (Amazigh/Berber). Vegetable-tanned leather from Fez and Marrakech tanneries. Canary yellow decreed by Moulay Ismail for Muslims (1672–1727); black reserved for Jewish Moroccans. Celine\'s 2016 Resort collection made it globally fashionable. Phoebe Philo called it the year\'s "it" shoe.', keyFeature: 'Heelless, open-back, pointed or rounded toe' },
  { name: 'Gandoura', arabic: 'غندورة', origin: 'North African, pre-Islamic', gender: 'Unisex', detail: 'Sleeveless tunic. Lighter and simpler than the djellaba. No hood. Worn in warm weather or indoors. Often embroidered at neckline and chest. The everyday garment under the caftan or djellaba. In rural Morocco, some men wear only a gandoura at home.', keyFeature: 'No hood, no sleeves — pure simplicity' },
  { name: 'Selham', arabic: 'سلهام', origin: 'Berber burnous tradition', gender: 'Primarily men', detail: 'Long hooded cape. No sleeves. Closes at the chest with a tassel. Braided decoration from hood to front. Worn over djellaba or gandoura. Associated with nobility and religious authority. Imams wear white selham over white djellaba for Friday khutba. The Moroccan cloak.', keyFeature: 'Cape — no sleeves, tassel closure' },
]

export interface EmbroideryStyle {
  name: string
  arabic: string
  city: string
  character: string
}

export const EMBROIDERY_STYLES: EmbroideryStyle[] = [
  { name: 'Tarz El Fassi', arabic: 'الطرز الفاسي', city: 'Fez', character: 'Monochromatic, geometric, reversible. Both sides identical. Blue or white thread on white fabric. Mathematical precision.' },
  { name: 'Tarz El Tetouani', arabic: 'الطرز التطواني', city: 'Tetouan', character: 'Multicolour, floral, dramatic. Andalusian influence unmistakable. Bold colour combinations. Visible, theatrical, expressive. ' },
  { name: 'Tarz El Rbati', arabic: 'الطرز الرباطي', city: 'Rabat', character: 'Modern, elegant, geometric but less rigid than Fassi. Restrained colour palette. Historically the capital\'s fashion — diplomatic, measured, beautiful.' },
  { name: 'Tarz l\'Ghorza', arabic: 'الطرز الغرزة', city: 'Various', character: 'Cross-stitch embroidery. Foundation technique. Each region adds its own vocabulary of patterns and motifs.' },
  { name: 'Tarz l\'Fetla', arabic: 'الطرز الفتلة', city: 'Various', character: 'Gold and silver thread embroidery. Used for bridal caftans. Metallic threads catch candlelight at ceremonies.' },
]

export interface CraftComponent {
  name: string
  arabic: string
  detail: string
}

export const CRAFT_COMPONENTS: CraftComponent[] = [
  { name: 'Sfifa', arabic: 'سفيفة', detail: 'Decorative silk or gold braid trim running down the caftan\'s front. Hand-braided. Ranges from pure gold to silver to multicoloured combinations.  Intentional enchantment.' },
  { name: 'Aakad', arabic: 'لعقاد', detail: 'Cherry-shaped handmade buttons and buttonholes (aayoun). Run vertically down the caftan\'s front closure. Among the most labour-intensive components. Each button hand-knotted. Irregular buttons signal authenticity — machine-made versions look too perfect.' },
  { name: 'Mdamma', arabic: 'مضمة', detail: 'Wide ornate belt worn with the caftan. Historically significant in dowries. Gold or silver thread. Cinching the caftan at the waist transforms it from robe to gown.' },
  { name: 'Chmar', arabic: 'شمار', detail: 'Traditional jewel piece used to roll up caftan sleeves. Functional and decorative. Featured in Casablanca brand\'s FW23 Paris show — designed by Dihyan\'s Youssra Nichane. The detail that caught Naomi Campbell\'s eye.' },
]

export interface Designer {
  name: string
  base: string
  note: string
  milestone: string
}

export const DESIGNERS: Designer[] = [
  { name: 'Charaf Tajer / Casablanca', base: 'Paris', note: 'Franco-Moroccan. Former nightlife entrepreneur. Founded 2018. Après-sport luxury. Silk shirts, terry cloth tracksuits. Collabs with New Balance, Bvlgari. Named for the city that is "an Arab city with a Spanish name in an old French colony."', milestone: 'Paris Fashion Week regular since 2020' },
  { name: 'Noureddine Amir', base: 'Morocco / Paris', note: 'Born Rabat 1967. Esmod Casablanca graduate. Worked with Shirin Neshat in New York. First Moroccan on the official Paris Haute Couture calendar. Pierre Berg&eacute; spotted him at Institut du Monde Arabe 2014. Exhibited at YSL Museum Marrakech 2018. Sculpts garments from Amazigh inspiration using raffia, clay, unconventional materials.', milestone: 'Paris Haute Couture calendar, July 2018' },
  { name: 'Siham Sara Chraibi', base: 'Morocco / Paris', note: 'Second Moroccan fashion house on the Haute Couture calendar. January 2023: 25 outfits — fringes, checkered patterns, pearl breastplates, velvet pants, oversized capes.', milestone: 'Paris Haute Couture, January 2023' },
  { name: 'Artsi Ifrach / Maison ARTC', base: 'Marrakech', note: 'Self-taught. Former ballet dancer from Jerusalem. Repurposes vintage garments. One-of-a-kind pieces from flea market fabrics and family heirlooms. Fashion as emotion, not commerce.', milestone: 'FTA Awards winner 2022' },
  { name: 'Amine Bendriouich', base: 'Morocco', note: 'Moroccan heritage meets urban streetwear. Unisex designs. Bold storytelling. Collaborates with musicians and cultural movements. Paris, New York, London.', milestone: 'OpenMyMed Prize 2017' },
  { name: 'Zineb Britel / Zyne', base: 'Morocco / Paris', note: 'Reimagines the babouche. Esmod Paris and Central Saint Martins trained. Supports women artisans through cooperative craftsmanship. The babouche as luxury object.', milestone: 'Fashion Trust Arabia First Prize 2019' },
  { name: 'Youssra Nichane / Dihyan', base: 'Morocco', note: 'Jewelry brand founded 2020. Finalist at Fashion Trust Arabia Doha. Created seven looks for Casablanca\'s FW23 Paris show — handcrafted pieces rooted in Moroccan heritage. The chmar that opened the show.', milestone: 'Casablanca × Dihyan collab, Paris FW23' },
  { name: 'Karim Adduchi', base: 'Amsterdam / Paris', note: 'Illustrator and designer blending Arab and Western cultures. Opened Amsterdam Fashion Week. Supports migrant artisans through World Makers Foundation.', milestone: 'Forbes recognition, Amsterdam Culture Business Award' },
]

export interface HistoryEvent {
  year: string
  event: string
  thread: 'origin' | 'royal' | 'craft' | 'global' | 'recognition'
}

export const HISTORY: HistoryEvent[] = [
  { year: 'Pre-Islamic', event: 'Amazigh Berber communities craft loose-fitting garments from wool and cotton. The djellaba emerges in the mountains. Simple, functional, climate-responsive. Neutral colours — white signifying purity and good fortune.', thread: 'origin' },
  { year: '12th–13th C', event: 'Almohad period. Caliph Abu Hafs Umar al-Murtada depicted in an embroidered caftan in Las Cantigas de Santa Maria manuscript (El Escorial Museum, Madrid). Fez census counts 3,490 weaving workshops and over 3,000 weavers.', thread: 'royal' },
  { year: 'c. 14th C', event: 'Babouche production established in Fez. Marinid dynasty. The caftan — first documented in this period — is worn exclusively by royalty. Commoners cannot afford the fabric or the craftsmanship.', thread: 'craft' },
  { year: '1492', event: 'Fall of Granada. Andalusian refugees settle in Tetouan, Fez, Chefchaouen, Rabat, Salé. They bring refined embroidery techniques, floral patterns, and multicolour aesthetics that transform Moroccan textile craft.', thread: 'origin' },
  { year: '16th C', event: 'Sultan Ahmad al-Mansur introduces the Mansouria — a transparent overlay worn above the traditional caftan. Origin of the two-piece takchita. Women begin wearing caftans under the Saadians. Male versions shift to English-imported "brown blues" fabric.', thread: 'royal' },
  { year: '1672–1727', event: 'Moulay Ismail decrees canary-yellow babouches for Muslims, bans black babouches for non-Jewish Moroccans. Jewish artisans distinguish their work with a small heel and thicker sole.', thread: 'royal' },
  { year: '1912–1956', event: 'French Protectorate. Moroccan women adopt the djellaba — previously male-only — as a symbol of modesty and identity, replacing the haik. Fashion becomes quietly political.', thread: 'origin' },
  { year: '1966', event: 'Yves Saint Laurent visits Marrakech for the first time. Begins collecting Moroccan caftans. His collections draw from Moroccan motifs, colours, and silhouettes for decades. The caftan enters global haute couture vocabulary.', thread: 'global' },
  { year: '1996', event: 'First Caftan du Maroc fashion show. Annual event showcasing Moroccan designers. The caftan is no longer only ceremonial — it is a runway garment.', thread: 'global' },
  { year: '2016', event: 'Phoebe Philo\'s Celine Resort collection features the babouche silhouette. Vogue declares the Moroccan slipper the "it" shoe. Global fashion discovers what Moroccans have worn for 600 years.', thread: 'global' },
  { year: '2018', event: 'Noureddine Amir becomes first Moroccan on Paris Haute Couture calendar. Same year: Charaf Tajer founds Casablanca brand. Moroccan fashion enters Paris from two directions — haute couture and luxury streetwear.', thread: 'global' },
  { year: '2022', event: 'ICESCO inscribes the Moroccan caftan and Fez brocade on the Islamic World Heritage List. Morocco also registers the caftan with WIPO (World Intellectual Property Organization) — legal protection until 2035.', thread: 'recognition' },
  { year: 'Dec 2025', event: 'UNESCO inscribes "Moroccan Caftan: Art, Traditions and Skills" on the Representative List of Intangible Cultural Heritage of Humanity. 20th session, New Delhi. Eight centuries of craft, globally recognised. Algeria\'s rival claims rejected.', thread: 'recognition' },
]

export interface IndustryFact {
  value: string
  unit: string
  note: string
}

export const INDUSTRY: IndustryFact[] = [
  { value: '$4.25B', unit: 'textile exports (2022)', note: 'Record 44 billion MAD. Europe\'s 8th-largest textile supplier. Africa\'s largest apparel exporter to the EU. Zara and Mango source here. Spain receives 61% of clothing exports.' },
  { value: '200,000+', unit: 'direct employees', note: '60% women. The textile sector is Morocco\'s largest industrial employer. 1,600+ factories. An additional estimated 200,000 work informally.' },
  { value: '15%', unit: 'of industrial GDP', note: 'Textiles contribute more to industrial GDP than any sector except phosphates. Fast fashion: 52%. Technical textiles: 17%. Denim: 11%. Home textiles: 7%.' },
  { value: '2.3M', unit: 'artisans', note: 'The caftan ecosystem alone — weavers, tailors, sfifa makers, aakad button makers, embroiderers, apprentices — sustains a vast employment network. 7% of GDP from handicrafts.' },
  { value: '$6B', unit: 'export target by 2035', note: 'Government roadmap: two 100-hectare textile eco-parks in Casablanca and Tangier. 60% of production dedicated to co-contracting and finished products (currently 35%). Hemp as new sustainable textile.' },
  { value: '<1 hour', unit: 'Tanger Med customs clearance', note: 'Port lies under 9 miles from Europe. Dedicated textile corridor. The proximity advantage: Morocco can deliver in days, not weeks. Fashion cycles shorten; Morocco responds fastest.' },
]

export const HERO_STATS = [
  { value: '800+', label: 'Years of caftan tradition' },
  { value: '6', label: 'Core traditional garments' },
  { value: 'UNESCO', label: 'Intangible Heritage, 2025' },
  { value: '$4.25B', label: 'Textile exports' },
]

export const KEY_NUMBERS = [
  { value: '3,490', unit: 'weaving workshops', note: 'Counted in Fez alone during the Almohad period (12th–13th C). Over 3,000 weavers. A city whose economy ran on thread.' },
  { value: '2–11', unit: 'caftans per bride', note: 'A Moroccan bride wears between two and eleven caftans during her wedding celebrations. Each distinct in colour, fabric, and embroidery. The guests anticipate every change.' },
  { value: '3', unit: 'regional embroidery schools', note: 'Fassi (geometric, monochromatic, reversible), Tetouani (floral, multicolour, Andalusian), Rbati (modern, elegant, restrained). Three cities. Three visual languages. One garment.' },
  { value: '1,000+', unit: 'women artisans in cooperatives', note: 'Babouche production now supported by women-led cooperatives in Fez and Marrakech. Fair-trade exports. Craft preservation through economic empowerment.' },
  { value: '2035', unit: 'WIPO protection', note: 'Moroccan caftan registered with the World Intellectual Property Organization. Legal protection renewable. The garment has a patent.' },
  { value: '0', unit: 'machines for sfifa', note: 'Sfifa braid and aakad buttons remain entirely hand-knotted. No industrial substitute exists. The irregularity of handwork is the marker of authenticity.' },
]

export interface BibliographyEntry {
  author: string
  title: string
  year: string
  detail: string
}

export const BIBLIOGRAPHY: BibliographyEntry[] = [
  { author: 'Alaoui, Rachida', title: 'The Moroccan Caftan: A Cultural and Aesthetic History', year: '2010', detail: 'Art historian tracing the caftan from Almohad court dress through Saadian innovation to contemporary haute couture. Documents regional styles, fabric traditions, and the garment\'s transformation from royal privilege to national symbol.' },
  { author: 'Spring, Christopher & Hudson, Julie', title: 'North Africa: Textiles', year: '1995', detail: 'V&A Museum. Comprehensive survey of North African textile traditions. Moroccan embroidery, weaving techniques, and garment construction documented through museum collections.' },
  { author: 'Becker, Cynthia', title: 'Amazigh Arts in Morocco: Women Shaping Berber Identity', year: '2006', detail: 'University of Texas Press. Documents the role of Amazigh women as textile producers. Weaving, dyeing, and embroidery as identity practice. The politics of pattern.' },
  { author: 'Ramirez, Francis & Rolot, Christian', title: 'Tapis et Tissages du Maroc', year: '1995', detail: 'ACR Édition. Though primarily on carpets, documents the broader Moroccan textile vocabulary — dyes, looms, fibres — that underpins garment production.' },
  { author: 'Jereb, James', title: 'Arts and Crafts of Morocco', year: '1995', detail: 'Thames & Hudson. Comprehensive visual documentation of Moroccan craft traditions including embroidery, leatherwork, and weaving techniques essential to garment production.' },
  { author: 'UNESCO / Morocco', title: 'Moroccan Caftan: Art, Traditions and Skills — Nomination File', year: '2025', detail: 'Submitted by Ministry of Youth, Culture and Communication. The definitive inventory: regional styles, terminology, craft components, historical documentation from Las Cantigas manuscript to contemporary runway. The file that earned inscription.' },
]
