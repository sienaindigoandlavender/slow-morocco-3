// ─────────────────────────────────────────────────
// Couscous Friday
// Module 080 — Culinary & Social Intelligence
// ─────────────────────────────────────────────────

export interface Variation {
  name: string
  arabic: string
  region: string
  detail: string
  keyIngredient: string
}

export const VARIATIONS: Variation[] = [
  { name: 'Couscous Bidaoui', arabic: 'كسكس بيضاوي', region: 'Casablanca', detail: 'The seven-vegetable couscous — Morocco\'s most popular version. Carrot, turnip, courgette, pumpkin, cabbage, potato, chickpeas. Turmeric-ginger broth. Often topped with tfaya (caramelised onion and raisin confit). The Friday standard.', keyIngredient: 'Seven vegetables + tfaya' },
  { name: 'Couscous b\'l\'Tfaya', arabic: 'كسكس بالتفاية', region: 'Fez / Rabat', detail: 'Slow-cooked lamb or chicken beneath a dome of couscous, crowned with caramelised onions, raisins, cinnamon, ginger, saffron, and sometimes orange flower water. T\'faya dates to the Almoravid period — Ibn Rushd called it the most balanced way of cooking meat. Fez distinguishes between t\'faya souiria (Essaouira-style) and t\'faya twimiya (with almonds and chickpeas).', keyIngredient: 'Caramelised onion-raisin confit' },
  { name: 'Seffa Medfouna', arabic: 'سفة مدفونة', region: 'Nationwide — weddings', detail: 'Sweet couscous. Steamed semolina layered with butter, powdered sugar, cinnamon, and roasted almonds. Chicken or pigeon "buried" (medfouna) inside. Served at weddings between courses as a palate cleanser. The meatless version is historically linked to Jewish communities, who could not mix meat and dairy. Seffa can also be made with vermicelli noodles.', keyIngredient: 'Sugar, cinnamon, almonds — the sweet version' },
  { name: 'Couscous Belboula', arabic: 'كسكس بلبولة', region: 'Atlas Mountains / Amazigh regions', detail: 'Barley couscous. Larger, darker grains than durum wheat. Preferred in mountain communities where barley grows better than wheat. Heavier texture, earthier flavour. Increasingly popular in cities as a health-conscious alternative. The original Amazigh grain — couscous probably began with barley, not wheat.', keyIngredient: 'Barley (belboula) instead of semolina' },
  { name: 'Saykouk', arabic: 'سيكوك', region: 'Nationwide — summer', detail: 'Cold buttermilk couscous. Steamed semolina cooled and topped with cold lben (buttermilk), sweetened with sugar. Summer variation. No meat, no broth, no heat. Refreshing, simple, a different experience from the Friday standard.', keyIngredient: 'Cold lben (buttermilk) + sugar' },
  { name: 'Couscous b\'l\'Hout', arabic: 'كسكس بالحوت', region: 'Essaouira / Atlantic coast', detail: 'Fish couscous. Atlantic catch — often sea bass, conger eel, or mixed seafood — cooked in a spiced tomato broth with potatoes and peppers. Coastal families serve this on Fridays instead of the inland meat version. Essaouira\'s signature.', keyIngredient: 'Fresh Atlantic fish' },
  { name: 'Couscous with Gueddid', arabic: 'كسكس بالكديد', region: 'Nationwide — post-Eid al-Adha', detail: 'Made with gueddid — dried, salted, sun-cured meat preserved after the Eid sacrifice. Intensely savoury, seasonal. Families prepare gueddid in the days following the sacrifice, then use it for weeks in couscous and other dishes.', keyIngredient: 'Gueddid — dried Eid meat' },
]

export interface Technique {
  step: number
  name: string
  arabic: string
  detail: string
  duration: string
}

