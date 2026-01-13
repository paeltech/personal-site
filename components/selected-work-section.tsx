"use client"

import { useState } from "react"

interface Project {
  id: string
  title: string
  description: string
  year: string
  summary: string
}

export default function SelectedWorkSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const projects: Project[] = [
    {
      id: "smart-foundry",
      title: "Smart Foundry",
      description: "Director - Venture Building & Business Operations",
      year: "24",
      summary:
        "Spearheaded growth strategies for the venture studio and its portfolio, driving measurable impact across multiple startups. Led fund-raising efforts securing $80,000 in grants from the U.S Embassy in Tanzania. Established strategic partnerships and managed venture development from ideation through to market success, building a robust portfolio ecosystem.",
    },
    {
      id: "vodacom-innovation",
      title: "Vodacom Innovation Hub",
      description: "Product Manager - Venture Studio",
      year: "20",
      summary:
        "Managed the design, development, and launch of Value Added Services products for Vodacom Tanzania. Led agile product teams through UX research, roadmap planning, and feature prioritization. Successfully transitioned M-Paper to Rifaly, scaling the platform across East Africa while managing stakeholders and engineering teams to deliver market-ready solutions.",
    },
    {
      id: "buni-hub",
      title: "Buni Hub - COSTECH",
      description: "Co-Hub Manager & Innovation Lead",
      year: "18",
      summary:
        "Raised over $230,000 for innovation programs at Tanzania's first innovation hub. Served as Tanzania technical lead for the $13M Ag-youth hub project and managed bilateral ICT programs with South Africa. Coached and mentored numerous startups, facilitated training for new innovation hubs, and forged strategic partnerships with Andela, Wikimedia, and WFP.",
    },
  ]

  return (
    <section className="py-20 bg-[#f5f5f5]">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-4xl font-medium">
            Selected Work<sup className="text-lg ml-1">(3)</sup>
          </h2>
          <p className="text-gray-700">A piece from my selection of favorites</p>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border-b border-gray-200 pb-8 transition-all duration-300"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-5xl md:text-6xl font-medium mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  {hoveredProject === project.id && (
                    <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg animate-accordion-down">
                      <p className="text-gray-700 leading-relaxed">{project.summary}</p>
                    </div>
                  )}
                </div>
                <div className="text-3xl font-light ml-4">/{project.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
