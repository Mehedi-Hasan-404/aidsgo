import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Category, Channel, LiveEvent } from './types';

// Categories
export const getCategories = async (): Promise<Category[]> => {
  const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
};

export const getCategory = async (id: string): Promise<Category | null> => {
  const docRef = doc(db, 'categories', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Category : null;
};

export const createCategory = async (data: Omit<Category, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'categories'), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateCategory = async (id: string, data: Partial<Category>): Promise<void> => {
  const docRef = doc(db, 'categories', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

export const deleteCategory = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'categories', id));
};

// Channels
export const getChannels = async (categoryId?: string): Promise<Channel[]> => {
  let q = query(collection(db, 'channels'));
  if (categoryId) {
    q = query(collection(db, 'channels'), where('categoryId', '==', categoryId));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Channel));
};

export const getChannel = async (id: string): Promise<Channel | null> => {
  const docRef = doc(db, 'channels', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Channel : null;
};

export const createChannel = async (data: Omit<Channel, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'channels'), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateChannel = async (id: string, data: Partial<Channel>): Promise<void> => {
  const docRef = doc(db, 'channels', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

export const deleteChannel = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'channels', id));
};

// Live Events
export const getLiveEvents = async (): Promise<LiveEvent[]> => {
  const q = query(collection(db, 'live_events'), orderBy('startTime', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LiveEvent));
};

export const getLiveEvent = async (id: string): Promise<LiveEvent | null> => {
  const docRef = doc(db, 'live_events', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as LiveEvent : null;
};

export const createLiveEvent = async (data: Omit<LiveEvent, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'live_events'), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateLiveEvent = async (id: string, data: Partial<LiveEvent>): Promise<void> => {
  const docRef = doc(db, 'live_events', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

export const deleteLiveEvent = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'live_events', id));
};
