import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const LANGUAGES = {
  en: { name: "English", nativeName: "English", speechCode: "en-IN" },
  ta: { name: "Tamil", nativeName: "தமிழ்", speechCode: "ta-IN" },
  hi: { name: "Hindi", nativeName: "हिन्दी", speechCode: "hi-IN" },
  te: { name: "Telugu", nativeName: "తెలుగు", speechCode: "te-IN" },
  kn: { name: "Kannada", nativeName: "ಕನ್ನಡ", speechCode: "kn-IN" },
  ml: { name: "Malayalam", nativeName: "മലയാളം", speechCode: "ml-IN" },
};

const translations = {
  en: {
    browse: "Browse",
    orders: "My Orders",
    plans: "Plans",
    dashboard: "Dashboard",
    listings: "Listings",
    analytics: "Analytics",
    users: "Users",
    signIn: "Sign in",
    signOut: "Sign out",
    language: "Language",
    voiceAssistant: "AgriLink Voice Assistant",
    speak: "Speak",
    listening: "Listening…",
    stop: "Stop",
    ask: "Ask AgriLink",
    typeMessage: "Type your question…",
    send: "Send",
    clear: "Clear",
    assistantHint: "Ask about crops, listings, orders, prices, or how to use AgriLink.",
    browserSupport: "Voice input is not supported by this browser. You can still type your question.",
    thinking: "Thinking…",
    voiceOutput: "Voice output",
  },
  ta: {
    browse: "பொருட்களைப் பார்க்க",
    orders: "என் ஆர்டர்கள்",
    plans: "திட்டங்கள்",
    dashboard: "டாஷ்போர்டு",
    listings: "பட்டியல்கள்",
    analytics: "பகுப்பாய்வு",
    users: "பயனர்கள்",
    signIn: "உள்நுழை",
    signOut: "வெளியேறு",
    language: "மொழி",
    voiceAssistant: "AgriLink குரல் உதவியாளர்",
    speak: "பேசுங்கள்",
    listening: "கேட்கிறது…",
    stop: "நிறுத்து",
    ask: "AgriLink-ஐ கேளுங்கள்",
    typeMessage: "உங்கள் கேள்வியை எழுதுங்கள்…",
    send: "அனுப்பு",
    clear: "அழி",
    assistantHint: "பயிர்கள், பட்டியல்கள், ஆர்டர்கள், விலைகள் அல்லது AgriLink பயன்பாடு பற்றி கேளுங்கள்.",
    browserSupport: "இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை. நீங்கள் கேள்வியைத் தட்டச்சு செய்யலாம்.",
    thinking: "சிந்திக்கிறது…",
    voiceOutput: "குரல் வெளியீடு",
  },
  hi: {
    browse: "ब्राउज़ करें",
    orders: "मेरे ऑर्डर",
    plans: "प्लान",
    dashboard: "डैशबोर्ड",
    listings: "लिस्टिंग",
    analytics: "विश्लेषण",
    users: "उपयोगकर्ता",
    signIn: "साइन इन",
    signOut: "साइन आउट",
    language: "भाषा",
    voiceAssistant: "AgriLink वॉइस असिस्टेंट",
    speak: "बोलें",
    listening: "सुन रहा है…",
    stop: "रोकें",
    ask: "AgriLink से पूछें",
    typeMessage: "अपना सवाल लिखें…",
    send: "भेजें",
    clear: "साफ़ करें",
    assistantHint: "फसलों, लिस्टिंग, ऑर्डर, कीमतों या AgriLink के उपयोग के बारे में पूछें।",
    browserSupport: "इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है। आप अपना सवाल टाइप कर सकते हैं।",
    thinking: "सोच रहा है…",
    voiceOutput: "वॉइस आउटपुट",
  },
  te: {
    browse: "బ్రౌజ్",
    orders: "నా ఆర్డర్లు",
    plans: "ప్లాన్లు",
    dashboard: "డ్యాష్‌బోర్డ్",
    listings: "లిస్టింగ్స్",
    analytics: "విశ్లేషణ",
    users: "వినియోగదారులు",
    signIn: "సైన్ ఇన్",
    signOut: "సైన్ అవుట్",
    language: "భాష",
    voiceAssistant: "AgriLink వాయిస్ అసిస్టెంట్",
    speak: "మాట్లాడండి",
    listening: "వింటోంది…",
    stop: "ఆపు",
    ask: "AgriLinkని అడగండి",
    typeMessage: "మీ ప్రశ్నను టైప్ చేయండి…",
    send: "పంపండి",
    clear: "క్లియర్",
    assistantHint: "పంటలు, లిస్టింగ్స్, ఆర్డర్లు, ధరలు లేదా AgriLink వినియోగం గురించి అడగండి.",
    browserSupport: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ లేదు. మీరు ప్రశ్నను టైప్ చేయవచ్చు.",
    thinking: "ఆలోచిస్తోంది…",
    voiceOutput: "వాయిస్ అవుట్‌పుట్",
  },
  kn: {
    browse: "ಬ್ರೌಸ್",
    orders: "ನನ್ನ ಆರ್ಡರ್‌ಗಳು",
    plans: "ಪ್ಲಾನ್‌ಗಳು",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    listings: "ಲಿಸ್ಟಿಂಗ್‌ಗಳು",
    analytics: "ವಿಶ್ಲೇಷಣೆ",
    users: "ಬಳಕೆದಾರರು",
    signIn: "ಸೈನ್ ಇನ್",
    signOut: "ಸೈನ್ ಔಟ್",
    language: "ಭಾಷೆ",
    voiceAssistant: "AgriLink ಧ್ವನಿ ಸಹಾಯಕ",
    speak: "ಮಾತನಾಡಿ",
    listening: "ಕೇಳುತ್ತಿದೆ…",
    stop: "ನಿಲ್ಲಿಸಿ",
    ask: "AgriLink ಅನ್ನು ಕೇಳಿ",
    typeMessage: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ…",
    send: "ಕಳುಹಿಸಿ",
    clear: "ಅಳಿಸಿ",
    assistantHint: "ಬೆಳೆಗಳು, ಲಿಸ್ಟಿಂಗ್‌ಗಳು, ಆರ್ಡರ್‌ಗಳು, ಬೆಲೆಗಳು ಅಥವಾ AgriLink ಬಳಕೆಯ ಬಗ್ಗೆ ಕೇಳಿ.",
    browserSupport: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲವಿಲ್ಲ. ನೀವು ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಬಹುದು.",
    thinking: "ಯೋಚಿಸುತ್ತಿದೆ…",
    voiceOutput: "ಧ್ವನಿ ಔಟ್‌ಪುಟ್",
  },
  ml: {
    browse: "ബ്രൗസ്",
    orders: "എന്റെ ഓർഡറുകൾ",
    plans: "പ്ലാനുകൾ",
    dashboard: "ഡാഷ്ബോർഡ്",
    listings: "ലിസ്റ്റിംഗുകൾ",
    analytics: "വിശകലനം",
    users: "ഉപയോക്താക്കൾ",
    signIn: "സൈൻ ഇൻ",
    signOut: "സൈൻ ഔട്ട്",
    language: "ഭാഷ",
    voiceAssistant: "AgriLink വോയ്സ് അസിസ്റ്റന്റ്",
    speak: "സംസാരിക്കുക",
    listening: "കേൾക്കുന്നു…",
    stop: "നിർത്തുക",
    ask: "AgriLink-നോട് ചോദിക്കുക",
    typeMessage: "നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക…",
    send: "അയയ്ക്കുക",
    clear: "മായ്ക്കുക",
    assistantHint: "വിളകൾ, ലിസ്റ്റിംഗുകൾ, ഓർഡറുകൾ, വിലകൾ അല്ലെങ്കിൽ AgriLink ഉപയോഗം സംബന്ധിച്ച് ചോദിക്കുക.",
    browserSupport: "ഈ ബ്രൗസറിൽ വോയ്സ് ഇൻപുട്ട് പിന്തുണയ്ക്കുന്നില്ല. നിങ്ങൾക്ക് ചോദ്യം ടൈപ്പ് ചെയ്യാം.",
    thinking: "ചിന്തിക്കുന്നു…",
    voiceOutput: "വോയ്സ് ഔട്ട്പുട്ട്",
  },
};



