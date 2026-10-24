
"use strict";

// ==========================================
// 1. READ THE SELECTED CAREER
// ==========================================

const params = new URLSearchParams(window.location.search);

const role = params.get("role") || "";
const roleNameFromUrl = params.get("roleName") || "";
const studentName = params.get("name") || "";

const roleNames = {
  "software-engineer": "Software Engineer",
  "frontend-developer": "Frontend Developer",
  "backend-developer": "Backend Developer",
  "fullstack-developer": "Full-Stack Developer",
  "mobile-app-developer": "Mobile App Developer",
  "web-developer": "Web Developer",
  "game-developer": "Game Developer",
  "cloud-engineer": "Cloud Engineer",
  "devops-engineer": "DevOps Engineer",
  "qa-engineer": "QA Engineer / Software Tester",
  "solutions-architect": "Solutions Architect",
  "it-support-specialist": "IT Support Specialist",
  "data-analyst": "Data Analyst",
  "data-scientist": "Data Scientist",
  "data-engineer": "Data Engineer",
  "machine-learning-engineer": "Machine Learning Engineer",
  "ai-engineer": "AI Engineer",
  "business-intelligence-analyst": "Business Intelligence Analyst",
  "cybersecurity-analyst": "Cybersecurity Analyst",
  "cybersecurity-engineer": "Cybersecurity Engineer",
  "penetration-tester": "Penetration Tester",
  "digital-forensics-analyst": "Digital Forensics Analyst",
  "business-analyst": "Business Analyst",
  "business-development-manager": "Business Development Manager",
  "project-manager": "Project Manager",
  "product-manager": "Product Manager",
  "operations-manager": "Operations Manager",
  "management-consultant": "Management Consultant",
  "entrepreneur": "Entrepreneur / Business Owner",
  "strategy-analyst": "Strategy Analyst",
  "human-resources": "Human Resources Specialist",
  "recruiter": "Recruiter / Talent Acquisition",
  "accountant": "Accountant",
  "financial-analyst": "Financial Analyst",
  "investment-banker": "Investment Banker",
  "auditor": "Auditor",
  "economist": "Economist",
  "actuary": "Actuary",
  "risk-analyst": "Risk Analyst",
  "tax-consultant": "Tax Consultant",
  "fintech-specialist": "FinTech Specialist",
  "digital-marketer": "Digital Marketer",
  "social-media-manager": "Social Media Manager",
  "seo-specialist": "SEO Specialist",
  "brand-manager": "Brand Manager",
  "marketing-analyst": "Marketing Analyst",
  "public-relations-specialist": "Public Relations Specialist",
  "communications-specialist": "Communications Specialist",
  "content-strategist": "Content Strategist",
  "copywriter": "Copywriter",
  "sales-representative": "Sales Representative",
  "ui-ux-designer": "UI/UX Designer",
  "graphic-designer": "Graphic Designer",
  "product-designer": "Product Designer",
  "web-designer": "Web Designer",
  "animator": "Animator",
  "video-editor": "Video Editor",
  "photographer": "Photographer",
  "fashion-designer": "Fashion Designer",
  "interior-designer": "Interior Designer",
  "architect": "Architect",
  "civil-engineer": "Civil Engineer",
  "mechanical-engineer": "Mechanical Engineer",
  "electrical-engineer": "Electrical Engineer",
  "chemical-engineer": "Chemical Engineer",
  "petroleum-engineer": "Petroleum Engineer",
  "industrial-engineer": "Industrial Engineer",
  "mechatronics-engineer": "Mechatronics Engineer",
  "renewable-energy-engineer": "Renewable Energy Engineer",
  "quality-engineer": "Quality Engineer",
  "health-and-safety-specialist": "Health and Safety Specialist",
  "doctor": "Doctor / Physician",
  "nurse": "Nurse",
  "pharmacist": "Pharmacist",
  "dentist": "Dentist",
  "physiotherapist": "Physiotherapist",
  "medical-laboratory-scientist": "Medical Laboratory Scientist",
  "radiographer": "Radiographer",
  "public-health-specialist": "Public Health Specialist",
  "nutritionist": "Nutritionist / Dietitian",
  "biomedical-scientist": "Biomedical Scientist",
  "biotechnologist": "Biotechnologist",
  "clinical-researcher": "Clinical Researcher",
  "lawyer": "Lawyer / Solicitor",
  "legal-advisor": "Legal Advisor",
  "paralegal": "Paralegal",
  "compliance-officer": "Compliance Officer",
  "policy-analyst": "Policy Analyst",
  "diplomat": "Diplomat / Foreign Service Officer",
  "public-administrator": "Public Administrator",
  "human-rights-officer": "Human Rights Officer",
  "international-relations-specialist": "International Relations Specialist",
  "teacher": "Teacher",
  "university-lecturer": "University Lecturer",
  "academic-researcher": "Academic Researcher",
  "education-consultant": "Education Consultant",
  "instructional-designer": "Instructional Designer",
  "learning-development-specialist": "Learning and Development Specialist",
  "psychologist": "Psychologist",
  "counsellor": "Counsellor",
  "social-worker": "Social Worker",
  "sociologist": "Sociologist",
  "criminologist": "Criminologist",
  "user-researcher": "User Researcher",
  "environmental-scientist": "Environmental Scientist",
  "environmental-engineer": "Environmental Engineer",
  "sustainability-consultant": "Sustainability Consultant",
  "agricultural-engineer": "Agricultural Engineer",
  "agricultural-scientist": "Agricultural Scientist",
  "food-scientist": "Food Scientist",
  "supply-chain-analyst": "Supply Chain Analyst",
  "logistics-manager": "Logistics Manager",
  "procurement-specialist": "Procurement Specialist",
  "aviation-professional": "Aviation Professional",
  "hotel-manager": "Hotel Manager",
  "event-planner": "Event Planner",
  "travel-consultant": "Travel Consultant",
  "journalist": "Journalist",
  "translator": "Translator / Interpreter",
  "customer-success-manager": "Customer Success Manager"
};

