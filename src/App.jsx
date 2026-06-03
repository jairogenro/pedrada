import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- FRASES DO BARALHO ---
const pedradaPhrases = [
  "Gastou R$ 200 em vela aromática para relaxar. A fonte do seu estresse <span class='accent-text'>TEM CPF</span>.",
  "Salvou 50 receitas saudáveis no Instagram. Pediu o de sempre no <span class='accent-text'>IFOOD</span>.",
  "A conversa que você ensaia no banho já tem três anos de roteiro. Roteirista da sua própria <span class='accent-text'>COVARDIA</span>.",
  "Você não está confuso. Está apenas evitando a clareza porque ela exige que você <span class='accent-text'>PARE DE SE MENTIR</span>.",
  "O que você não está mudando e apenas reclamando, você está <span class='accent-text'>ESCOLHENDO</span>.",
  "Comprou o livro, colocou na estante e virou decoração igual ao seu <span class='accent-text'>PROBLEMA</span>.",
  "Desbloqueou, bloqueou, desbloqueou. A resposta não estava no <span class='accent-text'>PERFIL DELE(A)</span>.",
  "Cuida de todo mundo como se você fosse o <span class='accent-text'>ÚLTIMO DA FILA</span>.",
  "Diz que vai começar a correr. Só corre dos <span class='accent-text'>PROBLEMAS QUE ACUMULA</span>.",
  "Sabe o nome do trauma e usa de desculpa para <span class='accent-text'>NÃO MUDAR NADA</span>.",
  "Ninguém vai aparecer e transformar sua vida. <span class='accent-text'>VOCÊ É A PESSOA</span> que nunca apareceu.",
  "Fazer planos é muito confortável. O problema é que <span class='accent-text'>PLANEJAR NÃO CONTA COMO AGIR</span>.",
  "Você não está sem tempo. Só está gastando duas horas por dia vendo a <span class='accent-text'>VIDA DOS OUTROS</span> no feed.",
  "Renovou a academia. Do compromisso consigo mesmo nem lembra <span class='accent-text'>MAIS A SENHA</span>.",
  "Chora no chuveiro e na vida real finge que <span class='accent-text'>ESTÁ TUDO ÓTIMO</span>.",
  "Diz que 'vai deixar rolar'. É a desculpa perfeita para <span class='accent-text'>NÃO TOMAR UMA DECISÃO</span>.",
  "Você perdoa os outros para não ter que encarar a dor de <span class='accent-text'>EXIGIR RESPEITO</span>.",
  "Fez dieta a semana toda. Comemorou comendo o dobro <span class='accent-text'>NO FINAL DE SEMANA</span>."
];

const pedrinhaReactions = [
  "Olha para o meu olho roxo. Tomei uma pedrada e ainda assim sou mais lúcida que você.",
  "Outra pedrada na sua testa? Pelo menos eu tenho a desculpa de ser de concreto.",
  "Essa doeu até em mim, e eu sou uma pedra de concreto surrada.",
  "Se arrependimento matasse, você já seria poeira mineral agora.",
  "Mais um chacoalhão para você fingir que vai mudar e depois ir dormir.",
  "Olhar para o meu olho roxo é mais fácil do que olhar no espelho, né?",
  "Estou surrada de tanto ver você repetir as mesmas burrices todo santo dia.",
  "Você vai fingir que não ouviu essa? Eu sou de pedra, mas você é de vidro.",
  "A carapuça serviu tão bem que parece sob medida. Quer que eu costure?"
];

