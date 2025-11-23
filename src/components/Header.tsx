'use client';

import { usePathname } from 'next/navigation';

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/categories': 'Categories',
  '/dashboard/channels': 'Channels',
  '/dashboard/live-events': 'Live Events',
};

export default function Header() {
  const pathname = usePathname();
  const title = titles[pathname || ''] || 'LiveTVPro Admin';

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </header>
  );
}
