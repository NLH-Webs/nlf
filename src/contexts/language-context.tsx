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
      projects: "Hoạt động",
      transparency: "Sao kê",
      contact: "Góp sức",
      holdings: "Về NhiLe Holding",
    },
    hero: {
      eyebrow: "NhiLe Foundation · quỹ cộng đồng của NhiLe, từ 2021",
      title: "Quỹ cộng đồng cho trẻ em khó khăn ở Việt Nam",
      subtitle:
        "Quỹ mang sách vở, sữa, quà và những buổi vui chơi tới các em.",
      flowTitle: "Tiền của bạn đi đâu",
      flow: [
        { title: "Bạn góp", detail: "Chuyển khoản vào tài khoản quỹ" },
        { title: "Vào quỹ", detail: "Cùng khoảng 20% lợi nhuận của NhiLe" },
        { title: "Trao tận tay", detail: "Sách vở, sữa, quà cho các em" },
        { title: "Sao kê công khai", detail: "Từng đồng thu chi trên Thiện Nguyện" },
      ],
      spentLabel: "đồng đã chi cho các em trong 12 tháng qua",
      spentSource: "Nguồn: sao kê trên Thiện Nguyện",
      unavailable: "Đang cập nhật",
      cta: "Xem sao kê công khai",
      secondary: "Muốn góp sức? Để lại lời nhắn",
      reviews: "★ 100% giới thiệu · 351 đánh giá trên Facebook (số đếm ngày 19/09/2026)",
      imageAlt: "Tình nguyện viên trao túi quà tận tay",
    },
    projects: {
      heading: "9 hoạt động quỹ đã làm",
      subheading:
        "Mỗi hoạt động có bài và ảnh đầy đủ trên trang Facebook của quỹ.",
      imageAlt: "Tình nguyện viên của quỹ trao túi quà tận tay một cụ bà",
      imageCaption: "Trao quà tận tay. Ảnh của quỹ, đã đăng trên nlf.sg.",
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
          title: "Vẽ lại tuổi thơ bằng gam màu yêu thương",
          description:
            "NhiLe Foundation mang đến niềm vui cho các em nhỏ bị ảnh hưởng bởi chất độc da cam, với những tiếng cười, trò chơi, món quà nhỏ và khoảnh khắc ấm áp được vẽ nên bằng tình thương.",
        },
        {
          title: "Ghé thăm ngôi trường đặc biệt ở Đà Nẵng",
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
      cta: "Xem bài trên Facebook",
    },
    transparency: {
      heading: "Sao kê công khai",
      description:
        "Bảng dưới lấy thẳng từ sao kê của quỹ trên Thiện Nguyện. Tên người chuyển tiền chỉ hiện chữ cái đầu.",
      legalTitle: "Quỹ đứng tên ai",
      legalBody:
        "NhiLe Foundation là quỹ cộng đồng của NhiLe, lập năm 2021, chưa phải pháp nhân riêng. Tài khoản nhận tiền đứng tên cá nhân; khoảng 20% lợi nhuận của NhiLe được góp vào quỹ.",
      badgeTitle: "Sao kê công khai trên Thiện Nguyện",
      badgeDescription:
        "Mọi khoản vào tài khoản quỹ đều hiện ở đây. Bạn tự kiểm được từng dòng.",
      badgeCta: "Xem sao kê công khai",
    },
    contact: {
      heading: "Góp sức cùng quỹ",
      body:
        "Bạn có thể ủng hộ tiền qua tài khoản quỹ trên Thiện Nguyện, hoặc góp thời gian và chuyên môn. Để lại lời nhắn, đội quỹ sẽ liên hệ lại.",
      donateLink: "Ủng hộ quỹ trên Thiện Nguyện",
      emailLabel: "Hoặc email",
      statementLink: "Sao kê công khai trên Thiện Nguyện",
    },
    footer: {
      tagline: "Quỹ cộng đồng của NhiLe, từ 2021.",
      copyright: "© NhiLe Foundation · Từ 2021.",
    },
  },
  en: {
    languageToggle: {
      english: "English",
      vietnamese: "Tiếng Việt",
    },
    nav: {
      projects: "Activities",
      transparency: "Statement",
      contact: "Get involved",
      holdings: "About NhiLe Holding",
    },
    hero: {
      eyebrow: "NhiLe Foundation · NhiLe's community fund since 2021",
      title: "A community fund for children facing hardship in Vietnam",
      subtitle:
        "We bring school supplies, milk, gifts and play days to children.",
      flowTitle: "Where your money goes",
      flow: [
        { title: "You give", detail: "A transfer to the fund's account" },
        { title: "Into the fund", detail: "Alongside about 20% of NhiLe's profit" },
        { title: "Handed over", detail: "Books, milk and gifts for children" },
        { title: "Public statement", detail: "Every VND in and out, on Thien Nguyen" },
      ],
      spentLabel: "VND spent on children in the last 12 months",
      spentSource: "Source: the statement on Thien Nguyen",
      unavailable: "Updating",
      cta: "View the public statement",
      secondary: "Want to help? Leave us a message",
      reviews: "★ 100% recommend · 351 Facebook reviews (count as of 19 Sep 2026)",
      imageAlt: "A volunteer handing over a gift bag",
    },
    projects: {
      heading: "9 things the fund has done",
      subheading: "Each one has a full post with photos on the fund's Facebook page.",
      imageAlt: "A fund volunteer handing a gift bag to an elderly woman",
      imageCaption: "Gifts handed over in person. Photo by the fund, published on nlf.sg.",
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
      cta: "Read the post on Facebook",
    },
    transparency: {
      heading: "Public statement",
      description:
        "The table below comes straight from the fund's statement on Thien Nguyen. Senders show as initials only.",
      legalTitle: "Who holds the fund",
      legalBody:
        "NhiLe Foundation is NhiLe's community fund, started in 2021. It is not yet a separate legal entity: the receiving account is held by an individual, and about 20% of NhiLe's profit goes into the fund.",
      badgeTitle: "Public statement on Thien Nguyen",
      badgeDescription:
        "Every transfer into the fund's account shows up here. You can check each line yourself.",
      badgeCta: "View the public statement",
    },
    contact: {
      heading: "Get involved",
      body:
        "You can give money through the fund's account on Thien Nguyen, or give your time and skills. Leave a message and the fund's team will get back to you.",
      donateLink: "Donate on Thien Nguyen",
      emailLabel: "Or email",
      statementLink: "Public statement on Thien Nguyen",
    },
    footer: {
      tagline: "NhiLe's community fund, since 2021.",
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
