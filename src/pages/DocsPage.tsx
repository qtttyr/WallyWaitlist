import { useState } from "react";

type Language = "en" | "ru";

const translations = {
  en: {
    mainNav: "Main",
    docs: "Docs",
    productNotes: "Product notes",
    docHero: {
      eyebrow: "Documentation",
      title: "Wally",
      subtitle: "Personal Finance, Simplified",
      description:
        "Meet Wally: a personal finance app that scans receipts with AI, tracks budgets automatically, and tells you exactly where your money goes—no manual entry required.",
    },
    sections: [
      {
        title: "Getting Started",
        text: "Three simple steps: sign up with your email, scan your first receipt with your phone camera, and set your first budget. Wally does the rest.",
      },
      {
        title: "AI Receipt Scanning",
        text: "Point your phone at any receipt. Wally instantly captures the amount, date, and items—then automatically categorizes your expense. No typing required.",
      },
      {
        title: "Budget Tracking",
        text: "Set monthly budgets for each spending category. Watch real-time progress bars and get gentle nudges before you overspend.",
      },
      {
        title: "Smart Insights",
        text: "Wally analyzes your spending patterns and tells you where your money goes, what you can optimize, and how to build better money habits.",
      },
    ],
    faq: [
      {
        q: "How accurate is the receipt scanning?",
        a: "Our AI reads receipts with 95%+ accuracy. It captures items, amounts, dates, and automatically sorts expenses into the right categories. You can edit anything in seconds if needed.",
      },
      {
        q: "Does Wally work offline?",
        a: "Yes. Wally is a Progressive Web App (PWA), so it works offline and syncs when you're back online. Your data stays private and on your device.",
      },
      {
        q: "How much does it cost?",
        a: "Free plan includes up to 30 receipt scans per month, one active budget, and full transaction history. Pro ($4.99/month) unlocks unlimited scans, budgets, AI insights, and CSV exports.",
      },
      {
        q: "Will my financial data be safe?",
        a: "Absolutely. Your data is encrypted and never shared. We don't sell your information or show you ads. We make money only through Pro subscriptions.",
      },
      {
        q: "Can I export my data?",
        a: "Pro users can export all transactions as CSV anytime. You always own your data and can take it with you.",
      },
    ],
    pricing: [
      {
        plan: "Free",
        price: "0",
        features: [
          "Up to 30 receipt scans/month",
          "1 active budget",
          "Transaction history",
          "Receipt gallery",
          "Basic categorization",
        ],
      },
      {
        plan: "Pro",
        price: "4.99",
        features: [
          "Unlimited receipt scans",
          "Unlimited budgets",
          "AI spending insights",
          "CSV export",
          "Priority support",
          "Advanced analytics",
        ],
      },
    ],
    earlyAdopter:
      "Waitlist members get Pro free for 3 months after launch. That's unlimited scans, budgets, insights, and exports—at no cost.",
    readyToStart: "Ready to transform your finances?",
    joinWaitlist: "Join the Waitlist",
    backHome: "Back to Home",
    whatsDone: "What's ready",
    whatsDoneDescription:
      "Wally is built on a modern tech stack: React + Vite for fast load times, TypeScript for reliability, and a PWA architecture that works everywhere.",
    bullets: [
      "Responsive design: works perfectly on mobile, tablet, and desktop",
      "Instant receipt scanning powered by advanced AI models",
      "Real-time budget tracking with visual progress indicators",
      "Works offline as a Progressive Web App (PWA)",
      "Built with React + Vite + TypeScript for performance",
      "Email notifications and budget alerts",
      "Telegram integration for spending updates",
    ],
    nextStep: "What's next",
    nextStepTitle: "Open Beta Coming Soon",
    nextStepDesc:
      "Wally is in final testing. Waitlist members will get early access and 3 months of Pro free as a thank you for believing in us early.",
  },
  ru: {
    mainNav: "Главная",
    docs: "Документация",
    productNotes: "О продукте",
    docHero: {
      eyebrow: "Документация",
      title: "Wally",
      subtitle: "Личные финансы, просто",
      description:
        "Познакомьтесь с Wally: приложение для личных финансов, которое сканирует чеки с помощью ИИ, автоматически отслеживает бюджеты и точно показывает, куда уходят ваши деньги—без ручного ввода.",
    },
    sections: [
      {
        title: "Как начать",
        text: "Три простых шага: зарегистрируйтесь по email, отсканируйте первый чек камерой телефона и установите первый бюджет. Wally сделает всё остальное.",
      },
      {
        title: "ИИ-сканирование чеков",
        text: "Направьте камеру на чек. Wally мгновенно захватит сумму, дату и товары, а затем автоматически распределит расход по категориям. Никакого набора текста.",
      },
      {
        title: "Отслеживание бюджета",
        text: "Установите ежемесячные бюджеты для каждой категории расходов. Смотрите визуальные полосы прогресса в реальном времени и получайте мягкие напоминания перед перерасходом.",
      },
      {
        title: "Умная аналитика",
        text: "Wally анализирует ваши расходы и показывает, куда уходят деньги, что можно оптимизировать и как выработать лучшие привычки управления финансами.",
      },
    ],
    faq: [
      {
        q: "Насколько точно работает сканирование чеков?",
        a: "Наш ИИ читает чеки с точностью 95% и выше. Он захватывает товары, суммы, даты и автоматически распределяет расходы по категориям. Вы можете отредактировать что-либо за секунды, если нужно.",
      },
      {
        q: "Работает ли Wally без интернета?",
        a: "Да. Wally — это Progressive Web App (PWA), поэтому он работает без интернета и синхронизируется, когда вы снова онлайн. Ваши данные остаются приватными и на вашем устройстве.",
      },
      {
        q: "Сколько это стоит?",
        a: "Бесплатный план включает до 30 сканирований в месяц, один активный бюджет и полную историю транзакций. Pro (4,99 $/месяц) открывает неограниченные сканирования, бюджеты, ИИ-аналитику и экспорт CSV.",
      },
      {
        q: "Будут ли мои финансовые данные в безопасности?",
        a: "Да. Ваши данные зашифрованы и никогда не передаются третьим лицам. Мы не продаём вашу информацию и не показываем рекламу. Мы зарабатываем только на подписке Pro.",
      },
      {
        q: "Могу ли я экспортировать свои данные?",
        a: "Пользователи Pro могут экспортировать все транзакции в CSV в любой момент. Вы всегда владеете своими данными и можете взять их с собой.",
      },
    ],
    pricing: [
      {
        plan: "Бесплатно",
        price: "0",
        features: [
          "До 30 сканирований в месяц",
          "1 активный бюджет",
          "История транзакций",
          "Галерея чеков",
          "Базовая категоризация",
        ],
      },
      {
        plan: "Pro",
        price: "4,99",
        features: [
          "Неограниченные сканирования",
          "Неограниченные бюджеты",
          "ИИ-аналитика расходов",
          "Экспорт CSV",
          "Приоритетная поддержка",
          "Продвинутая аналитика",
        ],
      },
    ],
    earlyAdopter:
      "Участники waitlist получат Pro бесплатно на 3 месяца после запуска. Это неограниченные сканирования, бюджеты, аналитика и экспорт—без затрат.",
    readyToStart: "Готовы изменить управление финансами?",
    joinWaitlist: "Присоединиться к waitlist",
    backHome: "Вернуться на главную",
    whatsDone: "Что готово",
    whatsDoneDescription:
      "Wally построена на современном технологическом стеке: React + Vite для быстрой загрузки, TypeScript для надёжности и архитектура PWA, которая работает везде.",
    bullets: [
      "Адаптивный дизайн: идеально работает на мобильных, планшетах и десктопе",
      "Мгновенное сканирование чеков на базе продвинутых ИИ-моделей",
      "Отслеживание бюджета в реальном времени с визуальными индикаторами прогресса",
      "Работает без интернета как Progressive Web App (PWA)",
      "Построена на React + Vite + TypeScript для высокой производительности",
      "Email-уведомления и оповещения о бюджете",
      "Интеграция с Telegram для обновлений расходов",
    ],
    nextStep: "Что дальше",
    nextStepTitle: "Открытая бета скоро",
    nextStepDesc:
      "Wally на финальном этапе тестирования. Участники waitlist получат ранний доступ и 3 месяца Pro бесплатно в благодарность за то, что верили в нас с начала.",
  },
};

