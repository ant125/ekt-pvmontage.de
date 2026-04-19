import {
    Circle,
    Sun,
    Wrench,
    Building,
    Home,
    Check,
    Hammer,
    Ruler,
    MessageCircle,
    Settings,
    Droplets,
  } from "lucide-react"
  
  export const iconsMap = {
    solar: Sun,           // PV
    ruler: Ruler,         // калькуляция
    chat: MessageCircle,  // консультация
    cleaning: Droplets,   // чистка крыши
    settings: Settings,   // сервис
    tool: Hammer,         // демонтаж / монтаж
  }
  
  export function getServiceIcon(key?: string) {
    return iconsMap[key as keyof typeof iconsMap] ?? Circle
  }