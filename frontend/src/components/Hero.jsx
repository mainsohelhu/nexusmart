const Hero = () => {
  return (
    <div className="relative bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 lg:flex items-center justify-between">
        
        {/* Text Content */}
        <div className="lg:w-1/2 mb-12 lg:mb-0 z-10">
          <span className="text-nexus-primary font-bold tracking-widest uppercase text-sm mb-4 block">
            New Season Arrival
          </span>
          <h1 className="text-5xl md:text-7xl font-syne font-black leading-tight text-nexus-dark mb-6">
            The Next Generation <br />
            <span className="text-nexus-primary">of Shopping.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg">
            Experience the future of e-commerce with NexusMart. Premium products, 
            lightning-fast delivery, and an elite shopping experience.
          </p>
          <div className="flex gap-4">
            <button className="bg-nexus-primary text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-indigo-200">
              Shop Now
            </button>
            <button className="border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-white transition-colors">
              Explore Tech
            </button>
          </div>
        </div>

        {/* Visual Element (Placeholder for now) */}
        <div className="lg:w-1/2 relative">
          <div className="w-full h-[400px] md:h-[500px] bg-indigo-100 rounded-[2rem] overflow-hidden relative rotate-3 hover:rotate-0 transition-transform duration-500">
             {/* We will add a high-quality product image here later */}
             <div className="absolute inset-0 flex items-center justify-center text-indigo-300 font-syne text-2xl font-black">
                NEXUS VISUAL
             </div>
          </div>
          {/* Decorative Blob */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-400/20 blur-3xl rounded-full"></div>
        </div>

      </div>
    </div>
  );
};

export default Hero;