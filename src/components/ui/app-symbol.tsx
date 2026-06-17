import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { type ColorValue } from "react-native";

type AppSymbolProps = {
  color: ColorValue;
  name: Extract<SymbolViewProps["name"], object>;
  size?: number;
};

export function AppSymbol({ color, name, size = 22 }: AppSymbolProps) {
  return (
    <SymbolView
      name={{ ios: name.ios, android: name.android, web: "info" }}
      tintColor={color}
      size={size}
    />
  );
}
