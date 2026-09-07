"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Globe,
  Heart,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";

const services = [
  { title: "Personal Branding", description: "Build a powerful personal brand that resonates with your audience and establishes authority in your field." },
  { title: "Website Development", description: "Custom websites built with modern technologies, optimized for performance, accessibility, and conversion." },
  { title: "Mobile Application Development", description: "Native and cross-platform mobile apps that deliver exceptional user experiences on iOS and Android." },
  { title: "ERP Implementation", description: "Enterprise resource planning systems tailored to streamline your operations and drive efficiency." },
  { title: "Digital Consultancy", description: "Strategic guidance to navigate digital transformation and maximize your technology investments." },
  { title: "Business Registration Services", description: "End-to-end company formation and compliance services across African jurisdictions." },
  { title: "Design Services", description: "Brand identity, UI/UX design, and visual systems crafted with Swiss precision and purpose." },
  { title: "Digital Marketing Services", description: "Data-driven marketing strategies that grow your audience and drive measurable results." },
  { title: "Social Media Marketing", description: "Content strategy and community management that builds engagement and brand loyalty." },
  { title: "Management Systems", description: "Custom management systems that bring clarity, control, and scalability to your operations." },
  { title: "AI Implementation Strategies", description: "Practical AI integration that solves real business problems, not hype-driven experiments." },
  { title: "Accounting & Auditing", description: "Professional financial services ensuring compliance, accuracy, and strategic insight." },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Specialist Partners" },
  { value: "12", label: "Service Domains" },
  { value: "15+", label: "African Countries" },
];

const processSteps = [
  { number: "01", title: "Discover", description: "We understand your problem for free. Deep dive into your business, challenges, and vision." },
  { number: "02", title: "Brief", description: "Project brief crafted with clear scope, timeline, and success metrics for your validation." },
  { number: "03", title: "Propose", description: "Detailed proposal with activities, costs, team composition, and value projection." },
  { number: "04", title: "Build", description: "Dedicated team assembled. Plan, design, implement, test, and maintain with real-time tracking." },
  { number: "05", title: "Scale", description: "Ongoing maintenance, optimization, and new initiatives as your business grows." },
];

const clientTypes = [
  "Government Agencies",
  "Startups",
  "Established Businesses",
  "Personal Brands",
  "Visionaries",
];

