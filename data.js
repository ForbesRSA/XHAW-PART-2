// Shared data for Next Level Gaming & Esports Arena (prices excl. VAT, in ZAR)
const VAT_RATE = 0.15;
const DISCOUNT_TIERS = [
  { min: 4, rate: 0.15, label: '4+ bookings' },
  { min: 3, rate: 0.10, label: '3 bookings' },
  { min: 2, rate: 0.05, label: '2 bookings' },
  { min: 1, rate: 0.00, label: '1 booking' }
];
const PACKAGES = [
  { id: 'ultimate', type: 'gaming', icon: '🎮', name: 'Ultimate Gamer Pass', price: 1500, badge: 'BEST VALUE',
    short: 'Full access to all gaming stations',
    desc: 'Take your gaming to the next tier with our most complete package. Enjoy access to top-of-the-line RTX-powered PC rigs, next-gen consoles and state-of-the-art simulators inside our futuristic lounge.',
    includes: ['Access to all gaming stations', '3-hour session', 'Complimentary drinks', 'Free Wi-Fi', 'Exclusive member lounge access'] },
  { id: 'vip', type: 'gaming', icon: '👑', name: 'VIP Gaming Experience', price: 2200, badge: 'PREMIUM',
    short: 'Premium setup with dedicated host',
    desc: 'A private, premium setup with a dedicated host who looks after your session from start to finish.',
    includes: ['Private VIP gaming zone', '4-hour session', 'Dedicated host', 'Snacks and drinks included', 'Priority booking on tournament nights'] },
  { id: 'training', type: 'gaming', icon: '🏆', name: 'Esports Training Package', price: 1800, badge: 'COACHING',
    short: 'Coaching from pro players',
    desc: 'Sharpen your skills with structured coaching from experienced esports players, built for aspiring competitors.',
    includes: ['2 x 90-minute coaching sessions', 'Game-play review and feedback', 'Access to practice rigs', 'Training plan to take home', 'Entry discount on one arena tournament'] },
  { id: 'birthday', type: 'gaming', icon: '🎂', name: 'Birthday Party Package', price: 3500, badge: 'GROUPS',
    short: 'Party room + gaming for groups',
    desc: 'The ultimate gaming party for up to 10 guests, with a decorated party room and gaming for everyone.',
    includes: ['Private party room for 3 hours', 'Gaming for up to 10 guests', 'Party host', 'Snacks, drinks and cake table', 'Decorations and music'] },
  { id: 'vr', type: 'individual', icon: '🥽', name: 'Virtual Reality', price: 650,
    short: 'Immersive VR adventures',
    desc: 'Step inside the game with our latest VR headsets and a library of immersive titles.',
    includes: ['60-minute VR session', 'Choice of VR titles', 'Staff setup and safety briefing'] },
  { id: 'racing', type: 'individual', icon: '🏎️', name: 'Racing Simulator Challenge', price: 500,
    short: 'Professional racing rigs',
    desc: 'Feel the track on professional racing rigs with force-feedback wheels and triple screens.',
    includes: ['60-minute session', 'Force-feedback wheel and pedals', 'Lap-time leaderboard entry'] },
  { id: 'escape', type: 'individual', icon: '🧩', name: 'Escape Room Challenge', price: 750,
    short: 'Themed puzzle rooms',
    desc: 'Work together to solve puzzles and escape our themed rooms before time runs out.',
    includes: ['60-minute escape room', 'Up to 6 players', 'Game master support'] }
];
const TOURNAMENTS = [
  { name: 'Valorant Masters Cup', date: 'Oct 24, 18:00', icon: '🏆' },
  { name: 'Grand Simulator Race', date: 'Nov 02, 14:00', icon: '🏁' }
];
const formatRand = n => 'R' + n.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
function getDiscountRate(count) {
  const tier = DISCOUNT_TIERS.find(t => count >= t.min);
  return tier ? tier.rate : 0;
}
function calculateQuote(items) { // items: [{price, qty}]
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const rate = getDiscountRate(count);
  const discount = subtotal * rate;
  const afterDiscount = subtotal - discount;
  const vat = afterDiscount * VAT_RATE;
  return { count, subtotal, rate, discount, afterDiscount, vat, total: afterDiscount + vat };
}
if (typeof module !== 'undefined') module.exports = { PACKAGES, TOURNAMENTS, DISCOUNT_TIERS, calculateQuote, getDiscountRate, VAT_RATE };
