# Script to generate authoritative plant knowledge for Green Shade Nursery
# 50 Flowers, 50 Fruits, 50 Bonsai, 50 Nursery Plants = 200 Comprehensive Plants

import json
import csv
from pathlib import Path

FLOWERS = [
    ("Rose", "Rosa indica / Rosa chinensis", "Gulab, Desi Gulab, Hybrid Rose", 
     "Full Sunlight (6+ hours daily)", "Water moderately when top 1-2 inches of soil feel dry. Avoid overhead wetting to prevent black spot fungal disease.",
     "Well-draining rich loamy soil with pH 6.0 - 6.5 enriched with cow dung manure or vermicompost.",
     "Apply mustard cake tea, rose food, or balanced NPK 19-19-19 every 2 weeks during blooming season.",
     "Winter and spring are peak blooming seasons in India. Prune in October to stimulate vigorous new flowering branches.",
     "Watch for aphids, thrips, and powdery mildew. Spray organic neem oil (5ml/L) or mild systemic fungicide."),
    
    ("Hibiscus", "Hibiscus rosa-sinensis", "Mandara, Gurhal, China Rose, Shoe Flower",
     "Full Direct Sunlight (5-7 hours)", "Regular daily watering in summer; reduce slightly in winter. Keep root ball moist but not waterlogged.",
     "Rich, organic-rich fertile garden soil with sand and vermicompost for swift drainage.",
     "Feed with potassium-rich organic fertilizer or banana peel fertilizer every 15 days for continuous large blooms.",
     "Year-round blooming in tropical climates. Pinch branch tips regularly to encourage dense branching.",
     "Susceptible to mealybugs and whiteflies. Treat with soap-water wash followed by neem oil spray."),
    
    ("Jasmine Mogra", "Jasminum sambac", "Arabian Jasmine, Gundu Malli, Motia, Mogra",
     "Full Sun to Bright Morning Sunlight", "Water deeply 2-3 times a week; daily in peak summer heat. Allow surface soil to dry slightly.",
     "Light sandy loam soil mixed with compost and leaf mould.",
     "Feed with bone meal or decomposed organic manure monthly. Prune aggressively after main flowering cycle.",
     "Blooms profusely from March to August with heavenly sweet fragrance.",
     "Generally pest hardy. Watch for leaf-eating caterpillars and spray neem solution."),
    
    ("Royal Jasmine", "Jasminum grandiflorum", "Jaji, Chameli, Spanish Jasmine",
     "Full Sun (5+ hours)", "Moderate regular watering. Avoid stagnant water around roots.",
     "Well-aerated fertile loamy soil.", "Apply balanced organic manure once a month during spring.",
     "Vigorous blooming climber producing fragrant star-shaped white flowers.", "Occasional aphids; spray neem oil."),
    
    ("Night Blooming Jasmine", "Cestrum nocturnum", "Raat Ki Rani, Night Queen",
     "Full Sunlight to Dappled Afternoon Shade", "Keep evenly moist during summer flowering season.",
     "Fertile garden loam with good organic matter.", "Feed organic vermicompost every 4 weeks in growing season.",
     "Produces clusters of small greenish-white flowers that release intense fragrance after sunset.", "Pinch tips for bushy shape."),
    
    ("Parijat", "Nyctanthes arbor-tristis", "Night-Flowering Jasmine, Harsingar, Coral Jasmine",
     "Full Direct Sun", "Moderate watering; drought tolerant once established.",
     "Tolerates diverse soils from sandy to alluvial delta loam.", "Feed twice a year with vermicompost.",
     "Sacred night-blooming tree; blooms drop at dawn creating a carpet of orange-stemmed white flowers.", "Very low maintenance."),
    
    ("Bougainvillea", "Bougainvillea spectabilis", "Paper Flower, Kagitham Puvvu",
     "Intense Full Sunlight (6-8 hours required)", "Low to moderate water. Withhold water slightly to trigger massive flowering flushes.",
     "Well-draining sandy loam or rocky garden soil. Intolerant of soggy soil.", "Feed with low-nitrogen, high-phosphorus/potassium fertilizer.",
     "Continuous vibrant paper-like bracts across purple, red, orange, white, and yellow colors.", "Extremely pest resistant."),
    
    ("Marigold", "Tagetes erecta / Tagetes patula", "Banti, Genda, African Marigold, French Marigold",
     "Full Direct Sunlight", "Water when topsoil feels dry. Water at the base, not on petals.",
     "Porous, well-draining garden soil.", "Apply liquid seaweed or mustard cake fertilizer every 10 days.",
     "Essential festive flowering plant with bright yellow, orange, and bronze blooms.", "Natural pest repellent; protects nearby garden crops."),
    
    ("Chrysanthemum", "Chrysanthemum morifolium", "Chamanti, Guldaudi, Mums",
     "Bright Sunlight (Morning sun ideal)", "Keep soil consistently moist but never soggy.",
     "Rich organic compost mixed with garden soil and cocopeat.", "High-potash fertilizer every 10 days leading to winter flowering.",
     "Spectacular winter blooms in hundreds of vibrant colors and flower forms.", "Watch for aphids; treat with mild neem spray."),
    
    ("Crossandra", "Crossandra infundibuliformis", "Kanakambaram, Firecracker Flower",
     "Bright Indirect Light to Mild Morning Sun", "Water when surface dries. Appreciates humid conditions.",
     "Rich, well-draining humus-rich delta soil.", "Apply organic compost or sea kelp fertilizer monthly.",
     "Traditional South Indian orange/salmon bloom used for garlands and hair ornaments.", "Keep away from harsh midday scorching sun."),

    ("Nerium Oleander", "Nerium oleander", "Ganneru, Kaner, Oleander",
     "Full Sun (Intense heat tolerant)", "Low water requirement. Drought hardy evergreen shrub.",
     "Adaptable to virtually any soil from coastal to clay.", "Requires minimal fertilizer; compost in spring suffices.",
     "Profuse clusters of pink, red, white, or yellow flowers year-round.", "Toxic if ingested; naturally deer and pest resistant."),

    ("Plumeria", "Plumeria rubra / Plumeria alba", "Champa, Frangipani, Temple Tree",
     "Full Direct Sunlight (6+ hours)", "Low to moderate water. Succulent stems store moisture; do not overwater.",
     "Sandy, gritty, well-draining soil mix.", "Phosphorus-rich fertilizer in spring and summer to induce heavy blooms.",
     "Exquisite, intensely fragrant flowers with velvety petals in white-yellow, pink, and deep crimson.", "Deciduous in cool winters."),

    ("Gardenia", "Gardenia jasminoides", "Gandharaj, Cape Jasmine",
     "Bright Morning Sun with Dappled Afternoon Shade", "Keep soil evenly moist. High humidity lover.",
     "Acidic soil (pH 5.0 - 6.0) rich in organic matter and peat.", "Feed with iron-chelates and acidic fertilizer monthly.",
     "Lush creamy white flowers with intoxicating perfume and glossy deep-green foliage.", "Avoid hard alkaline tap water."),

    ("Indian Sacred Lotus", "Nelumbo nucifera", "Tamara, Kamal, Indian Lotus",
     "Full Sun (At least 6 hours direct)", "Aquatic plant. Requires 6 to 12 inches of standing still water over heavy clay soil.",
     "Heavy black clay or alluvial delta mud enriched with composted cow dung.", "Insert aquatic plant fertilizer tablets into mud monthly.",
     "India's National Flower with sacred large pink or white blooms and water-repellent umbrella leaves.", "Grow in wide water tubs or ponds."),

    ("Water Lily", "Nymphaea caerulea / Nymphaea rubra", "Alli, Neelkamal, Water Lily",
     "Full Direct Sun (5+ hours)", "Grows submerged in aquatic tubs or garden ponds.",
     "Heavy garden loam or clay placed at the bottom of the container.", "Aquatic slow-release fertilizer spikes.",
     "Floating circular leaves with enchanting blooms in blue, purple, magenta, yellow, and white.", "Keep water fresh and clear of algae."),

    ("Dendrobium Orchid", "Dendrobium hybrid", "Epiphytic Orchid",
     "Bright Indirect Filtered Light", "Water 2-3 times a week allowing bark medium to dry between watering.",
     "Coarse orchid potting mix containing pine bark, charcoal, and coconut husk chips (No soil).", "Diluted 20-20-20 orchid fertilizer weekly.",
     "Long-lasting cane blooms that remain fresh for up to 8 weeks.", "Ensure excellent air circulation."),

    ("Phalaenopsis Orchid", "Phalaenopsis amabilis", "Moth Orchid",
     "Bright Indirect Shaded Light (Indoor favorite)", "Water once every 7-10 days when potting moss dries out.",
     "Sphagnum moss or chunky bark chips.", "Specialized balanced orchid food at half-strength every 2 weeks.",
     "Graceful arching sprays of exotic moth-like flowers that bloom for 2-3 months.", "Never leave standing water in leaf crown."),

    ("Tuberose", "Polianthes tuberosa", "Sugandharaja, Rajnigandha",
     "Full Sun (6 hours)", "Regular watering during spike formation. Do not allow bulb bed to desiccate.",
     "Well-drained rich alluvial delta soil with compost.", "Apply balanced NPK and bone meal before spike emergence.",
     "Tall spikes bearing extremely fragrant pure white waxy flowers used in perfumes.", "Harvest spikes when bottom florets open."),

    ("Ixora", "Ixora coccinea", "Flame of the Woods, West Indian Jasmine, Rangan",
     "Full Sun to Partial Sun", "Water regularly; prefers consistently moist soil without water stagnation.",
     "Acidic, rich garden loam with good drainage.", "Feed with slow-release acidic fertilizer or compost tea.",
     "Dense globular flower heads in fiery red, bright orange, yellow, and miniature pink.", "Ideal for ornamental evergreen hedges."),

    ("Madagascar Periwinkle", "Catharanthus roseus", "Sadabahar, Vinca, Nitya Kalyani",
     "Full Sun to Light Shade", "Low water requirement. Drought and heat resistant.",
     "Any well-draining garden soil, even sandy or poor soil.", "Minimal feeding; light vermicompost once in 2 months.",
     "Non-stop daily blooming across pink, lavender, white, and bicolors with medicinal properties.", "Very hardy, easy for beginners."),

    ("Dahlia", "Dahlia pinnata", "Dinnerplate Dahlia, Garden Dahlia",
     "Full Sun with Protection from Strong Winds", "Deep regular watering 2 times a week. Keep root zone cool.",
     "Fertile, humus-rich, well-drained loamy soil.", "Potassium and phosphorus rich fertilizer every 15 days.",
     "Gigantic multi-layered blooms ranging from dinnerplate size to miniature pom-poms.", "Stake tall varieties to support heavy flower heads."),

    ("Zinnia", "Zinnia elegans", "Youth and Age Flower",
     "Full Direct Sun", "Moderate watering at soil level to prevent powdery mildew on foliage.",
     "Light, fast-draining garden soil.", "Occasional light feeding during bloom period.",
     "Easy-to-grow cheerful flowers in vibrant scarlet, yellow, pink, and multicolored petals.", "Attracts butterflies and bees."),

    ("Petunia", "Petunia hybrida", "Grandiflora / Multiflora Petunia",
     "Full Sun (5+ hours direct)", "Water when topsoil dries. Avoid wetting flowers directly.",
     "Rich, light potting soil with perlite or coarse sand.", "Weekly dilute liquid bloom fertilizer.",
     "Cascading trumpet flowers ideal for hanging baskets, balconies, and decorative pots.", "Deadhead spent blooms for continuous flushes."),

    ("Carnation", "Dianthus caryophyllus", "Clove Pink, Carnation",
     "Full Morning Sun with Afternoon Filtered Light", "Keep soil moderately moist. Avoid soggy roots.",
     "Alkaline to neutral well-drained fertile loam.", "Balanced liquid fertilizer every 2 weeks.",
     "Ruffled fragrant flowers with a distinctive clove scent in pink, red, yellow, and pastel tones.", "Pinch for bushy habit."),

    ("Gerbera Daisy", "Gerbera jamesonii", "Transvaal Daisy, African Daisy",
     "Bright Sunlight with Mild Afternoon Shade", "Water thoroughly when top 2 inches dry out. Keep crown dry.",
     "Sandy loam enriched with leaf compost; crown must sit slightly above soil line.", "Micro-nutrient fertilizer every 15 days.",
     "Long-stemmed showstopping daisies in vivid neon colors; premier cut flower.", "Protect from waterlogging."),

    ("Anthurium", "Anthurium andraeanum", "Flamingo Flower, Painter's Palette",
     "Bright Filtered Indirect Light (No direct scorching sun)", "Water when surface feels slightly dry. Enjoys high ambient humidity.",
     "Coarse porous mix: cocopeat, bark chips, charcoal, perlite, and vermicompost.", "Diluted liquid fertilizer every 3 weeks.",
     "Glossy heart-shaped red, pink, or white spathes with yellow spadix lasting months.", "Exotic luxury indoor blooming plant."),

    ("Bird of Paradise", "Strelitzia reginae", "Crane Flower",
     "Full Sun to Bright Light", "Water moderately in summer; reduce in winter. Drought tolerant.",
     "Deep, rich, fertile loam with compost.", "Slow-release balanced fertilizer in spring and summer.",
     "Architectural evergreen with dramatic orange and vivid blue flowers resembling a bird in flight.", "High impact landscape focal point."),

    ("Peace Lily", "Spathiphyllum wallisii", "Madonna Lily",
     "Low to Bright Indirect Light (Thrives in indoor shade)", "Water when leaves slightly droop or topsoil dries. Sensitive to overwatering.",
     "Porous potting mix of cocopeat, compost, and perlite.", "Light organic liquid fertilizer once a month.",
     "Air-purifying indoor favorite with elegant white hood-like blooms and lush dark foliage.", "Wipe leaves to remove dust."),

    ("Lavender", "Lavandula angustifolia", "English Lavender",
     "Full Direct Sun (6+ hours essential)", "Low water requirement. Let soil dry out completely between waterings.",
     "Gritty, sandy, alkaline fast-draining soil. Absolutely no standing moisture.", "Requires very little fertilizer; excess causes leggy growth.",
     "Fragrant purple flower spikes and silvery-grey aromatic foliage.", "Prune lightly after blooming."),

    ("Balsam", "Impatiens balsamina", "Gul Mehndi, Garden Balsam",
     "Bright Partial Shade to Morning Sun", "Requires regular watering; do not allow to wilt.",
     "Moist, fertile, organic-rich garden soil.", "Balanced liquid feed every 2 weeks.",
     "Profuse cup-shaped flowers clustered along stems in pink, red, purple, and white.", "Great for monsoon and winter gardens."),

    ("Cosmos", "Cosmos bipinnatus", "Mexican Aster",
     "Full Direct Sunlight", "Low to moderate water. Highly drought tolerant.",
     "Poor to average well-drained soil. Rich soil produces foliage instead of flowers.", "Minimal feeding needed.",
     "Feathery foliage topped with daisy-like delicate blooms dancing in the breeze.", "Excellent for attracting pollinators."),

    ("Globe Amaranth", "Gomphrena globosa", "Vadamalli, Bachelor's Button",
     "Full Hot Sunlight", "Water sparingly. Very hardy against Indian summer heat.",
     "Any well-drained soil.", "Light compost once a season.",
     "Clover-like spherical papery magenta, pink, and white flower heads that dry beautifully.", "Flowers stay fresh for weeks on plant."),

    ("Portulaca", "Portulaca grandiflora", "Table Rose, 9 O'clock Flower, Moss Rose",
     "Full Blazing Sunlight", "Very low water. Succulent leaves store moisture. Overwatering rots roots.",
     "Sandy, gritty, gravelly fast-draining soil.", "Occasional light liquid fertilizer.",
     "Brilliant jewel-colored blooms that open with morning sun and close by evening.", "Unmatched groundcover and pot rim trailer."),

    ("Canna Lily", "Canna indica", "Indian Shot",
     "Full Direct Sun", "Loves water; thrives in moist boggy or garden soil.",
     "Rich, organic-heavy garden loam.", "Feed heavily with compost and balanced fertilizer in summer.",
     "Tropical broad banana-like bronze or green leaves topped with red, yellow, or speckled spikes.", "Ideal along ponds and boundary fences."),

    ("Bleeding Heart Vine", "Clerodendrum thomsoniae", "Glory Bower",
     "Bright Filtered Light to Morning Sun", "Keep soil consistently moist during warm growing months.",
     "Rich, organic, well-draining potting compost.", "Balanced fertilizer monthly in spring.",
     "Stunning twining climber with pure white calyces from which blood-red petals emerge.", "Trellis or pergola climbing specimen."),

    ("Rangoon Creeper", "Combretum indicum", "Madhu Malati, Chinese Honeysuckle",
     "Full Sunlight", "Water moderately; deeply during flowering season.",
     "Loamy fertile soil with compost.", "Apply vermicompost twice a year.",
     "Heavy clustering fragrant flowers that change color from white to pink and then deep red.", "Premier pergola and arch climber."),

    ("Allamanda", "Allamanda cathartica", "Golden Trumpet Vine, Yellow Bell Creeper",
     "Full Intense Sunlight", "Regular watering during summer; drought tolerant once roots establish.",
     "Rich garden loam with good drainage.", "Feed with potassium-rich fertilizer monthly.",
     "Large bright golden-yellow trumpet blossoms contrasting against glossy whorled leaves.", "Vigorous tropical bloomer."),

    ("Tecoma", "Tecoma stans", "Yellow Bells, Esperanza",
     "Full Direct Sunlight", "Low water needs once established.",
     "Tolerates dry, sandy, rocky, or poor soils easily.", "Rarely needs fertilizer.",
     "Hardy evergreen shrub with pendulous clusters of bright yellow bell-shaped flowers.", "Popular highway and public park ornamental."),

    ("Butterfly Pea", "Clitoria ternatea", "Shankhupushpi, Aparajita, Blue Pea",
     "Full Sun to Mild Partial Shade", "Moderate watering. Keep soil lightly moist.",
     "Well-drained rich sandy loam.", "Monthly vermicompost.",
     "Vibrant cobalt blue sacred flowers used in herbal tea and ayurvedic medicine.", "Quick-growing decorative twining vine."),

    ("Lantana", "Lantana camara", "Dwarf Lantana",
     "Full Scorching Sun", "Minimal watering; extremely drought and heat hardy.",
     "Grows in any soil.", "No fertilizer required.",
     "Clusters of multicolored miniature flowers in yellow-orange-red and pink-cream.", "Continuous year-round color; butterfly magnet."),

    ("Kalanchoe", "Kalanchoe blossfeldiana", "Flaming Katy",
     "Bright Indirect Light with Few Hours of Morning Sun", "Water thoroughly only when potting mix is completely dry. Succulent nature.",
     "Cactus / succulent porous mix with perlite and sand.", "Diluted balanced feed once in 6 weeks.",
     "Long-lasting dense clusters of double or single flowers in red, orange, pink, and yellow.", "Low maintenance indoor-outdoor potted gem."),

    ("Hydrangea", "Hydrangea macrophylla", "Bigleaf Hydrangea, Hortensia",
     "Morning Sun with Cool Afternoon Shade", "High water requirement; keep soil evenly moist. Do not let roots dry.",
     "Rich moist loam. Flower color shifts with soil pH (Acidic soil gives blue; alkaline gives pink).", "Feed with balanced acidic plant food in spring.",
     "Enormous globular pom-pom flower heads with romantic pastel hues.", "Thrives in cooler shade structures."),

    ("Morning Glory", "Ipomoea purpurea", "Morning Glory Vine",
     "Full Sunlight", "Regular moderate watering.",
     "Average well-draining soil.", "Light feeding only; excess fertilizer reduces blooms.",
     "Vigorous vine with trumpet flowers in blue, purple, magenta that open fresh each morning.", "Great for quick green screens and fencing."),

    ("Sunflower", "Helianthus annuus", "Surajmukhi",
     "Full Direct Sun (6-8 hours essential)", "Deep regular watering during root growth and bud formation.",
     "Deep, fertile, well-draining loamy soil.", "Balanced high-potash feed during flowering.",
     "Iconic bright golden heads that track the sun across the sky.", "Easy annual for instant garden cheer."),

    ("China Aster", "Callistephus chinensis", "Aster",
     "Full Sun to Light Afternoon Shade", "Moderate regular watering. Avoid water stagnation.",
     "Rich, light, organic-rich sandy loam.", "Liquid organic manure every 15 days.",
     "Delightful daisy-like and pom-pom blooms in pink, violet, purple, and white during winter.", "Excellent for borders and vases."),

    ("Maranta Prayer Plant Flower", "Maranta leuconeura", "Prayer Plant",
     "Bright Filtered Indirect Shade", "Keep potting soil evenly moist; high humidity required.",
     "Peat-based moisture retentive porous mix.", "Half-strength balanced feed monthly in summer.",
     "Striking patterned foliage that folds up at night, accompanied by delicate pale lavender blooms.", "Exceptional indoor tabletop specimen."),

    ("New Guinea Impatiens", "Impatiens hawkeri", "Sun Impatiens",
     "Bright Morning Light with Afternoon Shade", "Moist soil required at all times. Wilts quickly if dry.",
     "Humus-rich, porous, well-aerated potting mix.", "Feed every 2 weeks with diluted liquid bloom booster.",
     "Broad lush foliage topped with electric neon blossoms in red, coral, purple, and white.", "Continuous shaded color."),

    ("Wax Begonia", "Begonia semperflorens", "Fibrous-rooted Begonia",
     "Bright Indirect Light to Filtered Morning Sun", "Allow top inch of soil to dry between waterings. Avoid wetting leaves.",
     "Light, airy, peat-rich well-draining mix.", "Balanced liquid feed monthly.",
     "Waxy green or bronze foliage crowned with dainty flowers in red, rose, and white.", "Compact, easy houseplant and edging plant."),

    ("Amaryllis Lily", "Hippeastrum hybrid", "Belladonna Lily",
     "Bright Filtered Sunlight", "Water sparingly until sprout emerges; then water moderately.",
     "Well-draining bulb potting mix.", "Feed with high-potassium fertilizer during vegetative phase.",
     "Giant trumpet-shaped blossoms on sturdy leafless stalks in striking red, striped, and white shades.", "Classic festive bulb plant."),

    ("Coreopsis", "Coreopsis grandiflora", "Tickseed",
     "Full Sun", "Low to moderate water. Highly drought tolerant once established.",
     "Average well-drained garden soil.", "Low fertility requirement.",
     "Abundant bright sunny-yellow daisy flowers blooming continuously through summer heat.", "Tough, pollinator-friendly perennial.")
]

