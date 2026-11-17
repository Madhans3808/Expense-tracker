import React from 'react';
import {
  Utensils,
  ShoppingCart,
  Home,
  Car,
  Zap,
  Film,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  MoreHorizontal,
  Tag,
  LucideProps,
} from 'lucide-react';

interface CategoryIconProps extends LucideProps {
  name: string;
}

export function CategoryIcon({ name, ...props }: CategoryIconProps) {
  switch (name) {
    case 'Utensils':
      return <Utensils {...props} />;
    case 'ShoppingCart':
      return <ShoppingCart {...props} />;
    case 'Home':
      return <Home {...props} />;
    case 'Car':
      return <Car {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'Film':
      return <Film {...props} />;
    case 'HeartPulse':
      return <HeartPulse {...props} />;
    case 'ShoppingBag':
      return <ShoppingBag {...props} />;
    case 'Education':
    case 'GraduationCap':
      return <GraduationCap {...props} />;
    case 'MoreHorizontal':
    default:
      return <Tag {...props} />;
  }
}
