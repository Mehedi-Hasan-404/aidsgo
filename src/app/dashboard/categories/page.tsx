'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import DataTable from '@/components/DataTable';
import { Category } from '@/lib/types';
import { getCategories, deleteCategory } from '@/lib/firestore';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleEdit = (category: Category) => {
    router.push(`/dashboard/categories/${category.id}`);
  };

  const handleDelete = async (category: Category) => {
    if (!confirm(`Delete "${category.name}"?`)) return;

    try {
      await deleteCategory(category.id);
      toast.success('Category deleted');
      loadCategories();
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'slug', label: 'Slug' },
    { key: 'order', label: 'Order' },
    {
      key: 'iconUrl',
      label: 'Icon',
      render: (item: Category) => (
        item.iconUrl ? (
          <img src={item.iconUrl} alt={item.name} className="w-10 h-10 object-contain" />
        ) : (
          <span className="text-gray-400">No icon</span>
        )
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={() => router.push('/dashboard/categories/new')}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <div className="card">
        <DataTable
          data={categories}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
}
