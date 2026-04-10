import { Link } from 'react-router-dom';
import { ArrowRight, FileText, CheckCircle, Globe2, ShieldCheck, Zap, Star, Users, TrendingUp, Clock, Play } from 'lucide-react';

const Home = ({ isDarkMode }) => {
  const features = [
    {
      icon: <FileText size={28} />,
      title: "Upload Reports",
      desc: "Drag & drop ZIP or Excel files from Amazon, Flipkart, or Meesho. We handle all formats automatically.",
      color: "blue"
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Auto-Convert",
      desc: "Our engine reliably parses and structures everything into standard GSTR-1 compliant JSON format.",
      color: "emerald"
    },
    {
      icon: <CheckCircle size={28} />,
      title: "Verify & Edit",
      desc: "Human verification panel catches edge cases, mismatches, and lets you correct errors instantly.",
      color: "purple"
    },
    {
      icon: <Globe2 size={28} />,
      title: "Submit to Portal",
      desc: "One-click upload seamlessly formats to the GST Portal specification with OTP verification.",
      color: "amber"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Agarwal",
      role: "CA, TaxPro Consultants",
      content: "CAGST has reduced our GSTR-1 filing time from 3 days to just 2 hours. The reconciliation feature is a game-changer for our practice.",
      rating: 5,
      avatar: "RA"
    },
    {
      name: "Priya Sharma",
      role: "Seller, Amazon & Flipkart",
      content: "Managing GST across multiple platforms was a nightmare. Now I just upload my reports and CAGST handles everything perfectly.",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Vikram Mehta",
      role: "Finance Head, E-Comm Corp",
      content: "The accuracy is impressive. We've not had a single mismatch notice since implementing CAGST for our 500+ SKU business.",
      rating: 5,
      avatar: "VM"
    }
  ];

  const stats = [
    { value: "50,000+", label: "Active Users", icon: <Users size={20} /> },
    { value: "₹500Cr+", label: "GST Processed", icon: <TrendingUp size={20} /> },
    { value: "99.9%", label: "Accuracy Rate", icon: <CheckCircle size={20} /> },
    { value: "2hrs", label: "Avg. Filing Time", icon: <Clock size={20} /> },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-dark-bg text-white' : 'bg-slate-50 text-slate-800'}`}>
      {/* Header */}
      <header className="container mx-auto px-6 py-5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-600/30">
            G
          </div>
          <span className="font-bold text-2xl tracking-tight">GST<span className="text-primary-600">Sync</span></span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-primary-600 transition-colors">How it works</a>
          <a href="#testimonials" className="hover:text-primary-600 transition-colors">Testimonials</a>
          <a href="#pricing" className="hover:text-primary-600 transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="font-medium hover:text-primary-600 transition-colors">Log in</Link>
          <Link to="/app/dashboard" className="btn-primary">Get Started Free</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-28 overflow-hidden mx-auto container px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="text-center max-w-4xl mx-auto z-10 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-semibold text-sm mb-8 border border-primary-200 dark:border-primary-800/50 shadow-sm">
            <Zap size={16} className="text-amber-500 fill-amber-500" />
            <span>Trusted by 50,000+ E-commerce Businesses</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Automate Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-400">GST Filing & Reconciliation</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Download your reports from Amazon, Flipkart, or Meesho. We convert them, verify the data, and upload them straight to the GST portal effortlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/app/dashboard" className="btn-primary px-8 py-4 text-lg flex items-center gap-2 w-full sm:w-auto shadow-xl shadow-primary-600/20 group">
              Start Automating Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto font-medium flex items-center justify-center gap-2">
              <Play size={18} /> Watch Demo
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 py-6 px-8 bg-white/50 dark:bg-dark-card/50 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-slate-800 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Marketplace Logos */}
          <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Supporting all major marketplaces</p>
             <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {['Amazon', 'Flipkart', 'Meesho', 'Myntra', 'JioMart', 'Nykaa', 'Ajio'].map((brand, i) => (
                  <div key={i} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm text-white
                      ${i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-blue-600' : i === 2 ? 'bg-pink-500' : 'bg-slate-500'}`}>
                      {brand.substring(0,1)}
                    </div>
                    <span className="font-semibold text-slate-600 dark:text-slate-300">{brand}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Powerful Features</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Everything You Need for GST Compliance</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">From report upload to portal filing - automate your entire GST workflow in one platform.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className={`p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-800/50 transition-all duration-300 group`}>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform
                  ${feature.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600' : 
                    feature.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600' :
                    feature.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600' :
                    'bg-amber-100 dark:bg-amber-900/40 text-amber-600'}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">How CAGST Works</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Get started in minutes and file your GST returns with confidence.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-300 to-primary-500"></div>
            
            {[
              { step: "01", icon: <Upload size={24} />, title: "Upload Reports", desc: "Drag & drop your marketplace reports" },
              { step: "02", icon: <FileText size={24} />, title: "Auto-Extract", desc: "We parse and convert to JSON" },
              { step: "03", icon: <CheckCircle size={24} />, title: "Verify Data", desc: "Review and fix any issues" },
              { step: "04", icon: <Globe2 size={24} />, title: "File GST", desc: "One-click portal submission" }
            ].map((item, idx) => (
              <div key={idx} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-primary-600 text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-600/30 relative z-10">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">Step {item.step}</span>
                <h3 className="text-lg font-bold mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white dark:bg-dark-card border-y border-slate-200 dark:border-dark-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Loved by Accountants & Sellers</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-600 dark:text-slate-400">Scale your automation as your business grows.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                name: 'Starter', 
                price: '₹0', 
                period: 'forever',
                features: [
                  '3 Reports per month',
                  'Single Marketplace',
                  'Manual Uploads',
                  'Basic Support',
                  'Email Reports'
                ],
                cta: 'Start Free'
              },
              { 
                name: 'Professional', 
                price: '₹999', 
                period: '/month',
                features: [
                  'Unlimited Reports',
                  'All Marketplaces',
                  'API Automation',
                  'Tally XML Export',
                  'Bank Statement AI',
                  'Priority Support',
                  'Bulk Operations'
                ],
                popular: true,
                cta: 'Start Trial'
              },
              { 
                name: 'Enterprise', 
                price: 'Custom', 
                period: '',
                features: [
                  'Everything in Pro',
                  'GSTR-2A Reconciliation',
                  'Multi-user Access',
                  'Dedicated Account Manager',
                  'Custom Workflows',
                  'API Access',
                  'SLA Guarantee'
                ],
                cta: 'Contact Sales'
              }
            ].map((plan, i) => (
              <div key={i} className={`p-8 rounded-3xl border transition-all duration-300 ${plan.popular ? 'bg-white dark:bg-dark-card border-primary-500 shadow-2xl scale-105 relative z-10' : 'bg-white/50 dark:bg-dark-card/50 border-slate-200 dark:border-slate-800 hover:shadow-xl'}`}>
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-500 mb-4">{plan.popular ? 'Best for growing businesses' : 'Perfect to get started'}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-slate-800 dark:text-white">{plan.price}</span>
                  {plan.period && <span className="text-slate-500 ml-1">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" /> 
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Automate Your GST?</h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">Join 50,000+ e-commerce sellers and accountants who save hours every month with CAGST.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app/dashboard" className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl">
              Start Free Trial
            </Link>
            <Link to="/login" className="bg-primary-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-800 transition-all border border-primary-600">
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold">
                  G
                </div>
                <span className="font-bold text-xl text-white">GST<span className="text-primary-400">Sync</span></span>
              </div>
              <p className="text-sm leading-relaxed">India's #1 GST automation platform for e-commerce sellers and accountants.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GST Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; 2024 CAGST. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Made with care in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
