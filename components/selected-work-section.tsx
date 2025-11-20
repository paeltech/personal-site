"use client"

interface Project {
  id: string
  title: string
  description: string
  year: string
}

export default function SelectedWorkSection() {
  const projects: Project[] = [
    {
      id: "ultra-ooh",
      title: "Ultra Ooh",
      description: "Web Design, Webflow Development",
      year: "22",
    },
    {
      id: "alex-becher",
      title: "Alex Becher",
      description: "Web Design, Webflow Development",
      year: "21",
    },
    {
      id: "kordes-invest",
      title: "Kordes Invest",
      description: "Web Design, Webflow Development",
      year: "21",
    },
  ]

  return (
    <section className="py-20 bg-[#f5f5f5]">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-4xl font-medium">
            Selected Work<sup className="text-lg ml-1">(4)</sup>
          </h2>
          <p className="text-gray-700">A piece from my selection of favorites</p>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.id} className="border-b border-gray-200 pb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-5xl md:text-6xl font-medium mb-2">{project.title}</h3>
                  <p className="text-gray-700">{project.description}</p>
                </div>
                <div className="text-3xl font-light">/{project.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