export default function Home() {
  const [gridOn, setGridOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "g" || e.key === "G") {
        setGridOn((prev) => !prev);
      }
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("grid-on", gridOn);
  }, [gridOn]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm border-b border-[var(--border)]" : "bg-transparent"
        }`}
        style={{ background: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent" }}
        role="banner"
      >
        <nav className="wrap" style={{ height: "88px", display: "grid", gridTemplateColumns: "subgrid", alignItems: "center", columnGap: "var(--gutter)" }}>
          <div className="band" style={{ gridColumn: "1 / 4" }}>
            <a href="/" className="flex items-center gap-3" aria-label="Citadolph Home">
              <Image
                src="images/logo_full_white.svg"
                alt=""
                width={180}
                height={180}
                priority
                style={{ filter: "var(--logo-filter, none)" }}
              />
            </a>
          </div>

          <div className="band hidden md:flex" style={{ gridColumn: "4 / 11", justifyContent: "flex-end", gap: "48px" }}>
            <a href="#What we do" className="text-sm font-medium transition-colors hover:text-[var(--accent)]" style={{ color: "var(--ink-muted)" }}>Services</a>
            <a href="#What we Think" className="text-sm font-medium transition-colors hover:text-[var(--accent)]" style={{ color: "var(--ink-muted)" }}>Process</a>
            <a href="#Who we Are" className="text-sm font-medium transition-colors hover:text-[var(--accent)]" style={{ color: "var(--ink-muted)" }}>About</a>
            <a href="#career" className="text-sm font-medium transition-colors hover:text-[var(--accent)]" style={{ color: "var(--ink-muted)" }}>Contact</a>
          </div>

          <div className="band" style={{ gridColumn: "11 / 13", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "16px" }}>
            <a href="#contact" className="btn btn-primary hidden sm:inline-flex" style={{ padding: "12px 24px", fontSize: "13px" }}>
              Start a Project
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[var(--paper-alt)] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-[var(--border)] bg-white animate-slide-down" style={{ animation: "slideDown 0.3s ease-out" }}>
            <div className="wrap py-6" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <a href="#What We Do" className="text-lg font-medium" style={{ color: "var(--ink)" }} onClick={() => scrollToSection("services")}>Services</a>
              <a href="#What we Think" className="text-lg font-medium" style={{ color: "var(--ink)" }} onClick={() => scrollToSection("process")}>Process</a>
              <a href="#Who We Are" className="text-lg font-medium" style={{ color: "var(--ink)" }} onClick={() => scrollToSection("about")}>About</a>
              <a href="#Career" className="text-lg font-medium" style={{ color: "var(--ink)" }} onClick={() => scrollToSection("contact")}>Contact</a>
              <a href="#contact us" className="btn btn-primary w-full mt-4" style={{ padding: "16px 24px" }}>
                Start a Project
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="main-content">
        <section id="hero" className="section" style={{ paddingTop: "calc(var(--lh) * 10)", paddingBottom: "calc(var(--lh) * 8)" }} aria-labelledby="hero-title">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "subgrid" }}>
            <div className="guides" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => <div key={i} data-col={i + 1} />)}
            </div>
            <div className="baseline-guides" aria-hidden="true" />
            <div className="margin-guides" aria-hidden="true" />

            <div className="band" style={{ gridColumn: "1 / 8", paddingTop: "var(--lh)" }}>
              <span className="kicker">Digital Transformation Agency</span>
              <h1 id="hero-title" className="masthead" style={{ maxWidth: "none", marginBottom: "calc(var(--lh) * 2)" }}>
                We Build Digital
                <br />
                <span style={{ color: "var(--accent)" }}>Infrastructure</span>
                <br />
                for Africa
              </h1>
              <p style={{ fontSize: "clamp(18px, 2.5vw, 22px)", lineHeight: "calc(var(--lh) * 1.5)", color: "var(--ink)", maxWidth: "55ch", marginBottom: "calc(var(--lh) * 3)" }}>
                Your premier digital partner. From strategy to execution, we deliver
                websites, apps, ERPs, branding, and AI solutions — backed by a network
                of specialist agencies across the continent.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
                <a href="#contact" className="btn btn-primary">
                  Start Your Project
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a href="#process" className="btn btn-secondary">
                  Our Process
                </a>
              </div>
              <div style={{ marginTop: "calc(var(--lh) * 3)", display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Shield className="w-5 h-5" style={{ color: "var(--accent)" }} aria-hidden="true" />
                  <span style={{ font: "500 13px/1 var(--font-sans)", color: "var(--ink-muted)" }}>ISO 27001 Ready</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Shield className="w-5 h-5" style={{ color: "var(--accent)" }} aria-hidden="true" />
                  <span style={{ font: "500 13px/1 var(--font-sans)", color: "var(--ink-muted)" }}>SOC 2 Compliant</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Globe className="w-5 h-5" style={{ color: "var(--accent)" }} aria-hidden="true" />
                  <span style={{ font: "500 13px/1 var(--font-sans)", color: "var(--ink-muted)" }}>GDPR Compliant</span>
                </div>
              </div>
            </div>

            <div className="band" style={{ gridColumn: "8 / 13", paddingTop: "var(--lh)" }}>
              <div
                style={{
                  aspectRatio: "4/5",
                  borderRadius: "4px",
                  overflow: "hidden",
                  background: "var(--paper-alt)",
                  border: "1px solid var(--border)",
                  position: "relative",
                }}
                aria-hidden="true"
              >
                <Image
                  src="/images/logo_full_white.svg"
                  alt="Citadolph brand mark"
                  fill
                  priority
                  style={{ objectFit: "contain", padding: "calc(var(--lh) * 4)", opacity: 0.15 }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  background: "linear-gradient(135deg, rgba(228,0,43,0.05) 0%, rgba(0,74,172,0.05) 100%)",
                }}>
                  <div style={{ textAlign: "center", padding: "var(--lh) * 3" }}>
                    <div style={{ font: "700 14px/1 var(--font-mono)", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "var(--lh)" }}>
                      Swiss Design
                    </div>
                    <div style={{ font: "700 14px/1 var(--font-mono)", color: "var(--accent-blue)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "var(--lh)" }}>
                      Carbon System
                    </div>
                    <div style={{ font: "700 14px/1 var(--font-mono)", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                      Grid Aligned
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section section--compact" aria-labelledby="services-title" style={{ background: "var(--paper-alt)" }}>
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "subgrid" }}>
            <div className="guides" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => <div key={i} data-col={i + 1} />)}
            </div>
            <div className="baseline-guides" aria-hidden="true" />
            <div className="margin-guides" aria-hidden="true" />

            <div className="band" style={{ gridColumn: "1 / 5", paddingTop: "var(--lh)" }}>
              <span className="kicker">What We Do</span>
              <h2 id="services-title" style={{ marginBottom: "var(--lh)" }}>12 Domains of Digital Excellence</h2>
              <p style={{ marginBottom: "calc(var(--lh) * 2)" }}>
                Each service is delivered by specialist agencies and independent
                contractors, orchestrated by your dedicated digital concierge.
              </p>
              <a href="#contact" className="btn btn-outline">
                Discuss Your Needs
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="band" style={{ gridColumn: "5 / 13", gridTemplateRows: "repeat(4, auto)", gap: "var(--gutter)" }}>
              {services.map((service, index) => (
                <article
                  key={service.title}
                  className="service-card"
                  style={{
                    gridColumn: index % 2 === 0 ? "1 / 5" : "5 / 9",
                    gridRow: Math.floor(index / 2) + 1,
                    padding: "calc(var(--lh) * 1.5)",
                    background: "var(--paper)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    transition: "all 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <h3 style={{ fontSize: "16px", lineHeight: "24px", marginBottom: "8px", color: "var(--ink)" }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "20px", color: "var(--ink-muted)", margin: 0, flex: 1 }}>
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section" aria-labelledby="process-title">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "subgrid" }}>
            <div className="guides" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => <div key={i} data-col={i + 1} />)}
            </div>
            <div className="baseline-guides" aria-hidden="true" />
            <div className="margin-guides" aria-hidden="true" />

            <div className="band" style={{ gridColumn: "1 / 13", textAlign: "left", marginBottom: "calc(var(--lh) * 4)" }}>
              <span className="kicker">How We Work</span>
              <h2 id="process-title" style={{ marginBottom: "var(--lh)" }}>Five Steps to Digital Transformation</h2>
              <p style={{ maxWidth: "70ch" }}>
                A proven methodology that reduces risk, ensures alignment, and delivers
                measurable outcomes — every time.
              </p>
            </div>

            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="band"
                style={{
                  gridColumn: "1 / 13",
                  gridTemplateColumns: "subgrid",
                  columnGap: "var(--gutter)",
                  padding: "calc(var(--lh) * 2) 0",
                  borderTop: index > 0 ? "1px solid var(--border)" : "none",
                  alignItems: "center",
                }}
              >
                <div className="band" style={{ gridColumn: "1 / 3", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                  <div style={{ textAlign: "right", paddingRight: "var(--gutter)" }}>
                    <div style={{ font: "700 48px/1 var(--font-mono)", color: "var(--accent)", opacity: 0.3 }}>{step.number}</div>
                    <div style={{ font: "700 11px/1 var(--font-mono)", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.15em", marginTop: "4px" }}>Step</div>
                  </div>
                </div>
                <div className="band" style={{ gridColumn: "3 / 8" }}>
                  <h3 style={{ fontSize: "24px", lineHeight: "32px", marginBottom: "8px", color: "var(--ink)" }}>{step.title}</h3>
                  <p style={{ fontSize: "16px", lineHeight: "24px", color: "var(--ink-muted)", margin: 0 }}>{step.description}</p>
                </div>
                <div className="band" style={{ gridColumn: "8 / 13" }}>
                  <div style={{
                    height: "120px",
                    background: "var(--paper-alt)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--ink-muted)",
                    font: "500 13px/1 var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}>
                    {index % 2 === 0 ? "Workflow Visualization" : "Deliverable Preview"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section section--compact" aria-labelledby="about-title" style={{ background: "var(--paper-alt)" }}>
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "subgrid" }}>
            <div className="guides" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => <div key={i} data-col={i + 1} />)}
            </div>
            <div className="baseline-guides" aria-hidden="true" />
            <div className="margin-guides" aria-hidden="true" />

            <div className="band" style={{ gridColumn: "1 / 7", paddingTop: "var(--lh)" }}>
              <span className="kicker">Our Network</span>
              <h2 id="about-title" style={{ marginBottom: "var(--lh)" }}>Specialists, Agencies, and a Concierge for You</h2>
              <p style={{ marginBottom: "calc(var(--lh) * 2)" }}>
                We don't hire generalists. We partner with specialized agencies and
                independent contractors who are masters of their craft. Your digital
                concierge assembles the right team for your specific challenge.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "var(--lh)", marginBottom: "calc(var(--lh) * 3)" }}>
                {[
                  "Dedicated digital concierge — your single point of contact",
                  "Specialist agencies for each domain (design, dev, marketing, finance)",
                  "Independent contractors vetted through project delivery",
                  "HRIS & payroll management for all partners",
                  "Financial dashboard tracking all project economics",
                  "Pathway from contractor to full-time for top performers",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "15px", lineHeight: "24px", color: "var(--ink)" }}>
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn btn-primary">
                Join as a Specialist
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="band" style={{ gridColumn: "7 / 13", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--gutter)" }}>
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  style={{
                    gridColumn: index < 2 ? index + 1 : index - 1,
                    gridRow: index < 2 ? 1 : 2,
                    padding: "calc(var(--lh) * 3)",
                    background: "var(--paper)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    textAlign: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ font: "700 48px/1 var(--font-display)", color: "var(--accent)", marginBottom: "8px" }}>{stat.value}</div>
                  <div style={{ font: "500 14px/1 var(--font-sans)", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="band" style={{ gridColumn: "1 / 13", marginTop: "calc(var(--lh) * 4)", paddingTop: "calc(var(--lh) * 4)", borderTop: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: "20px", lineHeight: "28px", marginBottom: "var(--lh)", gridColumn: "1 / 4" }}>We Serve</h3>
              <div className="band" style={{ gridColumn: "4 / 13", display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {clientTypes.map((type) => (
                  <span
                    key={type}
                    style={{
                      padding: "10px 20px",
                      background: "var(--paper)",
                      border: "1px solid var(--border)",
                      borderRadius: "9999px",
                      font: "500 13px/1 var(--font-sans)",
                      color: "var(--ink)",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--accent)";
                      e.currentTarget.style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--ink)";
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="section" aria-labelledby="cta-title" style={{ background: "var(--ink)", color: "var(--paper)" }}>
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "subgrid" }}>
            <div className="guides" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => <div key={i} data-col={i + 1} />)}
            </div>
            <div className="baseline-guides" aria-hidden="true" />
            <div className="margin-guides" aria-hidden="true" />

            <div className="band" style={{ gridColumn: "1 / 13", textAlign: "center", padding: "calc(var(--lh) * 2) 0" }}>
              <h2 id="cta-title" style={{ color: "var(--paper)", marginBottom: "var(--lh)" }}>
                Ready to Transform
                <br />
                Your Digital Presence?
              </h2>
              <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "60ch", margin: "0 auto calc(var(--lh) * 3)", fontSize: "18px", lineHeight: "28px" }}>
                Start with a free discovery session. No commitment, just clarity on
                what's possible for your business.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                <a href="#contact" className="btn" style={{ background: "var(--accent)", color: "var(--paper)", borderColor: "var(--accent)", padding: "18px 36px" }}>
                  Book Free Discovery
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a href="#services" className="btn" style={{ background: "transparent", color: "var(--paper)", borderColor: "rgba(255,255,255,0.3)", padding: "18px 36px" }}>
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section" aria-labelledby="contact-title">
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "subgrid" }}>
            <div className="guides" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => <div key={i} data-col={i + 1} />)}
            </div>
            <div className="baseline-guides" aria-hidden="true" />
            <div className="margin-guides" aria-hidden="true" />

            <div className="band" style={{ gridColumn: "1 / 7", paddingTop: "var(--lh)" }}>
              <span className="kicker">Get In Touch</span>
              <h2 id="contact-title" style={{ marginBottom: "var(--lh)" }}>Start a Conversation</h2>
              <p style={{ marginBottom: "calc(var(--lh) * 3)" }}>
                Tell us about your project, your challenges, or your vision.
                We'll respond within working hours with a clear next step.
              </p>

              <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "calc(var(--lh) * 1.5) var(--gutter)", maxWidth: "400px" }}>
                <div>
                  <dt style={{ font: "600 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "4px" }}>Email</dt>
                  <dd style={{ margin: 0, fontSize: "15px", lineHeight: "24px", color: "var(--ink)" }}>
                    <a href="mailto:hello@citadolph.com" style={{ color: "var(--ink)", textDecoration: "none" }}>hello@citadolph.com</a>
                  </dd>
                </div>
                <div>
                  <dt style={{ font: "600 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "4px" }}>Legal</dt>
                  <dd style={{ margin: 0, fontSize: "15px", lineHeight: "24px", color: "var(--ink)" }}>
                    <a href="mailto:legal@citadolph.com" style={{ color: "var(--ink)", textDecoration: "none" }}>legal@citadolph.com</a>
                  </dd>
                </div>
                <div>
                  <dt style={{ font: "600 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "4px" }}>HR</dt>
                  <dd style={{ margin: 0, fontSize: "15px", lineHeight: "24px", color: "var(--ink)" }}>
                    <a href="mailto:hr@citadolph.com" style={{ color: "var(--ink)", textDecoration: "none" }}>hr@citadolph.com</a>
                  </dd>
                </div>
                <div>
                  <dt style={{ font: "600 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "4px" }}>Finance</dt>
                  <dd style={{ margin: 0, fontSize: "15px", lineHeight: "24px", color: "var(--ink)" }}>
                    <a href="mailto:finance@citadolph.com" style={{ color: "var(--ink)", textDecoration: "none" }}>finance@citadolph.com</a>
                  </dd>
                </div>
                <div>
                  <dt style={{ font: "600 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "4px" }}>Partnerships</dt>
                  <dd style={{ margin: 0, fontSize: "15px", lineHeight: "24px", color: "var(--ink)" }}>
                    <a href="mailto:partner@citadolph.com" style={{ color: "var(--ink)", textDecoration: "none" }}>partner@citadolph.com</a>
                  </dd>
                </div>
                <div>
                  <dt style={{ font: "600 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "4px" }}>Marketing</dt>
                  <dd style={{ margin: 0, fontSize: "15px", lineHeight: "24px", color: "var(--ink)" }}>
                    <a href="mailto:marketing@citadolph.com" style={{ color: "var(--ink)", textDecoration: "none" }}>marketing@citadolph.com</a>
                  </dd>
                </div>
                <div>
                  <dt style={{ font: "600 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "4px" }}>Phone</dt>
                  <dd style={{ margin: 0, fontSize: "15px", lineHeight: "24px", color: "var(--ink)" }}>
                    <a href="tel:+1xxxxxxxxxx" style={{ color: "var(--ink)", textDecoration: "none" }}>US Number Available</a>
                  </dd>
                </div>
                <div>
                  <dt style={{ font: "600 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "4px" }}>Location</dt>
                  <dd style={{ margin: 0, fontSize: "15px", lineHeight: "24px", color: "var(--ink)" }}>Delaware, USA / Operating in Africa</dd>
                </div>
              </dl>
            </div>

            <div className="band" style={{ gridColumn: "7 / 13", paddingTop: "var(--lh)" }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Form submission would be handled here. This is a demo.");
                }}
                style={{ background: "var(--paper-alt)", border: "1px solid var(--border)", borderRadius: "8px", padding: "calc(var(--lh) * 3)" }}
              >
                <h3 style={{ fontSize: "20px", lineHeight: "28px", marginBottom: "calc(var(--lh) * 2)", color: "var(--ink)" }}>Send a Message</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "calc(var(--lh) * 1.5)" }}>
                  <div>
                    <label htmlFor="name" style={{ display: "block", font: "500 13px/1 var(--font-sans)", color: "var(--ink)", marginBottom: "6px" }}>
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        font: "15px/1 var(--font-sans)",
                        color: "var(--ink)",
                        background: "var(--paper)",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        outline: "none",
                        transition: "border-color 0.15s ease",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={{ display: "block", font: "500 13px/1 var(--font-sans)", color: "var(--ink)", marginBottom: "6px" }}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        font: "15px/1 var(--font-sans)",
                        color: "var(--ink)",
                        background: "var(--paper)",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        outline: "none",
                        transition: "border-color 0.15s ease",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" style={{ display: "block", font: "500 13px/1 var(--font-sans)", color: "var(--ink)", marginBottom: "6px" }}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        font: "15px/1 var(--font-sans)",
                        color: "var(--ink)",
                        background: "var(--paper)",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        outline: "none",
                        resize: "vertical",
                        transition: "border-color 0.15s ease",
                        fontFamily: "inherit",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "16px 24px" }}>
                    Send Message
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)]" style={{ background: "var(--paper-alt)" }} role="contentinfo">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "subgrid", padding: "calc(var(--lh) * 4) 0" }}>
          <div className="guides" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => <div key={i} data-col={i + 1} />)}
          </div>
          <div className="baseline-guides" aria-hidden="true" />
          <div className="margin-guides" aria-hidden="true" />

          <div className="band" style={{ gridColumn: "1 / 5", paddingTop: "var(--lh)" }}>
            <a href="/" className="flex items-center gap-3 mb-8" aria-label="Citadolph Home">
              <Image
                src="/images/logo_icon_white.svg"
                alt=""
                width={32}
                height={32}
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <span style={{ font: "700 18px/1 var(--font-sans)", color: "var(--paper)", letterSpacing: "-0.02em" }}>
                Citadolph
              </span>
            </a>
            <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "45ch", marginBottom: "calc(var(--lh) * 3)", fontSize: "15px", lineHeight: "24px" }}>
              Digital transformation agency building infrastructure for Africa's future.
              Registered in Delaware. Operating across the continent.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              {[
                { href: "https://linkedin.com", icon: <Globe className="w-5 h-5" />, label: "LinkedIn" },
                { href: "https://facebook.com", icon: <Users className="w-5 h-5" />, label: "Facebook" },
                { href: "https://x.com", icon: <Target className="w-5 h-5" />, label: "X" },
                { href: "https://instagram.com", icon: <Heart className="w-5 h-5" />, label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 rounded-lg transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--accent)";
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--paper)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="band" style={{ gridColumn: "5 / 9", paddingTop: "var(--lh)" }}>
            <h4 style={{ fontSize: "13px", lineHeight: "1", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: "calc(var(--lh) * 1.5)" }}>Quick Links</h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { href: "#services", label: "Services" },
                { href: "#process", label: "Our Process" },
                { href: "#about", label: "About Us" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <a key={link.href} href={link.href} style={{ fontSize: "15px", lineHeight: "24px", color: "rgba(255,255,255,0.8)", transition: "color 0.15s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="band" style={{ gridColumn: "9 / 13", paddingTop: "var(--lh)" }}>
            <h4 style={{ fontSize: "13px", lineHeight: "1", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: "calc(var(--lh) * 1.5)" }}>Legal & Compliance</h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { href: "#", label: "Privacy Policy (GDPR)" },
                { href: "#", label: "Terms of Service" },
                { href: "#", label: "Cookie Policy" },
                { href: "#", label: "ISO 27001 / SOC 2" },
              ].map((link) => (
                <a key={link.href} href={link.href} style={{ fontSize: "15px", lineHeight: "24px", color: "rgba(255,255,255,0.8)", transition: "color 0.15s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="band" style={{ gridColumn: "1 / 13", marginTop: "calc(var(--lh) * 3)", paddingTop: "calc(var(--lh) * 2)", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "var(--lh)" }}>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
              © {new Date().getFullYear()} Citadolph. All rights reserved.
            </p>
            <p style={{ font: "500 11px/1 var(--font-mono)", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Swiss Design · Carbon System · Grid Aligned
            </p>
          </div>
        </div>
      </footer>

      <div
        className="grid-toggle"
        onClick={() => setGridOn(!gridOn)}
        aria-label={gridOn ? "Hide grid overlay" : "Show grid overlay"}
        aria-pressed={gridOn}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setGridOn(!gridOn); }}}
      >
        <div className="grid-status">
          <span className="grid-status-dot" aria-hidden="true" />
          <span>Grid: {gridOn ? "ON" : "OFF"}</span>
        </div>
        <kbd>G</kbd>
      </div>

      <style jsx global>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}