FRUITS = [
    ("Mango Banganapalli", "Mangifera indica 'Banganapalli'", "Benishan, King of Andhra Mangoes",
     "Full Direct Sunlight (8+ hours)", "Regular watering during flowering and fruit setting; reduce water 3-4 weeks prior to harvest for peak sweetness.",
     "Deep alluvial Godavari delta soil or rich red loamy soil with great drainage.",
     "Organic cow dung manure in monsoon, supplemented with rock phosphate, potash, and micronutrients.",
     "Flowers from December to February; harvest golden-yellow sweet fibreless fruits from April to June.",
     "Watch for mango hopper and powdery mildew during flowering. Spray neem or sulfur powder."),

    ("Mango Neelam", "Mangifera indica 'Neelam'", "Late Season Mango",
     "Full Direct Sun", "Moderate watering.", "Well-draining deep alluvial soil.",
     "Feed with compost and potash twice a year.",
     "Late season heavy bearer with smooth sweet aromatic flesh.", "Dwarf and spreading habit ideal for orchards."),

    ("Mango Alphonso", "Mangifera indica 'Alphonso'", "Hapus",
     "Full Sun", "Water regularly until fruiting.", "Deep well-draining loamy soil.",
     "Potash and organic manure pre-flowering.",
     "World-famous rich aromatic saffron flesh with supreme balance of sweetness and tang.", "Prune deadwood annually."),

    ("Mango Totapuri", "Mangifera indica 'Totapuri'", "Ginimoothi, Parrot Beak Mango",
     "Full Sun", "Drought tolerant once established.", "Adaptable to diverse loamy soils.",
     "Organic manure post-monsoon.",
     "Beak-shaped firm fruit, exceptional for pulp, juices, and pickling.", "Heavy, consistent annual bearer."),

    ("Mango Dasheri", "Mangifera indica 'Dasheri'", "North Indian Heritage Mango",
     "Full Sun", "Regular watering during fruit growth.", "Deep alluvial soil.",
     "Organic compost and NPK in spring.",
     "Elongated golden fruit with heavenly honey-sweet aroma and melting fibreless pulp.", "Medium sized vigorous canopy."),

    ("Guava Allahabad Safeda", "Psidium guajava 'Allahabad Safeda'", "Safeda Guava, Amrud",
     "Full Direct Sun", "Water weekly in summer; drought hardy once mature.",
     "Alluvial, loamy or clay soils; tolerant of wide pH range.",
     "Farmyard manure and bone meal twice a year.",
     "Round, smooth white-fleshed fruit with very few seeds and high vitamin C.", "Prune water shoots after harvest."),

    ("Guava Taiwan Pink", "Psidium guajava 'Taiwan Pink'", "Jumbo Pink Guava",
     "Full Direct Sun", "Regular watering for crisp juicy fruits.",
     "Fertile, well-draining sandy loam with compost.", "Potassium and micronutrients during fruit sizing.",
     "Massive crisp fruits with pleasant pink sweet interior; bears fruit from year one.", "Thrives in large terrace pots or ground."),

    ("Guava Lucknow 49", "Psidium guajava 'L-49'", "Sardar Guava",
     "Full Sun", "Moderate regular watering.", "Loamy, well-drained soil.",
     "Organic compost twice yearly.",
     "Prolific dwarf spreading tree with creamy white sweet pulp and rough greenish-yellow skin.", "Commercial farmer favorite."),

    ("Papaya Red Lady 786", "Carica papaya 'Red Lady'", "Taiwan Hybrid Papaya",
     "Full Sun (Intense heat lover)", "Moderate regular watering. Root collar must never stand in water (stem rot risk).",
     "Rich, sandy loam with exceptional drainage.", "Heavy feeder: vermicompost, mustard cake, and micronutrients monthly.",
     "Produces fruit within 8-9 months; deep red-orange sweet thick flesh with small cavity.", "High yielding commercial hybrid."),

    ("Lemon Seedless", "Citrus aurantifolia 'Seedless'", "Baramasi Kagzi Nimbu, All Season Lemon",
     "Full Sunlight (6+ hours)", "Water when top 2 inches dry. Do not overwater (root rot susceptible).",
     "Well-draining sandy loam or garden soil enriched with leaf compost.",
     "Feed citrus fertilizer, Epsom salt (magnesium), and zinc spray every 2 months.",
     "Continuous year-round fruiting with high juice content and thin rind.", "Prune criss-cross inner branches."),

    ("Sweet Lime Mosambi", "Citrus limetta", "Mosambi, Sathgudi",
     "Full Sun", "Regular irrigation during fruit expansion.", "Deep alluvial soil with neutral to slightly acidic pH.",
     "Citrus food and farmyard manure in January and July.",
     "Sweet, low-acid, refreshing juice fruits; highly refreshing and therapeutic.", "Spray micronutrients to prevent yellowing."),

    ("Sapota Cricket Ball", "Manilkara zapota 'Cricket Ball'", "Chikoo, Sapodilla",
     "Full Direct Sun", "Low to moderate watering once established.",
     "Adaptable to alluvial, sandy, and coastal soils.", "Organic compost twice a year.",
     "Large round fruits with granular sweet caramel pulp and thin brown skin.", "High yielding, long-lived tropical tree."),

    ("Sapota Kalipatti", "Manilkara zapota 'Kalipatti'", "Oblong Chikoo",
     "Full Sun", "Moderate watering.", "Deep fertile loam.", "Organic manure post-monsoon.",
     "Dark green foliage and oval, intensely sweet fruits with supreme market value.", "Sturdy Godavari delta rootstock."),

    ("Pomegranate Bhagwa", "Punica granatum 'Bhagwa'", "Kesar Anar, Ruby Pomegranate",
     "Full Hot Sunlight", "Water moderately. Keep watering consistent to prevent fruit cracking.",
     "Light sandy to loamy soil; tolerant of slight alkalinity.",
     "Apply farmyard manure, zinc sulfate, and potash during flowering.",
     "Deep red, soft edible seeds with high antioxidants and sweet refreshing juice.", "Prune suckers from base regularly."),

    ("Banana Grand Naine G9", "Musa acuminata 'Grand Naine'", "G9 Tissue Culture Banana",
     "Full Direct Sun with Wind Protection", "Heavy water feeder. Keep soil moist; avoid stagnant water.",
     "Deep, rich, organic-heavy fertile delta loam.",
     "High potash and nitrogen feeder: cow dung slurry and balanced NPK monthly.",
     "Dwarf sturdy plant bearing 25-35 kg bunches of high-grade uniform dessert bananas in 11-12 months.", "Desucker to maintain one main pseudo-stem."),

    ("Custard Apple Balanagar", "Annona squamosa 'Balanagar'", "Sitaphal, Sugar Apple",
     "Full Sun (Drought and heat hardy)", "Low water requirement; water during flowering and fruit setting.",
     "Rocky, gravelly, sandy loam; grows well in semi-arid soils.", "Compost once a year.",
     "Lobed fruit with creamy custard-like sweet pulp and delightful tropical fragrance.", "Naturally pest resistant."),

    ("Custard Apple Golden Ramphal", "Annona reticulata", "Ramphal, Bull's Heart",
     "Full Sun", "Moderate watering.", "Rich alluvial or loamy soil.", "Organic manure in spring.",
     "Large heart-shaped smooth fruit with sweet golden-white flesh.", "Hardy fast-growing small tree."),

    ("Fig Anjeer Pune", "Ficus carica 'Dinkar'", "Pune Fig, Common Fig",
     "Full Sunlight", "Water when topsoil dries. Overwatering causes fruit drop.",
     "Well-draining, calcareous loamy soil.", "Potash and wood ash during fruit initiation.",
     "Succulent bell-shaped fruits with honey-sweet reddish pulp; multiple crops per year.", "Prune in winter to promote new fruiting wood."),

    ("Apple Ber Green", "Ziziphus mauritiana 'Apple Ber'", "Thai Apple Ber",
     "Full Scorching Sun", "Extremely low water requirement; drought resistant.",
     "Adaptable to dry, saline, sandy, or degraded soils.", "Light manure once a year.",
     "Bears hundreds of crisp, apple-like sweet green fruits within the first year.", "Heavy pruning in April-May rejuvenates growth."),

    ("Apple Ber Kashmiri Red", "Ziziphus mauritiana 'Red Kashmiri'", "Red Apple Ber",
     "Full Sun", "Low watering.", "Sandy loam with good drainage.", "Compost before flowering.",
     "Attractive crimson-red apple-shaped fruits with crisp sweet texture.", "Terrace pot and commercial orchard superstar."),

    ("Sweet Orange Malta", "Citrus sinensis", "Malta, Blood Orange",
     "Full Sun", "Regular watering during dry spells.", "Well-drained sandy loam.",
     "Citrus micronutrient mix and compost quarterly.",
     "Aromatic, juicy, rich orange flesh packed with natural vitamin C.", "Protect from citrus leaf miner."),

    ("Hybrid Coconut Gangabondam", "Cocos nucifera dwarf", "Dwarf Kadiyam Coconut",
     "Full Sun", "Regular watering; loves coastal humidity and delta irrigation.",
     "Deep alluvial sandy loam with good moisture retention.", "Seaweed, salt, and organic cow dung manure twice a year.",
     "Semi-dwarf palm yielding 150+ sweet water coconuts annually starting in 3-4 years.", "Easy to harvest due to compact height."),

    ("Dragon Fruit Red", "Hylocereus polyrhizus", "Red Pitaya",
     "Full Sun with Climbing Trellis/T-pole", "Low water requirement; drought-hardy climbing cactus. Never waterlog.",
     "Sandy, gritty soil mix with 30% organic compost.", "Organic cow manure and bone meal every 2 months.",
     "Spectacular night-blooming cactus producing exotic magenta-fleshed antioxidant-rich sweet fruits.", "Prune stems after fruiting."),

    ("Dragon Fruit White", "Hylocereus undatus", "White Pitaya",
     "Full Sun with Concrete Post", "Low water.", "Gritty fast-draining cactus soil.", "Compost and potash.",
     "Bright pink scaled fruit with sweet, refreshing white pulp studded with tiny black seeds.", "Bears multiple flushes from June to November."),

    ("Dragon Fruit Yellow", "Hylocereus megalanthus", "Golden Dragon Fruit",
     "Full Sun to Light Shade", "Low water.", "Fast-draining sandy loam.", "Organic manure.",
     "The sweetest of all dragon fruits with bright yellow thorny skin and intensely sweet translucent pulp.", "Requires trellis support."),

    ("Starfruit Carambola", "Averrhoa carambola", "Kamrakh, Five Finger Fruit",
     "Full Sun to Partial Sun", "Regular watering; prefers humid conditions.",
     "Rich, loamy, slightly acidic soil.", "Balanced organic feed quarterly.",
     "Prolific producer of star-shaped crisp, tangy-sweet yellow fruits.", "Compact tree suitable for home gardens."),

    ("Jackfruit Vietnam Early", "Artocarpus heterophyllus", "All Season Super Early Jackfruit",
     "Full Sun", "Moderate watering.", "Deep well-draining alluvial or red soil.", "Farmyard manure in monsoon.",
     "Begins fruiting within 18-24 months; sweet, crunchy, aromatic bulbs.", "Medium sized dwarf tree."),

    ("Jamun Kaala Jamun", "Syzygium cumini", "Black Plum, Neredu",
     "Full Sun", "Deep regular watering when young; drought hardy when mature.",
     "Alluvial delta soil; tolerates waterlogging.", "Compost annually.",
     "Large, juicy, sweet-astringent purple fruits famous for diabetes management and blood purification.", "Majestic shade tree."),

    ("Amla NA-7", "Phyllanthus emblica", "Indian Gooseberry, Usiri",
     "Full Direct Sun", "Low water needs.", "Hardy in poor, light, or alkaline soils.", "Organic compost twice a year.",
     "Heavy clustering large translucent green fruits packed with vitamin C and ayurvedic power.", "Prune lower branches."),

    ("Mulberry Shahtoot", "Morus alba / Morus nigra", "Shahtoot, Toot",
     "Full Sun", "Moderate watering.", "Adaptable to most garden soils.", "Vermicompost every 3 months.",
     "Fast-growing small tree bearing hundreds of delicious elongated sweet black or red berries.", "Easily pruned for terrace pots."),

    ("Passion Fruit Purple", "Passiflora edulis", "Krishna Phal",
     "Full Sun with Trellis Support", "Regular watering to maintain moisture.", "Rich organic loamy soil.",
     "High-potassium fertilizer monthly.",
     "Vigorous climber with ornate purple-white blooms followed by wrinkled purple aromatic tart-sweet fruits.", "Juice and dessert favorite."),

    ("Strawberry Sweet Charlie", "Fragaria ananassa", "Garden Strawberry",
     "Full Morning Sun with Cool Root Zone", "Keep soil consistently moist; avoid water on foliage or crown.",
     "Rich, slightly acidic, sandy compost potting mix.", "Potash and liquid kelp weekly during fruiting.",
     "Delicious bright red sweet berries suitable for pots, hanging baskets, and terrace beds.", "Mulch with straw."),

    ("Avocado Hass", "Persea americana 'Hass'", "Butter Fruit",
     "Full Sun with Wind Shelter", "Moderate watering; extremely sensitive to soggy waterlogged soil.",
     "Loose, sandy, deep, well-draining soil.", "Citrus/avocado balanced fertilizer every 3 months.",
     "Creamy rich nutty fruit packed with healthy fats.", "Grafted saplings bear within 3 years."),

    ("Lychee Shahi", "Litchi chinensis", "Muzaffarpur Litchi",
     "Full Sun with High Humidity", "Regular deep watering, especially during fruit set.",
     "Deep alluvial delta soil with high organic matter.", "Organic manure and zinc sulfate in winter.",
     "Fragrant translucent juicy aril wrapped in bright bumpy red rind.", "Prefers warm humid summers."),

    ("Breadfruit", "Artocarpus altilis", "Nirpanas, Kadachakka",
     "Full Tropical Sun with High Humidity", "Abundant water; enjoys tropical delta rains.",
     "Deep, fertile, well-draining alluvial loam.", "Compost and mulch annually.",
     "Large starchy round fruit widely used as nutritious vegetable and fry delicacy.", "Magnificent broad-leaved tree."),

    ("Wood Apple Bael", "Aegle marmelos", "Bilva, Maredu",
     "Full Sun", "Low water; extremely drought tolerant.", "Grows in dry, rocky, or hard soils.", "Minimal care.",
     "Sacred tree with hard-shelled aromatic fruit used for cooling summer sherbets and digestive health.", "Hardy native species."),

    ("Sweet Tamarind PKM-1", "Tamarindus indica", "Meethi Imli",
     "Full Sun", "Low watering once established.", "Deep alluvial or sandy loam.", "Compost in monsoon.",
     "Heavy yielding grafted tree producing thick pods with delicious sweet pulp.", "Long-lived commercial tree."),

    ("Water Apple Wax Jambu", "Syzygium samarangense", "Rose Apple, Bell Fruit",
     "Full Sun to Light Shade", "Enjoys plenty of moisture; regular watering.",
     "Rich loamy soil with organic compost.", "Balanced fertilizer every 2 months.",
     "Crisp, spongy, bell-shaped pink or white fruits with refreshing watery crunch.", "Great for summer hydration."),

    ("Cashew Dwarf Grafted", "Anacardium occidentale 'VRI-3'", "Jeedi Mamidi, Kaju",
     "Full Sun", "Low watering; drought resistant.", "Sandy, red laterite or coastal soils.", "Organic manure pre-monsoon.",
     "Precocious dwarf tree yielding juicy cashew apples and top-grade cashew nuts.", "Commercial cash crop."),

    ("Bilimbi", "Averrhoa bilimbi", "Tree Sorrel, Bilimbi",
     "Full Sun to Partial Sun", "Regular watering.", "Moist, fertile garden soil.", "Compost quarterly.",
     "Clusters of sour, crisp cylindrical fruits growing directly on tree trunk; used in curries and pickles.", "Fascinating cauliflory plant."),

    ("Acerola Cherry", "Malpighia emarginata", "West Indian Cherry, Barbados Cherry",
     "Full Sun", "Moderate watering.", "Well-draining garden soil.", "Citrus feed every 2 months.",
     "Bears ruby-red tart-sweet cherries with the highest natural vitamin C concentration.", "Superfood shrub for containers."),

    ("Mangosteen", "Garcinia mangostana", "Queen of Fruits",
     "Filtered Tropical Sun / High Humidity", "Constant moisture; cannot tolerate drought.",
     "Deep, rich, organic delta clay-loam.", "Slow-release organic manure.",
     "Exquisite purple thick-rinded fruit holding snow-white segments of sublime sweet-tangy flavour.", "Slow growing tropical royalty."),

    ("Rambutan Rongrien", "Nephelium lappaceum", "Hairy Litchi",
     "Full Tropical Sun / Humid Zone", "Regular watering.", "Rich, moist alluvial delta soil.", "Compost and potash.",
     "Stunning bright red fruit covered in soft green-tipped hairs; sweet translucent flesh.", "Grafted saplings bear in 2-3 years."),

    ("Karonda", "Carissa carandas", "Bengal Currant, Vakka",
     "Full Blazing Sun", "Very low water; drought hardy.", "Rocky, poor, dry, or sandy soils.", "Minimal feeding.",
     "Thorny shrub with pink-white berries turning deep purple; excellent for preserves and pickles.", "Natural security bio-fence."),

    ("Phalsa", "Grewia asiatica", "Sherbet Berry",
     "Full Sun", "Low water needs.", "Adaptable to diverse soils.", "Prune heavily in winter.",
     "Bears clusters of sweet-tart purple berries famous for cooling summer drinks.", "Hardy native fruit shrub."),

    ("Longan", "Dimocarpus longan", "Dragon Eye",
     "Full Sun", "Regular watering.", "Deep alluvial loamy soil.", "Balanced NPK in spring.",
     "Smooth-barked cousin of lychee with sweet musky translucent pulp around a dark seed.", "Cold-hardier than lychee."),

    ("Miracle Fruit", "Synsepalum dulcificum", "Miraculous Berry",
     "Bright Filtered Light / High Humidity", "Keep soil consistently moist. Sensitive to drying out.",
     "Acidic soil (pH 4.5 - 5.5) with peat moss and pine bark.", "Acidic liquid fertilizer monthly.",
     "Small red berries containing miraculin that turns sour foods intensely sweet for hours.", "Fascinating botanical wonder."),

    ("Pomelo Chakotra", "Citrus maxima", "Pambalimas, Grapefruit Giant",
     "Full Sun", "Regular deep watering.", "Deep fertile loam.", "Citrus fertilizer quarterly.",
     "Largest citrus fruit with sweet-tangy pink or yellow vesicles and thick aromatic rind.", "Very resilient citrus variety."),

    ("Star Gooseberry", "Phyllanthus acidus", "Harfarauri, Rata Amla",
     "Full Sun", "Moderate watering.", "Grows in most soils.", "Light compost annually.",
     "Ribbed pale-yellow tart berries clustering in ropes directly on branches; great for preserves.", "High vitamin C shrub."),

    ("Yellow Granadilla", "Passiflora ligularis", "Sweet Passionfruit",
     "Full Sun with Pergola", "Regular watering.", "Humus-rich moist soil.", "Potash fertilizer.",
     "Brilliant orange rounded fruit with sweet, perfumed, gelatinous pulp.", "Luxury table fruit.")
]

