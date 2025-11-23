'use client';

import { useForm } from 'react-hook-form';
import { Category } from '@/lib/types';
import slugify from 'slugify';

interface CategoryFormProps {
  initialData?: Category;
  onSubmit: (data: Omit<Category, 'id'>) => void;
  loading?: boolean;
}

export default function CategoryForm({ initialData, onSubmit, loading }: CategoryFormProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: initialData || {
      name: '',
      slug: '',
      iconUrl: '',
      m3uUrl: '',
      order: 0,
    },
  });

  const name = watch('name');

  const onFormSubmit = (data: any) => {
    const slug = data.slug || slugify(data.name, { lower: true, strict: true });
    onSubmit({ ...data, slug });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Name *
        </label>
        <input
          {...register('name', { required: 'Name is required' })}
          className="input-field"
          placeholder="Sports, Movies, News..."
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Slug
        </label>
        <input
          {...register('slug')}
          className="input-field"
          placeholder={name ? slugify(name, { lower: true }) : 'auto-generated'}
        />
        <p className="mt-1 text-sm text-gray-500">Leave empty to auto-generate</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Icon URL
        </label>
        <input
          {...register('iconUrl')}
          className="input-field"
          placeholder="https://example.com/icon.png"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          M3U URL
        </label>
        <input
          {...register('m3uUrl')}
          className="input-field"
          placeholder="https://example.com/playlist.m3u"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Order
        </label>
        <input
          type="number"
          {...register('order', { valueAsNumber: true })}
          className="input-field"
          placeholder="0"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex-1 disabled:opacity-50"
        >
          {loading ? 'Saving...' : initialData ? 'Update Category' : 'Create Category'}
        </button>
      </div>
    </form>
  );
}