const selectedRole =
  roleNameFromUrl.trim() ||
  roleNames[role] ||
  "Your chosen career";

// ==========================================
// 2. UPDATE THE PAGE INTRODUCTION
// ==========================================

const careerTitle = document.getElementById("careerTitle");
const experienceText = document.getElementById("experienceText");
const welcomeText = document.getElementById("welcomeText");

if (careerTitle) {
  careerTitle.textContent = selectedRole;
}

if (experienceText) {
  experienceText.textContent =
    "Every career starts somewhere. Let's work out your next step.";
}

if (welcomeText) {
  welcomeText.textContent = studentName
    ? `Hey ${studentName}! Let's explore what it takes to work towards ${selectedRole}, one step at a time.`
    : `Let's explore what it takes to work towards ${selectedRole}, one step at a time.`;
}

// ==========================================
// 3. CAREER-SPECIFIC PLANS
// Each skill contains: title, description, status
// Each step contains: title, description, task
// ==========================================

const careerPlans = {
  "frontend-developer": {
    skills: [
      ["HTML & CSS", "Build accessible, responsive web pages.", "Start here"],
      ["JavaScript", "Make websites interactive and useful.", "Practise"],
      ["Git & GitHub", "Track your code and share your projects.", "Build next"]
    ],
    steps: [
      ["Strengthen the basics", "Review HTML and CSS, then build a responsive portfolio page.", "Mini project: Portfolio page"],
      ["Bring your website to life", "Use JavaScript to add interactive features and form validation.", "Mini project: Interactive website"],
      ["Share what you've built", "Publish your projects and organise your portfolio.", "Goal: A portfolio you can share"]
    ]
  },

  "lawyer": {
    skills: [
      ["Legal Research", "Find relevant laws, cases and reliable legal sources.", "Start here"],
      ["Legal Writing", "Practise clear legal arguments and concise case summaries.", "Practise"],
      ["Critical Thinking", "Analyse facts and evaluate different arguments.", "Build next"]
    ],
    steps: [
      ["Learn legal research", "Choose a legal topic and find relevant legislation and cases.", "Mini project: Case summary"],
      ["Build a legal argument", "Write a balanced argument using reliable legal sources.", "Mini project: Legal brief"],
      ["Explore your legal pathway", "Research qualification requirements in your intended jurisdiction.", "Goal: Legal career plan"]
    ]
  },

  "data-analyst": {
    skills: [
      ["Excel & Spreadsheets", "Organise information, use formulas and spot patterns.", "Start here"],
      ["SQL", "Retrieve and filter information from databases.", "Practise"],
      ["Data Visualisation", "Turn findings into charts and clear explanations.", "Build next"]
    ],
    steps: [
      ["Get comfortable with data", "Clean a spreadsheet and use formulas to answer questions.", "Mini project: Clean dataset"],
      ["Ask questions with SQL", "Practise SELECT, WHERE, GROUP BY and basic joins.", "Mini project: Database analysis"],
      ["Tell a story with data", "Create a simple dashboard and explain your findings.", "Goal: Data portfolio project"]
    ]
  },

  "cybersecurity-engineer": {
    skills: [
      ["Networking Basics", "Understand IP addresses, ports and network communication.", "Start here"],
      ["Linux & Operating Systems", "Practise command-line navigation and permissions.", "Practise"],
      ["Security Fundamentals", "Learn common vulnerabilities and defensive security.", "Build next"]
    ],
    steps: [
      ["Understand the foundations", "Study networking and practise in a safe learning environment.", "Goal: Networking notes"],
      ["Practise Linux", "Learn common commands, permissions and system basics.", "Mini project: Linux lab"],
      ["Learn defensive security", "Use authorised training labs to explore security concepts.", "Goal: Beginner security lab"]
    ]
  },

  "data-scientist": {
    skills: [
      ["Python", "Use Python to explore, clean and analyse datasets.", "Start here"],
      ["Statistics", "Understand distributions, probability and basic statistical testing.", "Practise"],
      ["Machine Learning", "Learn how to train and evaluate introductory predictive models.", "Build next"]
    ],
    steps: [
      ["Learn Python for data", "Practise with a small dataset using Python and pandas.", "Mini project: Data exploration"],
      ["Understand the numbers", "Explore patterns, correlations and statistical summaries.", "Mini project: Statistical analysis"],
      ["Build a simple model", "Train and evaluate a beginner-friendly machine-learning model.", "Goal: Data science portfolio"]
    ]
  },

  "ui-ux-designer": {
    skills: [
      ["User Research", "Understand users' needs, behaviours and frustrations.", "Start here"],
      ["Wireframes & Prototypes", "Turn ideas into layouts and testable prototypes.", "Practise"],
      ["Usability Testing", "Gather feedback and improve the user experience.", "Build next"]
    ],
    steps: [
      ["Understand a user problem", "Choose an app or website and identify a usability issue.", "Task: User problem statement"],
      ["Design a solution", "Create wireframes and a clickable prototype in a design tool.", "Mini project: App prototype"],
      ["Test and improve", "Collect feedback and explain the changes you made.", "Goal: UX case study"]
    ]
  },

  "software-engineer": {
    skills: [
      ["Programming Fundamentals", "Practise variables, functions, data structures and algorithms.", "Start here"],
      ["Software Design & Testing", "Learn to organise code and test it for common errors.", "Practise"],
      ["Git & Teamwork", "Use version control and learn how developers collaborate.", "Build next"]
    ],
    steps: [
      ["Strengthen programming", "Build a small application using a language you know.", "Mini project: Working application"],
      ["Improve code quality", "Add validation, error handling and tests.", "Mini project: Tested application"],
      ["Publish your project", "Use GitHub to document your project and explain your decisions.", "Goal: Software portfolio"]
    ]
  }
};

