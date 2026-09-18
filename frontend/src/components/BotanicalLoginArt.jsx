import React from 'react';

// Top Center Potted Plant sitting above "Welcome Back!"
export const TopPottedPlant = () => (
  <div className="top-potted-plant-wrap">
    <svg width="68" height="80" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="topPotGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#E2C1A2" />
          <stop offset="60%" stopColor="#C89B77" />
          <stop offset="100%" stopColor="#9C6B49" />
        </radialGradient>
        <linearGradient id="topRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D5A986" />
          <stop offset="50%" stopColor="#E6C9B0" />
          <stop offset="100%" stopColor="#9F6F4C" />
        </linearGradient>
        <linearGradient id="leafDark" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#1E3E26" />
          <stop offset="100%" stopColor="#3C6E41" />
        </linearGradient>
        <linearGradient id="leafMid" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#2E5C38" />
          <stop offset="100%" stopColor="#558C4F" />
        </linearGradient>
        <linearGradient id="leafLight" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#417548" />
          <stop offset="100%" stopColor="#78B166" />
        </linearGradient>
        <filter id="softPlantShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#1e3423" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Subtle Pot base shadow */}
      <ellipse cx="50" cy="114" rx="20" ry="4" fill="#243828" fillOpacity="0.15" />

      {/* Main Stems */}
      <path d="M50 85 Q50 65 50 35" stroke="#234626" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M50 78 Q42 62 30 45" stroke="#234626" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M50 78 Q58 60 70 42" stroke="#234626" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M50 65 Q36 50 26 30" stroke="#234626" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 62 Q66 52 75 32" stroke="#234626" strokeWidth="2" strokeLinecap="round" />

      {/* Foliage - Layer 1 (Back / Darker) */}
      <path d="M30 44 C22 40 18 30 25 22 C32 15 40 25 33 38 C31 42 30 44 30 44 Z" fill="url(#leafDark)" />
      <path d="M70 42 C78 38 84 28 77 20 C70 14 62 23 68 36 C69 40 70 42 70 42 Z" fill="url(#leafDark)" />
      <path d="M50 35 C42 22 44 10 50 5 C57 10 58 22 51 34 Z" fill="url(#leafDark)" />

      {/* Foliage - Layer 2 (Mid tier) */}
      <path d="M26 30 C16 26 14 14 22 8 C29 4 36 14 31 25 Z" fill="url(#leafMid)" />
      <path d="M75 32 C85 28 88 16 80 10 C72 5 66 16 71 27 Z" fill="url(#leafMid)" />
      <path d="M42 55 C32 46 28 35 37 28 C45 22 50 34 46 48 Z" fill="url(#leafMid)" />
      <path d="M58 55 C68 46 72 35 63 28 C55 22 50 34 54 48 Z" fill="url(#leafMid)" />

      {/* Foliage - Layer 3 (Foreground & Highlights) */}
      <path d="M36 65 C26 60 25 50 33 44 C42 38 46 48 41 58 Z" fill="url(#leafLight)" />
      <path d="M64 65 C74 60 75 50 67 44 C58 38 54 48 59 58 Z" fill="url(#leafLight)" />
      <path d="M46 45 C38 34 42 24 49 20 C56 24 55 35 48 44 Z" fill="url(#leafLight)" />
      <path d="M50 25 C45 16 48 8 52 5 C56 8 57 16 53 25 Z" fill="url(#leafLight)" />

      {/* Leaf Central Veins */}
      <path d="M50 33 Q50 20 51 8" stroke="#7bb870" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      <path d="M44 46 Q38 35 34 29" stroke="#7bb870" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      <path d="M56 46 Q62 35 66 29" stroke="#7bb870" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />

      {/* Pot Body */}
      <g filter="url(#softPlantShadow)">
        {/* Pot Rim */}
        <rect x="30" y="78" width="40" height="7" rx="3.5" fill="url(#topRimGrad)" />
        {/* Pot Base */}
        <path d="M33 85 L39 110 Q40 112 43 112 L57 112 Q60 112 61 110 L67 85 Z" fill="url(#topPotGrad)" />
        {/* Pot highlight streak */}
        <path d="M41 87 L45 109 C45 109 46 109 47 109 L44 87 Z" fill="#FFFFFF" fillOpacity="0.25" />
      </g>
    </svg>
  </div>
);

