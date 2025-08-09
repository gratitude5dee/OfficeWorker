'use client';
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faArrowLeft, faCog } from '@fortawesome/free-solid-svg-icons';

export default function BookingAgentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-green-900">
      <div className="relative z-10">
        {/* Header */}
        <header className="pt-8 pb-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-8">
              <Link href="/" className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faArrowLeft} className="h-6 w-6 text-white" />
              </Link>
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl mr-3">
                  <FontAwesomeIcon icon={faCalendarCheck} className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Booking Agent</h1>
                  <p className="text-green-200">Powered by Lindy AI</p>
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
                <FontAwesomeIcon icon={faCog} className="h-20 w-20 text-green-300 mb-6" />
                <h2 className="text-4xl font-bold text-white mb-4">Coming Soon</h2>
                <p className="text-xl text-green-200 mb-8 max-w-2xl mx-auto">
                  We're integrating Lindy's powerful AI to automate your scheduling and appointment 
                  management. Say goodbye to back-and-forth emails and hello to seamless booking!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-500/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Smart Scheduling</h3>
                  <p className="text-green-200 text-sm">AI-powered calendar management and optimization</p>
                </div>
                <div className="bg-emerald-500/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Auto Booking</h3>
                  <p className="text-green-200 text-sm">Automatic appointment scheduling with clients</p>
                </div>
                <div className="bg-green-500/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Calendar Integration</h3>
                  <p className="text-green-200 text-sm">Seamless sync with Google, Outlook, and more</p>
                </div>
                <div className="bg-emerald-500/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Smart Reminders</h3>
                  <p className="text-green-200 text-sm">Automated follow-ups and notifications</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-green-300">
                  Ready to revolutionize your booking process?
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
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