// ==========================================
// 4. GENERAL CAREER FAMILY PLANS
// Used for careers without a detailed plan above
// ==========================================

const careerFamilies = {
  technology: {
    skills: [
      ["Technical Foundations", "Learn the core tools and concepts used in this technology role.", "Start here"],
      ["Practical Projects", "Apply what you learn by building or solving a realistic problem.", "Practise"],
      ["Tools & Documentation", "Learn professional tools and document your work clearly.", "Build next"]
    ],
    steps: [
      ["Learn the foundations", "Identify the essential technologies and practise the basics.", "Task: Beginner exercise"],
      ["Build something practical", "Create a small project demonstrating a relevant technical skill.", "Mini project: Technical portfolio"],
      ["Prepare for real work", "Document your work and identify your next learning goal.", "Goal: Shareable project"]
    ]
  },

  data: {
    skills: [
      ["Data Fundamentals", "Understand data quality and how to answer questions with evidence.", "Start here"],
      ["Analysis Tools", "Practise tools such as spreadsheets, SQL, Python or statistical software.", "Practise"],
      ["Visualisation & Insights", "Present findings clearly and explain what they mean.", "Build next"]
    ],
    steps: [
      ["Explore a dataset", "Clean a small dataset and investigate patterns.", "Mini project: Data exploration"],
      ["Analyse a question", "Use appropriate tools to answer a question with evidence.", "Mini project: Data analysis"],
      ["Present your findings", "Create charts or a dashboard and explain your conclusions.", "Goal: Data portfolio"]
    ]
  },

  business: {
    skills: [
      ["Business Fundamentals", "Understand organisational goals, decisions and performance.", "Start here"],
      ["Planning & Analysis", "Research a problem, compare options and propose solutions.", "Practise"],
      ["Communication & Collaboration", "Present recommendations and work effectively with others.", "Build next"]
    ],
    steps: [
      ["Understand the role", "Research responsibilities, industry expectations and useful tools.", "Task: Career research"],
      ["Solve a business problem", "Analyse a realistic scenario and prepare a recommendation.", "Mini project: Business case"],
      ["Show your capabilities", "Prepare a case study or example of your work.", "Goal: Career portfolio"]
    ]
  },

  finance: {
    skills: [
      ["Financial Fundamentals", "Learn the financial concepts and terminology used in your role.", "Start here"],
      ["Numerical Analysis", "Practise calculations, spreadsheets and interpreting financial information.", "Practise"],
      ["Accuracy & Ethics", "Develop careful record-keeping and evidence-based judgement.", "Build next"]
    ],
    steps: [
      ["Learn the fundamentals", "Study the core concepts and requirements of your chosen finance role.", "Task: Fundamentals notes"],
      ["Practise with financial data", "Use sample data for a calculation, analysis or financial report.", "Mini project: Financial analysis"],
      ["Explain your findings", "Prepare a clear report and check your work for accuracy.", "Goal: Sample report"]
    ]
  },

  marketing: {
    skills: [
      ["Audience & Market Research", "Understand your audience, competitors and customer needs.", "Start here"],
      ["Content & Campaigns", "Practise creating content or planning a focused campaign.", "Practise"],
      ["Performance Measurement", "Use metrics and feedback to evaluate results.", "Build next"]
    ],
    steps: [
      ["Research an audience", "Identify a brand's audience, competitors and positioning.", "Task: Audience profile"],
      ["Create a campaign", "Develop a campaign concept with a clear objective.", "Mini project: Campaign plan"],
      ["Measure success", "Choose relevant metrics and explain how to improve results.", "Goal: Marketing portfolio"]
    ]
  },

  design: {
    skills: [
      ["Design Fundamentals", "Learn the principles, methods and tools used in your design field.", "Start here"],
      ["Creative Practice", "Develop ideas through sketches, concepts, drafts or prototypes.", "Practise"],
      ["Portfolio & Presentation", "Present your process, decisions and final work clearly.", "Build next"]
    ],
    steps: [
      ["Study good examples", "Explore work in your chosen field and identify what makes it effective.", "Task: Inspiration board"],
      ["Create an original piece", "Complete a small brief demonstrating your creative skills.", "Mini project: Portfolio piece"],
      ["Present your process", "Refine your work and organise it into a portfolio.", "Goal: Portfolio update"]
    ]
  },

  engineering: {
    skills: [
      ["Engineering Principles", "Learn the technical principles relevant to your specialisation.", "Start here"],
      ["Technical Tools", "Practise relevant software, calculations, testing or design methods.", "Practise"],
      ["Safety & Quality", "Understand standards, documentation and safe professional practice.", "Build next"]
    ],
    steps: [
      ["Review the fundamentals", "Identify core concepts and practise solving introductory problems.", "Task: Problem set"],
      ["Apply your knowledge", "Complete a small design, simulation or technical case study.", "Mini project: Technical case study"],
      ["Document your work", "Explain your method, assumptions, results and safety considerations.", "Goal: Engineering portfolio"]
    ]
  },

  healthcare: {
    skills: [
      ["Scientific Foundations", "Study relevant scientific concepts for your chosen field.", "Start here"],
      ["Evidence & Practical Skills", "Learn how evidence and supervised practice support the role.", "Practise"],
      ["Ethics & Communication", "Understand professional boundaries, confidentiality and communication.", "Build next"]
    ],
    steps: [
      ["Understand the profession", "Research qualifications, professional standards and scope of practice.", "Task: Qualification research"],
      ["Strengthen your knowledge", "Study a relevant topic using reliable sources.", "Task: Evidence-based summary"],
      ["Plan your development", "Identify suitable supervised learning or approved practical experience.", "Goal: Development plan"]
    ]
  },

  law: {
    skills: [
      ["Legal Research", "Find relevant laws, cases and reliable legal sources.", "Start here"],
      ["Legal Writing", "Practise clear arguments and concise case summaries.", "Practise"],
      ["Critical Thinking", "Analyse facts and evaluate competing arguments fairly.", "Build next"]
    ],
    steps: [
      ["Learn legal research", "Choose a legal topic and find relevant legislation and cases.", "Mini project: Case summary"],
      ["Build an argument", "Write a balanced argument using reliable legal sources.", "Mini project: Legal brief"],
      ["Explore professional requirements", "Research qualifications required in your jurisdiction.", "Goal: Legal career plan"]
    ]
  },

  education: {
    skills: [
      ["Subject Knowledge", "Strengthen your understanding of your chosen subject.", "Start here"],
      ["Teaching & Learning", "Explore ways to explain concepts and assess understanding.", "Practise"],
      ["Communication & Reflection", "Give clear explanations and improve through feedback.", "Build next"]
    ],
    steps: [
      ["Identify your specialisation", "Research qualifications and knowledge expected in the role.", "Task: Career research"],
      ["Create a learning resource", "Prepare a lesson outline, research summary or learning activity.", "Mini project: Learning resource"],
      ["Review your approach", "Gather feedback and refine your work.", "Goal: Education portfolio"]
    ]
  },

  socialScience: {
    skills: [
      ["Research Methods", "Learn how to investigate questions using appropriate methods.", "Start here"],
      ["Analysis & Interpretation", "Interpret evidence and draw careful conclusions.", "Practise"],
      ["Ethics & Communication", "Consider confidentiality, bias and responsible communication.", "Build next"]
    ],
    steps: [
      ["Explore a relevant question", "Choose a topic and review reliable research.", "Task: Research summary"],
      ["Analyse the evidence", "Compare findings and explain what remains uncertain.", "Mini project: Evidence review"],
      ["Present your conclusions", "Create a concise report explaining your method and findings.", "Goal: Research portfolio"]
    ]
  },

  science: {
    skills: [
      ["Scientific Foundations", "Build knowledge of principles used in your specialisation.", "Start here"],
      ["Research & Testing", "Learn appropriate methods for collecting or analysing information.", "Practise"],
      ["Results & Reporting", "Record results and explain evidence and limitations.", "Build next"]
    ],
    steps: [
      ["Review the science", "Choose a topic and study reliable introductory resources.", "Task: Topic summary"],
      ["Explore a practical question", "Plan a small investigation or analyse an existing dataset.", "Mini project: Investigation"],
      ["Report what you learned", "Summarise your methods, findings and limitations.", "Goal: Research report"]
    ]
  },

  logistics: {
    skills: [
      ["Operations Fundamentals", "Understand how resources, goods or workflows move through a system.", "Start here"],
      ["Planning & Coordination", "Practise scheduling, prioritising and solving operational problems.", "Practise"],
      ["Performance Improvement", "Identify delays, costs or quality issues using appropriate metrics.", "Build next"]
    ],
    steps: [
      ["Map a process", "Identify the stages and possible bottlenecks in a familiar process.", "Task: Process map"],
      ["Solve a practical problem", "Suggest improvements to time, cost, quality or coordination.", "Mini project: Improvement proposal"],
      ["Measure the outcome", "Define useful performance indicators and how to track them.", "Goal: Operations case study"]
    ]
  },

  hospitality: {
    skills: [
      ["Industry Knowledge", "Understand the services and standards expected in your field.", "Start here"],
      ["Customer Experience", "Practise responding professionally to customer needs.", "Practise"],
      ["Planning & Coordination", "Develop organisation, teamwork and attention to detail.", "Build next"]
    ],
    steps: [
      ["Explore the industry", "Research typical employers, responsibilities and service standards.", "Task: Industry research"],
      ["Plan an experience", "Create a sample itinerary, event plan or service proposal.", "Mini project: Service plan"],
      ["Review the details", "Consider practical requirements, risks and customer satisfaction.", "Goal: Professional portfolio"]
    ]
  },

  communication: {
    skills: [
      ["Research & Fact-Checking", "Verify information and use reliable sources.", "Start here"],
      ["Writing & Storytelling", "Communicate clearly for your intended audience.", "Practise"],
      ["Editing & Professional Standards", "Develop accuracy, ethical judgement and attention to detail.", "Build next"]
    ],
    steps: [
      ["Study your audience", "Identify who needs the information and why.", "Task: Audience profile"],
      ["Create a sample piece", "Write, translate, edit or produce work relevant to your role.", "Mini project: Sample work"],
      ["Refine your work", "Check accuracy, seek feedback and organise your best work.", "Goal: Communication portfolio"]
    ]
  },

  publicService: {
    skills: [
      ["Policy & Institutions", "Understand organisations, rules and public issues relevant to your role.", "Start here"],
      ["Research & Analysis", "Evaluate evidence and compare possible approaches.", "Practise"],
      ["Ethics & Communication", "Communicate responsibly and consider affected communities.", "Build next"]
    ],
    steps: [
      ["Choose an issue", "Research a public, legal or international issue relevant to your interests.", "Task: Issue brief"],
      ["Compare responses", "Summarise evidence, stakeholders and possible trade-offs.", "Mini project: Policy brief"],
      ["Present a recommendation", "Prepare a balanced recommendation supported by reliable sources.", "Goal: Policy portfolio"]
    ]
  }
};

