/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  HelpCircle, 
  Sparkles, 
  Mail, 
  Lock, 
  ChevronRight, 
  Bell, 
  Search, 
  Bolt, 
  Bug, 
  Link as LinkIcon, 
  CheckCircle, 
  LayoutDashboard, 
  ShieldAlert, 
  Network, 
  Box, 
  AlertTriangle, 
  BarChart3, 
  Trash2, 
  Settings,
  Info,
  Brain,
  FileWarning,
  X,
  Eye,
  Ban
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type View = 'landing' | 'onboarding' | 'dashboard';

interface Incident {
  id: string;
  timestamp: string;
  source: string;
  sourceDetail: string;
  category: string;
  severity: 'CRITICAL' | 'WARNING' | 'LOW';
  type: 'mail' | 'link' | 'network';
}

// --- Components ---

const LandingPage = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#0a0c10] text-white">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-6 lg:px-12 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <Shield className="text-white size-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight uppercase">AegisAI</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-400">System Secure</span>
          </div>
          <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
            <HelpCircle className="size-5 text-slate-400" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-[1024px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center self-center lg:self-start gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
              <Sparkles className="size-4" />
              AI-Driven Cybersecurity
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Your Intelligent <span className="text-primary">Privacy Shield</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              Advanced AI-powered protection for your emails and URLs. Secure your digital footprint with real-time threat detection and automated privacy guardrails.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-4 opacity-70">
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Encryption</span>
                <span className="text-sm font-medium">AES-256 Bit</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Protection</span>
                <span className="text-sm font-medium">Real-time URL</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Privacy</span>
                <span className="text-sm font-medium">Zero-Knowledge</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Login Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="glass-panel w-full max-w-md p-8 lg:p-10 rounded-2xl shadow-2xl flex flex-col gap-8 relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[60px] group-hover:bg-primary/30 transition-colors"></div>
              
              <div className="flex flex-col gap-2 relative z-10">
                <h3 className="text-2xl font-bold">Welcome to AegisAI</h3>
                <p className="text-slate-400">Securely sign in to your AegisAI account.</p>
              </div>

              <div className="flex flex-col gap-4 relative z-10">
                <button 
                  onClick={onNext}
                  className="w-full h-14 bg-white hover:bg-slate-50 text-slate-900 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg"
                >
                  <img className="w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC91hOPybfg00_kc9ozHax-C5q4QOWiD91G7Ph3pDcw5qeWzONY_HJUrisCQS4As5LkG_NptiNHG8cAeCP8n5IigyoaxGmrFI5cOn8lPnCApXcZeeLaOhNPahD8WGw2ti2Tm48Uod2GlS54WmhEe1J7W3gXgOtaRBpII2iiOa6-QigrYtsWTH-QdRLEJaQgu1LAxfLusyknQq1jX_JMakjMRIpgShSrxn17t9N3e667e4nclNGtWwYKpGtVU4dzAXQzftZoosWFyYAs" alt="Google" />
                  <span>Continue with Google</span>
                </button>

                <div className="flex items-center gap-4 my-2">
                  <div className="h-[1px] flex-1 bg-slate-800"></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">or</span>
                  <div className="h-[1px] flex-1 bg-slate-800"></div>
                </div>

                <button 
                  onClick={onNext}
                  className="w-full h-14 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] border border-slate-700"
                >
                  <Mail className="size-5" />
                  <span>Continue with Email</span>
                </button>
              </div>

              <div className="relative z-10 flex flex-col gap-6">
                <button className="text-sm font-medium text-primary hover:underline self-center">
                  Create a new secure account
                </button>
                <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-3">
                  <ShieldCheck className="text-emerald-500 size-5 shrink-0" />
                  <p className="text-xs text-slate-400 leading-normal">
                    Your login is protected by advanced biometric verification and hardware-level security protocols.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full px-6 lg:px-12 py-10 flex flex-col md:flex-row items-center justify-between border-t border-slate-800/50 gap-6">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 lg:gap-10">
          {['Privacy Policy', 'Terms of Service', 'Security Standards', 'Compliance'].map(link => (
            <a key={link} className="text-sm font-medium text-slate-500 hover:text-primary transition-colors" href="#">{link}</a>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <a className="text-slate-400 hover:text-primary transition-colors" href="#">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path></svg>
            </a>
            <a className="text-slate-400 hover:text-primary transition-colors" href="#">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.599 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
            </a>
          </div>
          <p className="text-sm font-medium text-slate-500 whitespace-nowrap">© 2024 AegisAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const OnboardingPage = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#101622] text-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Shield className="size-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">AegisAI</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {['Dashboard', 'Security', 'Reports'].map(item => (
            <a key={item} className="text-sm font-medium hover:text-primary transition-colors" href="#">{item}</a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
            <Bell className="size-5" />
          </button>
          <div className="size-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
            <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw9cchNg2VcvcHuAEvDDVtw9fxbVugm1PHf4IrcN8igUzzYQNAyHp-POVAAWjhcFdFWidq3xCsg91hPBxfA4KLvJ-mYQmllii4y-8P-Adgwmw40SNouERhj5CUVx_rJahz3bw2TosBWtScBPsDjxQeauA6A0FK72J1zuY91-zMEKIV1IFpt9HqNphjA_3jfVzjtXeO4dX1GbAsaFNvXSLsqsHsUozYppW3OV4OJPNd8RtTmzF2Pka1heYQ5MqyK97B1s7sPI7KbX2A" />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-primary">Onboarding Progress</span>
              <span className="text-xs text-slate-400">Step 2 of 4</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                className="h-full bg-primary rounded-full transition-all duration-500"
              />
            </div>
          </div>

          {/* Focus Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 md:p-12 shadow-xl backdrop-blur-sm"
          >
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Grant Email Access</h1>
              <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
                AegisAI needs your permission to scan incoming threats and keep your inbox safe from sophisticated cyber attacks.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Card 1 */}
              <div className="group p-6 rounded-xl border border-slate-800 bg-slate-800/40 hover:border-primary/50 transition-all duration-300">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="size-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Real-time Scanning</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  AI-driven analysis of every incoming email to detect phishing and malicious links instantly.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary">
                  <ShieldCheck className="size-3" />
                  Active Protection
                </div>
              </div>
              {/* Card 2 */}
              <div className="group p-6 rounded-xl border border-slate-800 bg-slate-800/40 hover:border-primary/50 transition-all duration-300">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Lock className="size-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Private & Secure</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Your data is fully encrypted. AegisAI never reads personal content; we only analyze security metadata.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                  <Lock className="size-3" />
                  End-to-End Encrypted
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 items-center">
              <button 
                onClick={onNext}
                className="w-full md:w-64 h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                Allow Access
                <ChevronRight className="size-5" />
              </button>
              <a className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-1 font-medium underline underline-offset-4 decoration-slate-700" href="#">
                Why do we need this?
              </a>
            </div>
          </motion.div>

          {/* Footer Meta */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 opacity-60">
            <div className="flex items-center gap-2 text-xs font-medium">
              <Shield className="size-4" />
              SOC2 Compliant
            </div>
            <div className="flex items-center gap-2 text-xs font-medium">
              <AlertTriangle className="size-4" />
              GDPR Ready
            </div>
            <div className="flex items-center gap-2 text-xs font-medium">
              <CheckCircle className="size-4" />
              AI Certified
            </div>
          </div>
        </div>
      </main>

      {/* Background Pattern */}
      <div className="fixed bottom-0 left-0 right-0 h-64 pointer-events-none -z-10 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full" style={{ backgroundImage: 'radial-gradient(circle at 50% 100%, #135bec33 0%, transparent 70%)' }}></div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const incidents: Incident[] = [
    { id: '1', timestamp: 'Oct 24, 14:22:10', source: 'suspicious-inv.pdf', sourceDetail: 'ceo-office@enterprise.com', category: 'Phishing', severity: 'CRITICAL', type: 'mail' },
    { id: '2', timestamp: 'Oct 24, 13:58:02', source: 'http://bit.ly/secure-login-302', sourceDetail: '192.168.1.104', category: 'Malicious URL', severity: 'WARNING', type: 'link' },
    { id: '3', timestamp: 'Oct 24, 12:15:44', source: 'Unauthorized DNS Query', sourceDetail: 'External Node: 45.2.11.0', category: 'Network', severity: 'LOW', type: 'network' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#101622] text-white font-display">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 flex flex-col bg-[#101622] z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white">
            <Shield className="size-5" />
          </div>
          <span className="text-xl font-bold tracking-tight uppercase">AegisAI</span>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="pb-4 pt-2">
            <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Main Menu</p>
            <a className="flex items-center gap-3 px-3 py-2 text-primary bg-primary/10 rounded-lg font-medium transition-colors" href="#">
              <LayoutDashboard className="size-5" />
              <span>Home</span>
            </a>
            {[
              { icon: ShieldAlert, label: 'Threats' },
              { icon: Network, label: 'Networks' },
              { icon: Box, label: 'Assets' },
              { icon: AlertTriangle, label: 'Incidents' },
              { icon: BarChart3, label: 'Analysis' },
            ].map((item) => (
              <a key={item.label} className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-primary transition-colors" href="#">
                <item.icon className="size-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
          <div className="py-4 border-t border-slate-800">
            <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">AegisAI Guard</p>
            <a className="flex items-center justify-between px-3 py-2 text-slate-400 hover:text-primary transition-colors group" href="#">
              <div className="flex items-center gap-3">
                <Trash2 className="size-5" />
                <span>Emails in Bin</span>
              </div>
              <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[10px] font-bold">128</span>
            </a>
          </div>
          <div className="py-4 border-t border-slate-800">
            <a className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-primary transition-colors" href="#">
              <Settings className="size-5" />
              <span>Settings</span>
            </a>
          </div>
        </nav>
        <div className="p-4 mt-auto">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-800">
            <div className="flex items-center gap-3">
              <img alt="Profile" className="w-10 h-10 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWaiJ2XNfEMj4R9poUhOpjYjXmh5i1MTYTHFEp9dNwaPFRnSqK7k2bIWw2asT2bIs-8hgeDbk1j_7XwgBAWw3cuZyX91iH277K6hVTUhByP2b7-ELhXIeW3vwOhkkcYntjxXfqsk7tENcj9XAHFHxqxl6jJZmQA6n-lyt6WL287P0k4_pDYmZCdZeda-L0yu_V8e8Cpd0zjf0Q7cSn0Z7Ok0BImXEaswDCRpDplsVSkjIUtpuY8RquzTIBhf_v9dcXiZP1yJZX-X_V" />
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">Alex Chen</p>
                <p className="text-xs text-slate-400 truncate">Senior Analyst</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#101622] overflow-y-auto custom-scrollbar">
        {/* Top Header */}
        <header className="h-20 border-b border-slate-800 px-8 flex items-center justify-between shrink-0 bg-[#101622]/50 backdrop-blur-md sticky top-0 z-10">
          <h1 className="text-2xl font-bold">Security Dashboard</h1>
          <div className="flex items-center gap-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
              <input className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none" placeholder="Search threats, IPs, or logs..." type="text" />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#101622]"></span>
            </button>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-primary/20">
              <Bolt className="size-4" />
              Quick Scan
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Threat Level */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <span className="p-2 bg-red-500/10 text-red-500 rounded-lg"><ShieldAlert className="size-5" /></span>
                <span className="text-xs font-bold text-red-500">+4.2%</span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">System Threat Level</h3>
              <p className="text-3xl font-bold mt-1">92.4%</p>
              <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            {/* Active Threats */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <span className="p-2 bg-amber-500/10 text-amber-500 rounded-lg"><Bug className="size-5" /></span>
                <span className="text-xs font-bold text-slate-400">Live</span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">Active Threats</h3>
              <p className="text-3xl font-bold mt-1">24</p>
              <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
                <Bolt className="size-3" /> Updated 2m ago
              </p>
            </div>
            {/* Scanned URLs */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <span className="p-2 bg-primary/10 text-primary rounded-lg"><LinkIcon className="size-5" /></span>
                <span className="text-xs font-bold text-primary">High Volume</span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">Scanned URLs</h3>
              <p className="text-3xl font-bold mt-1">12,482</p>
              <p className="text-xs text-slate-400 mt-4">Last 24 hours</p>
            </div>
            {/* Protected Emails */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <span className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><Mail className="size-5" /></span>
                <span className="text-xs font-bold text-emerald-500">+12%</span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">Protected Emails</h3>
              <p className="text-3xl font-bold mt-1">8,102</p>
              <p className="text-xs text-slate-400 mt-4">Total monitored</p>
            </div>
          </div>

          {/* Charts & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Threat Overview Chart */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold">Threat Overview</h3>
                  <p className="text-sm text-slate-400">Activity detected in the last 7 days</p>
                </div>
                <div className="flex bg-slate-800 p-1 rounded-lg">
                  <button className="px-3 py-1 text-xs font-bold bg-slate-700 rounded shadow-sm">7D</button>
                  <button className="px-3 py-1 text-xs font-bold text-slate-500">30D</button>
                  <button className="px-3 py-1 text-xs font-bold text-slate-500">ALL</button>
                </div>
              </div>
              {/* Visual Graph Simulation */}
              <div className="h-64 flex items-end justify-between gap-2 relative">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                  <div className="border-b border-slate-400 h-px w-full"></div>
                  <div className="border-b border-slate-400 h-px w-full"></div>
                  <div className="border-b border-slate-400 h-px w-full"></div>
                  <div className="border-b border-slate-400 h-px w-full"></div>
                </div>
                <div className="w-full flex items-end justify-around gap-4 h-48 relative z-0">
                  {[40, 65, 85, 50, 95, 70, 45].map((height, i) => (
                    <div key={i} className="w-full bg-primary/20 rounded-t-lg relative group" style={{ height: `${height}%` }}>
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: '70%' }}
                        className="absolute bottom-0 w-full bg-primary rounded-t-lg group-hover:h-full transition-all duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-4 text-xs font-bold text-slate-500 uppercase tracking-tighter">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <span key={day}>{day}</span>)}
              </div>
            </div>

            {/* Security Performance Widget */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-6">System Health</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-400">CPU Load (AegisAI)</span>
                    <span className="text-sm font-bold text-primary">42%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(19,91,236,0.4)]" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-400">Network Traffic</span>
                    <span className="text-sm font-bold text-emerald-500">1.2 GB/s</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center">
                      <span className="text-xs font-bold">98%</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold">AI Model Health</p>
                      <p className="text-xs text-slate-500">V.2.4 "Aegis" active</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button className="w-full py-2 bg-slate-800 text-slate-300 rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors">
                  View Full Resources
                </button>
              </div>
            </div>
          </div>

          {/* Recent Incidents Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold">Recent Incidents</h3>
              <div className="flex gap-2">
                <button className="p-2 border border-slate-800 rounded-lg text-slate-500">
                  <BarChart3 className="size-4" />
                </button>
                <button className="px-4 py-2 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary/20 transition-all">
                  Export CSV
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-800/50 text-xs font-bold uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4">Threat Source</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Severity</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-sm">
                  {incidents.map((incident) => (
                    <tr key={incident.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500">{incident.timestamp}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {incident.type === 'mail' ? <Mail className="size-4 text-slate-400" /> : <LinkIcon className="size-4 text-slate-400" />}
                          <div>
                            <p className="font-medium">{incident.source}</p>
                            <p className="text-xs text-slate-500">{incident.sourceDetail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className="bg-slate-800 px-2 py-1 rounded text-[11px] font-bold">{incident.category}</span></td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          incident.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-500' : 
                          incident.severity === 'WARNING' ? 'bg-amber-500/10 text-amber-500' : 
                          'bg-slate-800 text-slate-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            incident.severity === 'CRITICAL' ? 'bg-red-500' : 
                            incident.severity === 'WARNING' ? 'bg-amber-500' : 
                            'bg-slate-400'
                          }`}></span>
                          {incident.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedIncident(incident)}
                          className="text-primary hover:underline font-bold text-xs uppercase tracking-wider"
                        >
                          Investigate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <footer className="mt-auto p-8 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 uppercase tracking-widest font-bold">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Systems Operational
          </div>
          <div>
            AegisAI Engine v4.0.12 • Last sync: 14:45:01
          </div>
        </footer>
      </main>

      {/* Incident Modal */}
      <AnimatePresence>
        {selectedIncident && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-800 shadow-2xl shadow-red-500/10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                    <AlertTriangle className="size-8" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Incident Analysis: {selectedIncident.category}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-500 text-white tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        {selectedIncident.severity}
                      </span>
                      <span className="text-xs text-slate-500 font-medium tracking-tight uppercase">Case ID: #AEGIS-9402</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedIncident(null)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="text-primary size-4" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Detection Details</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">Timestamp</p>
                      <p className="text-sm font-medium mt-1">{selectedIncident.timestamp}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">Source Email</p>
                      <p className="text-sm font-medium mt-1 text-red-400">{selectedIncident.sourceDetail}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">Target</p>
                      <p className="text-sm font-medium mt-1">User inbox (Alex C.)</p>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="text-primary size-4" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">AI Analysis</h3>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="shrink-0 relative">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle className="text-slate-800" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" strokeWidth="6"></circle>
                        <circle className="text-red-500" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" strokeDasharray="226.19" strokeDashoffset="4.52" strokeWidth="6"></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-lg font-bold">98%</span>
                        <span className="text-[8px] font-bold text-slate-500">THREAT</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed text-slate-300">
                        The AegisAI engine flagged this communication due to a high semantic deviation from legitimate internal corporate communications. 
                        <span className="text-red-500 font-medium"> Domain impersonation detected:</span> The sender's SMTP headers do not match the organization's SPF/DKIM records.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <FileWarning className="text-primary size-4" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Malicious Elements</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="text-red-500 size-5" />
                        <div>
                          <p className="text-sm font-bold">suspicious-inv.pdf</p>
                          <p className="text-xs text-slate-500">Embedded payload: Trojan.Script.Generic</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-red-500 border border-red-500/30 px-2 py-0.5 rounded uppercase">Infected</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <LinkIcon className="text-red-500 size-5" />
                        <div>
                          <p className="text-sm font-bold">http://bit.ly/secure-login-302</p>
                          <p className="text-xs text-slate-500">Redirects to phishing credential harvest page</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-red-500 border border-red-500/30 px-2 py-0.5 rounded uppercase">Flagged URL</span>
                    </div>
                  </div>
                </section>
              </div>

              <div className="p-6 bg-slate-950/50 border-t border-slate-800">
                <div className="flex flex-col gap-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recommended Actions</p>
                  <div className="flex items-center gap-3">
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/20">
                      <Ban className="size-5" />
                      Quarantine
                    </button>
                    <button className="flex-1 bg-slate-800 hover:bg-slate-700 font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all">
                      <Eye className="size-5" />
                      View Headers
                    </button>
                    <button className="px-6 border border-slate-700 hover:border-slate-600 text-slate-500 font-bold py-2.5 rounded-lg transition-all">
                      Whitelist
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('landing');

  return (
    <div className="font-display">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingPage onNext={() => setView('onboarding')} />
          </motion.div>
        )}
        {view === 'onboarding' && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <OnboardingPage onNext={() => setView('dashboard')} />
          </motion.div>
        )}
        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
