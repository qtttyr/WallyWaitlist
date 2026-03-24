import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { waitlistLimit } from "../content";
import { formatPeople, getWaitlistCount, joinWaitlist } from "../lib/waitlist";

type Language = "en" | "ru";

const translations: Record<
  Language,
  {
    nav: { home: string; docs: string };
    topbarBadgeSuffix: string;
    hero: {
      eyebrow: string;
      titleLines: string[];
      description: string;
      highlights: string[];
    };
    panel: {
      label: string;
      status: string;
      previewTags: string[];
    };
    form: {
      label: string;
      placeholder: string;
      join: string;
      loading: string;
      initialMessage: string;
      invalidEmail: string;
      duplicate: string;
      success: string;
      serverError: string;
    };
    tickerItems: string[];
    features: { id: string; title: string; description: string }[];
    stats: { value: string; suffix: string; label: string }[];
    sectionLabels: {
      featuresTitle: string;
      featuresSummary: string;
      whyTitle: string;
      whySummary: string;
    };
    footer: string;
    counterNote: string;
  }
> = {
  en: {
    nav: { home: "Home", docs: "Docs" },
    topbarBadgeSuffix: " waiting",
    hero: {
      eyebrow: "Personal finance, reimagined",
      titleLines: ["Money,", "that", "makes sense"],
      description:
        "Wally turns receipts, categories, and budgets into a clear financial picture. Snap a photo, save the expense, and get AI-backed insights—no spreadsheets needed.",
      highlights: [
        "AI-powered receipt scanning",
        "Category budgets with progress",
        "Searchable transaction history",
      ],
    },
    panel: {
      label: "Waitlist access",
      status: "Early 2026",
      previewTags: ["Food", "Taxi", "AI note"],
    },
    form: {
      label: "Join the waitlist",
      placeholder: "you@wally.app",
      join: "Join",
      loading: "Loading...",
      initialMessage: "No spam. Just one friendly launch email.",
      invalidEmail: "Please enter a valid email to join early access.",
      duplicate: "This email is already on the waitlist. We remember you.",
      success: "You're in! We'll message you when early access opens.",
      serverError: "Couldn't add your email right now. Please try again.",
    },
    tickerItems: [
      "Receipt scanning",
      "Budget controls",
      "AI insights",
      "CSV export",
      "Priority support",
    ],
    features: [
      {
        id: "01",
        title: "AI receipt scanning",
        description:
          "Take a photo of any receipt and Wally extracts amounts, dates and items instantly—then categorizes the expense for you.",
      },
      {
        id: "02",
        title: "Budget tracking",
        description:
          "Set monthly budgets per category and watch progress in real time. Get gentle nudges before you overspend.",
      },
      {
        id: "03",
        title: "Transaction history",
        description:
          "All your expenses in one searchable place. Filter, find, and export what you need quickly.",
      },
      {
        id: "04",
        title: "Smart spending insights",
        description:
          "Wally analyzes your habits and gives clear, practical tips on where you can cut back or reallocate your money.",
      },
    ],
    stats: [
      { value: "73", suffix: "%", label: "people see clearer spending" },
      { value: "3", suffix: " sec", label: "to capture a receipt" },
      {
        value: "0",
        suffix: " ₽",
        label: "for early adopters from the waitlist",
      },
    ],
    sectionLabels: {
      featuresTitle: "What Wally can do",
      featuresSummary:
        "Everything you need for a clear first look at your spending.",
      whyTitle: "Why this matters",
      whySummary: "Better money habits start with simple, useful tools.",
    },
    footer: "Made in Kazakhstan for calmer personal finance",
    counterNote:
      "The same counter can be shown across devices after connecting a backend. Local mode is saved as a fallback.",
  },
  ru: {
    nav: { home: "Главная", docs: "Документация" },
    topbarBadgeSuffix: " ждут запуск",
    hero: {
      eyebrow: "Персональные финансы нового уровня",
      titleLines: ["Деньги,", "которые", "понятны сразу"],
      description:
        "Wally превращает чеки, категории и бюджеты в понятную финансовую картину. Сфотографировал чек — расход учтён, ИИ подсказывает без ручного ввода.",
      highlights: [
        "ИИ-сканирование чеков",
        "Отслеживание бюджета по категориям",
        "Поисковая история транзакций",
      ],
    },
    panel: {
      label: "Доступ по waitlist",
      status: "Ранняя 2026",
      previewTags: ["Еда", "Такси", "Примечание ИИ"],
    },
    form: {
      label: "Войти в waitlist",
      placeholder: "you@wally.app",
      join: "Войти",
      loading: "Загружается...",
      initialMessage: "Без спама. Только один аккуратный анонс запуска.",
      invalidEmail: "Введите корректный email, чтобы попасть в ранний доступ.",
      duplicate: "Этот email уже в списке. Мы вас запомнили.",
      success:
        "Вы в списке! Напишем, когда откроется ранний доступ и активируем бонус.",
      serverError:
        "Не удалось добавить email прямо сейчас. Попробуйте ещё раз позже.",
    },
    tickerItems: [
      "Сканирование чеков",
      "Контроль бюджета",
      "ИИ-подсказки",
      "Экспорт CSV",
      "Приоритетная поддержка",
    ],
    features: [
      {
        id: "01",
        title: "ИИ-сканирование чеков",
        description:
          "Сделайте фото чека — Wally мгновенно извлечёт суммы, дату и позиции и автоматически распределит расход по категориям.",
      },
      {
        id: "02",
        title: "Отслеживание бюджета",
        description:
          "Установите месячные лимиты по категориям и следите за прогрессом. Wally предупредит, если скоро перерасход.",
      },
      {
        id: "03",
        title: "История транзакций",
        description:
          "Все расходы в одном месте — по ним легко искать, фильтровать и экспортировать нужные данные.",
      },
      {
        id: "04",
        title: "Умные рекомендации",
        description:
          "Wally анализирует траты и даёт простые, понятные советы, где можно сэкономить и как распределить бюджет лучше.",
      },
    ],
    stats: [
      { value: "73", suffix: "%", label: "людей получили ясность в расходах" },
      { value: "3", suffix: " сек", label: "чтобы зафиксировать чек" },
      {
        value: "0",
        suffix: " ₽",
        label: "для первых пользователей из waitlist",
      },
    ],
    sectionLabels: {
      featuresTitle: "Что умеет Wally",
      featuresSummary:
        "Всё, что нужно для первого честного взгляда на собственные расходы.",
      whyTitle: "Почему это важно",
      whySummary: "Финансовые привычки меняют простые и надёжные инструменты.",
    },
    footer: "Сделано в Казахстане для спокойных финансов",
    counterNote:
      "Один и тот же счётчик можно показывать на всех устройствах после подключения backend. Локальный режим сохранён как fallback.",
  },
};

