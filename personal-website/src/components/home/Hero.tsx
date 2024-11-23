import Image from 'next/image';
import { SocialLinks } from './SocialLinks';

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <SocialLinks />
      </div>
    </div>
  );
};