// ==========================================
// 5. MATCH CAREERS TO THEIR FAMILIES
// ==========================================

const careerFamilyRoles = {
  technology: [
    "software-engineer", "frontend-developer", "backend-developer",
    "fullstack-developer", "mobile-app-developer", "web-developer",
    "game-developer", "cloud-engineer", "devops-engineer",
    "qa-engineer", "solutions-architect", "it-support-specialist"
  ],

  data: [
    "data-analyst", "data-scientist", "data-engineer",
    "machine-learning-engineer", "ai-engineer",
    "business-intelligence-analyst", "marketing-analyst"
  ],

  business: [
    "business-analyst", "business-development-manager", "project-manager",
    "product-manager", "operations-manager", "management-consultant",
    "entrepreneur", "strategy-analyst", "human-resources",
    "recruiter", "customer-success-manager", "sales-representative"
  ],

  finance: [
    "accountant", "financial-analyst", "investment-banker", "auditor",
    "economist", "actuary", "risk-analyst", "tax-consultant",
    "fintech-specialist"
  ],

  marketing: [
    "digital-marketer", "social-media-manager", "seo-specialist",
    "brand-manager", "public-relations-specialist",
    "communications-specialist", "content-strategist", "copywriter"
  ],

  design: [
    "ui-ux-designer", "graphic-designer", "product-designer",
    "web-designer", "animator", "video-editor", "photographer",
    "fashion-designer", "interior-designer"
  ],

  engineering: [
    "civil-engineer", "mechanical-engineer", "electrical-engineer",
    "chemical-engineer", "petroleum-engineer", "industrial-engineer",
    "mechatronics-engineer", "renewable-energy-engineer",
    "quality-engineer", "health-and-safety-specialist",
    "architect", "agricultural-engineer"
  ],

  healthcare: [
    "doctor", "nurse", "pharmacist", "dentist", "physiotherapist",
    "medical-laboratory-scientist", "radiographer",
    "public-health-specialist", "nutritionist",
    "biomedical-scientist", "clinical-researcher"
  ],

  law: [
    "lawyer", "legal-advisor", "paralegal", "compliance-officer"
  ],

  education: [
    "teacher", "university-lecturer", "academic-researcher",
    "education-consultant", "instructional-designer",
    "learning-development-specialist"
  ],

  socialScience: [
    "psychologist", "counsellor", "social-worker",
    "sociologist", "criminologist", "user-researcher"
  ],

  science: [
    "biotechnologist", "environmental-scientist",
    "environmental-engineer", "sustainability-consultant",
    "agricultural-scientist", "food-scientist"
  ],

  logistics: [
    "supply-chain-analyst", "logistics-manager", "procurement-specialist"
  ],

  hospitality: [
    "aviation-professional", "hotel-manager", "event-planner",
    "travel-consultant"
  ],

  communication: ["journalist", "translator"],

  publicService: [
    "policy-analyst", "diplomat", "public-administrator",
    "human-rights-officer", "international-relations-specialist"
  ]
};

