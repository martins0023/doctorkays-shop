"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Preloader from '../components/Preloader';


const Home = () => {
  
  const router = useRouter();

  useEffect(() => {
    router.push('/shop');
  }, [router]);

  return (
    <Preloader />
  );
};

export default Home;
