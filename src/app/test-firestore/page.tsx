// Create this as: src/app/test-firestore/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function TestFirestore() {
  const [status, setStatus] = useState<string>('Testing...');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        setStatus('Connecting to Firestore...');
        
        // Test categories
        const categoriesSnapshot = await getDocs(collection(db, 'categories'));
        const categories = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Test channels
        const channelsSnapshot = await getDocs(collection(db, 'channels'));
        const channels = channelsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setData({
          categories,
          channels,
          categoriesCount: categories.length,
          channelsCount: channels.length,
        });
        
        setStatus('✅ Connection successful!');
      } catch (error: any) {
        setStatus(`❌ Error: ${error.message}`);
        console.error('Firestore test error:', error);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Firestore Connection Test</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h2 className="font-semibold mb-2">Status:</h2>
        <p>{status}</p>
      </div>
      
      {data && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold mb-4">Data Summary:</h2>
          <p className="mb-2">Categories: {data.categoriesCount}</p>
          <p className="mb-4">Channels: {data.channelsCount}</p>
          
          <h3 className="font-semibold mt-4 mb-2">Categories:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(data.categories, null, 2)}
          </pre>
          
          <h3 className="font-semibold mt-4 mb-2">Channels:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(data.channels, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
