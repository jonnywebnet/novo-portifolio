import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';

import type { CSSProperties } from 'react';

type Theme = 'dark' | 'light';
type ModalKey = 'about' | 'projects' | 'arsenal' | 'journey' | 'contact';
type ProjectVisual = 'delivery' | 'service' | 'cafe' | 'mimo';

type Project = {
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  visual: ProjectVisual;
  href?: string;
  linkLabel?: string;
  demoUrl?: string;
  demoLabel?: string;
};

const navItems = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Jornada', href: '#jornada' },
  { label: 'Arsenal', href: '#arsenal' },
];

const projects: Project[] = [
  {
    number: '01',
    category: 'PAINEL WEB',
    title: 'Painel Delivery',
    description:
      'Painel para gerenciar cardápio: autenticação, busca por pratos, filtro por cozinha e operações de cadastro, edição e exclusão.',
    tags: ['React 19', 'TypeScript', 'Vite', 'Axios'],
    status: 'Publicado · API simulada',
    visual: 'delivery',
    href: 'https://github.com/jonnywebnet/painel-delivery',
    linkLabel: 'Ver repositório do Painel Delivery',
    demoUrl: 'https://painel-delivery-kohl.vercel.app/',
    demoLabel: 'Abrir Painel Delivery',
  },
  {
    number: '02',
    category: 'VITRINE DIGITAL',
    title: 'Mimo! — Papelaria',
    description:
      'Vitrine demonstrativa de papelaria, presentes e beleza, com busca, filtros por unidade e categoria e catálogo de produtos.',
    tags: ['React', 'JavaScript', 'Vite'],
    status: 'Publicado · MVP demonstrativo',
    visual: 'mimo',
    demoUrl: 'https://mimo-flora.vercel.app/',
    demoLabel: 'Abrir vitrine Mimo! — Papelaria',
  },
  {
    number: '03',
    category: 'SISTEMA ADMINISTRATIVO',
    title: 'TG Assistência',
    description:
      'Sistema para organizar clientes, equipamentos, estoque, ordens de serviço e auditoria em uma assistência técnica.',
    tags: ['React', 'TypeScript', 'Drizzle ORM'],
    status: 'Projeto funcional · código privado',
    visual: 'service',
  },
  {
    number: '04',
    category: 'JOGO 2D',
    title: 'Café Aurora',
    description:
      'Jogo de cafeteria feito para praticar lógica, interação e criação de uma experiência visual com Python e Pygame.',
    tags: ['Python', 'Pygame', 'Game dev'],
    status: 'Em evolução · repositório público',
    visual: 'cafe',
    href: 'https://github.com/jonnywebnet/Cafe_aurora',
    linkLabel: 'Ver repositório do Café Aurora',
  },
];

const modalContent: Record<ModalKey, { eyebrow: string; title: string; body: string; items: string[] }> = {
  about: {
    eyebrow: 'Sobre a pessoa',
    title: 'Um caminho guiado pela curiosidade.',
    body: 'Sou Jhonatan Gomes de Souza, estudante de Engenharia de Software. Gosto de entender o problema, organizar a solução e construir produtos digitais simples de usar.',
    items: ['Engenharia de Software', 'Desenvolvimento web', 'Saquarema, Rio de Janeiro'],
  },
  projects: {
    eyebrow: 'Projetos selecionados',
    title: 'Construções em diferentes etapas.',
    body: 'Da vitrine digital ao painel de delivery publicado, cada projeto representa uma parte do que venho estudando e colocando em prática.',
    items: ['Painel Delivery — React e TypeScript, publicado na Vercel', 'Mimo! — vitrine digital demonstrativa publicada na Vercel', 'TG Assistência — sistema funcional, sem código público', 'Café Aurora — jogo 2D em Python e Pygame'],
  },
  arsenal: {
    eyebrow: 'Ferramentas e estudos',
    title: 'Um arsenal em formação.',
    body: 'Tenho praticado tecnologias web e fundamentos de programação por meio de projetos pessoais e acadêmicos.',
    items: ['React, TypeScript, JavaScript', 'Python, Pygame', 'HTML, CSS, APIs, Git e GitHub', 'MySQL e Drizzle ORM'],
  },
  journey: {
    eyebrow: 'Jornada',
    title: 'Aprender, construir, seguir adiante.',
    body: 'Minha trajetória está em andamento: a formação em Engenharia de Software e os projetos práticos são parte do caminho até minha primeira oportunidade em tecnologia.',
    items: ['Formação em Engenharia de Software', 'Projetos web e experiências interativas', 'Próximo rumo: estágio em tecnologia'],
  },
  contact: {
    eyebrow: 'Contato',
    title: 'Vamos abrir novos caminhos?',
    body: 'Estou aberto a conversar sobre estágio, projetos e oportunidades de aprendizado em desenvolvimento web.',
    items: ['E-mail: jonnyweb.net@gmail.com', 'GitHub: jonnywebnet', 'LinkedIn: Jhonatan Gomes de Souza'],
  },
};