function LandingPage() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang];

  const [email, setEmail] = useState<string>(t.form.initialMessage ? "" : "");
  const [waitlistCount, setWaitlistCount] = useState<number>(0);
  const [status, setStatus] = useState<
    "idle" | "error" | "duplicate" | "success"
  >("idle");
  const [message, setMessage] = useState<string>(t.form.initialMessage);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let alive = true;

    void getWaitlistCount().then((count) => {
      if (alive) setWaitlistCount(count);
    });

    const syncCount = (event: StorageEvent) => {
      if (
        event.key === "wally_waitlist" ||
        event.key === "wally_waitlist_count"
      ) {
        void getWaitlistCount().then((count) => {
          if (alive) setWaitlistCount(count);
        });
      }
    };

    window.addEventListener("storage", syncCount);
    return () => {
      alive = false;
      window.removeEventListener("storage", syncCount);
    };
  }, []);

  // When language changes, reset neutral message if we're idle
  useEffect(() => {
    if (status === "idle") {
      setMessage(t.form.initialMessage);
    }
    // note: we intentionally do not reset status if user has already submitted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const progress = Math.min((waitlistCount / waitlistLimit) * 100, 100);
  const tickerTrack = [...t.tickerItems, ...t.tickerItems];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalized = email.trim().toLowerCase();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);

    if (!isValid) {
      setStatus("error");
      setMessage(t.form.invalidEmail);
      return;
    }

    setIsLoading(true);
    try {
      const result = await joinWaitlist(normalized);
      setWaitlistCount(result.count);

      if (result.status === "duplicate") {
        setStatus("duplicate");
        setMessage(t.form.duplicate);
        return;
      }

      setStatus("success");
      setMessage(t.form.success);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(t.form.serverError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="noise" />
      <div className="orb orb-left" />
      <div className="orb orb-right" />

      <div className="site-wrap">
        <header className="topbar">
          <a className="brand" href="#/" aria-label="Wally home">
            Wally
          </a>

          <nav className="topbar-nav" aria-label="Primary">
            <a className="nav-link is-active" href="#/" aria-current="page">
              {t.nav.home}
            </a>
            <a className="nav-link" href="#/docs">
              {t.nav.docs}
            </a>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div className="topbar-badge">
              {formatPeople(waitlistCount)}
              {t.topbarBadgeSuffix}
            </div>

            <button
              onClick={() => setLang(lang === "en" ? "ru" : "en")}
              aria-label="Toggle language"
              style={{
                background: "none",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "inherit",
                cursor: "pointer",
                padding: "6px 10px",
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {lang === "en" ? "EN | RU" : "RU | EN"}
            </button>
          </div>
        </header>

        <main>
          <section className="hero">
            <div className="hero-copy" style={{ zIndex: 1 }}>
              <div className="hero-eyebrow">{t.hero.eyebrow}</div>

              <h1 className="hero-title" aria-hidden={false}>
                {t.hero.titleLines.map((line, idx) => (
                  <span
                    key={idx}
                    className={`hero-line ${idx === t.hero.titleLines.length - 1 ? "hero-line-highlight" : ""}`}
                  >
                    {line}
                  </span>
                ))}
              </h1>

              <p className="hero-description">{t.hero.description}</p>

              <div className="hero-highlights">
                {t.hero.highlights.map((item) => (
                  <div key={item} className="highlight-card">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* ensure panel renders behind hero text by giving it a lower stacking context */}
            <div className="hero-panel" style={{ zIndex: 0 }}>
              <div className="panel-glow" />
              <div className="panel-header">
                <span className="panel-label">{t.panel.label}</span>
                <span className="panel-status">{t.panel.status}</span>
              </div>

              <div className="panel-preview">
                <div className="preview-phone">
                  <div className="preview-screen">
                    <div className="preview-receipt">
                      <span className="receipt-line short" />
                      <span className="receipt-line" />
                      <span className="receipt-line medium" />
                    </div>
                    <div className="preview-chart">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="preview-tags">
                      {t.panel.previewTags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <form className="waitlist-form" onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="email">
                  {t.form.label}
                </label>
                <div className="form-row">
                  <input
                    id="email"
                    className={`email-input ${status === "error" ? "is-error" : ""}`}
                    type="email"
                    placeholder={t.form.placeholder}
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status !== "idle") {
                        setStatus("idle");
                        setMessage(t.form.initialMessage);
                      }
                    }}
                    aria-describedby="waitlist-message"
                    disabled={isLoading}
                  />
                  <button
                    className="cta-button"
                    type="submit"
                    disabled={isLoading || !email.trim()}
                  >
                    {isLoading ? t.form.loading : t.form.join}
                  </button>
                </div>

                <p
                  id="waitlist-message"
                  className={`form-message status-${status}`}
                  aria-live="polite"
                >
                  {message}
                </p>

                <div className="counter-row" aria-label="Waitlist progress">
                  <span className="counter-pill">
                    {formatPeople(waitlistCount)}
                  </span>
                  <div className="counter-bar-wrap">
                    <div
                      className="counter-bar"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="counter-limit">
                    {waitlistLimit} {lang === "en" ? "spots" : "мест"}
                  </span>
                </div>

                <p className="counter-note">{t.counterNote}</p>
              </form>
            </div>
          </section>

          <section className="ticker" aria-label="Product features">
            <div className="ticker-track">
              {tickerTrack.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className={`ticker-item ${index % 3 === 0 ? "is-highlight" : ""}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="content-block">
            <div className="section-heading">
              <span className="section-label">
                {t.sectionLabels.featuresTitle}
              </span>
              <p className="section-summary">
                {t.sectionLabels.featuresSummary}
              </p>
            </div>

            <div className="feature-grid">
              {t.features.map((feature) => (
                <article key={feature.id} className="feature-card">
                  <div className="feature-number">{feature.id}</div>
                  <h2>{feature.title}</h2>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="content-block stats-block">
            <div className="section-heading">
              <span className="section-label">{t.sectionLabels.whyTitle}</span>
              <p className="section-summary">{t.sectionLabels.whySummary}</p>
            </div>

            <div className="stats-grid">
              {t.stats.map((stat) => (
                <article key={stat.label} className="stat-card">
                  <div className="stat-value">
                    {stat.value}
                    <span>{stat.suffix}</span>
                  </div>
                  <p>{stat.label}</p>
                </article>
              ))}
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="footer-brand">Wally</div>
          <div className="footer-text">{t.footer}</div>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
