'use client';
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faArrowLeft, faCog } from '@fortawesome/free-solid-svg-icons';

export default function InteractiveAgentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
      <div className="relative z-10">
        {/* Header */}
        <header className="pt-8 pb-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-8">
              <Link href="/" className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faArrowLeft} className="h-6 w-6 text-white" />
              </Link>
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl mr-3">
                  <FontAwesomeIcon icon={faBrain} className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Interactive Agent</h1>
                  <p className="text-purple-200">Powered by Hedra AI</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20">
              <div className="mb-8">
                <FontAwesomeIcon icon={faCog} className="h-20 w-20 text-purple-300 mb-6" />
                <h2 className="text-4xl font-bold text-white mb-4">Coming Soon</h2>
                <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
                  We're working hard to bring you an amazing interactive AI experience with Hedra's 
                  cutting-edge avatar technology. Stay tuned for visual AI interactions like never before!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-purple-500/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Visual Avatars</h3>
                  <p className="text-purple-200 text-sm">Lifelike AI avatars that respond naturally</p>
                </div>
                <div className="bg-pink-500/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Real-time Interaction</h3>
                  <p className="text-purple-200 text-sm">Instant responses with emotional intelligence</p>
                </div>
                <div className="bg-purple-500/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Advanced AI</h3>
                  <p className="text-purple-200 text-sm">Powered by state-of-the-art AI models</p>
                </div>
                <div className="bg-pink-500/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Seamless Integration</h3>
                  <p className="text-purple-200 text-sm">Easy integration with your workflow</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-purple-300">
                  Want to be notified when this feature launches?
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
