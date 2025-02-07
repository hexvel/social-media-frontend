import Image from "next/image";

export default function FullscreenLoader() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='animate-[pulse_1s_ease-in-out_infinite] flex flex-col items-center'>
        <Image
          src='/logo.png'
          alt='HexBook Logo'
          className='w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full'
          width={100}
          height={100}
        />
        <span className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-white'>
          HEXBOOK
        </span>
      </div>
    </div>
  );
}
