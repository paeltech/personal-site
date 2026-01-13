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
            <h3 className="text-2xl font-medium mb-4">Innovation Management</h3>
            <p className="text-gray-700">
              Strategic guidance to embed innovation into your organization's DNA. From ideation frameworks to execution
              strategies, I help organizations build sustainable innovation capabilities that drive growth and
              competitive advantage.
            </p>
          </div>

          <div className="p-8 border border-gray-200">
            <div className="text-6xl font-light text-gray-300 mb-8">02</div>
            <h3 className="text-2xl font-medium mb-4">Venture Building</h3>
            <p className="text-gray-700">
              End-to-end venture creation from concept to market-ready business. I guide organizations through
              validation, product development, and go-to-market strategies to launch successful new ventures that create
              value and capture market opportunities.
            </p>
          </div>

          <div className="p-8 border border-gray-200">
            <div className="text-6xl font-light text-gray-300 mb-8">03</div>
            <h3 className="text-2xl font-medium mb-4">Digital Transformation</h3>
            <p className="text-gray-700">
              Transform your organization for the digital age. I design and implement comprehensive digital strategies
              that modernize operations, enhance customer experiences, and unlock new business models through technology
              and innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
