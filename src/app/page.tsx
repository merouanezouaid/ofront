'use client';


import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [interests, setInterests] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue && interests.length < 3) {
      setInterests([...interests, inputValue]);
      setInputValue('');
    }
  };

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const redirect = () => {
    router.push('/video');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' xmlns:svgjs=\'http://svgjs.dev/svgjs\' width=\'2000\' height=\'560\' preserveAspectRatio=\'none\' viewBox=\'0 0 2000 560\'%3e%3cg mask=\'url(%26quot%3b%23SvgjsMask1085%26quot%3b)\' fill=\'none\'%3e%3cpath d=\'M 0%2c196 C 133.4%2c247.6 400.2%2c438.8 667%2c454 C 933.8%2c469.2 1067.4%2c264 1334%2c272 C 1600.6%2c280 1866.8%2c449.6 2000%2c494L2000 560L0 560z\' fill=\'rgba(156%2c 99%2c 255%2c 1)\'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id=\'SvgjsMask1085\'%3e%3crect width=\'2000\' height=\'560\' fill=\'white\'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e')] bg-no-repeat bg-bottom animate-change font-manrope">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">omates</h1>
        <h4 className="text-xl mb-6">add your interests</h4>
        <div className="border border-gray-300 rounded-md p-1 min-h-[26px] mb-6 flex flex-wrap items-center" onClick={() => document.getElementById('interests')?.focus()}>
          {interests.map((interest, index) => (
            <div key={index} className="m-1 px-2 py-1 bg-gray-200 text-gray-700 rounded-md flex items-center">
              <span>{interest}</span>
              <span className="ml-2 cursor-pointer" onClick={() => removeInterest(index)}>&times;</span>
            </div>
          ))}
          <input
            id="interests"
            className="border-0 outline-none text-lg flex-grow"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={handleKeyUp}
            placeholder="Enter an interest and press Enter"
          />
        </div>
        <button
          onClick={redirect}
          className="px-5 py-2 font-bold text-lg text-purple-600 bg-white rounded-full outline outline-2 outline-violet-300 min-w-[200px] cursor-pointer transition-all duration-300 hover:bg-violet-300 hover:text-white hover:scale-110"
        >
          Start Chat
        </button>
      </div>
    </div>
  );
}