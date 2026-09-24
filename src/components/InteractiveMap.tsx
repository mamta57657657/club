import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus, Crosshair, MapPin, Layers, Maximize2, Sparkles, Navigation, Globe } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { Club } from '../types';

interface InteractiveMapProps {
  clubs: Club[];
  selectedClubId?: string | null;
  hoveredClubId?: string | null;
  onSelectClub?: (club: Club) => void;
  onHoverClub?: (clubId: string | null) => void;
  showRoute?: boolean;
  className?: string;
  heightClass?: string;
  showSearchPill?: boolean;
  searchLocationText?: string;
  bottomActionText?: string;
  onBottomAction?: () => void;
}

// Custom dark luxury palette for Google Maps
const LUXURY_DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#0b1420' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#09101a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8fa3bf' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d4af65' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b829e' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#0e1c2c' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#567585' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#162538' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1c324c' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca3af' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#27394f' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1b2a3c' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#cca55e' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#060d16' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#2f4968' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#060d16' }]
  }
];

// Inner controller to connect map zoom & recenter controls and draw route
const MapCameraController: React.FC<{
  clubs: Club[];
  showRoute: boolean;
  selectedClubId?: string | null;
  hoveredClubId?: string | null;
  triggerZoomIn: number;
  triggerZoomOut: number;
  triggerRecenter: number;
}> = ({ clubs, showRoute, selectedClubId, hoveredClubId, triggerZoomIn, triggerZoomOut, triggerRecenter }) => {
  const map = useMap();
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  // Zoom In
  useEffect(() => {
    if (!map || triggerZoomIn === 0) return;
    const currentZoom = map.getZoom() || 12;
    map.setZoom(Math.min(currentZoom + 1, 19));
  }, [map, triggerZoomIn]);

  // Zoom Out
  useEffect(() => {
    if (!map || triggerZoomOut === 0) return;
    const currentZoom = map.getZoom() || 12;
    map.setZoom(Math.max(currentZoom - 1, 5));
  }, [map, triggerZoomOut]);

  // Recenter
  useEffect(() => {
    if (!map || triggerRecenter === 0) return;
    map.panTo({ lat: 25.820, lng: -80.126 });
    map.setZoom(12);
  }, [map, triggerRecenter]);

  // Pan smoothly to hovered club
  useEffect(() => {
    if (!map || !hoveredClubId) return;
    const club = clubs.find((c) => c.id === hoveredClubId);
    if (club?.coordinates) {
      map.panTo({ lat: club.coordinates.lat, lng: club.coordinates.lng });
      const currentZoom = map.getZoom() || 12;
      if (currentZoom < 13) {
        map.setZoom(14);
      }
    }
  }, [map, hoveredClubId, clubs]);

  // Pan to selected club if selected
  useEffect(() => {
    if (!map || !selectedClubId) return;
    const club = clubs.find((c) => c.id === selectedClubId);
    if (club?.coordinates) {
      map.panTo({ lat: club.coordinates.lat, lng: club.coordinates.lng });
      map.setZoom(15);
    }
  }, [map, selectedClubId, clubs]);

  // Draw Route Polyline
  useEffect(() => {
    if (!map || !window.google?.maps) return;

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    if (showRoute) {
      const path = [
        { lat: 25.8385, lng: -80.1205 }, // 1: The Bath Club
        { lat: 25.8770, lng: -80.1220 }, // 2: The Surf Club
        { lat: 25.8165, lng: -80.1235 }, // 4: Soho Beach House
        { lat: 25.7595, lng: -80.1410 }  // 3: Fisher Island Club
      ];

      const polyline = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: '#d4af65',
        strokeOpacity: 0.95,
        strokeWeight: 3.5,
        map
      });

      polylineRef.current = polyline;
    }

    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
    };
  }, [map, showRoute, clubs]);

  return null;
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  clubs,
  selectedClubId,
  hoveredClubId: externalHoveredClubId,
  onSelectClub,
  onHoverClub,
  showRoute = false,
  className = '',
  heightClass = 'h-full min-h-[500px]',
  showSearchPill = true,
  searchLocationText = 'Miami Beach, FL',
  bottomActionText = 'View All Clubs',
  onBottomAction
}) => {
  const [mapEngine, setMapEngine] = useState<'google' | 'artistic'>('google');
  const [googleMapType, setGoogleMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');
  const [internalHoveredClubId, setInternalHoveredClubId] = useState<string | null>(null);

  const activeHoveredId = externalHoveredClubId !== undefined ? externalHoveredClubId : internalHoveredClubId;

  // Zoom triggers for camera controller
  const [zoomInCount, setZoomInCount] = useState(0);
  const [zoomOutCount, setZoomOutCount] = useState(0);
  const [recenterCount, setRecenterCount] = useState(0);

  // Fallback vector zoom level
  const [vectorZoom, setVectorZoom] = useState<number>(1);

  const apiKey =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyCMZhZ_5TXAHbi3ZsOfFqO7Jn4DN5n8YI4';
  const mapId =
    import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID';

  const handleZoomIn = () => {
    if (mapEngine === 'google') {
      setZoomInCount((c) => c + 1);
    } else {
      setVectorZoom((prev) => Math.min(prev + 0.2, 1.8));
    }
  };

  const handleZoomOut = () => {
    if (mapEngine === 'google') {
      setZoomOutCount((c) => c + 1);
    } else {
      setVectorZoom((prev) => Math.max(prev - 0.2, 0.8));
    }
  };

  const handleReset = () => {
    if (mapEngine === 'google') {
      setRecenterCount((c) => c + 1);
    } else {
      setVectorZoom(1);
    }
  };

  const toggleMapLayer = () => {
    if (mapEngine === 'google') {
      if (googleMapType === 'roadmap') {
        setGoogleMapType('satellite');
      } else {
        setGoogleMapType('roadmap');
      }
    } else {
      setMapEngine('google');
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#1b2a3e] bg-[#0c1825] shadow-2xl ${heightClass} ${className} select-none`}
    >
      {/* Top Location Pill / Search */}
      {showSearchPill && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#09111b]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#23354c] text-xs font-medium text-slate-200 shadow-lg">
          <MapPin className="w-3.5 h-3.5 text-[#d4af65]" />
          <span>{searchLocationText}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </div>
      )}

      {/* Top Right: Google Map & Engine Switcher */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setMapEngine(mapEngine === 'google' ? 'artistic' : 'google')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border shadow-lg transition-all cursor-pointer ${
            mapEngine === 'google'
              ? 'bg-[#122135]/95 text-[#e5c07b] border-[#d4af65]/60'
              : 'bg-[#09111b]/90 text-slate-300 border-[#23354c] hover:text-white'
          }`}
          title="Switch map rendering engine"
        >
          <Globe className="w-3.5 h-3.5 text-[#d4af65]" />
          <span>{mapEngine === 'google' ? 'Google Maps' : 'Artistic Map'}</span>
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-16 left-4 z-20 flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="w-8 h-8 rounded-lg bg-[#09111b]/90 hover:bg-[#162538] text-slate-200 border border-[#23354c] flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="w-8 h-8 rounded-lg bg-[#09111b]/90 hover:bg-[#162538] text-slate-200 border border-[#23354c] flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          title="Recenter Map"
          className="w-8 h-8 rounded-lg bg-[#09111b]/90 hover:bg-[#162538] text-[#d4af65] border border-[#23354c] flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Crosshair className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Map Render Area */}
      {mapEngine === 'google' ? (
        <APIProvider apiKey={apiKey} libraries={['marker']}>
          <div className="w-full h-full relative">
            <Map
              mapId={mapId}
              defaultCenter={{ lat: 25.820, lng: -80.126 }}
              defaultZoom={12}
              gestureHandling="greedy"
              disableDefaultUI={true}
              mapTypeId={googleMapType}
              colorScheme="DARK"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              className="w-full h-full"
            >
              {/* Camera & Route Handler */}
              <MapCameraController
                clubs={clubs}
                showRoute={showRoute}
                selectedClubId={selectedClubId}
                hoveredClubId={activeHoveredId}
                triggerZoomIn={zoomInCount}
                triggerZoomOut={zoomOutCount}
                triggerRecenter={recenterCount}
              />

              {/* Advanced Markers for Luxury Clubs */}
              {clubs.map((club) => {
                const isSelected = selectedClubId === club.id;
                const isHovered = activeHoveredId === club.id;

                return (
                  <AdvancedMarker
                    key={club.id}
                    position={{ lat: club.coordinates.lat, lng: club.coordinates.lng }}
                    onClick={() => onSelectClub && onSelectClub(club)}
                    title={club.name}
                  >
                    <div
                      onMouseEnter={() => {
                        setInternalHoveredClubId(club.id);
                        onHoverClub?.(club.id);
                      }}
                      onMouseLeave={() => {
                        setInternalHoveredClubId(null);
                        onHoverClub?.(null);
                      }}
                      className={`relative flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                        isHovered || isSelected ? 'scale-125 z-50' : 'z-20'
                      }`}
                    >
                      {/* Number Pin with Gold Glow on Hover */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-2xl transition-all border-2 ${
                          isHovered
                            ? 'bg-[#d4af65] text-[#120e06] border-white ring-4 ring-[#d4af65]/60 shadow-[0_0_20px_#d4af65]'
                            : club.id === 'the-bath-club'
                            ? 'bg-[#d4af65] text-[#120e06] border-white shadow-[#d4af65]/50'
                            : 'bg-[#0f1b2b] text-white border-[#d4af65] hover:bg-[#1a2d44]'
                        }`}
                      >
                        {club.number}
                      </div>

                      {/* Club Label Tag */}
                      <div
                        className={`px-3 py-1.5 rounded-xl backdrop-blur-md border text-xs font-semibold whitespace-nowrap shadow-xl flex items-center gap-1.5 transition-colors ${
                          isHovered
                            ? 'bg-[#152538] border-[#d4af65] text-[#faebd0]'
                            : 'bg-[#0a1320]/95 border-[#263c56] text-white'
                        }`}
                      >
                        <span>{club.name}</span>
                        {(isSelected || isHovered) && (
                          <Sparkles className="w-3 h-3 text-[#d4af65]" />
                        )}
                      </div>

                      {/* Floating Mini Card on Hover */}
                      {isHovered && (
                        <div className="absolute top-10 left-0 w-52 rounded-xl bg-[#0c1624] border border-[#d4af65]/80 shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 pointer-events-none">
                          <div className="h-20 w-full rounded-lg overflow-hidden mb-2">
                            <img
                              src={club.image}
                              alt={club.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-xs font-bold text-slate-100">{club.name}</div>
                          <div className="text-[10px] text-slate-400 truncate">{club.address}</div>
                          <div className="text-[10px] text-[#cca55e] font-semibold mt-1">
                            {club.rating} ★ ({club.reviewsCount} reviews)
                          </div>
                        </div>
                      )}
                    </div>
                  </AdvancedMarker>
                );
              })}
            </Map>
          </div>
        </APIProvider>
      ) : (
        /* Artistic Nautical Map Fallback */
        <div
          className="w-full h-full transition-transform duration-300 ease-out origin-center flex items-center justify-center relative overflow-hidden"
          style={{ transform: `scale(${vectorZoom})` }}
        >
          <svg
            viewBox="0 0 800 1000"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e6b8c" />
                <stop offset="45%" stopColor="#2582a8" />
                <stop offset="80%" stopColor="#1a5b78" />
              </linearGradient>
              <linearGradient id="sandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a3967d" />
                <stop offset="100%" stopColor="#877a64" />
              </linearGradient>
            </defs>

            <rect width="800" height="1000" fill="url(#oceanGrad)" />

            {/* Mainland Florida */}
            <path
              d="M-50,0 L290,0 C300,120 280,240 270,360 C260,480 250,600 240,750 C230,850 200,950 170,1000 L-50,1000 Z"
              fill="url(#sandGrad)"
              stroke="#544c3c"
              strokeWidth="2"
            />

            {/* Miami Beach Barrier Island */}
            <path
              d="M480,200 C500,240 520,320 525,430 C530,520 520,620 500,720 C485,780 460,820 440,840 C430,830 435,770 445,710 C460,610 470,510 465,420 C460,330 445,260 450,220 Z"
              fill="url(#sandGrad)"
              stroke="#544c3c"
              strokeWidth="2"
            />

            {/* Fisher Island */}
            <ellipse cx="445" cy="880" rx="35" ry="25" fill="url(#sandGrad)" stroke="#544c3c" strokeWidth="2" />

            {/* Route path */}
            {showRoute && (
              <path
                d="M495,635 C520,480 505,320 515,240 C490,320 500,340 510,370 C490,520 465,720 450,875"
                fill="none"
                stroke="#d4af65"
                strokeWidth="4"
                strokeDasharray="8 6"
              />
            )}

            {/* Markers */}
            <g className="cursor-pointer" onClick={() => onSelectClub && onSelectClub(clubs[1] || clubs[0])}>
              <circle cx="515" cy="240" r="16" fill="#131e2b" stroke="#e5c07b" strokeWidth="2.5" />
              <text x="515" y="246" fill="#fdfcf8" fontSize="13" fontWeight="bold" textAnchor="middle">2</text>
            </g>

            <g className="cursor-pointer" onClick={() => onSelectClub && onSelectClub(clubs[3] || clubs[0])}>
              <circle cx="510" cy="370" r="16" fill="#131e2b" stroke="#e5c07b" strokeWidth="2.5" />
              <text x="510" y="376" fill="#fdfcf8" fontSize="13" fontWeight="bold" textAnchor="middle">4</text>
            </g>

            <g className="cursor-pointer" onClick={() => onSelectClub && onSelectClub(clubs[0])}>
              <circle cx="495" cy="635" r="17" fill="#d4af65" stroke="#ffffff" strokeWidth="2.5" />
              <text x="495" y="641" fill="#131a24" fontSize="14" fontWeight="bold" textAnchor="middle">1</text>
            </g>

            <g className="cursor-pointer" onClick={() => onSelectClub && onSelectClub(clubs[2] || clubs[0])}>
              <circle cx="445" cy="880" r="16" fill="#131e2b" stroke="#e5c07b" strokeWidth="2.5" />
              <text x="445" y="886" fill="#fdfcf8" fontSize="13" fontWeight="bold" textAnchor="middle">3</text>
            </g>
          </svg>
        </div>
      )}

      {/* Bottom Left: Map / Satellite Mode Toggle */}
      <div className="absolute bottom-4 left-4 z-20">
        <button
          onClick={toggleMapLayer}
          className="group relative flex items-center gap-2 overflow-hidden rounded-xl border border-[#23354c] bg-[#09111b]/90 p-1.5 backdrop-blur-md shadow-lg transition-all hover:border-[#d4af65]/60 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=120&q=80"
              alt="Satellite preview"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          <span className="pr-2 text-xs font-medium text-slate-200">
            {googleMapType === 'roadmap' ? 'Satellite View' : 'Map View'}
          </span>
        </button>
      </div>

      {/* Bottom Right: Action Button (View Full Map / View All Clubs) */}
      <div className="absolute bottom-4 right-4 z-20">
        <button
          onClick={onBottomAction}
          className="flex items-center gap-2 bg-[#0a1421]/90 hover:bg-[#132235] text-slate-200 border border-[#233852] px-4 py-2.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all shadow-lg hover:border-[#d4af65]/50 cursor-pointer active:scale-95"
        >
          <Maximize2 className="w-3.5 h-3.5 text-[#d4af65]" />
          <span>{bottomActionText}</span>
        </button>
      </div>
    </div>
  );
};
