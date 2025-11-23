'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import LiveEventForm from '@/components/LiveEventForm';
import { getLiveEvent, updateLiveEvent } from '@/lib/firestore';
import { LiveEvent } from '@/lib/types';
import toast from 'react-hot-toast';

export default function EditLiveEventPage() {
  const [event, setEvent] = useState<LiveEvent | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    getLiveEvent(id).then((data) => {
      if (data) {
        // Convert ISO string to datetime-local format
        const formattedData = {
          ...data,
          startTime: data.startTime.slice(0, 16),
          endTime: data.endTime?.slice(0, 16) || '',
        };
        setEvent(formattedData);
      }
    });
  }, [id]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Format datetime-local to ISO string
      const formattedData = {
        ...data,
        startTime: data.startTime + ':00',
        endTime: data.endTime ? data.endTime + ':00' : undefined,
      };

      await updateLiveEvent(id, formattedData);
      toast.success('Live event updated successfully');
      router.push('/dashboard/live-events');
    } catch (error) {
      toast.error('Failed to update live event');
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Edit Live Event</h1>

      <div className="card max-w-3xl">
        <LiveEventForm
          initialData={event}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
