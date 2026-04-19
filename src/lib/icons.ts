import {
    Circle,
    Sun,
    Wrench,
    Sparkles,
    Building,
    Home,
    Check,
    Hammer,
  } from "lucide-react"
  
  export const iconsMap = {
    solar: Sun,
    repair: Wrench,
    cleaning: Sparkles,
    building: Building,
    construction: Hammer,
    check: Check,
    home: Home,
  }
  
  export function getServiceIcon(key?: string) {
    return iconsMap[key as keyof typeof iconsMap] ?? Circle
  }