function NorthStarMark({ size = 42, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
    >
      <circle cx="24" cy="24" r="17.5" />
      <path d="M24 5.5 28.3 19.7 42.5 24l-14.2 4.3L24 42.5l-4.3-14.2L5.5 24l14.2-4.3L24 5.5Z" />
      <path d="M24 12v24M12 24h24" />
      <circle className="mark-core" cx="24" cy="24" r="2.5" />
    </svg>
  );
}

function WordReveal({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);

  return (
    <span className="word-reveal" style={{ '--word-count': words.length } as CSSProperties}>
      <span className="sr-only">{text}</span>
      <span className="word-visual" aria-hidden="true">
        {words.map((word, index) => (
          <span className="word-unit" key={`${index}-${word}`}>
            <span className="word" style={{ '--word-index': index } as CSSProperties}>{word}</span>
            {index < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </span>
  );
}

function WeatherParticles({ theme }: { theme: Theme }) {
  const particles = Array.from({ length: 88 }, (_, index) => {
    const style = {
      '--particle-x': `${(index * 47 + 9) % 100}%`,
      '--particle-y': `${(index * 67 + 13) % 100}%`,
      '--particle-size': `${index % 9 === 0 ? 5 : 2 + (index % 3)}px`,
      '--particle-duration': `${5 + (index % 9) * 0.8}s`,
      '--particle-delay': `${-((index * 11) % 70) / 10}s`,
      '--particle-drift': `${-18 + (index * 19) % 37}px`,
      '--gust-distance': `${20 + (index % 6) * 12}px`,
      '--wind-x': '0px',
    } as CSSProperties;

    return (
      <span
        className="weather-flight"
        key={index}
        style={style}
        onAnimationIteration={(event) => {
          if (event.animationName !== 'weather-fall') return;
          const flight = event.currentTarget;
          flight.style.setProperty('--particle-x', `${Math.random() * 100}%`);
          flight.style.setProperty('--particle-y', `${Math.random() * 100}%`);
          flight.style.setProperty('--particle-drift', `${Math.random() * 56 - 28}px`);
          flight.style.setProperty('--wind-x', '0px');
        }}
      >
        <span className="weather-particle" />
      </span>
    );
  });

  return <div className={`weather-layer weather-layer-${theme}`} id="weather-layer" aria-hidden="true">{particles}</div>;
}

function CampMap({ onOpen }: { onOpen: (key: ModalKey) => void }) {
  const places: { key: ModalKey; className: string; rune: string; title: string; subtitle: string }[] = [
    { key: 'projects', className: 'tent-dock', rune: 'ᚱ', title: 'Projetos', subtitle: 'construções e ideias' },
    { key: 'about', className: 'tent-forge', rune: 'ᚠ', title: 'Sobre mim', subtitle: 'quem segue a trilha' },
    { key: 'arsenal', className: 'tent-merchant', rune: 'ᛏ', title: 'Arsenal', subtitle: 'ferramentas em prática' },
    { key: 'journey', className: 'tent-skald', rune: 'ᛃ', title: 'Jornada', subtitle: 'formação e próximos passos' },
    { key: 'contact', className: 'tent-watch', rune: 'ᛉ', title: 'Contato', subtitle: 'vamos conversar' },
  ];

  return (
    <div className="camp-map" role="group" aria-label="Mapa interativo NorthStar">
      <span className="trail trail-a" aria-hidden="true" />
      <span className="trail trail-b" aria-hidden="true" />
      <span className="trail trail-c" aria-hidden="true" />
      <span className="trail trail-d" aria-hidden="true" />
      {places.map((place) => (
        <button
          className={`camp-tent ${place.className}`}
          key={place.key}
          onClick={() => onOpen(place.key)}
          type="button"
          aria-label={`Abrir ${place.title}: ${place.subtitle}`}
        >
          <span className="tent-art" aria-hidden="true">{place.rune}</span>
          <span className="tent-label">
            {place.title}
            <small>{place.subtitle}</small>
          </span>
        </button>
      ))}
      <div className="camp-fire" aria-label="NorthStar, a estrela central">
        <NorthStarMark size={48} />
        <strong>NorthStar</strong>
        <small>rumo · curiosidade · criação</small>
      </div>
    </div>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  if (project.visual === 'service') {
    return (
      <div className="project-visual visual-service">
        <img src="/assets/tg-assistencia.jpg" alt="Tela real do painel do sistema TG Assistência" loading="lazy" />
        <span className="visual-caption">TG Assistência · captura do projeto</span>
      </div>
    );
  }

  if (project.visual === 'cafe') {
    return (
      <div className="project-visual visual-cafe">
        <img src="/assets/cafe-aurora.jpg" alt="Tela inicial do jogo Café Aurora" loading="lazy" />
        <span className="visual-caption">Café Aurora · tela do jogo</span>
      </div>
    );
  }

  if (project.visual === 'mimo') {
    return (
      <div className="project-visual visual-mimo" role="img" aria-label="Prévia ilustrativa da vitrine Mimo! de papelaria e presentes">
        <div className="mimo-window">
          <div className="mimo-window-top"><span /><span /><span /><b>mimo! · VITRINE</b></div>
          <div className="mimo-layout">
            <div className="mimo-copy">
              <small>UMA VITRINE CHEIA DE MIMO</small>
              <strong>Coisas lindas<br />pra todo dia.</strong>
              <span>Papelaria · presentes · beleza</span>
            </div>
            <div className="mimo-products" aria-hidden="true">
              <i className="mimo-product mimo-notebook">✿</i>
              <i className="mimo-product mimo-gift">♡</i>
              <i className="mimo-product mimo-bottle">✦</i>
              <i className="mimo-product mimo-pencil">✳</i>
            </div>
          </div>
        </div>
        <span className="visual-caption">Vitrine demonstrativa · site publicado</span>
      </div>
    );
  }

  return (
    <div
      className="project-visual visual-delivery"
      role="img"
      aria-label="Prévia ilustrativa, não captura real, de uma interface de gerenciamento de cardápio"
    >
      <div className="delivery-window">
        <div className="delivery-window-top"><span /><span /><span /><b>PAINEL / CARDÁPIO</b></div>
        <div className="delivery-layout">
          <div className="delivery-rail"><i /><i /><i /><i /></div>
          <div className="delivery-content">
            <div className="delivery-heading"><span>Cardápio</span><i>＋ Novo prato</i></div>
            <div className="delivery-filter"><span>Buscar prato...</span><b>Todas as cozinhas⌄</b></div>
            <div className="dish-row"><span className="dish-thumb thumb-one" /><span><b>Prato em destaque</b><small>Brasileira · 25 min</small></span><em>•••</em></div>
            <div className="dish-row"><span className="dish-thumb thumb-two" /><span><b>Receita da casa</b><small>Italiana · 35 min</small></span><em>•••</em></div>
          </div>
        </div>
      </div>
      <span className="visual-caption">Prévia ilustrativa · site publicado</span>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem('northstar-theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('northstar-theme', theme);
    } catch {
      // O tema continua funcionando mesmo se o navegador bloquear o armazenamento local.
    }
  }, [theme]);

  useEffect(() => {
    if (!activeModal) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [activeModal]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal:not(.visible)');
    const scroller = document.querySelector<HTMLElement>('#portfolio-scroll');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: scroller, rootMargin: '0px 0px -28% 0px', threshold: 0.01 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shell = document.querySelector<HTMLElement>('.site-shell');
    if (!finePointer || !shell) return;

    const glow = document.createElement('div');
    const rune = document.createElement('div');
    const cursor = document.createElement('div');
    glow.className = 'cursor-glow';
    rune.className = 'cursor-rune';
    rune.textContent = 'ᛉ';
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<svg viewBox="0 0 80 180" aria-hidden="true"><path class="spear-blade" d="M40 4 L57 45 L40 70 L23 45 Z"/><path class="spear-shaft" d="M40 64 V174"/><path class="spear-rune" d="M31 91 L40 101 L49 91 M31 116 L40 126 L49 116"/></svg>';
    [glow, rune, cursor].forEach((element) => {
      element.dataset.theme = theme;
      document.body.appendChild(element);
    });
    document.body.classList.add('northstar-custom-pointer');

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let previousX = -100;
    let previousY = -100;
    let lastParticle = 0;
    let frame = 0;

    const movePointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const { clientX: x, clientY: y } = event;
      mouseX = x;
      mouseY = y;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = '1';
      rune.style.left = `${x + 18}px`;
      rune.style.top = `${y - 16}px`;
      rune.style.opacity = '.72';
      cursor.style.opacity = '1';
      shell.style.setProperty('--pointer-x', `${x}px`);
      shell.style.setProperty('--pointer-y', `${y}px`);

      if (!reducedMotion && event.timeStamp - lastParticle > 65) {
        lastParticle = event.timeStamp;
        const particle = document.createElement('span');
        particle.className = 'cursor-particle';
        particle.dataset.theme = theme;
        particle.style.left = `${x + (Math.random() * 12 - 6)}px`;
        particle.style.top = `${y + (Math.random() * 12 - 6)}px`;
        particle.style.setProperty('--dx', `${Math.random() * 38 - 19}px`);
        particle.style.setProperty('--dy', `${Math.random() * -34 - 8}px`);
        document.body.appendChild(particle);
        window.setTimeout(() => particle.remove(), 800);
      }

      if (reducedMotion) cursor.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) rotate(-35deg)`;
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.16;
      cursorY += (mouseY - cursorY) * 0.16;
      const velocityX = mouseX - previousX;
      const velocityY = mouseY - previousY;
      const angle = Math.atan2(velocityY, velocityX) * 180 / Math.PI + 90;
      cursor.style.transform = `translate3d(${cursorX}px,${cursorY}px,0) translate(-50%,-50%) rotate(${angle}deg)`;
      previousX += (mouseX - previousX) * 0.12;
      previousY += (mouseY - previousY) * 0.12;
      frame = window.requestAnimationFrame(animateCursor);
    };

    const setActiveCursor = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest('a, button, .project-card, .camp-tent')) cursor.classList.add('is-active');
    };
    const clearActiveCursor = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('a, button, .project-card, .camp-tent')) return;
      const next = event.relatedTarget;
      if (!(next instanceof Element) || !next.closest('a, button, .project-card, .camp-tent')) cursor.classList.remove('is-active');
    };
    const hideCursor = () => {
      glow.style.opacity = '0';
      rune.style.opacity = '0';
      cursor.style.opacity = '0';
    };

    window.addEventListener('pointermove', movePointer, { passive: true });
    document.addEventListener('pointerover', setActiveCursor, { passive: true });
    document.addEventListener('pointerout', clearActiveCursor, { passive: true });
    window.addEventListener('pointerleave', hideCursor);
    if (!reducedMotion) frame = window.requestAnimationFrame(animateCursor);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', movePointer);
      document.removeEventListener('pointerover', setActiveCursor);
      document.removeEventListener('pointerout', clearActiveCursor);
      window.removeEventListener('pointerleave', hideCursor);
      document.body.classList.remove('northstar-custom-pointer');
      glow.remove();
      rune.remove();
      cursor.remove();
      document.querySelectorAll('.cursor-particle').forEach((particle) => particle.remove());
    };
  }, [theme]);

  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>('#portfolio-scroll');
    const weatherLayer = document.querySelector<HTMLElement>('#weather-layer');
    const content = scroller?.querySelector<HTMLElement>('main');
    if (!scroller || !weatherLayer) return;

    const syncSnowHeight = () => {
      weatherLayer.style.height = `${scroller.scrollHeight}px`;
    };
    syncSnowHeight();

    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(syncSnowHeight);
    if (content) resizeObserver?.observe(content);
    const header = scroller.querySelector<HTMLElement>('.topbar');
    const footer = scroller.querySelector<HTMLElement>('.site-footer');
    if (header) resizeObserver?.observe(header);
    if (footer) resizeObserver?.observe(footer);
    window.addEventListener('resize', syncSnowHeight);

    let lastScrollTop = scroller.scrollTop;
    const spreadWeather = () => {
      const currentScrollTop = scroller.scrollTop;
      const delta = currentScrollTop - lastScrollTop;
      lastScrollTop = currentScrollTop;
      if (!delta) return;

      const direction = delta > 0 ? 1 : -1;
      weatherLayer.querySelectorAll<HTMLElement>('.weather-flight').forEach((flight) => {
        const distance = Number.parseFloat(flight.style.getPropertyValue('--gust-distance')) || 32;
        flight.style.setProperty('--wind-x', `${direction * distance}px`);
      });
    };
    scroller.addEventListener('scroll', spreadWeather, { passive: true });

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', syncSnowHeight);
      scroller.removeEventListener('scroll', spreadWeather);
    };
  }, []);

  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>('#portfolio-scroll');
    const shell = document.querySelector<HTMLElement>('.site-shell');
    if (!scroller || !shell) return;

    const handleInternalLink = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute('href');
      if (!anchor || !hash || hash.length < 2) return;
      const destination = document.getElementById(hash.slice(1));
      if (!destination || !scroller.contains(destination)) return;

      event.preventDefault();
      const top = scroller.scrollTop + destination.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 78;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      scroller.scrollTo({ top: Math.max(0, top), behavior: reducedMotion ? 'auto' : 'smooth' });
      window.history.replaceState(null, '', hash);
    };

    shell.addEventListener('click', handleInternalLink);

    return () => {
      shell.removeEventListener('click', handleInternalLink);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell" data-theme={theme}>
      <div className="world-backdrop" aria-hidden="true">
        <div className="world-stars" />
        <div className="world-sigil">
          <img src={theme === 'dark' ? '/assets/northstar-emblem.png' : '/assets/northstar-emblem-white.png'} alt="" />
        </div>
        <svg className="world-mountains" viewBox="0 0 1440 360" preserveAspectRatio="none">
          <path d="M0 250 110 182 202 238 330 126 426 242 552 78 673 230 786 146 906 242 1034 100 1140 225 1264 137 1440 240V360H0Z" />
          <path d="m0 300 151-72 107 59 124-85 115 73 121-68 123 71 141-73 111 71 124-63 143 68 120-58v137H0Z" />
        </svg>
        <span className="world-rune world-rune-one">ᛟ</span>
        <span className="world-rune world-rune-two">ᚱ</span>
        <span className="world-rune world-rune-three">ᛉ</span>
      </div>
      <div className="scroll-content" id="portfolio-scroll" tabIndex={0} aria-label="Conteúdo rolável do portfólio">
      <WeatherParticles theme={theme} />
      <header className="topbar">
        <div className="wrap nav-wrap">
          <a className="brand" href="#inicio" aria-label="NorthStar — início" onClick={closeMenu}>
            {theme === 'dark' ? (
              <span className="brand-wordmark"><img src="/assets/northstar-logo.png" alt="" /></span>
            ) : (
              <span className="brand-mark"><img src="/assets/northstar-emblem-white.png" alt="" /></span>
            )}
            <span className={`brand-copy ${theme === 'dark' ? 'brand-copy-tagline' : ''}`}>
              {theme === 'light' && <strong>NorthStar</strong>}
              <small>Jhonatan Gomes</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
          </nav>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              type="button"
              onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Ativar tema diurno' : 'Ativar tema noturno'}
              title={theme === 'dark' ? 'Ativar tema diurno' : 'Ativar tema noturno'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span>{theme === 'dark' ? 'Dia' : 'Noite'}</span>
            </button>
            <a className="nav-cta" href="#contato">Falar comigo <ArrowUpRight size={16} /></a>
            <button
              className="menu-toggle"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" id="mobile-navigation" aria-label="Navegação móvel">
            {navItems.map((item) => <a href={item.href} key={item.href} onClick={closeMenu}>{item.label}<ArrowRight size={16} /></a>)}
            <a href="#contato" onClick={closeMenu}>Contato<ArrowRight size={16} /></a>
          </nav>
        )}
      </header>

      <main>
        <section className="hero camp" id="inicio">
          <div className="hero-objects" aria-hidden="true">
            <span className="floating-rune rune-a">ᚠ</span>
            <span className="floating-rune rune-b">ᛏ</span>
            <span className="floating-rune rune-c">ᛉ</span>
            <span className="floating-rune rune-d">ᚱ</span>
            <span className="ice-shard shard-a" />
            <span className="ice-shard shard-b" />
            <span className="ember ember-a" />
            <span className="ember ember-b" />
            <span className="ember ember-c" />
          </div>
          <svg className="hero-ridge" viewBox="0 0 1440 340" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 258 100 192 178 237 275 119 361 232 470 89 563 222 660 151 757 230 862 74 965 223 1073 123 1178 222 1289 150 1440 235V340H0Z" />
            <path className="ridge-front" d="m0 296 138-66 92 51 112-82 120 64 107-78 94 72 112-53 108 68 126-81 102 72 105-49 126 73v253H0Z" />
          </svg>
          <div className="wrap hero-content">
            <div className="hero-grid">
              <div className="hero-copy reveal">
                <p className="eyebrow"><span className="rune">ᚠ</span> Engenharia de Software <i /> Saquarema / RJ</p>
                <h1><WordReveal text="Bem-vindo às" /><br /><em><WordReveal text="terras do norte." /></em></h1>
                <p className="hero-intro"><WordReveal text="Sou Jhonatan Gomes de Souza, estudante de Engenharia de Software e desenvolvedor em formação. Gosto de transformar problemas reais em produtos digitais simples de usar." /></p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#projetos">Explorar projetos <ArrowRight size={17} /></a>
                  <a className="btn btn-ghost" href="#contato">Falar comigo</a>
                </div>
                <div className="hero-meta">
                  <span className="availability"><i /> Disponível para estágio</span>
                  <span>Desenvolvimento web</span>
                </div>
              </div>
              <div className="hero-aside reveal">
                <div className="portrait-orbit orbit-one" aria-hidden="true" />
                <div className="portrait-orbit orbit-two" aria-hidden="true" />
                <div className="portrait-frame">
                  <img src="/assets/jhonatan.png" alt="Jhonatan Gomes de Souza em um ambiente de desenvolvimento" />
                  <div className="portrait-shade" />
                  <div className="portrait-caption"><span>JG</span><small>software<br />& produto</small></div>
                  <div className="portrait-seal"><img className="seal-logo" src={theme === 'dark' ? '/assets/northstar-emblem.png' : '/assets/northstar-emblem-white.png'} alt="" /><small>RUMO<br />PRÓPRIO</small></div>
                </div>
                <div className="portrait-note"><span className="rune">ᛉ</span><span>Curiosidade<br />em movimento</span></div>
              </div>
            </div>
            <div className="camp-heading reveal">
              <span className="eyebrow"><span className="rune">ᚱ</span> Um mapa para explorar</span>
              <p>Escolha uma trilha. Cada tenda guarda uma parte do meu percurso.</p>
            </div>
            <CampMap onOpen={setActiveModal} />
            <a className="scroll-cue" href="#sobre"><ArrowDown size={15} /> Role para continuar</a>
          </div>
        </section>

        <div className="stats-strip" aria-label="Resumo profissional">
          <div className="wrap stats-grid">
            <div className="stat"><strong>04</strong><span>projetos<br />em destaque</span></div>
            <div className="stat"><strong>React <i>+</i> TS</strong><span>aplicações web<br />em construção</span></div>
            <div className="stat"><strong>Próximo rumo</strong><span>primeiro estágio<br />em tecnologia</span></div>
            <p>código com<br /><em>clareza.</em></p>
          </div>
        </div>

        <section className="section about-section" id="sobre">
          <div className="wrap about-grid">
            <div className="about-copy reveal">
              <div className="eyebrow"><span className="rune">ᛏ</span> A pessoa por trás do código</div>
              <h2><WordReveal text="Desenvolver é" /><br /><em><WordReveal text="resolver." /></em></h2>
              <p className="lead"><WordReveal text="Não quero apenas fazer telas bonitas. Quero entender o problema, organizar a solução e entregar algo que realmente ajude alguém." /></p>
              <p><WordReveal text="Na Engenharia de Software, venho construindo repertório com aplicações web, jogos e estudos de front-end. Também tenho experiência prática trabalhando em sistemas administrativos, com atenção para organização, segurança e usabilidade." /></p>
              <div className="quote">“Cada projeto é uma nova trilha para aprender fazendo.”</div>
            </div>
            <div className="principles reveal">
              <article className="principle"><span className="principle-rune">ᛟ</span><h3>Entender antes de construir</h3><p>Uma boa solução começa com uma pergunta bem compreendida.</p></article>
              <article className="principle"><span className="principle-rune">ᚱ</span><h3>Clareza no caminho</h3><p>Interfaces e ideias ficam melhores quando são simples de acompanhar.</p></article>
              <article className="principle"><span className="principle-rune">ᛃ</span><h3>Aprender fazendo</h3><p>Projetos práticos transformam estudo em experiência concreta.</p></article>
              <article className="principle"><span className="principle-rune">ᛉ</span><h3>Cuidar dos detalhes</h3><p>A atenção ao uso e à acessibilidade também faz parte do código.</p></article>
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projetos">
          <div className="wrap">
            <div className="section-head reveal">
              <div><div className="eyebrow"><span className="rune">ᚲ</span> Tesouros da forja</div><h2><WordReveal text="Projetos selecionados" /></h2></div>
              <p><WordReveal text="Projetos pessoais e acadêmicos em diferentes etapas — sem inventar demonstrações que ainda não existem." /></p>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card reveal" key={project.title}>
                  <ProjectPreview project={project} />
                  <div className="project-card-content">
                    <div className="project-top"><span>{project.number} · {project.category}</span><span className="project-state"><i />{project.status}</span></div>
                    <h3><WordReveal text={project.title} /></h3>
                    <p><WordReveal text={project.description} /></p>
                    <div className="project-footer">
                      <div className="tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                      {project.demoUrl || project.href ? (
                        <div className="project-actions">
                          {project.demoUrl && (
                            <a className="project-link" href={project.demoUrl} target="_blank" rel="noreferrer" aria-label={project.demoLabel}>
                              Abrir site <ArrowUpRight size={15} />
                            </a>
                          )}
                          {project.href && (
                            <a className="project-link project-repository-link" href={project.href} target="_blank" rel="noreferrer" aria-label={project.linkLabel}>
                              Ver código <Github size={14} />
                            </a>
                          )}
                        </div>
                      ) : <span className="private-label">Sem link público</span>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section journey-section" id="jornada">
          <div className="wrap journey-grid">
            <div className="journey-intro reveal">
              <div className="eyebrow"><span className="rune">ᛒ</span> A travessia</div>
              <h2><WordReveal text="Aprendizado" /><br /><WordReveal text="em movimento." /></h2>
              <p><WordReveal text="Uma carreira não se constrói de uma vez. A minha está em andamento — entre a formação, os projetos práticos e o próximo passo profissional." /></p>
            </div>
            <div className="timeline reveal">
              <article className="event"><span className="event-time">Agora</span><h3><WordReveal text="Engenharia de Software" /></h3><p><WordReveal text="Formação e fundamentos para compreender como produtos e sistemas são construídos." /></p></article>
              <article className="event"><span className="event-time">Na prática</span><h3><WordReveal text="Projetos autorais e acadêmicos" /></h3><p><WordReveal text="Aplicações web, sistemas administrativos e experiências interativas como parte do aprendizado." /></p></article>
              <article className="event"><span className="event-time">Próximo norte</span><h3><WordReveal text="Primeiro estágio em tecnologia" /></h3><p><WordReveal text="Busco uma oportunidade para aprender com um time e contribuir com desenvolvimento web." /></p></article>
            </div>
          </div>
        </section>

        <section className="section arsenal-section" id="arsenal">
          <div className="wrap arsenal-grid">
            <div className="arsenal-copy reveal">
              <div className="eyebrow"><span className="rune">ᚢ</span> Arsenal</div>
              <h2><WordReveal text="Ferramentas para" /><br /><WordReveal text="cada terreno." /></h2>
              <p><WordReveal text="Não sou definido por uma única linguagem. Estou desenvolvendo a capacidade de escolher ferramentas e entender como elas se encaixam em cada projeto." /></p>
              <div className="skill-cloud" aria-label="Tecnologias e ferramentas praticadas">
                {['React', 'TypeScript', 'JavaScript', 'Python', 'HTML', 'CSS', 'Pygame', 'Git / GitHub', 'MySQL', 'APIs', 'Drizzle ORM'].map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}
              </div>
            </div>
            <div className="arsenal-note reveal">
              <div className="arsenal-sigil"><NorthStarMark size={82} /></div>
              <span className="eyebrow">Em constante construção</span>
              <p><WordReveal text="Estudo aplicado a projetos, com espaço para testar, ajustar e aprender." /></p>
            </div>
          </div>
        </section>

        <section className="section services-section">
          <div className="wrap">
            <div className="section-head reveal">
              <div><div className="eyebrow"><span className="rune">ᚾ</span> No que tenho explorado</div><h2><WordReveal text="Três frentes de criação." /></h2></div>
              <p><WordReveal text="Áreas que aparecem nos meus estudos e projetos atuais." /></p>
            </div>
            <div className="service-grid">
              <article className="service-card reveal"><span>01 / ᚠ</span><h3><WordReveal text="Interfaces web" /></h3><p><WordReveal text="Construção de telas responsivas com React, TypeScript, HTML e CSS." /></p></article>
              <article className="service-card reveal"><span>02 / ᛏ</span><h3><WordReveal text="Sistemas úteis" /></h3><p><WordReveal text="Organização de fluxos e informações em ferramentas administrativas." /></p></article>
              <article className="service-card reveal"><span>03 / ᛉ</span><h3><WordReveal text="Experiências interativas" /></h3><p><WordReveal text="Exploração de lógica, estados e interação em jogos e projetos pessoais." /></p></article>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contato">
          <div className="wrap">
            <div className="contact-box reveal">
              <div>
                <div className="eyebrow"><span className="rune">ᛞ</span> O próximo capítulo</div>
                <h2><WordReveal text="Vamos abrir" /><br /><em><WordReveal text="novos caminhos?" /></em></h2>
                <p><WordReveal text="Estou aberto a conversar sobre estágio, projetos e oportunidades de aprendizado em desenvolvimento web." /></p>
              </div>
              <a className="btn btn-primary contact-button" href="mailto:jonnyweb.net@gmail.com">Enviar mensagem <ArrowUpRight size={17} /></a>
            </div>
            <div className="contact-links">
              <a href="mailto:jonnyweb.net@gmail.com"><Mail size={17} /> jonnyweb.net@gmail.com <ArrowUpRight size={14} /></a>
              <a href="https://github.com/jonnywebnet" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a>
              <a href="https://www.linkedin.com/in/jhonatan-gomes-b50326301/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <a className="footer-brand" href="#inicio"><NorthStarMark size={25} /> NorthStar <span>· Jhonatan Gomes</span></a>
          <span>Feito com React e intenção.</span>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>
      </div>

      {activeModal && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveModal(null); }}>
          <section className="camp-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
            <button className="modal-close" type="button" onClick={() => setActiveModal(null)} aria-label="Fechar janela"><X size={20} /></button>
            <div className="eyebrow"><span className="rune">ᛉ</span> {modalContent[activeModal].eyebrow}</div>
            <h2 id="modal-title">{modalContent[activeModal].title}</h2>
            <p id="modal-description">{modalContent[activeModal].body}</p>
            <div className="modal-list">
              {modalContent[activeModal].items.map((item) => <div key={item}><span className="modal-bullet">ᚠ</span>{item}</div>)}
            </div>
            {activeModal === 'contact' ? (
              <a className="btn btn-primary" href="mailto:jonnyweb.net@gmail.com" onClick={() => setActiveModal(null)}>Enviar e-mail <ArrowUpRight size={16} /></a>
            ) : (
              <a className="btn btn-ghost" href={`#${activeModal === 'about' ? 'sobre' : activeModal === 'projects' ? 'projetos' : activeModal === 'arsenal' ? 'arsenal' : 'jornada'}`} onClick={() => setActiveModal(null)}>Ver seção completa <ArrowRight size={16} /></a>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
