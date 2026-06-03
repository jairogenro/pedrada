import { useState, useEffect, useRef } from 'react';
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
    quote: "Tirei a carta 'Você não está confuso. Está apenas evitando a clareza.' na segunda-feira de manhã. Chorei. Enviei para o cliente o projeto que estava 'quase pronto' fazia 7 meses. Nota 10.",
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
    { size: 75, type: 0 },
    { size: 52, type: 1 },
    { size: 90, type: 2 },
    { size: 62, type: 0 },
    { size: 45, type: 1 },
    { size: 82, type: 2 }
  ].slice(0, count);

  return (
    <div className="bg-floating-stones" aria-hidden="true">
      {stones.map((stone, idx) => {
        // Deterministic speeds and delays to prevent reset and flickering on parent re-renders:
        // Durations: slower and randomized between 6.0s and 11.0s
        const duration = 6.0 + ((idx * 7) % 10) * 0.5;
        // Negative delays to scatter their starting phase organically
        const delay = -2.0 - ((idx * 11) % 8) * 1.5;
        return (
          <div
            key={idx}
            className={`floating-stone bg-throw-${stone.type}`}
            style={{
              width: `${stone.size}px`,
              height: `${stone.size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            {stone.type === 0 && (
              <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 12,25 C 10,12 28,12 48,15 C 52,22 50,38 38,42 C 22,45 14,35 12,25 Z" fill="rgba(147, 140, 128, 0.25)" stroke="rgba(58, 52, 43, 0.35)" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 18,22 Q 22,18 32,20" stroke="rgba(58, 52, 43, 0.25)" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            )}
            {stone.type === 1 && (
              <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 10,22 C 8,14 26,6 46,12 C 54,20 48,38 34,42 C 20,44 12,32 10,22 Z" fill="rgba(138, 131, 120, 0.22)" stroke="rgba(58, 52, 43, 0.35)" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 22,25 Q 34,22 42,28" stroke="rgba(58, 52, 43, 0.25)" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            )}
            {stone.type === 2 && (
              <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 15,28 C 12,15 28,10 45,18 C 50,22 46,38 35,40 C 22,42 16,36 15,28 Z" fill="rgba(156, 149, 137, 0.25)" stroke="rgba(58, 52, 43, 0.35)" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 24,20 L 30,26 M 30,20 L 24,26" stroke="rgba(58, 52, 43, 0.28)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}

// --- SHOWER STONE INDIVIDUAL ELEMENT (GSAP ANIMATED PARABOLA) ---
function ShowerStone({ stone, onComplete }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Randomize trajectory direction and arc
    const startFromLeft = Math.random() > 0.5;
    const startX = startFromLeft ? -120 : window.innerWidth + 120;
    // Starting height is highly randomized (from 35% to 90% of screen height)
    const startY = window.innerHeight * (0.35 + Math.random() * 0.55);

    // horizontal distance it covers (can cross and exit completely to the opposite side of the screen)
    const driftDist = window.innerWidth * (0.5 + Math.random() * 0.8);
    const targetX = startFromLeft ? startX + driftDist : startX - driftDist;

    // Peak height of parabola (reaches upper 15% to 45% of screen, making the apex fully visible)
    const peakY = window.innerHeight * (0.15 + Math.random() * 0.3);
    const finalY = window.innerHeight + 120; // below screen

    const duration = 1.0 + Math.random() * 1.0; // Slower, more physical throw: 1.0s to 2.0s duration
    
    // Highly randomized peak timing ratio to make the apex location asymmetric and organic
    const peakRatio = 0.15 + Math.random() * 0.45; // Peak lands between 15% and 60% of the drift path
    const peakTime = duration * peakRatio;
    const fallTime = duration * (1 - peakRatio);
    
    const rotation = (startFromLeft ? 1 : -1) * (360 + Math.random() * 540);

    // Initial position
    gsap.set(node, { x: startX, y: startY, rotation: 0, scale: 0.7 });

    // Horizontal linear or slight ease out
    gsap.to(node, {
      x: targetX,
      rotation: rotation,
      scale: 1,
      duration: duration,
      ease: "power1.out"
    });

    // Vertical parabolic ease: up and down
    gsap.to(node, {
      y: peakY,
      duration: peakTime,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(node, {
          y: finalY,
          duration: fallTime,
          ease: "power2.in",
          onComplete: () => {
            onComplete(stone.id);
          }
        });
      }
    });
  }, [stone.id, onComplete]);

  return (
    <div
      ref={ref}
      className="shower-stone"
      style={{
        position: 'fixed',
        width: `${stone.size}px`,
        height: `${stone.size}px`,
        pointerEvents: 'none',
        zIndex: 9999,
        left: 0,
        top: 0
      }}
    >
      {stone.type === 0 && (
        <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 12,25 C 10,12 28,12 48,15 C 52,22 50,38 38,42 C 22,45 14,35 12,25 Z" fill="#D3CDC2" stroke="#3A342B" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 18,22 Q 22,18 32,20" stroke="#3A342B" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      )}
      {stone.type === 1 && (
        <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10,22 C 8,14 26,6 46,12 C 54,20 48,38 34,42 C 20,44 12,32 10,22 Z" fill="#C6C0B4" stroke="#3A342B" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 22,25 Q 34,22 42,28" stroke="#3A342B" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      )}
      {stone.type === 2 && (
        <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 15,28 C 12,15 28,10 45,18 C 50,22 46,38 35,40 C 22,42 16,36 15,28 Z" fill="#DFD8CD" stroke="#3A342B" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 24,20 L 30,26 M 30,20 L 24,26" stroke="#3A342B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}

// --- VIEWPORT SHOWER STONES CONTAINER ---
function ViewportShowerStones({ stones, onRemove }) {
  return (
    <div className="viewport-shower-container" aria-hidden="true">
      {stones.map(stone => (
        <ShowerStone 
          key={stone.id} 
          stone={stone} 
          onComplete={onRemove} 
        />
      ))}
    </div>
  );
}

// --- FAQ DATA ---
const faqData = [
  {
    q: "Isso substitui terapia? Posso cancelar minha psicóloga?",
    a: "<strong>De jeito nenhum.</strong> O PEDRADA é um chacoalhão de humor ácido para rir da própria procrastinação e encarar a realidade de forma irônica, não um tratamento clínico ou substituto para terapia. Ele serve como divertimento e faísca de realidade, não como diagnóstico ou terapia profissional."
  },
  {
    q: "Se eu me sentir muito ofendido por uma carta, posso processar vocês?",
    a: "Poder, você pode tudo. Mas o nosso departamento jurídico é formado por pessoas que já tomaram três pedradas e estão sem paciência. Se a carapuça serviu e você se reconheceu na carta, a culpa é da sua rotina, não do papel. Respire fundo e comece a agir."
  },
  {
    q: "Por que eu pagaria por isso se posso me boicotar de graça?",
    a: "Porque de graça você não tem o prazer tátil de segurar o seu próprio fracasso impresso em papel premium 350g com acabamento texturizado. Além disso, colocar o totem da Pedrinha na sua mesa é um lembrete visual diário de que ficar empurrando com a barriga custa caro."
  },
  {
    q: "Qual o prazo de entrega? Vai demorar igual aos meus projetos pendentes?",
    a: "Não, nós realmente entregamos. Assim que o lote de pré-venda for liberado, os envios serão feitos em até 5 dias úteis com código de rastreamento enviado por e-mail. Você poderá rastrear o pacote enquanto procrastina no feed do Instagram."
  },
  {
    q: "Posso dar de presente para um amigo procrastinador ou para o meu ex?",
    a: "Com certeza. É o presente ideal para aquele colega que está 'montando um plano de negócios' há 3 anos ou para a amiga que compra planner e só usa a folha de adesivos. Apenas entregue e saia correndo antes que leiam a primeira carta."
  }
];

// --- MAIN APPLICATION ---
export default function App() {

  // Thrown Card States
  const [phrase, setPhrase] = useState("Gastou R$ 200 em vela aromática para relaxar. A fonte do seu estresse <span class='accent-text'>TEM CPF</span>.");
  const [navOpen, setNavOpen] = useState(false);
  const [menuHasOpened, setMenuHasOpened] = useState(false);
  const [reaction, setReaction] = useState("Clica no baralho aí. Garanto que vai doer menos que ver a vida alheia no Instagram.");
  const [mascotPose, setMascotPose] = useState("/img/mascot_pedrinha.png");
  const [isThrownAnimating, setIsThrownAnimating] = useState(false);
  const [tremorActive, setTremorActive] = useState(false);
  const [cardsDrawnCount, setCardsDrawnCount] = useState(0);

  // Mascot Chat States
  const [chatOpen, setChatOpen] = useState(false);
  const [chatState, setChatState] = useState('typing'); // 'typing' | 'message'

  const handleMascotClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!chatOpen) {
      setChatOpen(true);
      setChatState('typing');
      setTimeout(() => {
        setChatState('message');
      }, 2200);
    }
  };

  const handleChatCta = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setChatOpen(false);
    scrollToCadastro();
  };

  // Growing waitlist counter (starts at a random session value and rolls up/down smoothly)
  const [waitlistCount, setWaitlistCount] = useState(() => {
    const hasSession = sessionStorage.getItem('pedrada_has_session');
    const storedCount = localStorage.getItem('pedrada_waitlist_count');
    
    if (hasSession && storedCount) {
      const parsed = parseInt(storedCount, 10);
      if (!isNaN(parsed)) return parsed;
    }
    
    const newBase = Math.floor(130000 + Math.random() * 80000);
    localStorage.setItem('pedrada_waitlist_count', newBase.toString());
    sessionStorage.setItem('pedrada_has_session', 'true');
    return newBase;
  });
  const [displayedCount, setDisplayedCount] = useState(waitlistCount);
  const countRef = useRef({ value: waitlistCount });
  const lastChangeDirectionRef = useRef('up');

  useEffect(() => {
    localStorage.setItem('pedrada_waitlist_count', waitlistCount.toString());
    gsap.to(countRef.current, {
      value: waitlistCount,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        setDisplayedCount(Math.floor(countRef.current.value));
      }
    });
  }, [waitlistCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitlistCount(prev => {
        // 2% chance of drop, 98% chance of climbing slowly. Guarantee NO consecutive drops.
        const canGoDown = lastChangeDirectionRef.current !== 'down';
        const goDown = canGoDown && Math.random() < 0.02;
        
        if (goDown) {
          lastChangeDirectionRef.current = 'down';
          // Drops by 800 to 1,500
          const change = Math.floor(Math.random() * 700) + 800;
          return Math.max(50000, prev - change);
        } else {
          lastChangeDirectionRef.current = 'up';
          // Climbs slowly by 15 to 45
          const change = Math.floor(Math.random() * 30) + 15;
          return prev + change;
        }
      });
    }, 2800);
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

  // FAQ state
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Falling shower stones state
  const [showerStones, setShowerStones] = useState([]);

  // Accumulated stones stacked at the bottom of Kit section (starts higher to build a visible pile)
  const [accumulatedStones, setAccumulatedStones] = useState(95);

  // Simulate background falling stones accumulating at the bottom over time with randomized intervals (4s to 9s)
  useEffect(() => {
    let timeoutId;
    const addStoneRandomly = () => {
      setAccumulatedStones(prev => Math.min(prev + 1, 180));
      const nextTime = 4000 + Math.random() * 5000;
      timeoutId = setTimeout(addStoneRandomly, nextTime);
    };
    timeoutId = setTimeout(addStoneRandomly, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  const triggerShower = () => {
    const newStones = Array.from({ length: 12 }).map((_, i) => ({
      id: Math.random() + '-' + i + '-' + Date.now(),
      left: `${5 + Math.random() * 90}%`,
      size: Math.floor(Math.random() * 40) + 40, // 40px to 80px
      delay: Math.random() * 0.8,
      duration: 1.2 + Math.random() * 1.5,
      type: i % 3,
    }));
    setShowerStones(prev => [...prev, ...newStones]);
  };

  const handleRemoveShowerStone = (id) => {
    setShowerStones(prev => prev.filter(s => s.id !== id));
  };

  const toggleFaq = (idx) => {
    setExpandedFaq(prev => prev === idx ? null : idx);
  };



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
    triggerShower();

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
      triggerShower();
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
          bubble: 'Oi! Este baralho foi feito para confrontar o seu autoboicote de estimação. Preparado para a chinelada virtual?'
        };
      case 'drawer':
        return {
          pose: '/img/mascot_pedrinha_scrolling.png',
          bubble: 'Cada uma destas cartas desmascara as historinhas que você conta para si mesmo. Vai encarar ou vai fingir demência?'
        };
      case 'proof':
        return {
          pose: '/img/mascot_pedrinha_victory.png',
          bubble: 'Rir da sua própria autossabotagem é o primeiro passo para o autoconhecimento real (ou pelo menos pra parar de passar vergonha).'
        };
      case 'features':
        return {
          pose: '/img/mascot_pedrinha_judging.png',
          bubble: 'Estas cartas servem para você rir do seu "amanhã eu faço" e parar de colecionar desculpas esfarrapadas.'
        };
      case 'kit':
        return {
          pose: '/img/mascot_pedrinha_victory.png',
          bubble: 'O kit físico é perfeito para chacoalhar aquele amigo que vive empurrando a vida com a barriga.'
        };
      case 'waitlist':
      default:
        return {
          pose: '/img/mascot_pedrinha_scrolling.png',
          bubble: 'Chega de achar que vai dar tempo! Garanta logo o seu baralho antes que você comece a inventar desculpas.'
        };
    }
  };

  const peekingData = getPeekingData();

  return (
    <div className="app-root-container">
      <ViewportShowerStones stones={showerStones} onRemove={handleRemoveShowerStone} />

      {/* Header bar */}
      <header className="main-header">
        <div className="container header-container">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setNavOpen(false); }} className="logo-text" style={{ textDecoration: 'none' }}>
            <span>PEDRADA 🪨</span>
          </a>
          <nav className={`nav-links-center ${navOpen ? 'nav-open' : ''} ${menuHasOpened ? 'nav-transition-active' : ''}`}>
            <a href="#gerador-card" className="nav-link nav-link-toma" onClick={() => setNavOpen(false)}>TOMA! 🪨</a>
            <a href="#depoimentos" className="nav-link" onClick={() => setNavOpen(false)}>Depoimentos</a>
            <a href="#beneficios" className="nav-link" onClick={() => setNavOpen(false)}>Benefícios</a>
            <a href="#kit" className="nav-link" onClick={() => setNavOpen(false)}>O Kit</a>
            <a href="#aplicativo" className="nav-link" onClick={() => setNavOpen(false)}>App</a>
            <a href="#faq" className="nav-link" onClick={() => setNavOpen(false)}>Perguntas</a>
          </nav>
          <div className="header-actions">
            <button className="cta-button-nav" onClick={() => { scrollToCadastro(); setNavOpen(false); }}>Acesso Antecipado</button>
            <button 
              className={`nav-toggle-btn ${navOpen ? 'active' : ''}`} 
              onClick={() => { setNavOpen(!navOpen); setMenuHasOpened(true); }} 
              aria-label="Abrir menu de navegação"
              aria-expanded={navOpen}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
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
              <h1 className="hero-title-centered">
                Aprenda a rir da sua própria <span className="accent-text">autossabotagem</span>
                <br className="hero-br" /> — e sair da inércia.
              </h1>
              
              <p className="hero-subtitle-centered">
                O baralho PEDRADA traz 90 cartas físicas com verdades ácidas e hilárias sobre as suas desculpas diárias. O empurrão perfeito para você confrontar a sua autossabotagem, parar de empurrar a vida com a barriga e finalmente sair do modo estátua.
              </p>
              <div className="hero-actions-centered">
                <button className="cta-button-primary" onClick={scrollToCadastro}>Garantir Acesso Antecipado 🪨</button>
                <a href="#gerador-card" className="cta-button-secondary">Levar Pedrada ↓</a>
              </div>
              <div className="hero-trust">
                <p className="hero-counter">🪨 <strong>{displayedCount.toLocaleString('pt-BR')}</strong> pessoas apedrejadas<span className="counter-asterisk">*</span></p>
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
                        <path d="M 18,52 C 18,44 32,44 36,52 Z" fill="#D3CDC2" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 64,52 C 64,44 78,44 82,52 Z" fill="#C6C0B4" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 32,54 C 32,43 68,43 68,54 Z" fill="#DFD8CD" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 24,45 C 24,35 48,35 48,45 Z" fill="#E7E1D7" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 52,45 C 52,35 76,35 76,45 Z" fill="#EEE8DD" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 38,33 C 38,20 62,20 62,33 Z" fill="#E3DDD3" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="fan-card fan-card-2">
                  <div className="fan-card-inner">
                    <p>Pediu o de sempre no <strong>IFOOD</strong></p>
                    
                    <div className="fan-stone-pile">
                      <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M 18,52 C 18,44 32,44 36,52 Z" fill="#D3CDC2" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 64,52 C 64,44 78,44 82,52 Z" fill="#C6C0B4" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 32,54 C 32,43 68,43 68,54 Z" fill="#DFD8CD" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 24,45 C 24,35 48,35 48,45 Z" fill="#E7E1D7" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 52,45 C 52,35 76,35 76,45 Z" fill="#EEE8DD" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 38,33 C 38,20 62,20 62,33 Z" fill="#E3DDD3" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="fan-card fan-card-3">
                  <div className="fan-card-inner">
                    <p>Planejar não conta como <strong>AGIR</strong></p>
                    
                    <div className="fan-stone-pile">
                      <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M 18,52 C 18,44 32,44 36,52 Z" fill="#D3CDC2" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 64,52 C 64,44 78,44 82,52 Z" fill="#C6C0B4" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 32,54 C 32,43 68,43 68,54 Z" fill="#DFD8CD" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 24,45 C 24,35 48,35 48,45 Z" fill="#E7E1D7" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 52,45 C 52,35 76,35 76,45 Z" fill="#EEE8DD" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 38,33 C 38,20 62,20 62,33 Z" fill="#E3DDD3" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="fan-card fan-card-4">
                  <div className="fan-card-inner">
                    <p>Roteirista da sua <strong>COVARDIA</strong></p>
                    
                    <div className="fan-stone-pile">
                      <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M 18,52 C 18,44 32,44 36,52 Z" fill="#D3CDC2" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 64,52 C 64,44 78,44 82,52 Z" fill="#C6C0B4" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 32,54 C 32,43 68,43 68,54 Z" fill="#DFD8CD" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 24,45 C 24,35 48,35 48,45 Z" fill="#E7E1D7" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 52,45 C 52,35 76,35 76,45 Z" fill="#EEE8DD" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 38,33 C 38,20 62,20 62,33 Z" fill="#E3DDD3" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
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
                          <path d="M 18,52 C 18,44 32,44 36,52 Z" fill="#D3CDC2" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                          <path d="M 64,52 C 64,44 78,44 82,52 Z" fill="#C6C0B4" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                          <path d="M 32,54 C 32,43 68,43 68,54 Z" fill="#DFD8CD" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                          
                          {/* Row 2 (Middle) */}
                          <path d="M 24,45 C 24,35 48,35 48,45 Z" fill="#E7E1D7" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                          <path d="M 52,45 C 52,35 76,35 76,45 Z" fill="#EEE8DD" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
                          
                          {/* Row 3 (Top) */}
                          <path d="M 38,33 C 38,20 62,20 62,33 Z" fill="#E3DDD3" stroke="#403B32" strokeWidth="2" strokeLinecap="round" />
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
                  className={`cta-button-primary cta-button-simulator ${isThrownAnimating ? 'animating' : ''}`} 
                  onClick={triggerThrowAndDraw}
                  disabled={isThrownAnimating}
                >
                  <span className="btn-label-container">
                    <span className="btn-label label-default">Levar Pedrada! 🪨</span>
                    <span className="btn-label label-active">Toma! 🪨</span>
                  </span>
                </button>
              </div>

              {/* Mascot reaction bubble (now on the right) */}
              <div className="drawer-mascot-col">
                <div className="drawer-speech-bubble">
                  <p>"{reaction}"</p>
                  {cardsDrawnCount >= 3 && (
                    <button className="bubble-cta-btn" onClick={scrollToCadastro}>
                      Garantir Acesso Antecipado com 20% OFF 🪨
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
          <div className="container">
            <h2 className="section-title">Como funcionam as suas 90 pedradas diárias?</h2>
            <p className="section-subtitle">O baralho traz 90 dias de confrontação contra a sua autossabotagem diária. O objetivo é rir das desculpas esfarrapadas, aceitar o chacoalhão e finalmente agir.</p>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon" aria-hidden="true">🎯</div>
                <h3>90 Dias de Tapa na Cara</h3>
                <p>Cada uma das 90 cartas é um espelho dolorosamente sincero. Este baralho foi feito para confrontar a sua procrastinação profissional e tirar você da zona de conforto mofada.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon" aria-hidden="true">📆</div>
                <h3>Foco no Aprendizado Sincero</h3>
                <p>Você vai rir das suas mentiras diárias, mas o foco é aprender com elas. E se ao fim de 90 dias você continuar enrolando, pelo menos deu boas risadas com o seu fracasso ilustrado.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon" aria-hidden="true">🎁</div>
                <h3>O Presente Perfeito</h3>
                <p>Sabe aquele amigo que está "montando um plano" há 3 anos ou o familiar que vive refém das próprias desculpas? O baralho PEDRADA é o chacoalhão que faltava para ele parar de fingir demência.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Product Specifications */}
        <section className="details-section reveal-on-scroll" id="kit">
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
              <p>Uma dose diária de lucidez contra a sua autossabotagem, disfarçada de jogo de cartas.</p>
              <ul className="details-list">
                <li><strong>90 Cartas de Autossabotagem:</strong> O baralho oficial com verdades ácidas que destroem as suas desculpas mentais sem dó nem piedade.</li>
                <li><strong>Passe VIP Vitalício no App:</strong> QR Code exclusivo no baralho físico para destravar todas as coleções digitais e remover limites no celular.</li>
                <li><strong>Display da Pedrinha:</strong> Um totem montável da mascote para decorar a sua mesa de trabalho.</li>
                <li><strong>Estojo Rígido de Pedra:</strong> Embalagem premium com encaixe magnético imitando textura rochosa.</li>
                <li><strong>Coleção de Adesivos:</strong> Selos irônicos para colar no notebook e rir com os colegas de escritório.</li>
              </ul>
              <button className="cta-button-primary" onClick={scrollToCadastro}>Garantir Acesso Antecipado (Vagas Limitadas)</button>
            </div>
          </div>

          {/* ACCUMULATED STONES FLOOR */}
          <div className="accumulated-stones-floor">
            {Array.from({ length: Math.min(accumulatedStones, 180) }).map((_, i) => {
              // Deterministic pseudo-random placement using sine-hash formulas to scatter them in a normal distribution (bell curve)
              // We sum three independent uniform pseudo-random variables to approximate a normal distribution (Central Limit Theorem)
              const hashL1 = Math.sin(i * 12.9898) * 43758.5453;
              const u1 = hashL1 - Math.floor(hashL1);
              
              const hashL2 = Math.sin(i * 27.531) * 43758.5453;
              const u2 = hashL2 - Math.floor(hashL2);
              
              const hashL3 = Math.sin(i * 84.192) * 43758.5453;
              const u3 = hashL3 - Math.floor(hashL3);
              
              const bellVal = (u1 + u2 + u3) / 3; // Center-weighted value between 0 and 1 (around 0.5)
              const leftVal = bellVal * 95; // 0% to 95%
              const left = `${leftVal}%`;
              
              // Base height based on proximity to center (normal curve shape / "morro")
              // At bellVal = 0.5 (center), hillHeight is 48px. At bellVal = 0 or 1, hillHeight is 0px.
              const distFromCenter = Math.abs(bellVal - 0.5);
              const hillHeight = (1 - (distFromCenter / 0.5)) * 48; // Max 48px base height in center
              
              const hashB = Math.sin(i * 78.233) * 43758.5453;
              const jitter = (hashB - Math.floor(hashB)) * 26 - 13; // Jitter between -13px and 13px
              
              const bottomVal = Math.max(-10, hillHeight + jitter);
              const bottom = `${bottomVal}px`;
              
              const hashS = Math.sin(i * 93.12) * 43758.5453;
              const size = 45 + Math.floor((hashS - Math.floor(hashS)) * 40); // 45px to 85px to match background sizes
              
              const hashR = Math.sin(i * 45.67) * 43758.5453;
              const rotation = `${(hashR - Math.floor(hashR)) * 80 - 40}deg`; // -40deg to 40deg
 
              // Deterministic start position (for the parabolic throw trajectory)
              const hashStart = Math.sin(i * 35.71) * 43758.5453;
              const uStart = hashStart - Math.floor(hashStart);
              // Toss from a high position slightly offset from the target left coordinate for a natural drop
              const startLeftVal = leftVal + (uStart * 30 - 15); // Target left +/- 15%
              const startLeft = `${Math.max(-10, Math.min(110, startLeftVal))}%`;
              const startBottom = `${180 + Math.floor(uStart * 60)}px`; // High start: 180px to 240px
 
              // Peak height of the toss (e.g. 220px to 280px, higher peak for natural downward gravity fall)
              const hashPeak = Math.sin(i * 18.2) * 43758.5453;
              const peakBottom = `${220 + Math.floor((hashPeak - Math.floor(hashPeak)) * 60)}px`;
 
              // Duration of fall: between 0.7s and 1.2s (slightly slower and physical)
              const hashD = Math.sin(i * 54.32) * 43758.5453;
              const duration = `${0.7 + (hashD - Math.floor(hashD)) * 0.5}s`;
 
              // Delay to cascade when loading
              const delay = `${(i * 0.015) % 0.4}s`;
              
              const type = i % 3;
              const isInitial = i < 95;
              return (
                <div
                  key={i}
                  className={`accumulated-stone ${isInitial ? 'static-stone' : 'falling-stone'}`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    '--start-left': startLeft,
                    '--start-bottom': startBottom,
                    '--end-left': left,
                    '--end-bottom': bottom,
                    '--peak-bottom': peakBottom,
                    '--rot': rotation,
                    '--duration': duration,
                    '--delay': delay
                  }}
                >
                  {type === 0 && (
                    <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 12,25 C 10,12 28,12 48,15 C 52,22 50,38 38,42 C 22,45 14,35 12,25 Z" fill="#D3CDC2" stroke="#3A342B" strokeWidth="3" strokeLinejoin="round" />
                      <path d="M 18,22 Q 22,18 32,20" stroke="#3A342B" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </svg>
                  )}
                  {type === 1 && (
                    <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 10,22 C 8,14 26,6 46,12 C 54,20 48,38 34,42 C 20,44 12,32 10,22 Z" fill="#C6C0B4" stroke="#3A342B" strokeWidth="3" strokeLinejoin="round" />
                      <path d="M 22,25 Q 34,22 42,28" stroke="#3A342B" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </svg>
                  )}
                  {type === 2 && (
                    <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 15,28 C 12,15 28,10 45,18 C 50,22 46,38 35,40 C 22,42 16,36 15,28 Z" fill="#DFD8CD" stroke="#3A342B" strokeWidth="3" strokeLinejoin="round" />
                      <path d="M 24,20 L 30,26 M 30,20 L 24,26" stroke="#3A342B" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5a: App Download */}
        <section className="app-section reveal-on-scroll" id="aplicativo">
          <div className="container app-container">
            <div className="app-content">
              <h2 className="section-title">Leve a sua autossabotagem no bolso.</h2>
              <p className="section-subtitle">
                O app do PEDRADA envia notificações ácidas diárias que expõem a sua autossabotagem em tempo real. 
                Baixe agora para tirar cartas virtuais e monitorar o seu cultivo de pendências diretamente do celular.
              </p>
              
              <div className="app-store-buttons">
                <a href="#" className="store-badge-link" onClick={e => e.preventDefault()}>
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/2/26/Baixar_na_App_Store.svg" 
                    alt="Baixar na App Store" 
                    className="store-badge-img store-badge-apple"
                  />
                </a>
                <a href="#" className="store-badge-link" onClick={e => e.preventDefault()}>
                  <img 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/pt-br_badge_web_generic.png" 
                    alt="Disponível no Google Play" 
                    className="store-badge-img store-badge-google"
                  />
                </a>
              </div>

              {/* Comparativo de Acesso */}
              <div className="app-comparison-grid">
                <div className="comp-card freemium">
                  <div className="comp-badge">Gratuito</div>
                  <h3 className="comp-title">Versão Digital</h3>
                  <ul className="comp-list">
                    <li><strong>1 Pedrada por dia:</strong> Uma dose diária de autossabotagem exposta.</li>
                    <li><strong>Álbum de Figurinhas:</strong> Colecione todas as suas desculpas esfarrapadas.</li>
                    <li><strong>Pool Limitado:</strong> Apenas as cartas básicas, com chance de repetição.</li>
                  </ul>
                </div>

                <div className="comp-card vip">
                  <div className="comp-badge premium">Acesso VIP Vitalício</div>
                  <h3 className="comp-title">Incluso no Baralho Físico</h3>
                  <ul className="comp-list">
                    <li><strong>Limite Generoso de Verdades:</strong> Puxe cartas virtuais diárias suficientes para te deixar chorando no chuveiro (não liberamos infinitas porque nem você aguentaria).</li>
                    <li><strong>Cobrança Retroativa:</strong> Ficou dias sem abrir o app? O histórico retroativo guarda tudo. Nenhuma desculpa esfarrapada será esquecida.</li>
                    <li><strong>Coleção Completa Liberada:</strong> Todo o acervo das 90 cartas do baralho físico liberado via QR Code, sem cartas repetidas.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="app-media">
              <div className="phone-mockup">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  <div className="phone-header">PEDRADA</div>
                  <div className="phone-content">
                    <img 
                      src="/img/mascot_pedrinha_judging.png" 
                      alt="Pedrinha olhando com desdém" 
                      className="phone-mascot"
                    />
                    <div className="phone-card">
                      <p className="phone-card-text">
                        "Planejou a semana toda no Notion. Não abriu o Notion nenhuma vez."
                      </p>
                      <div className="phone-card-author">Pedrinha diz</div>
                    </div>
                  </div>
                  <button className="phone-btn">Tirar Outra Carta 🪨</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5b: FAQ Accordion */}
        <section className="faq-section reveal-on-scroll" id="faq">
          <div className="container faq-container">
            <h2 className="section-title">Perguntas Frequentes (Sem Autoajuda)</h2>
            <p className="section-subtitle">Dúvidas reais com respostas dolorosamente sinceras.</p>
            
            <div className="faq-accordion">
              {faqData.map((item, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div key={idx} className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
                    <button 
                      className="faq-question-btn" 
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                    </button>
                    <div className="faq-answer-wrapper" style={{ maxHeight: isOpen ? '250px' : '0' }}>
                      <div className="faq-answer-content" dangerouslySetInnerHTML={{ __html: item.a }} />
                    </div>
                  </div>
                );
              })}
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
                <h2 className="waitlist-title">Garanta Seu Acesso Antecipado</h2>
                <p className="waitlist-desc">
                  A primeira tiragem física de <strong>PEDRADA</strong> está em produção e a maior parte das vagas de acesso antecipado já foi preenchida. 
                  Deixe seu e-mail agora para garantir o seu baralho com 20% OFF e não correr o risco de ficar de fora!
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
                      {submitting ? 'Registrando...' : 'Quero Acesso Antecipado 🪨'}
                    </button>
                  </form>
                ) : (
                  <div className="inline-success-box">
                    <div className="success-icon">✓</div>
                    <h3>Tudo certo, {name}!</h3>
                    <p>Tudo certo! Você entrou na lista de lançamento. Te enviaremos o cupom de 20% assim que as vendas forem liberadas!</p>
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
      <div className="peeking-mascot-container">
        {chatOpen ? (
          <div className="peeking-chat-window">
            <div className="peeking-chat-header">
              <span className="peeking-chat-status-dot"></span>
              <strong>Pedrinha</strong> <span className="peeking-chat-status-text">(Sem paciência)</span>
            </div>
            <div className="peeking-chat-body">
              {chatState === 'typing' ? (
                <div className="chat-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                <p className="chat-message-text">
                  Ahhh, não vou ficar aqui de papo furado contigo. Para de procrastinar e garante logo o seu baralho!
                </p>
              )}
            </div>
            {chatState === 'message' && (
              <button className="chat-cta-btn" onClick={handleChatCta}>
                Garantir Acesso Antecipado 🪨
              </button>
            )}
          </div>
        ) : (
          <div className="peeking-bubble" key={scrollPhase} onClick={handleMascotClick}>
            <div className="peeking-bubble-label">Pedrinha diz:</div>
            <p>{peekingData.bubble}</p>
          </div>
        )}
        <div className="peeking-mascot-wrap" onClick={handleMascotClick}>
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
