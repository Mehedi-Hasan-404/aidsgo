'use client';

import { useForm } from 'react-hook-form';
import { Channel, Category } from '@/lib/types';
import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/firestore';

interface ChannelFormProps {
  initialData?: Channel;
  onSubmit: (data: Omit<Channel, 'id'>) => void;
  loading?: boolean;
}

export default function ChannelForm({ initialData, onSubmit, loading }: ChannelFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: initialData || {
      name: '',
      logoUrl: '',
      streamUrl: '',
      categoryId: '',
      categoryName: '',
    },
  });

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const categoryId = watch('categoryId');

  const onFormSubmit = (data: any) => {
    const category = categories.find(c => c.id === data.categoryId);
    onSubmit({
      ...data,
      categoryName: category?.name || '',
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Channel Name *
        </label>
        <input
          {...register('name', { required: 'Name is required' })}
          className="input-field"
          placeholder="BBC News, CNN, ESPN..."
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          {...register('categoryId', { required: 'Category is required' })}
          className="input-field"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo URL *
        </label>
        <input
          {...register('logoUrl', { required: 'Logo URL is required' })}
          className="input-field"
          placeholder="https://example.com/logo.png"
        />
        {errors.logoUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.logoUrl.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stream URL *
        </label>
        <input
          {...register('streamUrl', { required: 'Stream URL is required' })}
          className="input-field"
          placeholder="https://example.com/stream.m3u8"
        />
        {errors.streamUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.streamUrl.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex-1 disabled:opacity-50"
        >
          {loading ? 'Saving...' : initialData ? 'Update Channel' : 'Create Channel'}
        </button>
      </div>
    </form>
  );
}
