"use client";
import * as lucideReact from "lucide-react";
import { useMounted } from "@/lib/hooks/useMounted";
function createClientIcon(Icon: React.ComponentType<lucideReact.LucideProps>) {
    return function ClientIcon(props: lucideReact.LucideProps) {
        const mounted = useMounted();
        if (!mounted) return <div className={props.className} aria-hidden="true" />;
        return <Icon {...props} />;
    };
}
export const ClientLinkedin = createClientIcon(lucideReact.Linkedin);
export const ClientGithub = createClientIcon(lucideReact.Github);
export const ClientMail = createClientIcon(lucideReact.Mail);
