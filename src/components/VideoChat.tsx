'use client';

import { useEffect, useRef } from 'react';
import { initializeSocket } from '@/utils/socket';

export default function VideoChat() {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const strangerVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (myVideoRef.current && strangerVideoRef.current) {

    }
  }, []);
}