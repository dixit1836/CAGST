import { Link } from 'react-router-dom';
import { ArrowRight, FileText, CheckCircle, Globe2, ShieldCheck, Zap } from 'lucide-react';

const Home = ({ isDarkMode }) => {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-dark-bg text-white' : 'bg-slate-50 text-slate-800'}`}>
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-600/30">
            G
          </div>
          <span className="font-bold text-2xl tracking-tight">GST<span className="text-primary-600">Sync</span></span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-primary-600 transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-primary-600 transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="font-medium hover:text-primary-600 transition-colors">Log in</Link>
          <Link to="/app/dashboard" className="btn-primary">Get Started</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden mx-auto container px-6">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/20 blur-[120px] rounded-full pointer-events-none -z-10 text-transparent"></div>
        
        <div className="text-center max-w-4xl mx-auto z-10 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium text-sm mb-8 border border-primary-200 dark:border-primary-800/50">
            <Zap size={16} className="text-amber-500 fill-amber-500" />
            <span>The #1 GST Automation tool for E-commerce Sellers</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Automate Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-400">GST Filing & Reconciliation</span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Download your reports from Amazon, Flipkart, or Meesho. We convert them, verify the data, and upload them straight to the GST portal effortlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/app/dashboard" className="btn-primary px-8 py-4 text-lg flex items-center gap-2 w-full sm:w-auto shadow-xl shadow-primary-600/20">
              Start Automating <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto font-medium">
              View Demo
            </Link>
          </div>

          {/* Marketplace Logos (ProGST Trust Section) */}
          <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Supporting all major marketplaces</p>
             <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                {['Amazon', 'Flipkart', 'Meesho', 'Myntra', 'JioMart', 'Nykaa', 'Ajio'].map(brand => (
                  <div key={brand} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[10px] text-slate-500">{brand.substring(0,1)}</div>
                    <span className="font-bold text-slate-500">{brand}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Dashboard Preview ... (existing code remains) */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-dark-bg via-transparent to-transparent z-10 top-2/3 pointer-events-none"></div>
          <div className="glass rounded-2xl overflow-hidden border border-slate-200/50 dark:border-dark-border shadow-2xl relative z-0 scale-[0.98] hover:scale-100 transition-transform duration-700">
            {/* Mock Header */}
            <div className="h-10 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2 bg-slate-100/50 dark:bg-slate-900/50">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            {/* Mock Image Content */}
            <div className="bg-slate-100 dark:bg-dark-card p-4 sm:p-8 aspect-video flex-col flex items-center justify-center">
               <div className="grid grid-cols-3 gap-6 w-full max-w-3xl mb-8">
                 <div className="h-32 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 p-5 flex flex-col justify-between">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30"></div>
                    <div className="w-16 h-4 rounded bg-slate-200 dark:bg-slate-700"></div>
                    <div className="w-24 h-6 rounded bg-slate-300 dark:bg-slate-600 mt-2"></div>
                 </div>
                 <div className="h-32 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 p-5 flex flex-col justify-between">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30"></div>
                    <div className="w-16 h-4 rounded bg-slate-200 dark:bg-slate-700"></div>
                    <div className="w-24 h-6 rounded bg-slate-300 dark:bg-slate-600 mt-2"></div>
                 </div>
                 <div className="h-32 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 p-5 flex flex-col justify-between">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30"></div>
                    <div className="w-16 h-4 rounded bg-slate-200 dark:bg-slate-700"></div>
                    <div className="w-24 h-6 rounded bg-slate-300 dark:bg-slate-600 mt-2"></div>
                 </div>
               </div>
               <div className="w-full max-w-3xl h-48 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (ProGST Style) */}
      <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
             <p className="text-slate-600 dark:text-slate-400">Scale your automation as your business grows.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
             {[
               { name: 'Starter', price: 'Free', features: ['Manual Uploads', 'Single Marketplace', '3 Reports/Month'] },
               { name: 'Professional', price: '₹999/mo', features: ['API Automation', 'Unlimited Marketplaces', 'Tally XML Export', 'Bank Statement AI'], popular: true },
               { name: 'Enterprise', price: 'Custom', features: ['GSTR-2A Reconciliation', 'Dedicated Support', 'API Access', 'Custom Workflows'] }
             ].map((plan, i) => (
               <div key={i} className={`p-8 rounded-3xl border transition-all duration-300 ${plan.popular ? 'bg-white dark:bg-dark-card border-primary-500 shadow-2xl scale-105 relative z-10' : 'bg-white/50 dark:bg-dark-card/50 border-slate-200 dark:border-slate-800'}`}>
                 {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-bold">MOST POPULAR</span>}
                 <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                 <div className="text-4xl font-extrabold mb-6 text-primary-600 dark:text-primary-400">{plan.price}</div>
                 <ul className="space-y-4 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                         <CheckCircle size={16} className="text-blue-500" /> {f}
                      </li>
                    ))}
                 </ul>
                 <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? 'bg-primary-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200'}`}>
                    Choose Plan
                 </button>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Features Outline */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-dark-card border-y border-slate-200 dark:border-dark-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A Seamless Workflow</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Everything you need to confidently file your GST returns across all platforms.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <FileText size={32}/>, title: "1. Upload Reports", desc: "Drag & drop ZIP or Excel from Amazon, Flipkart, or Meesho." },
              { icon: <ShieldCheck size={32}/>, title: "2. Auto-Convert", desc: "Our engine reliably parses and structures everything into standard JSON." },
              { icon: <CheckCircle size={32}/>, title: "3. Verify & Edit", desc: "Human verification panel for edge cases and mismatches." },
              { icon: <Globe2 size={32}/>, title: "4. Submit to Portal", desc: "One-click upload seamlessly formats to the GST Utility specification." }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
