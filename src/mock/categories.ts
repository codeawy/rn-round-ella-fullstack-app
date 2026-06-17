import {
  Computer,
  Gem,
  LucideProps,
  Monitor,
  Shirt,
  Sofa,
  Sparkles,
} from "lucide-react-native";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface CategoryItem {
  label: string;
  icon: ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;
}

export const categories: CategoryItem[] = [
  { label: "Fashion", icon: Shirt },
  { label: "Tech", icon: Monitor },
  { label: "Beauty", icon: Sparkles },
  { label: "Home", icon: Sofa },
  { label: "Jewelry", icon: Gem },
  { label: "Electronics", icon: Computer },
];