// The application has many pages/components. Keep a single page-wide dictionary so
// changing the language also updates labels that are not rendered through t().
const PAGE_TRANSLATIONS = {
  ta: {
    "Browse": "பார்க்க", "My Orders": "என் ஆர்டர்கள்", "Plans": "திட்டங்கள்", "Dashboard": "டாஷ்போர்டு", "Listings": "பட்டியல்கள்", "Orders": "ஆர்டர்கள்", "Analytics": "பகுப்பாய்வு", "Users": "பயனர்கள்", "Sign in": "உள்நுழை", "Sign out": "வெளியேறு", "Create an account": "கணக்கை உருவாக்கு", "Create account": "கணக்கை உருவாக்கு", "Welcome to AgriLink": "AgriLink-க்கு வரவேற்கிறோம்", "Get started": "தொடங்குங்கள்", "Full name": "முழுப் பெயர்", "Email": "மின்னஞ்சல்", "Password": "கடவுச்சொல்", "Region": "பகுதி", "Phone": "தொலைபேசி", "I am a": "நான் ஒரு", "Buyer — I want to order produce": "வாங்குபவர் — விளைபொருட்களை ஆர்டர் செய்ய விரும்புகிறேன்", "Farmer — I want to sell my harvest": "விவசாயி — எனது விளைபொருட்களை விற்க விரும்புகிறேன்", "At least 8 characters.": "குறைந்தது 8 எழுத்துகள்.", "Browse produce": "விளைபொருட்களைப் பார்க்க", "Search": "தேடல்", "Category": "வகை", "All categories": "அனைத்து வகைகளும்", "Grains": "தானியங்கள்", "Vegetables": "காய்கறிகள்", "Fruits": "பழங்கள்", "Tubers": "கிழங்குகள்", "Legumes": "பருப்பு வகைகள்", "Spices": "மசாலா வகைகள்", "Other": "மற்றவை", "Search title, crop, description…": "தலைப்பு, பயிர், விளக்கம் தேடுங்கள்…", "Min price": "குறைந்த விலை", "Max price": "அதிகபட்ச விலை", "Organic only": "ஆர்கானிக் மட்டும்", "Sort": "வரிசைப்படுத்து", "Featured first": "முன்னிலைப்படுத்தப்பட்டவை முதலில்", "Newest": "புதியவை முதலில்", "Most stock": "அதிக இருப்பு", "Clear filters": "வடிகட்டிகளை அழி", "No listings match your filters": "உங்கள் வடிகட்டிகளுக்கு பொருந்தும் பட்டியல்கள் இல்லை", "Try clearing some filters or browsing a different region.": "சில வடிகட்டிகளை நீக்கி அல்லது வேறு பகுதியைத் தேர்ந்தெடுத்து முயற்சிக்கவும்.", "Place order": "ஆர்டர் செய்யுங்கள்", "Quantity": "அளவு", "Subtotal": "கூட்டுத்தொகை", "Platform commission applied at acceptance": "ஆர்டர் ஏற்கப்படும் போது தளக் கமிஷன் பொருந்தும்", "Note to farmer (optional)": "விவசாயிக்கான குறிப்பு (விருப்பம்)", "Delivery preferences, packaging, etc.": "டெலிவரி விருப்பங்கள், பேக்கேஜிங் போன்றவை.", "Cancel": "ரத்து செய்", "Order": "ஆர்டர்", "Edit": "திருத்து", "Delete": "நீக்கு", "Organic": "ஆர்கானிக்", "Verified": "சரிபார்க்கப்பட்டது", "Featured": "முன்னிலை", "Sold out": "விற்றுத் தீர்ந்தது", "Stock:": "இருப்பு:", "by": "மூலம்", "No description provided.": "விளக்கம் வழங்கப்படவில்லை.", "My listings": "என் பட்டியல்கள்", "Publish, edit and manage your farm store.": "உங்கள் பண்ணைக் கடையை வெளியிட்டு, திருத்தி நிர்வகிக்கவும்.", "No listings yet": "இன்னும் பட்டியல்கள் இல்லை", "Publish your first listing to start receiving orders.": "ஆர்டர்களைப் பெற உங்கள் முதல் பட்டியலை வெளியிடுங்கள்.", "Create listing": "பட்டியலை உருவாக்கு", "New listing": "புதிய பட்டியல்", "Edit listing": "பட்டியலைத் திருத்து", "Title *": "தலைப்பு *", "Crop *": "பயிர் *", "Variety": "வகை/ரகம்", "Unit": "அலகு", "Price per unit *": "ஒரு அலகின் விலை *", "Stock *": "இருப்பு *", "Harvest date": "அறுவடை தேதி", "Description": "விளக்கம்", "Certified organic": "சான்றளிக்கப்பட்ட ஆர்கானிக்", "Listing image (optional)": "பட்டியல் படம் (விருப்பம்)", "Current image will be kept.": "தற்போதைய படம் வைத்துக்கொள்ளப்படும்.", "Save changes": "மாற்றங்களைச் சேமி", "Publish listing": "பட்டியலை வெளியிடு", "Saving…": "சேமிக்கிறது…", "Incoming orders": "வரும் ஆர்டர்கள்", "Accept, decline and mark deliveries.": "ஆர்டர்களை ஏற்று, நிராகரித்து, டெலிவரிகளை குறிக்கவும்.", "No orders match": "பொருந்தும் ஆர்டர்கள் இல்லை", "My orders": "என் ஆர்டர்கள்", "Track requests you've placed and their status.": "நீங்கள் செய்த ஆர்டர்களையும் அவற்றின் நிலையும் கண்காணிக்கவும்.", "No orders yet": "இன்னும் ஆர்டர்கள் இல்லை", "Revenue": "வருவாய்", "Gross revenue": "மொத்த வருவாய்", "Commission": "கமிஷன்", "Net revenue": "நிகர வருவாய்", "Order status": "ஆர்டர் நிலை", "Listing status": "பட்டியல் நிலை", "Top crops by revenue": "வருவாய் அடிப்படையில் முன்னணி பயிர்கள்", "Analytics": "பகுப்பாய்வு", "Loading…": "ஏற்றுகிறது…", "Loading dashboard…": "டாஷ்போர்டை ஏற்றுகிறது…", "Loading analytics…": "பகுப்பாய்வை ஏற்றுகிறது…", "Platform dashboard": "தள டாஷ்போர்டு", "Total users": "மொத்த பயனர்கள்", "Total listings": "மொத்த பட்டியல்கள்", "Gross GMV": "மொத்த GMV", "Commission earned": "பெற்ற கமிஷன்", "Farmers": "விவசாயிகள்", "Buyers": "வாங்குபவர்கள்", "Admins": "நிர்வாகிகள்", "Suspended": "இடைநிறுத்தப்பட்டது", "Active": "செயலில்", "Paused": "இடைநிறுத்தப்பட்டது", "Sold out": "விற்றுத் தீர்ந்தது", "All statuses": "அனைத்து நிலைகளும்", "All verification": "அனைத்து சரிபார்ப்புகளும்", "Verified only": "சரிபார்க்கப்பட்டவை மட்டும்", "Unverified only": "சரிபார்க்கப்படாதவை மட்டும்", "Clear filters": "வடிகட்டிகளை அழி", "Manage users →": "பயனர்களை நிர்வகி →", "Manage listings →": "பட்டியல்களை நிர்வகி →", "Name": "பெயர்", "Role": "பங்கு", "Plan": "திட்டம்", "Status": "நிலை", "Actions": "செயல்கள்", "All roles": "அனைத்து பங்குகளும்", "Search by name or email…": "பெயர் அல்லது மின்னஞ்சல் மூலம் தேடுங்கள்…", "Most popular": "மிகவும் பிரபலமானது", "Choose your plan": "உங்கள் திட்டத்தைத் தேர்ந்தெடுக்கவும்", "Priority placement:": "முன்னுரிமை இடம்:", "Max listings:": "அதிகபட்ச பட்டியல்கள்:", "Commission:": "கமிஷன்:", "subscribe": "சந்தா பெறுங்கள்", "Prev": "முந்தைய", "Next": "அடுத்தது", "Page": "பக்கம்", "of": "இல்", "Retry": "மீண்டும் முயற்சி", "Could not load listings": "பட்டியல்களை ஏற்ற முடியவில்லை", "Could not load orders": "ஆர்டர்களை ஏற்ற முடியவில்லை", "Could not load users": "பயனர்களை ஏற்ற முடியவில்லை", "Could not load analytics": "பகுப்பாய்வை ஏற்ற முடியவில்லை", "Registration failed": "பதிவு தோல்வியடைந்தது", "Login failed": "உள்நுழைவு தோல்வியடைந்தது"
  },
  hi: {
    "Browse": "ब्राउज़ करें", "My Orders": "मेरे ऑर्डर", "Plans": "प्लान", "Dashboard": "डैशबोर्ड", "Listings": "लिस्टिंग", "Orders": "ऑर्डर", "Analytics": "विश्लेषण", "Users": "उपयोगकर्ता", "Sign in": "साइन इन", "Sign out": "साइन आउट", "Create an account": "खाता बनाएं", "Create account": "खाता बनाएं", "Welcome to AgriLink": "AgriLink में आपका स्वागत है", "Get started": "शुरू करें", "Full name": "पूरा नाम", "Email": "ईमेल", "Password": "पासवर्ड", "Region": "क्षेत्र", "Phone": "फ़ोन", "I am a": "मैं हूँ", "Buyer — I want to order produce": "खरीदार — मैं उपज ऑर्डर करना चाहता हूँ", "Farmer — I want to sell my harvest": "किसान — मैं अपनी उपज बेचना चाहता हूँ", "At least 8 characters.": "कम से कम 8 अक्षर।", "Browse produce": "उपज ब्राउज़ करें", "Search": "खोजें", "Category": "श्रेणी", "All categories": "सभी श्रेणियां", "Grains": "अनाज", "Vegetables": "सब्जियां", "Fruits": "फल", "Tubers": "कंद", "Legumes": "दलहन", "Spices": "मसाले", "Other": "अन्य", "Search title, crop, description…": "शीर्षक, फसल, विवरण खोजें…", "Min price": "न्यूनतम कीमत", "Max price": "अधिकतम कीमत", "Organic only": "केवल जैविक", "Sort": "क्रम", "Featured first": "फीचर्ड पहले", "Newest": "नवीनतम", "Most stock": "सबसे अधिक स्टॉक", "Clear filters": "फ़िल्टर साफ़ करें", "No listings match your filters": "आपके फ़िल्टर से कोई लिस्टिंग मेल नहीं खाती", "Try clearing some filters or browsing a different region.": "कुछ फ़िल्टर हटाकर या दूसरा क्षेत्र चुनकर देखें।", "Place order": "ऑर्डर करें", "Quantity": "मात्रा", "Subtotal": "उप-योग", "Cancel": "रद्द करें", "Order": "ऑर्डर", "Edit": "संपादित करें", "Delete": "हटाएं", "Organic": "जैविक", "Verified": "सत्यापित", "Featured": "फीचर्ड", "Sold out": "बिक चुका", "Stock:": "स्टॉक:", "My listings": "मेरी लिस्टिंग", "No listings yet": "अभी कोई लिस्टिंग नहीं", "Create listing": "लिस्टिंग बनाएं", "New listing": "नई लिस्टिंग", "Edit listing": "लिस्टिंग संपादित करें", "Title *": "शीर्षक *", "Crop *": "फसल *", "Variety": "किस्म", "Unit": "इकाई", "Price per unit *": "प्रति इकाई कीमत *", "Stock *": "स्टॉक *", "Harvest date": "कटाई की तारीख", "Description": "विवरण", "Certified organic": "प्रमाणित जैविक", "Save changes": "परिवर्तन सहेजें", "Publish listing": "लिस्टिंग प्रकाशित करें", "Saving…": "सहेज रहा है…", "Incoming orders": "आने वाले ऑर्डर", "No orders match": "कोई ऑर्डर मेल नहीं खाता", "My orders": "मेरे ऑर्डर", "No orders yet": "अभी कोई ऑर्डर नहीं", "Revenue": "राजस्व", "Gross revenue": "सकल राजस्व", "Commission": "कमीशन", "Net revenue": "शुद्ध राजस्व", "Order status": "ऑर्डर स्थिति", "Listing status": "लिस्टिंग स्थिति", "Platform dashboard": "प्लेटफ़ॉर्म डैशबोर्ड", "Total users": "कुल उपयोगकर्ता", "Total listings": "कुल लिस्टिंग", "Gross GMV": "कुल GMV", "Commission earned": "अर्जित कमीशन", "Farmers": "किसान", "Buyers": "खरीदार", "Admins": "व्यवस्थापक", "Suspended": "निलंबित", "Active": "सक्रिय", "Paused": "रुका हुआ", "Sold out": "बिक चुका", "All statuses": "सभी स्थितियां", "All verification": "सभी सत्यापन", "Verified only": "केवल सत्यापित", "Unverified only": "केवल असत्यापित", "All roles": "सभी भूमिकाएं", "Search by name or email…": "नाम या ईमेल से खोजें…", "Choose your plan": "अपना प्लान चुनें", "Most popular": "सबसे लोकप्रिय", "Max listings:": "अधिकतम लिस्टिंग:", "Commission:": "कमीशन:", "Priority placement:": "प्राथमिकता स्थान:", "Page": "पृष्ठ", "of": "में", "Prev": "पिछला", "Next": "अगला", "Registration failed": "पंजीकरण विफल", "Login failed": "लॉगिन विफल", "Could not load listings": "लिस्टिंग लोड नहीं हो सकीं"
  },
  te: {
    "Browse": "బ్రౌజ్", "My Orders": "నా ఆర్డర్లు", "Plans": "ప్లాన్లు", "Dashboard": "డ్యాష్‌బోర్డ్", "Listings": "లిస్టింగ్స్", "Orders": "ఆర్డర్లు", "Analytics": "విశ్లేషణ", "Users": "వినియోగదారులు", "Sign in": "సైన్ ఇన్", "Sign out": "సైన్ అవుట్", "Create an account": "ఖాతా సృష్టించండి", "Create account": "ఖాతా సృష్టించండి", "Welcome to AgriLink": "AgriLink కు స్వాగతం", "Get started": "ప్రారంభించండి", "Full name": "పూర్తి పేరు", "Email": "ఇమెయిల్", "Password": "పాస్‌వర్డ్", "Region": "ప్రాంతం", "Phone": "ఫోన్", "I am a": "నేను", "Browse produce": "ఉత్పత్తులను బ్రౌజ్ చేయండి", "Search": "శోధన", "Category": "వర్గం", "All categories": "అన్ని వర్గాలు", "Grains": "ధాన్యాలు", "Vegetables": "కూరగాయలు", "Fruits": "పండ్లు", "Tubers": "దుంపలు", "Legumes": "పప్పుధాన్యాలు", "Spices": "మసాలాలు", "Other": "ఇతర", "Search title, crop, description…": "శీర్షిక, పంట, వివరణ శోధించండి…", "Min price": "కనిష్ట ధర", "Max price": "గరిష్ట ధర", "Organic only": "సేంద్రియ మాత్రమే", "Sort": "క్రమం", "Featured first": "ఫీచర్డ్ మొదట", "Newest": "కొత్తవి", "Most stock": "అధిక స్టాక్", "Clear filters": "ఫిల్టర్లను క్లియర్ చేయండి", "No listings match your filters": "మీ ఫిల్టర్లకు లిస్టింగ్స్ లేవు", "Place order": "ఆర్డర్ చేయండి", "Quantity": "పరిమాణం", "Subtotal": "ఉప మొత్తం", "Cancel": "రద్దు", "Order": "ఆర్డర్", "Edit": "సవరించు", "Delete": "తొలగించు", "Organic": "సేంద్రియ", "Verified": "ధృవీకరించబడింది", "Featured": "ఫీచర్డ్", "Sold out": "అమ్ముడైంది", "Stock:": "స్టాక్:", "My listings": "నా లిస్టింగ్స్", "No listings yet": "ఇంకా లిస్టింగ్స్ లేవు", "Create listing": "లిస్టింగ్ సృష్టించండి", "New listing": "కొత్త లిస్టింగ్", "Edit listing": "లిస్టింగ్ సవరించండి", "Title *": "శీర్షిక *", "Crop *": "పంట *", "Variety": "రకం", "Unit": "యూనిట్", "Price per unit *": "యూనిట్ ధర *", "Stock *": "స్టాక్ *", "Harvest date": "పంట కోత తేదీ", "Description": "వివరణ", "Certified organic": "ధృవీకరించిన సేంద్రియ", "Save changes": "మార్పులను సేవ్ చేయండి", "Publish listing": "లిస్టింగ్ ప్రచురించండి", "Saving…": "సేవ్ చేస్తోంది…", "Incoming orders": "వచ్చిన ఆర్డర్లు", "No orders match": "ఆర్డర్లు లేవు", "My orders": "నా ఆర్డర్లు", "No orders yet": "ఇంకా ఆర్డర్లు లేవు", "Revenue": "ఆదాయం", "Gross revenue": "మొత్తం ఆదాయం", "Commission": "కమీషన్", "Net revenue": "నికర ఆదాయం", "Order status": "ఆర్డర్ స్థితి", "Listing status": "లిస్టింగ్ స్థితి", "Platform dashboard": "ప్లాట్‌ఫారమ్ డ్యాష్‌బోర్డ్", "Total users": "మొత్తం వినియోగదారులు", "Total listings": "మొత్తం లిస్టింగ్స్", "Gross GMV": "మొత్తం GMV", "Commission earned": "పొందిన కమీషన్", "Farmers": "రైతులు", "Buyers": "కొనుగోలుదారులు", "Admins": "అడ్మిన్లు", "Suspended": "సస్పెండ్ చేయబడింది", "Active": "యాక్టివ్", "Paused": "పాజ్డ్", "All statuses": "అన్ని స్థితులు", "All verification": "అన్ని ధృవీకరణలు", "Verified only": "ధృవీకరించినవి మాత్రమే", "Unverified only": "ధృవీకరించనివి మాత్రమే", "All roles": "అన్ని పాత్రలు", "Search by name or email…": "పేరు లేదా ఇమెయిల్‌తో శోధించండి…", "Choose your plan": "మీ ప్లాన్ ఎంచుకోండి", "Most popular": "అత్యంత ప్రజాదరణ", "Page": "పేజీ", "of": "లో", "Prev": "మునుపటి", "Next": "తర్వాత", "Registration failed": "రిజిస్ట్రేషన్ విఫలమైంది", "Login failed": "లాగిన్ విఫలమైంది", "Could not load listings": "లిస్టింగ్స్ లోడ్ కాలేదు"
  },
  kn: {
    "Browse": "ಬ್ರೌಸ್", "My Orders": "ನನ್ನ ಆರ್ಡರ್‌ಗಳು", "Plans": "ಪ್ಲಾನ್‌ಗಳು", "Dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", "Listings": "ಲಿಸ್ಟಿಂಗ್‌ಗಳು", "Orders": "ಆರ್ಡರ್‌ಗಳು", "Analytics": "ವಿಶ್ಲೇಷಣೆ", "Users": "ಬಳಕೆದಾರರು", "Sign in": "ಸೈನ್ ಇನ್", "Sign out": "ಸೈನ್ ಔಟ್", "Create an account": "ಖಾತೆ ರಚಿಸಿ", "Create account": "ಖಾತೆ ರಚಿಸಿ", "Welcome to AgriLink": "AgriLink ಗೆ ಸ್ವಾಗತ", "Get started": "ಪ್ರಾರಂಭಿಸಿ", "Full name": "ಪೂರ್ಣ ಹೆಸರು", "Email": "ಇಮೇಲ್", "Password": "ಪಾಸ್‌ವರ್ಡ್", "Region": "ಪ್ರದೇಶ", "Phone": "ಫೋನ್", "Browse produce": "ಉತ್ಪನ್ನಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ", "Search": "ಹುಡುಕಿ", "Category": "ವರ್ಗ", "All categories": "ಎಲ್ಲಾ ವರ್ಗಗಳು", "Grains": "ಧಾನ್ಯಗಳು", "Vegetables": "ತರಕಾರಿಗಳು", "Fruits": "ಹಣ್ಣುಗಳು", "Tubers": "ಗೆಡ್ಡೆಗಳು", "Legumes": "ಬೇಳೆಕಾಳುಗಳು", "Spices": "ಮಸಾಲೆಗಳು", "Other": "ಇತರೆ", "Search title, crop, description…": "ಶೀರ್ಷಿಕೆ, ಬೆಳೆ, ವಿವರಣೆ ಹುಡುಕಿ…", "Min price": "ಕನಿಷ್ಠ ಬೆಲೆ", "Max price": "ಗರಿಷ್ಠ ಬೆಲೆ", "Organic only": "ಸಾವಯವ ಮಾತ್ರ", "Sort": "ವಿಂಗಡಿಸಿ", "Featured first": "ಮುಖ್ಯವಾದವು ಮೊದಲು", "Newest": "ಹೊಸದವು", "Most stock": "ಹೆಚ್ಚು ಸ್ಟಾಕ್", "Clear filters": "ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ", "No listings match your filters": "ನಿಮ್ಮ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಯಾವುದೇ ಲಿಸ್ಟಿಂಗ್ ಇಲ್ಲ", "Place order": "ಆರ್ಡರ್ ಮಾಡಿ", "Quantity": "ಪ್ರಮಾಣ", "Subtotal": "ಉಪ ಮೊತ್ತ", "Cancel": "ರದ್ದು", "Order": "ಆರ್ಡರ್", "Edit": "ತಿದ್ದು", "Delete": "ಅಳಿಸಿ", "Organic": "ಸಾವಯವ", "Verified": "ಪರಿಶೀಲಿಸಲಾಗಿದೆ", "Featured": "ಮುಖ್ಯ", "Sold out": "ಮಾರಾಟವಾಗಿದೆ", "Stock:": "ಸ್ಟಾಕ್:", "My listings": "ನನ್ನ ಲಿಸ್ಟಿಂಗ್‌ಗಳು", "No listings yet": "ಇನ್ನೂ ಲಿಸ್ಟಿಂಗ್‌ಗಳಿಲ್ಲ", "Create listing": "ಲಿಸ್ಟಿಂಗ್ ರಚಿಸಿ", "New listing": "ಹೊಸ ಲಿಸ್ಟಿಂಗ್", "Edit listing": "ಲಿಸ್ಟಿಂಗ್ ತಿದ್ದು", "Title *": "ಶೀರ್ಷಿಕೆ *", "Crop *": "ಬೆಳೆ *", "Variety": "ತಳಿ", "Unit": "ಘಟಕ", "Price per unit *": "ಪ್ರತಿ ಘಟಕದ ಬೆಲೆ *", "Stock *": "ಸ್ಟಾಕ್ *", "Harvest date": "ಕೊಯ್ಲು ದಿನಾಂಕ", "Description": "ವಿವರಣೆ", "Certified organic": "ಪ್ರಮಾಣಿತ ಸಾವಯವ", "Save changes": "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ", "Publish listing": "ಲಿಸ್ಟಿಂಗ್ ಪ್ರಕಟಿಸಿ", "Saving…": "ಉಳಿಸಲಾಗುತ್ತಿದೆ…", "Incoming orders": "ಬಂದಿರುವ ಆರ್ಡರ್‌ಗಳು", "No orders match": "ಯಾವುದೇ ಆರ್ಡರ್ ಇಲ್ಲ", "My orders": "ನನ್ನ ಆರ್ಡರ್‌ಗಳು", "No orders yet": "ಇನ್ನೂ ಆರ್ಡರ್‌ಗಳಿಲ್ಲ", "Revenue": "ಆದಾಯ", "Gross revenue": "ಒಟ್ಟು ಆದಾಯ", "Commission": "ಕಮಿಷನ್", "Net revenue": "ನಿವ್ವಳ ಆದಾಯ", "Order status": "ಆರ್ಡರ್ ಸ್ಥಿತಿ", "Listing status": "ಲಿಸ್ಟಿಂಗ್ ಸ್ಥಿತಿ", "Platform dashboard": "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", "Total users": "ಒಟ್ಟು ಬಳಕೆದಾರರು", "Total listings": "ಒಟ್ಟು ಲಿಸ್ಟಿಂಗ್‌ಗಳು", "Gross GMV": "ಒಟ್ಟು GMV", "Commission earned": "ಪಡೆದ ಕಮಿಷನ್", "Farmers": "ರೈತರು", "Buyers": "ಖರೀದಿದಾರರು", "Admins": "ನಿರ್ವಾಹಕರು", "Suspended": "ಅಮಾನತುಗೊಂಡ", "Active": "ಸಕ್ರಿಯ", "Paused": "ವಿರಾಮ", "All statuses": "ಎಲ್ಲಾ ಸ್ಥಿತಿಗಳು", "All verification": "ಎಲ್ಲಾ ಪರಿಶೀಲನೆ", "Verified only": "ಪರಿಶೀಲಿಸಿದವು ಮಾತ್ರ", "Unverified only": "ಪರಿಶೀಲಿಸದವು ಮಾತ್ರ", "All roles": "ಎಲ್ಲಾ ಪಾತ್ರಗಳು", "Search by name or email…": "ಹೆಸರು ಅಥವಾ ಇಮೇಲ್ ಮೂಲಕ ಹುಡುಕಿ…", "Choose your plan": "ನಿಮ್ಮ ಪ್ಲಾನ್ ಆಯ್ಕೆಮಾಡಿ", "Most popular": "ಅತ್ಯಂತ ಜನಪ್ರಿಯ", "Page": "ಪುಟ", "of": "ರಲ್ಲಿ", "Prev": "ಹಿಂದಿನ", "Next": "ಮುಂದಿನ", "Registration failed": "ನೋಂದಣಿ ವಿಫಲವಾಗಿದೆ", "Login failed": "ಲಾಗಿನ್ ವಿಫಲವಾಗಿದೆ", "Could not load listings": "ಲಿಸ್ಟಿಂಗ್‌ಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ"
  },
  ml: {
    "Browse": "ബ്രൗസ്", "My Orders": "എന്റെ ഓർഡറുകൾ", "Plans": "പ്ലാനുകൾ", "Dashboard": "ഡാഷ്ബോർഡ്", "Listings": "ലിസ്റ്റിംഗുകൾ", "Orders": "ഓർഡറുകൾ", "Analytics": "വിശകലനം", "Users": "ഉപയോക്താക്കൾ", "Sign in": "സൈൻ ഇൻ", "Sign out": "സൈൻ ഔട്ട്", "Create an account": "അക്കൗണ്ട് സൃഷ്ടിക്കുക", "Create account": "അക്കൗണ്ട് സൃഷ്ടിക്കുക", "Welcome to AgriLink": "AgriLink-ലേക്ക് സ്വാഗതം", "Get started": "തുടങ്ങുക", "Full name": "പൂർണ്ണ പേര്", "Email": "ഇമെയിൽ", "Password": "പാസ്‌വേഡ്", "Region": "പ്രദേശം", "Phone": "ഫോൺ", "Browse produce": "ഉൽപ്പന്നങ്ങൾ ബ്രൗസ് ചെയ്യുക", "Search": "തിരയുക", "Category": "വിഭാഗം", "All categories": "എല്ലാ വിഭാഗങ്ങളും", "Grains": "ധാന്യങ്ങൾ", "Vegetables": "പച്ചക്കറികൾ", "Fruits": "പഴങ്ങൾ", "Tubers": "കിഴങ്ങുകൾ", "Legumes": "പയർവർഗങ്ങൾ", "Spices": "മസാലകൾ", "Other": "മറ്റുള്ളവ", "Search title, crop, description…": "ശീർഷകം, വിള, വിവരണം തിരയുക…", "Min price": "കുറഞ്ഞ വില", "Max price": "പരമാവധി വില", "Organic only": "ഓർഗാനിക് മാത്രം", "Sort": "ക്രമീകരിക്കുക", "Featured first": "ഫീച്ചർഡ് ആദ്യം", "Newest": "പുതിയത്", "Most stock": "ഏറ്റവും കൂടുതൽ സ്റ്റോക്ക്", "Clear filters": "ഫിൽട്ടറുകൾ മായ്ക്കുക", "No listings match your filters": "നിങ്ങളുടെ ഫിൽട്ടറുകൾക്ക് അനുയോജ്യമായ ലിസ്റ്റിംഗുകളില്ല", "Place order": "ഓർഡർ ചെയ്യുക", "Quantity": "അളവ്", "Subtotal": "ഉപതുക", "Cancel": "റദ്ദാക്കുക", "Order": "ഓർഡർ", "Edit": "തിരുത്തുക", "Delete": "ഇല്ലാതാക്കുക", "Organic": "ഓർഗാനിക്", "Verified": "പരിശോധിച്ചു", "Featured": "ഫീച്ചർഡ്", "Sold out": "വിറ്റുതീർന്നു", "Stock:": "സ്റ്റോക്ക്:", "My listings": "എന്റെ ലിസ്റ്റിംഗുകൾ", "No listings yet": "ഇതുവരെ ലിസ്റ്റിംഗുകളില്ല", "Create listing": "ലിസ്റ്റിംഗ് സൃഷ്ടിക്കുക", "New listing": "പുതിയ ലിസ്റ്റിംഗ്", "Edit listing": "ലിസ്റ്റിംഗ് തിരുത്തുക", "Title *": "ശീർഷകം *", "Crop *": "വിള *", "Variety": "ഇനം", "Unit": "യൂണിറ്റ്", "Price per unit *": "യൂണിറ്റ് വില *", "Stock *": "സ്റ്റോക്ക് *", "Harvest date": "വിളവെടുപ്പ് തീയതി", "Description": "വിവരണം", "Certified organic": "സർട്ടിഫൈഡ് ഓർഗാനിക്", "Save changes": "മാറ്റങ്ങൾ സംരക്ഷിക്കുക", "Publish listing": "ലിസ്റ്റിംഗ് പ്രസിദ്ധീകരിക്കുക", "Saving…": "സംരക്ഷിക്കുന്നു…", "Incoming orders": "വരുന്ന ഓർഡറുകൾ", "No orders match": "ഓർഡറുകളൊന്നുമില്ല", "My orders": "എന്റെ ഓർഡറുകൾ", "No orders yet": "ഇതുവരെ ഓർഡറുകളില്ല", "Revenue": "വരുമാനം", "Gross revenue": "മൊത്ത വരുമാനം", "Commission": "കമ്മീഷൻ", "Net revenue": "ശുദ്ധ വരുമാനം", "Order status": "ഓർഡർ നില", "Listing status": "ലിസ്റ്റിംഗ് നില", "Platform dashboard": "പ്ലാറ്റ്ഫോം ഡാഷ്ബോർഡ്", "Total users": "മൊത്തം ഉപയോക്താക്കൾ", "Total listings": "മൊത്തം ലിസ്റ്റിംഗുകൾ", "Gross GMV": "മൊത്തം GMV", "Commission earned": "ലഭിച്ച കമ്മീഷൻ", "Farmers": "കർഷകർ", "Buyers": "വാങ്ങുന്നവർ", "Admins": "അഡ്മിനുകൾ", "Suspended": "സസ്പെൻഡ് ചെയ്തു", "Active": "സജീവം", "Paused": "താൽക്കാലികമായി നിർത്തി", "All statuses": "എല്ലാ നിലകളും", "All verification": "എല്ലാ പരിശോധനകളും", "Verified only": "പരിശോധിച്ചവ മാത്രം", "Unverified only": "പരിശോധിക്കാത്തവ മാത്രം", "All roles": "എല്ലാ റോളുകളും", "Search by name or email…": "പേര് അല്ലെങ്കിൽ ഇമെയിൽ ഉപയോഗിച്ച് തിരയുക…", "Choose your plan": "നിങ്ങളുടെ പ്ലാൻ തിരഞ്ഞെടുക്കുക", "Most popular": "ഏറ്റവും ജനപ്രിയം", "Page": "പേജ്", "of": "ൽ", "Prev": "മുമ്പത്തെ", "Next": "അടുത്തത്", "Registration failed": "രജിസ്ട്രേഷൻ പരാജയപ്പെട്ടു", "Login failed": "ലോഗിൻ പരാജയപ്പെട്ടു", "Could not load listings": "ലിസ്റ്റിംഗുകൾ ലോഡ് ചെയ്യാനായില്ല"
  }
};

