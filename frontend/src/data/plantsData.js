export const PLANTS_DATA = [
  {
    id: "tulsi",
    name: "Tulsi (Holy Basil)",
    botanicalName: "Ocimum sanctum",
    type: "Medicinal",
    category: "medicinal",
    environment: "Indoor/Outdoor",
    care: "Easy",
    light: "Bright Sunlight",
    water: "Moderate (Daily light watering)",
    soil: "Well-draining loamy soil",
    size: "Small",
    temperature: "20°C - 35°C",
    benefits: ["Boosts immunity", "Purifies surrounding air", "Soothes respiratory ailments"],
    goodFor: ["home temple", "balcony garden", "herbal tea", "spiritual well-being"],
    tags: ["tulsi", "holy basil", "medicinal", "balcony", "fragrant", "sacred"],
    description: "A revered sacred herb with powerful adaptogenic and medicinal properties. Thrives in sunny courtyards and airy balconies.",
    image: "https://images.unsplash.com/photo-1632121055175-5b6f3ce77aee?auto=format&fit=crop&w=900&q=80",
    careGuide: {
      sunlight: "Requires 4-6 hours of direct sunshine daily for optimal essential oil concentration.",
      watering: "Water gently whenever the top 1 inch of soil feels dry. Never allow water to pool at roots.",
      fertilizer: "Feed organic vermicompost every 3-4 weeks during spring and summer.",
      pruning: "Pinch off flower blossoms (manjaris) regularly to stimulate dense, bushy foliage."
    }
  },
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    botanicalName: "Aloe barbadensis Miller",
    type: "Medicinal",
    category: "medicinal",
    environment: "Indoor",
    care: "Easy",
    light: "Bright Indirect",
    water: "Low (Every 2-3 weeks)",
    soil: "Cactus / Succulent sandy mix",
    size: "Small",
    temperature: "15°C - 30°C",
    benefits: ["Soothes skin burns", "Deeply hydrates skin", "Absorbs benzene and formaldehyde"],
    goodFor: ["sunny windowsill", "skincare enthusiast", "beginners", "low maintenance"],
    tags: ["aloe vera", "succulent", "medicinal", "indoor", "beginner", "skin"],
    description: "A resilient succulent featuring thick, fleshy leaves packed with healing gel. Virtually indestructible for beginners.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    careGuide: {
      sunlight: "Loves bright, filtered light. Too much intense midday summer sun can scorch the leaf tips.",
      watering: "Follow the soak-and-dry method. Let the pot dry out completely before deep watering.",
      fertilizer: "Requires minimal feeding. A dilute balanced liquid feed once in spring is plenty.",
      pruning: "Harvest mature outermost lower leaves for natural skincare applications."
    }
  },
  {
    id: "snake-plant",
    name: "Snake Plant (Sansevieria)",
    botanicalName: "Dracaena trifasciata",
    type: "Air Purifying",
    category: "indoor",
    environment: "Indoor",
    care: "Easy",
    light: "Low to Bright Indirect",
    water: "Low (Once a month in winter)",
    soil: "Free-draining porous potting mix",
    size: "Medium",
    temperature: "15°C - 32°C",
    benefits: ["NASA clean air champ", "Produces oxygen at night", "Extremely drought tolerant"],
    goodFor: ["bedroom", "executive office", "low light corners", "frequent travelers"],
    tags: ["snake plant", "sansevieria", "indoor", "low light", "air purifying", "hardy"],
    description: "Architectural upright spear-shaped foliage with striking yellow-green variegation. The ultimate zero-fuss houseplant.",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32a36d5?auto=format&fit=crop&w=900&q=80",
    careGuide: {
      sunlight: "Adapts to nearly any light condition from dim bedrooms to sunny living rooms.",
      watering: "Water sparingly. Overwatering is the only real danger; when in doubt, wait a week.",
      fertilizer: "Feed twice a year (spring and mid-summer) with standard houseplant fertilizer.",
      pruning: "Wipe sword leaves occasionally with a damp cloth to clear dust and allow photosynthesis."
    }
  },
  {
    id: "money-plant",
    name: "Golden Pothos (Money Plant)",
    botanicalName: "Epipremnum aureum",
    type: "Decorative",
    category: "indoor",
    environment: "Indoor",
    care: "Easy",
    light: "Medium to Bright Indirect",
    water: "Moderate (Weekly)",
    soil: "Nutrient-rich potting soil",
    size: "Medium",
    temperature: "18°C - 30°C",
    benefits: ["Symbol of prosperity", "Cleans airborne toxins", "Easy water propagation"],
    goodFor: ["hanging planters", "bookshelves", "living room desk", "propagation jars"],
    tags: ["money plant", "pothos", "vining", "decorative", "indoor", "prosperity"],
    description: "A lustrous trailing vine with heart-shaped leaves splashed in gold and emerald. Can grow in both soil pots and glass water vases.",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=80",
    careGuide: {
      sunlight: "Thrives in medium to bright ambient room light. Can tolerate artificial office lighting.",
      watering: "Allow the upper 2 inches of soil to dry out before giving a steady soak.",
      fertilizer: "Monthly application of liquid seaweed or balanced houseplant fertilizer in growing season.",
      pruning: "Snip vine tips to promote bushy growth or root cuttings in water."
    }
  },
  {
    id: "monstera",
    name: "Monstera Deliciosa (Swiss Cheese Plant)",
    botanicalName: "Monstera deliciosa",
    type: "Decorative",
    category: "indoor",
    environment: "Indoor",
    care: "Moderate",
    light: "Bright Indirect",
    water: "Moderate (Every 7-10 days)",
    soil: "Peat-rich chunky aroid soil",
    size: "Large",
    temperature: "18°C - 28°C",
    benefits: ["Bold tropical statement", "Naturally humidifies air", "Generates aerial roots"],
    goodFor: ["spacious living rooms", "statement corners", "interior photography", "modern aesthetics"],
    tags: ["monstera", "swiss cheese", "tropical", "statement", "large", "indoor"],
    description: "Famous for its huge glossy leaves that split with natural dramatic fenestrations as the plant matures.",
    image: "https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=900&q=80",
    careGuide: {
      sunlight: "Prefers gentle, dappled or bright indirect light. Avoid harsh direct afternoon heat.",
      watering: "Water thoroughly when the top half of soil feels dry. Ensure pot drainage holes are free.",
      fertilizer: "Feed monthly throughout active spring and summer months.",
      pruning: "Support climbing stems with a coco-coir or sphagnum moss pole."
    }
  },
  {
    id: "jasmine",
    name: "Jasmine (Mogra)",
    botanicalName: "Jasminum sambac",
    type: "Flowering",
    category: "flowering",
    environment: "Outdoor",
    care: "Moderate",
    light: "Full Sun",
    water: "Regular (Keep moist)",
    soil: "Rich, well-draining garden soil",
    size: "Medium",
    temperature: "20°C - 38°C",
    benefits: ["Intoxicating fragrance", "Attracts pollinators", "Traditional aromatic flowers"],
    goodFor: ["sun terrace", "fences & trellises", "courtyard pots", "flower garlands"],
    tags: ["jasmine", "mogra", "flowering", "fragrant", "outdoor", "white flowers"],
    description: "An enchanting perennial shrub producing intensely sweet-scented pure white blossoms that perfume the evening breeze.",
    image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=900&q=80",
    careGuide: {
      sunlight: "Needs at least 6 hours of full direct sunlight to produce prolific flower buds.",
      watering: "Keep the soil consistently moist during hot blooming periods, but not waterlogged.",
      fertilizer: "Apply phosphorus-rich fertilizer or bone meal every 20 days during flowering season.",
      pruning: "Lightly prune branches post-flowering to encourage vigorous fresh shoots."
    }
  },
  {
    id: "rose",
    name: "Hybrid Tea Rose",
    botanicalName: "Rosa rubiginosa",
    type: "Flowering",
    category: "flowering",
    environment: "Outdoor",
    care: "Moderate to High",
    light: "Full Sun",
    water: "Regular (Deep morning watering)",
    soil: "Clay loam with compost",
    size: "Medium",
    temperature: "15°C - 30°C",
    benefits: ["Stunning visual beauty", "Delicate natural perfume", "Edible rose petals (Gulkand)"],
    goodFor: ["flower beds", "sunny garden borders", "cut flower vases", "balcony planter boxes"],
    tags: ["rose", "flowering", "outdoor", "colorful", "fragrant", "classic"],
    description: "The timeless queen of flowers, showcasing velvety petals in striking tones with classic elegance.",
    image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=900&q=80",
    careGuide: {
      sunlight: "Demands 6+ hours of uninterrupted morning sunlight to prevent fungal leaf mildew.",
      watering: "Water at the soil base rather than the leaves to keep foliage crisp and disease-free.",
      fertilizer: "Feed composted manure or balanced rose food monthly.",
      pruning: "Deadhead spent blossoms promptly to stimulate continuous bud cycles."
    }
  },
  {
    id: "areca-palm",
    name: "Areca Palm",
    botanicalName: "Dypsis lutescens",
    type: "Air Purifying",
    category: "indoor",
    environment: "Indoor",
    care: "Moderate",
    light: "Bright Filtered",
    water: "Moderate (Keep barely moist)",
    soil: "Peat-based potting soil",
    size: "Large",
    temperature: "18°C - 28°C",
    benefits: ["Natural humidifier", "Absorbs airborne xylene", "Lush architectural silhouette"],
    goodFor: ["room corners", "office reception", "tropical interior vibes", "partition greenery"],
    tags: ["areca palm", "indoor", "decorative", "large", "air purifying", "palm"],
    description: "Feathery, arching fronds form a vibrant tropical canopy that softens architectural lines and purifies room air.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
    careGuide: {
      sunlight: "Prefers soft, bright indirect sun. Direct scorching sunlight can cause fronds to yellow.",
      watering: "Water when soil surface dries out. Use filtered water if your tap water is hard.",
      fertilizer: "Feed a light liquid foliage fertilizer every 2 months in spring and summer.",
      pruning: "Snip old brown outer fronds at the base to maintain a clean appearance."
    }
  },
  {
    id: "peace-lily",
    name: "Peace Lily",
    botanicalName: "Spathiphyllum wallisii",
    type: "Air Purifying",
    category: "indoor",
    environment: "Indoor",
    care: "Easy",
    light: "Low to Medium",
    water: "Moderate (Drops slightly when thirsty)",
    soil: "Rich, well-aerated potting mix",
    size: "Medium",
    temperature: "18°C - 26°C",
    benefits: ["Indicates when thirsty", "Removes mold spores", "Graceful white spathe flowers"],
    goodFor: ["bedrooms", "shaded living rooms", "office desks", "sympathy gift"],
    tags: ["peace lily", "flowering", "air purifying", "low light", "indoor", "easy"],
    description: "Deep emerald foliage topped by elegant white spathe blooms. Remarkable for telling you when it needs water by slightly drooping.",
    image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=900&q=80",
    careGuide: {
      sunlight: "Flourishes in medium or low shaded ambient light. Keep away from cold drafts.",
      watering: "Water thoroughly when leaves show the slightest nod. It will bounce right back within hours.",
      fertilizer: "Apply diluted houseplant fertilizer once every 6 weeks during growth season.",
      pruning: "Trim faded flowers and yellowed leaf stems close to soil line."
    }
  },
  {
    id: "jade-plant",
    name: "Jade Plant (Good Luck Plant)",
    botanicalName: "Crassula ovata",
    type: "Succulent",
    category: "succulent",
    environment: "Indoor/Outdoor",
    care: "Easy",
    light: "Bright Sun",
    water: "Low (Every 2-3 weeks)",
    soil: "Cactus grit and perlite blend",
    size: "Small to Medium",
    temperature: "15°C - 32°C",
    benefits: ["Feng Shui wealth symbol", "Tree-like bonsai structure", "Drought resilient"],
    goodFor: ["office desks", "front entrance", "windowsills", "bonsai styling"],
    tags: ["jade plant", "succulent", "good luck", "indoor", "easy", "feng shui"],
    description: "Plump, coin-shaped jade-green leaves growing on sturdy woody stems resembling a miniature tree of life.",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=80",
    careGuide: {
      sunlight: "Needs 4+ hours of sunshine to develop thick stems and reddish leaf borders.",
      watering: "Let the potting mix dry out completely between waterings. Never allow roots to sit in damp soil.",
      fertilizer: "Light feeding once in early spring and once in mid-summer.",
      pruning: "Prune branches to shape into a majestic miniature canopy."
    }
  }
];

