// ─────────────────────────────────────────────────
// The Moroccan Wedding — A Multi-Day Atlas
// Module 048 — Event Intelligence
// Sources: Field documentation, cultural ethnography,
// Moroccan wedding planners, TelQuel, Reddit surveys
// ─────────────────────────────────────────────────

export interface CeremonyStage {
  id: string
  day: string
  name: string
  nameAr: string
  duration: string
  description: string
  details: string[]
  color: string
}

export const CEREMONY: CeremonyStage[] = [
  { id: 'khotba', day: 'Weeks–months before', name: 'The Khotba', nameAr: 'الخطبة', duration: 'One evening', color: '#7B506F',
    description: 'The formal engagement. The groom\'s family visits the bride\'s family to ask for her hand. Both families negotiate the dowry (sadaq), wedding date, budget, guest count, and venue.',
    details: ['Families agree on dowry amount', 'Wedding date set (often astrologically considered)', 'Budget and guest list negotiated', 'Relationship formalized — planning begins'] },
  { id: 'hammam', day: 'Day 1 (2–3 days before)', name: 'The Hammam', nameAr: 'الحمام', duration: 'Half day', color: '#EC4899',
    description: 'The bridal purification. The bride, accompanied by female relatives and friends, visits a traditional hammam for a ritual cleansing — scrubbing, massage, milk bath. Symbolizes the bride\'s transformation.',
    details: ['Milk bath (symbolizes purity)', 'Gommage (exfoliation with black soap)', 'Ghassoul clay treatment', 'Traditional songs and ululations', 'Bride wears Turkish-style hammam attire'] },
  { id: 'henna', day: 'Day 2 (Eve of wedding)', name: 'Laylat Al Henna', nameAr: 'ليلة الحناء', duration: 'Full evening', color: '#5C7C3E',
    description: 'Henna Night.  A nekkasha applies intricate henna designs to the bride\'s hands and feet. The bride wears a green and gold caftan. Guests also receive henna.',
    details: ['Bride in green & gold caftan (fertility, prosperity)', 'Nekkasha (henna artist) applies designs — 2–4 hours', 'Geometric and floral motifs symbolize protection and fertility', 'Darker henna = more auspicious future', 'Music, dancing, singing throughout', 'Female-only gathering (traditionally)'] },
  { id: 'hdiyya', day: 'Day 2 (after henna)', name: 'The Hdiyya', nameAr: 'الهدية', duration: 'Evening', color: '#F59E0B',
    description: 'The gift ceremony. The groom\'s family presents the bride with gifts in decorative trays (taifours): caftans, jewelry, perfume, sugar (happiness), milk (purity), sweets.',
    details: ['Gifts on taifours (copper/silver decorative trays)', 'Sugar = happiness', 'Milk = purity', 'Caftans for the wedding day', 'Jewelry from groom\'s family', 'Represents respect and generosity of groom\'s family'] },
  { id: 'kaghet', day: 'Day 3 (Wedding day)', name: 'Al Kaghet', nameAr: 'الكاغيط', duration: '30 minutes', color: '#2D5F8A',
    description: 'The contract signing. An adoul (Islamic legal official) drafts and formalizes the marriage contract. Includes the dowry amount and terms. Signed by both spouses with close family only. Private, intimate.',
    details: ['Adoul drafts the marriage contract', 'Dowry (sadaq) amount recorded', 'Signed by bride, groom, and witnesses', 'Close family only — small committee', 'Legally binding under Moroccan family law (Moudawana)'] },
  { id: 'wedding', day: 'Day 3 (Evening)', name: 'The Wedding Night', nameAr: 'ليلة العرس', duration: '6–10 hours (9 PM – dawn)', color: '#A0452E',
    description: 'The main event. Hundreds of guests. The bride changes outfits up to 7 times. The couple enters on the amariya (throne chair). Orchestra, dakka marrakchia, feast, dancing until dawn.',
    details: ['Guests arrive ~9 PM. Mint tea, fakia (dried fruit), petit fours', 'Bride enters ~11 PM on the Amariya (throne chair)', 'Both bride and groom carried on Amariya twice', 'Bride changes 5–7 outfits through the night', 'Groom enters in jabador (1st), then djellaba (2nd)', 'Multi-course banquet: pastilla, tagine, mechoui, couscous', 'Orchestra (l\'jouq) + secondary band (dakka / issawa)', 'Dancing, ululations, clapping circles', 'Celebration continues until 3–5 AM'] },
  { id: 'dfou3', day: 'Day 4 (Following day)', name: 'The Dfou3', nameAr: 'الدفوع', duration: 'Morning/afternoon', color: '#78716C',
    description: 'The day after. Family meal with both families. The bride is now officially part of the groom\'s family. Quieter, intimate. Some regions celebrate with additional music and food.',
    details: ['Family brunch/lunch', 'Bride welcomed into groom\'s household', 'Gifts may continue', 'Regional variations — some areas add a 2nd night of celebration'] },
]