// Top Left Corner Branch with leaves cascading inward
export const TopLeftBotanical = () => (
  <div className="corner-plant-tl" aria-hidden="true">
    <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tlLeaf1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A7545" />
          <stop offset="100%" stopColor="#2D4D28" />
        </linearGradient>
        <linearGradient id="tlLeaf2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#679758" />
          <stop offset="100%" stopColor="#3C6834" />
        </linearGradient>
        <linearGradient id="tlLeaf3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7EAB6D" />
          <stop offset="100%" stopColor="#47733E" />
        </linearGradient>
      </defs>

      {/* Main Arching Stem */}
      <path d="M-10 10 Q60 25 110 80 Q130 105 145 135" stroke="#375533" strokeWidth="3" strokeLinecap="round" />

      {/* Leaf 1 (Top edge) */}
      <path d="M30 18 C45 5 70 8 80 25 C75 42 55 42 35 28 Z" fill="url(#tlLeaf2)" />
      <path d="M32 20 Q55 22 76 25" stroke="#87B774" strokeWidth="0.9" opacity="0.6" />

      {/* Leaf 2 (Upper right) */}
      <path d="M65 32 C85 20 115 28 122 46 C115 62 90 60 70 42 Z" fill="url(#tlLeaf1)" />
      <path d="M68 34 Q92 38 118 45" stroke="#7BB068" strokeWidth="0.9" opacity="0.6" />

      {/* Leaf 3 (Middle branch offshoot) */}
      <path d="M85 58 C70 65 52 82 58 102 C74 105 92 88 92 68 Z" fill="url(#tlLeaf3)" />
      <path d="M86 62 Q74 80 62 98" stroke="#9FD48B" strokeWidth="0.9" opacity="0.6" />

      {/* Leaf 4 (Downwards extension) */}
      <path d="M102 75 C122 68 148 80 152 100 C140 115 118 110 105 88 Z" fill="url(#tlLeaf2)" />
      <path d="M104 78 Q125 87 148 98" stroke="#87B774" strokeWidth="0.9" opacity="0.6" />

      {/* Leaf 5 (Lower leaf) */}
      <path d="M125 108 C115 125 105 148 118 165 C132 162 145 142 135 120 Z" fill="url(#tlLeaf1)" />
      <path d="M127 112 Q122 134 120 158" stroke="#7BB068" strokeWidth="0.9" opacity="0.6" />

      {/* Tip Leaf */}
      <path d="M142 130 C155 138 168 155 165 170 C152 172 140 160 138 142 Z" fill="url(#tlLeaf3)" />
    </svg>
  </div>
);

