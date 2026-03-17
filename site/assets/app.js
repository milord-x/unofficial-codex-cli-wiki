(function () {
  const data = window.CODEX_WIKI_DATA || { docs: [], groups: [] };
  const docs = data.docs || [];
  const docsBySlug = new Map(docs.map((doc) => [doc.slug, doc]));
  const homeSlug = data.homeSlug || (docs[0] && docs[0].slug);

  const state = {
    query: "",
    group: "Все",
    slug: homeSlug,
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
    breadcrumb: document.getElementById("pageBreadcrumb"),
    copyLinkButton: document.getElementById("copyLinkButton"),
    homeButton: document.getElementById("homeButton"),
    mobileToggle: document.getElementById("mobileToggle"),
  };

  function decodeHash() {
    const hash = window.location.hash.replace(/^#/, "");
    const params = new URLSearchParams(hash);
    const slug = params.get("doc");
    const section = params.get("section");
    return {
      slug: slug && docsBySlug.has(slug) ? slug : homeSlug,
      section: section || "",
    };
  }

  function encodeHash(slug, section) {
    const params = new URLSearchParams();
    params.set("doc", slug);
    if (section) {
      params.set("section", section);
    }
    return "#" + params.toString();
  }

  function setRoute(slug, section) {
    const nextHash = encodeHash(slug, section || "");
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
      return;
    }
    state.slug = slug;
    state.section = section || "";
    render();
  }

  function groupDocs() {
    const grouped = new Map();
    docs.forEach((doc) => {
      if (state.group !== "Все" && doc.group !== state.group) {
        return;
      }
      if (!grouped.has(doc.group)) {
        grouped.set(doc.group, []);
      }
      grouped.get(doc.group).push(doc);
    });
    return grouped;
  }

  function renderFilters() {
    elements.filters.innerHTML = "";
    (data.groups || []).forEach((group) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-chip" + (state.group === group ? " active" : "");
      button.textContent = group;
      button.addEventListener("click", function () {
        state.group = group;
        renderFilters();
        renderNav();
        renderSearch();
      });
      elements.filters.appendChild(button);
    });
  }

  function renderNav() {
    const grouped = groupDocs();
    elements.navTree.innerHTML = "";
    for (const [group, items] of grouped.entries()) {
      const wrapper = document.createElement("div");
      wrapper.className = "nav-group";
      const title = document.createElement("div");
      title.className = "nav-group-title";
      title.textContent = group;
      wrapper.appendChild(title);
      items.forEach((doc) => {
        const link = document.createElement("a");
        link.className = "nav-link" + (doc.slug === state.slug ? " active" : "");
        link.href = encodeHash(doc.slug, "");
        link.innerHTML =
          '<span class="nav-link-title">' +
          escapeHtml(doc.title) +
          "</span>" +
          '<span class="nav-link-path">' +
          escapeHtml(doc.sourcePath) +
          "</span>";
        link.addEventListener("click", function (event) {
          event.preventDefault();
          setRoute(doc.slug, "");
        });
        wrapper.appendChild(link);
      });
      elements.navTree.appendChild(wrapper);
    }
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

    docs.forEach((doc) => {
      if (state.group !== "Все" && doc.group !== state.group) {
        return;
      }

      let bestScore = 0;
      let bestSection = null;

      (doc.sections || []).forEach((section) => {
        const title = normalizeText(section.title);
        const text = normalizeText(section.text);
        let score = 0;

        tokens.forEach((token) => {
          if (normalizeText(doc.title).includes(token)) {
            score += 22;
          }
          if (normalizeText(doc.group).includes(token)) {
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

    return results.sort((a, b) => b.score - a.score).slice(0, 24);
  }

  function renderSearch() {
    const results = searchDocs(state.query);
    elements.searchResults.innerHTML = "";
    if (!state.query.trim()) {
      elements.searchResults.classList.add("hidden");
      return;
    }

    if (!results.length) {
      elements.searchResults.classList.remove("hidden");
      const empty = document.createElement("div");
      empty.className = "search-result";
      empty.innerHTML =
        '<div class="result-topline"><span class="result-title">Ничего не найдено</span></div>' +
        '<div class="result-snippet">Попробуй сократить запрос или переключить фильтр разделов.</div>';
      elements.searchResults.appendChild(empty);
      return;
    }

    elements.searchResults.classList.remove("hidden");
    results.forEach((result) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "search-result";
      button.innerHTML =
        '<div class="result-topline">' +
        '<span class="result-title">' +
        escapeHtml(result.doc.title) +
        "</span>" +
        '<span class="result-section">' +
        escapeHtml(result.section ? result.section.title : result.doc.group) +
        "</span>" +
        "</div>" +
        '<div class="result-snippet">' +
        escapeHtml(result.snippet) +
        "</div>";
      button.addEventListener("click", function () {
        state.query = "";
        elements.searchInput.value = "";
        renderSearch();
        setRoute(result.doc.slug, result.section && result.section.id);
      });
      elements.searchResults.appendChild(button);
    });
  }

  function renderDocHeader(doc) {
    elements.docCard.classList.toggle("is-readme", !!doc.isReadme);
    elements.breadcrumb.textContent = doc.sourcePath;

    const headingsCount = (doc.headings || []).filter((item) => item.level >= 2).length;
    elements.docHeader.innerHTML =
      '<div class="doc-meta-row">' +
      '<span class="meta-pill accent">' +
      escapeHtml(doc.group) +
      "</span>" +
      '<span class="meta-pill">' +
      escapeHtml(doc.isReadme ? "README / Hub" : "Markdown") +
      "</span>" +
      '<span class="meta-pill">' +
      escapeHtml(String(headingsCount)) +
      " sections</span>" +
      "</div>" +
      "<h1>" +
      escapeHtml(doc.title) +
      "</h1>" +
      '<div class="doc-excerpt">' +
      escapeHtml(doc.excerpt || "") +
      "</div>" +
      '<div class="doc-source">Источник: <code>' +
      escapeHtml(doc.sourcePath) +
      "</code></div>";
  }

  function renderDocContent(doc) {
    elements.docContent.innerHTML = doc.html;
  }

  function renderToc(doc) {
    const headings = (doc.headings || []).filter((item) => item.level <= 4);
    elements.tocList.innerHTML = "";

    if (!headings.length) {
      elements.tocList.innerHTML = '<div class="toc-meta">У этого документа нет структурного оглавления.</div>';
    } else {
      headings.forEach((heading) => {
        const link = document.createElement("a");
        link.href = encodeHash(doc.slug, heading.id);
        link.className =
          "toc-link level-" +
          Math.min(Math.max(heading.level, 1), 4) +
          (heading.id === state.section ? " active" : "");
        link.textContent = heading.title;
        link.addEventListener("click", function (event) {
          event.preventDefault();
          setRoute(doc.slug, heading.id);
        });
        elements.tocList.appendChild(link);
      });
    }

    elements.tocMeta.innerHTML =
      "Сборка: <code>" +
      escapeHtml((data.generatedAt || "").replace("T", " ").replace("Z", " UTC")) +
      "</code><br />" +
      "Открытие: <code>wiki codex</code>";
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

  function render() {
    const doc = docsBySlug.get(state.slug) || docsBySlug.get(homeSlug);
    if (!doc) {
      return;
    }
    document.title = doc.title + " · Codex Wiki";
    renderNav();
    renderDocHeader(doc);
    renderDocContent(doc);
    renderToc(doc);
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
    state.slug = route.slug;
    state.section = route.section;
    render();
  }

  elements.searchInput.addEventListener("input", function (event) {
    state.query = event.target.value;
    renderSearch();
  });

  elements.copyLinkButton.addEventListener("click", function () {
    navigator.clipboard
      .writeText(window.location.href)
      .then(function () {
        elements.copyLinkButton.textContent = "Скопировано";
        setTimeout(function () {
          elements.copyLinkButton.textContent = "Скопировать ссылку";
        }, 1200);
      })
      .catch(function () {
        elements.copyLinkButton.textContent = "Не удалось";
        setTimeout(function () {
          elements.copyLinkButton.textContent = "Скопировать ссылку";
        }, 1200);
      });
  });

  elements.homeButton.addEventListener("click", function () {
    setRoute(homeSlug, "");
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
  });

  window.addEventListener("hashchange", handleHashChange);

  renderFilters();
  handleHashChange();
})();
