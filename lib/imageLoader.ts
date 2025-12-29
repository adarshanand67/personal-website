export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith("https://") || src.startsWith("http://")) {
    return src;
  }
  return `/nextImageExportOptimizer${src}?width=${width}&quality=${quality || 75}`;
}
