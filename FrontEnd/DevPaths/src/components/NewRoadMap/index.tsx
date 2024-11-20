import { useState } from "react";
import { MagicCard } from "./MagicCard/index";
import style from "./newroadmap.module.scss";

function Roadmap() {
  const roadmaps = [
    {
      title: "Frontend Development",
      description: "Learn HTML, CSS, JavaScript, React, Vue, and more.",
    },
    {
      title: "Backend Development",
      description:
        "Learn Node.js, Express, Ruby on Rails, Django, and Databases.",
    },
    {
      title: "DevOps",
      description:
        "Learn CI/CD, Docker, Kubernetes, Cloud Services, and Monitoring Tools.",
    },
    {
      title: "Data Science",
      description:
        "Learn Python, R, Machine Learning, Data Visualization, and Big Data Tools.",
    },
    {
      title: "Cybersecurity",
      description:
        "Learn Network Security, Penetration Testing, Cryptography, and Ethical Hacking.",
    },
    {
      title: "Mobile Development",
      description:
        "Learn Swift, Kotlin, Flutter, and React Native for iOS and Android.",
    },
    {
      title: "Game Development",
      description: "Learn Unity, Unreal Engine, Game Design, and 3D Modeling.",
    },
    {
      title: "AI and Machine Learning",
      description:
        "Learn TensorFlow, PyTorch, Neural Networks, and Natural Language Processing.",
    },
    {
      title: "Blockchain Development",
      description:
        "Learn Solidity, Smart Contracts, Decentralized Applications (DApps), and Web3.",
    },
    {
      title: "Web3 and Decentralized Systems",
      description:
        "Learn Ethereum, IPFS, Smart Contracts, and Decentralized Autonomous Organizations (DAOs).",
    },
    {
      title: "Cloud Computing",
      description:
        "Learn AWS, Azure, Google Cloud Platform, and Serverless Architecture.",
    },
    {
      title: "UI/UX Design",
      description:
        "Learn Figma, Adobe XD, Wireframing, Prototyping, and User Testing.",
    },
    {
      title: "Embedded Systems",
      description:
        "Learn Microcontrollers, IoT Development, and Real-Time Operating Systems.",
    },
    {
      title: "Augmented and Virtual Reality",
      description: "Learn AR/VR Development, Unity, and 3D Interaction Design.",
    },
    {
      title: "Digital Marketing",
      description:
        "Learn SEO, SEM, Content Marketing, Analytics, and Social Media Strategies.",
    },
    {
      title: "Project Management",
      description:
        "Learn Agile, Scrum, Kanban, and Software Development Life Cycle (SDLC).",
    },
    {
      title: "Robotics",
      description:
        "Learn ROS, Arduino, Mechanical Design, and Control Systems.",
    },
    {
      title: "Quantum Computing",
      description:
        "Learn Qiskit, Quantum Mechanics Fundamentals, and Quantum Algorithms.",
    },
    {
      title: "E-Commerce Development",
      description:
        "Learn Shopify, WooCommerce, Magento, and Payment Gateway Integration.",
    },
    {
      title: "Technical Writing",
      description:
        "Learn Documentation, API Writing, and Knowledge Base Creation.",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoadmaps = roadmaps.filter((roadmap) =>
    roadmap.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={style.roadmap_container}>
      <div className={style.roadmap_wrapper}>
        <h1 className={style.roadmap_title}>Roadmaps</h1>
        <p className={style.roadmap_description}>
          Explore various IT fields and find the best study plans to advance
          your career.
        </p>
        <div className={style.roadmap_search}>
          <input
            type="text"
            placeholder="Search Roadmaps..."
            className={style.search_input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={style.roadmap_grid}>
          {filteredRoadmaps.map((roadmap, index) => (
            <MagicCard key={index} className={style.roadmap_card}>
              <div className={style.card_content}>
                <h2 className={style.card_title}>{roadmap.title}</h2>
                <hr className={style.card_divider} />
                <p className={style.card_description}>{roadmap.description}</p>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
