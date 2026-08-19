export const SERVICES = [
  {
    slug: 'road-furniture',
    title: 'Road Furniture',
    short: 'Markings, signage and safety fixtures',
    description:
      'Road line marking in All Weather Thermoplastic, Normal Thermoplastic and Rumble Strips, alongside signage supply and installation, road studs and flexible posts.',
    details: [
      'Road Line Marking',
      'All Weather Thermoplastic',
      'Rumble Strips',
      'Signage Supply & Install',
      'Road Stud',
      'Flexible Post',
    ],
    // no usable client photo of marking / signage work yet — see CONTENT-NOTES

    body: 'Highly reflective, high-durability road visual management items, built and configured to strict JKR highway structural safety criteria. Line marking uses premium retroreflective thermoplastic conforming to JKR / LLM specifications; rumble strips give drivers a tactile warning before high-hazard spots; signage covers directional, warning and regulatory highway signs in high-intensity sheeting; and road studs and flexible posts are heavy-duty glass and high-elastic impact assemblies.',
  },
  {
    slug: 'surface-treatment',
    title: 'Surface Treatment & Anti-Skid',
    short: 'Grip, colour and asphalt longevity',
    description:
      'Advanced specialised surface treatment systems formulated to maximise tyre grip, reduce hydroplaning, protect bridge decks and restore asphalt longevity.',
    details: [
      'High Friction Surface Treatment (HFST)',
      'Colour Surface Treatment (CST)',
      'Reclamite',
    ],
    image: './images/hfst-roundabout.jpg',
    gallery: ['./images/cst-bus-lane.jpg', './images/cst-walkway.jpg'],
    body: 'HFST is a specialist veneer overlay for concrete and asphalt roads and highways, providing and maintaining a level of surface friction in excess of SRV 70 that traditional road surfacing materials cannot reach. CST is a durable, skid-resistant coloured surfacing system of thermosetting resin compound, suited to bus lanes, pedestrian crossings and parking delineators. Reclamite is a highly-penetrative liquid emulsion that restabilises the binder, delaying asphalt ageing and pothole occurrence.',
  },
  {
    slug: 'civil-structure',
    title: 'Civil & Structure',
    short: 'Slope protection and fencing',
    description:
      'Slope protection, fencing and concrete wall fencing, delivered by technically equipped personnel analysing the most practical solution for each site.',
    details: ['Slope Protection', 'Fencing', 'Wall Fencing'],
    // no usable client photo of slope protection / fencing yet — see CONTENT-NOTES
    body: 'From gabion walls holding a cut slope to boundary fencing along an alignment, the civil team surveys the ground condition first and proposes the method that will actually last through Malaysian monsoon seasons.',
  },
  {
    slug: 'bridge-expansion-joint',
    title: 'Bridge Expansion Joint',
    short: 'Joint supply, replacement and deck repair',
    description:
      'Highly engineered structural joints installed across flyovers, expressways and bridges to accommodate expansion, contraction and dynamic vehicular vibrations.',
    details: ['Asphaltic Plug Joint', 'Elastomeric Joint', 'Sealant Joint', 'Bridge Deck Repair'],
    image: './images/joint-elastomeric.jpg',
    gallery: ['./images/joint-asphaltic-plug.jpg'],
    body: 'Bridge joints take the daily hammering of every axle that crosses. Asphaltic plug joints use a flexible polymer-modified binder designed for small to medium range bridge movement; elastomeric rubber joints are steel-reinforced vulcanised chloroprene profiles that absorb high impact shear movements. AKSB supplies and replaces damaged joints for concessionaires including PROLINTAS, Grand Saga and LATAR, and repairs the deck around them so the fix holds.',
  },
  {
    slug: 'crack-repair',
    title: 'Road Crack Repair System',
    short: 'Inlaid and over-band crack systems',
    description:
      'BBA / HAPAS certified bituminous crack repair systems for longitudinal cracks, adjacent multiple cracks, lane joints and the surface defects that follow them.',
    details: ['Roadflex H', 'Techscreed'],
    image: './images/crack-roadflex.jpg',
    body: 'Roadflex H is a BBA / HAPAS certified bituminous inlaid flexible crack repair system for repairing cracks and adjacent multiple cracks — suitable for longitudinal cracking, surface ravelling, rutting, stress cracking and lane joints. Techscreed is a BBA / HAPAS certified fill and over-band system for 5–40mm cracks, and is particularly suited to sealing cracks on existing pavements that are to be overlaid by asphalt.',
  },
] as const;

