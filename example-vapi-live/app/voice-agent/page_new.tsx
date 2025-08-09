'use client';
import React, { useRef, useEffect, useState } from 'react';
import Vapi from '@vapi-ai/web';
import { SecureVisionProcessor } from './secure-vision';
import { config } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';

config.autoAddCss = false;

const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  const message = args.join(' ');
  if (message.includes('Ignoring settings for browser- or platform-unsupported input processor(s): audio')) {
    return;
  }
  originalConsoleWarn.apply(console, args);
};

function OpenAIVisionMVP() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [vapi, setVapi] = useState<any>(null);
  const [callActive, setCallActive] = useState(false);
  const [visionProcessor, setVisionProcessor] = useState<SecureVisionProcessor | null>(null);
  const [lastVisionDescription, setLastVisionDescription] = useState<string>('');
  const [visionProcessing, setVisionProcessing] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [visionHistory, setVisionHistory] = useState<string[]>([]);
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('user');
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);

  const lastApiCallTime = useRef(0);
  const MIN_API_INTERVAL = 3000;

  const vapiPublicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
  const vapiAssistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    async function setupCamera() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === 'videoinput');
        setAvailableCameras(cameras);

        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: cameraFacingMode } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasCamera(true);
        }
      } catch (err) {
        setHasCamera(false);
      }
    }
    setupCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, [isClient, cameraFacingMode]);

  useEffect(() => {
    if (!isClient || !hasCamera || !callActive || !visionProcessor || !vapi) return;
    
    const continuousVisionProcessing = async () => {
      if (videoRef.current && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, 320, 240);
          const dataUrl = canvasRef.current.toDataURL('image/jpeg');
          setCapturedImage(dataUrl);
          
          const base64Data = dataUrl.split(',')[1];
          
          try {
            setVisionProcessing(true);
            lastApiCallTime.current = Date.now();
            const description = await visionProcessor.forceAnalysis(base64Data, '');
            
            if (description) {
              setLastVisionDescription(description);
              
              vapi.send({
                type: 'add-message',
                message: {
                  role: 'system',
                  content: `Visual context update: ${description}`,
                },
              });
              
              setVisionHistory(prev => [description, ...prev.slice(0, 4)]);
            }
            setVisionProcessing(false);
          } catch (error) {
            console.error('Vision processing error:', error);
            setVisionProcessing(false);
          }
        }
      }
    };

    const intervalId = setInterval(continuousVisionProcessing, MIN_API_INTERVAL);
    return () => clearInterval(intervalId);
  }, [isClient, hasCamera, callActive, visionProcessor, vapi]);

  useEffect(() => {
    if (!isClient) return;
    
    const processor = new SecureVisionProcessor();
    setVisionProcessor(processor);
    
    if (!vapiPublicKey) {
      console.error('VAPI public key not found');
      return;
    }

    const vapiInstance = new Vapi(vapiPublicKey);
    setVapi(vapiInstance);

    vapiInstance.on('call-start', () => {
      setCallActive(true);
    });

    vapiInstance.on('call-end', () => {
      setCallActive(false);
    });

    return () => {
      vapiInstance.stop();
    };
  }, [isClient, vapiPublicKey]);

  const startCall = () => {
    if (!vapi || !vapiAssistantId) {
      console.error('Vapi or assistant ID not available');
      return;
    }
    
    vapi.start(vapiAssistantId);
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  const switchCamera = () => {
    setCameraFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  if (!isClient) {
    return <div className="min-h-screen bg-gray-500"></div>;
  }

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
                  🎤 ROASTMASTER.EXE - LIVE AI VISION + VOICE
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
                <Link href="/">
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
                </Link>
              </div>
            </div>

            {/* Window Content */}
            <div className="p-8 bg-black">
              {/* Header */}
              <div className="border-2 border-red-600 p-6 mb-8 bg-black">
                <div className="text-center">
                  <div className="text-red-600 text-5xl font-bold mb-4 tracking-wider">
                    ROAST MASTER
                  </div>
                  <div className="bg-red-600 text-black px-4 py-2 inline-block font-bold text-sm mb-4">
                    [LIVE AI • SEES EVERYTHING • ROASTS ACCORDINGLY]
                  </div>
                  <div className="text-white text-lg font-mono max-w-3xl mx-auto">
                    &gt; POINT YOUR CAMERA AT ANYTHING
                    <br />
                    &gt; AI ANALYZES VISUAL CONTEXT  
                    <br />
                    &gt; DELIVERS REAL-TIME ROASTS
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Camera Feed Section */}
                <div className="border-2 border-red-600 p-6 bg-black">
                  <div className="border-2 border-red-600 bg-black mb-4 text-center p-2">
                    <div className="text-red-600 font-bold text-lg">
                      [CAMERA FEED]
                    </div>
                  </div>
                  
                  {hasCamera ? (
                    <div className="relative">
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted
                        className="w-full border-2 border-red-600 bg-black"
                        style={{ aspectRatio: '4/3' }}
                      />
                      <canvas 
                        ref={canvasRef} 
                        width={320} 
                        height={240}
                        className="hidden"
                      />
                      
                      {/* Camera Controls */}
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={switchCamera}
                          className="border-2 border-red-600 bg-black text-red-600 px-3 py-1 font-bold text-sm hover:bg-red-600 hover:text-black transition-colors"
                        >
                          FLIP CAMERA
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-red-600 bg-black p-8 text-center">
                      <div className="text-red-600 text-2xl mb-4">📷</div>
                      <div className="text-white font-mono">
                        NO CAMERA ACCESS
                        <br />
                        PLEASE ENABLE CAMERA PERMISSIONS
                      </div>
                    </div>
                  )}
                </div>

                {/* Controls Section */}
                <div className="border-2 border-red-600 p-6 bg-black">
                  <div className="border-2 border-red-600 bg-black mb-4 text-center p-2">
                    <div className="text-red-600 font-bold text-lg">
                      [ROAST CONTROLS]
                    </div>
                  </div>
                  
                  {/* Call Status */}
                  <div className="mb-6 text-center">
                    <div className={`border-2 px-4 py-2 font-bold text-lg ${
                      callActive 
                        ? 'border-green-500 text-green-500 bg-black' 
                        : 'border-red-600 text-red-600 bg-black'
                    }`}>
                      {callActive ? '[ROASTING ACTIVE]' : '[READY TO ROAST]'}
                    </div>
                  </div>

                  {/* Main Action Button */}
                  <div className="text-center mb-6">
                    {!callActive ? (
                      <button
                        onClick={startCall}
                        disabled={!hasCamera}
                        className="border-4 border-red-600 bg-black text-red-600 px-8 py-4 font-bold text-xl hover:bg-red-600 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        START ROASTING
                      </button>
                    ) : (
                      <button
                        onClick={endCall}
                        className="border-4 border-red-600 bg-red-600 text-black px-8 py-4 font-bold text-xl hover:bg-black hover:text-red-600 transition-colors"
                      >
                        STOP ROASTING
                      </button>
                    )}
                  </div>

                  {/* Vision Status */}
                  {callActive && (
                    <div className="border-2 border-red-600 p-4 bg-black">
                      <div className="text-red-600 font-bold mb-2">
                        AI VISION STATUS:
                      </div>
                      <div className="text-white font-mono text-sm">
                        {visionProcessing ? (
                          <div className="text-yellow-500">
                            [ANALYZING IMAGE...]
                          </div>
                        ) : (
                          <div className="text-green-500">
                            [VISION ACTIVE]
                          </div>
                        )}
                      </div>
                      
                      {lastVisionDescription && (
                        <div className="mt-3">
                          <div className="text-red-600 font-bold text-xs mb-1">
                            LAST VISION ANALYSIS:
                          </div>
                          <div className="text-white font-mono text-xs border border-red-600 p-2 bg-black">
                            {lastVisionDescription}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Instructions */}
              <div className="border-4 border-red-600 p-6 mt-8 bg-black">
                <div className="text-center">
                  <div className="text-red-600 text-2xl font-bold mb-4">
                    HOW TO GET ROASTED
                  </div>
                  <div className="text-white font-mono text-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-red-600 font-bold mb-2">1. POSITION CAMERA</div>
                      <div>POINT AT YOURSELF, YOUR DESK, OR ANYTHING ROAST-WORTHY</div>
                    </div>
                    <div>
                      <div className="text-red-600 font-bold mb-2">2. START ROASTING</div>
                      <div>CLICK THE BIG RED BUTTON TO BEGIN THE DESTRUCTION</div>
                    </div>
                    <div>
                      <div className="text-red-600 font-bold mb-2">3. PREPARE YOUR EGO</div>
                      <div>AI WILL ANALYZE AND DELIVER SURGICAL ROASTS</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="text-center mt-8">
                <Link href="/">
                  <div className="border-4 border-red-600 bg-black hover:bg-red-600 hover:text-black transition-colors duration-150 px-8 py-4 inline-block">
                    <div className="font-bold text-xl">
                      ← BACK TO MAIN PROGRAM
                    </div>
                  </div>
                </Link>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <div className="text-xs font-mono text-red-600">
                  WARNING: AI ROASTS MAY CAUSE EMOTIONAL DAMAGE • USE AT YOUR OWN RISK
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VoiceAgentPage() {
  return <OpenAIVisionMVP />;
}