// Bottom Left Botanical Stem rising upward
export const BottomLeftBotanical = () => (
  <div className="corner-plant-bl" aria-hidden="true">
    <svg width="140" height="220" viewBox="0 0 160 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blLeaf1" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#254727" />
          <stop offset="100%" stopColor="#4A7E46" />
        </linearGradient>
        <linearGradient id="blLeaf2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#366037" />
          <stop offset="100%" stopColor="#679F5A" />
        </linearGradient>
        <linearGradient id="blLeaf3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#447343" />
          <stop offset="100%" stopColor="#77B665" />
        </linearGradient>
      </defs>

      {/* Main Upward Stem */}
      <path d="M-10 270 Q45 220 50 140 Q55 90 70 30" stroke="#2B4D29" strokeWidth="3.5" strokeLinecap="round" />

      {/* Leaf 1 (Lowest left) */}
      <path d="M22 230 C2 210 -8 185 10 168 C30 162 45 185 30 220 Z" fill="url(#blLeaf1)" />

      {/* Leaf 2 (Lowest right pointing in) */}
      <path d="M35 205 C55 190 85 198 92 220 C82 238 52 235 38 215 Z" fill="url(#blLeaf2)" />
      <path d="M37 208 Q60 208 85 218" stroke="#87BE76" strokeWidth="0.9" opacity="0.6" />

      {/* Leaf 3 (Middle upward left) */}
      <path d="M45 160 C25 140 18 115 35 100 C52 98 62 120 52 152 Z" fill="url(#blLeaf1)" />
      <path d="M47 155 Q35 132 32 108" stroke="#689E56" strokeWidth="0.9" opacity="0.6" />

      {/* Leaf 4 (Middle right leaf pointing right) */}
      <path d="M50 135 C72 118 110 120 125 140 C118 162 82 165 58 142 Z" fill="url(#blLeaf3)" />
      <path d="M53 137 Q85 134 118 140" stroke="#9AD385" strokeWidth="0.9" opacity="0.6" />

      {/* Leaf 5 (Upper left) */}
      <path d="M55 95 C40 75 42 50 58 40 C72 45 74 68 62 90 Z" fill="url(#blLeaf2)" />

      {/* Leaf 6 (Upper right prominent leaf) */}
      <path d="M60 70 C80 50 115 52 130 72 C120 90 90 92 68 76 Z" fill="url(#blLeaf2)" />
      <path d="M62 72 Q92 66 122 73" stroke="#89C477" strokeWidth="0.9" opacity="0.6" />

      {/* Top Tip Leaf */}
      <path d="M68 35 C75 18 90 8 100 15 C102 30 90 42 75 38 Z" fill="url(#blLeaf3)" />
    </svg>
  </div>
);

// Bottom Right Potted Terracotta Plant sitting at the corner
export const BottomRightPottedPlant = () => (
  <div className="corner-plant-br" aria-hidden="true">
    <svg width="150" height="170" viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="brPotGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#E4AC80" />
          <stop offset="50%" stopColor="#C88252" />
          <stop offset="100%" stopColor="#8E4F28" />
        </radialGradient>
        <linearGradient id="brRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D89566" />
          <stop offset="50%" stopColor="#F0C29E" />
          <stop offset="100%" stopColor="#9C5930" />
        </linearGradient>
        <linearGradient id="brFoliageDark" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#1C3820" />
          <stop offset="100%" stopColor="#37683C" />
        </linearGradient>
        <linearGradient id="brFoliageMid" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#2F5B34" />
          <stop offset="100%" stopColor="#558C52" />
        </linearGradient>
        <linearGradient id="brFoliageLight" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#437748" />
          <stop offset="100%" stopColor="#78B369" />
        </linearGradient>
        <filter id="brDropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-2" dy="5" stdDeviation="4" floodColor="#1e3423" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Foliage Back Stems & Leaves */}
      <path d="M100 120 Q85 85 55 50" stroke="#254228" strokeWidth="3" strokeLinecap="round" />
      <path d="M100 120 Q105 75 100 25" stroke="#254228" strokeWidth="3" strokeLinecap="round" />
      <path d="M100 120 Q125 80 145 45" stroke="#254228" strokeWidth="2.5" strokeLinecap="round" />

      {/* Layer 1 Leaves */}
      <path d="M48 55 C32 48 20 28 35 15 C50 6 65 24 55 45 Z" fill="url(#brFoliageDark)" />
      <path d="M98 30 C88 12 95 -2 108 0 C120 4 120 22 105 32 Z" fill="url(#brFoliageDark)" />
      <path d="M140 50 C155 35 168 40 162 58 C155 72 138 68 135 55 Z" fill="url(#brFoliageDark)" />

      {/* Layer 2 Leaves */}
      <path d="M60 85 C38 75 32 50 48 38 C64 28 78 50 68 76 Z" fill="url(#brFoliageMid)" />
      <path d="M80 60 C65 42 70 20 85 15 C100 12 108 30 92 55 Z" fill="url(#brFoliageLight)" />
      <path d="M110 65 C125 45 145 48 150 65 C150 82 130 85 118 72 Z" fill="url(#brFoliageMid)" />

      {/* Layer 3 Lower bushier foliage */}
      <path d="M70 110 C50 95 48 75 64 65 C80 58 90 78 80 102 Z" fill="url(#brFoliageMid)" />
      <path d="M90 95 C80 72 88 52 102 50 C115 50 120 70 105 90 Z" fill="url(#brFoliageLight)" />
      <path d="M115 105 C132 90 148 92 145 110 C140 125 122 122 115 110 Z" fill="url(#brFoliageMid)" />
      <path d="M65 125 C45 118 42 105 52 95 C65 88 78 102 70 122 Z" fill="url(#brFoliageLight)" />

      {/* Soil base */}
      <ellipse cx="102" cy="126" rx="35" ry="8" fill="#3D291D" />

      {/* Terracotta Planter Pot with Rim */}
      <g filter="url(#brDropShadow)">
        {/* Pot Rim */}
        <rect x="62" y="122" width="78" height="14" rx="5" fill="url(#brRimGrad)" />
        <rect x="63" y="123" width="76" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.28" />

        {/* Tapered Pot Body */}
        <path d="M68 136 L78 172 Q80 176 86 176 L118 176 Q124 176 126 172 L136 136 Z" fill="url(#brPotGrad)" />
        {/* Subtle highlight curve */}
        <path d="M82 138 L89 171 C90 171 92 171 94 171 L88 138 Z" fill="#FFFFFF" fillOpacity="0.22" />
      </g>
    </svg>
  </div>
);

