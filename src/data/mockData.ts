import { DeviceType, RepairService, ReviewItem, ProductItem, FAQItem } from '../types';

// Images imported directly for Vite asset resolution
import posterHero from '../assets/images/hero_microsoldering_poster_1788795662200.jpg';
import imgIphone15Yellow from '../assets/images/product_iphone15plus_yellow_1788795678228.jpg';
import imgIphone16Blue from '../assets/images/product_iphone16_blue_1788795692173.jpg';
import imgIphone16eWhite from '../assets/images/product_iphone16e_white_1788795725467.jpg';
import imgThinkPad from '../assets/images/product_thinkpad_t14s_1788795707384.jpg';
import imgLabMicroscope from '../assets/images/repair_microscope_lab_1788795741191.jpg';

export const ASSET_IMAGES = {
  heroPoster: posterHero,
  iphone15Yellow: imgIphone15Yellow,
  iphone16Blue: imgIphone16Blue,
  iphone16eWhite: imgIphone16eWhite,
  thinkpad: imgThinkPad,
  labMicroscope: imgLabMicroscope,
};

export const BUSINESS_INFO = {
  name: 'Dialfix',
  tagline: 'Expert Mobile, Tablet & Laptop Repairs in Manchester',
  rating: 5.0,
  reviewCount: 170,
  phone: '+44 7365 206098',
  phoneDisplay: '+44 7365 206098',
  phoneTel: 'tel:+447365206098',
  whatsappUrl: 'https://wa.me/447365206098?text=Hello%20Dialfix,%20I%20need%20a%20repair%20quote',
  email: 'info@dialfix.co.uk',
  address: '530 Liverpool Rd, Peel Green, Eccles, Manchester M30 7JA, United Kingdom',
  mapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=530+Liverpool+Rd+Peel+Green+Eccles+Manchester+M30+7JA+United+Kingdom',
  googleMapsPlaceUrl: 'https://maps.google.com/?q=Dialfix+530+Liverpool+Rd+Peel+Green+Eccles+Manchester+M30+7JA',
  plusCode: 'FJHM+57 Manchester, United Kingdom',
  hours: {
    weekdays: 'Monday – Saturday: 9:00 AM – 7:15 PM',
    sunday: 'Sunday: Closed (Emergency drop-off available by WhatsApp)',
  },
  badges: [
    '12-Month Warranty',
    'Same-Day Service',
    'No Fix, No Fee',
    '5.0★ Google Rated (170 Reviews)',
    'LGBTQ+ Friendly',
  ],
};

export const DEVICE_CATEGORIES: { type: DeviceType; label: string; icon: string }[] = [
  { type: 'iPhone', label: 'iPhone', icon: 'Smartphone' },
  { type: 'Samsung', label: 'Samsung', icon: 'Smartphone' },
  { type: 'Android', label: 'Android', icon: 'Smartphone' },
  { type: 'Laptop', label: 'Laptop / Mac', icon: 'Laptop' },
  { type: 'iPad', label: 'iPad / Tablet', icon: 'Tablet' },
  { type: 'Other', label: 'Other Tech', icon: 'Cpu' },
];

