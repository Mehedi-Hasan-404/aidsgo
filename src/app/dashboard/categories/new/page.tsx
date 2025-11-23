'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import CategoryForm from '@/components/CategoryForm';
import { createCategory } from '@/lib/firestore';
import toast from 'react-hot-toast';

export default function NewCategoryPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await createCategory(data);
      toast.success('Category created successfully');
      router.push('/dashboard/categories');
    } catch (error) {
      toast.error('Failed to create category');
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

      <h1 className="text-2xl font-bold mb-6">Create New Category</h1>

      <div className="card max-w-2xl">
        <CategoryForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