BONSAI = [
    ("Ficus Microcarpa Bonsai", "Ficus microcarpa", "Chinese Banyan Bonsai, Tiger Bark Ficus",
     "Bright Indirect Light to Partial Sun", "Water when topsoil feels slightly dry. Excellent drought tolerance; do not keep root ball waterlogged.",
     "Fast-draining bonsai mix (akadama, pumice, lava rock, and pine bark).",
     "Feed with balanced liquid bonsai fertilizer every 2 weeks during active growth (March to October).",
     "Wiring can be done year-round. Prune back to 2 leaves after 6-8 leaves grow out.",
     "Produces stunning aerial roots and dense foliage; very beginner friendly and hardy."),

    ("Ficus Benjamina Bonsai", "Ficus benjamina", "Weeping Fig Bonsai",
     "Bright Filtered Sunlight", "Allow surface to dry between waterings.", "Porous bonsai soil mix.",
     "Balanced organic bonsai food monthly.", "Prune new shoots regularly to maintain compact silhouette.",
     "Graceful drooping branches with glossy oval leaves; trains into formal or informal upright styles."),

    ("Ficus Religiosa Bonsai", "Ficus religiosa", "Sacred Peepal Tree Bonsai, Bodhi Tree",
     "Full Sun to Bright Light", "Water moderately. Appreciates warm tropical humidity.",
     "Standard gritty bonsai soil with organic compost.", "Feed liquid seaweed fertilizer monthly.",
     "Iconic heart-shaped leaves with distinctive drip-tips and massive ancient-looking trunk.", "Highly revered sacred tree."),

    ("Ficus Bengalensis Bonsai", "Ficus benghalensis", "Indian Banyan Tree Bonsai",
     "Full Sunlight", "Water when top layer is dry.", "Draining loamy bonsai soil.", "Organic cake fertilizer monthly.",
     "Develops majestic banyan aerial prop roots, heavy surface nebari, and rugged bark.", "Great heritage Indian bonsai."),

    ("Ficus Panda Bonsai", "Ficus retusa 'Panda'", "Panda Ficus, Round Leaf Bonsai",
     "Bright Light with Morning Sun", "Water when top inch is dry.", "Porous gritty bonsai mix.", "Balanced NPK monthly.",
     "Thick, waxy, circular coin-like leaves that naturally stay compact and respond to defoliation.", "Excellent indoor/patio bonsai."),

    ("Ficus Green Island Bonsai", "Ficus microcarpa 'Green Island'", "Green Island Ficus",
     "Full Sun to Bright Shade", "Moderate watering.", "Well-aerated bonsai medium.", "Slow release fertilizer pellets.",
     "Glossy deep-green round leaves with horizontal spreading branch habit; aerial root formation.", "Very resilient against leaf drop."),

    ("Ficus Ginseng Bonsai", "Ficus microcarpa 'Ginseng'", "Ginseng Grafted Ficus",
     "Bright Indoor Light with Some Direct Sun", "Water when topsoil dries. Empty drip tray water.",
     "Bonsai soil with good aeration.", "Half-strength liquid feed monthly.",
     "Fascinating bulbous pot-bellied root trunk resembling ginseng mandrake; ideal desktop centerpiece.", "Tolerates low indoor humidity."),

    ("Ficus Retusa Bonsai", "Ficus retusa", "Tiger Bark Ficus",
     "Bright Sun", "Moderate watering.", "Akadama and pumice mix.", "Organic pellets.",
     "Distinctive white horizontal lenticels resembling tiger stripes on grey bark.", "Classic specimen bonsai."),

    ("Adenium Obesum Bonsai", "Adenium obesum", "Desert Rose Bonsai",
     "Full Blazing Sun (6+ hours direct)", "Very low water. Succulent caudex stores water. Let soil dry out completely between waterings.",
     "Ultra fast-draining cactus/succulent gritty mix with perlite, pumice, and gravel (no clay).",
     "High phosphorus and potassium fertilizer once a month to trigger massive flowering.",
     "Swollen sculpted caudex base topped with vibrant trumpet flowers in crimson, pink, and variegated colors.", "Rot susceptible if overwatered."),

    ("Chinese Elm Bonsai", "Ulmus parvifolia", "Lacebark Elm",
     "Full Sun to Semi-Shade", "Water thoroughly when surface soil dries.", "Standard well-draining bonsai mix.",
     "Balanced bonsai feed every 2 weeks during spring and summer.",
     "Small finely serrated leaves, exquisite branch ramification, and beautiful exfoliating lace bark.", "Tolerates diverse climates."),

    ("Jade Plant Bonsai", "Portulacaria afra", "Dwarf Jade, Elephant Bush Bonsai",
     "Full Direct Sun", "Water sparingly. Allow complete dry-out; thick fleshy leaves store moisture.",
     "Sandy, gritty, free-draining succulent bonsai soil.", "Light organic feeding in summer.",
     "Thick fleshy jade-green leaves on fleshy stems that develop woody bark quickly; easily trained into cascade or upright.", "Unkillable beginner bonsai."),

    ("Japanese Juniper Bonsai", "Juniperus procumbens 'Nana'", "Green Mound Juniper",
     "Full Outdoor Direct Sunlight (Cannot survive indoors)", "Keep evenly moist but never wet. Mist foliage on hot dry days.",
     "Sharp-draining aggregate: pumice, lava, and akadama.", "Organic fertilizer pellets on soil surface.",
     "Classic conifer bonsai with needle-like blue-green foliage; ideal for dramatic deadwood jin and shari styling.", "Outdoor only."),

    ("Carmona Fukien Tea Bonsai", "Carmona microphylla", "Fukien Tea Tree",
     "Bright Warm Filtered Light with Morning Sun", "Keep consistently moist. Does not like drying out.",
     "Moisture-retentive yet well-drained bonsai mix.", "Liquid fertilizer every 2-3 weeks.",
     "Tiny glossy dark leaves with miniature white star flowers and small red berries.", "Traditional oriental houseplant bonsai."),

    ("Bougainvillea Bonsai", "Bougainvillea glabra", "Flowering Bougainvillea Bonsai",
     "Full Blazing Sunlight", "Allow soil to dry thoroughly between waterings to encourage flower buds.",
     "Fast-draining gritty bonsai mix.", "Low-nitrogen, high-phosphorus organic fertilizer.",
     "Gnarled twisted driftwood trunks bursting with brilliant magenta, purple, red, or orange flowers.", "Stunning flowering bonsai."),

    ("Premna Bonsai", "Premna microphylla", "Musk Maple, Japanese Premna",
     "Full Sun", "Thirsty tree; water generously when topsoil dries.", "Akadama, pumice, and compost.", "Heavy feeder during active growth.",
     "Remarkable root-over-rock styling, ancient cracked bark, and tiny leaves that reduce down to 5mm.", "Prune constantly for dense pads."),

    ("Wrightia Water Jasmine Bonsai", "Wrightia religiosa", "Sacred Buddhist Water Jasmine",
     "Full Sun to Light Shade", "Loves water; keep root ball moist. Thrives in tropical humidity.",
     "Rich well-drained bonsai loam.", "Balanced organic fertilizer monthly.",
     "Intensely fragrant pendulous white flowers hanging like miniature bells; bends gracefully.", "Top-tier Southeast Asian exhibition bonsai."),

    ("Casuarina Bonsai", "Casuarina equisetifolia", "Australian Pine, Beefwood Bonsai",
     "Full Sun", "Water when soil dries slightly.", "Sandy well-aerated soil.", "Organic feed in monsoon.",
     "Needle-like equisetum branchlets mimicking true pines; rapid trunk thickening and rugged bark.", "Coastal and tropical pine alternative."),

    ("Tamarind Bonsai", "Tamarindus indica", "Tamarind Tree Bonsai",
     "Full Direct Sun", "Moderate watering.", "Well-draining loamy bonsai soil.", "Organic compost twice a year.",
     "Feathery compound pinnate leaves that close at night, accompanied by rugged textured bark.", "Durable native Indian bonsai."),

    ("Singapore Holly Bonsai", "Malpighia coccigera", "Miniature Holly",
     "Bright Light with Morning Sun", "Keep moderately moist.", "Porous potting soil.", "Balanced fertilizer monthly.",
     "Tiny spiny leaves resembling holly, delicate pale-pink flowers, and miniature red berries.", "Compact weeping or upright styles."),

    ("Pemphis Acidula Bonsai", "Pemphis acidula", "Coastal Ironwood, Santigi",
     "Full Sun", "Moderate watering. Highly salt and heat tolerant.", "Coarse sandy pumice mix.", "Organic pellets.",
     "Legendary tropical bonsai with ancient driftwood deadwood, natural jin, and tiny waxy leaves.", "Connoisseur collector specimen."),

    ("Boxwood Bonsai", "Buxus microphylla", "Kingsville Boxwood",
     "Morning Sun with Filtered Afternoon Shade", "Keep evenly moist.", "Well-drained bonsai compost.", "Gentle organic feed.",
     "Dense tiny evergreen leaves, soft cream bark, and remarkable tolerance to aggressive pruning.", "Great for formal upright styling."),

    ("Szechuan Pepper Bonsai", "Zanthoxylum piperitum", "Chinese Pepper Tree",
     "Bright Indirect Light", "Water when topsoil dries.", "Bonsai potting mix.", "Balanced liquid fertilizer monthly.",
     "Aromatic citrus-peppery compound leaves and small glossy foliage; easy to train.", "Indoor-friendly bonsai."),

    ("Serissa Snowrose Bonsai", "Serissa foetida", "Tree of a Thousand Stars",
     "Bright Filtered Light", "Consistently moist soil. Sensitive to sudden temperature or position shifts.",
     "Humus-rich draining bonsai mix.", "Half-strength liquid feed every 2 weeks.",
     "Produces countless miniature white star flowers almost year-round against textured grey bark.", "Delicate flowering jewel."),

    ("Zelkova Bonsai", "Zelkova serrata", "Japanese Grey Bark Elm",
     "Full Sun", "Regular watering.", "Standard bonsai mix.", "Balanced fertilizer.",
     "Famous for classical broom style (Hokidachi) with delicate fan-like fine branch ramification.", "Vibrant autumn coloration."),

    ("Japanese Maple Bonsai", "Acer palmatum", "Momiji",
     "Morning Sun with Cool Afternoon Shade (Protect from hot dry winds)", "Keep soil evenly moist. Never let dry out completely.",
     "Slightly acidic, moisture-retentive gritty akadama mix.", "Low-nitrogen organic fertilizer in spring.",
     "Iconic five-lobed palmate leaves with breathtaking crimson and gold foliage.", "Requires cool microclimate."),

    ("Ginkgo Biloba Bonsai", "Ginkgo biloba", "Maidenhair Tree Bonsai",
     "Full Sun", "Water generously in summer.", "Deep well-draining bonsai mix.", "Organic fertilizer in spring.",
     "Ancient living fossil with unique fan-shaped leaves that turn luminous bright butter-yellow in autumn.", "Columnar or flame style."),

    ("Dwarf Pomegranate Bonsai", "Punica granatum 'Nana'", "Nejikan Pomegranate",
     "Full Direct Sun (Essential for flowering)", "Water thoroughly when surface dries.", "Well-draining gritty soil.",
     "Potash-rich fertilizer during bud formation.",
     "Twisting ancient trunk, fiery orange flowers, and miniature edible ruby pomegranates.", "Superb flowering and fruiting bonsai."),

    ("Olive Tree Bonsai", "Olea europaea", "Wild Olive Bonsai",
     "Full Intense Sunlight", "Low to moderate water. Allow soil to dry well between waterings.",
     "Gritty, rocky, alkaline well-draining mix.", "Organic fertilizer pellets twice a year.",
     "Silvery-green narrow leaves, gnarled ancient hollow trunks, and exceptional drought hardiness.", "Mediterranean classic."),

    ("Podocarpus Bonsai", "Podocarpus macrophyllus", "Buddhist Pine",
     "Bright Indirect Light to Morning Sun", "Water when topsoil dries.", "Acidic to neutral porous bonsai mix.",
     "Balanced liquid feed every 3 weeks.",
     "Long, strap-like, dark-green needles and clean upright structure; adapts well indoors.", "Traditional Asian temple bonsai."),

    ("Hawaiian Umbrella Bonsai", "Schefflera arboricola", "Dwarf Schefflera",
     "Bright Indirect Light to Partial Sun", "Water when surface dries out. Forgiving of occasional underwatering.",
     "Fast-draining potting soil.", "Balanced liquid feed monthly.",
     "Palmate umbrella leaves and abundant banyan-like aerial roots; exceptional indoor bonsai.", "Highly resilient."),

    ("Chinese Privet Bonsai", "Ligustrum sinense", "Privet",
     "Full Sun to Bright Shade", "Thirsty tree; water regularly.", "Standard bonsai soil.", "Balanced feed every 2 weeks.",
     "Fast grower with dense small leaves, fragrant white flower sprays, and purple berries.", "Ideal for learning wiring and pruning."),

    ("Kamini Bonsai", "Murraya paniculata", "Orange Jessamine Bonsai",
     "Full Sun to Bright Light", "Water when topsoil dries.", "Rich loamy bonsai mix.", "Organic fertilizer monthly.",
     "Glossy compound leaves, intoxicating jasmine-scented white blooms, and bright orange berries.", "Native Indian fragrant bonsai."),

    ("Miniature Orange Bonsai", "Citrus calamondin", "Calamondin Bonsai",
     "Full Sun", "Water when top 1 inch dries.", "Citrus bonsai mix.", "Citrus fertilizer with micronutrients.",
     "Glossy foliage, fragrant white blossoms, and persistent small round orange fruits.", "Delightful fruiting bonsai."),

    ("Calliandra Bonsai", "Calliandra haematocephala", "Powder Puff Bonsai",
     "Full Sun", "Moderate watering.", "Well-drained compost mix.", "Bloom booster fertilizer.",
     "Pinnate leaves that fold at sunset, crowned with dramatic scarlet-red powderpuff puffball blooms.", "Exotic tropical flowering bonsai."),

    ("Wisteria Bonsai", "Wisteria sinensis", "Chinese Wisteria",
     "Full Direct Sun", "Water heavily during growing season.", "Deep rich draining soil.", "Potash-heavy fertilizer.",
     "Magnificent cascading racemes of fragrant lavender-purple flowers draped over thick twisted vines.", "Dramatic spring display."),

    ("Baobab Bonsai", "Adansonia digitata", "African Baobab Bonsai",
     "Full Blazing Sun", "Very low water. Succulent trunk stores enormous moisture.",
     "Gritty fast-draining mineral soil.", "Minimal feeding.",
     "Iconic massive swollen bottle-shaped trunk with bare winter branches.", "Fascinating prehistoric silhouette."),

    ("Brazilian Raintree Bonsai", "Chloroleucon tortum", "Brazilian Rain Tree",
     "Full Sun to Bright Light", "Water thoroughly when surface dries.", "Well-aerated porous bonsai mix.", "Balanced organic feed.",
     "Tortuous twisted fluted trunk with delicate bipinnate leaves that fold up at night and during rain.", "Elite tropical show tree."),

    ("Satsuki Azalea Bonsai", "Rhododendron indicum", "Satsuki",
     "Morning Sun with Afternoon Shade", "Keep consistently moist with rainwater/soft water (intolerant of lime).",
     "Pure Kanuma (acidic volcanic clay) with no regular garden soil.", "Specialized acidic azalea fertilizer post-bloom.",
     "Explosion of multi-patterned blooms on a single tree in late spring.", "Prized Japanese classic."),

    ("Miniature Jade Crassula", "Crassula ovata", "Money Tree Bonsai",
     "Full Sun to Bright Indirect Light", "Low water; let soil dry completely.", "Gritty succulent soil.", "Light compost.",
     "Thick fleshy jade leaves on massive succulent trunks; highly auspicious.", "Very forgiving care."),

    ("Surinam Cherry Bonsai", "Eugenia uniflora", "Pitanga Bonsai",
     "Full Sun", "Keep moderately moist.", "Porous loamy mix.", "Balanced feed monthly.",
     "Coppery new foliage turning dark green, tiny white flowers, and ribbed edible pumpkin-like berries.", "Fruiting showpiece."),

    ("Brush Cherry Bonsai", "Syzygium paniculatum", "Australian Brush Cherry",
     "Full Sun to Semi-Shade", "Water when topsoil dries.", "Standard bonsai mix.", "Balanced fertilizer.",
     "Glossy foliage with reddish new shoots, fluffy white flowers, and bright magenta berries.", "Dense easy-care canopy."),

    ("Japanese Elm Bonsai", "Ulmus davidiana", "David Elm",
     "Full Sun", "Regular watering.", "Standard well-draining soil.", "Spring fertilizer.",
     "Fine twiggy ramification, corky bark wings, and tiny oval leaves.", "Classic outdoor deciduous bonsai."),

    ("Hibiscus Bonsai", "Hibiscus rosa-sinensis dwarf", "Dwarf Tropical Hibiscus",
     "Full Sun", "Daily watering in summer.", "Rich draining bonsai mix.", "Potash-rich fertilizer.",
     "Gnarled woody base bearing vibrant multi-colored tropical blooms.", "Showy flowering bonsai."),

    ("Phalsa Bonsai", "Grewia asiatica", "Sherbet Berry Bonsai",
     "Full Sun", "Moderate watering.", "Well-drained loamy mix.", "Annual compost.",
     "Rugged rough bark with heart-shaped leaves and edible sweet purple berries.", "Sturdy Indian native bonsai."),

    ("Crassula Gollum Bonsai", "Crassula ovata 'Gollum'", "Hobbit Jade Bonsai",
     "Full Sun", "Minimal watering.", "Gritty cactus mix.", "Light feeding.",
     "Tubular trumpet-like leaves with suction-cup tips and thick trunk.", "Fascinating character bonsai."),

    ("Acacia Bonsai", "Acacia farnesiana", "Sweet Acacia, Kasturi",
     "Full Scorching Sun", "Low water requirement.", "Sandy gravelly soil.", "Minimal feeding.",
     "Thorny zig-zag branches, tiny bipinnate leaves, and golden fragrant puff flowers.", "Ancient rough bark."),

    ("Bald Cypress Bonsai", "Taxodium distichum", "Swamp Cypress",
     "Full Sun", "Loves water; can sit in shallow water tray in summer.", "Moisture retentive bonsai soil.", "Balanced feed in spring.",
     "Feathery deciduous needles turning copper in autumn; buttressed fluted trunk base.", "Unique wetland conifer."),

    ("Black Pine Bonsai", "Pinus thunbergii", "Japanese Black Pine",
     "Full Intense Outdoor Sunlight", "Water when dry; excellent drainage essential.", "Coarse akadama, pumice, and kiryu.", "Organic cakes.",
     "The king of Japanese bonsai; rugged fissured black bark and needle candling technique.", "Masterclass outdoor conifer."),

    ("Honeysuckle Bonsai", "Lonicera japonica", "Japanese Honeysuckle",
     "Full Sun to Partial Sun", "Water when topsoil dries.", "Standard bonsai mix.", "Balanced fertilizer.",
     "Twisting hollow trunk with sweet-scented white-yellow flowers.", "Fast-growing vine-turned-bonsai."),

    ("Firethorn Bonsai", "Pyracantha coccinea", "Pyracantha Berry Bonsai",
     "Full Sunlight", "Water generously when topsoil dries.", "Well-drained bonsai mix.", "Potash-rich fertilizer.",
     "Spring white blossom cascades followed by dense clusters of glowing orange-red berries that persist all winter.", "Incredible seasonal display.")
]

