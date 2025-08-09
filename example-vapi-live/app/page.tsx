'use client';
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-500 text-white" style={{ fontFamily: 'monospace, Courier, "Courier New"' }}>
      {/* Desktop Background Pattern */}
      <div className="min-h-screen bg-gray-500 p-8" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23404040' fill-opacity='0.1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v22H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`
      }}>
        
        {/* Main Application Window */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-300 border-4 border-gray-600" style={{
            borderStyle: 'outset',
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff', 
            borderRightColor: '#404040',
            borderBottomColor: '#404040'
          }}>
            
            {/* Window Title Bar */}
            <div className="bg-red-600 px-2 py-1 flex items-center justify-between border-b-2 border-black">
              <div className="flex items-center space-x-2">
                <div className="text-white font-bold text-sm tracking-wider">
                  █ TECHROASTSHOW.EXE
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="bg-gray-400 border border-gray-600 px-2 py-0 text-black text-xs font-bold hover:bg-gray-300"
                        style={{
                          borderStyle: 'outset',
                          borderTopColor: '#ffffff',
                          borderLeftColor: '#ffffff',
                          borderRightColor: '#404040', 
                          borderBottomColor: '#404040'
                        }}>
                  _
                </button>
                <button className="bg-gray-400 border border-gray-600 px-2 py-0 text-black text-xs font-bold hover:bg-gray-300"
                        style={{
                          borderStyle: 'outset',
                          borderTopColor: '#ffffff',
                          borderLeftColor: '#ffffff',
                          borderRightColor: '#404040',
                          borderBottomColor: '#404040'
                        }}>
                  □
                </button>
                <button className="bg-gray-400 border border-gray-600 px-2 py-0 text-black text-xs font-bold hover:bg-red-500"
                        style={{
                          borderStyle: 'outset',
                          borderTopColor: '#ffffff',
                          borderLeftColor: '#ffffff',
                          borderRightColor: '#404040',
                          borderBottomColor: '#404040'
                        }}>
                  ×
                </button>
              </div>
            </div>

            {/* Window Content */}
            <div className="p-8 bg-black">
              {/* Header */}
              <div className="border-2 border-red-600 p-6 mb-8 bg-black">
                <div className="text-center">
                  <div className="text-red-600 text-6xl font-bold mb-4 tracking-wider">
                    OFFICE ENTERTAINER
                  </div>
                  <div className="bg-red-600 text-black px-4 py-2 inline-block font-bold text-sm">
                    [AI COMEDY • ROAST MASTER • EVENT MC]
                  </div>
                  <div className="text-white text-lg mt-4 font-mono max-w-4xl mx-auto">
                    &gt; AI-POWERED ENTERTAINMENT SUITE
                    <br />
                    &gt; ROAST COLLEAGUES, BOOK GIGS, MC EVENTS  
                    <br />
                    &gt; ZERO HR INCIDENTS (PROBABLY)
                  </div>
                </div>
              </div>

              {/* Agent Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                
                {/* Voice Agent */}
                <Link href="/voice-agent-original" className="block">
                  <div className="border-4 border-red-600 bg-black hover:bg-red-600 hover:text-black transition-colors duration-150 p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🎤</div>
                      <div className="font-bold text-xl mb-4">ROAST MASTER</div>
                      <div className="text-sm mb-4 font-mono">
                        LIVE AI THAT SEES EVERYTHING
                        <br />
                        AND ROASTS ACCORDINGLY
                        <br />
                        POINT. CLICK. BURN.
                      </div>
                      <div className="bg-red-600 text-black px-3 py-1 inline-block text-xs font-bold">
                        [READY TO ROAST]
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Interactive Agent */}
                <Link href="/interactive-agent" className="block">
                  <div className="border-4 border-red-600 bg-black hover:bg-red-600 hover:text-black transition-colors duration-150 p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🎭</div>
                      <div className="font-bold text-xl mb-4">VIRTUAL MC</div>
                      <div className="text-sm mb-4 font-mono">
                        HEDRA-POWERED AVATARS
                        <br />
                        THAT HOST YOUR EVENTS
                        <br />
                        THINK HOLOGRAM + JOKES
                      </div>
                      <div className="bg-black border-2 border-red-600 text-red-600 px-3 py-1 inline-block text-xs font-bold">
                        [COMING SOON]
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Booking Agent */}
                <Link href="/booking-agent" className="block">
                  <div className="border-4 border-red-600 bg-black hover:bg-red-600 hover:text-black transition-colors duration-150 p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">📅</div>
                      <div className="font-bold text-xl mb-4">BOOK THE COMIC</div>
                      <div className="text-sm mb-4 font-mono">
                        LINDY-POWERED SCHEDULING
                        <br />
                        HANDLES BOOKINGS + RIDERS
                        <br />
                        GREEN M&MS INCLUDED
                      </div>
                      <div className="bg-black border-2 border-red-600 text-red-600 px-3 py-1 inline-block text-xs font-bold">
                        [COMING SOON]
                      </div>
                    </div>
                  </div>
                </Link>

              </div>

              {/* Quote Section */}
              <div className="border-4 border-red-600 p-6 mb-8 bg-black">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
                    "FINALLY, AN AI THAT GETS YOUR OFFICE HUMOR
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-4">
                    WITHOUT GETTING YOU FIRED."
                  </div>
                  <div className="text-sm font-mono text-white">
                    &gt; HOST MEETINGS • ROAST QUARTERLY NUMBERS • MC OFFICE PARTIES
                    <br />
                    &gt; PROFESSIONAL(ISH) AI TOOLS FOR CORPORATE ENTERTAINMENT
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-2 border-red-600 p-4 bg-black">
                  <div className="text-center">
                    <div className="text-red-600 font-bold mb-2">AI-POWERED COMEDY</div>
                    <div className="text-xs font-mono">
                      ADVANCED ROASTING ALGORITHMS
                      <br />
                      WITH HR-SAFE GUARDRAILS
                    </div>
                  </div>
                </div>
                <div className="border-2 border-red-600 p-4 bg-black">
                  <div className="text-center">
                    <div className="text-red-600 font-bold mb-2">STAGE READY</div>
                    <div className="text-xs font-mono">
                      PROFESSIONAL HOSTING
                      <br />
                      PERFECT AMOUNT OF CHAOS
                    </div>
                  </div>
                </div>
                <div className="border-2 border-red-600 p-4 bg-black">
                  <div className="text-center">
                    <div className="text-red-600 font-bold mb-2">ZERO PREP REQUIRED</div>
                    <div className="text-xs font-mono">
                      POINT. CLICK. ENTERTAIN.
                      <br />
                      AI HANDLES THE REST
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <div className="text-xs font-mono text-red-600">
                  © 2025 OFFICE ENTERTAINER • POWERED BY AI • FUELED BY COFFEE • APPROVED BY NOBODY YET
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