// Top Right Corner Branch with leaves cascading inward (for Signup screen)
export const TopRightBotanical = () => (
  <div className="corner-plant-tr" aria-hidden="true">
    <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trLeaf1" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A7545" />
          <stop offset="100%" stopColor="#2D4D28" />
        </linearGradient>
        <linearGradient id="trLeaf2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#679758" />
          <stop offset="100%" stopColor="#3C6834" />
        </linearGradient>
        <linearGradient id="trLeaf3" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7EAB6D" />
          <stop offset="100%" stopColor="#47733E" />
        </linearGradient>
      </defs>

      {/* Main Arching Stem from top right */}
      <path d="M210 10 Q140 25 90 80 Q70 105 55 135" stroke="#375533" strokeWidth="3" strokeLinecap="round" />

      {/* Leaf 1 (Top edge) */}
      <path d="M170 18 C155 5 130 8 120 25 C125 42 145 42 165 28 Z" fill="url(#trLeaf2)" />
      <path d="M168 20 Q145 22 124 25" stroke="#87B774" strokeWidth="0.9" opacity="0.6" />

      {/* Leaf 2 */}
      <path d="M135 32 C115 20 85 28 78 46 C85 62 110 60 130 42 Z" fill="url(#trLeaf1)" />
      <path d="M132 34 Q108 38 82 45" stroke="#7BB068" strokeWidth="0.9" opacity="0.6" />

      {/* Leaf 3 */}
      <path d="M115 58 C130 65 148 82 142 102 C126 105 108 88 108 68 Z" fill="url(#trLeaf3)" />
      <path d="M114 62 Q126 80 138 98" stroke="#9FD48B" strokeWidth="0.9" opacity="0.6" />

      {/* Leaf 4 */}
      <path d="M98 75 C78 68 52 80 48 100 C60 115 82 110 95 88 Z" fill="url(#trLeaf2)" />
      <path d="M96 78 Q75 87 52 98" stroke="#87B774" strokeWidth="0.9" opacity="0.6" />

      {/* Leaf 5 */}
      <path d="M75 108 C85 125 95 148 82 165 C68 162 55 142 65 120 Z" fill="url(#trLeaf1)" />

      {/* Tip Leaf */}
      <path d="M58 130 C45 138 32 155 35 170 C48 172 60 160 62 142 Z" fill="url(#trLeaf3)" />
    </svg>
  </div>
);