export const PROJECTS = [
  {
    year: '2026',
    title: 'Elastomeric bridge joint replacement, East–West corridor',
    client: 'PROLINTAS (LKSA)',
    scope: 'Bridge Expansion Joint',
    desc: 'Supply and replace damaged elastomeric bridge joints at various locations along the highway (Jabor – Gerik).',
    image: './images/joint-elastomeric.jpg',
  },
  {
    year: '2025',
    title: 'Bridge joint rectification, Cheras–Kajang Highway',
    client: 'Grand Saga Sdn Bhd',
    scope: 'Bridge Expansion Joint',
    desc: 'Rectification works of damaged bridge joints along the Cheras–Kajang Highway concession.',
    image: './images/joint-asphaltic-plug.jpg',
  },
  {
    year: '2025',
    title: 'Bridge joint repair, Kuang–Sg. Buloh Expressway',
    client: 'LATAR Highway',
    scope: 'Bridge Expansion Joint',
    desc: 'Proposed repair of existing bridge joints at Kuang–Sg. Buloh Expressway (KSE) for year 2025.',
    image: './images/joint-elastomeric.jpg',
  },
  {
    year: '2025',
    title: 'Expansion joint & bridge maintenance works (ASEAN)',
    client: 'Bina Masyhur Sdn Bhd (SELIA Group)',
    scope: 'Bridge Works',
    desc: 'Kerja-kerja membaikpulih expansion joint dan kerja-kerja berkaitan penyelenggaraan jambatan 2025.',
    image: './images/joint-asphaltic-plug.jpg',
  },
  {
    year: '2025',
    title: 'Expansion joint & road marking, FT 1416 Kota Tinggi',
    client: 'Bina Masyhur Sdn Bhd (SELIA Group)',
    scope: 'Road Furniture',
    desc: 'Expansion joint and road marking works at FT 1416 Sec 3.00 – 4.00, Jalan Felda Inas, Kota Tinggi, Johor.',
    image: './images/cst-walkway.jpg',
  },
  {
    year: '2025',
    title: 'Nilai overpass bridge joint repairs, Section CS',
    client: 'Edgenta Infrastructure Services (EIS + PLUS)',
    scope: 'Bridge Expansion Joint',
    desc: 'Bridge joint repair works for Nilai Railway Overpass Bridge at KM280.50 and Nilai Overpass Bridge at KM280.60 south bound.',
    image: './images/joint-asphaltic-plug.jpg',
  },
  {
    year: '2024',
    title: 'Sungai Pagoh & Sungai Pendendam bridges, N–S Expressway',
    client: 'Edgenta Infrastructure Services (EIS + PLUS)',
    scope: 'Bridge Expansion Joint',
    desc: 'Bridge joint repair works at KM132.40 and KM133.80 both bound, Section S3, North–South Expressway.',
    image: './images/crack-roadflex.jpg',
  },
  {
    year: '2024',
    title: 'Bridge expansion joint repairs, Kajang SILK Highway',
    client: 'PROLINTAS (SILK)',
    scope: 'Bridge Expansion Joint',
    desc: 'Repair of damaged bridge expansion joints at various locations along the Kajang SILK Highway.',
    image: './images/hfst-roundabout.jpg',
  },
] as const;

