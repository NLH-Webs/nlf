import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "vi" | "en";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: TranslationShape;
}

const STORAGE_KEY = "nlf_language";

const translations = {
  vi: {
    languageToggle: {
      english: "English",
      vietnamese: "Tiếng Việt",
    },
    nav: {
      about: "Về Chúng Tôi",
      projects: "Dự Án",
      transparency: "Minh Bạch",
      holdings: "Về NhiLe Holding",
      contact: "Liên Hệ",
    },
    hero: {
      title:
        "Lan Tỏa Yêu Thương, Chắp Cánh Tương Lai",
      subtitle:
        "NhiLe Foundation là quỹ cộng đồng của NhiLe, lập năm 2021. Quỹ mang sách vở, sữa, quà và những buổi vui chơi tới trẻ em khó khăn ở Việt Nam. Mọi đồng thu, đồng chi đều có sao kê công khai.",
      cta: "Ủng hộ quỹ",
    },
    about: {
      title: "Sứ Mệnh & Tầm Nhìn",
      missionTitle: "Sứ mệnh:",
      mission:
        "NhiLe Foundation lập năm 2021 để hỗ trợ và tạo điều kiện phát triển toàn diện cho trẻ em có hoàn cảnh đặc biệt khó khăn tại Việt Nam, tập trung vào giáo dục, sức khỏe và dinh dưỡng.",
      visionTitle: "Tầm nhìn:",
      vision:
        "Trở thành một quỹ cộng đồng bền và minh bạch, là cầu nối tin cậy giữa cộng đồng và những mảnh đời cần giúp đỡ, góp phần xây dựng một thế hệ tương lai khỏe mạnh và trí tuệ.",
    },
    stats: {
      raisedLabel: "Đồng đã chi cho các em trong 12 tháng qua",
      projectsCompleted: "Hoạt động tiêu biểu kể trên trang này",
      source: "Nguồn: sao kê công khai của quỹ trên thiennguyen.app, lấy lúc bạn mở trang.",
      unavailable: "Đang cập nhật",
    },
    projects: {
      heading: "Các Dự Án Nổi Bật",
      subheading:
        "Những hành trình yêu thương mà chúng ta đã cùng nhau thực hiện.",
      items: [
        {
          title: "Nụ cười chiến binh nhí",
          description:
            "Tại Bệnh viện Phụ sản - Nhi Đà Nẵng, các em nhỏ điều trị ung thư vẫn giữ nụ cười lạc quan, tiếp thêm sức mạnh và niềm tin cho những người xung quanh.",
        },
        {
          title: "Trao quà, nhận yêu thương",
          description:
            "Tại xã A Ting (Quảng Nam), những món quà nhỏ mang lại niềm vui lớn cho các em nhỏ. Khoảnh khắc ánh mắt và nụ cười hồn nhiên đã trở thành món quà quý giá nhất mà chúng tôi nhận lại sau chuyến đi.",
        },
        {
          title: "Mang nụ cười đến Làng Hy Vọng",
          description:
            "NhiLe Foundation đã trao tặng quà, sữa và dụng cụ học tập cho các em nhỏ tại Làng Hy Vọng, Đà Nẵng, không chỉ mang đến vật chất mà còn tạo nên khoảnh khắc gắn kết, sẻ chia và tiếng cười rạng rỡ.",
        },
        {
          title: "Tết ấm no tại Nghệ An",
          description:
            "Tết 2025, NhiLe Foundation mang chương trình Tết ấm no tới Trung tâm Nhân đạo Đức Lương, Nghệ An, mang đến nụ cười, tình yêu thương và những cái ôm ấm áp cho các em nhỏ.",
        },
        {
          title: "Trao yêu thương tại chùa Từ Hạnh",
          description:
            "NhiLe Team đã gửi tặng 55 phần quà cho các em nhỏ, 55 phần quà cho các cụ già và quà cho các sư tại chùa Từ Hạnh, TP.HCM, mang đến niềm vui và nhắc nhở chúng ta về giá trị của sự sẻ chia và lòng nhân ái.",
        },
        {
          title:
            "Vẽ lại tuổi thơ bằng gam màu yêu thương",
          description:
            "NhiLe Foundation mang đến niềm vui cho các em nhỏ bị ảnh hưởng bởi chất độc da cam, với những tiếng cười, trò chơi, món quà nhỏ và khoảnh khắc ấm áp được vẽ nên bằng tình thương.",
        },
        {
          title:
            "Ghé thăm ngôi trường đặc biệt ở Đà Nẵng",
          description:
            "NhiLe Foundation đến thăm trường dành cho các em nhỏ bị ảnh hưởng bởi chất độc da cam, mang theo quà tặng và trò chơi, nhận lại những nụ cười, ánh mắt háo hức cùng khoảnh khắc ấm áp khó quên.",
        },
        {
          title: "Tìm lại yêu thương qua sẻ chia",
          description:
            "Cống hiến cho cộng đồng và tham gia các hoạt động từ thiện cùng NhiLe Foundation không chỉ mang đến niềm vui cho những mảnh đời kém may mắn mà còn giúp chúng ta tìm lại sự kết nối và yêu thương trong cuộc sống.",
        },
        {
          title: "Nụ cười tại Làng Hy Vọng",
          description:
            "Tại Làng Hy Vọng, NhiLe Foundation mang đến những phần quà cho các em nhỏ khiếm thính và khuyết tật, nhận lại những cái ôm, ánh mắt sáng rỡ cùng nụ cười hồn nhiên đầy ấm áp.",
        },
      ],
      cta: "Xem chi tiết",
    },
    callToAction: {
      heading: "Chung Tay Cùng Chúng Tôi",
      description:
        "Mỗi hành động của bạn đều có sức mạnh thay đổi một cuộc đời. Hãy chọn cách bạn muốn đồng hành cùng NhiLe Foundation.",
      donate: "Ủng hộ quỹ",
      volunteer: "Muốn góp sức? Để lại lời nhắn cho quỹ",
    },
    transparency: {
      heading: "Minh Bạch Là Nền Tảng Của Niềm Tin",
      description:
        "Chúng tôi cam kết công khai mọi hoạt động thu chi. Toàn bộ sao kê được công khai trên Thiện Nguyện (thiennguyen.app). Bảng dưới đây lấy thẳng từ đó.",
      legalTitle: "Quỹ đứng tên ai",
      legalBody:
        "NhiLe Foundation là quỹ cộng đồng của NhiLe, lập năm 2021. Quỹ chưa phải pháp nhân riêng: tài khoản nhận tiền đứng tên cá nhân, và mọi giao dịch hiện trên sao kê công khai ở Thiện Nguyện. Khoảng 20% lợi nhuận của NhiLe được góp vào quỹ.",
      badgeTitle: "Sao kê công khai trên Thiện Nguyện",
      badgeDescription:
        "Mọi khoản đóng góp vào tài khoản quỹ đều hiện trên sao kê công khai của Thiện Nguyện (thiennguyen.app). Bạn tự kiểm được từng dòng.",
      badgeCta: "Xem sao kê",
    },
    contact: {
      title: "Liên Hệ",
      subtitle: "Hãy kết nối với chúng tôi để cùng nhau lan tỏa yêu thương",
      email: "Email",
      address: "Minh bạch tài chính",
      statementLink: "Sao kê công khai trên Thiện Nguyện",
      mapTitle: "Bản đồ",
      getInTouch: "Liên hệ với chúng tôi",
      sendMessage: "Gửi tin nhắn",
      name: "Họ và tên",
      message: "Tin nhắn",
      send: "Gửi",
    },
    footer: {
      tagline: "Trái tim của hệ sinh thái NhiLe Holding.",
      copyright: "© NhiLe Foundation · Từ 2021.",
    },
  },
  en: {
    languageToggle: {
      english: "English",
      vietnamese: "Tiếng Việt",
    },
    nav: {
      about: "About Us",
      projects: "Projects",
      transparency: "Transparency",
      holdings: "About NhiLe Holding",
      contact: "Contact",
    },
    hero: {
      title: "Spreading Love, Empowering Futures",
      subtitle:
        "NhiLe Foundation is NhiLe's community fund, started in 2021. We bring school supplies, milk, gifts and play days to children facing hardship in Vietnam. Every donation and every expense is on a public bank statement.",
      cta: "Support the fund",
    },
    about: {
      title: "Mission & Vision",
      missionTitle: "Mission:",
      mission:
        "NhiLe Foundation started in 2021 to support and create holistic development opportunities for children in vulnerable situations across Vietnam, focusing on education, healthcare, and nutrition.",
      visionTitle: "Vision:",
      vision:
        "To be a lasting, transparent community fund that connects supporters with families in need, helping nurture a healthy and well-educated future generation.",
    },
    stats: {
      raisedLabel: "VND spent on children in the last 12 months",
      projectsCompleted: "Featured activities on this page",
      source: "Source: the fund's public statement on thiennguyen.app, fetched when you open this page.",
      unavailable: "Updating",
    },
    projects: {
      heading: "Featured Initiatives",
      subheading: "Acts of kindness we have brought to life together.",
      items: [
        {
          title: "Smiles of Little Warriors",
          description:
            "At Da Nang Maternity and Pediatrics Hospital, young cancer patients keep their bright smiles, inspiring strength and hope in everyone around them.",
        },
        {
          title: "Gifts of Love Shared",
          description:
            "In A Ting commune (Quang Nam), small gifts sparked immense joy for local children. Their eyes and carefree laughter became the most precious reward of the entire journey.",
        },
        {
          title: "Hopeful Smiles in the Village",
          description:
            "NhiLe Foundation delivered gifts, milk, and school supplies to children at Hope Village in Da Nang, creating moments of togetherness, compassion, and shining smiles.",
        },
        {
          title: "A Warm Tet in Nghe An",
          description:
            "For Tet 2025, we brought the Warm Tet program to Duc Luong Humanitarian Center, with hugs, love, and festive warmth to children in Nghe An.",
        },
        {
          title: "Sharing Love at Tu Hanh Pagoda",
          description:
            "NhiLe Team prepared 55 care packages for children, 55 gifts for elders, and offerings for the nuns at Tu Hanh Pagoda in Ho Chi Minh City, celebrating generosity and compassion.",
        },
        {
          title: "Recoloring Childhood with Kindness",
          description:
            "We brought games, gifts, and heartfelt moments to children affected by Agent Orange, painting their days with love and cheerful laughter.",
        },
        {
          title: "Visiting a Special School in Da Nang",
          description:
            "NhiLe Foundation visited a school supporting children impacted by Agent Orange, bringing presents and playtime while cherishing every smile and gleam of excitement.",
        },
        {
          title: "Finding Love Through Giving",
          description:
            "By joining community work with NhiLe Foundation, we not only brighten the lives of those in need but also rediscover connection and kindness within ourselves.",
        },
        {
          title: "Smiles at Hope Village",
          description:
            "At Hope Village, we delivered gifts to children with hearing and physical difficulties, receiving warm embraces, sparkling eyes, and innocent, heartfelt smiles in return.",
        },
      ],
      cta: "Explore",
    },
    callToAction: {
      heading: "Join Hands With Us",
      description:
        "Every action you take can transform a life. Choose how you want to walk alongside NhiLe Foundation.",
      donate: "Support the fund",
      volunteer: "Want to help? Leave us a message",
    },
    transparency: {
      heading: "Transparency Builds Trust",
      description:
        "We publish every donation and every expense. The full bank statement is public on Thien Nguyen (thiennguyen.app), and the table below is pulled straight from it.",
      legalTitle: "Who holds the fund",
      legalBody:
        "NhiLe Foundation is NhiLe's community fund, started in 2021. It is not yet a separate legal entity: the receiving account is held by an individual, and every transaction appears on the public statement on Thien Nguyen. About 20% of NhiLe's profit goes into the fund.",
      badgeTitle: "Public statement on Thien Nguyen",
      badgeDescription:
        "Every transfer into the fund's account shows up on its public statement on Thien Nguyen (thiennguyen.app). You can check each line yourself.",
      badgeCta: "View statement",
    },
    contact: {
      title: "Contact",
      subtitle: "Connect with us to spread love together",
      email: "Email",
      address: "Financial transparency",
      statementLink: "Public statement on Thien Nguyen",
      mapTitle: "Map",
      getInTouch: "Get in Touch",
      sendMessage: "Send Message",
      name: "Name",
      message: "Message",
      send: "Send",
    },
    footer: {
      tagline: "The heart of the NhiLe Holding ecosystem.",
      copyright: "© NhiLe Foundation · Since 2021.",
    },
  },
} as const;

type TranslationShape = typeof translations.vi | typeof translations.en;

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("vi");

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored === "vi" || stored === "en") {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (value: Language) => {
    setLanguageState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      translations: translations[language],
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return {
    language: context.language,
    setLanguage: context.setLanguage,
  };
};

export const useTranslations = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslations must be used within a LanguageProvider");
  }
  return context.translations;
};

export const LANGUAGE_OPTIONS: Array<{
  code: Language;
  shortLabel: string;
  fullLabel: string;
}> = [
  {
    code: "en",
    shortLabel: translations.en.languageToggle.english,
    fullLabel: "English",
  },
  {
    code: "vi",
    shortLabel: translations.vi.languageToggle.vietnamese,
    fullLabel: translations.vi.languageToggle.vietnamese,
  },
];

export const translationKeys = translations;
