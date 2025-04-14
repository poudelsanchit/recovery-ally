export interface Injury {
  id: number;
  name: string;
  category: string;
  common_causes: string[];
  symptoms: string[];
  recovery_time: {
    non_surgical?: string;
    surgical?: string;
    grade_1?: string;
    grade_2?: string;
    grade_3?: string;
  };
  treatment: string[];
  prevention_tips?: string[];
}

export const sportsInjuries: Injury[] = [
  {
    id: 1,
    name: "ACL Tear (Anterior Cruciate Ligament)",
    category: "🦵 Knee",
    common_causes: [
      "Sudden stops or changes in direction (e.g., soccer, basketball)",
      "Improper landing from a jump",
      "Direct collision (e.g., football tackle)",
    ],
    symptoms: [
      "Loud 'pop' at time of injury",
      "Severe knee pain",
      "Swelling within 6 hours",
      "Knee instability (feeling of buckling)",
    ],
    recovery_time: {
      non_surgical: "6-12 months (with rehab)",
      surgical: "9-12 months (post-ACL reconstruction)",
    },
    treatment: [
      "RICE (Rest, Ice, Compression, Elevation) initially",
      "Physical therapy (quad/hamstring strengthening)",
      "Surgery for athletes (arthroscopic reconstruction)",
    ],
    prevention_tips: [
      "Strengthen hamstrings and glutes",
      "Practice proper landing techniques",
      "Use knee braces for high-risk sports",
    ],
  },
  {
    id: 2,
    name: "Meniscus Bucket-Handle Tear",
    category: "🦵 Knee",
    common_causes: [
      "Deep squatting or twisting (e.g., wrestling, hockey)",
      "Acute trauma (e.g., football tackle)",
    ],
    symptoms: [
      "Knee locking (inability to fully straighten)",
      "Swelling",
      "Pain when twisting or squatting",
    ],
    recovery_time: {
      non_surgical: "4-8 weeks (minor tears)",
      surgical: "3-6 months (post-arthroscopic repair)",
    },
    treatment: [
      "Surgery often required (due to locking)",
      "Partial meniscectomy (trim torn flap)",
      "Meniscus repair (for younger patients)",
    ],
  },
  {
    id: 3,
    name: "Rotator Cuff Tear",
    category: "💪 Shoulder",
    common_causes: [
      "Repetitive overhead motions (e.g., baseball pitching, swimming)",
      "Acute trauma (e.g., fall on outstretched arm)",
    ],
    symptoms: [
      "Dull shoulder pain (worse at night)",
      "Weakness when lifting objects",
      "Clicking/popping sounds",
    ],
    recovery_time: {
      non_surgical: "3-6 months (with PT)",
      surgical: "6-12 months (post-repair)",
    },
    treatment: [
      "Cortisone injections (for inflammation)",
      "Physical therapy (rotator cuff strengthening)",
      "Surgery for full-thickness tears",
    ],
  },
  {
    id: 4,
    name: "Hamstring Strain (Grade 2)",
    category: "🦿 Thigh",
    common_causes: [
      "Sprinting (e.g., soccer, track)",
      "Inadequate warm-up",
      "Muscle imbalance (weak glutes)",
    ],
    symptoms: [
      "Sharp pain during activity",
      "Bruising (back of thigh)",
      "Tenderness to touch",
    ],
    recovery_time: {
      grade_1: "2-4 weeks",
      grade_2: "4-8 weeks",
      grade_3: "3-6 months (possible surgery)",
    },
    treatment: [
      "Avoid stretching initially (focus on compression)",
      "Eccentric strengthening (Nordic curls)",
      "Gradual return to running",
    ],
  },
  {
    id: 5,
    name: "Ankle Inversion Sprain (Grade 2)",
    category: "👣 Ankle",
    common_causes: [
      "Rolling ankle outward (e.g., basketball, trail running)",
      "Landing awkwardly from a jump",
    ],
    symptoms: [
      "Swelling/lateral bruising",
      "Difficulty walking",
      "Tenderness over ligaments",
    ],
    recovery_time: {
      grade_1: "1-2 weeks",
      grade_2: "4-6 weeks",
      grade_3: "8-12 weeks (possible surgery)",
    },
    treatment: [
      "RICE protocol first 72 hours",
      "Balance exercises (BOSU ball)",
      "Bracing for return to sport",
    ],
  },
  {
    id: 6,
    name: "Labral Tear (Shoulder)",
    category: "💪 Shoulder",
    common_causes: [
      "Repetitive throwing (e.g., baseball pitchers)",
      "Traumatic dislocation",
    ],
    symptoms: [
      "Deep shoulder ache",
      "Feeling of instability",
      "Pain with overhead motions",
    ],
    recovery_time: {
      non_surgical: "3-6 months (PT-focused)",
      surgical: "6-9 months (post-arthroscopic repair)",
    },
    treatment: [
      "Activity modification (avoid overhead motions)",
      "Surgery for athletes (labrum repair)",
    ],
  },
  {
    id: 7,
    name: "Patellofemoral Pain Syndrome (Runner’s Knee)",
    category: "🦵 Knee",
    common_causes: [
      "Overuse from running or jumping activities",
      "Muscle imbalances or weaknesses",
      "Improper alignment of the kneecap",
    ],
    symptoms: [
      "Pain around or behind the kneecap",
      "Worsening pain with stairs, squatting, or sitting for long periods",
      "Grinding or clicking sounds in the knee",
    ],
    recovery_time: {
      non_surgical: "4-6 weeks with rest and physical therapy",
    },
    treatment: [
      "Rest and activity modification",
      "Strengthening exercises for quadriceps and hip muscles",
      "Use of orthotics or taping techniques",
    ],
    prevention_tips: [
      "Maintain proper training techniques",
      "Strengthen supporting muscles",
      "Use appropriate footwear",
    ],
  },
  {
    id: 8,
    name: "Iliotibial Band Syndrome (ITBS)",
    category: "🦵 Knee",
    common_causes: [
      "Overuse from running or cycling",
      "Tightness in the iliotibial band",
      "Weak hip abductor muscles",
    ],
    symptoms: [
      "Pain on the outer side of the knee",
      "Swelling or thickening of the tissue where the band moves over the femur",
      "Pain that worsens with activity",
    ],
    recovery_time: {
      non_surgical: "2-6 weeks with appropriate treatment",
    },
    treatment: [
      "Rest and ice application",
      "Stretching and strengthening exercises",
      "Foam rolling and massage therapy",
    ],
    prevention_tips: [
      "Gradually increase activity levels",
      "Incorporate cross-training",
      "Regularly stretch and strengthen hip muscles",
    ],
  },
  {
    id: 9,
    name: "Quadriceps Strain",
    category: "🦿 Thigh",
    common_causes: [
      "Sudden acceleration or deceleration",
      "Direct blow to the thigh",
      "Overstretching the muscle",
    ],
    symptoms: [
      "Pain in the front of the thigh",
      "Swelling and bruising",
      "Difficulty walking or running",
    ],
    recovery_time: {
      grade_1: "1-2 weeks",
      grade_2: "3-6 weeks",
      grade_3: "6-12 weeks or more",
    },
    treatment: [
      "Rest and ice application",
      "Compression and elevation",
      "Physical therapy for strengthening",
    ],
    prevention_tips: [
      "Proper warm-up before activities",
      "Regular stretching and strengthening exercises",
      "Avoid sudden increases in training intensity",
    ],
  },
  {
    id: 10,
    name: "Achilles Tendinitis",
    category: "👣 Ankle",
    common_causes: [
      "Overuse from running or jumping",
      "Sudden increase in physical activity",
      "Tight calf muscles",
    ],
    symptoms: [
      "Pain and stiffness along the Achilles tendon",
      "Swelling in the back of the ankle",
      "Limited range of motion when flexing the foot",
    ],
    recovery_time: {
      non_surgical: "4-6 weeks with conservative treatment",
    },
    treatment: [
      "Rest and ice application",
      "Stretching and strengthening exercises",
      "Use of heel lifts or orthotics",
    ],
    prevention_tips: [
      "Gradually increase activity levels",
      "Regularly stretch calf muscles",
      "Wear supportive footwear",
    ],
  },
  {
    id: 11,
    name: "Shoulder Impingement Syndrome",
    category: "💪 Shoulder",
    common_causes: [
      "Repetitive overhead activities",
      "Poor posture",
      "Muscle imbalances",
    ],
    symptoms: [
      "Pain during shoulder movements",
      "Weakness in the shoulder",
      "Difficulty reaching behind the back",
    ],
    recovery_time: {
      non_surgical: "4-8 weeks with appropriate therapy",
    },
    treatment: [
      "Rest and avoidance of aggravating activities",
      "Physical therapy focusing on shoulder mechanics",
      "Anti-inflammatory medications",
    ],
    prevention_tips: [
      "Maintain good posture",
      "Strengthen rotator cuff and scapular muscles",
      "Avoid repetitive overhead motions without proper conditioning",
    ],
  },
  {
    id: 12,
    name: "Concussion",
    category: "🧠 Head",
    common_causes: [
      "Blow to the head during contact sports",
      "Falls or collisions",
      "Sudden acceleration or deceleration forces",
    ],
    symptoms: [
      "Headache and confusion",
      "Dizziness and nausea",
      "Sensitivity to light and noise",
    ],
    recovery_time: {
      non_surgical: "1-3 weeks with rest and gradual return to activity",
    },
    treatment: [
      "Immediate rest and monitoring",
      "Gradual return to activities under medical supervision",
      "Avoidance of activities that risk another head injury",
    ],
    prevention_tips: [
      "Use appropriate protective gear",
      "Follow safety protocols in sports",
      "Educate athletes on recognizing concussion symptoms",
    ],
  },
  {
    id: 13,
    name: "Medial Collateral Ligament (MCL) Tear",
    category: "🦵 Knee",
    common_causes: [
      "Direct blow to the outside of the knee",
      "Sudden twisting or pivoting movements",
    ],
    symptoms: [
      "Pain on the inner side of the knee",
      "Swelling and tenderness",
      "Instability when walking or standing",
    ],
    recovery_time: {
      grade_1: "1-2 weeks",
      grade_2: "3-6 weeks",
      grade_3: "6-8 weeks or more",
    },
    treatment: [
      "Rest and ice application",
      "Compression and elevation",
      "Physical therapy for strengthening",
      "Bracing or taping for support",
    ],
    prevention_tips: [
      "Proper warm-up before activities",
      "Strengthening exercises for knee stability",
      "Use of protective gear during contact sports",
    ],
  },
  {
    id: 14,
    name: "Posterior Cruciate Ligament (PCL) Injury",
    category: "🦵 Knee",
    common_causes: [
      "Direct impact to the front of the knee",
      "Falling on a bent knee",
      "Car accidents",
    ],
    symptoms: [
      "Pain in the back of the knee",
      "Swelling and stiffness",
      "Difficulty walking or bearing weight",
    ],
    recovery_time: {
      grade_1: "2-4 weeks",
      grade_2: "4-8 weeks",
      grade_3: "8-12 weeks or more",
    },
    treatment: [
      "Rest and ice application",
      "Physical therapy focusing on strengthening",
      "Use of knee braces",
      "Surgical intervention in severe cases",
    ],
    prevention_tips: [
      "Avoid high-risk activities without proper training",
      "Strengthen hamstring and quadriceps muscles",
      "Use proper techniques during sports and exercises",
    ],
  },
  {
    id: 15,
    name: "Knee Bursitis",
    category: "🦵 Knee",
    common_causes: [
      "Frequent kneeling",
      "Overuse or repetitive stress",
      "Direct trauma to the knee",
    ],
    symptoms: [
      "Swelling over the kneecap",
      "Tenderness and warmth",
      "Pain during movement or pressure",
    ],
    recovery_time: {
      non_surgical: "1-2 weeks with rest and treatment",
    },
    treatment: [
      "Rest and avoidance of aggravating activities",
      "Ice application to reduce swelling",
      "Nonsteroidal anti-inflammatory drugs (NSAIDs)",
      "Aspiration of excess fluid if necessary",
    ],
    prevention_tips: [
      "Use knee pads during activities that involve kneeling",
      "Take breaks to avoid prolonged pressure on the knees",
      "Maintain flexibility and strength in leg muscles",
    ],
  },
  {
    id: 16,
    name: "Patellar Tendinitis (Jumper's Knee)",
    category: "🦵 Knee",
    common_causes: [
      "Repetitive jumping or running",
      "Sudden increase in physical activity",
      "Tight quadriceps muscles",
    ],
    symptoms: [
      "Pain and tenderness at the base of the kneecap",
      "Swelling in the knee area",
      "Stiffness during movement",
    ],
    recovery_time: {
      non_surgical: "2-6 weeks with appropriate treatment",
    },
    treatment: [
      "Rest and activity modification",
      "Ice application after activity",
      "Physical therapy focusing on stretching and strengthening",
      "Use of patellar straps or braces",
    ],
    prevention_tips: [
      "Gradually increase activity intensity",
      "Incorporate proper warm-up and cool-down routines",
      "Strengthen and stretch leg muscles regularly",
    ],
  },
  {
    id: 17,
    name: "Knee Fracture",
    category: "🦵 Knee",
    common_causes: [
      "High-impact trauma (e.g., falls, car accidents)",
      "Direct blow to the knee",
      "Severe twisting injuries",
    ],
    symptoms: [
      "Severe pain in the knee",
      "Swelling and bruising",
      "Inability to move or bear weight on the leg",
    ],
    recovery_time: {
      non_surgical: "6-8 weeks with immobilization",
      surgical: "3-6 months depending on severity",
    },
    treatment: [
      "Immobilization with a cast or brace",
      "Surgical intervention for displaced fractures",
      "Physical therapy post-healing",
      "Pain management with medications",
    ],
    prevention_tips: [
      "Use protective gear during high-risk activities",
      "Maintain bone health with proper nutrition",
      "Engage in exercises to improve balance and coordination",
    ],
  },
];

export const getUniqueBodyParts = () => {
  const categories = sportsInjuries.map((injury) => injury.category);
  return [...new Set(categories)];
};

export const getInjuriesByCategory = (category: string) => {
  return sportsInjuries.filter((injury) => injury.category === category);
};

export const getInjuryById = (id: number) => {
  return sportsInjuries.find((injury) => injury.id === id);
};