// ==========================================
// 6. FIND THE BEST AVAILABLE PLAN
// ==========================================

function getCareerPlan(roleKey, careerTitle) {
  // Detailed plans take priority.
  if (careerPlans[roleKey]) {
    return careerPlans[roleKey];
  }

  // Match a career from the dropdown to its family.
  for (const [family, roles] of Object.entries(careerFamilyRoles)) {
    if (roles.includes(roleKey)) {
      return careerFamilies[family];
    }
  }

  // Recognise custom career names where possible.
  const title = careerTitle.toLowerCase();

  if (/cyber|security|penetration|digital forensic/.test(title)) {
    return careerFamilies.technology;
  }

  if (/data|analytics|machine learning|artificial intelligence|\bai\b/.test(title)) {
    return careerFamilies.data;
  }

  if (/software|developer|programmer|cloud|devops|web development|it support/.test(title)) {
    return careerFamilies.technology;
  }

  if (/law|legal|solicitor|paralegal|compliance/.test(title)) {
    return careerFamilies.law;
  }

  if (/doctor|nurse|medical|health|pharma|dentist|clinical|physio/.test(title)) {
    return careerFamilies.healthcare;
  }

  if (/teach|education|lecturer|academic|instructional/.test(title)) {
    return careerFamilies.education;
  }

  if (/engineer|engineering|architect/.test(title)) {
    return careerFamilies.engineering;
  }

  if (/finance|account|bank|audit|econom|investment|actuary|tax/.test(title)) {
    return careerFamilies.finance;
  }

  if (/market|brand|social media|seo|advertis|copywrit|public relations/.test(title)) {
    return careerFamilies.marketing;
  }

  if (/design|animat|photograph|video|fashion|interior/.test(title)) {
    return careerFamilies.design;
  }

  if (/journal|writer|translator|communicat|editor/.test(title)) {
    return careerFamilies.communication;
  }

  if (/supply|logistic|procurement|aviation|hotel|travel|event/.test(title)) {
    return careerFamilies.logistics;
  }

  if (/diplomat|international relations|human rights|public policy|public administration/.test(title)) {
    return careerFamilies.publicService;
  }

  if (/psycholog|counsell|counsel|social work|sociolog|criminolog|user research/.test(title)) {
    return careerFamilies.socialScience;
  }

  if (/scientist|science|biotech|environment|sustainability|agricultur|food research/.test(title)) {
    return careerFamilies.science;
  }

  // Safe default for an unrecognised custom career.
  return careerFamilies.business;
}

