# setup-nextjs-project.ps1

# Create root directory and navigate into it
New-Item -ItemType Directory -Path "personal-website"
Set-Location "personal-website"

# Create core config files
"" | Out-File "package.json"
"" | Out-File "tsconfig.json"
"" | Out-File "next.config.js"
"" | Out-File "tailwind.config.js"
"" | Out-File "postcss.config.js"
"" | Out-File ".env.example"
"" | Out-File ".gitignore"
"" | Out-File "README.md"

# Create src directory structure
$srcDirs = @(
    "src/app",
    "src/app/bio",
    "src/app/apps",
    "src/app/blog",
    "src/app/blog/[slug]",
    "src/components/layout",
    "src/components/home",
    "src/components/bio",
    "src/components/apps",
    "src/components/blog",
    "src/lib/mongodb",
    "src/lib/mongodb/models",
    "src/lib/utils",
    "src/lib/config",
    "src/types",
    "public/images",
    "public/icons"
)

foreach ($dir in $srcDirs) {
    New-Item -ItemType Directory -Path $dir -Force
}

# Create stub files
$stubs = @{
    "src/app/layout.tsx" = "export default function RootLayout({ children }) { return <>{children}</> }"
    "src/app/page.tsx" = "export default function HomePage() { return <main></main> }"
    "src/app/bio/page.tsx" = "export default function BioPage() { return <div></div> }"
    "src/app/apps/page.tsx" = "export default function AppsPage() { return <div></div> }"
    "src/app/blog/page.tsx" = "export default function BlogPage() { return <div></div> }"
    "src/components/layout/Header.tsx" = "export const Header = () => { return <header></header> }"
    "src/components/layout/Footer.tsx" = "export const Footer = () => { return <footer></footer> }"
    "src/components/home/Hero.tsx" = "export const Hero = () => { return <div></div> }"
    "src/lib/mongodb/client.ts" = "// MongoDB client configuration"
    "src/types/project.ts" = "// Project type definitions"
}

foreach ($file in $stubs.Keys) {
    $stubs[$file] | Out-File $file -Encoding UTF8
}

Write-Host "Project structure created successfully!"