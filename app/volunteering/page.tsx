import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { getVolunteering } from "@/lib/api";

export default async function Volunteering() {
    const volunteering = await getVolunteering();

    return (
        <div className="section container mx-auto px-4 mt-12 mb-12">
            <h1 className="title text-4xl font-bold font-serif mb-8">
                Volunteering
            </h1>

            <div className="content">
                {volunteering.map((vol, index) => (
                    <div key={index} className="mb-8">
                        <SectionHeader title={vol.organization} subtitle={vol.role} />
                        <p className="text-gray-500">{vol.additionalInfo}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
