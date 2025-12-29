const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const OUT_DIR = path.join(process.cwd(), "out");
const SW_PATH = path.join(OUT_DIR, "sw.js");

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

if (!fs.existsSync(OUT_DIR)) {
  console.log("Out directory does not exist. Skipping SW generation.");
  process.exit(0);
}

const files = getAllFiles(OUT_DIR);
const manifest = files
  .map((file) => {
    const relativePath = path.relative(OUT_DIR, file);
    // Ignore sw.js, and map files
    if (relativePath === "sw.js" || relativePath.endsWith(".map")) return null;
    return "/" + relativePath; // Ensure leading slash
  })
  .filter(Boolean);

console.log(`Generated manifest with ${manifest.length} files.`);

if (fs.existsSync(SW_PATH)) {
  let swContent = fs.readFileSync(SW_PATH, "utf8");

  // Replace the placeholder or inject variable
  const manifestString = JSON.stringify(manifest);
  // We prefer injecting it at the top
  const injection = `const __PRECACHE_MANIFEST__ = ${manifestString};\n`;

  // If we had a placeholder token, we'd replace it.
  // Since we plan to update sw.js to use this variable, we can prepend it?
  // But sw.js is already built/copy to out/sw.js.
  // Better to READ source sw.js, PREPEND, and WRITE to out/sw.js

  // Actually, let's just REPLACE the urlsToCache in place if possible,
  // or better yet, our source `public/sw.js` will have:
  // const urlsToCache = self.__PRECACHE_MANIFEST__ || [];
  // And we prepend the variable definition.

  const finalContent = injection + swContent;
  fs.writeFileSync(SW_PATH, finalContent);
  console.log("Service Worker updated with precache manifest.");
} else {
  console.log("sw.js not found in out directory.");
}
