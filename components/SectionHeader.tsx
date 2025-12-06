import Link from "next/link";

interface SectionHeaderProps {
    title: string;
    linkText?: string;
    linkHref?: string;
    subtitle?: string;
}

export default function SectionHeader({
    title,
    linkText,
    linkHref,
    subtitle,
}: SectionHeaderProps) {
    return (
        <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold flex items-center flex-wrap gap-2 text-[#363636]">
                <span>{title}</span>
                {linkText && linkHref && (
                    <>
                        <span className="font-normal mx-1">•</span>
                        <span className="text-base font-normal">
                            <Link href={linkHref} className="text-blue-600 hover:underline">
                                {linkText}
                            </Link>
                        </span>
                    </>
                )}
            </h2>
            {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
        </div>
    );
}