function DocsPage() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang];

  return (
    <div className="page-shell page-shell-docs">
      <div className="noise" />
      <div className="orb orb-left" />
      <div className="orb orb-right" />

      <div className="site-wrap">
        <header className="topbar">
          <a className="brand" href="#/" aria-label="Wally home">
            Wally
          </a>

          <nav className="topbar-nav" aria-label="Primary">
            <a className="nav-link" href="#/">
              {t.mainNav}
            </a>
            <a className="nav-link is-active" href="#/docs" aria-current="page">
              {t.docs}
            </a>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div className="topbar-badge" style={{ marginRight: "8px" }}>
              {t.productNotes}
            </div>
            <button
              onClick={() => setLang(lang === "en" ? "ru" : "en")}
              style={{
                background: "none",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "rgba(255, 255, 255, 0.8)",
                cursor: "pointer",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "500",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "rgba(255, 255, 255, 0.6)";
                el.style.color = "rgba(255, 255, 255, 1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "rgba(255, 255, 255, 0.3)";
                el.style.color = "rgba(255, 255, 255, 0.8)";
              }}
            >
              {lang === "en" ? "EN | RU" : "RU | EN"}
            </button>
          </div>
        </header>

        <main className="docs-layout">
          <section className="docs-hero">
            <div className="hero-eyebrow">{t.docHero.eyebrow}</div>
            <h1 className="docs-title">
              {t.docHero.title}
              <span>{t.docHero.subtitle}</span>
            </h1>
            <p className="docs-description">{t.docHero.description}</p>
          </section>

          <section className="docs-grid">
            {t.sections.map((section) => (
              <article key={section.title} className="docs-card">
                <div className="docs-card-tag">Section</div>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </article>
            ))}
          </section>

          <section className="docs-notes">
            <div className="section-heading">
              <span className="section-label">{t.whatsDone}</span>
              <p className="section-summary">{t.whatsDoneDescription}</p>
            </div>

            <div className="docs-bullets">
              {t.bullets.map((item) => (
                <div key={item} className="docs-bullet">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section
            className="docs-faq"
            style={{ marginTop: "80px", marginBottom: "80px" }}
          >
            <div className="section-heading">
              <span className="section-label">FAQ</span>
              <p className="section-summary">
                {lang === "en"
                  ? "Common questions about Wally"
                  : "Частые вопросы о Wally"}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gap: "24px",
                marginTop: "32px",
              }}
            >
              {t.faq.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      marginBottom: "12px",
                      color: "rgba(255, 255, 255, 0.95)",
                    }}
                  >
                    {item.q}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.6",
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="docs-pricing" style={{ marginBottom: "80px" }}>
            <div className="section-heading">
              <span className="section-label">
                {lang === "en" ? "Pricing" : "Цены"}
              </span>
              <p className="section-summary">
                {lang === "en"
                  ? "Choose the plan that works for you"
                  : "Выберите подходящий тариф"}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
                marginTop: "32px",
              }}
            >
              {t.pricing.map((plan) => (
                <div
                  key={plan.plan}
                  style={{
                    padding: "32px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        marginBottom: "8px",
                      }}
                    >
                      {plan.plan}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "4px",
                      }}
                    >
                      <span style={{ fontSize: "32px", fontWeight: "700" }}>
                        ${plan.price}
                      </span>
                      {plan.price !== "0" && (
                        <span
                          style={{
                            fontSize: "14px",
                            color: "rgba(255, 255, 255, 0.6)",
                          }}
                        >
                          /{lang === "en" ? "month" : "месяц"}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        style={{
                          paddingBottom: "12px",
                          fontSize: "14px",
                          color: "rgba(255, 255, 255, 0.8)",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                        }}
                      >
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "40px",
                padding: "24px",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "8px",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                textAlign: "center",
              }}
            >
              <p
                style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.8)" }}
              >
                <strong>
                  {lang === "en"
                    ? "Early Adopter Offer:"
                    : "Предложение для ранних пользователей:"}
                </strong>{" "}
                {t.earlyAdopter}
              </p>
            </div>
          </section>

          <section className="docs-callout">
            <div className="docs-callout-copy">
              <span className="section-label">
                {lang === "en" ? "Ready to start?" : "Готовы начать?"}
              </span>
              <h2>{t.readyToStart}</h2>
              <p>{t.nextStepDesc}</p>
            </div>
            <a className="cta-button docs-cta" href="#/">
              {t.backHome}
            </a>
          </section>
        </main>
      </div>
    </div>
  );
}

export default DocsPage;
