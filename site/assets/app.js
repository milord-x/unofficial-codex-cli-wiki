(function () {
  const data = window.CODEX_WIKI_DATA || { docs: [], groups: [], homeSlugs: {} };
  const docs = data.docs || [];
  const docsBySlug = new Map(docs.map((doc) => [doc.slug, doc]));
  const availableLocales = ["en", "ru", "kk", "zh", "es"];
  const defaultLocale = "en";

  const UI = {
    ru: {
      brandEyebrow: "Offline knowledge system",
      brandName: "Codex CLI wiki",
      brandCopy:
        "Быстрая офлайновая карта по Codex CLI: команды, workflow, skills и рабочие playbooks.",
      pageEyebrow: "Offline HTML edition",
      heroLead:
        "Офлайновая витрина по Codex CLI с быстрым поиском, оглавлением по разделам и удобной навигацией между доступными версиями wiki.",
      searchLabel: "Поиск по словам и разделам",
      searchPlaceholder: "Например: sandbox, API key, bugfix",
      footerLabel: "Открытие через терминал",
      tocEyebrow: "Навигация по документу",
      mobileToggle: "Разделы",
      homeButton: "README",
      copyLink: "Скопировать ссылку",
      copied: "Скопировано",
      copyFailed: "Не удалось",
      noResultsTitle: "Ничего не найдено",
      noResultsBody: "Попробуй сократить запрос или переключить фильтр разделов.",
      readmeHub: "README / Hub",
      markdown: "Markdown",
      sectionsWord: "разделов",
      buildLabel: "Сборка",
      openLabel: "Открытие",
      sourceLabel: "Источник",
      noToc: "У этого документа нет структурного оглавления.",
      libraryLabel: "Коллекция",
      toolbarLabel: "Текущий документ",
      quickLinksLabel: "Быстрые переходы",
      docPulseLabel: "Пульс документа",
      localeLabel: "Язык",
      filterLabel: "Фильтр",
      docsLabel: "Документы",
      visibleLabel: "Видно сейчас",
      examplesLabel: "Примеры",
      noQuickLinks: "У этого документа пока нет быстрых переходов.",
      groups: {
        all: "Все",
        fundamentals: "Основы",
        cli: "CLI",
        integration: "Интеграция",
        practice: "Практика",
        examples: "Примеры",
        docs: "Документы",
      },
    },
    en: {
      brandEyebrow: "Offline knowledge system",
      brandName: "Codex CLI wiki",
      brandCopy:
        "A fast offline map for Codex CLI: commands, workflow, skills, and practical playbooks.",
      pageEyebrow: "Offline HTML edition",
      heroLead:
        "An offline Codex CLI atlas with fast search, strong document hierarchy, and clean switching across available wiki locales.",
      searchLabel: "Search by words and sections",
      searchPlaceholder: "For example: sandbox, API key, bugfix",
      footerLabel: "Open from terminal",
      tocEyebrow: "Document navigation",
      mobileToggle: "Sections",
      homeButton: "Home",
      copyLink: "Copy link",
      copied: "Copied",
      copyFailed: "Failed",
      noResultsTitle: "Nothing found",
      noResultsBody: "Try a shorter query or switch the section filter.",
      readmeHub: "README / Hub",
      markdown: "Markdown",
      sectionsWord: "sections",
      buildLabel: "Build",
      openLabel: "Open",
      sourceLabel: "Source",
      noToc: "No table of contents for this page.",
      libraryLabel: "Library",
      toolbarLabel: "Current document",
      quickLinksLabel: "Quick jumps",
      docPulseLabel: "Document pulse",
      localeLabel: "Language",
      filterLabel: "Filter",
      docsLabel: "Docs",
      visibleLabel: "Visible now",
      examplesLabel: "Examples",
      noQuickLinks: "No quick jumps for this document yet.",
      groups: {
        all: "All",
        fundamentals: "Fundamentals",
        cli: "CLI",
        integration: "Integration",
        practice: "Practice",
        examples: "Examples",
        docs: "Documents",
      },
    },
    kk: {
      brandEyebrow: "Офлайн білім жүйесі",
      brandName: "Codex CLI wiki",
      brandCopy:
        "Codex CLI-ге арналған жылдам офлайн карта: командалар, workflow, skills және практикалық playbooks.",
      pageEyebrow: "Офлайн HTML басылымы",
      heroLead:
        "Codex CLI-ге арналған офлайн атлас - жылдам іздеу, күшті құжат иерархиясы және қолжетімді wiki локализациялары арасында таза ауысу.",
      searchLabel: "Сөздер мен бөлімдер бойынша іздеу",
      searchPlaceholder: "Мысалы: sandbox, API key, bugfix",
      footerLabel: "Терминалдан ашу",
      tocEyebrow: "Құжат навигациясы",
      mobileToggle: "Бөлімдер",
      homeButton: "README",
      copyLink: "Сілтеме көшіру",
      copied: "Көшірілді",
      copyFailed: "Сәтсіз",
      noResultsTitle: "Ештеңе табылмады",
      noResultsBody: "Сұрауды қысқартыңыз немесе бөлім сүзгісін ауыстырыңыз.",
      readmeHub: "README / Hub",
      markdown: "Markdown",
      sectionsWord: "бөлім",
      buildLabel: "Жаңарту",
      openLabel: "Ашу",
      sourceLabel: "Дереккөз",
      noToc: "Бұл құжатта мазмұн жоқ.",
      libraryLabel: "Кітапхана",
      toolbarLabel: "Ағымдағы құжат",
      quickLinksLabel: "Жылдам өтулер",
      docPulseLabel: "Құжат пульсі",
      localeLabel: "Тіл",
      filterLabel: "Сүзгі",
      docsLabel: "Құжаттар",
      visibleLabel: "Қазір көрініп тұр",
      examplesLabel: "Мысалдар",
      noQuickLinks: "Бұл құжатта әлі жылдам өтулер жоқ.",
      groups: {
        all: "Барлығы",
        fundamentals: "Негіздер",
        cli: "CLI",
        integration: "Интеграция",
        practice: "Тәжірибе",
        examples: "Мысалдар",
        docs: "Құжаттар",
      },
    },
    zh: {
      brandEyebrow: "离线知识系统",
      brandName: "Codex CLI wiki",
      brandCopy: "Codex CLI 快速离线地图：命令、工作流、技能和实用手册。",
      pageEyebrow: "离线 HTML 版",
      heroLead: "离线 Codex CLI 导航图，快速搜索、强文档层级和清晰的语言切换。",
      searchLabel: "搜索关键词和章节",
      searchPlaceholder: "例如：sandbox, API key, bugfix",
      footerLabel: "从终端打开",
      tocEyebrow: "文档导航",
      mobileToggle: "章节",
      homeButton: "首页",
      copyLink: "复制链接",
      copied: "已复制",
      copyFailed: "失败",
      noResultsTitle: "未找到结果",
      noResultsBody: "尝试缩短搜索词或切换章节筛选器。",
      readmeHub: "README / Hub",
      markdown: "Markdown",
      sectionsWord: "章节",
      buildLabel: "构建",
      openLabel: "打开",
      sourceLabel: "来源",
      noToc: "此文档没有目录。",
      libraryLabel: "库",
      toolbarLabel: "当前文档",
      quickLinksLabel: "快速跳转",
      docPulseLabel: "文档脉搏",
      localeLabel: "语言",
      filterLabel: "筛选",
      docsLabel: "文档",
      visibleLabel: "当前可见",
      examplesLabel: "示例",
      noQuickLinks: "此文档暂无快速跳转。",
      groups: {
        all: "全部",
        fundamentals: "基础",
        cli: "CLI",
        integration: "集成",
        practice: "实践",
        examples: "示例",
        docs: "文档",
      },
    },
    es: {
      brandEyebrow: "Sistema de conocimiento offline",
      brandName: "Codex CLI wiki",
      brandCopy:
        "Un mapa offline rápido para Codex CLI: comandos, workflow, skills y playbooks prácticos.",
      pageEyebrow: "Edición HTML offline",
      heroLead:
        "Un atlas offline de Codex CLI con búsqueda rápida, sólida jerarquía de documentos y cambio limpio entre locales wiki disponibles.",
      searchLabel: "Buscar por palabras y secciones",
      searchPlaceholder: "Por ejemplo: sandbox, API key, bugfix",
      footerLabel: "Abrir desde terminal",
      tocEyebrow: "Navegación del documento",
      mobileToggle: "Secciones",
      homeButton: "README",
      copyLink: "Copiar enlace",
      copied: "Copiado",
      copyFailed: "Error",
      noResultsTitle: "Nada encontrado",
      noResultsBody: "Intenta acortar la búsqueda o cambiar el filtro de sección.",
      readmeHub: "README / Hub",
      markdown: "Markdown",
      sectionsWord: "secciones",
      buildLabel: "Build",
      openLabel: "Abrir",
      sourceLabel: "Fuente",
      noToc: "Este documento no tiene tabla de contenidos.",
      libraryLabel: "Biblioteca",
      toolbarLabel: "Documento actual",
      quickLinksLabel: "Saltos rápidos",
      docPulseLabel: "Pulso del documento",
      localeLabel: "Idioma",
      filterLabel: "Filtro",
      docsLabel: "Docs",
      visibleLabel: "Visible ahora",
      examplesLabel: "Ejemplos",
      noQuickLinks: "Este documento aún no tiene saltos rápidos.",
      groups: {
        all: "Todos",
        fundamentals: "Fundamentos",
        cli: "CLI",
        integration: "Integración",
        practice: "Práctica",
        examples: "Ejemplos",
        docs: "Documentos",
      },
    },
  };

  function isKnownLocale(locale) {
    return !!locale && availableLocales.includes(locale) && !!UI[locale];
  }

  function detectLocale() {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const hashLocale = params.get("lang");
    if (isKnownLocale(hashLocale)) {
      return hashLocale;
    }
    const stored = window.localStorage.getItem("codexWikiLocale");
    if (isKnownLocale(stored)) {
      return stored;
    }
    const browser = (navigator.language || "").toLowerCase();
    const browserPrefix = browser.split("-")[0];
    if (isKnownLocale(browserPrefix)) {
      return browserPrefix;
    }
    return defaultLocale;
  }

  function homeSlugFor(locale) {
    if (data.homeSlugs && data.homeSlugs[locale]) {
      return data.homeSlugs[locale];
    }
    const docForLocale = docs.find(function (doc) {
      return doc.locale === locale;
    });
    return (docForLocale && docForLocale.slug) || docs[0]?.slug || "";
  }

  const initialLocale = detectLocale();
  const state = {
    query: "",
    group: "all",
    locale: initialLocale,
    slug: homeSlugFor(initialLocale),
    section: "",
  };

  const elements = {
    sidebar: document.getElementById("sidebar"),
    navTree: document.getElementById("navTree"),
    filters: document.getElementById("filters"),
    searchInput: document.getElementById("searchInput"),
    searchResults: document.getElementById("searchResults"),
    docCard: document.getElementById("docCard"),
    docHeader: document.getElementById("docHeader"),
    docContent: document.getElementById("docContent"),
    tocList: document.getElementById("tocList"),
    tocMeta: document.getElementById("tocMeta"),
    tocQuick: document.getElementById("tocQuick"),
    breadcrumb: document.getElementById("pageBreadcrumb"),
    copyLinkButton: document.getElementById("copyLinkButton"),
    homeButton: document.getElementById("homeButton"),
    mobileToggle: document.getElementById("mobileToggle"),
    langSwitch: document.getElementById("langSwitch"),
    brandEyebrow: document.getElementById("brandEyebrow"),
    brandName: document.getElementById("brandName"),
    brandCopy: document.getElementById("brandCopy"),
    pageEyebrow: document.getElementById("pageEyebrow"),
    heroTitle: document.getElementById("heroTitle"),
    heroLead: document.getElementById("heroLead"),
    heroStats: document.getElementById("heroStats"),
    searchLabel: document.getElementById("searchLabel"),
    footerLabel: document.getElementById("footerLabel"),
    tocEyebrow: document.getElementById("tocEyebrow"),
    libraryLabel: document.getElementById("libraryLabel"),
    toolbarLabel: document.getElementById("toolbarLabel"),
  };

  function ui() {
    return UI[state.locale] || UI.en;
  }

  function currentDocs() {
    return docs.filter((doc) => doc.locale === state.locale);
  }

  function visibleDocs() {
    return currentDocs().filter((doc) => state.group === "all" || doc.groupKey === state.group);
  }

  function translateGroup(key) {
    return ui().groups[key] || key;
  }

  function totalSections(items) {
    return items.reduce(function (count, doc) {
      return count + (doc.headings || []).filter(function (item) {
        return item.level >= 2;
      }).length;
    }, 0);
  }

  function decodeHash() {
    const hash = window.location.hash.replace(/^#/, "");
    const params = new URLSearchParams(hash);
    let locale = params.get("lang");
    if (!isKnownLocale(locale)) {
      locale = state.locale || defaultLocale;
    }
    let slug = params.get("doc");
    const section = params.get("section") || "";
    if (slug && docsBySlug.has(slug)) {
      locale = docsBySlug.get(slug).locale;
    } else {
      slug = homeSlugFor(locale);
    }
    return { locale, slug, section };
  }

  function encodeHash(slug, section, locale) {
    const params = new URLSearchParams();
    params.set("lang", locale);
    params.set("doc", slug);
    if (section) {
      params.set("section", section);
    }
    return "#" + params.toString();
  }

  function mirrorSlug(locale, slug) {
    const currentDoc = docsBySlug.get(slug);
    if (!currentDoc) {
      return homeSlugFor(locale);
    }

    const parts = slug.split("/");
    const hasLocalePrefix = parts.length > 1 && availableLocales.includes(parts[0]);
    const base = hasLocalePrefix ? parts.slice(1).join("/") : slug;
    const candidates = locale === defaultLocale ? [base, locale + "/" + base] : [locale + "/" + base, base];

    for (const candidate of candidates) {
      if (docsBySlug.has(candidate) && docsBySlug.get(candidate).locale === locale) {
        return candidate;
      }
    }
    return homeSlugFor(locale);
  }

  function closeSidebar() {
    elements.sidebar.classList.remove("open");
  }

  function setRoute(slug, section, locale) {
    const actualLocale = locale || docsBySlug.get(slug)?.locale || state.locale;
    const nextHash = encodeHash(slug, section || "", actualLocale);
    closeSidebar();
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
      return;
    }
    state.locale = actualLocale;
    state.slug = slug;
    state.section = section || "";
    window.localStorage.setItem("codexWikiLocale", state.locale);
    render();
  }

  function renderLanguageSwitch() {
    elements.langSwitch.innerHTML = "";
    const locales = availableLocales.filter(function (locale) {
      return !!UI[locale];
    });
    elements.langSwitch.hidden = locales.length <= 1;

    locales.forEach(function (locale) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "lang-button" + (state.locale === locale ? " active" : "");
      button.textContent = locale.toUpperCase();
      button.addEventListener("click", function () {
        const nextSlug = mirrorSlug(locale, state.slug || homeSlugFor(state.locale));
        setRoute(nextSlug, "", locale);
      });
      elements.langSwitch.appendChild(button);
    });
  }

  function renderFilters() {
    elements.filters.innerHTML = "";
    (data.groups || []).forEach(function (groupKey) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-chip" + (state.group === groupKey ? " active" : "");
      button.textContent = translateGroup(groupKey);
      button.addEventListener("click", function () {
        state.group = groupKey;
        renderHero(docsBySlug.get(state.slug));
        renderFilters();
        renderNav();
        renderSearch();
      });
      elements.filters.appendChild(button);
    });
  }

  function renderHero(doc) {
    const localeDocs = currentDocs();
    const filteredDocs = visibleDocs();
    const examples = localeDocs.filter(function (item) {
      return item.isExample;
    }).length;

    elements.heroTitle.textContent = ui().brandName;
    elements.heroLead.textContent = ui().heroLead;
    elements.heroStats.innerHTML =
      '<div class="hero-stat-card">' +
      '<span class="hero-stat-label">' +
      escapeHtml(ui().visibleLabel) +
      "</span>" +
      '<strong class="hero-stat-value">' +
      escapeHtml(String(filteredDocs.length)) +
      "</strong>" +
      '<span class="hero-stat-meta">' +
      escapeHtml(translateGroup(state.group)) +
      "</span>" +
      "</div>" +
      '<div class="hero-stat-card">' +
      '<span class="hero-stat-label">' +
      escapeHtml(ui().docsLabel) +
      "</span>" +
      '<strong class="hero-stat-value">' +
      escapeHtml(String(localeDocs.length)) +
      "</strong>" +
      '<span class="hero-stat-meta">' +
      escapeHtml(state.locale.toUpperCase()) +
      "</span>" +
      "</div>" +
      '<div class="hero-stat-card">' +
      '<span class="hero-stat-label">' +
      escapeHtml(ui().sectionsWord) +
      "</span>" +
      '<strong class="hero-stat-value">' +
      escapeHtml(String(totalSections(filteredDocs))) +
      "</strong>" +
      '<span class="hero-stat-meta">' +
      escapeHtml(doc ? doc.title : ui().brandName) +
      "</span>" +
      "</div>" +
      '<div class="hero-stat-card">' +
      '<span class="hero-stat-label">' +
      escapeHtml(ui().examplesLabel) +
      "</span>" +
      '<strong class="hero-stat-value">' +
      escapeHtml(String(examples)) +
      "</strong>" +
      '<span class="hero-stat-meta">' +
      escapeHtml(ui().filterLabel) +
      ": " +
      escapeHtml(translateGroup(state.group)) +
      "</span>" +
      "</div>";
  }

  function renderNav() {
    const grouped = new Map();
    visibleDocs().forEach(function (doc) {
      if (!grouped.has(doc.groupKey)) {
        grouped.set(doc.groupKey, []);
      }
      grouped.get(doc.groupKey).push(doc);
    });

    elements.navTree.innerHTML = "";
    (data.groups || []).forEach(function (groupKey) {
      if (groupKey === "all" || !grouped.has(groupKey)) {
        return;
      }
      const items = grouped.get(groupKey);
      const wrapper = document.createElement("section");
      wrapper.className = "nav-group";

      const header = document.createElement("div");
      header.className = "nav-group-title";
      header.innerHTML =
        '<span class="nav-group-name">' +
        escapeHtml(translateGroup(groupKey)) +
        "</span>" +
        '<span class="nav-group-count">' +
        escapeHtml(String(items.length)) +
        "</span>";
      wrapper.appendChild(header);

      items.forEach(function (doc) {
        const link = document.createElement("a");
        link.className = "nav-link" + (doc.slug === state.slug ? " active" : "");
        link.href = encodeHash(doc.slug, "", doc.locale);
        link.innerHTML =
          '<span class="nav-link-top">' +
          '<span class="nav-link-title">' +
          escapeHtml(doc.title) +
          "</span>" +
          '<span class="nav-link-kind">' +
          escapeHtml(doc.isReadme ? ui().readmeHub : ui().markdown) +
          "</span>" +
          "</span>" +
          '<span class="nav-link-path">' +
          escapeHtml(doc.sourcePath) +
          "</span>";
        link.addEventListener("click", function (event) {
          event.preventDefault();
          setRoute(doc.slug, "", doc.locale);
        });
        wrapper.appendChild(link);
      });

      elements.navTree.appendChild(wrapper);
    });
  }

  function normalizeText(value) {
    return (value || "").toLowerCase().trim();
  }

  function snippetAround(text, tokens) {
    const lower = normalizeText(text);
    let index = -1;
    for (const token of tokens) {
      index = lower.indexOf(token);
      if (index !== -1) {
        break;
      }
    }
    if (index === -1) {
      return text.slice(0, 160);
    }
    const start = Math.max(0, index - 60);
    const end = Math.min(text.length, index + 120);
    const prefix = start > 0 ? "…" : "";
    const suffix = end < text.length ? "…" : "";
    return prefix + text.slice(start, end).trim() + suffix;
  }

  function searchDocs(query) {
    const normalized = normalizeText(query);
    if (!normalized) {
      return [];
    }

    const tokens = normalized.split(/\s+/).filter(Boolean);
    const results = [];

    visibleDocs().forEach(function (doc) {
      let bestScore = 0;
      let bestSection = null;

      (doc.sections || []).forEach(function (section) {
        const title = normalizeText(section.title);
        const text = normalizeText(section.text);
        let score = 0;

        tokens.forEach(function (token) {
          if (normalizeText(doc.title).includes(token)) {
            score += 22;
          }
          if (normalizeText(translateGroup(doc.groupKey)).includes(token)) {
            score += 14;
          }
          if (title.includes(token)) {
            score += 10;
          }
          if (text.includes(token)) {
            score += 4;
          }
        });

        if (score > bestScore) {
          bestScore = score;
          bestSection = section;
        }
      });

      if (bestScore > 0) {
        results.push({
          doc: doc,
          section: bestSection,
          score: bestScore,
          snippet: snippetAround((bestSection && bestSection.text) || doc.text, tokens),
        });
      }
    });

    return results.sort(function (a, b) {
      return b.score - a.score;
    }).slice(0, 24);
  }

  function renderSearch() {
    const results = searchDocs(state.query);
    elements.searchResults.innerHTML = "";
    if (!state.query.trim()) {
      elements.searchResults.classList.add("hidden");
      return;
    }

    elements.searchResults.classList.remove("hidden");
    if (!results.length) {
      const empty = document.createElement("div");
      empty.className = "search-result search-empty";
      empty.innerHTML =
        '<div class="result-topline"><span class="result-title">' +
        escapeHtml(ui().noResultsTitle) +
        "</span></div>" +
        '<div class="result-snippet">' +
        escapeHtml(ui().noResultsBody) +
        "</div>";
      elements.searchResults.appendChild(empty);
      return;
    }

    results.forEach(function (result) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "search-result";
      button.innerHTML =
        '<div class="result-topline">' +
        '<span class="result-title">' +
        escapeHtml(result.doc.title) +
        "</span>" +
        '<span class="result-section">' +
        escapeHtml(result.section ? result.section.title : translateGroup(result.doc.groupKey)) +
        "</span>" +
        "</div>" +
        '<div class="result-snippet">' +
        escapeHtml(result.snippet) +
        "</div>" +
        '<div class="result-path">' +
        escapeHtml(result.doc.sourcePath) +
        "</div>";
      button.addEventListener("click", function () {
        state.query = "";
        elements.searchInput.value = "";
        renderSearch();
        setRoute(result.doc.slug, result.section && result.section.id, result.doc.locale);
      });
      elements.searchResults.appendChild(button);
    });
  }

  function renderDocHeader(doc) {
    elements.docCard.classList.toggle("is-readme", !!doc.isReadme);
    elements.breadcrumb.textContent = doc.sourcePath;

    const headings = (doc.headings || []).filter(function (item) {
      return item.level >= 2;
    });

    const quickLinks = headings.slice(0, 5).map(function (heading) {
      return (
        '<a class="jump-chip" href="' +
        encodeHash(doc.slug, heading.id, doc.locale) +
        '">' +
        escapeHtml(heading.title) +
        "</a>"
      );
    }).join("");

    elements.docHeader.innerHTML =
      '<div class="doc-header-grid">' +
      '<div class="doc-header-copy">' +
      '<div class="eyebrow">' +
      escapeHtml(translateGroup(doc.groupKey)) +
      "</div>" +
      "<h1>" +
      escapeHtml(doc.title) +
      "</h1>" +
      '<div class="doc-excerpt">' +
      escapeHtml(doc.excerpt || "") +
      "</div>" +
      '<div class="doc-meta-row">' +
      '<span class="meta-pill accent">' +
      escapeHtml(translateGroup(doc.groupKey)) +
      "</span>" +
      '<span class="meta-pill">' +
      escapeHtml(doc.isReadme ? ui().readmeHub : ui().markdown) +
      "</span>" +
      '<span class="meta-pill">' +
      escapeHtml(String(headings.length)) +
      " " +
      escapeHtml(ui().sectionsWord) +
      "</span>" +
      '<span class="meta-pill">' +
      escapeHtml(doc.locale.toUpperCase()) +
      "</span>" +
      "</div>" +
      '<div class="doc-jump-zone">' +
      '<div class="jump-zone-label">' +
      escapeHtml(ui().quickLinksLabel) +
      "</div>" +
      '<div class="jump-strip">' +
      (quickLinks || '<div class="doc-quick-empty">' + escapeHtml(ui().noQuickLinks) + "</div>") +
      "</div>" +
      "</div>" +
      "</div>" +
      '<aside class="doc-spotlight">' +
      '<div class="spotlight-label">' +
      escapeHtml(ui().docPulseLabel) +
      "</div>" +
      '<div class="spotlight-title">' +
      escapeHtml(doc.isReadme ? ui().readmeHub : doc.title) +
      "</div>" +
      '<div class="spotlight-grid">' +
      '<div class="spotlight-item"><span>' +
      escapeHtml(ui().sourceLabel) +
      "</span><strong><code>" +
      escapeHtml(doc.sourcePath) +
      "</code></strong></div>" +
      '<div class="spotlight-item"><span>' +
      escapeHtml(ui().sectionsWord) +
      "</span><strong>" +
      escapeHtml(String(headings.length)) +
      "</strong></div>" +
      '<div class="spotlight-item"><span>' +
      escapeHtml(ui().localeLabel) +
      "</span><strong>" +
      escapeHtml(doc.locale.toUpperCase()) +
      "</strong></div>" +
      '<div class="spotlight-item"><span>' +
      escapeHtml(ui().openLabel) +
      '</span><strong><code>wiki codex</code></strong></div>' +
      "</div>" +
      "</aside>" +
      "</div>";

    elements.docHeader.querySelectorAll(".jump-chip").forEach(function (link, index) {
      link.style.setProperty("--jump-delay", String(index));
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const url = new URL(link.href);
        const params = new URLSearchParams(url.hash.replace(/^#/, ""));
        setRoute(doc.slug, params.get("section") || "", doc.locale);
      });
    });
  }

  function renderDocContent(doc) {
    elements.docContent.innerHTML = doc.html;
  }

  function renderToc(doc) {
    const headings = (doc.headings || []).filter(function (item) {
      return item.level <= 4;
    });
    elements.tocList.innerHTML = "";

    elements.tocQuick.innerHTML =
      '<div class="toc-quick-card">' +
      '<span class="toc-quick-label">' +
      escapeHtml(ui().filterLabel) +
      "</span>" +
      '<strong class="toc-quick-value">' +
      escapeHtml(translateGroup(doc.groupKey)) +
      "</strong>" +
      "</div>" +
      '<div class="toc-quick-card">' +
      '<span class="toc-quick-label">' +
      escapeHtml(ui().sectionsWord) +
      "</span>" +
      '<strong class="toc-quick-value">' +
      escapeHtml(String(headings.length)) +
      "</strong>" +
      "</div>";

    if (!headings.length) {
      elements.tocList.innerHTML = '<div class="toc-empty">' + escapeHtml(ui().noToc) + "</div>";
    } else {
      headings.forEach(function (heading) {
        const link = document.createElement("a");
        link.href = encodeHash(doc.slug, heading.id, doc.locale);
        link.className =
          "toc-link level-" +
          Math.min(Math.max(heading.level, 1), 4) +
          (heading.id === state.section ? " active" : "");
        link.textContent = heading.title;
        link.addEventListener("click", function (event) {
          event.preventDefault();
          setRoute(doc.slug, heading.id, doc.locale);
        });
        elements.tocList.appendChild(link);
      });
    }

    elements.tocMeta.innerHTML =
      escapeHtml(ui().buildLabel) +
      ": <code>" +
      escapeHtml(formatBuildTime(data.generatedAt || "")) +
      "</code><br />" +
      escapeHtml(ui().openLabel) +
      ': <code>wiki codex</code>';
  }

  function formatBuildTime(value) {
    if (!value) {
      return "";
    }
    return value.replace("T", " ").replace("Z", " UTC");
  }

  function focusSection(sectionId) {
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    requestAnimationFrame(function () {
      const target = document.getElementById(sectionId);
      if (!target) {
        return;
      }
      target.classList.remove("section-highlight");
      target.classList.add("section-highlight");
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(function () {
        target.classList.remove("section-highlight");
      }, 1400);
    });
  }

  function applyLocaleUi() {
    document.documentElement.lang = state.locale;
    document.title = "Codex CLI wiki";
    elements.brandEyebrow.textContent = ui().brandEyebrow;
    elements.brandName.textContent = ui().brandName;
    elements.brandCopy.textContent = ui().brandCopy;
    elements.pageEyebrow.textContent = ui().pageEyebrow;
    elements.searchLabel.textContent = ui().searchLabel;
    elements.searchInput.placeholder = ui().searchPlaceholder;
    elements.footerLabel.textContent = ui().footerLabel;
    elements.tocEyebrow.textContent = ui().tocEyebrow;
    elements.mobileToggle.textContent = ui().mobileToggle;
    elements.homeButton.textContent = ui().homeButton;
    elements.copyLinkButton.textContent = ui().copyLink;
    elements.libraryLabel.textContent = ui().libraryLabel;
    elements.toolbarLabel.textContent = ui().toolbarLabel;
  }

  function render() {
    applyLocaleUi();
    renderLanguageSwitch();
    const doc = docsBySlug.get(state.slug) || docsBySlug.get(homeSlugFor(state.locale));
    if (!doc) {
      return;
    }
    state.locale = doc.locale;
    window.localStorage.setItem("codexWikiLocale", state.locale);
    document.title = doc.title + " · Codex CLI wiki";
    renderHero(doc);
    renderNav();
    renderFilters();
    renderDocHeader(doc);
    renderDocContent(doc);
    renderToc(doc);
    renderSearch();
    focusSection(state.section);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function handleHashChange() {
    const route = decodeHash();
    state.locale = route.locale;
    state.slug = route.slug;
    state.section = route.section;
    render();
  }

  elements.searchInput.addEventListener("input", function (event) {
    state.query = event.target.value;
    renderSearch();
  });

  elements.copyLinkButton.addEventListener("click", function () {
    function resetCopyLabel(value) {
      elements.copyLinkButton.textContent = value;
      setTimeout(function () {
        elements.copyLinkButton.textContent = ui().copyLink;
      }, 1200);
    }

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard
        .writeText(window.location.href)
        .then(function () {
          resetCopyLabel(ui().copied);
        })
        .catch(function () {
          resetCopyLabel(ui().copyFailed);
        });
      return;
    }

    const helper = document.createElement("textarea");
    helper.value = window.location.href;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();

    try {
      document.execCommand("copy");
      resetCopyLabel(ui().copied);
    } catch (error) {
      resetCopyLabel(ui().copyFailed);
    }

    document.body.removeChild(helper);
  });

  elements.homeButton.addEventListener("click", function () {
    setRoute(homeSlugFor(state.locale), "", state.locale);
  });

  elements.mobileToggle.addEventListener("click", function () {
    elements.sidebar.classList.toggle("open");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "/" && document.activeElement !== elements.searchInput) {
      event.preventDefault();
      elements.searchInput.focus();
      elements.searchInput.select();
    }

    if (event.key === "Escape") {
      closeSidebar();
    }
  });

  window.addEventListener("hashchange", handleHashChange);

  handleHashChange();
})();
