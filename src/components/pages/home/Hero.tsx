export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/sampleVideo.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 flex h-full items-center justify-center bg-black/50">
        <h1 className="px-4 text-center text-4xl font-bold text-white md:text-6xl">Impulsando</h1>
        <h1 className="px-4 text-center text-4xl font-bold text-white md:text-6xl">Creatividad</h1>
      </div>
    </section>
  );
};
