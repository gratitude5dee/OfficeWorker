'use client';
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMicrophone, 
  faUserTie, 
  faCalendarCheck,
  faRocket,
  faBrain,
  faHeadset
} from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="pt-8 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl mr-3">
                  <FontAwesomeIcon icon={faUserTie} className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white">Office Worker</h1>
              </div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Your AI-powered office assistant suite. Choose from our specialized agents to streamline your workflow.
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Voice Agent Card */}
              <Link href="/voice-agent" className="group">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FontAwesomeIcon icon={faMicrophone} className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Voice Agent</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Engage in natural voice conversations with AI that can see and understand your environment in real-time.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-blue-400">
                      <FontAwesomeIcon icon={faRocket} className="h-4 w-4" />
                      <span className="font-medium">Ready to Use</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Interactive Agent Card */}
              <Link href="/interactive-agent" className="group">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FontAwesomeIcon icon={faBrain} className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Interactive Agent</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Experience dynamic visual interactions with Hedra's cutting-edge AI avatar technology.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-purple-400">
                      <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm font-medium">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Booking Agent Card */}
              <Link href="/booking-agent" className="group">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-green-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FontAwesomeIcon icon={faCalendarCheck} className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Booking Agent</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Automate your scheduling and appointment management with Lindy's intelligent booking system.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-green-400">
                      <span className="px-3 py-1 bg-green-500/20 rounded-full text-sm font-medium">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </Link>

            </div>

            {/* Features Section */}
            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold text-white mb-8">Why Choose Office Worker?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500/20 p-3 rounded-full mb-4">
                    <FontAwesomeIcon icon={faHeadset} className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI-Powered</h3>
                  <p className="text-gray-400 text-sm">Advanced AI technology for natural interactions</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-purple-500/20 p-3 rounded-full mb-4">
                    <FontAwesomeIcon icon={faRocket} className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Fast & Reliable</h3>
                  <p className="text-gray-400 text-sm">Optimized for speed and consistent performance</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-500/20 p-3 rounded-full mb-4">
                    <FontAwesomeIcon icon={faBrain} className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Smart Integration</h3>
                  <p className="text-gray-400 text-sm">Seamlessly integrates with your existing workflow</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-400">
              <p>&copy; 2025 Office Worker. Powered by AI innovation.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
