import {
    Circle,
    Sun,
    Wrench,
    Sparkles,
    Building,
    Home,
    Check,
    Hammer,
    Ruler,
    MessageCircle,
    Settings,
  } from "lucide-react"
  
  export const iconsMap = {
    solar: Sun,
    repair: Wrench,
    cleaning: Sparkles,
    building: Building,
    construction: Hammer,
    check: Check,
    home: Home,
    ruler: Ruler,
    chat: MessageCircle,
    settings: Settings,
    tool: Hammer,
  }
  
  export function getServiceIcon(key?: string) {
    return iconsMap[key as keyof typeof iconsMap] ?? Circle
  }