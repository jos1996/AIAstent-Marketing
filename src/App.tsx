import { useState, useEffect } from 'react'

function getOS(): 'mac' | 'windows' | 'linux' | 'unknown' {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac')) return 'mac'
  if (ua.includes('win')) return 'windows'
  if (ua.includes('linux')) return 'linux'
  return 'unknown'
}

const DOWNLOAD_URLS = {
  mac: 'https://downloads.workarea.com/Workly-v1.0.0.dmg',
  windows: 'https://downloads.workarea.com/Workly-v1.0.0.exe',
}

const Icon = ({ name, size = 24 }: { name: string; size?: number }) => {
  const icons: Record<string, JSX.Element> = {
    MessageSquare: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    Monitor: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    Brain: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/></svg>,
    Bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/></svg>,
    EyeOff: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
    Zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    Check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
    Star: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    Download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    Sparkles: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
  }
  return icons[name] || null
}

export default function App() {
  const [os, setOS] = useState<'mac' | 'windows' | 'linux' | 'unknown'>('unknown')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    setOS(getOS())
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const osLabel = os === 'mac' ? 'macOS' : os === 'windows' ? 'Windows' : 'your device'

  return (
    <div style={{ background: '#fff', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        animation: 'gridMove 30s linear infinite',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'fixed', top: '-10%', right: '-5%', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(0,0,0,0.025) 0%, transparent 70%)',
        borderRadius: '50%', animation: 'float 20s ease-in-out infinite',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 40px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(255,255,255,0.98)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.3s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 7,
            background: 'linear-gradient(135deg, #000 0%, #2a2a2a 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 15, color: '#fff',
          }}>W</div>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#000' }}>Workly AI</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="desktop-nav">
          {['Features', 'Use Cases', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} style={{
              color: '#555', fontSize: 14, fontWeight: 500, transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#000')}
              onMouseLeave={e => (e.currentTarget.style.color = '#555')}
            >{item}</a>
          ))}
          <a href="https://app.workarea.com/settings" style={{
            padding: '7px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600,
            background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
            color: '#fff', transition: 'all 0.3s',
          }}>Dashboard</a>
        </div>
      </nav>

      <section style={{
        minHeight: '85vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '90px 24px 50px', textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '5px 14px', borderRadius: 100,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.06) 100%)',
          border: '1px solid rgba(0,0,0,0.08)',
          fontSize: 11, fontWeight: 600, color: '#333', marginBottom: 20,
        }}>
          <Icon name="Sparkles" size={13} />
          AI-Powered Interview Assistant & Productivity Tool
        </div>

        <h1 style={{
          fontSize: 'clamp(34px, 5.5vw, 62px)', fontWeight: 900,
          lineHeight: 1.1, letterSpacing: '-1.2px', maxWidth: 850,
          marginBottom: 18,
          background: 'linear-gradient(135deg, #000 0%, #1a1a1a 60%, #333 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Your Real-Time AI Interview Copilot & Work Assistant
        </h1>

        <p style={{
          fontSize: 'clamp(14px, 1.8vw, 17px)', color: '#444',
          maxWidth: 680, lineHeight: 1.65, marginBottom: 28, fontWeight: 400,
        }}>
          AI interview helper, intelligent conversation rewriter, smart reminder setup, screen analysis, 
          and invisible sharing mode. Ace interviews and boost productivity with advanced AI.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 14 }}>
          <a href={DOWNLOAD_URLS[os]} style={{
            padding: '13px 30px', borderRadius: 100, fontSize: 14, fontWeight: 700,
            background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
            color: '#fff', display: 'flex', alignItems: 'center', gap: 9,
            transition: 'all 0.3s', boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.18)' }}
          >
            <Icon name="Download" size={17} />
            Download for {osLabel}
          </a>
          <a href="#features" style={{
            padding: '13px 30px', borderRadius: 100, fontSize: 14, fontWeight: 600,
            background: 'transparent', color: '#000',
            border: '2px solid #000', transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#000' }}
          >
            Explore Features
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center', fontSize: 12, color: '#666' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon name="Check" size={13} /> Free 7-day trial
          </div>
          <div style={{ width: 1, height: 9, background: '#ccc' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon name="Check" size={13} /> No credit card
          </div>
          <div style={{ width: 1, height: 9, background: '#ccc' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon name="Check" size={13} /> Mac & Windows
          </div>
        </div>

        <div style={{
          marginTop: 50, maxWidth: 950, width: '100%',
          borderRadius: 14, overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.1)',
          background: '#fafafa',
          boxShadow: '0 16px 50px rgba(0,0,0,0.11)',
          transition: 'all 0.3s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 24px 65px rgba(0,0,0,0.16)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 16px 50px rgba(0,0,0,0.11)' }}
        >
          <div style={{
            padding: '11px 15px', display: 'flex', alignItems: 'center', gap: 7,
            background: 'linear-gradient(to bottom, #f5f5f5, #ececec)',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ marginLeft: 10, color: '#333', fontSize: 11, fontWeight: 600 }}>Workly AI Assistant</span>
          </div>
          <div style={{ padding: 28, minHeight: 260, background: '#fff', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <ChatBubble role="user" text="What's the time complexity of binary search?" />
            <ChatBubble role="ai" text="Binary search has O(log n) time complexity. It works by repeatedly dividing the search interval in half, making it very efficient for sorted arrays." />
            <ChatBubble role="user" text="Can you help me with this coding interview question?" />
            <ChatBubble role="ai" text="Absolutely! I can help with algorithm explanations, code optimization, and interview strategies. What's the question?" />
          </div>
        </div>
      </section>

      <section style={{
        padding: '35px 24px',
        background: 'linear-gradient(to bottom, #fafafa, #fff)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.3, marginBottom: 18 }}>
            Powered by Advanced AI Technology
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 850, margin: '0 auto' }}>
            {[
              'AI Interview Assistant', 'Interview Copilot', 'AI Interviewer', 'Interview Helper',
              'Smart Reminders', 'Reminder Setup', 'Intelligent Conversations', 'Conversation Rewriter',
              'Screen Analysis', 'Invisible Sharing', 'Code Assistant', 'Real-time AI'
            ].map(keyword => (
              <div key={keyword} style={{
                padding: '5px 12px', borderRadius: 100,
                background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
                fontSize: 11, fontWeight: 500, color: '#333',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
              }}>{keyword}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" style={{ padding: '60px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 45 }}>
          <div style={{
            display: 'inline-block', padding: '4px 13px', borderRadius: 100,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.06))',
            border: '1px solid rgba(0,0,0,0.08)',
            fontSize: 10, fontWeight: 600, color: '#333', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1,
          }}>Core Features</div>
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.8px', marginBottom: 10,
            background: 'linear-gradient(135deg, #000, #333)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Everything You Need to Succeed
          </h2>
          <p style={{ color: '#555', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>
            Comprehensive AI-powered tools for interviews, productivity, and daily work
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
          {[
            {
              icon: 'MessageSquare',
              title: 'AI Interview Assistant',
              subtitle: 'Real-time interview copilot',
              description: 'Get instant, intelligent answers during interviews. Our AI interview helper listens, transcribes, and provides contextual responses in real-time. Perfect for technical interviews, behavioral questions, and coding challenges.',
              keywords: ['Interview Copilot', 'AI Interviewer', 'Interview Helper']
            },
            {
              icon: 'Monitor',
              title: 'Intelligent Screen Analysis',
              subtitle: 'Instant visual problem solving',
              description: 'Capture your screen and let Workly AI analyze coding problems, error messages, or any visual content. Get immediate solutions, explanations, and debugging help.',
              keywords: ['Screen Capture AI', 'Visual Analysis', 'Code Helper']
            },
            {
              icon: 'Brain',
              title: 'Intelligent Conversations',
              subtitle: 'Advanced AI chat & rewriter',
              description: 'Ask anything and get accurate answers. Our conversation rewriter helps you communicate better with intelligent suggestions, grammar improvements, and tone adjustments.',
              keywords: ['AI Chat', 'Conversation Rewriter', 'Smart Responses']
            },
            {
              icon: 'Bell',
              title: 'Smart Reminder Setup',
              subtitle: 'Natural language reminders',
              description: 'Set reminders using natural language. Just say "Remind me to review PR tomorrow at 10am" and Workly handles the rest with intelligent scheduling.',
              keywords: ['Smart Reminders', 'Reminder Setup', 'Natural Language']
            },
            {
              icon: 'EyeOff',
              title: 'Invisible While Sharing',
              subtitle: 'Privacy-first design',
              description: 'Use Workly AI during screen shares without anyone knowing. Our invisible mode keeps your AI assistant completely private and undetectable.',
              keywords: ['Invisible Mode', 'Privacy', 'Screen Share Safe']
            },
            {
              icon: 'Zap',
              title: 'Instant Code Solutions',
              subtitle: 'Real-time coding assistance',
              description: 'Get immediate help with coding problems, algorithm explanations, and best practices. Supports all major programming languages.',
              keywords: ['Code Assistant', 'Algorithm Helper', 'Technical Interview']
            }
          ].map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>
      </section>

      <section id="use-cases" style={{
        padding: '60px 24px',
        background: 'linear-gradient(to bottom, #fafafa, #fff)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 45 }}>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.8px', marginBottom: 10,
              background: 'linear-gradient(135deg, #000, #333)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Perfect For Every Scenario
            </h2>
            <p style={{ color: '#555', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>
              From technical interviews to daily productivity, Workly AI adapts to your needs
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
            {[
              { title: 'Technical Interviews', desc: 'Real-time coding help, algorithm explanations, and interview strategy guidance' },
              { title: 'Behavioral Interviews', desc: 'Smart response suggestions and conversation improvement for better communication' },
              { title: 'Daily Development', desc: 'Instant code solutions, debugging assistance, and best practice recommendations' },
              { title: 'Team Collaboration', desc: 'Invisible mode for screen shares, smart reminders for meetings and tasks' },
              { title: 'Learning & Research', desc: 'Quick answers to technical questions, concept explanations, and resource suggestions' },
              { title: 'Productivity Boost', desc: 'Natural language task management, intelligent scheduling, and workflow optimization' },
            ].map((useCase, i) => (
              <div key={i} style={{
                padding: 24, borderRadius: 12,
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(0,0,0,0.05)' }}
              >
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: '#000' }}>{useCase.title}</h3>
                <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6 }}>{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        padding: '60px 24px',
        background: '#fff',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 45 }}>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.8px', marginBottom: 10,
              background: 'linear-gradient(135deg, #000, #333)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Loved by Professionals Worldwide
            </h2>
            <p style={{ color: '#555', fontSize: 15 }}>
              See what our users are saying about Workly AI
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
            {[
              { name: 'Sarah Chen', role: 'Software Engineer @ Google', text: 'Workly AI helped me ace my coding interviews! The real-time AI interview assistant suggestions were incredibly accurate.', rating: 5 },
              { name: 'Michael Rodriguez', role: 'Product Manager @ Meta', text: 'The screen analysis and intelligent conversation features are game-changers. Saved me hours during debugging.', rating: 5 },
              { name: 'Emily Watson', role: 'Data Scientist @ Amazon', text: 'Best AI interview helper I\'ve used. The interview copilot mode gave me confidence during technical rounds.', rating: 5 },
              { name: 'David Kim', role: 'Full Stack Developer', text: 'Smart reminders with natural language processing keep me organized. The reminder setup is incredibly intuitive.', rating: 5 },
              { name: 'Lisa Johnson', role: 'UX Designer @ Apple', text: 'Clean, intuitive, and powerful. Workly AI is now essential for my workflow. Love the invisible sharing mode.', rating: 5 },
              { name: 'James Park', role: 'ML Engineer @ Tesla', text: 'The AI chat and conversation rewriter are incredibly accurate. Like having a senior engineer available 24/7.', rating: 5 },
            ].map((testimonial, i) => (
              <div key={i} style={{
                padding: 24, borderRadius: 12,
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(0,0,0,0.05)' }}
              >
                <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={14} />
                  ))}
                </div>
                <p style={{ color: '#333', fontSize: 14, lineHeight: 1.65, marginBottom: 16, fontStyle: 'italic' }}>
                  "{testimonial.text}"
                </p>
                <div>
                  <div style={{ color: '#000', fontSize: 13, fontWeight: 700 }}>{testimonial.name}</div>
                  <div style={{ color: '#666', fontSize: 12 }}>{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ padding: '60px 24px', maxWidth: 1000, margin: '0 auto', background: '#fafafa' }}>
        <div style={{ textAlign: 'center', marginBottom: 45 }}>
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.8px', marginBottom: 10,
            background: 'linear-gradient(135deg, #000, #333)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Simple, Transparent Pricing
          </h2>
          <p style={{ color: '#555', fontSize: 15 }}>
            Start free. Upgrade when you're ready.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14 }}>
          {[
            { name: 'Free', price: '$0', features: ['5 AI chats/day', 'Basic screen analysis', '3 reminders/day'], cta: 'Start Free' },
            { name: 'Pro', price: '$9.99', period: '/month', features: ['Unlimited AI chats', 'Advanced screen analysis', 'Unlimited reminders', 'Interview mode', 'Invisible sharing'], cta: 'Get Pro', highlighted: true },
            { name: 'Pro Plus', price: '$19.99', period: '/month', features: ['Everything in Pro', 'Priority support', 'Advanced analytics', 'Custom integrations'], cta: 'Get Pro Plus' },
          ].map((plan, i) => (
            <PricingCard key={i} {...plan} />
          ))}
        </div>
      </section>

      <section style={{
        padding: '60px 24px', textAlign: 'center',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        background: '#fff',
      }}>
        <div style={{ maxWidth: 650, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.8px', marginBottom: 12,
            background: 'linear-gradient(135deg, #000, #333)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Ready to Work Smarter?
          </h2>
          <p style={{ color: '#555', fontSize: 15, marginBottom: 32 }}>
            Download Workly AI for free and start your 7-day trial today.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <DownloadButton label="Download for macOS" sub="Apple Silicon & Intel" href={DOWNLOAD_URLS.mac} />
            <DownloadButton label="Download for Windows" sub="Windows 10 & 11" href={DOWNLOAD_URLS.windows} />
          </div>

          <p style={{ color: '#999', fontSize: 12, marginTop: 24 }}>
            Version 1.0.0 · Requires macOS 12+ or Windows 10+
          </p>
        </div>
      </section>

      <footer style={{
        padding: '50px 40px 35px',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        background: '#fafafa',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 35 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7,
                background: 'linear-gradient(135deg, #000, #2a2a2a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 14, color: '#fff',
              }}>W</div>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#000' }}>Workly AI</span>
            </div>
            <p style={{ color: '#666', fontSize: 13, maxWidth: 280, lineHeight: 1.6 }}>
              Your AI-powered work assistant. Interview copilot, screen analysis, and smart productivity tools.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 60 }}>
            <FooterCol title="Product" links={['Features', 'Pricing', 'Download']} />
            <FooterCol title="Company" links={['About', 'Blog', 'Contact']} />
            <FooterCol title="Legal" links={['Privacy', 'Terms']} />
          </div>
        </div>

        <div style={{
          maxWidth: 1100, margin: '32px auto 0', paddingTop: 20,
          borderTop: '1px solid rgba(0,0,0,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 14,
        }}>
          <span style={{ color: '#999', fontSize: 12 }}>© 2026 Workly AI. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 18 }}>
            {['Twitter', 'GitHub', 'Discord'].map(s => (
              <a key={s} href="#" style={{ color: '#666', fontSize: 12, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#000')}
                onMouseLeave={e => (e.currentTarget.style.color = '#666')}
              >{s}</a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
      </div>
    </div>
  )
}

function ChatBubble({ role, text }: { role: 'user' | 'ai'; text: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: role === 'user' ? 'flex-end' : 'flex-start' }}>
      <div style={{
        maxWidth: '75%', padding: '12px 16px', borderRadius: 14,
        background: role === 'user' ? 'linear-gradient(135deg, #f5f5f5, #e8e8e8)' : '#fff',
        border: `1px solid rgba(0,0,0,${role === 'user' ? '0.09' : '0.07'})`,
        boxShadow: role === 'user' ? '0 2px 6px rgba(0,0,0,0.04)' : 'none',
      }}>
        <div style={{ fontSize: 10, color: '#999', marginBottom: 5, fontWeight: 600 }}>
          {role === 'user' ? 'You' : 'Workly AI'}
        </div>
        <div style={{ fontSize: 13, color: role === 'user' ? '#333' : '#555', lineHeight: 1.6 }}>
          {text}
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, subtitle, description, keywords }: {
  icon: string; title: string; subtitle: string; description: string; keywords: string[];
}) {
  return (
    <div style={{
      borderRadius: 14, overflow: 'hidden',
      background: '#fff',
      border: '1px solid rgba(0,0,0,0.08)',
      transition: 'all 0.3s',
      boxShadow: '0 3px 14px rgba(0,0,0,0.05)',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(0,0,0,0.1)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 14px rgba(0,0,0,0.05)' }}
    >
      <div style={{ padding: 26 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: 'linear-gradient(135deg, #000, #2a2a2a)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 16,
          color: '#fff',
        }}>
          <Icon name={icon} size={22} />
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: '#000' }}>{title}</h3>
        <div style={{ fontSize: 12, color: '#666', marginBottom: 12, fontWeight: 500 }}>{subtitle}</div>
        <p style={{ color: '#666', fontSize: 13, lineHeight: 1.65, marginBottom: 14 }}>{description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {keywords.map(kw => (
            <span key={kw} style={{
              padding: '3px 9px', borderRadius: 100,
              background: 'rgba(0,0,0,0.04)',
              fontSize: 10, fontWeight: 500, color: '#555',
            }}>{kw}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function PricingCard({ name, price, period, features, cta, highlighted }: {
  name: string; price: string; period?: string; features: string[]; cta: string; highlighted?: boolean;
}) {
  return (
    <div style={{
      padding: 28, borderRadius: 14,
      background: highlighted ? 'linear-gradient(to bottom, #fff, #fafafa)' : '#fff',
      border: highlighted ? '2px solid #000' : '1px solid rgba(0,0,0,0.09)',
      transition: 'all 0.3s',
      boxShadow: highlighted ? '0 6px 22px rgba(0,0,0,0.12)' : '0 3px 12px rgba(0,0,0,0.05)',
      position: 'relative',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = highlighted ? '0 10px 30px rgba(0,0,0,0.16)' : '0 6px 20px rgba(0,0,0,0.1)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = highlighted ? '0 6px 22px rgba(0,0,0,0.12)' : '0 3px 12px rgba(0,0,0,0.05)' }}
    >
      {highlighted && (
        <div style={{
          position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #000, #2a2a2a)', color: '#fff', padding: '4px 14px', borderRadius: 100,
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5,
        }}>Most Popular</div>
      )}
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: '#000' }}>{name}</div>
      <div style={{ marginBottom: 4 }}>
        <span style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-1.5px', color: '#000' }}>{price}</span>
        {period && <span style={{ color: '#999', fontSize: 13 }}>{period}</span>}
      </div>
      <a href="https://app.workarea.com/settings/billing" style={{
        display: 'block', textAlign: 'center',
        padding: '12px 0', borderRadius: 10, marginTop: 20, marginBottom: 24,
        background: highlighted ? 'linear-gradient(135deg, #000, #1a1a1a)' : 'transparent',
        color: highlighted ? '#fff' : '#000',
        fontSize: 13, fontWeight: 700, transition: 'all 0.3s',
        border: highlighted ? 'none' : '2px solid #000',
      }}
        onMouseEnter={e => {
          if (!highlighted) { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff' }
        }}
        onMouseLeave={e => {
          if (!highlighted) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#000' }
        }}
      >{cta}</a>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: '#666' }}>
            <Icon name="Check" size={12} /> {f}
          </div>
        ))}
      </div>
    </div>
  )
}

function DownloadButton({ label, sub, href }: { label: string; sub: string; href: string }) {
  return (
    <a href={href} style={{
      padding: '16px 32px', borderRadius: 12,
      background: '#fff', border: '2px solid rgba(0,0,0,0.09)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      transition: 'all 0.3s',
      minWidth: 220,
      boxShadow: '0 3px 12px rgba(0,0,0,0.06)',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.09)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(0,0,0,0.06)' }}
    >
      <div style={{ fontSize: 15, fontWeight: 700, color: '#000' }}>{label}</div>
      <div style={{ fontSize: 12, color: '#888' }}>{sub}</div>
    </a>
  )
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#000', marginBottom: 14 }}>{title}</div>
      {links.map(link => (
        <a key={link} href="#" style={{
          display: 'block', color: '#666', fontSize: 13, marginBottom: 9, transition: 'color 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = '#000')}
          onMouseLeave={e => (e.currentTarget.style.color = '#666')}
        >{link}</a>
      ))}
    </div>
  )
}