NURSERY_PLANTS = [
    ("Areca Palm", "Dypsis lutescens", "Golden Cane Palm, Yellow Butterfly Palm",
     "Bright Indirect Sunlight (Can tolerate light shade)", "Water when top 1-2 inches of soil feel dry. Avoid overwatering or standing water.",
     "Rich, well-draining loamy soil with peat moss and sand.",
     "Feed with slow-release balanced palm fertilizer and micronutrients quarterly.",
     "NASA top-rated air-purifying indoor and outdoor landscaping palm with feathery arching fronds.", "Wipe fronds to remove dust."),

    ("Royal Palm", "Roystonea regia", "Cuban Royal Palm",
     "Full Direct Sunlight (6+ hours)", "Regular deep watering when young; drought hardy once established.",
     "Deep, fertile alluvial delta soil with good moisture holding capacity.",
     "Apply organic farmyard manure and balanced NPK twice a year.",
     "Monumental palm with smooth marble-like concrete grey trunk and vibrant emerald crownshaft; premier avenue tree.", "Pest hardy."),

    ("Foxtail Palm", "Wodyetia bifurcata", "Australian Foxtail Palm",
     "Full Direct Sun", "Moderate watering.", "Well-draining sandy loam.", "Palm fertilizer with magnesium and iron.",
     "Plush bushy fronds resembling a fox's tail with smooth self-cleaning ringed trunk.", "Architectural landscape superstar."),

    ("Bismarckia Palm", "Bismarckia nobilis", "Silver Bismarck Palm",
     "Full Blazing Sunlight", "Moderate watering when young; highly drought tolerant.",
     "Adaptable to wide range of soils; requires good drainage.", "Palm food in spring.",
     "Massive dramatic fan-shaped silvery-blue architectural leaves; premier estate focal point.", "Slow to moderate growth."),

    ("Snake Plant Laurentii", "Sansevieria trifasciata 'Laurentii'", "Mother-in-Law's Tongue",
     "Low to Full Bright Indirect Sunlight (Highly adaptable)", "Water once every 2-3 weeks; allow soil to dry out completely. Very drought hardy.",
     "Fast-draining cactus and succulent mix or sandy garden loam.",
     "Feed with half-strength houseplant fertilizer once in spring and summer.",
     "Top air-purifying plant that releases oxygen at night; features erect sword-like leaves with golden borders.", "Indestructible houseplant."),

    ("Snake Plant Moonshine", "Sansevieria craigii 'Moonshine'", "Silver Snake Plant",
     "Bright Indirect Light", "Water when completely dry.", "Well-draining gritty soil.", "Light feeding in summer.",
     "Silvery-sage green broad upright leaves with minimalist modern appearance.", "Low maintenance indoor decor."),

    ("Monstera Deliciosa", "Monstera deliciosa", "Swiss Cheese Plant, Split-leaf Philodendron",
     "Bright Indirect Filtered Light", "Water when top 2-3 inches of potting mix feel dry. Do not waterlog.",
     "Chunky, airy aroid mix: cocopeat, bark chips, perlite, and vermicompost.",
     "Liquid foliage fertilizer every 3 weeks during spring and summer.",
     "Iconic tropical houseplant with dramatic perforated heart-shaped leaves; climbing moss pole companion.", "Clean leaves with damp cloth."),

    ("Monstera Adansonii", "Monstera adansonii", "Monkey Mask Vine",
     "Bright Filtered Light", "Keep slightly moist.", "Aerated aroid potting mix.", "Balanced liquid feed monthly.",
     "Trailing vine with multiple natural oval windows in every leaf; ideal for hanging baskets.", "Pinch to encourage bushy growth."),

    ("Croton Petra", "Codiaeum variegatum 'Petra'", "Garden Croton",
     "Bright Direct Morning Sunlight (Needed for vivid leaf colors)", "Keep soil evenly moist. High humidity required.",
     "Rich, organic, well-draining garden soil.", "Balanced liquid fertilizer monthly.",
     "Spectacular leathery leaves variegated with brilliant veins of yellow, scarlet, orange, and emerald green.", "Avoid cold drafts."),

    ("Croton Gold Dust", "Codiaeum variegatum 'Gold Dust'", "Gold Dust Plant",
     "Bright Sunlight", "Water when surface dries.", "Well-drained loam.", "Compost quarterly.",
     "Dense green leaves sprinkled with hundreds of bright golden-yellow speckles.", "Great hedge and patio potted accent."),

    ("Aglaonema Red Lipstick", "Aglaonema commutatum 'Siam Aurora'", "Chinese Evergreen",
     "Bright Indirect to Medium Filtered Light", "Water when top half of pot is dry. Very sensitive to overwatering.",
     "Porous potting mix of cocopeat, perlite, and leaf compost.", "Diluted liquid fertilizer every 6 weeks.",
     "Lush green leaves edged with vibrant neon-red and pink borders; top-tier luxury indoor houseplant.", "Purifies indoor air toxins."),

    ("Aglaonema Silver Queen", "Aglaonema 'Silver Queen'", "Silver Chinese Evergreen",
     "Low to Medium Indirect Light", "Allow topsoil to dry.", "Airy well-drained mix.", "Light feeding in summer.",
     "Silver-grey variegated lance-shaped foliage tolerant of low office lighting.", "Extremely resilient."),

    ("Rubber Plant Burgundy", "Ficus elastica 'Burgundy'", "Indian Rubber Tree",
     "Bright Indirect Light with Some Morning Sun", "Water thoroughly when top 2 inches dry. Avoid wet feet.",
     "Well-draining rich potting soil with perlite.", "Balanced houseplant fertilizer monthly in growing season.",
     "Bold, thick, leathery leaves in deep glossy burgundy-black with crimson leaf sheaths.", "Stately indoor statement plant."),

    ("Rubber Plant Tineke", "Ficus elastica 'Tineke'", "Variegated Rubber Plant",
     "Bright Indirect Sunlight", "Water when top 2 inches dry.", "Well-draining aroid mix.", "Monthly liquid feed.",
     "Mesmerizing camouflage variegation of cream, blush pink, and sage green.", "Needs bright light to maintain variegation."),

    ("ZZ Plant", "Zamioculcas zamiifolia", "Zanzibar Gem, Eternity Plant",
     "Low to Bright Indirect Light (Thrives in windowless offices)", "Water once every 3-4 weeks. Underground rhizomes store water.",
     "Well-draining potting soil with coarse sand or perlite.", "Feed twice a year.",
     "Ultra-glossy feathered zigzag stems that look polished; virtually indestructible.", "Do not overwater."),

    ("ZZ Plant Raven", "Zamioculcas zamiifolia 'Raven'", "Black ZZ Plant",
     "Low to Medium Light", "Water once a month.", "Fast-draining gritty mix.", "Minimal feed.",
     "Emerges bright green then matures into dramatic pitch-black foliage.", "Rare luxury collectors plant."),

    ("Money Plant Golden Pothos", "Epipremnum aureum", "Devil's Ivy, Golden Pothos",
     "Low to Bright Filtered Light", "Water when top inch is dry or leaves slightly soften. Can grow in soil or water vase.",
     "Standard garden soil or potting mix with cocopeat.", "Organic vermicompost or liquid seaweed monthly.",
     "Auspicious trailing vine with golden-yellow marbled heart-shaped leaves; effortless propagation.", "NASA air purifier."),

    ("Neon Pothos", "Epipremnum aureum 'Neon'", "Lime Pothos",
     "Bright Indirect Light", "Water when dry.", "Well-draining potting mix.", "Monthly feed.",
     "Electric chartreuse/lime-green leaves that illuminate shaded corners.", "Great hanging basket vine."),

    ("Marble Queen Pothos", "Epipremnum aureum 'Marble Queen'", "Marble Pothos",
     "Bright Filtered Light", "Water when topsoil dries.", "Airy potting compost.", "Balanced liquid feed.",
     "Heavily splashed with creamy white and emerald marbling.", "Slower growing due to high white variegation."),

    ("Golden Cypress", "Cupressus macrocarpa 'Goldcrest'", "Lemon Cypress",
     "Full Sunlight to Bright Partial Sun", "Water when top inch is dry; do not let root ball dry out completely.",
     "Well-draining sandy loam.", "Evergreen conifer feed in spring.",
     "Conical compact evergreen tree with brilliant golden-yellow foliage that releases a fresh lemon scent when brushed.", "Topiary favorite."),

    ("Song of India", "Dracaena reflexa", "Pleomele",
     "Bright Indirect Light with Some Morning Sun", "Water when topsoil is dry.", "Light well-draining garden soil.",
     "Liquid houseplant feed every 6 weeks.",
     "Spiraling narrow leaves with brilliant golden-yellow edges and rich green centers.", "Popular architectural landscaping shrub."),

    ("Dracaena Mahatma", "Cordyline fruticosa 'Mahatma'", "Ti Plant, Red Dracaena",
     "Bright Indirect to Moderate Direct Sun", "Keep soil evenly moist; high humidity lover.", "Rich loamy soil.", "Balanced fertilizer monthly.",
     "Stunning tropical lanceolate leaves in deep metallic purple with bright magenta/fuchsia borders.", "Landscape border highlight."),

    ("Lucky Bamboo", "Dracaena sanderiana", "Friendship Bamboo",
     "Bright Indirect Filtered Light", "Can grow in clean water with pebbles; change water every 10 days.", "Water vase or well-drained potting mix.", "Few drops of liquid plant food monthly.",
     "Auspicious Feng Shui plant arranged in braided, spiraled, or tiered stalks.", "Keep away from direct harsh sun."),

    ("Boston Fern", "Nephrolepis exaltata", "Sword Fern",
     "Bright Filtered Shade / High Humidity", "Keep soil consistently moist. Mist fronds regularly in dry weather.", "Peat moss, cocopeat, and compost.", "Half-strength liquid feed monthly.",
     "Lush cascading arching feathery fronds; premier hanging basket and verandah plant.", "Removes formaldehyde and cleans air."),

    ("Maidenhair Fern", "Adiantum raddianum", "Delta Maidenhair",
     "Dappled Shade / High Humidity", "Soil must never dry out; keep constantly moist.", "Moisture-retentive light peat compost.", "Gentle organic feed.",
     "Delicate fan-shaped lime green leaflets on wire-thin black ebony stems.", "Bathroom or terrarium companion."),

    ("Spider Plant", "Chlorophytum comosum 'Variegatum'", "Ribbon Plant, Airplane Plant",
     "Bright Indirect Light to Light Shade", "Water moderately when topsoil dries. Drought tolerant tuberous roots.", "Porous potting soil.", "Balanced liquid feed every 4 weeks.",
     "Cascading ribbon foliage with central cream stripe, sending out arching stolons with baby spiderettes.", "Pet-friendly air cleaner."),

    ("Syngonium Arrowhead", "Syngonium podophyllum", "Goosefoot Plant, White Butterfly",
     "Low to Bright Filtered Light", "Water when top inch dries.", "Moist, rich, well-draining mix.", "Monthly liquid fertilizer.",
     "Arrow-shaped leaves in variegated silvery-white and green; compact bush when young, trailing climber when mature.", "Effortless houseplant."),

    ("Philodendron Birkin", "Philodendron 'Birkin'", "White Wave Philodendron",
     "Bright Indirect Light", "Allow top 2 inches to dry between waterings.", "Chunky aroid potting mix.", "Balanced liquid feed every 4 weeks.",
     "Compact upright plant with dark green leaves adorned with sharp pinstripes of creamy white.", "Sophisticated indoor desk plant."),

    ("Heartleaf Philodendron", "Philodendron hederaceum", "Sweetheart Plant, Green Oxycardium",
     "Low to Bright Indirect Light", "Water when surface dries.", "General potting soil with cocopeat.", "Feed monthly in spring.",
     "Vigorous trailing vine with glossy heart-shaped emerald green leaves.", "Tolerates low humidity and neglect."),

    ("Calathea Medallion", "Goeppertia veitchiana", "Medallion Prayer Plant",
     "Medium to Bright Indirect Light (No direct sun)", "Keep evenly moist with distilled/rain water. Needs high humidity.", "Peat, perlite, and cocopeat mix.", "Half-strength organic feed monthly.",
     "Exquisite round leaves with feather-like emerald patterns and rich deep burgundy undersides that fold up at night.", "Living art."),

    ("Calathea Orbifolia", "Goeppertia orbifolia", "Giant Striped Prayer Plant",
     "Bright Shaded Light", "Consistently moist soil. High humidity essential.", "Airy moisture-retentive potting mix.", "Diluted liquid feed.",
     "Enormous circular leaves with metallic silver-green brushstroke stripes.", "Statement interior specimen."),

    ("Alocasia Polly", "Alocasia amazonica", "African Mask, Elephant Ear Dwarf",
     "Bright Filtered Indirect Sunlight", "Water when top 2 inches dry. Do not overwater or leave in soggy soil.", "Coarse chunky aroid mix with bark and pumice.", "Balanced liquid fertilizer monthly.",
     "Dramatic shield-shaped arrow leaves with scalloped edges and stark white luminescent veins.", "Modern tropical focal piece."),

    ("Alocasia Zebrina", "Alocasia zebrina", "Zebra Elephant Ear",
     "Bright Indirect Light", "Water when topsoil dries.", "Chunky well-draining aroid soil.", "Feed every 3 weeks in summer.",
     "Arrowhead foliage supported by extraordinary zebra-striped black-and-yellow stalks.", "High fashion houseplant."),

    ("Dwarf Umbrella Plant", "Schefflera arboricola", "Parasol Plant",
     "Bright Indirect Light to Mild Morning Sun", "Water when topsoil dries.", "Well-draining potting soil.", "Balanced houseplant feed monthly.",
     "Hand-shaped clusters of glossy leaflets; bushy, easy to prune, and very hardy.", "Indoor or shaded patio winner."),

    ("English Ivy", "Hedera helix", "Common Ivy",
     "Bright Indirect Light to Medium Shade", "Allow surface to dry between waterings.", "Moist, well-draining garden soil.", "Balanced liquid feed.",
     "Classic trailing evergreen vine with lobed leaves; excellent hanging basket or wall clamberer.", "Tolerates cooler weather."),

    ("Raphis Lady Palm", "Rhapis excelsa", "Bamboo Palm, Lady Palm",
     "Low to Bright Indirect Light", "Water when top 2 inches dry.", "Well-drained rich potting soil.", "Slow release palm food in spring.",
     "Multi-stemmed fan palm with glossy dark-green pleated fronds on bamboo-like fibrous canes.", "Premier luxury hotel lobby palm."),

    ("Travelers Palm", "Ravenala madagascariensis", "East-West Fan Palm",
     "Full Direct Sunlight", "Regular watering.", "Deep, fertile alluvial delta soil.", "Organic cow manure twice a year.",
     "Magnificent giant two-dimensional flat fan of banana-like leaves aligned on a single plane.", "Iconic luxury resort entrance tree."),

    ("Sago Palm", "Cycas revoluta", "Japanese Sago Palm, Living Fossil",
     "Full Sun to Bright Light", "Low water needs; allow soil to dry thoroughly. Very rot susceptible if overwatered.", "Gritty, sandy, well-draining soil.", "Slow-release cycad fertilizer in spring.",
     "Prehistoric slow-growing cycad with symmetrical rosette of glossy dark green stiff pinnate fronds.", "Decades-long durability."),

    ("Duranta Gold", "Duranta erecta 'Aurea'", "Golden Dewdrop, Pigeon Berry",
     "Full Direct Sunlight", "Moderate watering.", "Adaptable garden loam.", "Light compost annually.",
     "Vibrant golden-lime foliage that forms dense colorful hedges and geometric topiaries.", "Premier landscape boundary border."),

    ("Copper Plant Acalypha", "Acalypha wilkesiana", "Jacob's Coat, Copperleaf",
     "Full Sun to Bright Light", "Regular watering.", "Rich, moist, well-drained loam.", "Balanced fertilizer in spring.",
     "Spectacular crinkled heart leaves in fiery shades of copper, bronze, red, and cream.", "High-impact garden shrub."),

    ("Coleus Rainbow", "Plectranthus scutellarioides", "Painted Nettle",
     "Bright Morning Sun or Dappled Afternoon Shade", "Keep soil moist at all times. Wilts quickly when thirsty.", "Fertile, humus-rich potting mix.", "Light organic liquid feed every 2 weeks.",
     "Eye-popping leaf color combinations in neon pink, velvet burgundy, lime green, and gold.", "Pinch flower buds to maintain bushy foliage."),

    ("Asparagus Foxtail Fern", "Asparagus densiflorus 'Meyersii'", "Foxtail Fern",
     "Bright Light with Some Direct Morning Sun", "Water when top inch dries; tuberous roots store water.", "Light well-draining sandy loam.", "Balanced feed monthly.",
     "Dense, plume-like upright bright green arching sprays resembling fluffy fox tails.", "Hardy border and pot plant."),

    ("Yucca Elephantipes", "Yucca elephantipes", "Spineless Yucca",
     "Full Sun to Bright Light", "Water sparingly. Drought tolerant succulent tree.", "Gritty, sandy, fast-draining soil.", "Feed in spring.",
     "Sturdy wooden trunk topped with rosettes of sword-like spineless architectural leaves.", "Extremely tough indoor/outdoor accent."),

    ("Ponytail Palm", "Beaucarnea recurvata", "Elephant's Foot Tree",
     "Full Sun to Bright Indirect Light", "Water deeply then let dry out completely. Swollen base stores water for months.", "Cactus/succulent fast-draining gritty mix.", "Feed twice a year.",
     "Fascinating bulbous swollen caudex trunk topped with cascading fountain of slender curly leaves.", "Unique low-maintenance houseplant."),

    ("Canna Indica Bronze", "Canna indica 'Tropicanna'", "Red Canna",
     "Full Sun", "Loves abundant moisture.", "Rich, wet, fertile soil.", "High organic manure.",
     "Striking striped bronze-burgundy banana foliage topped with glowing scarlet flowers.", "Water edge and tropical landscape stunner."),

    ("Alternanthera Red", "Alternanthera ficoidea", "Joseph's Coat, Border Hedge",
     "Full Sun for Deepest Color", "Regular watering.", "Any well-drained garden soil.", "Compost twice a year.",
     "Dense dwarf creeping groundcover with deep burgundy-red foliage; perfect for garden borders and lawn edging.", "Easily trimmed into crisp lines."),

    ("Variegated Pandanus", "Pandanus baptistii 'Aureus'", "Golden Striped Screw Pine",
     "Full Sun to Bright Filtered Light", "Water moderately.", "Sandy loam with good drainage.", "Compost in monsoon.",
     "Spineless arching sword leaves with bright golden-yellow central stripes; develops stilt roots.", "Dramatic coastal and tropical feature."),

    ("Giant Bamboo", "Dendrocalamus giganteus", "Giant Timber Bamboo",
     "Full Sun", "High water requirement.", "Deep alluvial delta loam.", "Organic farmyard manure.",
     "The largest bamboo species with massive culms reaching 8-12 inches in diameter; majestic natural grove.", "Windbreak and timber marvel."),

    ("Golden Bamboo", "Phyllostachys aurea", "Fishpole Bamboo",
     "Full Sun to Partial Sun", "Regular watering.", "Moist fertile soil.", "Organic mulch.",
     "Upright canes turning luminous golden-yellow with sun exposure; dense privacy screening.", "Popular zen garden bamboo."),

    ("Ficus Starlight", "Ficus benjamina 'Starlight'", "Variegated Weeping Fig",
     "Bright Indirect Sunlight", "Water when top 2 inches dry.", "Well-drained rich potting soil.", "Balanced liquid feed monthly.",
     "Graceful weeping branches densely clothed in crisp white and emerald marbled leaves.", "Chic architectural indoor tree.")
]