// --- TESTIMONIALS DATA ---
const testimonials = [
  {
    name: "Lucas M.",
    role: "Designer Sênior · São Paulo",
    stars: 5,
    quote: "Tirei a carta 'Você não está confuso. Está apenas evitando a clareza.' na segunda-feira de manhã. Chorei. Mandei o projeto que estava 'quase pronto' faz 7 meses. Nota 10.",
    initials: "LM",
    color: "#D4522A"
  },
  {
    name: "Rafaela B.",
    role: "Coach de Vida · Certificada pelo YouTube",
    stars: 5,
    quote: "Recomendo para todos os meus clientes antes de recomendarem os meus serviços. O baralho resolve em 5 minutos o que eu levo 6 sessões pra fingir que resolvo.",
    initials: "RB",
    color: "#8D6E3A"
  },
  {
    name: "Dra. Ana Paula",
    role: "Psicóloga Comportamental",
    stars: 5,
    quote: "Clinicamente, a metodologia apresentada é... tá, é só palavrão e humor. Mas funciona. Meus pacientes largaram o celular. Eu quase larguei minha carreira. 5 estrelas.",
    initials: "AP",
    color: "#5A7A5A"
  },
  {
    name: "Thiago V.",
    role: "Empreendedor em Série · 4 Startups, 4 Pivots",
    stars: 5,
    quote: "Dei de presente pra toda a minha equipe. Na semana seguinte dois pediram demissão e um foi morar no sítio. Nunca tomaram uma decisão tão rápida. Obrigado, PEDRADA.",
    initials: "TV",
    color: "#4A6A8A"
  },
  {
    name: "MARCELO F.",
    role: "Ex-Fã · Muito Arrependido",
    stars: 0,
    quote: "COMPREI ACHANDO QUE ERA UM JOGO DIVERTIDO. A PRIMEIRA CARTA QUE TIREI FOI 'VOCÊ NÃO ESTÁ SEM TEMPO, SÓ GASTA 2H POR DIA VENDO A VIDA DOS OUTROS'. EU DELETEI O INSTAGRAM. CANCELEI A NETFLIX. AGORA SÓ TRABALHO E LEIO. ESTOU DESTRUÍDO. NOTA ZERO. PRODUTO HORRÍVEL. COMPREM.",
    initials: "!!",
    color: "#C0392B",
    isRage: true
  }
];

