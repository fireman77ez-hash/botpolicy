import React, { useState, useMemo } from 'react';
import {
  Shield,
  ShieldAlert,
  FileText,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Search,
  Lock,
  Settings,
  AlertTriangle,
  Server,
  Info,
  BookOpen,
  Printer,
  ChevronRight,
  Flame,
  BadgeCheck,
} from 'lucide-react';

interface Section {
  id: string;
  title: string;
  category: 'tos' | 'prohibited' | 'safety' | 'privacy';
  icon: React.ReactNode;
  summary: string;
  content: string[];
  keyPoints?: string[];
  severity?: 'critical' | 'warning' | 'info';
}

export default function App() {
  const [botName, setBotName] = useState('Turtle Bot');
  const [supportServer, setSupportServer] = useState('https://discord.gg/your-support');
  const [contactEmail, setContactEmail] = useState('support@example.com');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'tos' | 'prohibited' | 'safety' | 'privacy'>('all');
  const [selectedSection, setSelectedSection] = useState<string>('intro');
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const effectiveDate = 'October 28, 2026';

  const sections: Section[] = useMemo(() => [
    {
      id: 'intro',
      title: '1. Introduction & Acceptance of Terms',
      category: 'tos',
      icon: <FileText className="w-5 h-5 text-indigo-400" />,
      summary: 'Binding agreement upon adding or executing commands with the bot.',
      content: [
        `By inviting ${botName} ("the Service", "Bot") to any Discord server, interacting with slash commands, or authorizing bot permissions, you ("User", "Server Administrator", "Guild Owner") agree to be fully bound by these Terms of Service ("Terms") and all applicable laws and regulations.`,
        `This Service operates under Discord's official Developer Terms of Service and Discord Community Guidelines. If you do not agree with any provision stated herein, you must immediately remove the Bot from your server and cease all usage.`,
        `The operators of ${botName} reserve the right to amend or revise these terms at any time. Continued use of the Bot following any update constitutes formal acceptance of the modified Terms.`
      ],
      keyPoints: [
        'Mandatory acceptance upon inviting or using the bot',
        'Direct subordination to Discord Community Guidelines',
        'Unconditional requirement to remove the bot if non-compliant'
      ]
    },
    {
      id: 'discord-compliance',
      title: '2. Discord Platform Compliance',
      category: 'safety',
      icon: <BadgeCheck className="w-5 h-5 text-emerald-400" />,
      summary: 'Strict adherence to Discord Developer Terms and Community Guidelines.',
      content: [
        `${botName} and its operators strictly adhere to Discord's Developer Terms of Service, Developer Policy, and Community Guidelines.`,
        `Any attempt by users or guild administrators to utilize ${botName} to circumvent Discord platform limitations, bypass Discord user bans, violate Discord rate-limits, or breach user privacy is categorically forbidden.`,
        `The Service reserves the right to automatically report coordinated violations or malicious server activities directly to Discord Trust & Safety.`
      ],
      keyPoints: [
        'Zero tolerance for API abuse or automation bypass',
        'Automatic compliance audits for suspicious guild activity',
        'Cooperation with Discord Trust & Safety'
      ]
    },
    {
      id: 'anti-raid-policy',
      title: '3. Prohibited Activities: Anti-Raid & Server Security',
      category: 'prohibited',
      severity: 'critical',
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
      summary: 'Strict prohibition against raiding, nuking, mass-spamming, or disrupting servers.',
      content: [
        `SERVER RAIDING AND DESTRUCTIVE AUTOMATION ARE STRICTLY PROHIBITED. You may not utilize this bot, or any related scripts, commands, or webhooks, to initiate, facilitate, coordinate, assist, or automate:`,
        `• Server Raiding: Inundating Discord guilds with uninvited users, bots, or alternate accounts to overwhelm moderators or disrupt chat.`,
        `• Server Nuking: Unauthorized mass-deletion of channels, roles, webhooks, or mass-banning/kicking server members without explicit guild owner consent.`,
        `• Mass Ping / Spam Flooding: Automated generation of repetitive messages, mass @everyone or @here mentions, or channel spam designed to trigger rate limits or lag clients.`,
        `• Coordinated Harassment: Targeted brigading against specific servers, communities, or individuals.`,
        `Violation of this section results in permanent, immediate blacklisting of both the user and the associated Discord guild without prior notice.`
      ],
      keyPoints: [
        'Absolute prohibition on server raiding and mass disruption',
        'Instant global blacklist for destructive actions',
        'Strict prevention of unauthorized automated mass-actions'
      ]
    },
    {
      id: 'conduct-hate-speech',
      title: '4. Prohibited Activities: Harassment & Hate Speech',
      category: 'prohibited',
      severity: 'critical',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      summary: 'Zero tolerance for discriminatory slurs, harassment, and abusive behavior.',
      content: [
        `The Service enforces a zero-tolerance policy regarding hate speech, discrimination, and targeted harassment.`,
        `Users may not use ${botName} configuration fields (such as embed footers, custom triggers, auto-responses, or tags) to disseminate content that dehumanizes, incites violence against, or attacks individuals or groups based on race, ethnicity, national origin, religious affiliation, sexual orientation, sex, gender identity, or serious illness/disability.`,
        `Any custom configuration containing racial slurs, derogatory hate terms, or doxxing material will be purged, and the initiating account will be barred from using the bot across all servers.`
      ],
      keyPoints: [
        'Strict ban on derogatory slurs and hate speech in bot triggers/embeds',
        'Protection against doxxing and private data exposure',
        'Automatic sanitization and account sanctioning'
      ]
    },
    {
      id: 'server-safety',
      title: '5. Server Safety & Moderation Guidelines',
      category: 'safety',
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      summary: 'Ensuring safe bot deployment and proper role privilege management.',
      content: [
        `Server owners are solely responsible for configuring ${botName}'s role permissions within their respective Discord servers.`,
        `We strongly advise guild owners to:`,
        `• Avoid granting administrative permissions (Administrator, Manage Server) unless strictly necessary for automated moderation functions.`,
        `• Keep the Bot's highest role positioned below trusted human administrator roles to prevent privilege escalation.`,
        `• Enable two-factor authentication (2FA) requirement for moderation actions within server settings.`
      ],
      keyPoints: [
        'Principle of least privilege for bot role assignments',
        'Keep bot hierarchy lower than owner/super-admin roles',
        'Enable server-wide 2FA for moderation accounts'
      ]
    },
    {
      id: 'privacy-data',
      title: '6. Privacy Policy & Data Collection',
      category: 'privacy',
      icon: <Lock className="w-5 h-5 text-purple-400" />,
      summary: 'What data is stored, why it is stored, and data removal rights.',
      content: [
        `${botName} values user privacy and adheres to data minimization principles. We only collect data necessary to provide and preserve bot functionality.`,
        `Data Stored:`,
        `• Guild IDs, Channel IDs, and Role IDs for storing server settings and customized configurations.`,
        `• User IDs for command rate-limiting, permissions caching, and audit logs.`,
        `• Timestamped command usage logs for debugging and malicious usage detection.`,
        `Data NOT Stored:`,
        `• We do not read, log, or persist private message history, attachments, voice audio, or sensitive user credentials.`,
        `Data Deletion: Guild owners can request full deletion of their server's data at any time by contacting our team or using the designated data wipe command.`
      ],
      keyPoints: [
        'Data minimization: Only essential IDs and configuration stored',
        'No logging of message history, attachments, or voice',
        'Right to data deletion upon guild departure or request'
      ]
    },
    {
      id: 'termination',
      title: '7. Suspension, Blacklisting & Termination',
      category: 'tos',
      icon: <Flame className="w-5 h-5 text-orange-400" />,
      summary: 'Rights to terminate service access for malicious behavior.',
      content: [
        `We reserve the absolute right to suspend, terminate, or blacklist any user, guild, or guild owner from accessing ${botName} at our sole discretion, without liability, if any clause of these Terms is breached.`,
        `Blacklisted servers will see the bot automatically depart the guild, and all subsequent command invocations from affected user IDs will be ignored.`,
        `Decisions regarding critical security breaches or anti-raid enforcement are final.`
      ],
      keyPoints: [
        'Immediate termination for malicious conduct or terms breach',
        'Automated guild eviction for blacklisted servers',
        'Appeals process available via official support channels'
      ]
    },
    {
      id: 'liability',
      title: '8. Disclaimer of Warranties & Limitation of Liability',
      category: 'tos',
      icon: <Info className="w-5 h-5 text-slate-400" />,
      summary: 'As-is service disclaimer and operational boundaries.',
      content: [
        `${botName} is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express, statutory, or implied.`,
        `The developers and operators are not liable for any direct, indirect, incidental, punitive, or consequential damages resulting from server misconfigurations, unauthorized administrative actions performed by server members, or Discord platform downtime.`,
        `Server owners remain the ultimate stewards of their server security and member moderation.`
      ],
      keyPoints: [
        'Service provided as-is with no uptime warranty',
        'Operators not responsible for internal server disputes or administrative errors'
      ]
    },
    {
      id: 'contact',
      title: '9. Contact & Support Information',
      category: 'tos',
      icon: <Server className="w-5 h-5 text-blue-400" />,
      summary: 'How to contact the bot developers for support, reports, or legal inquiries.',
      content: [
        `For support inquiries, abuse reports, bug disclosures, or data removal requests:`,
        `• Support Discord: ${supportServer}`,
        `• Support Email: ${contactEmail}`,
        `Reports concerning critical abuse or coordinated server attacks should include relevant Discord message links and Snowflake IDs for expedited review.`
      ],
      keyPoints: [
        `Direct support server link: ${supportServer}`,
        `Inquiries and reports email: ${contactEmail}`
      ]
    }
  ], [botName, supportServer, contactEmail]);

  const filteredSections = useMemo(() => {
    return sections.filter((sec) => {
      const matchesTab = activeTab === 'all' || sec.category === activeTab;
      const matchesSearch =
        searchQuery.trim() === '' ||
        sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.content.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [sections, activeTab, searchQuery]);

  const generateMarkdown = () => {
    let md = `# Terms of Service & Safety Guidelines — ${botName}\n\n`;
    md += `*Effective Date: ${effectiveDate}*\n`;
    md += `*Support Server: ${supportServer} | Contact: ${contactEmail}*\n\n`;
    md += `> **Important Notice:** ${botName} operates in full compliance with the [Discord Developer Terms of Service](https://discord.com/terms) and [Discord Community Guidelines](https://discord.com/guidelines). Any attempt to utilize this bot for malicious activities, server raiding, or hate speech is strictly prohibited and subject to immediate termination.\n\n---\n\n`;

    sections.forEach((sec) => {
      md += `## ${sec.title}\n\n`;
      sec.content.forEach((paragraph) => {
        md += `${paragraph}\n\n`;
      });
      if (sec.keyPoints && sec.keyPoints.length > 0) {
        md += `**Key Provisions:**\n`;
        sec.keyPoints.forEach((kp) => {
          md += `- ${kp}\n`;
        });
        md += `\n`;
      }
      md += `---\n\n`;
    });

    return md;
  };

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(generateMarkdown());
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 2500);
    } catch {
      // Fallback
    }
  };

  const currentActiveSection = sections.find((s) => s.id === selectedSection) || sections[0];

  return (
    <div className="min-h-screen bg-[#0d0f18] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Banner / Navigation */}
      <header className="sticky top-0 z-40 bg-[#131726]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Bot Profile Badge */}
          <div className="flex items-center gap-3.5">
            <div className="relative group">
              <img
                src="/bot-icon.png"
                alt="Bot Avatar"
                className="w-11 h-11 rounded-2xl object-cover ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-500/10 bg-slate-800"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#131726] rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg text-white tracking-tight">{botName}</h1>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                  Bot
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Verified Safety Spec
                </span>
              </div>
              <p className="text-xs text-slate-400">Terms of Service & Community Safety Guidelines</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60 transition"
              title="Customize bot name & contact details"
            >
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <span>{showConfig ? 'Hide Config' : 'Customize Details'}</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition active:scale-95"
            >
              {copiedMarkdown ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied Markdown!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy for Discord / GitHub</span>
                </>
              )}
            </button>

            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60 transition"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Quick Settings Drawer */}
        {showConfig && (
          <div className="mt-3.5 pt-3 border-t border-slate-800/90 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 animate-fadeIn">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Bot Name
              </label>
              <input
                type="text"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g. Server Guardian"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Support Server URL
              </label>
              <input
                type="text"
                value={supportServer}
                onChange={(e) => setSupportServer(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="https://discord.gg/..."
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Contact Email
              </label>
              <input
                type="text"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="contact@example.com"
              />
            </div>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Compliance Alert Box */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-indigo-950/40 border border-rose-500/30 shadow-lg">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="text-sm">
              <h3 className="font-semibold text-rose-200 text-base mb-1">
                Discord Policy Compliance & Prohibited Raiding Clause
              </h3>
              <p className="text-slate-300 leading-relaxed">
                In strict compliance with{' '}
                <a
                  href="https://discord.com/guidelines"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline inline-flex items-center gap-0.5"
                >
                  Discord Community Guidelines <ExternalLink className="w-3 h-3" />
                </a>{' '}
                and the{' '}
                <a
                  href="https://discord.com/terms"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline inline-flex items-center gap-0.5"
                >
                  Discord Developer Policy <ExternalLink className="w-3 h-3" />
                </a>
                , this bot actively prohibits server raiding, spamming, coordinated harassment, nuking, and discrimination. All users and guild administrators must adhere to safety rules or face immediate suspension and reporting.
              </p>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Navigation, Search & Quick Links */}
          <div className="lg:col-span-4 space-y-5">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search clauses or guidelines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#131726] border border-slate-800 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#131726] border border-slate-800">
              {[
                { id: 'all', label: 'All Clauses' },
                { id: 'prohibited', label: 'Prohibited / Anti-Raid' },
                { id: 'safety', label: 'Safety' },
                { id: 'tos', label: 'ToS' },
                { id: 'privacy', label: 'Privacy' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Clause Navigation List */}
            <div className="rounded-2xl bg-[#131726] border border-slate-800/80 p-2 space-y-1 overflow-hidden">
              <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                Agreement Clauses ({filteredSections.length})
              </div>

              {filteredSections.map((sec) => {
                const isSelected = selectedSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setSelectedSection(sec.id);
                      const el = document.getElementById(`doc-${sec.id}`);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-start gap-3 transition ${
                      isSelected
                        ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-200'
                        : 'hover:bg-slate-800/50 text-slate-300 border border-transparent'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">{sec.icon}</div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium truncate flex items-center justify-between">
                        <span>{sec.title}</span>
                        {sec.severity === 'critical' && (
                          <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-500/10 px-1 rounded">
                            Critical
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{sec.summary}</p>
                    </div>
                  </button>
                );
              })}

              {filteredSections.length === 0 && (
                <div className="p-6 text-center text-xs text-slate-500">
                  No sections match your search query.
                </div>
              )}
            </div>

            {/* Quick Safety Summary Card */}
            <div className="rounded-2xl bg-[#131726] border border-slate-800/80 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Discord Developer Highlights</span>
              </div>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Enforces Discord's zero-tolerance policy on server raiding and nuking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Strict prohibition against racial, disability, or discriminatory slurs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Clear data retention and deletion instructions for server administrators</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Full Document Reading View */}
          <div className="lg:col-span-8 space-y-6">
            {/* Document Header Card */}
            <div className="rounded-2xl bg-[#131726] border border-slate-800 p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <img
                    src="/bot-icon.png"
                    alt="Bot Icon"
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/30 bg-slate-800 shadow"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      {botName} Terms of Service & Safety Agreement
                    </h2>
                    <p className="text-xs text-slate-400">
                      Standard Acceptable Use & Discord Safety Policy • Effective {effectiveDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Overview Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] uppercase font-semibold text-slate-500">Jurisdiction</div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">Discord Developer API</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] uppercase font-semibold text-slate-500">Raiding / Nuking</div>
                  <div className="text-xs font-semibold text-rose-400 mt-0.5">Strictly Prohibited</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] uppercase font-semibold text-slate-500">Data Storage</div>
                  <div className="text-xs font-semibold text-indigo-400 mt-0.5">Minimized & Ephemeral</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] uppercase font-semibold text-slate-500">Contact</div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5 truncate">{contactEmail}</div>
                </div>
              </div>
            </div>

            {/* Document Sections List */}
            <div className="space-y-6">
              {filteredSections.map((sec) => {
                const isFocused = selectedSection === sec.id;
                return (
                  <article
                    key={sec.id}
                    id={`doc-${sec.id}`}
                    className={`rounded-2xl bg-[#131726] border p-6 transition-all duration-200 scroll-mt-24 ${
                      isFocused
                        ? 'border-indigo-500/60 ring-1 ring-indigo-500/20 shadow-lg shadow-indigo-500/5'
                        : 'border-slate-800/80 hover:border-slate-700/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                          {sec.icon}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white">{sec.title}</h3>
                          <p className="text-xs text-slate-400">{sec.summary}</p>
                        </div>
                      </div>

                      {sec.severity === 'critical' ? (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
                          Enforced Strict
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800/60 text-slate-400 border border-slate-700/40 shrink-0">
                          Clause
                        </span>
                      )}
                    </div>

                    {/* Paragraphs */}
                    <div className="space-y-3 text-sm text-slate-300 leading-relaxed font-normal">
                      {sec.content.map((para, i) => (
                        <p key={i} className="whitespace-pre-line">
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Key Highlights */}
                    {sec.keyPoints && sec.keyPoints.length > 0 && (
                      <div className="mt-4 pt-3.5 border-t border-slate-800/60">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                          Key Provisions & Requirements:
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {sec.keyPoints.map((kp, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-slate-300 flex items-center gap-2 p-2 rounded-lg bg-slate-900/50 border border-slate-800/60"
                            >
                              <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                              <span>{kp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {/* Bottom Footer Callout */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
              <p className="text-xs text-slate-400 max-w-xl mx-auto">
                These terms are designed to fulfill Discord's official verified bot verification standards.
                You may copy these terms or download them as markdown to host on your GitHub repository,
                personal website, or Discord App Directory profile.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleCopyMarkdown}
                  className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Complete Agreement as Markdown</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
