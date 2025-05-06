"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

interface ProcessStep {
  id: string
  number: string
  title: string
  content: string
}

export default function ProcessSection() {
  const [openStep, setOpenStep] = useState("01")

  const steps: ProcessStep[] = [
    {
      id: "01",
      number: "01.",
      title: "UX / Wireframing",
      content:
        "Here we map out the elements clearly, so you can see what elements will be built into the end-product, and have a better idea of the intended behavior end-users will have while using it.",
    },
    {
      id: "02",
      number: "02.",
      title: "Web Design",
      content:
        "I create visually appealing designs that align with your brand identity. This includes color schemes, typography, imagery, and overall aesthetic that will resonate with your target audience.",
    },
    {
      id: "03",
      number: "03.",
      title: "Web Development",
      content:
        "Transforming designs into functional websites using modern development practices. I ensure responsive layouts, optimal performance, and clean code that's easy to maintain and scale.",
    },
    {
      id: "04",
      number: "04.",
      title: "Analytics Setup / Support",
      content:
        "Implementation of tracking tools to monitor website performance and user behavior. I provide ongoing support to help you understand the data and make informed decisions for continuous improvement.",
    },
  ]

  const toggleStep = (stepId: string) => {
    setOpenStep(openStep === stepId ? "" : stepId)
  }

  return (
    <section className="py-20 bg-[#f5f5f5]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <h2 className="text-4xl md:text-5xl font-medium mb-8 leading-tight">My way of getting things done</h2>
            <p className="text-gray-700">
              Fast and transparent, the path to owning a website that will represent your brand in the best of light is
              only 4 weeks away. Standing by the Waterfall methodology, I assure a step by step completion of the whole
              process.
            </p>
          </div>

          <div>
            {steps.map((step) => (
              <div key={step.id} className="border-b border-gray-200 py-6">
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full flex items-center justify-between text-left"
                  aria-expanded={openStep === step.id}
                >
                  <div className="flex items-center">
                    <span className="text-xl font-medium mr-4">{step.number}</span>
                    <span className="text-xl font-medium">{step.title}</span>
                  </div>
                  {openStep === step.id ? (
                    <Minus className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 flex-shrink-0" />
                  )}
                </button>

                {openStep === step.id && (
                  <div className="mt-4 pl-12 pr-8 text-gray-700 animate-accordion-down">{step.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