// ==========================================
// 7. DISPLAY THE SKILLS AND ROADMAP
// ==========================================

const skillsGrid = document.querySelector(".skills-grid");
const roadmap = document.querySelector(".roadmap");

const plan = getCareerPlan(role, selectedRole);

// Escape text before inserting it into HTML.
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

if (plan && skillsGrid && roadmap) {
  skillsGrid.innerHTML = plan.skills.map(
    ([title, description, status]) => `
      <article class="skill-card">
        <div class="skill-top">
          <span class="skill-icon" aria-hidden="true">✦</span>
          <span class="skill-status">${escapeHTML(status)}</span>
        </div>
        <h3>${escapeHTML(title)}</h3>
        <p>${escapeHTML(description)}</p>
        <small>Suggested learning focus · Not assessed from your CV</small>
      </article>
    `
  ).join("");

  roadmap.innerHTML = plan.steps.map(
    ([title, description, task], index) => `
      <article class="roadmap-item">
        <div class="step-number">${String(index + 1).padStart(2, "0")}</div>
        <div class="step-content">
          <span class="step-time">STEP ${index + 1}</span>
          <h3>${escapeHTML(title)}</h3>
          <p>${escapeHTML(description)}</p>
          <span class="task-tag">${escapeHTML(task)}</span>
        </div>
        <span class="step-check">${index + 1}</span>
      </article>
    `
  ).join("");
}

// ==========================================
// 8. DEMO MODE NOTICE
// ==========================================

// This page currently displays example learning plans.
// Actual CV analysis requires the backend to be connected.