// Bottom Right Dual Potted Plants (Main terracotta planter + miniature companion pot)
export const BottomRightDualPottedPlants = () => (
  <div className="corner-plant-br dual-plants" aria-hidden="true">
    <svg width="170" height="180" viewBox="0 0 180 190" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dualPotGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#E4AC80" />
          <stop offset="50%" stopColor="#C88252" />
          <stop offset="100%" stopColor="#8E4F28" />
        </radialGradient>
        <linearGradient id="dualRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D89566" />
          <stop offset="50%" stopColor="#F0C29E" />
          <stop offset="100%" stopColor="#9C5930" />
        </linearGradient>
        <radialGradient id="miniPotGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#E0BD9D" />
          <stop offset="60%" stopColor="#C29472" />
          <stop offset="100%" stopColor="#8C5C38" />
        </radialGradient>
        <linearGradient id="dFoliageDark" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#1C3820" />
          <stop offset="100%" stopColor="#37683C" />
        </linearGradient>
        <linearGradient id="dFoliageMid" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#2F5B34" />
          <stop offset="100%" stopColor="#558C52" />
        </linearGradient>
        <linearGradient id="dFoliageLight" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#437748" />
          <stop offset="100%" stopColor="#78B369" />
        </linearGradient>
        <filter id="dualDropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-2" dy="5" stdDeviation="4" floodColor="#1e3423" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* --- MINI COMPANION POTTED PLANT (to the left) --- */}
      <g className="mini-companion-plant" transform="translate(14, 28)">
        {/* Mini plant shadow */}
        <ellipse cx="28" cy="154" rx="14" ry="3.5" fill="#243828" fillOpacity="0.2" />

        {/* Mini plant stems */}
        <path d="M28 140 Q24 125 18 112" stroke="#254228" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M28 140 Q32 120 30 102" stroke="#254228" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M28 140 Q36 128 42 118" stroke="#254228" strokeWidth="1.6" strokeLinecap="round" />

        {/* Mini plant leaves */}
        <path d="M18 112 C10 108 8 96 16 90 C22 86 26 95 21 106 Z" fill="url(#dFoliageMid)" />
        <path d="M30 102 C25 90 28 78 35 78 C41 80 40 94 32 102 Z" fill="url(#dFoliageLight)" />
        <path d="M42 118 C50 112 55 102 48 98 C42 96 38 106 41 116 Z" fill="url(#dFoliageDark)" />
        <path d="M24 126 C15 120 18 110 24 112 C28 114 28 122 25 126 Z" fill="url(#dFoliageLight)" />

        {/* Mini Terracotta Pot */}
        <rect x="18" y="136" width="20" height="4" rx="2" fill="#D59A6D" />
        <path d="M20 140 L23 153 Q24 154 26 154 L30 154 Q32 154 33 153 L36 140 Z" fill="url(#miniPotGrad)" />
      </g>

      {/* --- MAIN LARGE POTTED PLANT --- */}
      <g className="main-potted-plant" transform="translate(20, 0)">
        {/* Main stems */}
        <path d="M100 120 Q85 85 55 50" stroke="#254228" strokeWidth="3" strokeLinecap="round" />
        <path d="M100 120 Q105 75 100 25" stroke="#254228" strokeWidth="3" strokeLinecap="round" />
        <path d="M100 120 Q125 80 145 45" stroke="#254228" strokeWidth="2.5" strokeLinecap="round" />

        {/* Leaves Layer 1 */}
        <path d="M48 55 C32 48 20 28 35 15 C50 6 65 24 55 45 Z" fill="url(#dFoliageDark)" />
        <path d="M98 30 C88 12 95 -2 108 0 C120 4 120 22 105 32 Z" fill="url(#dFoliageDark)" />
        <path d="M140 50 C155 35 168 40 162 58 C155 72 138 68 135 55 Z" fill="url(#dFoliageDark)" />

        {/* Leaves Layer 2 */}
        <path d="M60 85 C38 75 32 50 48 38 C64 28 78 50 68 76 Z" fill="url(#dFoliageMid)" />
        <path d="M80 60 C65 42 70 20 85 15 C100 12 108 30 92 55 Z" fill="url(#dFoliageLight)" />
        <path d="M110 65 C125 45 145 48 150 65 C150 82 130 85 118 72 Z" fill="url(#dFoliageMid)" />

        {/* Leaves Layer 3 Lower bushier */}
        <path d="M70 110 C50 95 48 75 64 65 C80 58 90 78 80 102 Z" fill="url(#dFoliageMid)" />
        <path d="M90 95 C80 72 88 52 102 50 C115 50 120 70 105 90 Z" fill="url(#dFoliageLight)" />
        <path d="M115 105 C132 90 148 92 145 110 C140 125 122 122 115 110 Z" fill="url(#dFoliageMid)" />
        <path d="M65 125 C45 118 42 105 52 95 C65 88 78 102 70 122 Z" fill="url(#dFoliageLight)" />

        {/* Soil base */}
        <ellipse cx="102" cy="126" rx="35" ry="8" fill="#3D291D" />

        {/* Terracotta Planter Pot with Rim */}
        <g filter="url(#dualDropShadow)">
          <rect x="62" y="122" width="78" height="14" rx="5" fill="url(#dualRimGrad)" />
          <rect x="63" y="123" width="76" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.28" />
          <path d="M68 136 L78 172 Q80 176 86 176 L118 176 Q124 176 126 172 L136 136 Z" fill="url(#dualPotGrad)" />
          <path d="M82 138 L89 171 C90 171 92 171 94 171 L88 138 Z" fill="#FFFFFF" fillOpacity="0.22" />
        </g>
      </g>
    </svg>
  </div>
);

