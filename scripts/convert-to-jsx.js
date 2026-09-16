const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const SRC_DIR = path.join(__dirname, '..', 'src');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function convertFiles() {
  const files = getAllFiles(SRC_DIR);
  console.log(`Found ${files.length} files in src/`);

  let convertedCount = 0;

  for (const filePath of files) {
    const ext = path.extname(filePath);
    if (ext === '.tsx' || ext === '.ts') {
      const sourceCode = fs.readFileSync(filePath, 'utf-8');

      // Transpile TypeScript out, preserve JSX syntax
      const result = ts.transpileModule(sourceCode, {
        compilerOptions: {
          jsx: ts.JsxEmit.Preserve,
          target: ts.ScriptTarget.ESNext,
          module: ts.ModuleKind.ESNext,
          removeComments: false,
        },
      });

      const newExt = ext === '.tsx' ? '.jsx' : '.js';
      const newFilePath = filePath.slice(0, -ext.length) + newExt;

      fs.writeFileSync(newFilePath, result.outputText, 'utf-8');
      fs.unlinkSync(filePath); // delete original .tsx / .ts
      convertedCount++;
      console.log(`Converted: ${path.relative(SRC_DIR, filePath)} -> ${path.relative(SRC_DIR, newFilePath)}`);
    }
  }

  // Update index.html
  const indexPath = path.join(__dirname, '..', 'index.html');
  if (fs.existsSync(indexPath)) {
    let indexHtml = fs.readFileSync(indexPath, 'utf-8');
    indexHtml = indexHtml.replace('/src/main.tsx', '/src/main.jsx');
    fs.writeFileSync(indexPath, indexHtml, 'utf-8');
    console.log('Updated index.html to point to /src/main.jsx');
  }

  // Rename vite.config.ts to vite.config.mjs
  const viteConfigTs = path.join(__dirname, '..', 'vite.config.ts');
  const viteConfigMjs = path.join(__dirname, '..', 'vite.config.mjs');
  if (fs.existsSync(viteConfigTs)) {
    const configCode = fs.readFileSync(viteConfigTs, 'utf-8');
    fs.writeFileSync(viteConfigMjs, configCode, 'utf-8');
    fs.unlinkSync(viteConfigTs);
    console.log('Converted vite.config.ts -> vite.config.mjs');
  }

  // Remove tsconfig.json if present
  const tsConfigPath = path.join(__dirname, '..', 'tsconfig.json');
  if (fs.existsSync(tsConfigPath)) {
    fs.unlinkSync(tsConfigPath);
    console.log('Removed tsconfig.json');
  }

  console.log(`Successfully converted ${convertedCount} files to pure JavaScript / JSX!`);
}

convertFiles();
