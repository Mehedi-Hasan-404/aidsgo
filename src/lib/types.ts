export interface Category {
  id: string;
  name: string;
  slug: string;
  iconUrl?: string;
  m3uUrl?: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Channel {
  id: string;
  name: string;
  logoUrl: string;
  streamUrl: string;
  categoryId: string;
  categoryName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LiveEventLink {
  label: string;
  url: string;
}

export interface LiveEvent {
  id: string;
  category: string;
  league: string;
  team1Name: string;
  team1Logo: string;
  team2Name: string;
  team2Logo: string;
  startTime: string;
  endTime?: string;
  isLive: boolean;
  links: LiveEventLink[];
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