export interface BridalOutfit {
  name: string
  nameAr: string
  region: string
  description: string
  color: string
}

export const BRIDAL_OUTFITS: BridalOutfit[] = [
  { name: 'Takchita', nameAr: 'تكشيطة', region: 'National', description: 'Two-piece silky dress with wide embroidered belt (mdamma). White or gold. The entrance outfit — worn on the Amariya.', color: '#C8A415' },
  { name: 'Fassiya', nameAr: 'الفاسية', region: 'Fes', description: 'Fes-style kaftan. Heavy brocade, rich gold embroidery. Often accompanied by a jeweled crown (taj).', color: '#7B506F' },
  { name: 'R\'batiya', nameAr: 'الرباطية', region: 'Rabat', description: 'Rabat tradition. Often blue. Lighter, more flowing silhouette than the Fassiya.', color: '#2D5F8A' },
  { name: 'Sahrawiya', nameAr: 'الصحراوية', region: 'Sahara', description: 'Saharan draped fabric. Indigo or white melhfa. Simpler but striking.', color: '#C17F28' },
  { name: 'Soussia', nameAr: 'السوسية', region: 'Souss (Amazigh)', description: 'Berber costume from the Souss region. Heavy silver jewelry (fibules, khalkhal), colorful fabrics.', color: '#5C7C3E' },
  { name: 'Mejdoub', nameAr: 'المجدوب', region: 'National', description: 'The golden caftan. Opulent, fully embroidered in gold thread. Often the most expensive outfit worn.', color: '#C8A415' },
  { name: 'White Dress', nameAr: 'الفستان الأبيض', region: 'Modern', description: 'Western-style white wedding gown. Often the final outfit of the night, blending traditions.', color: '#D4D4D4' },
]

export interface KeyRole {
  role: string
  roleAr: string
  description: string
}

export const KEY_ROLES: KeyRole[] = [
  { role: 'Negafa', roleAr: 'النگافة', description: 'The master wedding coordinator. Manages the bride\'s outfits, hair, makeup, and all ceremony transitions. Up to 4 assistants. The wedding cannot happen without her.' },
  { role: 'Nekkasha', roleAr: 'النقاشة', description: 'The henna artist. Applies intricate designs to the bride\'s hands and feet during Laylat Al Henna. Quality henna selection and design expertise.' },
  { role: 'Adoul', roleAr: 'العدول', description: 'Islamic legal official who drafts and formalizes the marriage contract (al kaghet). Records the dowry and terms.' },
  { role: 'Amariya Bearers', roleAr: 'حاملو العمارية', description: '4–6 men who carry the throne chair. Often hired as part of the negafa\'s team. Parade the couple around the hall.' },
  { role: 'L\'Jouq', roleAr: 'الجوق', description: 'The main orchestra. Traditional instruments: oud, qanun, darbuka, violin. Plays chaabi, Andalusi, and sharqi music all night.' },
  { role: 'Dakka Marrakchia', roleAr: 'دقة مراكشية', description: 'Secondary percussion band from Marrakech. Drum-heavy, hypnotic rhythms. Some regions use Issawa or Gnawa instead.' },
]