export const POPULAR_REPAIRS: RepairService[] = [
  {
    id: 'screen-replacement',
    title: 'Screen Replacement',
    subtitle: 'iPhone, Samsung & all brands',
    timeEstimate: '~45 mins',
    category: 'iPhone',
    description: 'High-grade OLED/LCD panels with responsive touch digitizer and true-tone restoration.',
    iconName: 'Smartphone',
    popular: true,
  },
  {
    id: 'battery-replacement',
    title: 'Battery Replacement',
    subtitle: 'All major models & brands',
    timeEstimate: '~30 mins',
    category: 'iPhone',
    description: 'Restore 100% battery health capacity with brand-new OEM safety-certified cells.',
    iconName: 'BatteryCharging',
    popular: true,
  },
  {
    id: 'charging-port',
    title: 'Charging Port Repair',
    subtitle: 'USB-C & Lightning ports',
    timeEstimate: '~1 hr',
    category: 'Samsung',
    description: 'Precision microscopic pin cleaning or dock module replacement for fast-charging support.',
    iconName: 'Zap',
    popular: true,
  },
  {
    id: 'water-damage',
    title: 'Water Damage Recovery',
    subtitle: 'Ultrasonic chemical bath',
    timeEstimate: 'Same day',
    category: 'Android',
    description: 'Immediate deep ultrasonic decontamination and micro-soldering short-circuit diagnostic.',
    iconName: 'Droplets',
    popular: true,
  },
  {
    id: 'laptop-repair',
    title: 'Laptop & Mac Repair',
    subtitle: 'Mac & Windows hardware',
    timeEstimate: 'Same day',
    category: 'Laptop',
    description: 'Screen replacement, keyboard fix, SSD upgrades, cooling thermal paste repasting.',
    iconName: 'Laptop',
    popular: true,
  },
  {
    id: 'back-glass',
    title: 'Back Glass Repair',
    subtitle: 'iPhone & Samsung laser removal',
    timeEstimate: '~2 hrs',
    category: 'iPhone',
    description: 'Laser-assisted housing separation preserving wireless charging coils and chassis alignment.',
    iconName: 'Shield',
    popular: true,
  },
];

export const VERBATIM_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Rashandeep Singh',
    rating: 5,
    timeAgo: '3 months ago',
    content: "I've both bought a phone and had repairs done here, and each time the service has been excellent. The staff are friendly, knowledgeable, and honest. Prices are affordable, repairs are completed quickly, and the quality of work is great. If you need any phone work done in Manchester, Dialfix is the place.",
    verified: true,
    avatarColor: 'bg-emerald-600',
    highlight: 'Friendly, knowledgeable, and honest',
    ownerResponse: "Thank you so much for your fantastic review and continued support. We're delighted to hear that you've had a great experience with both purchasing and repairs!",
  },
  {
    id: 'rev-2',
    author: 'Sandra Gunn',
    rating: 5,
    timeAgo: 'a month ago',
    content: 'Great service. Took my iPhone 13 to be repaired, back casing was all smashed and it needed a new battery. Malik was brilliant, he replaced the back and battery and put a screen protector on, all done same day at a great price. Would totally recommend.',
    verified: true,
    avatarColor: 'bg-blue-600',
    highlight: 'All done same day at a great price',
  },
  {
    id: 'rev-3',
    author: 'Frank0512',
    rating: 5,
    timeAgo: 'a month ago',
    content: 'First class service. Full battery replacement and cleaned all ports/mic etc and volume now much better. He even called the next day to make sure everything was good. Brilliant service! Pretty much like I have a brand new phone.',
    verified: true,
    avatarColor: 'bg-purple-600',
    highlight: 'Pretty much like I have a brand new phone',
  },
  {
    id: 'rev-4',
    author: 'Local Manchester Customer',
    rating: 5,
    timeAgo: '2 weeks ago',
    content: "It's great to find a repair shop that offers such good service at a fair price.",
    verified: true,
    avatarColor: 'bg-sky-600',
    highlight: 'Great service at a fair price',
  },
  {
    id: 'rev-5',
    author: 'Eccles Resident',
    rating: 5,
    timeAgo: 'Recent review',
    content: 'Top man sorted my charger in less than 5 mins with a banging price!',
    verified: true,
    avatarColor: 'bg-teal-600',
    highlight: 'Sorted in less than 5 mins',
  },
  {
    id: 'rev-6',
    author: 'Verified Customer',
    rating: 5,
    timeAgo: 'Recent review',
    content: 'Very good and honest place, nice customer service reasonable prices.',
    verified: true,
    avatarColor: 'bg-amber-600',
    highlight: 'Honest place, nice customer service',
  },
];

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: 'iphone-15-plus-yellow',
    name: 'IPHONE 15 PLUS',
    subtitle: '128GB – Pastel Yellow',
    price: 549.0,
    condition: 'Refurbished - Pristine',
    storage: '128GB',
    color: 'Yellow',
    imageUrl: imgIphone15Yellow,
    inStock: true,
    warranty: '12-Month Dialfix Warranty',
    features: [
      'Super Retina XDR OLED Display',
      'Dynamic Island & A16 Bionic',
      'Battery Health 96%+',
      'Includes Fast USB-C Cable & Free Screen Protector',
    ],
  },
  {
    id: 'iphone-16-blue',
    name: 'IPHONE 16',
    subtitle: '128GB – Cobalt Blue',
    price: 580.0,
    condition: 'Refurbished - Pristine',
    storage: '128GB',
    color: 'Cobalt Blue',
    imageUrl: imgIphone16Blue,
    inStock: true,
    warranty: '12-Month Dialfix Warranty',
    features: [
      'All-new Camera Control tactile button',
      'Apple Intelligence compatible A18 chip',
      'Pristine condition, zero scratches',
      'Factory unlocked to all UK & global networks',
    ],
  },
  {
    id: 'iphone-16-e-white',
    name: 'IPHONE 16 E',
    subtitle: '512GB – Starlight Silver',
    price: 549.0,
    condition: 'Brand New',
    storage: '512GB',
    color: 'Starlight Silver',
    imageUrl: imgIphone16eWhite,
    inStock: true,
    warranty: '1-Year Apple + Dialfix Guarantee',
    features: [
      'Huge 512GB storage capacity',
      'Sealed in original box with factory wrap',
      'OLED edge-to-edge high-clarity panel',
      'Free data transfer service in store',
    ],
  },
  {
    id: 'lenovo-thinkpad-t14s',
    name: 'Lenovo ThinkPad T14s Gen 4',
    subtitle: 'Intel i7 / 16GB RAM / 512GB SSD Touch Screen',
    price: 550.0,
    condition: 'Refurbished - Pristine',
    storage: '512GB NVMe SSD',
    color: 'Matte Stealth Black',
    imageUrl: imgThinkPad,
    inStock: true,
    warranty: '12-Month Hardware Warranty',
    features: [
      '14" FHD+ IPS Anti-Glare Touchscreen',
      'Backlit UK Keyboard + TrackPoint',
      'Clean Windows 11 Pro licensed install',
      'Includes original rapid USB-C charger',
    ],
  },
];

