import remediesData from '@/data/remedies.json'

export interface Remedy {
  id: string
  name: string
  scientific_name: string
  category: string
  origin: string
  symptoms: string[]
  uses: string[]
  preparation: string
  potency: string
  safety: string
  rating: number
  tags: string[]
}

export function matchRemedies(query: string, limit = 20): Remedy[] {
  try {
    const remedies = remediesData as Remedy[]
    const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 2)
    if (words.length === 0) return []

    const scored = remedies.map(remedy => {
      let score = 0
      const safeSymptoms = Array.isArray(remedy.symptoms) ? remedy.symptoms : []
      const safeUses = Array.isArray(remedy.uses) ? remedy.uses : []
      const safeTags = Array.isArray(remedy.tags) ? remedy.tags : []
      const searchText = [
        ...safeSymptoms,
        ...safeUses,
        ...safeTags,
        remedy.name || '',
        remedy.category || '',
      ].join(' ').toLowerCase()

      words.forEach(word => {
        if (searchText.includes(word)) score += 2
        safeSymptoms.forEach(s => {
          if (s.toLowerCase().includes(word)) score += 3
        })
      })
      return { remedy, score }
    })

    return scored
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(r => r.remedy)
  } catch (e) {
    console.error('matchRemedies error:', e)
    return []
  }
}