function translateDom(language) {
  const dict = PAGE_TRANSLATIONS[language] || {};
  const translate = (value) => {
    const key = String(value || "").replace(/\\s+/g, " ").trim();
    return dict[key] || value;
  };

  const nodes = document.querySelectorAll("body *");
  nodes.forEach((el) => {
    for (const node of el.childNodes) {
      if (node.nodeType !== Node.TEXT_NODE) continue;
      const original = node.__agrilinkOriginalText ?? node.nodeValue;
      node.__agrilinkOriginalText = original;
      const translated = translate(original);
      if (node.nodeValue !== translated) node.nodeValue = translated;
    }
    ["placeholder", "title", "aria-label"].forEach((attr) => {
      if (!el.hasAttribute(attr)) return;
      const original = el.dataset[`agrilinkOriginal${attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`] || el.getAttribute(attr);
      el.dataset[`agrilinkOriginal${attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`] = original;
      const translated = translate(original);
      if (el.getAttribute(attr) !== translated) el.setAttribute(attr, translated);
    });
  });
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("agrilink_language") || "en");

  useEffect(() => {
    const selected = LANGUAGES[language] || LANGUAGES.en;
    localStorage.setItem("agrilink_language", language);
    document.documentElement.lang = selected.speechCode.split("-")[0];

    const run = () => translateDom(language);
    run();
    const observer = new MutationObserver(() => run());
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "title", "aria-label"] });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    languageInfo: LANGUAGES[language] || LANGUAGES.en,
    languages: LANGUAGES,
    t: (key) => translations[language]?.[key] || translations.en[key] || key,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