export const FAQS_LIST: FAQItem[] = [
  {
    question: 'How much does it cost to get a phone screen fixed in the UK?',
    answer:
      'In the UK, independent high-street screen replacement typically ranges from £60 to £220 depending on whether the phone uses standard LCD or advanced flexible OLED panels. At Dialfix, we provide upfront transparent quotes with no hidden fees and include a 12-month warranty on every screen installed.',
  },
  {
    question: 'Is it cheaper to replace a phone screen or buy a new one?',
    answer:
      'In over 90% of cases, replacing the screen is significantly more cost-effective than purchasing a new device. A repair preserves all your personal photos, messages, apps, and banking authenticators without hours spent setting up and restoring data.',
  },
  {
    question: 'Can a mobile be repaired after water or liquid damage?',
    answer:
      'Yes! The key is speed. Bring the device in as soon as possible. At Dialfix, we perform an ultrasonic chemical decontamination bath to clear corrosive minerals, followed by logic-board micro-soldering diagnostics to replace shorted capacitors.',
  },
  {
    question: 'Can I fix a cracked phone screen myself?',
    answer:
      'Modern smartphones have delicate flex cables, integrated Face ID/touch sensors, and fragile glass bonded to OLED arrays. DIY kits often lead to torn cables or damaged logic boards. Our certified technicians have specialized heating pads, suction separators, and clean benches to ensure zero collateral damage.',
  },
  {
    question: 'What is the most common type of phone damage?',
    answer:
      'Impact damage to screens and back housing makes up over 65% of repairs, closely followed by degraded lithium batteries, obstructed or bent charging ports, and liquid exposure.',
  },
  {
    question: 'Is it cheaper to repair or replace Samsung?',
    answer:
      'Repairing a Samsung phone is almost always cheaper. Whether it is an A-series or a flagship Galaxy S23/S24/Fold series, we fit OEM-grade high refresh rate displays and genuine battery packs at a fraction of the cost of a replacement handset.',
  },
  {
    question: 'Do you offer a warranty on repairs?',
    answer:
      'Absolutely. All Dialfix repairs come backed with our signature 12-month peace-of-mind warranty covering both parts and labor. Plus, if we are unable to solve your device fault, our strict "No Fix, No Fee" policy guarantees you pay zero.',
  },
];
