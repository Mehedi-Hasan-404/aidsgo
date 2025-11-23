'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ChannelForm from '@/components/ChannelForm';
import { createChannel } from '@/lib/firestore';
import toast from 'react-hot-toast';

export default function NewChannelPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await createChannel(data);
      toast.success('Channel created successfully');
      router.push('/dashboard/channels');
    } catch (error) {
      toast.error('Failed to create channel');
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

      <h1 className="text-2xl font-bold mb-6">Create New Channel</h1>

      <div className="card max-w-2xl">
        <ChannelForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
