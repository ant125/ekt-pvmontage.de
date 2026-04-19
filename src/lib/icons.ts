import {
    Circle,
    Sun,
    Wrench,
    Sparkles,
    Building,
  } from "lucide-react"
  
  export const iconsMap = {
    solar: Sun,
    repair: Wrench,
    cleaning: Sparkles,
    building: Building,
  }
  
  export function getServiceIcon(key?: string) {
    return iconsMap[key as keyof typeof iconsMap] ?? Circle
  }