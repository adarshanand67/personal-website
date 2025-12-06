import SectionHeader from "@/components/SectionHeader";
import { getExperiences } from "@/lib/api";

export default async function Experience() {
    const experiences = await getExperiences();

    return (
        <div className="section container mx-auto px-4 mt-12 mb-12">
            <h1 className="title text-4xl font-bold font-serif mb-8">
                Experience
            </h1>

            <div className="content">
                {experiences.map((exp, index) => (
                    <div key={index} className="mb-12">
                        <SectionHeader title={exp.company} subtitle={exp.role} />
                        <p className="text-gray-500 mb-2">{exp.duration} • {exp.location}</p>
                        {exp.description && <p className="mb-4">{exp.description}</p>}
                        {exp.highlights.length > 0 && (
                            <ul className="list-disc pl-5 space-y-2">
                                {exp.highlights.map((highlight, idx) => (
                                    <li key={idx}>{highlight}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