export const CATEGORIES_DATA = [
  {
    id: "indoor",
    title: "Indoor Plants",
    badge: "Home & Office",
    icon: "Home",
    count: 14,
    description: "Plants engineered by nature to thrive in filtered ambient light, purify stagnant room air, and enhance interior aesthetics.",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80",
    popularExamples: ["Snake Plant", "Golden Pothos", "Monstera", "Peace Lily"]
  },
  {
    id: "outdoor",
    title: "Outdoor Plants",
    badge: "Gardens & Patios",
    icon: "Sun",
    count: 18,
    description: "Sun-loving shrubs, majestic perennials, and border greenery that elevate open-air gardens, balconies, and courtyards.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    popularExamples: ["Hybrid Tea Rose", "Jasmine", "Bougainvillea", "Hibiscus"]
  },
  {
    id: "medicinal",
    title: "Medicinal & Herbs",
    badge: "Wellness & Ayurvedic",
    icon: "Sparkles",
    count: 10,
    description: "Sacred and therapeutic botanicals packed with natural antioxidants, anti-inflammatory properties, and soothing aromatics.",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80",
    popularExamples: ["Tulsi", "Aloe Vera", "Mint (Pudina)", "Lemongrass"]
  },
  {
    id: "flowering",
    title: "Flowering Beauties",
    badge: "Vibrant Blossoms",
    icon: "Flower2",
    count: 12,
    description: "Sensory delights that burst into kaleidoscopic petals, attracting pollinators and infusing your living spaces with rich aromas.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
    popularExamples: ["Jasmine Mogra", "Rose", "Peace Lily", "Orchids"]
  },
  {
    id: "succulent",
    title: "Succulents & Cacti",
    badge: "Drought Masters",
    icon: "Droplets",
    count: 15,
    description: "Fleshy architectural treasures with specialized water storage chambers, ideal for busy plant lovers seeking effortless greenery.",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=800&q=80",
    popularExamples: ["Jade Plant", "Aloe Vera", "Echeveria", "Zebra Haworthia"]
  },
  {
    id: "air-purifying",
    title: "Air Purifying Champions",
    badge: "Clean Air Study",
    icon: "ShieldCheck",
    count: 9,
    description: "NASA-tested biofilters that strip common volatile compounds (VOCs), formaldehyde, and xylene from modern indoor atmospheres.",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32a36d5?auto=format&fit=crop&w=800&q=80",
    popularExamples: ["Snake Plant", "Areca Palm", "Spider Plant", "English Ivy"]
  }
];

