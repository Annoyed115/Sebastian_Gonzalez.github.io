// Everything the portfolio says, in Spanish and English. Edit texts, projects and links here.
export type Lang = "es" | "en";
type T = Record<Lang, string>;

export const LINKS = {
  github: "https://github.com/Annoyed115",
  linkedin: "https://linkedin.com/in/sebastian-gonzalez115/",
  email: "sebas.nice12@gmail.com",
  source: "https://github.com/Annoyed115/Sebastian_Gonzalez.github.io",
};

export const UI = {
  nav: {
    projects: { es: "Proyectos", en: "Projects" },
    journey: { es: "Trayectoria", en: "Journey" },
    about: { es: "Sobre mí", en: "About" },
    contact: { es: "Contacto", en: "Contact" },
  },
  switchTo: { es: "Switch to English", en: "Cambiar a español" },
  skip: { es: "Saltar al contenido", en: "Skip to content" },
  hello: { es: "¡Hola! Soy Sebastian", en: "Hi! I'm Sebastian" },
  role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
  pitch: {
    es: "Diseño y construyo sitios y aplicaciones web, de la idea al despliegue, con animaciones que se sienten bien.",
    en: "I design and build websites and web apps, from the idea to deployment, with motion that feels good.",
  },
  seeProjects: { es: "Ver proyectos", en: "See projects" },
  contactMe: { es: "Contáctame", en: "Contact me" },
  projectsTitle: { es: "Proyectos", en: "Projects" },
  featured: { es: "Proyecto destacado", en: "Featured project" },
  liveSite: { es: "Ver sitio", en: "Live site" },
  code: { es: "Ver código", en: "View code" },
  journeyTitle: { es: "Trayectoria", en: "Journey" },
  journeyIntro: {
    es: "Del primer sitio en HTML a aplicaciones completas en producción.",
    en: "From a first HTML page to complete applications in production.",
  },
  stackTitle: { es: "Con qué trabajo", en: "What I work with" },
  aboutTitle: { es: "Sobre mí", en: "About me" },
  photoAlt: { es: "Foto de Sebastian Gonzalez", en: "Photo of Sebastian Gonzalez" },
  about: {
    es: [
      "Soy Juan Sebastian Gonzalez, Tecnólogo en Análisis y Desarrollo de Software, de Colombia.",
      "Empecé con HTML y CSS, y hoy construyo aplicaciones completas con React, Next.js, Node.js, Laravel y .NET: interfaz, servidor y base de datos.",
      "Me importa que lo que hago se vea bien, cargue rápido y quede ordenado para quien lo mantenga después. Hablo inglés nivel C1.",
    ],
    en: [
      "I'm Juan Sebastian Gonzalez, a Software Analysis and Development technologist from Colombia.",
      "I started with HTML and CSS, and today I build complete applications with React, Next.js, Node.js, Laravel and .NET: interface, server and database.",
      "I care that what I make looks good, loads fast and stays tidy for whoever maintains it next. I speak English at a C1 level.",
    ],
  },
  contactTitle: { es: "¿Tienes un proyecto?", en: "Got a project?" },
  contactText: { es: "Cuéntame tu idea y la construimos.", en: "Tell me your idea and let's build it." },
  footer: { es: "Hecho con Next.js, TypeScript y Tailwind CSS.", en: "Built with Next.js, TypeScript and Tailwind CSS." },
  sourceCode: { es: "Código de este sitio", en: "This site's code" },
};

export type Project = { id: string; title: string; kind: T; summary: T; tags: string[]; repo: string; site?: string; images?: string[] };

