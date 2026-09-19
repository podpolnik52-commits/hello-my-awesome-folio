import { createFileRoute, Link } from "@tanstack/react-router";
import { Github, ExternalLink, Terminal, Cpu } from "lucide-react";

import { FALLBACK_PROFILE, getGitHubProfile } from "@/lib/github.functions";

const DISPLAY_NAME = "Павел Синевич";
const DISPLAY_TITLE = "Начинающий веб-разработчик";
const DISPLAY_BIO =
  "Я только начинаю свой путь в разработке. Сейчас активно изучаю веб-технологии, практикуюсь в создании интерфейсов и набираюсь опыта в небольших проектах. Открыт к новым знаниям и первым задачам в IT."

const SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Git",
  "HTML/CSS",
  "Tailwind CSS",
  "Python",
];

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const profile = await getGitHubProfile();
      return { profile: profile ?? FALLBACK_PROFILE };
    } catch {
      return { profile: FALLBACK_PROFILE };
    }
  },
  head: () => ({
    meta: [
      { title: `${DISPLAY_NAME} — Портфолио разработчика` },
      {
        name: "description",
        content:
          "Личное портфолио разработчика Павла Синевича. Обо мне, навыки и профиль GitHub.",
      },
      { property: "og:title", content: `${DISPLAY_NAME} — Портфолио разработчика` },
      {
        property: "og:description",
        content:
          "Личное портфолио разработчика Павла Синевича. Обо мне, навыки и профиль GitHub.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function plural(n: number, one: string, few: string, many: string): string {
  const mod100 = Math.abs(n) % 100;
  const mod10 = mod100 % 10;
  if (mod100 >= 11 && mod100 <= 14) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

function Index() {
  const data = Route.useLoaderData();
  const profile = data?.profile ?? FALLBACK_PROFILE;

  const joinDate = new Date(profile.created_at)
    .toLocaleDateString("ru-RU", { month: "long", year: "numeric" })
    .replace(" г.", "");

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <GridBackground />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <Link
          to="/"
          className="font-mono text-sm font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          &lt;{profile.login} /&gt;
        </Link>
        <a
          href={profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm font-medium text-card-foreground backdrop-blur-sm transition-all hover:border-primary hover:text-primary"
        >
          <Github className="h-4 w-4" />
          <span className="hidden sm:inline">GitHub</span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 md:px-12">
        <section className="mx-auto w-full max-w-4xl text-center">
          <div className="mx-auto mb-8 inline-block">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-secondary blur-md opacity-60" />
              <img
                src={profile.avatar_url}
                alt={DISPLAY_NAME}
                className="relative h-28 w-28 rounded-full border-2 border-border bg-card object-cover md:h-36 md:w-36"
              />
            </div>
          </div>

          <h1 className="font-mono text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            {DISPLAY_NAME}
          </h1>

          <p className="mt-4 font-mono text-lg text-primary md:text-xl">
            {DISPLAY_TITLE}
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {profile.bio ?? DISPLAY_BIO}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <Stat
              label={plural(profile.public_repos, "репозиторий", "репозитория", "репозиториев")}
              value={profile.public_repos}
            />
            <Stat
              label={plural(profile.followers, "подписчик", "подписчика", "подписчиков")}
              value={profile.followers}
            />
            <Stat
              label={plural(profile.following, "подписка", "подписки", "подписок")}
              value={profile.following}
            />
            <Stat label={`на GitHub с ${joinDate}`} value="" />
          </div>
        </section>

        <section className="mx-auto mt-24 w-full max-w-5xl">
          <div className="mb-10 flex items-center gap-3">
            <Terminal className="h-5 w-5 text-primary" />
            <h2 className="font-mono text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Навыки и стек
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS.map((skill) => (
              <SkillCard key={skill} name={skill} />
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border px-6 py-8 text-center text-sm text-muted-foreground md:px-12">
        <p>
          Создано на{" "}
          <span className="text-primary">React</span> +{" "}
          <span className="text-primary">TanStack</span> +{" "}
          <span className="text-primary">Tailwind</span>
        </p>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} {DISPLAY_NAME}. Все права защищены.
        </p>
      </footer>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur-sm">
      <span className="font-mono font-semibold text-foreground">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

function SkillCard({ name }: { name: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-card">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Cpu className="h-5 w-5" />
        </div>
        <span className="font-mono text-lg font-medium text-foreground">
          {name}
        </span>
      </div>
    </div>
  );
}

function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>
  );
}
