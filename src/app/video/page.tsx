'use client';

import { useEffect, useRef, useState } from 'react';
import VideoChat from '@/components/VideoChat';
import { initializeSocket, sendMessage } from '@/utils/socket';

export default function Video() {
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Array<{sender: string, text: string}>>([]);
  const [inputValue, setInputValue] = useState('');
  const chatWrapperRef = useRef<HTMLDivElement>(null);

  const myVideoRef = useRef<HTMLVideoElement>(null);
  const strangerVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (myVideoRef.current && strangerVideoRef.current) {
      initializeSocket(
        (q: string) => setQuestion(q),
        (loading: boolean) => setIsLoading(loading),
        (sender: string, text: string) => setMessages(prev => [...prev, { sender, text }]),
        myVideoRef.current,
        strangerVideoRef.current
      );
    }

  }, []);

  useEffect(() => {
    if (chatWrapperRef.current) {
      chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setMessages(prev => [...prev, { sender: 'You', text: inputValue }]);
      setInputValue('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 h-screen overflow-hidden font-montserrat">
      {isLoading && (
        <div className="absolute inset-0 bg-purple-900 bg-opacity-50 z-50 flex justify-center items-center">
          <span id="spinner" className="text-white font-bold text-lg animate-fade">Waiting For Someone...</span>
        </div>
      )}
      <div className="col-span-3 p-8 lg:p-15">
      <div className="relative w-full h-[calc(100vh-4rem)]">
      <video ref={strangerVideoRef} autoPlay playsInline className="w-full h-full object-cover bg-black rounded-3xl" />
      <video ref={myVideoRef} autoPlay muted playsInline className="absolute bottom-5 right-5 w-72 h-72 lg:w-[300px] lg:h-[300px] rounded-full object-cover bg-purple-100 outline outline-2 outline-violet-300" />
    </div>
      </div>
      <div className="col-span-1 p-8 h-screen overflow-auto border-l-2 border-light-blue-200">
        <div className="text-center text-xl mb-6">{question}</div>
        <div ref={chatWrapperRef} className="mb-20 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="text-gray-700">
              <b>{msg.sender}: </b> <span>{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 max-w-[25%] bg-white p-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-2 rounded-full outline-none border-2 border-violet-300 focus:border-violet-500"
              placeholder='Type your message here..'
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="px-5 py-2 font-bold text-white bg-purple-600 rounded-full outline-none border-2 border-violet-300 hover:bg-purple-700 transition-colors duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}