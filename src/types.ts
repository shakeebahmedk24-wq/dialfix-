export type DeviceType = 'iPhone' | 'Samsung' | 'Android' | 'Laptop' | 'iPad' | 'Other';

export interface RepairService {
  id: string;
  title: string;
  subtitle: string;
  timeEstimate: string;
  category: DeviceType;
  description: string;
  iconName: string;
  popular?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  timeAgo: string;
  content: string;
  verified: boolean;
  avatarColor: string;
  highlight?: string;
  ownerResponse?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  condition: 'Brand New' | 'Refurbished - Pristine';
  storage: string;
  color: string;
  imageUrl: string;
  inStock: boolean;
  warranty: string;
  features: string[];
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface AppointmentBooking {
  deviceType: DeviceType;
  deviceModel: string;
  repairIssue: string;
  preferredDate: string;
  preferredTime: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  notes?: string;
}