export const symptomCategories: Record<string, string[]> = {
  'Pain & Discomfort': [
    'headache', 'migraine', 'joint pain', 'back pain', 'muscle ache',
    'toothache', 'menstrual pain', 'neck pain', 'shoulder pain', 'knee pain',
    'hip pain', 'chest pain', 'foot pain', 'nerve pain', 'sciatica',
    'fibromyalgia', 'chronic pain', 'cramps', 'ear pain', 'abdominal pain',
  ],
  'Energy & Sleep': [
    'fatigue', 'insomnia', 'low energy', 'exhaustion', 'sleep problems',
    'lethargy', 'chronic fatigue', 'daytime sleepiness', 'restless sleep',
    'sleep apnea', 'night sweats', 'jet lag', 'adrenal fatigue', 'drowsiness',
  ],
  'Mental Wellness': [
    'anxiety', 'stress', 'depression', 'poor focus', 'memory loss',
    'mood swings', 'irritability', 'panic attacks', 'PTSD', 'OCD',
    'ADHD', 'bipolar support', 'seasonal depression', 'grief', 'burnout',
    'social anxiety', 'emotional eating', 'addiction support', 'brain fog', 'overthinking',
  ],
  'Digestive Health': [
    'digestion', 'bloating', 'constipation', 'diarrhea', 'nausea',
    'acid reflux', 'IBS', 'indigestion', 'gas', 'heartburn',
    'stomach cramps', 'vomiting', 'appetite loss', 'leaky gut', 'gastritis',
    'food intolerance', 'hemorrhoids', 'parasite cleanse', 'intestinal worms', 'colitis support',
  ],
  'Skin & Hair': [
    'acne', 'eczema', 'psoriasis', 'dry skin', 'hair loss',
    'dandruff', 'wound healing', 'rashes', 'dark spots', 'wrinkles',
    'oily skin', 'hives', 'stretch marks', 'cellulite', 'sunburn',
    'insect bites', 'nail fungus', 'cold sores', 'rosacea', 'warts',
    'vitiligo', 'scalp health',
  ],
  'Immune & Respiratory': [
    'cold', 'flu', 'cough', 'fever', 'allergies',
    'immune support', 'sinus congestion', 'bronchitis', 'asthma', 'sore throat',
    'tonsillitis', 'autoimmune support', 'post-viral fatigue', 'hay fever',
    'shortness of breath', 'runny nose', 'sneezing', 'low immunity', 'lung health', 'pneumonia support',
  ],
  'Heart & Circulation': [
    'high blood pressure', 'high cholesterol', 'heart health', 'poor circulation',
    'blood sugar', 'varicose veins', 'anemia', 'arrhythmia', 'palpitations',
    'atherosclerosis', 'stroke recovery', 'edema', 'cardiovascular support',
    'low blood pressure', 'blood thinning', 'heart palpitations',
  ],
  'Hormones & Vitality': [
    'libido', 'hormonal imbalance', 'fertility', 'menopause', 'testosterone',
    'thyroid support', 'PCOS', 'endometriosis', 'PMS', 'perimenopause',
    'low estrogen', 'adrenal support', 'cortisol balance', 'insulin resistance',
    'growth hormone', 'prolactin issues',
  ],
  'Detox & Metabolism': [
    'liver support', 'kidney support', 'detox', 'weight loss', 'inflammation',
    'antioxidant', 'lymphatic drainage', 'gallbladder support', 'heavy metal detox',
    'blood cleanse', 'obesity', 'slow metabolism', 'water retention', 'fat burning',
    'toxin removal',
  ],
  'Bone & Joint': [
    'arthritis', 'osteoporosis', 'gout', 'rheumatism', 'bone density',
    'cartilage support', 'bursitis', 'tendinitis', 'fracture healing',
    'calcium absorption', 'joint stiffness', 'sports injury', 'sprain recovery', 'scoliosis support',
  ],
  'Eye & Ear': [
    'dry eyes', 'blurry vision', 'eye strain', 'cataracts support',
    'glaucoma support', 'night blindness', 'tinnitus', 'hearing support',
    'ear infection', 'dizziness', 'vertigo', 'macular support', 'conjunctivitis',
  ],
  'Urinary & Kidney': [
    'UTI', 'frequent urination', 'kidney stones', 'kidney cleanse',
    'bladder infection', 'incontinence', 'prostate support',
    'overactive bladder', 'urinary tract health', 'bedwetting',
  ],
  'Nervous System': [
    'neuropathy', 'multiple sclerosis support', 'Parkinsons support',
    'Alzheimers support', 'epilepsy support', 'tremors', 'numbness',
    'tingling', 'cognitive decline', 'nerve regeneration', 'Bells palsy',
  ],
  "Men's Health": [
    'erectile dysfunction', 'premature ejaculation', 'low sperm count',
    'prostate enlargement', 'prostate cancer support', 'male fertility',
    'testosterone boost', 'low libido men', 'gynecomastia',
  ],
  "Women's Health": [
    'irregular periods', 'painful periods', 'heavy bleeding', 'vaginal dryness',
    'breast health', 'cervical health', 'ovarian cysts', 'uterine fibroids',
    'pregnancy support', 'postpartum recovery', 'breastfeeding support',
  ],
  "Children's Health": [
    'teething', 'colic', 'childhood fever', 'growing pains',
    'bed wetting', 'ADHD children', 'childhood immunity',
    'ear infection children', 'skin rash children',
  ],
  'Dental & Oral': [
    'gum disease', 'bad breath', 'mouth ulcers', 'dry mouth',
    'tooth sensitivity', 'oral thrush', 'jaw pain', 'bleeding gums', 'plaque buildup',
  ],
  'Infections & Antimicrobial': [
    'bacterial infection', 'viral infection', 'fungal infection', 'candida',
    'Lyme support', 'malaria support', 'parasites', 'antiviral',
    'antifungal', 'antibacterial', 'MRSA support', 'antibiotic support', 'sepsis support',
  ],
  'Cancer & Serious Support': [
    'cancer support', 'chemo support', 'radiation support', 'tumor reduction',
    'anticancer herbs', 'immune modulation', 'antitumor support',
  ],
  'Aging & Longevity': [
    'anti-aging', 'longevity', 'cognitive aging', 'bone aging',
    'skin aging', 'cellular repair', 'mitochondrial support',
    'autophagy', 'memory aging', 'vision aging',
  ],
}