export const PROJECTS: Project[] = [
  {
    id: "nocta",
    title: "NOCTA Seguridad",
    kind: { es: "Sitio web · Next.js", en: "Website · Next.js" },
    summary: {
      es: "Sitio para una empresa de seguridad (marca ficticia): apertura en 3D, catálogo de 54 productos con transiciones entre páginas y cotización por WhatsApp que saluda según la hora.",
      en: "Website for a security company (fictional brand): a 3D opening, a 54-product catalogue with page-to-page transitions, and WhatsApp quotes that greet by the time of day.",
    },
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Three.js"],
    repo: "https://github.com/Annoyed115/nocta-seguridad",
    site: "https://nocta-seguridad.vercel.app",
    images: ["/projects/nocta-apertura.jpeg", "/projects/nocta-producto.jpeg"],
  },
  {
    id: "crud",
    title: "CRUD de empleados",
    kind: { es: "Full stack", en: "Full stack" },
    summary: {
      es: "Registrar, editar y eliminar empleados, con el frontend, la API y la base de datos conectados en un flujo completo.",
      en: "Create, edit and delete employees, with frontend, API and database wired into one complete flow.",
    },
    tags: ["React", "Node.js", "Laravel", "MySQL", "Bootstrap"],
    repo: "https://github.com/Annoyed115/CRUD-mysql-react-node-laravel-bootstrap",
  },
  {
    id: "chat",
    title: "Chat en tiempo real",
    kind: { es: "Tiempo real · .NET", en: "Real time · .NET" },
    summary: {
      es: "Mensajería en vivo: los mensajes llegan al instante a todos los usuarios conectados.",
      en: "Live messaging: messages reach every connected user instantly.",
    },
    tags: ["C#", ".NET", "SignalR"],
    repo: "https://github.com/Annoyed115/Chat-App",
  },
  {
    id: "tracker",
    title: "Transaction Tracker",
    kind: { es: "Ingresos y gastos · .NET", en: "Income & expenses · .NET" },
    summary: {
      es: "Registrar, consultar y organizar ingresos y gastos, con los datos guardados en Microsoft SQL Server.",
      en: "Record, search and organise income and expenses, with the data stored in Microsoft SQL Server.",
    },
    tags: ["C#", ".NET Framework", "SQL Server"],
    repo: "https://github.com/Annoyed115/Transaction-Income-Expenses-Tracker",
  },
];

// Years from when each repository was started on GitHub.
export const JOURNEY: { year: string; title: T; text: T; tags: string[] }[] = [
  {
    year: "2023",
    title: { es: "Primeros pasos", en: "First steps" },
    text: { es: "Un curso de desarrollo web y mi primer sitio, escrito a mano.", en: "A web development course and my first hand-written site." },
    tags: ["HTML", "CSS"],
  },
  {
    year: "2024",
    title: { es: "El lado del servidor", en: "The server side" },
    text: { es: "Mis primeros CRUD y APIs, y Git para versionarlos.", en: "My first CRUD apps and APIs, with Git to version them." },
    tags: ["PHP", "MySQL", "Git"],
  },
  {
    year: "2025",
    title: { es: "JavaScript de punta a punta", en: "JavaScript end to end" },
    text: { es: "Interfaces en React conectadas a APIs en Node.js y Laravel.", en: "React interfaces connected to Node.js and Laravel APIs." },
    tags: ["JavaScript", "React", "Node.js", "Express", "Laravel"],
  },
  {
    year: "2026",
    title: { es: ".NET y tiempo real", en: ".NET and real time" },
    text: { es: "Aplicaciones en C# con SQL Server y un chat en vivo con SignalR.", en: "C# applications with SQL Server and a live chat with SignalR." },
    tags: ["C#", ".NET", "SignalR", "SQL Server", "TypeScript"],
  },
  {
    year: "2026",
    title: { es: "En producción con Next.js", en: "Shipping with Next.js" },
    text: {
      es: "NOCTA: un sitio completo con base de datos, animación 3D y transiciones, publicado en Vercel.",
      en: "NOCTA: a complete site with a database, 3D animation and page transitions, deployed on Vercel.",
    },
    tags: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL", "Three.js"],
  },
];

export const STACK: { group: T; items: string[] }[] = [
  { group: { es: "Frontend", en: "Frontend" }, items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Bootstrap"] },
  { group: { es: "Backend", en: "Backend" }, items: ["Node.js", "Express", "PHP", "Laravel", "C#", ".NET", "SignalR"] },
  { group: { es: "Bases de datos", en: "Databases" }, items: ["MySQL", "PostgreSQL", "SQL Server", "Prisma"] },
  { group: { es: "Herramientas", en: "Tools" }, items: ["Git", "GitHub", "Vercel", "Netlify", "Three.js"] },
];
