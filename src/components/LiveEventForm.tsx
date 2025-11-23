'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { LiveEvent } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';

interface LiveEventFormProps {
  initialData?: LiveEvent;
  onSubmit: (data: Omit<LiveEvent, 'id'>) => void;
  loading?: boolean;
}

export default function LiveEventForm({ initialData, onSubmit, loading }: LiveEventFormProps) {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: initialData || {
      category: '',
      league: '',
      team1Name: '',
      team1Logo: '',
      team2Name: '',
      team2Logo: '',
      startTime: '',
      endTime: '',
      isLive: false,
      links: [{ label: '', url: '' }],
      title: '',
      description: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team 1 Name *
          </label>
          <input
            {...register('team1Name', { required: 'Required' })}
            className="input-field"
            placeholder="Manchester United"
          />
          {errors.team1Name && (
            <p className="mt-1 text-sm text-red-600">{errors.team1Name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team 2 Name *
          </label>
          <input
            {...register('team2Name', { required: 'Required' })}
            className="input-field"
            placeholder="Liverpool"
          />
          {errors.team2Name && (
            <p className="mt-1 text-sm text-red-600">{errors.team2Name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team 1 Logo URL
          </label>
          <input
            {...register('team1Logo')}
            className="input-field"
            placeholder="https://example.com/team1.png"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team 2 Logo URL
          </label>
          <input
            {...register('team2Logo')}
            className="input-field"
            placeholder="https://example.com/team2.png"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          {...register('title')}
          className="input-field"
          placeholder="Leave empty to auto-generate"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <input
            {...register('category', { required: 'Required' })}
            className="input-field"
            placeholder="Football, Basketball..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            League *
          </label>
          <input
            {...register('league', { required: 'Required' })}
            className="input-field"
            placeholder="Premier League, NBA..."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Time *
          </label>
          <input
            type="datetime-local"
            {...register('startTime', { required: 'Required' })}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Time
          </label>
          <input
            type="datetime-local"
            {...register('endTime')}
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('isLive')}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Currently Live
          </span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          {...register('description')}
          className="input-field"
          rows={3}
          placeholder="Event description..."
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Stream Links *
          </label>
          <button
            type="button"
            onClick={() => append({ label: '', url: '' })}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Link
          </button>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...register(`links.${index}.label` as const)}
                className="input-field flex-1"
                placeholder="Link label (HD, SD...)"
              />
              <input
                {...register(`links.${index}.url` as const)}
                className="input-field flex-[2]"
                placeholder="Stream URL"
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex-1 disabled:opacity-50"
        >
          {loading ? 'Saving...' : initialData ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
}
