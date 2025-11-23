'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import CategoryForm from '@/components/CategoryForm';
import { getCategory, updateCategory } from '@/lib/firestore';
import { Category } from '@/lib/types';
import toast from 'react-hot-toast';

export default function EditCategoryPage() {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    getCategory(id).then(setCategory);
  }, [id]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await updateCategory(id, data);
      toast.success('Category updated successfully');
      router.push('/dashboard/categories');
    } catch (error) {
      toast.error('Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  if (!category) {
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

      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>

      <div className="card max-w-2xl">
        <CategoryForm
          initialData={category}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