export const TECHNIQUE: Technique[] = [
  { step: 1, name: 'Roll the grain', arabic: 'فتل', detail: 'Semolina is moistened with salted water and rolled by hand in a gsaa (wide, shallow clay dish). Fingers rake the grains, forming small, uniform spheres. This step requires years of practice — the texture must be perfect. Too wet and the grains clump; too dry and they stay powder. Dusted with flour between passes. The dying art.', duration: '30–45 min' },
  { step: 2, name: 'First steam', arabic: 'التبخير الأول', detail: 'Grains placed in the upper basket (kiskas) of the couscoussier. No lid — steam must pass through freely. The base pot holds the simmering broth, meat, and vegetables. Grains absorb flavours from below. When steam rises visibly through the couscous, it\'s done.', duration: '20–30 min' },
  { step: 3, name: 'Break and oil', arabic: 'التفتيل', detail: 'Return couscous to the gsaa. Break up clumps by hand. Drizzle with olive oil and water. Rake again. Season with salt. The grains must remain individual — never a mass. This separates a good couscous from a great one.', duration: '10 min' },
  { step: 4, name: 'Second steam', arabic: 'التبخير الثاني', detail: 'Back into the kiskas for a second steaming. More flavour absorption. Grains swell further. The broth below is now rich and concentrated. Vegetables are added to the broth at intervals based on cooking time — root vegetables first, soft vegetables last.', duration: '20–30 min' },
  { step: 5, name: 'Break and butter', arabic: 'التفتيل بالزبدة', detail: 'Remove again. Break up clumps. Work in butter (or smen — aged, clarified butter). More salt if needed. Some families do a third steam for maximum fluffiness. Each grain should be separate, tender, light — never gummy, never gritty.', duration: '10 min' },
  { step: 6, name: 'Serve', arabic: 'التقديم', detail: 'Mound couscous on a communal platter. Arrange meat at the centre. Crown with vegetables. Ladle broth over everything. Add tfaya if making that variation. Serve with small bowls of extra broth and glasses of cold lben (buttermilk) on the side. Everyone eats from the same dish.', duration: 'The rest of Friday' },
]

export interface Ritual {
  moment: string
  detail: string
}

export const FRIDAY_RITUAL: Ritual[] = [
  { moment: 'Morning', detail: 'Market run. Butchers are busiest — families select cuts of lamb, beef, or chicken. Vendors display seasonal vegetables. The Friday market has a different energy to any other day.' },
  { moment: 'Late morning', detail: 'Preparation begins. Rolling the grain. Cutting vegetables. Simmering broth. Multiple family members in the kitchen — grandmother teaching technique, children washing vegetables. The communal labour before the communal meal.' },
  { moment: 'Noon', detail: 'Dhuhr prayer + Jumu\'ah (Friday congregational prayer). Streets empty. Mosques fill. The adhan echoes. Schools give afternoon off. Many businesses close for hours.' },
  { moment: 'After prayer', detail: 'The rush home. Fruit cart vendors gather outside mosques. Drivers caught in the swarm of worshippers heading home. The calm abruptly ends.' },
  { moment: 'Lunch (1–2pm)', detail: 'The meal. Communal platter. Right hand only. Stay in your section. Roll couscous into balls or use a spoon. Meat placed in front of guests by the host. Lben on the side. Every generation around one dish.' },
  { moment: 'Afternoon', detail: 'Fruit, naps, tea, conversation. The slow Friday. Some venture to cafés. Errands run at half speed. The second round of tea between five and seven. Mint, sugar, three glasses.' },
]

export interface LifeEvent {
  occasion: string
  role: string
}

export const LIFE_EVENTS: LifeEvent[] = [
  { occasion: 'Birth', role: 'Couscous prepared to strengthen the mother. Distributed to neighbours and visitors. The first communal meal of a new life.' },
  { occasion: 'Wedding', role: 'Seffa medfouna between courses. Sweet couscous as palate cleanser. Seven-vegetable couscous for the main feast. The bride\'s family\'s couscous is a statement of their house.' },
  { occasion: 'Funeral', role: 'Couscous represents solidarity — neighbours bring couscous to the grieving family. You don\'t cook when you mourn; the community cooks for you.' },
  { occasion: 'Eid al-Adha', role: 'The sacrifice. The best cuts served with couscous that day. Remaining meat dried into gueddid for couscous in the weeks that follow.' },
  { occasion: 'Ramadan', role: 'Less common during the fasting month (harira takes the spotlight), but couscous returns for Eid al-Fitr — the feast that breaks the fast.' },
  { occasion: 'Guest arrives', role: 'Hospitality expressed through couscous. Refusing the dish is considered disrespectful — it represents effort, care, and goodwill. The more generous the portion, the greater the welcome.' },
]

export interface MaghrebStyle {
  country: string
  character: string
}

export const MAGHREB_STYLES: MaghrebStyle[] = [
  { country: 'Morocco', character: 'Complex spice blending — saffron, ginger, cinnamon, turmeric, sweet paprika. Tfaya garnish. Seven-vegetable standard. Lamb or chicken. Buttermilk on the side. The most ornate.' },
  { country: 'Algeria', character: 'Humble and hearty. Heavy on vegetables and pulses. Fewer spices. Tomato-based broths common. Lamb dominant. The most filling.' },
  { country: 'Tunisia', character: 'Red broth — tomato concentrate and harissa give it heat and colour. Spicier than others. Fish couscous common on the coast. Octopus versions in coastal towns. The hottest.' },
  { country: 'Mauritania', character: 'Large-grain wheat (mabroum). Darker. Cooked with lamb, beef, or camel. Onion, tomato, carrot. Served with ghee (dhen). Desert-style. The richest.' },
  { country: 'Libya', character: 'Lamb dominant (sometimes camel). Not served at weddings. Sweet dessert version (maghrood) with dates, sesame, and honey. The most surprising.' },
]

