'use client';

import { useEffect, useState } from 'react';
import { Tv, Radio, Calendar, TrendingUp } from 'lucide-react';
import { getCategories, getChannels, getLiveEvents } from '@/lib/firestore';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    categories: 0,
    channels: 0,
    liveEvents: 0,
    activeLive: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const [categories, channels, liveEvents] = await Promise.all([
        getCategories(),
        getChannels(),
        getLiveEvents(),
      ]);

      setStats({
        categories: categories.length,
        channels: channels.length,
        liveEvents: liveEvents.length,
        activeLive: liveEvents.filter(e => e.isLive).length,
      });
    };

    loadStats();
  }, []);

  const cards = [
    { label: 'Categories', value: stats.categories, icon: Tv, color: 'bg-blue-500' },
    { label: 'Channels', value: stats.channels, icon: Radio, color: 'bg-green-500' },
    { label: 'Live Events', value: stats.liveEvents, icon: Calendar, color: 'bg-purple-500' },
    { label: 'Currently Live', value: stats.activeLive, icon: TrendingUp, color: 'bg-red-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to LiveTVPro Admin</h1>
        <p className="text-gray-600 mt-2">Manage your TV channels and live events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
