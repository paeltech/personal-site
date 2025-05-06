import AnimatedArrow from "./animated-arrow"

export default function ServicesSection() {
  return (
    <section className="py-20 bg-[#f5f5f5]">
      <div className="container mx-auto px-6">
        <div className="flex items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium">I can help you with...</h2>
          <AnimatedArrow
            targetId="services-grid"
            className="ml-4 text-gray-500 hover:text-black transition-colors cursor-pointer"
          />
        </div>

        <div id="services-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 border border-gray-200">
            <div className="text-6xl font-light text-gray-300 mb-8">01</div>
            <h3 className="text-2xl font-medium mb-4">Design</h3>
            <p className="text-gray-700">
              I make web designs that engage your audience and create the user experience you want.
            </p>
          </div>

          <div className="p-8 border border-gray-200">
            <div className="text-6xl font-light text-gray-300 mb-8">02</div>
            <h3 className="text-2xl font-medium mb-4">Development</h3>
            <p className="text-gray-700">
              Bringing visuals to life through developing highly functional web solutions.
            </p>
          </div>

          <div className="p-8 border border-gray-200">
            <div className="text-6xl font-light text-gray-300 mb-8">03</div>
            <h3 className="text-2xl font-medium mb-4">The Full Package</h3>
            <p className="text-gray-700">
              Get the best of both worlds for your website, capture your brand identity and get fully functional
              features.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
