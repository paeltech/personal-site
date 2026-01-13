"use client"

export default function AboutSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-black rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-black rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left column - About text */}
          <div className="lg:col-span-8">
            <h2 className="text-4xl md:text-5xl font-medium mb-8 leading-tight">About me</h2>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                I'm <strong>Paul Mandele</strong>, a <strong>Venture Builder and Innovation Strategist</strong> with
                over a decade of experience transforming bold ideas into market-ready businesses. My journey has spanned
                from co-founding startups to leading innovation initiatives at scale across East Africa.
              </p>


              <p>
                From establishing and managing innovation support organizations like hubs, acccelerators, venture studios to working on policies level, working with startups, corporates, governments and DFIs to serving on the Tanzania National ICT Skills Council, I've dedicated my career to building ecosystems where technology and innovation thrive. I believe in the power of design thinking, data-driven strategies, and relentless execution.
              </p>

              <p className="text-black font-medium text-xl mt-8">
                Whether it's launching new ventures, transforming organizations, or mentoring the next generation of
                innovators, I'm driven by impact that matters.
              </p>
            </div>
          </div>

          {/* Right column - Experience highlight */}
          <div className="lg:col-span-4">
            <div className="relative">
              <div className="bg-black text-white p-12 relative overflow-hidden group hover:bg-gray-900 transition-colors duration-300">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 transform translate-x-12 -translate-y-12 rotate-45" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 transform -translate-x-16 translate-y-16 rotate-45" />

                <div className="relative z-10">
                  <div className="text-7xl md:text-8xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">
                    10+
                  </div>
                  <div className="text-xl font-medium uppercase tracking-wider mb-4">Years Experience</div>
                  <div className="w-16 h-1 bg-white/30 mb-4" />
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Building ventures, leading innovation, and transforming ideas into scalable businesses across East
                    Africa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
