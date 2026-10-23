
export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  duration: string;
  description: string;
  image: string;
  layout: string;
  previewVideo?: string;
  video?: string;
};

export const projects: Project[] = [
  {
    id: "01",
    title: "ZING",
    category: "FRAGRANCE",
    year: "2026",
    duration: "00:15",
    description:
      "ZING is an independent AI-generated luxury fragrance commercial set in nighttime Manhattan. Rain-soaked streets, dramatic city lights, futuristic chrome aesthetics, and a cinematic perfume reveal create a bold visual identity. The campaign explores confidence, ambition, and the energy of New York City through AI-powered visual storytelling. An original speculative advertising concept created by AI VERSE.",
    image: "/images/projects/zing.png",
    layout: "md:col-span-2 md:row-span-2",
    previewVideo: "/videos/zing.mov",
    video: "/videos/zing.mov",
  },
  {
    id: "02",
    title: "LEATHERZO",
    category: "FASHION FILM",
    year: "2026",
    duration: "00:15",
    description:
      "LEATHERZO is an independent AI-generated fashion campaign showcasing contemporary leather jackets through dramatic runway cinematography. Featuring striking models, high-contrast lighting, bold silhouettes, and a minimalist editorial aesthetic, the project explores the visual language of luxury fashion advertising. Created as a speculative fashion campaign by AI VERSE.",
    image: "/images/projects/leatherzo.png",
    layout: "md:col-span-2",
    previewVideo: "/videos/leatherzo.mov",
    video: "/videos/leatherzo.mov",
  },
  {
    id: "03",
    title: "PINK GLOW",
    category: "BEAUTY",
    year: "2026",
    duration: "00:15",
    description:
      "PINK GLOW is a playful AI-generated skincare advertisement for a fictional hyaluronic acid serum. Inspired by early-2010s teenage pop culture, the campaign combines a colorful bedroom setting, energetic character storytelling, glossy pink product cinematography, and a youthful beauty aesthetic. An independent concept commercial exploring AI-powered beauty advertising and creative direction.",
    image: "/images/projects/pink-glow.png",
    layout: "md:col-span-2",
    previewVideo: "/videos/pink-glow.mov",
    video: "/videos/pink-glow.mov",
  },
  {
    id: "04",
    title: "THE LAST CALL",
    category: "SHORT FILM",
    year: "2026",
    duration: "00:15",
    description:
      "THE LAST CALL is a psychological thriller created using AI-generated cinematic sequences. Set inside a rain-soaked New York apartment, the story follows a man who receives a mysterious phone call warning him about an approaching threat. Through atmospheric lighting, suspenseful dialogue, restrained performances, and carefully constructed tension, the film explores short-form AI storytelling. An independent narrative concept by AI VERSE.",
    image: "/images/projects/the-last-call.png",
    layout: "md:col-span-1 md:row-span-2",
    previewVideo: "/videos/the-last-call.mov",
    video: "/videos/the-last-call.mov",
  },
  {
    id: "05",
    title: "LIVE THE DREAM",
    category: "LIFESTYLE FILM",
    year: "2026",
    duration: "00:15",
    description:
      "LIVE THE DREAM is an AI-generated cinematic lifestyle film inspired by the atmosphere of classic Hollywood and California's aspirational culture. Featuring palm-lined Beverly Hills streets, the Hollywood Hills, and luxury automotive imagery, the project combines nostalgic cinematography with contemporary AI filmmaking techniques. An independent visual concept exploring freedom, ambition, and the California dream.",
    image: "/images/projects/live-the-dream.png",
    layout: "md:col-span-2",
    previewVideo: "/videos/live-the-dream.mov",
    video: "/videos/live-the-dream.mov",
  },
  {
    id: "06",
    title: "BASSLINE",
    category: "PRODUCT FILM",
    year: "2026",
    duration: "00:10",
    description:
      "BASSLINE is a conceptual AI-generated commercial for fictional premium wireless earbuds. Inspired by New York's underground hip-hop culture, the campaign combines gritty subway cinematography, contemporary streetwear, dramatic crimson lighting, and detailed matte-black product visuals. The advertisement explores the connection between music, identity, and urban culture through cinematic product storytelling. Created independently by AI VERSE.",
    image: "/images/projects/bassline.png",
    layout: "md:col-span-3",
    previewVideo: "/videos/bassline.mov",
    video: "/videos/bassline.mov",
  },
];
