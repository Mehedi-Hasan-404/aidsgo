'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import LiveEventForm from '@/components/LiveEventForm';
import { createLiveEvent } from '@/lib/firestore';
import toast from 'react-hot-toast';

export default function NewLiveEventPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Format datetime-local to ISO string
      const formattedData = {
        ...data,
        startTime: data.startTime.replace('T', 'T') + ':00',
        endTime: data.endTime ? data.endTime.replace('T', 'T') + ':00' : undefined,
      };

      await createLiveEvent(formattedData);
      toast.success('Live event created successfully');
      router.push('/dashboard/live-events');
    } catch (error) {
      toast.error('Failed to create live event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Create New Live Event</h1>

      <div className="card max-w-3xl">
        <LiveEventForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
