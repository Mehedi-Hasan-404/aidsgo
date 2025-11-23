'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import DataTable from '@/components/DataTable';
import { Channel, Category } from '@/lib/types';
import { getChannels, getCategories, deleteChannel } from '@/lib/firestore';
import toast from 'react-hot-toast';

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadData = async () => {
    setLoading(true);
    try {
      const [channelsData, categoriesData] = await Promise.all([
        getChannels(selectedCategory || undefined),
        getCategories(),
      ]);
      setChannels(channelsData);
      setCategories(categoriesData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const handleEdit = (channel: Channel) => {
    router.push(`/dashboard/channels/${channel.id}`);
  };

  const handleDelete = async (channel: Channel) => {
    if (!confirm(`Delete "${channel.name}"?`)) return;

    try {
      await deleteChannel(channel.id);
      toast.success('Channel deleted');
      loadData();
    } catch (error) {
      toast.error('Failed to delete channel');
    }
  };

  const columns = [
    {
      key: 'logoUrl',
      label: 'Logo',
      render: (item: Channel) => (
        <img src={item.logoUrl} alt={item.name} className="w-12 h-12 object-contain" />
      ),
    },
    { key: 'name', label: 'Name' },
    { key: 'categoryName', label: 'Category' },
    {
      key: 'streamUrl',
      label: 'Stream URL',
      render: (item: Channel) => (
        <span className="text-xs text-gray-500 truncate max-w-xs block">
          {item.streamUrl}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Channels</h1>
        <div className="flex gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field w-48"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => router.push('/dashboard/channels/new')}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Channel
          </button>
        </div>
      </div>

      <div className="card">
        <DataTable
          data={channels}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
}
