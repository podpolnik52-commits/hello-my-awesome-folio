import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Github,
  ExternalLink,
  Terminal,
  Cpu,
  User,
  BookOpen,
  Target,
  Mail,
  Rocket,
  Sparkles,
} from "lucide-react";

import { FALLBACK_PROFILE, getGitHubProfile } from "@/lib/github.functions";

const DISPLAY_NAME = "Павел Синевич";
const DISPLAY_TITLE = "Начинающий веб-разработчик";

const DISPLAY_BIO =
  "Я только начинаю свой путь в веб-разработке. Мне интересно создавать сайты и приложения, которые решают реальные задачи. Сейчас активно учусь, практикуюсь в вёрстке и логике интерфейсов, и открыт к первым задачам в IT.";

const ABOUT_TEXT =
  "Меня зовут Павел, и я — начинающий разработчик из Минска. Путь в IT начался с любопытства: хотелось понимать, как устроены сайты и приложения, которыми пользуемся каждый день. Со временем интерес перерос в желание делать такие продукты самому.";

const JOURNEY_TEXT =
  "Начинал с основ HTML, CSS и JavaScript. Постепенно углубился в React, TypeScript и современные подходы к разработке интерфейсов. Каждый новый проект — это повод разобраться в чём-то незнакомом и приблизиться к уровню middle-разработчика.";

const GOALS_TEXT =
  "В ближайший год хочу освоить полноценный стек для создания веб-приложений, собрать несколько сильных проектов в портфолио и найти первую работу в команде, где можно расти под руководством опытных разработчиков.";

const LEARNING_NOW = [
  "React и экосистема",
  "TypeScript",
  "Алгоритмы и структуры данных",
  "Работа с API и асинхронностью",
  "Адаптивная вёрстка",
];

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
          "Личное портфолио начинающего разработчика Павла Синевича. Обо мне, мой путь, навыки, цели и профиль GitHub.",
      },
      {
        property: "og:title",
        content: `${DISPLAY_NAME} — Портфолио разработчика`,
      },
      {
        property: "og:description",
        content:
          "Личное портфолио начинающего разработчика Павла Синевича. Обо мне, мой путь, навыки, цели и профиль GitHub.",
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

      <main className="relative z-10 flex flex-1 flex-col px-6 py-16 md:px-12">
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
              label={plural(
                profile.public_repos,
                "репозиторий",
                "репозитория",
                "репозиториев"
              )}
              value={profile.public_repos}
            />
            <Stat
              label={plural(
                profile.followers,
                "подписчик",
                "подписчика",
                "подписчиков"
              )}
              value={profile.followers}
            />
            <Stat
              label={plural(
                profile.following,
                "подписка",
                "подписки",
                "подписок"
              )}
              value={profile.following}
            />
            <Stat label={`на GitHub с ${joinDate}`} value="" />
          </div>
        </section>

        <section className="mx-auto mt-24 w-full max-w-5xl">
          <div className="mb-10 flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <h2 className="font-mono text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Обо мне
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard
              icon={<BookOpen className="h-5 w-5" />}
              title="Кто я"
              text={ABOUT_TEXT}
            />
            <InfoCard
              icon={<Rocket className="h-5 w-5" />}
              title="Мой путь"
              text={JOURNEY_TEXT}
            />
            <InfoCard
              icon={<Target className="h-5 w-5" />}
              title="Цели"
              text={GOALS_TEXT}
            />
            <InfoCard
              icon={<Sparkles className="h-5 w-5" />}
              title="Сейчас изучаю"
              text=""
              tags={LEARNING_NOW}
            />
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

        <section className="mx-auto mt-24 w-full max-w-5xl">
          <div className="mb-10 flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="font-mono text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Связаться со мной
            </h2>
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-8 text-center backdrop-blur-sm">
            <p className="mx-auto max-w-xl text-muted-foreground">
              Открыт к первым проектам, стажировкам и просто общению по теме
              разработки. Напишите — обсудим идеи или задачи.
            </p>
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium transition-all hover:border-primary hover:text-primary"
            >
              <Github className="h-4 w-4" />
              Написать через GitHub
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
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
          &copy; {new Date().getFullYear()} {DISPLAY_NAME}. Все права
          защищены.
        </p>
      </footer>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur-sm">
      {value !== "" && (
        <span className="font-mono font-semibold text-foreground">{value}</span>
      )}
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  text,
  tags,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  tags?: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-card">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="font-mono text-xl font-semibold text-foreground">
          {title}
        </h3>
      </div>
      {text && <p className="leading-relaxed text-muted-foreground">{text}</p>}
      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
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
