import type { UiLang } from './i18n'

export type ResourcePage = 'privacy' | 'terms' | 'faq' | 'help'
type Section = { title: string; body: string; href?: string }
type Page = { intro: string; sections: Section[] }

export const resourceContent: Record<UiLang, Record<ResourcePage, Page>> = {
  en: {
    privacy: {
      intro: 'How this website uses information and browser storage.',
      sections: [
        { title: 'Your display preferences', body: 'The website stores your language, theme, font size and speciality preference in your browser so they can be remembered on your next visit. You can change these in Settings or remove them by clearing this website’s browser data.', href: '/settings/' },
        { title: 'Contact and appointments', body: 'Phone, email and booking links open the corresponding app or service. Information you share there is handled by that service and the recipient. Share only the information needed to arrange your visit.', href: '/contact/' },
        { title: 'External services', body: 'External booking, map and other linked services have their own privacy practices. Website hosting may process technical connection information to deliver the site. Browser storage described here does not describe every external service’s data handling.' },
        { title: 'Privacy questions', body: 'Use the Contact page to ask about information shared with the practice or to raise a privacy concern.', href: '/contact/' },
      ],
    },
    terms: {
      intro: 'Please read these guidelines when using this website.',
      sections: [
        { title: 'Website information', body: 'This website presents the doctor’s professional profile, services and visit information. Its content is general information and does not provide an individual diagnosis, prescription or treatment plan.' },
        { title: 'Booking and availability', body: 'Opening a booking link or making an inquiry does not confirm an appointment. Confirm the time, location, fees and availability with the chamber before travelling.', href: '/appointment/' },
        { title: 'Responsible use', body: 'Provide accurate information when contacting the practice. Do not misuse contact channels, impersonate others or interfere with the website.' },
        { title: 'External links and updates', body: 'Linked services operate under their own terms. Profile details and schedules may change; contact the chamber if you need confirmation or notice an error.', href: '/contact/' },
      ],
    },
    faq: {
      intro: 'Answers to common questions about appointments and using the website.',
      sections: [
        { title: 'How do I book an appointment?', body: 'Open the Appointment page and use the available phone or booking option. Confirm your visit directly with the chamber.', href: '/appointment/' },
        { title: 'Where can I find the chamber address and schedule?', body: 'Visit the Appointment or Contact page for the published location and visiting details. Confirm the schedule before travelling.', href: '/contact/' },
        { title: 'Where can I check services and qualifications?', body: 'The Services page lists available services. Open the About menu for the doctor’s profile, qualifications and experience.', href: '/services/' },
        { title: 'How do I change the language or text size?', body: 'Open Settings from the Resources menu or use the display settings button in the header. Choose an available language, adjust the font size, or select a light, dark or system theme.', href: '/settings/' },
        { title: 'Can I get a diagnosis through this website?', body: 'The website provides information about the practice. Arrange a consultation for advice about your individual health needs.' },
      ],
    },
    help: {
      intro: 'Find the right place for booking, website preferences and questions.',
      sections: [
        { title: 'Appointment assistance', body: 'Use the Appointment page to contact the chamber about booking, rescheduling or availability.', href: '/appointment/' },
        { title: 'Make the website easier to read', body: 'Change the language, text size and color theme in Settings. Your choices are remembered in this browser.', href: '/settings/' },
        { title: 'Something is not working?', body: 'Try reloading the page and checking your connection. If the issue continues, contact the practice with the page name and a short description. Avoid including private medical details.', href: '/contact/' },
        { title: 'More answers', body: 'Read the FAQ for common questions about the website and planning a visit.', href: '/faq/' },
      ],
    },
  },
  bn: {
    privacy: {
      intro: 'এই ওয়েবসাইটে তথ্য ও ব্রাউজার স্টোরেজ কীভাবে ব্যবহৃত হয়।',
      sections: [
        { title: 'আপনার প্রদর্শন পছন্দ', body: 'পরবর্তী ভিজিটে মনে রাখার জন্য ভাষা, থিম, অক্ষরের আকার ও বিশেষত্বের পছন্দ আপনার ব্রাউজারে সংরক্ষিত থাকে। সেটিংস থেকে এগুলো বদলাতে বা ব্রাউজারে এই সাইটের ডেটা মুছে সরিয়ে ফেলতে পারেন।', href: '/settings/' },
        { title: 'যোগাযোগ ও অ্যাপয়েন্টমেন্ট', body: 'ফোন, ইমেইল ও বুকিং লিংক সংশ্লিষ্ট অ্যাপ বা সেবা খোলে। সেখানে দেওয়া তথ্য সেই সেবা ও প্রাপক পরিচালনা করেন। সাক্ষাতের ব্যবস্থা করতে যতটুকু তথ্য প্রয়োজন কেবল ততটুকুই দিন।', href: '/contact/' },
        { title: 'বাহ্যিক সেবা', body: 'বুকিং, মানচিত্র ও অন্যান্য সংযুক্ত সেবার নিজস্ব গোপনীয়তা নীতি আছে। সাইট দেখানোর জন্য হোস্টিং সেবা সংযোগসংক্রান্ত প্রযুক্তিগত তথ্য প্রক্রিয়া করতে পারে। এখানে ব্রাউজার স্টোরেজের বিবরণ সব বাহ্যিক সেবার তথ্য ব্যবস্থাপনার বিবরণ নয়।' },
        { title: 'গোপনীয়তা সম্পর্কে প্রশ্ন', body: 'চেম্বারে দেওয়া তথ্য সম্পর্কে জানতে বা গোপনীয়তা নিয়ে উদ্বেগ জানাতে যোগাযোগ পৃষ্ঠা ব্যবহার করুন।', href: '/contact/' },
      ],
    },
    terms: {
      intro: 'এই ওয়েবসাইট ব্যবহারের সময় নির্দেশনাগুলো পড়ুন।',
      sections: [
        { title: 'ওয়েবসাইটের তথ্য', body: 'এই সাইটে চিকিৎসকের পেশাগত পরিচিতি, সেবা ও সাক্ষাতের তথ্য দেওয়া হয়। এগুলো সাধারণ তথ্য; ব্যক্তিগত রোগনির্ণয়, প্রেসক্রিপশন বা চিকিৎসা পরিকল্পনা নয়।' },
        { title: 'বুকিং ও সময়সূচি', body: 'বুকিং লিংক খোলা বা যোগাযোগ করলেই অ্যাপয়েন্টমেন্ট নিশ্চিত হয় না। যাওয়ার আগে চেম্বারের সঙ্গে সময়, স্থান, ফি ও চিকিৎসকের উপস্থিতি নিশ্চিত করুন।', href: '/appointment/' },
        { title: 'দায়িত্বশীল ব্যবহার', body: 'যোগাযোগের সময় সঠিক তথ্য দিন। যোগাযোগের মাধ্যমের অপব্যবহার, অন্যের পরিচয় ব্যবহার বা ওয়েবসাইটের কাজে বাধা দেওয়া থেকে বিরত থাকুন।' },
        { title: 'বাহ্যিক লিংক ও হালনাগাদ', body: 'সংযুক্ত সেবাগুলো নিজস্ব শর্তে পরিচালিত হয়। পরিচিতি ও সময়সূচি বদলাতে পারে। তথ্য নিশ্চিত করতে বা ভুল জানাতে চেম্বারে যোগাযোগ করুন।', href: '/contact/' },
      ],
    },
    faq: {
      intro: 'অ্যাপয়েন্টমেন্ট ও ওয়েবসাইট ব্যবহার সম্পর্কে সাধারণ প্রশ্নের উত্তর।',
      sections: [
        { title: 'কীভাবে অ্যাপয়েন্টমেন্ট নেব?', body: 'অ্যাপয়েন্টমেন্ট পৃষ্ঠায় গিয়ে ফোন বা বুকিংয়ের সুবিধা ব্যবহার করুন। চেম্বারের সঙ্গে সরাসরি আপনার সাক্ষাৎ নিশ্চিত করুন।', href: '/appointment/' },
        { title: 'চেম্বারের ঠিকানা ও সময়সূচি কোথায় পাব?', body: 'অ্যাপয়েন্টমেন্ট বা যোগাযোগ পৃষ্ঠায় প্রকাশিত ঠিকানা ও সাক্ষাতের তথ্য পাবেন। যাওয়ার আগে সময়সূচি নিশ্চিত করুন।', href: '/contact/' },
        { title: 'সেবা ও যোগ্যতা কোথায় দেখব?', body: 'সেবা পৃষ্ঠায় সেবার তালিকা আছে। চিকিৎসকের পরিচিতি, যোগ্যতা ও অভিজ্ঞতা জানতে পরিচিতি মেনু খুলুন।', href: '/services/' },
        { title: 'ভাষা বা অক্ষরের আকার কীভাবে বদলাব?', body: 'প্রয়োজনীয় তথ্য মেনু থেকে সেটিংস খুলুন অথবা হেডারের প্রদর্শন সেটিংস বোতাম ব্যবহার করুন। উপলব্ধ ভাষা বেছে নিন, অক্ষরের আকার বদলান এবং হালকা, গাঢ় বা সিস্টেম থিম নির্বাচন করুন।', href: '/settings/' },
        { title: 'এই ওয়েবসাইটে কি রোগনির্ণয় করা হয়?', body: 'এই সাইটে চিকিৎসাসেবা সম্পর্কে তথ্য দেওয়া হয়। আপনার ব্যক্তিগত স্বাস্থ্য সম্পর্কে পরামর্শের জন্য চিকিৎসকের সাক্ষাৎ নিন।' },
      ],
    },
    help: {
      intro: 'বুকিং, ওয়েবসাইটের পছন্দ ও প্রশ্নের জন্য সঠিক পৃষ্ঠা খুঁজুন।',
      sections: [
        { title: 'অ্যাপয়েন্টমেন্ট সহায়তা', body: 'বুকিং, সময় পরিবর্তন বা চিকিৎসকের উপস্থিতি সম্পর্কে চেম্বারে যোগাযোগ করতে অ্যাপয়েন্টমেন্ট পৃষ্ঠা ব্যবহার করুন।', href: '/appointment/' },
        { title: 'ওয়েবসাইট পড়া সহজ করুন', body: 'সেটিংস থেকে ভাষা, অক্ষরের আকার ও রঙের থিম বদলান। আপনার পছন্দ এই ব্রাউজারে মনে রাখা হবে।', href: '/settings/' },
        { title: 'কিছু কাজ করছে না?', body: 'পৃষ্ঠা আবার লোড করুন এবং ইন্টারনেট সংযোগ পরীক্ষা করুন। সমস্যা থাকলে পৃষ্ঠার নাম ও সংক্ষিপ্ত বিবরণ দিয়ে যোগাযোগ করুন। ব্যক্তিগত চিকিৎসার তথ্য দেবেন না।', href: '/contact/' },
        { title: 'আরও উত্তর', body: 'ওয়েবসাইট ও সাক্ষাতের পরিকল্পনা সম্পর্কে সাধারণ প্রশ্নের উত্তর পড়ুন।', href: '/faq/' },
      ],
    },
  },
  hi: {
    privacy: {
      intro: 'इस वेबसाइट पर जानकारी और ब्राउज़र स्टोरेज का उपयोग कैसे होता है।',
      sections: [
        { title: 'आपकी प्रदर्शन प्राथमिकताएँ', body: 'अगली बार याद रखने के लिए वेबसाइट आपकी भाषा, थीम, अक्षरों का आकार और विशेषज्ञता की पसंद ब्राउज़र में सहेजती है। इन्हें सेटिंग्स में बदलें या ब्राउज़र से इस वेबसाइट का डेटा साफ़ करके हटाएँ।', href: '/settings/' },
        { title: 'संपर्क और अपॉइंटमेंट', body: 'फ़ोन, ईमेल और बुकिंग लिंक संबंधित ऐप या सेवा खोलते हैं। वहाँ साझा की गई जानकारी उस सेवा और प्राप्तकर्ता द्वारा संभाली जाती है। मुलाकात तय करने के लिए केवल आवश्यक जानकारी साझा करें।', href: '/contact/' },
        { title: 'बाहरी सेवाएँ', body: 'बाहरी बुकिंग, मानचित्र और अन्य जुड़ी सेवाओं की अपनी गोपनीयता प्रक्रियाएँ हैं। वेबसाइट उपलब्ध कराने के लिए होस्टिंग सेवा तकनीकी कनेक्शन जानकारी संसाधित कर सकती है। यहाँ ब्राउज़र स्टोरेज का विवरण सभी बाहरी सेवाओं की डेटा प्रक्रियाओं का विवरण नहीं है।' },
        { title: 'गोपनीयता के प्रश्न', body: 'क्लिनिक के साथ साझा जानकारी के बारे में पूछने या गोपनीयता संबंधी चिंता बताने के लिए संपर्क पृष्ठ का उपयोग करें।', href: '/contact/' },
      ],
    },
    terms: {
      intro: 'इस वेबसाइट का उपयोग करते समय ये दिशानिर्देश पढ़ें।',
      sections: [
        { title: 'वेबसाइट की जानकारी', body: 'यह वेबसाइट डॉक्टर का पेशेवर परिचय, सेवाएँ और मुलाकात की जानकारी देती है। यह सामान्य जानकारी है और व्यक्तिगत निदान, पर्चा या उपचार योजना नहीं देती।' },
        { title: 'बुकिंग और उपलब्धता', body: 'बुकिंग लिंक खोलने या पूछताछ करने से अपॉइंटमेंट की पुष्टि नहीं होती। जाने से पहले क्लिनिक से समय, स्थान, शुल्क और उपलब्धता की पुष्टि करें।', href: '/appointment/' },
        { title: 'ज़िम्मेदार उपयोग', body: 'क्लिनिक से संपर्क करते समय सही जानकारी दें। संपर्क माध्यमों का दुरुपयोग, किसी और की पहचान का उपयोग या वेबसाइट के काम में बाधा न डालें।' },
        { title: 'बाहरी लिंक और बदलाव', body: 'जुड़ी सेवाएँ अपनी शर्तों पर चलती हैं। परिचय और समय बदल सकते हैं। पुष्टि के लिए या कोई गलती बताने के लिए क्लिनिक से संपर्क करें।', href: '/contact/' },
      ],
    },
    faq: {
      intro: 'अपॉइंटमेंट और वेबसाइट के उपयोग से जुड़े सामान्य प्रश्नों के उत्तर।',
      sections: [
        { title: 'अपॉइंटमेंट कैसे बुक करूँ?', body: 'अपॉइंटमेंट पृष्ठ खोलें और उपलब्ध फ़ोन या बुकिंग विकल्प का उपयोग करें। क्लिनिक से सीधे मुलाकात की पुष्टि करें।', href: '/appointment/' },
        { title: 'क्लिनिक का पता और समय कहाँ मिलेगा?', body: 'प्रकाशित स्थान और मुलाकात की जानकारी के लिए अपॉइंटमेंट या संपर्क पृष्ठ देखें। जाने से पहले समय की पुष्टि करें।', href: '/contact/' },
        { title: 'सेवाएँ और योग्यताएँ कहाँ देखूँ?', body: 'सेवाएँ पृष्ठ पर उपलब्ध सेवाओं की सूची है। डॉक्टर का परिचय, योग्यताएँ और अनुभव देखने के लिए परिचय मेनू खोलें।', href: '/services/' },
        { title: 'भाषा या अक्षरों का आकार कैसे बदलूँ?', body: 'उपयोगी जानकारी मेनू से सेटिंग्स खोलें या हेडर में प्रदर्शन सेटिंग्स बटन चुनें। उपलब्ध भाषा चुनें, अक्षरों का आकार बदलें और हल्की, गहरी या सिस्टम थीम चुनें।', href: '/settings/' },
        { title: 'क्या इस वेबसाइट पर निदान मिल सकता है?', body: 'यह वेबसाइट क्लिनिक की जानकारी देती है। अपनी व्यक्तिगत स्वास्थ्य ज़रूरतों पर सलाह के लिए परामर्श तय करें।' },
      ],
    },
    help: {
      intro: 'बुकिंग, वेबसाइट प्राथमिकताओं और प्रश्नों के लिए सही पृष्ठ खोजें।',
      sections: [
        { title: 'अपॉइंटमेंट सहायता', body: 'बुकिंग, समय बदलने या उपलब्धता के बारे में क्लिनिक से संपर्क करने के लिए अपॉइंटमेंट पृष्ठ का उपयोग करें।', href: '/appointment/' },
        { title: 'वेबसाइट पढ़ना आसान बनाएँ', body: 'सेटिंग्स में भाषा, अक्षरों का आकार और रंग की थीम बदलें। आपकी पसंद इस ब्राउज़र में याद रखी जाएगी।', href: '/settings/' },
        { title: 'कुछ काम नहीं कर रहा?', body: 'पृष्ठ दोबारा लोड करें और अपना इंटरनेट कनेक्शन जाँचें। समस्या बनी रहे तो पृष्ठ का नाम और संक्षिप्त विवरण देकर संपर्क करें। निजी चिकित्सा जानकारी शामिल न करें।', href: '/contact/' },
        { title: 'और उत्तर', body: 'वेबसाइट और मुलाकात की योजना से जुड़े सामान्य प्रश्नों के लिए FAQ पढ़ें।', href: '/faq/' },
      ],
    },
  },
}