def generate_knowledge_base():
    base_dir = Path(__file__).resolve().parents[1]
    kb_json_path = base_dir / "knowledge" / "plant_database.json"
    chunks_file = base_dir / "knowledge" / "chunks.xlsx"

    all_plants = []
    
    # Process Flowers
    for item in FLOWERS:
        name, bot, aliases, sun, water, soil, fert, extra, pest = item
        all_plants.append({
            "category": "Flower",
            "name": name,
            "botanical_name": bot,
            "aliases": aliases,
            "sunlight": sun,
            "watering": water,
            "soil": soil,
            "fertilizer": fert,
            "highlights": extra,
            "care_pest": pest,
            "nursery_availability": "Available in various sizes at Green Shade Nursery, Kadiyapu Savaram."
        })

    # Process Fruits
    for item in FRUITS:
        name, bot, aliases, sun, water, soil, fert, extra, pest = item
        all_plants.append({
            "category": "Fruit",
            "name": name,
            "botanical_name": bot,
            "aliases": aliases,
            "sunlight": sun,
            "watering": water,
            "soil": soil,
            "fertilizer": fert,
            "highlights": extra,
            "care_pest": pest,
            "nursery_availability": "Grafted, hardened saplings available directly at Green Shade Nursery, Kadiyapu Savaram."
        })

    # Process Bonsai
    for item in BONSAI:
        name, bot, aliases, sun, water, soil, fert, extra, pest = item
        all_plants.append({
            "category": "Bonsai",
            "name": name,
            "botanical_name": bot,
            "aliases": aliases,
            "sunlight": sun,
            "watering": water,
            "soil": soil,
            "fertilizer": fert,
            "highlights": extra,
            "care_pest": pest,
            "nursery_availability": "Handcrafted mature bonsai specimens and starter stock available at Green Shade Nursery, Kadiyapu Savaram."
        })

    # Process Nursery Plants
    for item in NURSERY_PLANTS:
        name, bot, aliases, sun, water, soil, fert, extra, pest = item
        all_plants.append({
            "category": "Nursery Plant",
            "name": name,
            "botanical_name": bot,
            "aliases": aliases,
            "sunlight": sun,
            "watering": water,
            "soil": soil,
            "fertilizer": fert,
            "highlights": extra,
            "care_pest": pest,
            "nursery_availability": "100% locally acclimatized in Kadiyapu Savaram nursery grounds. Available for retail and wholesale truckload."
        })

    print(f"Total plants compiled: {len(all_plants)}")
    print(f"Flowers: {len(FLOWERS)}, Fruits: {len(FRUITS)}, Bonsai: {len(BONSAI)}, Nursery Plants: {len(NURSERY_PLANTS)}")

    # 1. Save JSON
    with open(kb_json_path, "w", encoding="utf-8") as f:
        json.dump(all_plants, f, indent=2, ensure_ascii=False)
    print(f"Saved database to {kb_json_path}")

    # 2. Append formatted knowledge chunks to chunks.xlsx (CSV)
    # Read existing chunks count
    existing_rows = []
    max_id = 0
    if chunks_file.exists():
        try:
            with open(chunks_file, "r", encoding="utf-8") as f:
                reader = csv.reader(f)
                header = next(reader, None)
                for row in reader:
                    if row:
                        existing_rows.append(row)
                        try:
                            max_id = max(max_id, int(row[0]))
                        except Exception:
                            pass
        except Exception as e:
            print("Error reading existing chunks:", e)

    print(f"Existing chunks in chunks.xlsx: {len(existing_rows)}, Max ID: {max_id}")

    new_rows = []
    current_id = max_id + 1

    for p in all_plants:
        chunk_text = (
            f"Plant Name: {p['name']}\n"
            f"Botanical Name: {p['botanical_name']}\n"
            f"Local / Known Names: {p['aliases']}\n"
            f"Category: {p['category']}\n"
            f"Sunlight & Light: {p['sunlight']}\n"
            f"Watering Instructions: {p['watering']}\n"
            f"Soil Requirements: {p['soil']}\n"
            f"Fertilizer & Nutrition: {p['fertilizer']}\n"
            f"Botanical Features & Seasonal Care: {p['highlights']}\n"
            f"Pests & Pruning Care: {p['care_pest']}\n"
            f"Green Shade Nursery Availability: {p['nursery_availability']}"
        )
        new_rows.append([current_id, chunk_text])
        current_id += 1

    with open(chunks_file, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["id", "text"])
        for r in existing_rows:
            writer.writerow(r)
        for r in new_rows:
            writer.writerow(r)

    print(f"Successfully wrote {len(existing_rows) + len(new_rows)} total rows to {chunks_file}!")

if __name__ == "__main__":
    generate_knowledge_base()