export interface RegionalVariation {
  region: string
  note: string
  color: string
}

export const REGIONAL: RegionalVariation[] = [
  { region: 'Fes', note: ' Heavy gold brocade. Andalusi music. The bride\'s Fassiya outfit is a centerpiece. Families often compete on the opulence of the negafa.', color: '#7B506F' },
  { region: 'Marrakech', note: 'Dakka Marrakchia percussion is the heartbeat. Red and gold color palette. Riads and palaces as venues. Gnawa musicians sometimes join.', color: '#A0452E' },
  { region: 'Amazigh (Atlas)', note: 'Multi-day outdoor celebration. Ahidous group dancing. The bride wears heavy silver jewelry, not gold. Community-wide participation. Less formalized than urban weddings.', color: '#5C7C3E' },
  { region: 'Sahara', note: 'Melhfa draped fabric. Camel procession possible. Tent celebrations. Hassani music. Simpler but longer — can stretch a full week in some communities.', color: '#C17F28' },
  { region: 'Rif (North)', note: 'Amazigh Rif traditions. The bride\'s face is sometimes painted with saffron. Izran (Rif poetry) chanted. Silver and amber jewelry. Less gold, more earth tones.', color: '#78716C' },
  { region: 'Jewish Moroccan', note: 'Shared henna tradition (the Hina). Mikveh replaces hammam. No fasting before ceremony. Ketubah signed under chuppah. Bride and groom join guests immediately — no Yichud.', color: '#2D5F8A' },
]

export interface CostItem {
  item: string
  range: string
  note: string
}

export const COST_BREAKDOWN: CostItem[] = [
  { item: 'Venue', range: '$2,000–$15,000', note: 'Riad, hotel ballroom, or garden. Marrakech premium.' },
  { item: 'Catering', range: '$30–$100/guest', note: 'Traditional Moroccan: ~$40–60/person for 3 courses + sweets' },
  { item: 'Negafa + team', range: '$2,000–$5,000', note: 'Includes outfit styling, hair, makeup, transitions, assistants' },
  { item: 'Bridal outfits', range: '$2,000–$8,000+', note: '5–7 outfit changes. Rental or custom. Takchita + Mejdoub most expensive.' },
  { item: 'Orchestra', range: '$2,000–$6,000', note: 'Main jouq + secondary band (dakka/issawa). 6–10 hour performance.' },
  { item: 'Photography', range: '$2,000–$4,000', note: '2 photographers typical. Photo + video package.' },
  { item: 'Henna artist', range: '$300–$800', note: 'Nekkasha for bride + guest applications' },
  { item: 'Décor + Amariya', range: '$1,000–$5,000', note: 'Throne, chair, lanterns, floral. Zellige-style setups.' },
  { item: 'Misc', range: '$1,000–$3,000', note: 'Invitations, transport, favors, DJ, lighting' },
]

export const HERO_STATS = [
  { value: '3–7', label: 'Days of celebration' },
  { value: '7', label: 'Bridal outfit changes' },
  { value: '300–500', label: 'Average guests' },
  { value: '~$15–50K', label: 'Typical total cost' },
]

export const WEDDING_MENU = [
  { course: 'Welcome', items: 'Mint tea, fakia (dried fruit), petit fours, gazelle horns, chebakia' },
  { course: 'Starter', items: 'Pastilla (sweet-savory phyllo pie with pigeon or chicken, almonds, cinnamon)' },
  { course: 'Main 1', items: 'Tagine — lamb with prunes & almonds, or chicken with preserved lemon & olives' },
  { course: 'Main 2', items: 'Mechoui — whole roasted lamb, slow-cooked for hours, carved at the table' },
  { course: 'Main 3', items: 'Couscous — seven vegetable couscous or tfaya (caramelized onion & raisin)' },
  { course: 'Dessert', items: 'Fresh fruit, Moroccan pastries, almond briouats, milk pastilla with orange blossom' },
]