export const PARTNERS = [
  {
    name: 'Omnigrip Direct',
    logo: './images/logo-omnigrip.svg',
    location: 'Australia',
    field: 'High friction & colour surface treatment systems',
    note: 'Smarter road safety surfacing — the technology behind AKSB’s HFST and CST scopes.',
  },
  {
    name: 'Roadtechs Group',
    logo: './images/logo-roadtechs.png',
    location: 'United Kingdom',
    field: 'Road maintenance technology',
    note: 'UK road technology group behind the BBA / HAPAS certified Roadflex H and Techscreed crack repair systems.',
  },
  {
    name: 'Adbruf',
    logo: './images/logo-adbruf.png',
    location: 'United Kingdom',
    field: 'Resin surfacing specialist',
    note: 'Resin surfacing specialists supporting the anti-skid and coloured surfacing side of the business.',
  },
  {
    name: 'ACP-DMT',
    logo: './images/logo-acpdmt.png',
    location: 'Malaysia',
    field: 'Concrete & structural products',
    note: 'Local manufacturer of highway and road safety products, supplying the civil and bridge scopes.',
  },
] as const;

export const CLIENTS = [
  { name: 'PROLINTAS Group of Companies', logo: './images/logo-prolintas.png' },
  { name: 'PLUS Malaysia', logo: './images/logo-plus.png' },
  { name: 'UEM Edgenta', logo: './images/logo-uem-edgenta.png' },
  { name: 'Dewan Bandaraya Kuala Lumpur', logo: './images/logo-dbkl.png', tall: true },
  { name: 'Grand Saga (LGB Group)', logo: './images/logo-grand-saga.svg' },
  { name: 'Perbadanan Putrajaya', logo: './images/logo-putrajaya.png', tall: true },
  { name: 'SELIA Group', logo: './images/logo-selia.png' },
  // no usable logo sourced yet — rendered as a wordmark cell, see CONTENT-NOTES
  { name: 'LATAR Expressway', logo: null },
  { name: 'Bina Masyhur Sdn Bhd', logo: null },
] as const;

/** Certifications and registrations shown on the profile — see CONTENT-NOTES for expiry dates. */
export const CERTIFICATIONS = [
  {
    body: 'CIDB Malaysia',
    title: 'Sijil Perolehan Kerja Kerajaan',
    detail: 'Grade G4 · B (B04), CE (CE01, CE02, CE21, CE30, CE32, CE42) and ME (M15)',
  },
  {
    body: 'CIDB Malaysia',
    title: 'Perakuan Pendaftaran',
    detail: 'Registered contractor, Bumiputera status · valid to 14 July 2029',
  },
  {
    body: 'UEM Edgenta Berhad',
    title: 'Certificate of Vendor Registration',
    detail: 'Contractor category · registration valid 8 August 2024 to 7 August 2029',
  },
  {
    body: 'JCCD Johor',
    title: 'Sijil Kontraktor Johor',
    detail: 'Grade G4 · B, CE and ME, valid 10 February 2025 to 9 February 2027',
  },
  {
    body: 'FGV Holdings Berhad',
    title: 'Vendor Registration Declaration',
    detail: 'Civil engineering and supply categories, Grade G4 · valid to 21 January 2028',
  },
  {
    body: 'Dewan Bandaraya Kuala Lumpur',
    title: 'Sijil Pendaftaran Syarikat',
    detail: 'Registered company with DBKL · valid 12 February 2026 to 12 February 2027',
  },
] as const;

export const WHY_AKSB = [
  {
    title: 'Experienced technical team',
    desc: 'Skilled and dedicated professionals with extensive industry experience on live carriageways.',
  },
  {
    title: 'Highway maintenance specialist',
    desc: 'Focused on highway and federal / state road works — not a general contractor doing roads on the side.',
  },
  {
    title: 'Quality workmanship',
    desc: 'Committed to quality, precision and safety on every scope, from marking to bridge deck repair.',
  },
  {
    title: 'Cost competitive',
    desc: 'Delivering the best value for clients without cutting the parts of the job that matter.',
  },
  {
    title: 'On-time delivery',
    desc: 'A reputation built on handing over projects ahead of schedule, lane closure after lane closure.',
  },
  {
    title: 'International technology partners',
    desc: 'Adopting proven technologies and techniques through partnerships in Australia and the UK.',
  },
] as const;