// Soft Botanical Shadow/Bokeh background elements
export const DappledLeafShadows = () => (
  <div className="dappled-shadow-layer" aria-hidden="true">
    <div className="leaf-shadow-spot shadow-top-right" />
    <div className="leaf-shadow-spot shadow-top-left" />
    <div className="leaf-shadow-spot shadow-mid-left" />
    <div className="leaf-shadow-spot shadow-bottom-right" />
  </div>
);

// Google 'G' Logo
export const GoogleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      fill="#4285F4"
    />
    <path
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      fill="#34A853"
    />
    <path
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      fill="#FBBC05"
    />
    <path
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      fill="#EA4335"
    />
  </svg>
);

// Apple Solid Black Logo
export const AppleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 170 170" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.3-9.59-11.24-20.73-14.83-33.43-3.59-12.7-5.38-24.32-5.38-34.88 0-16.14 4.12-29.58 12.35-40.32 8.23-10.74 18.59-16.18 31.08-16.3 5.48 0 11.45 1.44 17.9 4.33 6.46 2.89 10.74 4.39 12.85 4.5 1.64 0 6.13-1.6 13.48-4.8 7.35-3.2 13.75-4.57 19.2-4.12 14.18.99 25.13 6.13 32.84 15.42-12.28 7.46-18.28 17.57-18.01 30.33.28 10.02 4.16 18.39 11.64 25.1 7.48 6.72 16.48 10.5 27 11.35-2.23 7.02-4.99 14.28-8.27 21.78zM119.22 33.56c0-7.79 2.78-15.09 8.33-21.9 5.55-6.81 12.44-11.02 20.67-12.63.22 1.34.33 2.56.33 3.67 0 7.79-2.9 15.19-8.71 22.21-5.81 7.02-12.92 11.13-21.34 12.33-.45-1.22-.67-2.45-.67-3.68z" />
  </svg>
);
