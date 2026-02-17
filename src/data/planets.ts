export interface PlanetTheme {
  color: string;
  emissive: string;
  glow: string;
  rings?: boolean;
  ringColor?: string;
  textureUrl?: string;
}

export interface PlanetData {
  id: number;
  name: string;
  path: string;
  description: string;
  theme: PlanetTheme;
}

export const PLANETS: PlanetData[] = [
  {
    id: 0,
    name: "ANA SAYFA",
    path: "/",
    description: "Kozmik Merkeze Hoş Geldiniz",
    theme: {
      color: "#4c1d95",
      emissive: "#2e1065",
      glow: "#7c3aed",
    }
  },
  {
    id: 1,
    name: "KEŞFET",
    path: "/escorts",
    description: "Galaksideki Tüm Yıldızlar",
    theme: {
      color: "#0f172a",
      emissive: "#1e293b",
      glow: "#3b82f6",
      rings: true,
      ringColor: "#60a5fa"
    }
  },
  {
    id: 2,
    name: "VIP",
    path: "/vip",
    description: "En Parlak Yıldızlar",
    theme: {
      color: "#451a03",
      emissive: "#78350f",
      glow: "#f59e0b",
    }
  },
  {
    id: 3,
    name: "MESAJLAR",
    path: "/messages",
    description: "Kozmik İletişim",
    theme: {
      color: "#064e3b",
      emissive: "#065f46",
      glow: "#10b981",
    }
  },
  {
    id: 4,
    name: "FAVORİLER",
    path: "/favorites",
    description: "Kaydedilen Takımyıldızlar",
    theme: {
      color: "#831843",
      emissive: "#9d174d",
      glow: "#ec4899",
    }
  },
  {
    id: 5,
    name: "PROFİL",
    path: "/escort/dashboard",
    description: "Kişisel Yörüngeniz",
    theme: {
      color: "#1e1b4b",
      emissive: "#312e81",
      glow: "#6366f1",
    }
  },
  {
    id: 6,
    name: "İLAN VER",
    path: "/register-escort",
    description: "Galaksiye Katılın",
    theme: {
      color: "#422006",
      emissive: "#713f12",
      glow: "#eab308",
      rings: true,
      ringColor: "#facc15"
    }
  }
];
