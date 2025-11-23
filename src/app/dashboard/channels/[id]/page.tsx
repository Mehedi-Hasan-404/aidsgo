'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ChannelForm from '@/components/ChannelForm';
import { getChannel, updateChannel } from '@/lib/firestore';
import { Channel } from '@/lib/types';
import toast from 'react-hot-toast';

export default function EditChannelPage() {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    getChannel(id).then(setChannel);
  }, [id]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await updateChannel(id, data);
      toast.success('Channel updated successfully');
      router.push('/dashboard/channels');
    } catch (error) {
      toast.error('Failed to update channel');
    } finally {
      setLoading(false);
    }
  };

  if (!channel) {
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

      <h1 className="text-2xl font-bold mb-6">Edit Channel</h1>

      <div className="card max-w-2xl">
        <ChannelForm
          initialData={channel}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
