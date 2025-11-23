'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import DataTable from '@/components/DataTable';
import { LiveEvent } from '@/lib/types';
import { getLiveEvents, deleteLiveEvent } from '@/lib/firestore';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function LiveEventsPage() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await getLiveEvents();
      setEvents(data);
    } catch (error) {
      toast.error('Failed to load live events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleEdit = (event: LiveEvent) => {
    router.push(`/dashboard/live-events/${event.id}`);
  };

  const handleDelete = async (event: LiveEvent) => {
    if (!confirm(`Delete this event?`)) return;

    try {
      await deleteLiveEvent(event.id);
      toast.success('Event deleted');
      loadEvents();
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Event',
      render: (item: LiveEvent) => (
        <div>
          <div className="font-medium">
            {item.title || `${item.team1Name} vs ${item.team2Name}`}
          </div>
          <div className="text-xs text-gray-500">{item.league}</div>
        </div>
      ),
    },
    { key: 'category', label: 'Category' },
    {
      key: 'startTime',
      label: 'Start Time',
      render: (item: LiveEvent) => {
        try {
          return format(new Date(item.startTime), 'MMM d, HH:mm');
        } catch {
          return item.startTime;
        }
      },
    },
    {
      key: 'isLive',
      label: 'Status',
      render: (item: LiveEvent) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.isLive
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {item.isLive ? 'LIVE' : 'Scheduled'}
        </span>
      ),
    },
    {
      key: 'links',
      label: 'Links',
      render: (item: LiveEvent) => (
        <span className="text-sm text-gray-600">
          {item.links?.length || 0} link(s)
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Live Events</h1>
        <button
          onClick={() => router.push('/dashboard/live-events/new')}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      <div className="card">
        <DataTable
          data={events}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
}
