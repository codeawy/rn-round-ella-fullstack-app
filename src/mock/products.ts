const PLACEHOLDER_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCfTsFy3auP460Ioc1y7dOhjEZo4Q4hht-b93lgkfAklHg4TQHczSzz3LOFWIqAYer7Qy1kpPZOz5uj48kJv4emhC1bY8iwz0s92NHifFadh-yKYZS36Z_wwLT5Zf-0_8VkeFDZOTA-zNp_EVQqGybM94rndhnZP3kotOliTkTeXcI0MMQ-GWADSn1BXyPeVyn8aLnafDA7MnzVS9p12xZz3CvQgnITDWhSApkDZOmUddsmEDaU9xedoCcPFkHuW-iYawP6ZIn-66py";

export interface Product {
  title: string;
  category: string;
  price: string;
  imageUrl: string;
}

export const featuredProducts: Product[] = [
  {
    title: "AeroKnit Runner",
    category: "Athletics",
    price: "$145",
    imageUrl: PLACEHOLDER_IMAGE,
  },
  {
    title: "Chrono Slim",
    category: "Wearables",
    price: "$220",
    imageUrl: PLACEHOLDER_IMAGE,
  },
  {
    title: "CloudForm Lamp",
    category: "Living",
    price: "$96",
    imageUrl: PLACEHOLDER_IMAGE,
  },
];

interface TrendingProduct {
  title: string;
  category: string;
  label: string;
  price: string;
  imageUrl: string;
}
export const trendingProducts: TrendingProduct[] = [
  {
    title: "Noir Carryall",
    category: "Accessories",
    label: "Hot now",
    price: "$180",
    imageUrl: PLACEHOLDER_IMAGE,
  },
  {
    title: "Luna Accent Chair",
    category: "Interiors",
    label: "Editor pick",
    price: "$260",
    imageUrl: PLACEHOLDER_IMAGE,
  },
];
