import { useState, useEffect } from "react";
import { Cloud, Droplets, Thermometer, Plus, Trash2, MapPin, Wallet, ArrowLeft, ChevronRight, ChevronDown, TrendingUp, TrendingDown, Sprout, Package, FlaskConical, User, Award, Medal, Trophy, Star, Lock, Zap, Globe, Users, Search, Phone, UserPlus, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

// --- CONFIGURATION ---
const supabaseUrl = "https://cdndutsyztaqtiwtntts.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkbmR1dHN5enRhcXRpd3RudHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMDQ3ODAsImV4cCI6MjA3OTc4MDc4MH0.7pFdFopbumF1JJMkoA5x-flF1-V6u1jGYFDsS-79vDA";
const supabase = createClient(supabaseUrl, supabaseKey);

// ⚠️ PASTE YOUR OPENWEATHERMAP KEY HERE ⚠️
const WEATHER_API_KEY = "9c061bd7a5cb8a53f5bd45ceb321e982"; 

// --- 8 DIVISIONS MOCK DATA (FALLBACK) ---
const DIVISION_DATA: any = {
  Dhaka: { temp: 34, humidity: 82, rain: 60, forecast: [34, 33, 35, 32, 31, 33, 34] },
  Chattogram: { temp: 32, humidity: 88, rain: 75, forecast: [32, 31, 31, 30, 29, 31, 32] },
  Sylhet: { temp: 29, humidity: 90, rain: 90, forecast: [29, 28, 28, 27, 28, 29, 30] },
  Rajshahi: { temp: 38, humidity: 45, rain: 10, forecast: [38, 39, 40, 39, 38, 37, 36] },
  Khulna: { temp: 35, humidity: 70, rain: 40, forecast: [35, 35, 34, 33, 34, 35, 36] },
  Barisal: { temp: 33, humidity: 85, rain: 50, forecast: [33, 33, 32, 32, 31, 33, 34] },
  Rangpur: { temp: 36, humidity: 60, rain: 20, forecast: [36, 35, 34, 33, 32, 31, 30] },
  Mymensingh: { temp: 31, humidity: 80, rain: 65, forecast: [31, 30, 29, 30, 31, 32, 33] },
};
const DIVISIONS = Object.keys(DIVISION_DATA);
const CROPS = ["Rice (ধান)", "Potato (আলু)", "Tomato (টমেটো)", "Chili (মরিচ)", "Onion (পেঁয়াজ)", "Garlic (রসুন)"];
const STORAGE_TYPES = ["Jute Bag Stack", "Silo", "Plastic Drum", "Cold Storage", "Hermetic Airtight Bag"];

// --- 10 DEMO FARMERS ---
const DEMO_FARMERS = [
  { username: "rahim", name: "Rahim Uddin", contact: "01711-234567", profit: 120000 },
  { username: "karim", name: "Karim Mia", contact: "01811-987654", profit: 65000 },
  { username: "fatema", name: "Fatema Begum", contact: "01911-112233", profit: 15000 },
  { username: "jamal", name: "Jamal Hossain", contact: "01611-445566", profit: 5000 },
  { username: "kamal", name: "Kamal Sheikh", contact: "01511-778899", profit: -2000 },
  { username: "bilkis", name: "Bilkis Akter", contact: "01722-334455", profit: 200000 },
  { username: "salam", name: "Abdus Salam", contact: "01822-667788", profit: 55000 },
  { username: "monir", name: "Monir Khan", contact: "01922-990011", profit: 12000 },
  { username: "rafiq", name: "Rafiqul Islam", contact: "01322-223344", profit: 800 },
  { username: "nasima", name: "Nasima Khatun", contact: "01422-556677", profit: 75000 },
];

// --- HELPER: NUMBER FORMATTING ---
const toBanglaDigits = (num: number | string) => {
  const finalNum = num?.toString() || "0";
  const banglaDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return finalNum.replace(/\d/g, (d) => banglaDigits[parseInt(d)]);
};
const formatCurrency = (amount: number, lang: "bn" | "en") => {
  if (lang === "en") return amount.toLocaleString('en-US');
  return toBanglaDigits(amount);
};

// --- TRANSLATIONS (UPDATED NAME & LOGO TEXT) ---
const TRANSLATIONS: any = {
  bn: {
    app_title: "কৃষি বন্ধু ২.০", // UPDATED
    sub_title: "কৃষকের হাসি",    // UPDATED
    net_profit: "মোট লাভ",
    net_loss: "বর্তমান ক্ষতি",
    income: "আয়",
    expense: "ব্যয়",
    weather: "আবহাওয়া",
    temp: "তাপমাত্রা",
    humidity: "আর্দ্রতা",
    rain: "বৃষ্টির সম্ভাবনা",
    location: "অবস্থান",
    add_transaction: "লেনদেন যোগ করুন",
    sell_btn: "বিক্রি (Income)",
    buy_btn: "ক্রয় (Expense)",
    date: "তারিখ",
    weight_kg: "ওজন (KG)",
    weight_g: "ওজন (Grams)",
    cost: "মূল্য (টাকা)",
    add_income: "আয় যোগ করুন",
    add_expense: "ব্যয় যোগ করুন",
    daily_overview: "দৈনিক হিসাব",
    empty: "কোন তথ্য নেই",
    profile_title: "প্রোফাইল",
    current_profit: "বর্তমান লাভ",
    target: "লক্ষ্য",
    earn_more: "আরও",
    earn_more_suffix: "টাকা আয় করে আনলক করুন",
    badges: "মেডেল তালিকা",
    seeds: "বীজ (Seeds)",
    storage: "সংরক্ষণ (Storage)",
    care: "সার/ঔষধ (Care)",
    back: "ফিরে যান",
    dashboard: "ড্যাশবোর্ড",
    next_7_days: "আগামী ৭ দিন",
    heat_1: "তাপমাত্রা",
    heat_2: "°C উঠবে → বিকেলের দিকে সেচ দিন",
    heavy_rain_1: "আগামী ৩ দিন বৃষ্টি",
    heavy_rain_2: "% → আজই ধান কাটুন অথবা ঢেকে রাখুন",
    rain_warning: "বৃষ্টি হবে: সার দেবেন না",
    humid_warning: "আর্দ্রতা বেশি: ছত্রাকনাশক দিন",
    badge_diamond: "ডায়মন্ড কিং (প্লাটিনাম)",
    badge_gold: "সোনার কৃষক (গোল্ড)",
    badge_silver: "রুপালী কৃষক (সিলভার)",
    badge_bronze: "উদীয়মান (ব্রোঞ্জ)",
    badge_struggle: "সংগ্রামী",
    profit_100k: "লাভ ১,০০,০০০ টাকার বেশি",
    profit_50k: "লাভ ৫০,০০০ টাকার বেশি",
    profit_10k: "লাভ ১০,০০০ টাকার বেশি",
    Dhaka: "ঢাকা",
    Chattogram: "চট্টগ্রাম",
    Sylhet: "সিলেট",
    Rajshahi: "রাজশাহী",
    Khulna: "খুলনা",
    Barisal: "বরিশাল",
    Rangpur: "রংপুর",
    Mymensingh: "ময়মনসিংহ",
    community: "কমিউনিটি",
    search_placeholder: "ইউজারনেম লিখুন (যেমন: rahim)",
    search_btn: "খুঁজুন",
    contact: "যোগাযোগ",
    username: "ইউজারনেম",
    friend_profit: "বন্ধুর লাভ",
    friend_badge: "বন্ধুর মেডেল",
    not_found: "কৃষক খুঁজে পাওয়া যায়নি"
  },
  en: {
    app_title: "KrishiBondhu 2.0", // UPDATED
    sub_title: "Krishoker Hasi",   // UPDATED
    net_profit: "Net Profit",
    net_loss: "Net Loss",
    income: "Income",
    expense: "Expense",
    weather: "Weather",
    temp: "Temperature",
    humidity: "Humidity",
    rain: "Rain Chance",
    location: "Location",
    add_transaction: "Add Transaction",
    sell_btn: "Sell (Income)",
    buy_btn: "Buy (Expense)",
    date: "Date",
    weight_kg: "Weight (KG)",
    weight_g: "Weight (Grams)",
    cost: "Price (Taka)",
    add_income: "Add Income",
    add_expense: "Add Expense",
    daily_overview: "Daily Overview",
    empty: "No transactions yet",
    profile_title: "Profile",
    current_profit: "Current Profit",
    target: "Target",
    earn_more: "Earn",
    earn_more_suffix: "more to unlock",
    badges: "Hall of Fame",
    seeds: "Seeds",
    storage: "Storage",
    care: "Care",
    back: "Back",
    dashboard: "Dashboard",
    next_7_days: "Next 7 Days",
    heat_1: "Temp reaching",
    heat_2: "°C → Irrigate in afternoon",
    heavy_rain_1: "Rain next 3 days",
    heavy_rain_2: "% → Harvest or cover crops now",
    rain_warning: "Rain expected: Do not fertilize",
    humid_warning: "High Humidity: Spray fungicide",
    badge_diamond: "Diamond King (Platinum)",
    badge_gold: "Shonar Krishok (Gold)",
    badge_silver: "Rupali Krishok (Silver)",
    badge_bronze: "Udiyoman (Bronze)",
    badge_struggle: "Struggling",
    profit_100k: "Profit > 100k",
    profit_50k: "Profit > 50k",
    profit_10k: "Profit > 10k",
    Dhaka: "Dhaka",
    Chattogram: "Chattogram",
    Sylhet: "Sylhet",
    Rajshahi: "Rajshahi",
    Khulna: "Khulna",
    Barisal: "Barisal",
    Rangpur: "Rangpur",
    Mymensingh: "Mymensingh",
    community: "Community",
    search_placeholder: "Search username (e.g., rahim)",
    search_btn: "Search",
    contact: "Contact",
    username: "Username",
    friend_profit: "Friend's Profit",
    friend_badge: "Friend's Badge",
    not_found: "Farmer not found"
  }
};

const Dashboard = () => {
  // --- STATE ---
  const [transactions, setTransactions] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("Guest");
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [view, setView] = useState<"dashboard" | "profile" | "community">("dashboard");
  const [lang, setLang] = useState<"bn" | "en">(() => (localStorage.getItem("app_lang") as "bn" | "en") || "bn");
  
  useEffect(() => { localStorage.setItem("app_lang", lang); }, [lang]);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [foundFriend, setFoundFriend] = useState<any>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  
  // Weather State
  const [selectedDivision, setSelectedDivision] = useState("Dhaka");
  const [selectedMetric, setSelectedMetric] = useState<"temp" | "humidity" | "rain" | null>(null);
  const [realWeather, setRealWeather] = useState<any>(null);

  // Form State
  const [activeTab, setActiveTab] = useState<"sell" | "buy">("sell");
  const [buyCategory, setBuyCategory] = useState<"seeds" | "storage" | "care">("seeds");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [itemName, setItemName] = useState(CROPS[0]);
  const [storageType, setStorageType] = useState(STORAGE_TYPES[0]);
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");

  const t = TRANSLATIONS[lang];

  // --- WEATHER FETCHING LOGIC ---
  useEffect(() => {
    const fetchWeather = async () => {
        setRealWeather(null);
        if (WEATHER_API_KEY === "PASTE_YOUR_OPENWEATHER_KEY_HERE") return;
        try {
            const queryCity = selectedDivision === "Chattogram" ? "Chittagong" : selectedDivision;
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${queryCity},BD&units=metric&appid=${WEATHER_API_KEY}`);
            const data = await res.json();
            if (data.cod === 200) {
                const realTemp = Math.round(data.main.temp);
                setRealWeather({
                    temp: realTemp,
                    humidity: data.main.humidity,
                    rain: data.clouds ? data.clouds.all : 20, 
                    forecast: [realTemp, realTemp - 1, realTemp + 2, realTemp, realTemp - 2, realTemp + 1, realTemp]
                });
            }
        } catch (e) { console.error("Weather API failed, using mock", e); }
    };
    fetchWeather();
  }, [selectedDivision]);

  const currentWeather = realWeather || DIVISION_DATA[selectedDivision];

  // --- FINANCIAL ENGINE ---
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpense;
  const isProfit = netProfit >= 0;

  // --- BADGE LOGIC ---
  const getBadgeData = (profit: number) => {
    let current = { name: t.badge_struggle, color: "text-gray-400", bg: "bg-gray-100", icon: <User size={40}/>, next: 10000, nextName: lang === 'bn' ? "সিলভার" : "Silver" };
    if (profit >= 100000) current = { name: t.badge_diamond, color: "text-cyan-500", bg: "bg-cyan-50", icon: <Star size={40} fill="currentColor"/>, next: 1000000, nextName: "Legend" };
    else if (profit >= 50000) current = { name: t.badge_gold, color: "text-yellow-500", bg: "bg-yellow-100", icon: <Trophy size={40} fill="currentColor"/>, next: 100000, nextName: lang === 'bn' ? "প্লাটিনাম" : "Platinum" };
    else if (profit >= 10000) current = { name: t.badge_silver, color: "text-slate-500", bg: "bg-slate-100", icon: <Medal size={40} />, next: 50000, nextName: lang === 'bn' ? "গোল্ড" : "Gold" };
    else if (profit > 0) current = { name: t.badge_bronze, color: "text-orange-600", bg: "bg-orange-100", icon: <Award size={40} />, next: 10000, nextName: lang === 'bn' ? "সিলভার" : "Silver" };
    const progressPercent = Math.min(100, Math.max(5, (profit / current.next) * 100));
    const remaining = current.next - profit;
    return { ...current, progressPercent, remaining };
  };
  const badge = getBadgeData(netProfit);

  // --- INITIAL DATA LOAD ---
  useEffect(() => {
    window.addEventListener('online', () => setIsOffline(false));
    window.addEventListener('offline', () => setIsOffline(true));
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
          setUserId(user.id);
          setUsername(user.email?.split('@')[0] || "User");
          const local = localStorage.getItem("harvest_transactions");
          if (local) setTransactions(JSON.parse(local));
      } else {
          const local = localStorage.getItem("harvest_transactions");
          if (local) setTransactions(JSON.parse(local));
      }
    };
    init();
  }, []);

  const handleAddTransaction = async () => {
    if (!cost) return;
    let details = "";
    let name = itemName;
    if (activeTab === "sell") details = `${weight} Kg Sold`;
    else {
        if (buyCategory === "seeds") details = `${weight} Grams Bought`;
        if (buyCategory === "storage") { name = storageType; details = `${quantity} Units`; }
        if (buyCategory === "care") { name = `${itemName} Care`; details = "Fertilizer/Pesticide"; }
    }
    const newTx = { id: Date.now(), date: date, type: activeTab === "sell" ? "income" : "expense", category: activeTab === "sell" ? "harvest" : buyCategory, name: name, amount: Number(cost), details: details };
    const updated = [newTx, ...transactions];
    setTransactions(updated);
    localStorage.setItem("harvest_transactions", JSON.stringify(updated));
    setCost(""); setWeight(""); setQuantity("");
  };

  const handleSearchFriend = async () => {
      setSearchLoading(true);
      setSearchError("");
      setFoundFriend(null);
      setTimeout(() => {
          const friend = DEMO_FARMERS.find(f => f.username.toLowerCase() === searchQuery.toLowerCase());
          if (friend) {
              const friendBadge = getBadgeData(friend.profit); 
              setFoundFriend({ ...friend, badgeName: friendBadge.name, badgeColor: friendBadge.color });
          } else {
              setSearchError(t.not_found);
          }
          setSearchLoading(false);
      }, 800);
  };

  const handleDelete = async (id: number) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    localStorage.setItem("harvest_transactions", JSON.stringify(updated));
  };

  // 7-DAY FORECAST VIEW
  if (selectedMetric) {
    const titles = { temp: "তাপমাত্রা পূর্বাভাস", humidity: "আর্দ্রতা পূর্বাভাস", rain: "বৃষ্টির সম্ভাবনা" };
    const units = { temp: "°C", humidity: "%", rain: "%" };
    const colors = { temp: "bg-red-500", humidity: "bg-blue-500", rain: "bg-gray-600" };
    const days = Array.from({length: 7}, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d.toLocaleDateString('en-US', { weekday: 'short' }); });
    const forecastData = currentWeather.forecast.map((val: number) => {
        let visualVal = val;
        if (selectedMetric === 'rain') visualVal = Math.max(0, Math.min(100, currentWeather.rain + (Math.random() * 20 - 10)));
        if (selectedMetric === 'humidity') visualVal = Math.max(0, Math.min(100, currentWeather.humidity + (Math.random() * 10 - 5)));
        return Math.floor(visualVal);
    });
    return (
        <div className="min-h-screen bg-white font-['Hind_Siliguri'] p-4 animate-in slide-in-from-right duration-300">
            <button onClick={() => setSelectedMetric(null)} className="flex items-center gap-2 text-gray-600 mb-6 font-bold text-lg p-2 hover:bg-gray-100 rounded-lg w-full"><ArrowLeft /> {t.back}</button>
            <h2 className="text-3xl font-bold text-[#2F5233] mb-2">{titles[selectedMetric]}</h2>
            <p className="text-gray-500 mb-8 flex items-center gap-2"><MapPin size={16}/> {t[selectedDivision] || selectedDivision} • {t.next_7_days}</p>
            <div className="space-y-4">{days.map((day, i) => ( <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} key={i} className="bg-gray-50 p-4 rounded-xl flex items-center gap-4"><span className="w-12 font-bold text-gray-400">{day}</span><div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${forecastData[i]}%` }} className={`h-full ${colors[selectedMetric]}`}/></div><span className="w-12 font-bold text-right">{lang === 'bn' ? toBanglaDigits(forecastData[i]) : forecastData[i]}{units[selectedMetric]}</span></motion.div>))}</div>
             <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-200 text-green-800 text-sm"><strong>পরামর্শ:</strong> {selectedMetric === 'rain' && forecastData[0] > 50 ? "আগামীকাল বৃষ্টির সম্ভাবনা। আজই ফসল তুলুন।" : "আবহাওয়া স্বাভাবিক। নিয়মিত পরিচর্যা করুন।"}</div>
        </div>
    );
  }

  // --- COMMUNITY VIEW ---
  if (view === "community") {
      return (
        <div className="min-h-screen bg-[#F5F7F5] font-['Hind_Siliguri'] pb-20 p-4 animate-in fade-in duration-300">
             <button onClick={() => setView("dashboard")} className="flex items-center gap-2 text-gray-600 mb-6 font-bold text-lg p-2 hover:bg-gray-100 rounded-lg w-full"><ArrowLeft /> {t.dashboard}</button>
            <h2 className="text-2xl font-bold text-[#2F5233] mb-4">{t.community}</h2>
            <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                    <input type="text" placeholder={t.search_placeholder} className="w-full p-3 pl-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    <Search className="absolute left-3 top-3 text-gray-400" size={20}/>
                </div>
                <button onClick={handleSearchFriend} disabled={searchLoading} className="bg-[#2F5233] text-white px-4 rounded-xl font-bold disabled:opacity-50">{searchLoading ? <Loader2 className="animate-spin"/> : t.search_btn}</button>
            </div>
            {searchError && <p className="text-red-500 text-center mb-4">{searchError}</p>}
            {foundFriend && (
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-4 mb-4"><div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-700"><User size={30} /></div><div><h3 className="text-xl font-bold capitalize">{foundFriend.name}</h3><p className="text-sm text-gray-500">@{foundFriend.username}</p></div></div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gray-50 p-3 rounded-xl"><p className="text-xs text-gray-500">{t.contact}</p><p className="font-bold">{foundFriend.contact}</p></div>
                        <div className="bg-gray-50 p-3 rounded-xl"><p className="text-xs text-gray-500">{t.friend_badge}</p><p className={`font-bold ${foundFriend.badgeColor}`}>{foundFriend.badgeName}</p></div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl border border-green-100"><p className="text-sm text-gray-600 mb-1">{t.friend_profit}</p><h2 className="text-3xl font-bold text-[#2F5233]">৳ {formatCurrency(foundFriend.profit, lang)}</h2></div>
                    <button className="w-full mt-4 bg-gray-900 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold"><UserPlus size={18}/> Follow Farmer</button>
                </motion.div>
            )}
        </div>
      );
  }

  // --- PROFILE VIEW ---
  if (view === "profile") {
    return (
        <div className="min-h-screen bg-[#F5F7F5] font-['Hind_Siliguri'] pb-20 p-4 animate-in fade-in duration-300">
             <button onClick={() => setView("dashboard")} className="flex items-center gap-2 text-gray-600 mb-6 font-bold text-lg p-2 hover:bg-gray-100 rounded-lg w-full"><ArrowLeft /> {t.dashboard}</button>
            <div className="bg-white p-6 rounded-3xl shadow-lg text-center mb-6 border border-gray-100 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-2 ${badge.bg}`}></div>
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center mb-4 ${badge.bg} border-4 border-white shadow-2xl relative z-10`}>{badge.icon}</motion.div>
                <h2 className="text-2xl font-bold text-gray-800 capitalize">{username}</h2>
                <div className="flex justify-center gap-4 text-xs text-gray-500 mt-1 mb-2"><span className="flex items-center gap-1"><User size={12}/> @{username}</span></div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mt-2 ${badge.bg} ${badge.color}`}>{badge.name}</div>
                <div className="mt-6 text-left">
                    <div className="flex justify-between text-xs font-bold mb-1"><span className="text-gray-500">{t.current_profit}: ৳{formatCurrency(netProfit, lang)}</span><span className="text-[#2F5233]">{t.target}: ৳{formatCurrency(badge.next, lang)}</span></div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${badge.progressPercent}%` }} className="h-full bg-gradient-to-r from-green-400 to-[#2F5233]" /></div>
                    <p className="text-xs text-center mt-2 text-gray-500"><Zap size={12} className="inline mr-1 text-yellow-500"/>{t.earn_more} <strong>৳{formatCurrency(badge.remaining, lang)}</strong> {t.earn_more_suffix} <span className="font-bold">{badge.nextName}</span>!</p>
                </div>
            </div>
            <h3 className="font-bold text-gray-500 mb-4 flex items-center gap-2"><Trophy size={18}/> {t.badges}</h3>
            <div className="space-y-3">
                 <div className={`p-4 rounded-xl flex items-center gap-4 border ${netProfit >= 100000 ? "bg-cyan-50 border-cyan-200" : "bg-white border-gray-200 opacity-60 grayscale"}`}><div className="bg-cyan-100 p-2 rounded-full"><Star size={24} className={netProfit >= 100000 ? "text-cyan-500" : "text-gray-400"} fill={netProfit >= 100000 ? "currentColor" : "none"}/></div><div className="flex-1"><h4 className="font-bold flex items-center gap-2">{t.badge_diamond} {netProfit < 100000 && <Lock size={12}/>}</h4><p className="text-xs">{t.profit_100k}</p></div></div>
                <div className={`p-4 rounded-xl flex items-center gap-4 border ${netProfit >= 50000 ? "bg-yellow-50 border-yellow-200" : "bg-white border-gray-200 opacity-60 grayscale"}`}><div className="bg-yellow-100 p-2 rounded-full"><Trophy size={24} className={netProfit >= 50000 ? "text-yellow-500" : "text-gray-400"} fill={netProfit >= 50000 ? "currentColor" : "none"}/></div><div className="flex-1"><h4 className="font-bold flex items-center gap-2">{t.badge_gold} {netProfit < 50000 && <Lock size={12}/>}</h4><p className="text-xs">{t.profit_50k}</p></div></div>
                <div className={`p-4 rounded-xl flex items-center gap-4 border ${netProfit >= 10000 ? "bg-slate-50 border-slate-200" : "bg-white border-gray-200 opacity-60 grayscale"}`}><div className="bg-slate-100 p-2 rounded-full"><Medal size={24} className={netProfit >= 10000 ? "text-slate-500" : "text-gray-400"} /></div><div className="flex-1"><h4 className="font-bold flex items-center gap-2">{t.badge_silver} {netProfit < 10000 && <Lock size={12}/>}</h4><p className="text-xs">{t.profit_10k}</p></div></div>
            </div>
        </div>
    );
  }

  // --- MAIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#F5F7F5] font-['Hind_Siliguri'] pb-20">
      <header className="bg-white p-4 sticky top-0 z-10 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-3">
            {/* NEW AESTHETIC LOGO */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-2.5 rounded-2xl border border-green-200 shadow-sm">
                <Sprout size={28} className="text-[#2F5233]" strokeWidth={2.5} />
            </div>
            <div>
                <h1 className="text-xl font-bold text-[#2F5233] leading-tight">{t.app_title}</h1>
                <p className="text-xs text-gray-500 font-medium">{t.sub_title}</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')} className="bg-white border border-gray-300 p-2 rounded-full text-gray-600 hover:bg-gray-100 transition shadow-sm font-bold text-xs">{lang === 'bn' ? 'EN' : 'বাংলা'}</button>
            <button onClick={() => setView("community")} className="bg-white border border-gray-300 p-2 rounded-full text-gray-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition shadow-sm"><Users size={20} /></button>
            <button onClick={() => setView("profile")} className="bg-white border border-gray-300 p-2 rounded-full text-gray-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition relative shadow-sm"><User size={20} />{netProfit > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>}</button>
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold ${isOffline ? 'bg-gray-200 text-gray-600' : 'bg-green-100 text-green-700'}`}><Cloud size={14} />{isOffline ? "Off" : "On"}</div>
        </div>
      </header>

      <div className="p-4 space-y-6 max-w-md mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`rounded-2xl p-6 text-white shadow-lg relative overflow-hidden bg-gradient-to-r ${isProfit ? "from-[#E9D66B] to-[#F4A261]" : "from-red-500 to-red-700"}`}><div className="absolute right-[-20px] top-[-20px] opacity-20"><Wallet size={100} /></div><p className="text-white/90 font-bold mb-1">{isProfit ? t.net_profit : t.net_loss}</p><h2 className="text-4xl font-bold flex items-center gap-2">{isProfit ? "+" : ""} ৳ {formatCurrency(netProfit, lang)}</h2><div className="flex gap-4 mt-4 text-xs font-bold bg-black/10 p-2 rounded-lg inline-flex"><span className="text-white">{t.income}: ৳{formatCurrency(totalIncome, lang)}</span><span className="text-white/70">{t.expense}: ৳{formatCurrency(totalExpense, lang)}</span></div></motion.div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-700 flex items-center gap-2"><Cloud size={20} className="text-blue-500"/> {t.weather}</h3><div className="relative"><span className="font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center gap-1">{t.location} <ChevronDown size={12}/></span><select value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)} className="absolute inset-0 w-full opacity-0">{DIVISIONS.map(div => <option key={div} value={div}>{t[div] || div}</option>)}</select></div></div>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <button onClick={() => setSelectedMetric('temp')} className="w-full text-left bg-red-50 p-3 rounded-xl hover:bg-red-100 transition"><div className="flex items-center gap-2 text-red-500 mb-1"><Thermometer size={16} /> {t.temp}</div><div className="flex justify-between items-end"><p className="text-2xl font-bold text-gray-800">{lang === 'bn' ? toBanglaDigits(currentWeather.temp) : currentWeather.temp}°C</p><ChevronRight size={16} className="text-red-300"/></div></button>
                <button onClick={() => setSelectedMetric('humidity')} className="w-full text-left bg-blue-50 p-3 rounded-xl hover:bg-blue-100 transition"><div className="flex items-center gap-2 text-blue-500 mb-1"><Droplets size={16} /> {t.humidity}</div><div className="flex justify-between items-end"><p className="text-2xl font-bold text-gray-800">{lang === 'bn' ? toBanglaDigits(currentWeather.humidity) : currentWeather.humidity}%</p><ChevronRight size={16} className="text-blue-300"/></div></button>
                <button onClick={() => setSelectedMetric('rain')} className="w-full text-left bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition"><div className="flex items-center gap-2 text-gray-600 mb-1"><Cloud size={16} /> {t.rain}</div><div className="flex justify-between items-end"><p className="text-2xl font-bold text-gray-800">{lang === 'bn' ? toBanglaDigits(currentWeather.rain) : currentWeather.rain}%</p><ChevronRight size={16} className="text-gray-400"/></div></button>
                <div className="bg-orange-50 p-3 rounded-xl relative"><div className="flex items-center gap-2 text-orange-500 mb-1"><MapPin size={16} /> {t.location}</div><p className="text-xl font-bold text-gray-800 truncate">{t[selectedDivision] || selectedDivision}</p><select value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)} className="absolute inset-0 w-full opacity-0">{DIVISIONS.map(div => <option key={div} value={div}>{div}</option>)}</select></div>
            </div>
            {currentWeather.temp >= 36 && <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded-r-lg mb-2 flex items-center gap-3"><div className="text-orange-500">⚠️</div><p className="text-orange-700 font-bold text-sm">{t.heat_1} {lang === 'bn' ? toBanglaDigits(currentWeather.temp) : currentWeather.temp}{t.heat_2}</p></div>}
            {currentWeather.rain >= 80 ? <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg mb-2 flex items-center gap-3"><div className="text-red-500">⛔</div><p className="text-red-700 font-bold text-sm">{t.heavy_rain_1} {lang === 'bn' ? toBanglaDigits(currentWeather.rain) : currentWeather.rain}{t.heavy_rain_2}</p></div> : currentWeather.rain > 50 ? <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg mb-2 flex items-center gap-3"><div className="text-red-500">⛔</div><p className="text-red-700 font-bold text-sm">{t.rain_warning}</p></div> : null}
            {currentWeather.humidity > 80 && currentWeather.rain < 80 && <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded-r-lg mb-2 flex items-center gap-3"><div className="text-orange-500">⚠️</div><p className="text-orange-700 font-bold text-sm">{t.humid_warning}</p></div>}
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-[#2F5233] mb-4">{t.add_transaction}</h3>
            <div className="flex bg-gray-100 p-1 rounded-xl mb-4"><button onClick={() => setActiveTab("sell")} className={`flex-1 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 ${activeTab === "sell" ? "bg-green-600 text-white shadow" : "text-gray-500"}`}><TrendingUp size={16}/> {t.sell_btn}</button><button onClick={() => setActiveTab("buy")} className={`flex-1 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 ${activeTab === "buy" ? "bg-red-500 text-white shadow" : "text-gray-500"}`}><TrendingDown size={16}/> {t.buy_btn}</button></div>
            {activeTab === "buy" && <div className="flex gap-2 mb-4 overflow-x-auto pb-2"><button onClick={() => setBuyCategory("seeds")} className={`px-3 py-1 rounded-full text-xs font-bold border ${buyCategory === "seeds" ? "bg-red-50 border-red-500 text-red-700" : "bg-white border-gray-200"}`}>{t.seeds}</button><button onClick={() => setBuyCategory("storage")} className={`px-3 py-1 rounded-full text-xs font-bold border ${buyCategory === "storage" ? "bg-red-50 border-red-500 text-red-700" : "bg-white border-gray-200"}`}>{t.storage}</button><button onClick={() => setBuyCategory("care")} className={`px-3 py-1 rounded-full text-xs font-bold border ${buyCategory === "care" ? "bg-red-50 border-red-500 text-red-700" : "bg-white border-gray-200"}`}>{t.care}</button></div>}
            <div className="space-y-3">
                <div className="flex flex-col"><label className="text-xs font-bold text-gray-500 mb-1">{t.date}</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"/></div>
                {(activeTab === "sell" || buyCategory === "seeds") && <><select className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" value={itemName} onChange={(e) => setItemName(e.target.value)}>{CROPS.map(c => <option key={c} value={c}>{c}</option>)}</select><input type="number" placeholder={activeTab === "sell" ? t.weight_kg : t.weight_g} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" value={weight} onChange={(e) => setWeight(e.target.value)} /></>}
                {activeTab === "buy" && buyCategory === "storage" && <><select className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" value={storageType} onChange={(e) => setStorageType(e.target.value)}>{STORAGE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}</select><input type="number" placeholder="Quantity" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></>}
                {activeTab === "buy" && buyCategory === "care" && <div className="bg-yellow-50 p-3 rounded-lg text-xs text-yellow-800">Cost for: <strong>{itemName}</strong></div>}
                <input type="number" placeholder={t.cost} className={`w-full p-3 border-2 rounded-xl font-bold ${activeTab === "sell" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`} value={cost} onChange={(e) => setCost(e.target.value)} />
                <button onClick={handleAddTransaction} className={`w-full font-bold py-3 rounded-xl mt-2 text-white shadow-lg ${activeTab === "sell" ? "bg-[#2F5233]" : "bg-red-600"}`}>{activeTab === "sell" ? t.add_income : t.add_expense}</button>
            </div>
        </div>

        <div className="space-y-3">
            <h3 className="font-bold text-gray-500 text-sm">{t.daily_overview}</h3>
            {transactions.length === 0 && <p className="text-center text-gray-400 py-4">{t.empty}</p>}
            {transactions.map((t) => (
                <div key={t.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border-l-4 border-gray-100" style={{ borderLeftColor: t.type === 'income' ? '#16a34a' : '#ef4444' }}>
                    <div className="flex items-center gap-3"><div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{t.category === 'harvest' && <Sprout size={18}/>}{t.category === 'seeds' && <Sprout size={18}/>}{t.category === 'storage' && <Package size={18}/>}{t.category === 'care' && <FlaskConical size={18}/>}</div><div><h4 className="font-bold text-gray-800 text-sm">{t.name}</h4><p className="text-xs text-gray-500">{t.details} • {t.date}</p></div></div>
                    <div className="text-right"><span className={`block font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>{t.type === 'income' ? "+" : "-"} ৳{formatCurrency(t.amount, lang)}</span><button onClick={() => handleDelete(t.id)} className="text-gray-300 hover:text-red-400 mt-1"><Trash2 size={14} /></button></div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
