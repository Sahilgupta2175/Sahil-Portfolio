import React, { useState, useEffect } from 'react'
import {
  Moon,
  Sun,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Database,
  Palette,
  Settings,
  ChevronDown,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "./components/ui/button"
import { sendEmail, sendFormspree, sendNetlifyForm } from "./lib/emailService"

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const targetPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formDataObj = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      // Option 1: Use EmailJS (recommended)
      const result = await sendEmail(formDataObj);
      
      // Option 2: Use Formspree (uncomment to use)
      // const result = await sendFormspree(formDataObj);
      
      // Option 3: Use Netlify Forms (uncomment if deployed on Netlify)
      // const result = await sendNetlifyForm(formDataObj);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || `Thank you ${formDataObj.name}! Your message has been sent successfully.`,
        });
        
        if (form) {
          form.reset();
        }
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (submitStatus.type) {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  const skills = [
    {
      category: "Frontend Development",
      icon: <Palette className="w-6 h-6" />,
      technologies: ["React.js", "HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX"],
    },
    {
      category: "Backend Development",
      icon: <Settings className="w-6 h-6" />,
      technologies: ["Node.js", "Express.js", "Java", "RESTful APIs", "Authentication", "Server Architecture"],
    },
    {
      category: "Database & Analytics",
      icon: <Database className="w-6 h-6" />,
      technologies: ["MongoDB", "MySQL", "PostgreSQL", "SQL", "Power BI", "Data Modeling"],
    },
    {
      category: "Tools & Platforms",
      icon: <Code className="w-6 h-6" />,
      technologies: ["Git", "GitHub", "Postman", "VS Code", "Vercel", "Deployment"],
    },
  ];

  const projects = [
    {
      title: "Wanderlust",
      description:
        "A comprehensive accommodation booking platform that connects travelers with unique stays. Features complete user authentication, property listings, and advanced search capabilities.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose"],
      features: [
        "Full-stack accommodation booking platform with secure user authentication",
        "Advanced search and filter system increasing user session time by 60%",
        "Responsive React UI ensuring seamless cross-device compatibility",
        "Optimized backend APIs with 30% faster response times",
      ],
      liveUrl: "https://wanderlust-nlnm.onrender.com/",
      githubUrl: "https://github.com/Sahilgupta2175/Wanderlust",
      period: "May - July 2025",
    },
    {
      title: "InShare Application",
      description:
        "A secure file sharing platform designed for seamless document exchange. Supports large file uploads with real-time progress tracking and email notifications.",
      technologies: ["Node.js", "Express.js", "MongoDB", "Multer", "Nodemailer"],
      features: [
        "Secure file sharing platform supporting 100MB+ uploads for 2000+ users",
        "Intuitive drag-and-drop interface with real-time progress tracking",
        "Automated email notifications accelerating file retrieval by 75%",
        "Frontend optimizations reducing average file access time by 40%",
      ],
      githubUrl: "https://github.com/Sahilgupta2175/InShare-Application-Project",
      period: "Mar - Apr 2025",
    },
    {
      title: "Netflix UI Clone",
      description:
        "A pixel-perfect recreation of Netflix's homepage with dynamic content loading. Features responsive design and smooth animations for an authentic user experience.",
      technologies: ["HTML5", "CSS3", "JavaScript", "TMDB API"],
      features: [
        "Recreated Netflix's homepage UI with 95% visual accuracy",
        "Dynamic content loading using The Movie Database (TMDB) API",
        "Fully responsive design optimized for mobile, tablet, and desktop",
        "Lightning-fast authentication flows with 300ms response times",
      ],
      liveUrl: "https://netflix-clone-ft.vercel.app/",
      githubUrl: "https://github.com/Sahilgupta2175/Hunar-intern-project/tree/main/Netflix%20clone",
      period: "Jun - Jul 2024",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                SG
              </div>
              <span className="text-xl font-bold">Sahil Gupta</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    activeSection === item.id ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-10 h-10 p-0">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden w-10 h-10 p-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-2 px-4 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="pt-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Available for new opportunities</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Building Digital
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Experiences
                  </span>
                  That Matter
                </h1>
                <h2 className="text-xl text-blue-600 dark:text-blue-400 font-semibold">
                  Full Stack Developer & Problem Solver
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                  I create scalable web applications using modern technologies. Passionate about clean code, user
                  experience, and solving complex problems through innovative solutions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  View My Work
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
                  Get In Touch
                  <Mail className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">150+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Problems Solved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">7.46</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">CGPA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">85%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                    SG
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Sahil Gupta</h3>
                    <p className="text-gray-600 dark:text-gray-400">Full Stack Developer</p>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="mailto:guptasahil2175@gmail.com"
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com/in/sahilgupta2175"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="https://github.com/Sahilgupta2175"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>👨‍💻 About Me</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Crafting Solutions Through Code</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A passionate developer with a strong foundation in computer science and a keen eye for creating
              exceptional digital experiences.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    I'm a passionate full-stack developer currently pursuing my Bachelor of Technology in Computer
                    Science (Honors) at GLA University, Mathura. With a strong foundation in modern web technologies and
                    a keen eye for user experience, I love creating applications that solve real-world problems.
                  </p>
                  <p>
                    My journey in tech has been driven by curiosity and a constant desire to learn. I've completed over
                    150 coding challenges on platforms like LeetCode and HackerRank, maintaining an 85% success rate.
                    This has helped me develop strong problem-solving skills and a deep understanding of data structures
                    and algorithms.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new technologies, contributing to open-source
                    projects, or mentoring fellow students. I believe in the power of collaboration and continuous
                    learning in the ever-evolving world of technology.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  SG
                </div>
                <h3 className="text-xl font-bold">Sahil Gupta</h3>
                <p className="text-gray-600 dark:text-gray-400">Computer Science Student</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">GLA University, Mathura</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm">guptasahil2175@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 p-3">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm">+91 9956564108</span>
                </div>
                <div className="flex items-center space-x-3 p-3">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm">Orai, Uttar Pradesh, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>🛠️ Technical Skills</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technologies I Work With</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A comprehensive toolkit for building modern, scalable web applications from frontend to backend and
              everything in between.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    {skill.icon}
                  </div>
                  <h3 className="font-bold text-lg">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>🚀 Featured Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Projects That Showcase My Skills</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A collection of projects that demonstrate my ability to build scalable, user-friendly applications using
              modern web technologies.
            </p>
          </div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-2xl font-bold mb-2 sm:mb-0">{project.title}</h3>
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{project.period}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-white/20 rounded-lg text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                  <div className="mb-6">
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                          </div>
                          <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {project.liveUrl && (
                      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          Live Demo
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    )}
                    <Button asChild variant="outline">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        View Code
                        <Github className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>📚 Experience & Education</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">My Journey in Technology</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From academic excellence to hands-on industry experience, here's how I've built my foundation in computer
              science and software development.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h3 className="text-xl font-bold">Bachelor of Technology - Computer Science (Honors)</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">Expected Jun 2026</span>
              </div>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                GLA University, Mathura • CGPA: 7.46
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Pursuing comprehensive education in computer science with specialized focus on software development,
                data structures, algorithms, and modern web technologies.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h3 className="text-xl font-bold">Trainee - Job Oriented Value Added Course</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">Jun 2024 - Jul 2024</span>
              </div>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">GLA University • Remote</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Intensive training program focused on practical industry skills and database management.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    Gained hands-on experience with PostgreSQL through instructor-led sessions
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    Achieved Top 3 Performer status among 50 interns in the summer cohort
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h3 className="text-xl font-bold">Senior Secondary Education</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">May 2022</span>
              </div>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                Brij Kunwar Devi Aldrich Public School, Orai • 84.2%
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Built a strong foundation in mathematics, science, and computer applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>📬 Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Build Something Amazing Together</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear from
              you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400">guptasahil2175@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center text-white">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-400">+91 9956564108</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">Orai, Uttar Pradesh, India</p>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <a
                    href="https://linkedin.com/in/sahilgupta2175"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/Sahilgupta2175"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg flex items-center justify-center text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-6">Send me a message</h3>

              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                    submitStatus.type === "success"
                      ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    disabled={isSubmitting}
                    placeholder="Tell me about your project or just say hello!"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Mail className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                SG
              </div>
              <span className="text-xl font-bold">Sahil Gupta</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Building digital experiences that make a difference. Always learning, always growing, always coding.
            </p>
            <div className="flex justify-center space-x-8 mb-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500">&copy; 2025 Sahil Gupta. All rights reserved. Built with ❤️ and lots of ☕</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}