// --- DECORATIVE FLOATING STONES BACKGROUND COMPONENT ---
function FloatingStones({ count = 6 }) {
  const stones = [
    { left: '8%', size: 32, delay: '-2s', duration: '26s', type: 0 },
    { left: '26%', size: 22, delay: '-7s', duration: '31s', type: 1 },
    { left: '43%', size: 40, delay: '-14s', duration: '23s', type: 2 },
    { left: '60%', size: 28, delay: '-10s', duration: '29s', type: 0 },
    { left: '76%', size: 20, delay: '-4s', duration: '33s', type: 1 },
    { left: '90%', size: 36, delay: '-18s', duration: '25s', type: 2 }
  ].slice(0, count);

  return (
    <div className="bg-floating-stones" aria-hidden="true">
      {stones.map((stone, idx) => (
        <div
          key={idx}
          className="floating-stone"
          style={{
            left: stone.left,
            width: `${stone.size}px`,
            height: `${stone.size}px`,
            animationDelay: stone.delay,
            animationDuration: stone.duration,
          }}
        >
          {stone.type === 0 && (
            <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 15,35 C 10,25 25,10 40,15 C 50,20 48,35 40,40 C 30,45 20,45 15,35 Z" fill="rgba(141, 134, 117, 0.06)" stroke="rgba(74, 69, 58, 0.08)" strokeWidth="2" strokeLinejoin="round" />
              <path d="M 22,20 Q 30,17 38,22" stroke="rgba(74, 69, 58, 0.06)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          )}
          {stone.type === 1 && (
            <svg viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 10,25 C 8,15 22,8 35,12 C 42,15 42,28 35,32 C 28,35 12,32 10,25 Z" fill="rgba(165, 158, 144, 0.05)" stroke="rgba(74, 69, 58, 0.08)" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          )}
          {stone.type === 2 && (
            <svg viewBox="0 0 55 45" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 12,28 C 10,15 28,10 42,18 C 48,22 45,35 38,38 C 28,42 15,38 12,28 Z" fill="rgba(157, 150, 136, 0.06)" stroke="rgba(74, 69, 58, 0.08)" strokeWidth="2" strokeLinejoin="round" />
              <path d="M 22,22 L 28,28 M 28,22 L 22,28" stroke="rgba(74, 69, 58, 0.08)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

// --- MAIN APPLICATION ---
export default function App() {

  // Thrown Card States
  const [phrase, setPhrase] = useState("Gastou R$ 200 em vela aromática para relaxar. A fonte do seu estresse <span class='accent-text'>TEM CPF</span>.");
  const [reaction, setReaction] = useState("Clique no baralho de cartas abaixo para levar a sua primeira pedrada realista.");
  const [mascotPose, setMascotPose] = useState("/img/mascot_pedrinha.png");
  const [isThrownAnimating, setIsThrownAnimating] = useState(false);
  const [tremorActive, setTremorActive] = useState(false);
  const [cardsDrawnCount, setCardsDrawnCount] = useState(0);

  // Growing waitlist counter (muito maior e crescendo mais rápido)
  const [waitlistCount, setWaitlistCount] = useState(147382);
  useEffect(() => {
    const interval = setInterval(() => {
      setWaitlistCount(prev => prev + Math.floor(Math.random() * 9) + 6);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Testimonials carousel state + auto-advance
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const goTestimonial = (index) => {
    setActiveTestimonial(index);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(i => i === 0 ? testimonials.length - 1 : i - 1);
  };

  const nextTestimonial = () => {
    setActiveTestimonial(i => (i + 1) % testimonials.length);
  };

  // Auto-advance carousel a cada 4.5s, com pausa maior no rage card (7s)
  useEffect(() => {
    const t = testimonials[activeTestimonial];
    const delay = t?.isRage ? 7000 : 4500;
    const timer = setTimeout(() => {
      setActiveTestimonial(i => (i + 1) % testimonials.length);
    }, delay);
    return () => clearTimeout(timer);
  }, [activeTestimonial]);

  // Scroll Phase States for Peeking Mascot: 'hero' | 'drawer' | 'proof' | 'features' | 'kit' | 'waitlist'
  const [scrollPhase, setScrollPhase] = useState('hero');

  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Success state
  const [inlineSuccess, setInlineSuccess] = useState(false);

  // Mascot pose in inline form
  const [inlineMascotPose, setInlineMascotPose] = useState("/img/mascot_pedrinha_2d.png");

  // Dragging states and refs
  const cardRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  // History tracking to guarantee uniqueness
  const phraseHistoryRef = useRef([]);
  const reactionHistoryRef = useRef([]);



  // GSAP SCROLL TRIGGERS & REVEALS
  useGSAP(() => {
    // 1. Smooth Scroll Reveals for sections
    const reveals = gsap.utils.toArray('.reveal-on-scroll');
    reveals.forEach(sec => {
      gsap.fromTo(sec, 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // 2. Mascot Scroll Peeking triggers
    ScrollTrigger.create({
      trigger: ".hero-section",
      start: "top top",
      end: "bottom center",
      onEnter: () => setScrollPhase('hero'),
      onEnterBack: () => setScrollPhase('hero')
    });

    ScrollTrigger.create({
      trigger: ".drawer-section",
      start: "top center",
      end: "bottom center",
      onEnter: () => setScrollPhase('drawer'),
      onEnterBack: () => setScrollPhase('drawer')
    });

    ScrollTrigger.create({
      trigger: ".testimonials-section",
      start: "top center",
      end: "bottom center",
      onEnter: () => setScrollPhase('proof'),
      onEnterBack: () => setScrollPhase('proof')
    });

    ScrollTrigger.create({
      trigger: ".features-section",
      start: "top center",
      end: "bottom center",
      onEnter: () => setScrollPhase('features'),
      onEnterBack: () => setScrollPhase('features')
    });

    ScrollTrigger.create({
      trigger: ".details-section",
      start: "top center",
      end: "bottom center",
      onEnter: () => setScrollPhase('kit'),
      onEnterBack: () => setScrollPhase('kit')
    });

    ScrollTrigger.create({
      trigger: ".waitlist-inline-section",
      start: "top center",
      end: "bottom bottom",
      onEnter: () => setScrollPhase('waitlist'),
      onEnterBack: () => setScrollPhase('waitlist')
    });

    // 3. Peeking Mascot Entrance transition (triggers immediately when starting to scroll down)
    gsap.fromTo(".peeking-mascot-container",
      { y: 160, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.3)",
        scrollTrigger: {
          trigger: "body",
          start: "top -50px",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 4. Hero cards fan animation on load
    gsap.fromTo(".fan-card-1", { rotation: 0, x: 0 }, { rotation: -24, x: -90, duration: 1.2, delay: 0.2, ease: "power3.out" });
    gsap.fromTo(".fan-card-2", { rotation: 0, x: 0 }, { rotation: -10, x: -35, duration: 1.2, delay: 0.2, ease: "power3.out" });
    gsap.fromTo(".fan-card-3", { rotation: 0, x: 0 }, { rotation: 10, x: 35, duration: 1.2, delay: 0.2, ease: "power3.out" });
    gsap.fromTo(".fan-card-4", { rotation: 0, x: 0 }, { rotation: 24, x: 90, duration: 1.2, delay: 0.2, ease: "power3.out" });
  }, []);

  // Mascot dynamic pose change animations
  useEffect(() => {
    if (mascotPose) {
      gsap.fromTo(".drawer-mascot-img", 
        { scale: 0.75, rotation: -8 },
        { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)" }
      );
    }
  }, [mascotPose]);

  useEffect(() => {
    if (inlineMascotPose) {
      gsap.fromTo(".waitlist-inline-mascot", 
        { scale: 0.75, rotation: 8 },
        { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)" }
      );
    }
  }, [inlineMascotPose]);



  useEffect(() => {
    if (scrollPhase) {
      gsap.fromTo(".peeking-mascot-img", 
        { scale: 0.7, y: 30 },
        { scale: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" }
      );
    }
  }, [scrollPhase]);

  const getUniqueRandom = (array, historyRef) => {
    if (historyRef.current.length >= array.length - 2) {
      historyRef.current = [];
    }
    let choice;
    do {
      choice = array[Math.floor(Math.random() * array.length)];
    } while (historyRef.current.includes(choice));
    
    historyRef.current.push(choice);
    return choice;
  };

  // Click & button draw action: animate card flying out and coming back elastically
  const triggerThrowAndDraw = () => {
    if (isThrownAnimating) return;
    setIsThrownAnimating(true);

    // Randomize throw target coordinates & rotation to make it feel organic and chaotic
    const isLeft = Math.random() > 0.5;
    const isTop = Math.random() > 0.5;
    const throwX = (isLeft ? -1 : 1) * (400 + Math.random() * 200);
    const throwY = (isTop ? -1 : 1) * (200 + Math.random() * 200);
    const throwRot = (isLeft ? -1 : 1) * (30 + Math.random() * 40);

    gsap.to(cardRef.current, {
      x: throwX,
      y: throwY,
      rotation: throwRot,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        const newPhrase = getUniqueRandom(pedradaPhrases, phraseHistoryRef);
        
        setPhrase(newPhrase);
        setCardsDrawnCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 3) {
            setReaction("Sentiu o impacto? As outras 87 cartas são ainda mais brutais no papel físico. Garanta sua vaga com 20% OFF.");
          } else {
            const newReaction = getUniqueRandom(pedrinhaReactions, reactionHistoryRef);
            setReaction(newReaction);
          }
          return newCount;
        });
        setMascotPose("/img/mascot_pedrinha_judging.png");

        // Reset and throw back in elastically
        gsap.set(cardRef.current, {
          x: 0,
          y: 400,
          scale: 0.1,
          rotation: -25,
          opacity: 0
        });

        // Tremor effect on impact
        setTremorActive(true);
        setTimeout(() => {
          setTremorActive(false);
        }, 220);

        gsap.to(cardRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.42,
          ease: "back.out(1.5)",
          onComplete: () => {
            setIsThrownAnimating(false);
          }
        });
      }
    });
  };

  // Pointer drag/swipe mechanics
  const handlePointerDown = (e) => {
    if (isThrownAnimating) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    gsap.set(cardRef.current, {
      x: dx,
      y: dy,
      rotation: dx * 0.05
    });
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 5) {
      // Small movement is considered a tap/click
      triggerThrowAndDraw();
    } else if (distance > 100) {
      // Clear/Throw card out of screen
      setIsThrownAnimating(true);
      const angle = Math.atan2(dy, dx);
      const throwX = Math.cos(angle) * 600;
      const throwY = Math.sin(angle) * 600;

      gsap.to(cardRef.current, {
        x: throwX,
        y: throwY,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          const newPhrase = getUniqueRandom(pedradaPhrases, phraseHistoryRef);

          setPhrase(newPhrase);
          setCardsDrawnCount(prev => {
            const newCount = prev + 1;
            if (newCount >= 3) {
              setReaction("Sentiu o impacto? As outras 87 cartas são ainda mais brutais no papel físico. Garanta sua vaga com 20% OFF.");
            } else {
              const newReaction = getUniqueRandom(pedrinhaReactions, reactionHistoryRef);
              setReaction(newReaction);
            }
            return newCount;
          });
          setMascotPose("/img/mascot_pedrinha_judging.png");

          // Reset and throw back in elastically
          gsap.set(cardRef.current, {
            x: 0,
            y: 400,
            scale: 0.1,
            rotation: -25,
            opacity: 0
          });

          setTremorActive(true);
          setTimeout(() => {
            setTremorActive(false);
          }, 220);

          gsap.to(cardRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.42,
            ease: "back.out(1.5)",
            onComplete: () => {
              setIsThrownAnimating(false);
            }
          });
        }
      });
    } else {
      // Snap/Rebound elastically back to deck
      gsap.to(cardRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.6)"
      });
    }
  };

  const scrollToCadastro = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById("cadastro-secao");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const nameInput = document.getElementById("inline-name");
      if (nameInput) nameInput.focus();
    }
  };

  const handleInlineSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setInlineSuccess(true);
      setInlineMascotPose("/img/mascot_pedrinha_victory.png");
    }, 1000);
  };

  // React dynamic mascot peeking states based on scroll position
  const getPeekingData = () => {
    switch (scrollPhase) {
      case 'hero':
        return {
          pose: '/img/mascot_pedrinha_2d.png',
          bubble: 'Oi! Este é o seu "tratamento" de 90 dias de autoconhecimento. Preparado?'
        };
      case 'drawer':
        return {
          pose: '/img/mascot_pedrinha_scrolling.png',
          bubble: 'Cada uma das 90 cartas virtuais é um espelho para seu autoconhecimento. Arraste uma!'
        };
      case 'proof':
        return {
          pose: '/img/mascot_pedrinha_victory.png',
          bubble: 'Rir e aprender com as próprias falhas é o melhor gatilho para incentivar a terapia.'
        };
      case 'features':
        return {
          pose: '/img/mascot_pedrinha_judging.png',
          bubble: 'Estes 90 dias servem para você se conhecer melhor e despertar o interesse por ajuda profissional.'
        };
      case 'kit':
        return {
          pose: '/img/mascot_pedrinha_victory.png',
          bubble: 'O kit físico é perfeito para presentear quem precisa de um empurrãozinho sincero.'
        };
      case 'waitlist':
      default:
        return {
          pose: '/img/mascot_pedrinha_scrolling.png',
          bubble: 'Garanta sua vaga para iniciar sua jornada de 90 dias de autoconhecimento.'
        };
    }
  };

  const peekingData = getPeekingData();

  return (
    <div className="app-root-container">

      {/* Header bar */}
      <header className="main-header">
        <div className="container header-container">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="logo-text" style={{ textDecoration: 'none' }}>
            <span>PEDRADA 🪨</span>
          </a>
          <nav className="nav-links-center">
            <a href="#gerador-card" className="nav-link">Tirar Carta</a>
            <a href="#depoimentos" className="nav-link">Depoimentos</a>
            <a href="#beneficios" className="nav-link">Benefícios</a>
            <a href="#kit" className="nav-link">O Kit</a>
          </nav>
          <div className="header-actions">
            <button className="cta-button-nav" onClick={scrollToCadastro}>Garantir Baralho</button>
          </div>
        </div>
      </header>

      {/* Main Content Layout for SEO Semantics */}
      <main>
        {/* Section 1: Hero Section */}
        <section className="hero-section">
          <FloatingStones count={6} />
          <div className="container hero-container-centered">
            <div className="hero-content-centered">
              <h1 className="hero-title-centered">Aprenda com sua própria <span className="accent-text">autossabotagem.</span></h1>
              
              <p className="hero-subtitle-centered">
                Um "tratamento" de 90 dias focado em autoconhecimento e ação. 90 cartas táteis projetadas não apenas para você rir, mas para aprender com cada procrastinação e incentivar a busca por terapia ou acompanhamento profissional.
              </p>
              <div className="hero-actions-centered">
                <button className="cta-button-primary" onClick={scrollToCadastro}>Garantir Meu Baralho 🪨</button>
                <a href="#gerador-card" className="cta-button-secondary">Tirar uma Carta ↓</a>
              </div>
              <div className="hero-trust">
                <p className="hero-counter">🪨 <strong>{waitlistCount.toLocaleString('pt-BR')}</strong> pessoas apedrejadas*</p>
              </div>
            </div>
            
            {/* Centered Box Mockup with cards fanning out behind it */}
            <div className="hero-product-fan-container">
              <div className="hero-radial-glow"></div>
              <div className="hero-cards-fan">
                {/* Fan background cards */}
                <div className="fan-card fan-card-1">
                  <div className="fan-card-inner">
                    <p>A fonte do seu estresse <strong>TEM CPF</strong></p>
                    
                    {/* Small stack of stones on fan card */}
                    <div className="fan-stone-pile">
                      <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M 18,52 C 18,44 32,44 36,52 Z" fill="#938C80" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 64,52 C 64,44 78,44 82,52 Z" fill="#8A8378" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 32,54 C 32,43 68,43 68,54 Z" fill="#9C9589" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 24,45 C 24,35 48,35 48,45 Z" fill="#A59E92" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 52,45 C 52,35 76,35 76,45 Z" fill="#B0A99C" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 38,33 C 38,20 62,20 62,33 Z" fill="#A0998E" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="fan-card fan-card-2">
                  <div className="fan-card-inner">
                    <p>Pediu o de sempre no <strong>IFOOD</strong></p>
                    
                    <div className="fan-stone-pile">
                      <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M 18,52 C 18,44 32,44 36,52 Z" fill="#938C80" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 64,52 C 64,44 78,44 82,52 Z" fill="#8A8378" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 32,54 C 32,43 68,43 68,54 Z" fill="#9C9589" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 24,45 C 24,35 48,35 48,45 Z" fill="#A59E92" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 52,45 C 52,35 76,35 76,45 Z" fill="#B0A99C" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 38,33 C 38,20 62,20 62,33 Z" fill="#A0998E" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="fan-card fan-card-3">
                  <div className="fan-card-inner">
                    <p>Planejar não conta como <strong>AGIR</strong></p>
                    
                    <div className="fan-stone-pile">
                      <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M 18,52 C 18,44 32,44 36,52 Z" fill="#938C80" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 64,52 C 64,44 78,44 82,52 Z" fill="#8A8378" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 32,54 C 32,43 68,43 68,54 Z" fill="#9C9589" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 24,45 C 24,35 48,35 48,45 Z" fill="#A59E92" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 52,45 C 52,35 76,35 76,45 Z" fill="#B0A99C" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 38,33 C 38,20 62,20 62,33 Z" fill="#A0998E" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="fan-card fan-card-4">
                  <div className="fan-card-inner">
                    <p>Roteirista da sua <strong>COVARDIA</strong></p>
                    
                    <div className="fan-stone-pile">
                      <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M 18,52 C 18,44 32,44 36,52 Z" fill="#938C80" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 64,52 C 64,44 78,44 82,52 Z" fill="#8A8378" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 32,54 C 32,43 68,43 68,54 Z" fill="#9C9589" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 24,45 C 24,35 48,35 48,45 Z" fill="#A59E92" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 52,45 C 52,35 76,35 76,45 Z" fill="#B0A99C" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 38,33 C 38,20 62,20 62,33 Z" fill="#A0998E" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Real product cards photo — replaces dark placeholder box */}
                <img 
                  src="/img/cards_mockup_real.png" 
                  alt="Cartas do baralho PEDRADA sobre mesa de madeira, mostrando frente e verso com a Pedrinha 2D." 
                  className="hero-box-image" 
                  fetchPriority="high"
                  decoding="sync"
                  width="250"
                  height="344"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Card Drawer */}
        <section className="drawer-section reveal-on-scroll" id="gerador-card">
          <div className="container">
            <h2 className="section-title">Teste o Seu Limiar de Dor</h2>
            <p className="section-subtitle">
              Clique no baralho ou arraste a carta. Cada uma é uma verdade que você sabia, mas fingia não saber.
            </p>

            <div className="drawer-interface-grid">
              {/* Thrown card simulation (now on the left) */}
              <div className="drawer-interactive-col">
                <div className="thrown-card-wrapper">
                  <div 
                    ref={cardRef}
                    className="thrown-card-front" 
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    style={{ touchAction: 'none' }}
                  >
                    <div className="card-inner-border">
                      <div className="card-text-content" dangerouslySetInnerHTML={{ __html: phrase }} />
                      
                      {/* Triangular Stack of 6 stones matching user image front card */}
                      <div className="card-stone-pile">
                        <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          {/* Row 1 (Bottom) */}
                          <path d="M 18,52 C 18,44 32,44 36,52 Z" fill="#938C80" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                          <path d="M 64,52 C 64,44 78,44 82,52 Z" fill="#8A8378" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                          <path d="M 32,54 C 32,43 68,43 68,54 Z" fill="#9C9589" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                          
                          {/* Row 2 (Middle) */}
                          <path d="M 24,45 C 24,35 48,35 48,45 Z" fill="#A59E92" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                          <path d="M 52,45 C 52,35 76,35 76,45 Z" fill="#B0A99C" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                          
                          {/* Row 3 (Top) */}
                          <path d="M 38,33 C 38,20 62,20 62,33 Z" fill="#A0998E" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      
                      <div className="card-brand-footer">PEDRADA</div>
                    </div>
                  </div>
                </div>

                {/* Stack visual cards (repeating pattern in CSS) */}
                <div className={`virtual-card-deck-stack ${tremorActive ? 'tremor-active' : ''}`} onClick={triggerThrowAndDraw}>
                  <div className="deck-shadow-card-1"></div>
                  <div className="deck-shadow-card-2"></div>
                  <div className="deck-primary-card-back">
                    <span className="deck-back-logo">P</span>
                    <span className="deck-back-hint">Tirar Carta 🪨</span>
                  </div>
                </div>

                <button 
                  className="cta-button-primary" 
                  onClick={triggerThrowAndDraw}
                  disabled={isThrownAnimating}
                >
                  {isThrownAnimating ? "Toma! 🪨" : "Levar Pedrada! 🪨"}
                </button>
              </div>

              {/* Mascot reaction bubble (now on the right) */}
              <div className="drawer-mascot-col">
                <div className="drawer-speech-bubble">
                  <p>"{reaction}"</p>
                  {cardsDrawnCount >= 3 && (
                    <button className="bubble-cta-btn" onClick={scrollToCadastro}>
                      Garantir Vaga com 20% OFF 🪨
                    </button>
                  )}
                </div>
                <img 
                  src={mascotPose} 
                  alt="" 
                  aria-hidden="true"
                  className="drawer-mascot-img"
                  width="160"
                  height="160"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3b: Testimonials Carousel */}
        <section className="testimonials-section reveal-on-scroll" id="depoimentos">
          <FloatingStones count={5} />
          <div className="container">
            <h2 className="section-title">Quem já tomou a pedrada avisa</h2>
            <p className="section-subtitle">Não é autoajuda. É um espelho com senso de humor.</p>

            <div className="tcarousel-wrap">
              {/* Prev arrow */}
              <button className="tarrow tarrow-prev" onClick={prevTestimonial} aria-label="Depoimento anterior">‹</button>

              <div className="tgrid">
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className={`tcard${i === activeTestimonial ? ' tcard-active' : ''}${t.isRage ? ' tcard-rage' : ''}`}
                    style={{ '--avatar-color': t.color }}
                  >
                    <div className="tcard-avatar">
                      <span>{t.initials}</span>
                    </div>
                    <div className="tcard-body">
                      <div className="tcard-stars">
                        {t.stars > 0
                          ? '★'.repeat(t.stars)
                          : <span className="tcard-stars-zero">☆☆☆☆☆ (0 estrelas)</span>
                        }
                      </div>
                      <p className="tcard-quote">"{t.quote}"</p>
                      <div className="tcard-author">
                        <strong>{t.name}</strong>
                        <span>{t.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Next arrow */}
              <button className="tarrow tarrow-next" onClick={nextTestimonial} aria-label="Próximo depoimento">›</button>
            </div>

            {/* Dots */}
            <div className="tcarousel-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`tdot${i === activeTestimonial ? ' tdot-active' : ''}`}
                  onClick={() => goTestimonial(i)}
                  aria-label={`Depoimento ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Benefits Grid */}
        <section className="features-section reveal-on-scroll" id="beneficios">
          <FloatingStones count={4} />
          <div className="container">
            <h2 className="section-title">Como funcionam as suas 90 pedradas diárias?</h2>
            <p className="section-subtitle">Um "tratamento" de 90 dias focado em autoconhecimento. O objetivo não é apenas rir, mas aprender com as falhas e buscar ajuda profissional.</p>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon" aria-hidden="true">🎯</div>
                <h3>90 Dias de Autoconhecimento</h3>
                <p>Cada uma das 90 cartas é um espelho. Este "tratamento" contínuo foi desenhado para mapear sua procrastinação e despertar o interesse em acompanhamento psicológico ou terapia profissional.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon" aria-hidden="true">📆</div>
                <h3>Foco no Aprendizado Sincero</h3>
                <p>Você vai rir das suas desculpas, mas o foco é aprender com elas. E se ao fim de 90 dias você continuar se autossabotando, pelo menos deu boas risadas com as cartas.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon" aria-hidden="true">🎁</div>
                <h3>O Presente Perfeito</h3>
                <p>Sabe aquele amigo procrastinador de estimação ou familiar que vive reclamando da inércia, mas não age? O baralho PEDRADA é o empurrãozinho perfeito para incentivá-lo a amadurecer.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Product Specifications */}
        <section className="details-section reveal-on-scroll" id="kit">
          <FloatingStones count={4} />
          <div className="container details-container">
            <div className="details-media">
              <img 
                src="/img/cards_mockup_real.png" 
                alt="Várias cartas do baralho PEDRADA espalhadas, mostrando o fundo creme e textos em destaque coral." 
                loading="lazy" 
                className="details-image" 
                width="450"
                height="300"
              />
            </div>
            <div className="details-content">
              <h2 className="section-title">O que vem no seu kit?</h2>
              <p>Uma ferramenta prática de autoconhecimento disfarçada de baralho.</p>
              <ul className="details-list">
                <li><strong>90 Cartas de Impacto:</strong> Frases cruas e ácidas com destaque em coral no fundo creme.</li>
                <li><strong>Display da Pedrinha:</strong> Um totem montável da mascote para decorar a sua mesa de trabalho.</li>
                <li><strong>Estojo Rígido de Pedra:</strong> Embalagem premium com encaixe magnético imitando textura rochosa.</li>
                <li><strong>Coleção de Adesivos:</strong> Selos irônicos para colar no notebook e rir com os colegas de escritório.</li>
              </ul>
              <button className="cta-button-primary" onClick={scrollToCadastro}>Garantir Lote de Lançamento</button>
            </div>
          </div>
        </section>

        {/* Section 6: Inline Waitlist Form (with mascot reactions) */}
        <section className="waitlist-inline-section reveal-on-scroll" id="cadastro-secao">
          <div className="container waitlist-inline-container">
            <div className="waitlist-card-wrapper">
              <div className="waitlist-mascot-container">
                <img 
                  src={inlineMascotPose} 
                  alt="" 
                  aria-hidden="true"
                  className="waitlist-inline-mascot"
                  width="140"
                  height="140"
                />
                <div className="waitlist-speech-bubble">
                  <p>
                    {inlineSuccess 
                      ? "Sucesso! Agora você está na minha mira. Volte a procrastinar." 
                      : "Coloque seu nome e e-mail ao lado. Eu prometo cobrar você do lançamento!"
                    }
                  </p>
                </div>
              </div>

              <div className="waitlist-form-container">
                <h2 className="waitlist-title">Entre na Lista de Lançamento</h2>
                <p className="waitlist-desc">
                  O primeiro lote físico de <strong>PEDRADA</strong> está em produção. 
                  Deixe seus contatos abaixo para garantir o seu baralho com 20% de desconto e dar início ao seu "tratamento" de 90 dias de autoconhecimento.
                </p>

                {!inlineSuccess ? (
                  <form 
                    onSubmit={handleInlineSubmit} 
                    className="waitlist-inline-form"
                    onMouseEnter={() => setInlineMascotPose("/img/mascot_pedrinha_scrolling.png")}
                    onMouseLeave={() => setInlineMascotPose("/img/mascot_pedrinha_2d.png")}
                  >
                    <div className="inline-form-group">
                      <label htmlFor="inline-name" className="sr-only">Seu nome</label>
                      <input 
                        id="inline-name"
                        type="text" 
                        required 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        placeholder="Seu nome"
                        onFocus={() => setInlineMascotPose("/img/mascot_pedrinha_scrolling.png")}
                        onBlur={() => setInlineMascotPose("/img/mascot_pedrinha_2d.png")}
                      />
                    </div>
                    <div className="inline-form-group">
                      <label htmlFor="inline-email" className="sr-only">Endereço de e-mail</label>
                      <input 
                        id="inline-email"
                        type="email" 
                        required 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        placeholder="seu@email.com"
                        onFocus={() => setInlineMascotPose("/img/mascot_pedrinha_judging.png")}
                        onBlur={() => setInlineMascotPose("/img/mascot_pedrinha_2d.png")}
                      />
                    </div>
                    <button type="submit" className="submit-button" disabled={submitting}>
                      {submitting ? 'Registrando...' : 'Quero Minha Pedrada 🪨'}
                    </button>
                  </form>
                ) : (
                  <div className="inline-success-box">
                    <div className="success-icon">✓</div>
                    <h3>Tudo certo, {name}!</h3>
                    <p>Tudo certo! Você entrou na lista de lançamento. Te enviaremos o cupom de 20% assim que o lote for liberado!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé Legal */}
      <footer className="main-footer">
        <div className="container footer-container">
          <p>&copy; 2026 PEDRADA. Todos os direitos reservados. Feito com lucidez e zero paciência.</p>
          <div className="footer-links">
            <a href="#" onClick={(e) => { e.preventDefault(); }}>Termos</a>
            <a href="#" onClick={(e) => { e.preventDefault(); }}>Privacidade</a>
          </div>
        </div>
        <div className="container">
          <p className="footer-disclaimer">* Os depoimentos acima são obviamente fictícios e absurdos por design. Se você ficou ofendido, é sinal claro que precisa urgentemente de uma pedrada. Os números de pessoas na fila também são completamente inventados. A vergonha que você sentiu ao se reconhecer nas cartas, essa sim, é muito real.</p>
        </div>
      </footer>

      {/* SCROLL-REACTIVE PEEKING MASCOT (FIXED SIDE WIDGET) */}
      <div className="peeking-mascot-container" onClick={scrollToCadastro}>
        <div className="peeking-bubble" key={scrollPhase}>
          <div className="peeking-bubble-label">Pedrinha diz:</div>
          <p>{peekingData.bubble}</p>
          <div className="peeking-bubble-cta">Garantir baralho →</div>
        </div>
        <div className="peeking-mascot-wrap">
          <img 
            src={peekingData.pose} 
            alt="" 
            aria-hidden="true"
            className="peeking-mascot-img"
            width="90"
            height="90"
          />
          <div className="peeking-ping"></div>
        </div>
      </div>
    </div>
  );
}