export const COMPARISON_DATA = {
  features: [
    {
      name: "Light Requirements",
      indoor: "Thrives in indirect sunlight, filtered light, or artificial lamps.",
      outdoor: "Requires direct sun exposure for 4 to 8 hours daily.",
      winner: "Indoor (Flexible)"
    },
    {
      name: "Space Demand",
      indoor: "Optimized for pots, hanging baskets, and tabletop planters.",
      outdoor: "Requires wide ground spreads, deep garden soil, or large patio tubs.",
      winner: "Indoor (Compact)"
    },
    {
      name: "Maintenance & Time",
      indoor: "Low to medium. Sheltered from weather extremes and lawn pests.",
      outdoor: "Medium to high. Susceptible to seasonal rain, wind, weeds, and pests.",
      winner: "Indoor (Convenient)"
    },
    {
      name: "Watering Routine",
      indoor: "Less frequent (weekly or bi-weekly due to slow evaporation).",
      outdoor: "Frequent (often daily in hot summer weather).",
      winner: "Indoor (Water-efficient)"
    },
    {
      name: "Growth Rate & Size",
      indoor: "Controlled, steady growth; easy to prune for interiors.",
      outdoor: "Vigorous, rapid growth with large root systems.",
      winner: "Outdoor (Abundance)"
    },
    {
      name: "Air & Eco Impact",
      indoor: "Cleans enclosed indoor air toxins and boosts mental serenity.",
      outdoor: "Feeds bees, butterflies, birds, and enhances urban ecosystems.",
      winner: "Outdoor (Ecosystem)"
    }
  ]
};
