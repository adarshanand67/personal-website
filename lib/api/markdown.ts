export const parseFrontmatter = (content: string) => {
    const match = /---\s*([\s\S]*?)\s*---/.exec(content);
    if (!match) return { data: {}, content };
    const data: Record<string, string> = {};
    match[1]?.split("\n").forEach(line => {
        const [k, ...v] = line.split(": ");
        if (k) data[k.trim()] = v.join(": ").trim().replace(/^['"](.*)['"]$/, "$1");
    });
    return { data, content: content.replace(/---\s*([\s\S]*?)\s*---/, "").trim() };
};
