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
      title: "Design Sprints",
      content:
        "Rapid, structured workshops that compress months of work into focused sessions. We validate ideas, solve critical business challenges, and prototype solutions in days rather than weeks—reducing risk and accelerating time-to-market.",
    },
    {
      id: "02",
      number: "02.",
      title: "Innovation Workshops",
      content:
        "Interactive sessions that unlock creative thinking and collaborative problem-solving within your team. We facilitate ideation, opportunity identification, and strategic alignment to drive breakthrough innovations aligned with business objectives.",
    },
    {
      id: "03",
      number: "03.",
      title: "Market Research",
      content:
        "Deep customer insights and competitive intelligence that inform strategic decisions. We conduct user research, market analysis, and validation studies to ensure solutions meet real market needs and have product-market fit.",
    },
    {
      id: "04",
      number: "04.",
      title: "Innovation Strategy",
      content:
        "Comprehensive roadmaps that align innovation initiatives with business goals. We develop transformation strategies, portfolio management frameworks, and execution plans that turn vision into sustainable competitive advantage.",
    },
    {
      id: "05",
      number: "05.",
      title: "Technical Development",
      content:
        "Building scalable, market-ready solutions with modern technology stacks. From MVP development to production systems, we ensure technical excellence, optimal architecture, and seamless user experiences that delight customers.",
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
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                I bring a holistic approach to innovation and venture building, combining strategic thinking with
                hands-on execution. My methodology integrates design sprints for rapid idea validation, innovation
                workshops to align teams, comprehensive market research to ensure product-market fit, and strategic
                innovation frameworks that drive meaningful transformation.
              </p>
              <p>
                From initial concept through to scalable ventures, I orchestrate the entire journey—managing technical
                development to build robust solutions and overseeing product management to deliver continuous value.
                This end-to-end approach ensures your ventures are built on solid foundations and positioned for
                sustainable growth.
              </p>
            </div>
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