/** Achievement to date — figures taken from the 2026 company profile. */
export const STATS = [
  { value: 100000, label: 'Road line marking', suffix: ' m²' },
  { value: 25000, label: 'Colour surface treatment', suffix: ' m²' },
  { value: 20000, label: 'Asphaltic plug joint', suffix: ' m' },
  { value: 7000, label: 'High friction surfacing', suffix: ' m²' },
  { value: 1800, label: 'Elastomeric joint', suffix: ' m' },
] as const;

export const FAQS = [
  {
    q: 'What work does AKSB Global actually do?',
    a: 'Five scopes: road furniture (line marking, signage, studs, flexible posts), surface treatment and anti-skid (HFST, CST, Reclamite), civil and structure works (slope protection and fencing), bridge expansion joints including deck repair, and road crack repair systems. Road maintenance is the whole business, not a side line.',
  },
  {
    q: 'Which areas do you cover?',
    a: 'We work out of two offices — head office in Bandar Puncak Alam, Selangor, and a Johor branch in Yong Peng, Batu Pahat. Recent projects run from Klang Valley highways like LKSA, SILK, Cheras–Kajang and the Kuang–Sg. Buloh Expressway to the North–South Expressway and federal roads as far south as Kota Tinggi, Johor.',
  },
  {
    q: 'Is AKSB a registered contractor?',
    a: 'Yes. AKSB Global Sdn Bhd (1287934-H) was incorporated in July 2018 in Selangor and is a CIDB Grade G4 registered contractor with Bumiputera status, holding B, CE and ME categories. We are also a registered vendor with UEM Edgenta, FGV Holdings, DBKL and JCCD Johor.',
  },
  {
    q: 'Do you take packages from main contractors and concessionaires?',
    a: 'That is most of our order book. Recent clients include PROLINTAS, Grand Saga, LATAR, Edgenta Infrastructure Services and Bina Masyhur under the SELIA Group, alongside councils and public agencies.',
  },
  {
    q: 'Can you supply and install HFST or coloured surfacing?',
    a: 'Yes. Through our partnership with Omnigrip Direct of Australia we deliver high friction surface treatment holding surface friction in excess of SRV 70 for accident-prone stretches, and colour surface treatment for bus, cycle and priority lanes, plus the sealant joint works that go with them.',
  },
  {
    q: 'How do I get a quotation?',
    a: 'Send us the scope, location and any drawings or BQ you have — WhatsApp is fastest, email works too. Our contact person is Amrizal Aziz, and the form below reaches the same inbox.',
  },
] as const;

export const CONTACT = {
  company: 'AKSB Global Sdn Bhd',
  regNo: '1287934-H',
  address:
    'No. 7-G&1, Jalan PPAJ 2/2, Pusat Perdagangan Alam Jaya, 42300 Bandar Puncak Alam, Selangor, Malaysia',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Pusat+Perdagangan+Alam+Jaya+42300+Bandar+Puncak+Alam+Selangor',
  johorAddress: '2 PTD 28218, Jalan Tropika 12, Taman Bukit Tropika, 83700 Yong Peng, Batu Pahat, Johor',
  johorMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Jalan+Tropika+12+Taman+Bukit+Tropika+83700+Yong+Peng+Johor',
  email: 'aksbglobal@gmail.com',
  officePhone: '+603-6087 5923',
  officePhoneHref: 'tel:+60360875923',
  mobilePhone: '+6019-366 5892',
  mobilePhoneHref: 'tel:+60193665892',
  whatsappUrl: 'https://wa.me/60193665892',
  person: 'Amrizal Aziz',
} as const;