export const VOCABULARY = [
  { term: 'Kseksu / Seksu', arabic: 'سكسو', meaning: 'Amazigh (Tamazight) name for couscous. Means "well-formed." The original word from which "couscous" derives' },
  { term: 'Couscoussier', arabic: 'برمة + كسكاس', meaning: 'Two-part steamer. Bottom pot (barma) holds broth. Top basket (kiskas) holds grains. French term adopted internationally' },
  { term: 'Gsaa', arabic: 'قصعة', meaning: 'Wide, shallow glazed clay dish. Used for rolling grains and for serving the finished couscous. The communal platter' },
  { term: 'Kiskas', arabic: 'كسكاس', meaning: 'The steamer basket that sits atop the barma. Holes in the bottom allow steam to pass through. Never covered with a lid' },
  { term: 'Tfaya', arabic: 'تفاية', meaning: 'Caramelised onion and raisin confit. Cinnamon, ginger, saffron, sometimes orange flower water. Almoravid-era origin' },
  { term: 'Lben', arabic: 'لبن', meaning: 'Buttermilk. Served cold alongside couscous. Traditional pairing. Never drink water with couscous — drink lben' },
  { term: 'Smen', arabic: 'سمن', meaning: 'Aged, fermented clarified butter. Strong, pungent flavour. Worked into couscous between steamings. Some families age it for years' },
  { term: 'Gueddid', arabic: 'كديد', meaning: 'Dried, salted, sun-cured meat from the Eid sacrifice. Used in couscous for weeks after the holiday' },
]

export const HERO_STATS = [
  { value: 'Dec 2020', label: 'UNESCO inscription' },
  { value: '4', label: 'countries, one joint nomination' },
  { value: '3', label: 'steamings for perfect grains' },
  { value: 'Every Friday', label: 'the sacred weekly ritual' },
]

export const KEY_NUMBERS = [
  { number: '13th C', context: 'Earliest written couscous recipe — anonymous Andalusian cookbook. Archaeological tools date to the 10th century or earlier' },
  { number: '7', context: 'Vegetables in Couscous Bidaoui — Morocco\'s most popular Friday version. Carrot, turnip, courgette, pumpkin, cabbage, potato, chickpeas' },
  { number: '3', context: 'Steamings for proper couscous — grain returned to the gsaa between each pass. Two minimum. Three for perfection' },
  { number: '16', context: 'Moroccan entries on the UNESCO Intangible Heritage list as of December 2025. Couscous was the 10th' },
  { number: '2016', context: 'Year Algeria submitted a solo UNESCO bid for couscous — provoking Morocco. Years of negotiation preceded the joint 2019 application' },
  { number: '0', context: 'Utensils required. Right hand, bread, your section of the communal dish. Spoons permitted. Left hand stays on your lap' },
]

export const BIBLIOGRAPHY = [
  { source: 'UNESCO Decision 15.COM/8.b.14', detail: 'Knowledge, know-how and practices about the production and consumption of couscous. Joint: Algeria, Mauritania, Morocco, Tunisia. No. 01602. December 2020.', url: 'https://ich.unesco.org/en/Decisions/15.COM/8.b.14' },
  { source: 'NPR — The Salt', detail: 'Couscous: A Symbol Of Harmony In Northwest Africa, A Region Of Clashes. Jeff Koehler. June 2019.' },
  { source: 'Taste of Maroc', detail: 'T\'faya in Moroccan Cooking. Christine Benlafquih. Almoravid-era techniques. Fez/Rabat distinctions (souiria vs. twimiya).' },
  { source: 'Morocco World News', detail: 'Friday Couscous: Morocco\'s Most Valued Tradition. August 2019.' },
  { source: 'Al Jazeera / Middle East Eye', detail: 'UNESCO couscous inscription coverage, December 2020. Joint nomination diplomacy. "Couscous wars."' },
  { source: 'Wikipedia + Multiple Academic Sources', detail: 'Regional variations across the Maghreb. Archaeological evidence (10th C cooking tools). Amazigh etymological origins (seksu / kseksu).' },
]
