export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "uav" | "vision" | "embedded" | "software";
  status: "active_testing" | "validated_prototype" | "experimental" | "software_tool";
  statusLabel: { en: string; id: string };
  date: string;
  summary: { en: string; id: string };
  primaryImage?: string;
  galleryImages?: string[];
  metrics?: { label: string; value: string }[];
  tags: string[];
  details: {
    objective: { en: string; id: string };
    architecture: { en: string; id: string };
    myContribution: { en: string; id: string };
    hardware: string[];
    software: string[];
    challenges: { en: string; id: string };
    currentStatus: { en: string; id: string };
  };
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface SkillGroup {
  id: string;
  title: { en: string; id: string };
  icon: string;
  description: { en: string; id: string };
  skills: {
    name: string;
    level: string;
    context: { en: string; id: string };
  }[];
}

export interface FieldLogEntry {
  id: string;
  date: string;
  badge: string;
  tag: "uav" | "vision" | "embedded" | "education";
  title: { en: string; id: string };
  content: { en: string; id: string };
  metrics?: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Erlangga Pradana Kurniawan",
    shortName: "Erlangga",
    callsign: "ERLANGGA LAB",
    role: {
      en: "Electrical Engineering Student & Systems Builder",
      id: "Mahasiswa Teknik Elektro & Systems Builder",
    },
    institution: "Institut Teknologi Nasional Yogyakarta (ITNY)",
    location: "Yogyakarta, Indonesia",
    email: "pradanaerlangga99@gmail.com",
    github: "https://github.com/Ethern-ram",
    githubUsername: "Ethern-ram",
    bio: {
      en: "Electrical Engineering student at Institut Teknologi Nasional Yogyakarta (ITNY) specializing in autonomous UAV systems, embedded companion computing, computer vision perception, and software-hardware integration. Experienced in developing ArduPilot MAVLink telemetry bridges, optical marker guidance on NVIDIA Jetson platforms, and real-time sensor interfaces.",
      id: "Mahasiswa Teknik Elektro di Institut Teknologi Nasional Yogyakarta (ITNY) yang berfokus pada sistem UAV otonom, komputasi pendamping tertanam (companion computing), persepsi computer vision, dan integrasi perangkat lunak-keras. Berpengalaman membangun jembatan telemetri MAVLink ArduPilot, panduan optik marker ArUco pada NVIDIA Jetson, serta antarmuka sensor real-time.",
    },
    education: {
      degree: "B.Eng. in Electrical Engineering (Undergraduate)",
      degreeId: "S1 Teknik Elektro (Sarjana)",
      institution: "Institut Teknologi Nasional Yogyakarta (ITNY)",
      status: "Active Student",
      statusId: "Mahasiswa Aktif",
      interests: [
        "Autonomous UAV Systems",
        "Embedded Linux & Edge Computing",
        "Computer Vision & Optical Navigation",
        "MAVLink & Flight Telemetry",
        "IoT & Industrial Hardware Interfacing",
      ],
    },
  },

  projects: [
    {
      id: "mavericks-guardian",
      title: "Mavericks Guardian — Autonomous VTOL UAV",
      subtitle: "Companion Vision, MAVLink Integration & Payload Delivery System",
      category: "uav",
      status: "active_testing",
      statusLabel: {
        en: "Active Prototype & Field Testing",
        id: "Prototipe Aktif & Pengujian Lapangan",
      },
      date: "2025 – Present",
      featured: true,
      summary: {
        en: "Autonomous VTOL UAV development for the national Kontes Robot Terbang Indonesia (KRTI). Integrates Cube Orange+ flight controller with NVIDIA Jetson Nano companion computer for optical ArUco marker guidance, automatic altitude-gated payload deployment, and high-speed telemetry bridging.",
        id: "Pengembangan UAV VTOL Otonom untuk Kontes Robot Terbang Indonesia (KRTI). Mengintegrasikan flight controller Cube Orange+ dengan companion computer NVIDIA Jetson Nano untuk panduan optik ArUco, pelepasan payload otomatis berbasis altitude-gating, dan jembatan telemetri kecepatan tinggi.",
      },
      primaryImage: "/projects/vision/marker_tight.png",
      galleryImages: [
        "/projects/vision/marker_tight.png",
        "/projects/vision/marker_repaired.png",
        "/projects/vision/warped_0.png",
        "/projects/vision/warped_th_0.png",
      ],
      metrics: [
        { label: "MAVLink Baudrate", value: "921,600 bps" },
        { label: "Vision Frame Rate", value: "30 FPS @ 640×480" },
        { label: "Drop Delay", value: "3.0s Hold / Stabilize" },
        { label: "Telemetry Stream", value: "High-Speed Serial" },
      ],
      tags: ["ArduPilot", "Cube Orange+", "Jetson Nano", "PyMAVLink", "OpenCV", "Python", "KRTI 2026"],
      details: {
        objective: {
          en: "Achieve autonomous waypoint navigation, optical precision target identification at designated drop zones (WP2) and landing pads (WP3), and deliver payloads via PWM servo activation with strict safety gating.",
          id: "Mencapai navigasi waypoint otonom, identifikasi target optik presisi pada zona drop (WP2) dan landing pad (WP3), serta menjatuhkan payload via aktuator servo PWM dengan pengaman altitude-gating.",
        },
        architecture: {
          en: "Dual-tier control architecture: Real-time stabilization, attitude control, and GNSS/RTK navigation run deterministically on Cube Orange+ (ArduPilot VTOL firmware). High-level computer vision, marker pose estimation, and mission logic execute asynchronously on NVIDIA Jetson Nano, linked via high-speed UART MAVLink at 921,600 baud.",
          id: "Arsitektur kontrol dua tingkat: Stabilisasi real-time, kontrol sikap, dan navigasi GNSS/RTK berjalan deterministik di Cube Orange+ (firmware ArduPilot VTOL). Computer vision tingkat tinggi, estimasi pose marker, dan logika misi berjalan asinkron di NVIDIA Jetson Nano, terhubung via serial MAVLink 921.600 baud.",
        },
        myContribution: {
          en: "Engineered companion computer software pipeline: serial MAVLink connection daemon with auto-reconnection, camera acquisition loop, ArUco multi-scale marker detector, altitude-based flight gating (0.8m takeoff / 0.4m landing hysteresis), and timed PWM servo release trigger on AUX 1.",
          id: "Merancang pipeline perangkat lunak companion computer: daemon koneksi MAVLink serial dengan auto-reconnection, akuisisi kamera, detektor ArUco multi-scale, flight gating berbasis ketinggian (0.8m lepas landas / 0.4m mendarat), dan pemicu servo PWM pada AUX 1.",
        },
        hardware: [
          "Cube Orange+ / Pixhawk Autopilot",
          "NVIDIA Jetson Nano (4GB Developer Kit)",
          "U-Blox F9P GNSS / RTK Receiver",
          "USB Optical Sensor (640×480 @ 30 FPS)",
          "AUX 1 Servo Payload Release Gripper",
          "Telemetry Radio Transceiver (433/915 MHz)",
        ],
        software: [
          "ArduPilot (VTOL QuadPlane Firmware)",
          "Mission Planner Ground Station",
          "PyMAVLink (Python 3.8)",
          "OpenCV 4.5+ with NumPy",
          "PyYAML Configuration Engine",
          "Ubuntu 20.04 LTS (Jetson Linux)",
        ],
        challenges: {
          en: "Mitigating false optical triggers caused by sun glare on grass runways: implemented a 3-frame confirmation window with CLAHE adaptive contrast normalization. Resolved serial buffer starvation by decoupling video frames from MAVLink heartbeat threads.",
          id: "Mengatasi false-trigger akibat pantulan cahaya matahari di lapangan rumput: menerapkan jendela konfirmasi minimal 3 frame dengan normalisasi kontras adaptif CLAHE. Menyelesaikan lag buffer serial dengan memisahkan thread video dari detak heartbeat MAVLink.",
        },
        currentStatus: {
          en: "Vision pipeline and MAVLink servo command triggers tested and validated in hardware-in-the-loop and ground bench test benches. Ready for integrated flight trials.",
          id: "Pipeline visi dan pemicu perintah servo MAVLink telah teruji dan tervalidasi pada bangku uji darat serta hardware-in-the-loop. Siap untuk uji terbang integrasi lanjutan.",
        },
      },
    },

    {
      id: "aruco-vision-navigation",
      title: "Computer Vision & ArUco Marker Optical Guidance",
      subtitle: "Multi-Scale Target Acquisition & Pose Estimation Pipeline",
      category: "vision",
      status: "validated_prototype",
      statusLabel: {
        en: "Validated Experimental Engine",
        id: "Mesin Eksperimental Tervalidasi",
      },
      date: "2025 – 2026",
      featured: true,
      summary: {
        en: "A robust optical marker detection and perspective transformation pipeline designed for aerial target identification. Employs multi-dictionary support (DICT_4X4_50, AprilTag), adaptive thresholding, and geometric validation for reliable UAV waypoint docking.",
        id: "Pipeline deteksi marker optik dan transformasi perspektif untuk identifikasi target udara. Menggunakan dukungan multi-kamus (DICT_4X4_50, AprilTag), ambang batas adaptif, dan validasi geometris untuk docking waypoint UAV.",
      },
      primaryImage: "/projects/vision/phone_marker.png",
      galleryImages: [
        "/projects/vision/phone_marker.png",
        "/projects/vision/square.png",
        "/projects/vision/warped_0.png",
        "/projects/vision/warped_th_0.png",
      ],
      metrics: [
        { label: "Target Dictionaries", value: "DICT_4X4_50 / AprilTag" },
        { label: "Detection Latency", value: "< 25ms / frame" },
        { label: "Scale Range", value: "500mm macro / 100mm micro" },
        { label: "Target IDs", value: "WP1 (1,11), WP2 (2,22), WP3 (3,33)" },
      ],
      tags: ["Computer Vision", "OpenCV", "ArUco", "NumPy", "Perspective Warp", "Image Processing"],
      details: {
        objective: {
          en: "Provide sub-pixel accurate target centroid coordinates to the flight navigation computer across varying flight altitudes from 15m cruise down to 1.5m landing touchdown.",
          id: "Menyediakan koordinat centroid target akurat sub-piksel ke komputer navigasi penerbangan dari ketinggian jelajah 15m hingga touchdown pendaratan 1.5m.",
        },
        architecture: {
          en: "Input frame -> CLAHE preprocessing -> ArUco contour extraction -> Perspective unwarping -> ID whitelist verification -> Normalized screen-space error calculation (-1.0 to +1.0) with safety bounding margins.",
          id: "Frame input -> Pra-pemrosesan CLAHE -> Ekstraksi kontur ArUco -> Homografi unwarping -> Verifikasi whitelist ID -> Kalkulasi deviasi ternormalisasi (-1.0 hingga +1.0) dengan batas margin aman.",
        },
        myContribution: {
          en: "Developed multi-scale marker hierarchy parsing (500mm macro field markers for high altitude capture, paired with 100mm micro markers for terminal precision touchdown), homography square extraction, and logging dataset capture tool.",
          id: "Mengembangkan hierarki marker bertingkat (marker makro 500mm untuk ketinggian jelajah, berpasangan dengan marker mikro 100mm untuk terminal presisi), ekstraksi kotak homografi, dan tool perekaman dataset pengujian.",
        },
        hardware: ["USB Low-Distortion Camera", "NVIDIA Jetson Nano", "ArUco Target Panels"],
        software: ["OpenCV (cv2.aruco)", "Python 3", "NumPy Matrix Algebra"],
        challenges: {
          en: "Handling partial marker occlusion and motion blur during fast UAV yaw rotations. Mitigated by contour polygon simplification and minimum area ratio filtering.",
          id: "Menangani oklusi parsial dan motion blur saat drone bermanuver yaw cepat. Diatasi dengan simplifikasi poligon kontur dan penyaringan rasio luas minimal.",
        },
        currentStatus: {
          en: "Algorithms tested on real camera frames, synthetic distortions, and physical target boards with verified ID verification.",
          id: "Algoritma telah diuji pada frame kamera aktual, distorsi sintetis, dan papan target fisik dengan verifikasi ID tervalidasi.",
        },
      },
    },

    {
      id: "dashed-line-follower",
      title: "Visual Dashed-Line Guidance Engine",
      subtitle: "Runway Feature Extraction with Collinearity Fitting",
      category: "vision",
      status: "experimental",
      statusLabel: {
        en: "Research & Prototype",
        id: "Riset & Prototipe",
      },
      date: "2026",
      featured: true,
      summary: {
        en: "Autonomous visual guidance module designed to detect and track segmented dashed ground lines (450mm × 2000mm) for UAV runway alignment and post-landing taxi guidance.",
        id: "Modul panduan visual otonom yang dirancang untuk mendeteksi dan melacak garis putus-putus di landasan (450mm × 2000mm) untuk penyelarasan runway dan panduan taxi pasca pendaratan.",
      },
      primaryImage: "/projects/vision/square.png",
      galleryImages: ["/projects/vision/square.png", "/projects/vision/marker_repaired.png"],
      metrics: [
        { label: "Collinearity Tolerance", value: "< 40px centroid drift" },
        { label: "Orientation Angle Error", value: "< 35° segment dev" },
        { label: "Gap Holdover", value: "12 frames (~0.40s)" },
        { label: "Processing Pipeline", value: "CLAHE + Adaptive C" },
      ],
      tags: ["Perception", "OpenCV", "Adaptive Threshold", "Collinearity", "Line Following"],
      details: {
        objective: {
          en: "Extract line heading angle and lateral offset from discontinuous dashed segments while rejecting ground shadows, grass patches, and runway edge noise.",
          id: "Mengekstrak sudut heading garis dan deviasi lateral dari segmen putus-putus sembari menolak bayangan tanah, rumput liar, dan derau batas landasan.",
        },
        architecture: {
          en: "Dynamic Region of Interest (ROI) slicing (tracking ROI 320px, gap ROI 340px) -> CLAHE contrast enhancement -> Adaptive thresholding -> Aspect ratio check (>= 1.8) -> Multi-segment centroid collinearity regression.",
          id: "Pemotongan ROI Dinamis (tracking ROI 320px, gap ROI 340px) -> Peningkatan kontras CLAHE -> Thresholding adaptif -> Pengecekan rasio aspek (>= 1.8) -> Regresi kolinearitas centroid multi-segmen.",
        },
        myContribution: {
          en: "Designed the multi-segment collinearity regression algorithm and the 12-frame gap recovery state machine to prevent line-loss toggling between runway segments.",
          id: "Merancang algoritma regresi kolinearitas multi-segmen dan state machine pemulihan celah 12-frame untuk mencegah flapping kehilangan garis antar segmen.",
        },
        hardware: ["NVIDIA Jetson Nano", "Downward Downward-Facing Optical Sensor"],
        software: ["OpenCV", "Python", "NumPy Line Fitting"],
        challenges: {
          en: "Shadows cast by aircraft wings across runway lines creating fragmented contours. Solved using adaptive local mean thresholding with high contrast sensitivity.",
          id: "Bayangan sayap pesawat yang melintasi garis landasan memecah kontur. Diatasi dengan thresholding nilai rata-rata lokal adaptif sensitivitas tinggi.",
        },
        currentStatus: {
          en: "Simulated and bench-tested on recorded video tracks; validation mode logs metrics to CSV for offline telemetry inspection.",
          id: "Disimulasikan dan diuji bench pada rekaman video lintasan; mode validasi mencatat metrik ke CSV untuk inspeksi telemetri offline.",
        },
      },
    },

    {
      id: "esp32-telemetry-hub",
      title: "ESP32 Industrial IoT & Sensor Telemetry Hub",
      subtitle: "Hardware-Software Sensor Bridge & Control Surface",
      category: "embedded",
      status: "validated_prototype",
      statusLabel: {
        en: "Working Hardware Prototype",
        id: "Prototipe Hardware Berfungsi",
      },
      date: "2025",
      featured: false,
      summary: {
        en: "Embedded telemetry acquisition node utilizing ESP32 microcontroller with FreeRTOS multitasking. Streams analog voltages, environmental sensors, and actuator states to a web-based engineering dashboard over MQTT and WebSockets.",
        id: "Node akuisisi telemetri tertanam menggunakan mikrokontroler ESP32 dengan multitasking FreeRTOS. Mengalirkan tegangan analog, sensor lingkungan, dan status aktuator ke dashboard web via MQTT dan WebSockets.",
      },
      primaryImage: "/projects/vision/warped_0.png",
      metrics: [
        { label: "Microcontroller", value: "ESP32 Xtensa Dual-Core" },
        { label: "Protocols", value: "MQTT / WebSockets / UART" },
        { label: "Sampling Rate", value: "100 Hz continuous" },
        { label: "Frontend UI", value: "Next.js + SVG Waveforms" },
      ],
      tags: ["ESP32", "C/C++", "FreeRTOS", "MQTT", "WebSockets", "IoT", "Next.js"],
      details: {
        objective: {
          en: "Bridge physical microcontrollers and browser-based telemetry dashboards with sub-100ms latency, automatic Wi-Fi reconnection, and packet validation.",
          id: "Menghubungkan mikrokontroler fisik ke dashboard telemetri berbasis browser dengan latensi di bawah 100ms, rekoneksi Wi-Fi otomatis, dan validasi paket.",
        },
        architecture: {
          en: "Dual-core task separation: Core 0 handles Wi-Fi connectivity and MQTT broker transmission; Core 1 executes ADC sensor polling, I2C reads, and hardware interrupt routines without blocking.",
          id: "Pemisahan tugas dual-core: Core 0 menangani konektivitas Wi-Fi dan transmisi MQTT broker; Core 1 mengeksekusi polling sensor ADC, pembacaan I2C, dan rutin interupsi hardware tanpa blocking.",
        },
        myContribution: {
          en: "Wrote C/C++ firmware with FreeRTOS queue primitives, designed hardware signal filtering circuits, and developed the web oscilloscope visualization interface.",
          id: "Menulis firmware C/C++ dengan antrean FreeRTOS, merancang sirkuit filter sinyal hardware, dan mengembangkan antarmuka visualisasi osiloskop web.",
        },
        hardware: ["ESP32 Development Board", "Sensors (Analog/I2C)", "Signal Conditioners"],
        software: ["ESP-IDF / Arduino C++", "FreeRTOS", "MQTT Broker", "TypeScript"],
        challenges: {
          en: "Handling Wi-Fi packet drops and power spikes during RF transmissions: added software watchdog timers and decoupling capacitor networks on the power rail.",
          id: "Menangani packet drop Wi-Fi dan lonjakan daya saat transmisi RF: menambahkan software watchdog timer dan jaringan decoupling capacitor pada jalur daya.",
        },
        currentStatus: {
          en: "Bench prototype operational; used as a testing bed for sensor diagnostics and web-hardware communication experiments.",
          id: "Prototipe meja operasional; digunakan sebagai platform uji diagnostik sensor dan eksperimen komunikasi web-hardware.",
        },
      },
    },

    {
      id: "ai-engineering-assistant",
      title: "Technical Engineering Study & Diagnostic Assistant",
      subtitle: "Contextual Knowledge Retrieval for Electrical Engineering",
      category: "software",
      status: "software_tool",
      statusLabel: {
        en: "Software Tool",
        id: "Alat Perangkat Lunak",
      },
      date: "2025",
      featured: false,
      summary: {
        en: "An experimental interactive interface for electrical engineering students that indexes component datasheets, pinout diagrams, and circuit analysis equations for rapid contextual lookup and debugging prompts.",
        id: "Antarmuka interaktif eksperimental untuk mahasiswa teknik elektro yang mengindeks lembar data komponen, diagram pinout, dan persamaan analisis rangkaian untuk pencarian kontekstual cepat dan panduan debugging.",
      },
      metrics: [
        { label: "Target Domain", value: "Circuits & Embedded Pinouts" },
        { label: "Stack", value: "Next.js / TypeScript / Vector API" },
        { label: "Interface", value: "Keyboard-First Command Bar" },
      ],
      tags: ["TypeScript", "Next.js", "AI UX", "Knowledge Retrieval", "Electrical Engineering"],
      details: {
        objective: {
          en: "Replace generic conversational chatbots with a purpose-built technical study workspace featuring formula calculators, pinout overlays, and troubleshooting workflows.",
          id: "Menggantikan chatbot percakapan generik dengan workspace studi teknis terarah yang menyertakan kalkulator rumus, diagram pinout, dan alur pemecahan masalah.",
        },
        architecture: {
          en: "Next.js App Router frontend with responsive keyboard shortcuts (`Ctrl+K`), local storage caching for offline use, and structured technical prompt templates.",
          id: "Frontend Next.js App Router dengan pintasan keyboard responsif (`Ctrl+K`), penyimpanan cache lokal untuk penggunaan offline, dan template prompt teknis terstruktur.",
        },
        myContribution: {
          en: "Architected component interface, implemented client-side search index, and integrated electrical engineering formula parsers.",
          id: "Merancang arsitektur antarmuka komponen, mengimplementasikan indeks pencarian sisi klien, dan mengintegrasikan parser rumus teknik elektro.",
        },
        hardware: ["Local Workstation"],
        software: ["Next.js", "React 19", "TypeScript", "Tailwind CSS"],
        challenges: {
          en: "Structuring technical prompt constraints to prevent hallucinated pin configurations or invalid Ohm's law transformations.",
          id: "Menyusun batasan prompt teknis guna mencegah halusinasi konfigurasi pin atau transformasi hukum Ohm yang tidak valid.",
        },
        currentStatus: {
          en: "Functional prototype for personal course study and laboratory reference.",
          id: "Prototipe fungsional untuk studi perkuliahan pribadi dan referensi laboratorium.",
        },
      },
    },
  ] as ProjectItem[],

  skillGroups: [
    {
      id: "robotics-uav",
      title: { en: "Robotics & Autonomous UAV Systems", id: "Robotika & Sistem UAV Otonom" },
      icon: "Plane",
      description: {
        en: "Hands-on integration with flight controllers, ground control stations, and telemetry links.",
        id: "Integrasi langsung dengan flight controller, ground station, dan link telemetri.",
      },
      skills: [
        {
          name: "ArduPilot & QuadPlane VTOL",
          level: "Field Applied",
          context: {
            en: "Parameter tuning, autonomous waypoint missions, fail-safe configurations.",
            id: "Penalaan parameter, misi waypoint otonom, konfigurasi fail-safe.",
          },
        },
        {
          name: "Cube Orange+ & Pixhawk Avionics",
          level: "Hardware Integration",
          context: {
            en: "Power module wiring, CAN/I2C compass sensors, AUX PWM servo actuation.",
            id: "Kabel modul daya, sensor kompas CAN/I2C, aktuasi servo AUX PWM.",
          },
        },
        {
          name: "MAVLink Communication (PyMAVLink)",
          level: "Software Integration",
          context: {
            en: "Serial parsing, command injection, heartbeat daemons at 921,600 baud.",
            id: "Parsing serial, injeksi perintah, daemon heartbeat pada 921.600 baud.",
          },
        },
        {
          name: "Mission Planner GCS",
          level: "Operational",
          context: {
            en: "Flight plan drafting, telemetry logging, sensor calibration, HUD monitoring.",
            id: "Penyusunan flight plan, logging telemetri, kalibrasi sensor, monitoring HUD.",
          },
        },
        {
          name: "GNSS & RTK GPS Systems",
          level: "Field Applied",
          context: {
            en: "U-Blox F9P integration, centimetre-accurate base station RTK surveying.",
            id: "Integrasi U-Blox F9P, survei RTK base station berakurasi sentimeter.",
          },
        },
      ],
    },

    {
      id: "computer-vision",
      title: { en: "Computer Vision & Optical Perception", id: "Computer Vision & Persepsi Optik" },
      icon: "Eye",
      description: {
        en: "Real-time edge image processing for target acquisition, marker decoding, and visual guidance.",
        id: "Pemrosesan citra edge real-time untuk akuisisi target, penguraian marker, dan panduan visual.",
      },
      skills: [
        {
          name: "OpenCV (Python / C++)",
          level: "Core Perception",
          context: {
            en: "Camera streaming, color spaces (HSV/BGR), contour analysis, adaptive filtering.",
            id: "Streaming kamera, ruang warna (HSV/BGR), analisis kontur, filter adaptif.",
          },
        },
        {
          name: "ArUco & Fiducial Markers",
          level: "Core Perception",
          context: {
            en: "DICT_4X4_50 / AprilTag detection, sub-pixel corner refinement, ID whitelisting.",
            id: "Deteksi DICT_4X4_50 / AprilTag, penghalusan sudut sub-piksel, whitelisting ID.",
          },
        },
        {
          name: "Perspective Warping & Homography",
          level: "Applied Geometry",
          context: {
            en: "4-point perspective transforms, square rectification, normalized error tracking.",
            id: "Transformasi perspektif 4-titik, rektifikasi bujur sangkar, pelacakan deviasi.",
          },
        },
        {
          name: "CLAHE Contrast Normalization",
          level: "Pre-processing",
          context: {
            en: "Contrast Limited Adaptive Histogram Equalization for outdoor glare rejection.",
            id: "Peningkatan kontras adaptif untuk meredam silau matahari di lapangan.",
          },
        },
        {
          name: "Multi-Segment Collinearity Fitting",
          level: "Algorithmic",
          context: {
            en: "Linear regression on contour centroids for dashed runway line tracking.",
            id: "Regresi linier centroid kontur untuk pelacakan garis landasan putus-putus.",
          },
        },
      ],
    },

    {
      id: "embedded-edge",
      title: { en: "Embedded Systems & Edge Computing", id: "Sistem Tertanam & Edge Computing" },
      icon: "Cpu",
      description: {
        en: "Microcontrollers, single-board companion computers, and low-level communication protocols.",
        id: "Mikrokontroler, komputer pendamping (SBC), dan protokol komunikasi tingkat rendah.",
      },
      skills: [
        {
          name: "NVIDIA Jetson Nano",
          level: "Companion Computer",
          context: {
            en: "Linux edge deployment, OpenCV pipeline execution, USB/UART bridging.",
            id: "Penerapan edge Linux, eksekusi pipeline OpenCV, komunikasi USB/UART.",
          },
        },
        {
          name: "ESP32 & Arduino Platforms",
          level: "Firmware Applied",
          context: {
            en: "FreeRTOS task scheduling, ADC analog reading, PWM generation, interrupt routines.",
            id: "Penjadwalan tugas FreeRTOS, pembacaan analog ADC, PWM, rutin interupsi.",
          },
        },
        {
          name: "Hardware Protocols (UART / I2C / SPI)",
          level: "Interfacing",
          context: {
            en: "Serial baud rate matching, sensor bus addressing, bit-rate synchronization.",
            id: "Penyelarasan baud rate serial, pengalamatan bus sensor, sinkronisasi transfer.",
          },
        },
        {
          name: "Linux & Shell Scripting",
          level: "Environment",
          context: {
            en: "Ubuntu for Jetson, systemd service daemons, environment setup, bash automation.",
            id: "Ubuntu untuk Jetson, daemon layanan systemd, konfigurasi environment, otomasi bash.",
          },
        },
      ],
    },

    {
      id: "software-web",
      title: { en: "Software & Web Engineering", id: "Rekayasa Perangkat Lunak & Web" },
      icon: "Code2",
      description: {
        en: "Modern frontend and telemetry visualization engineering for human-machine interfaces.",
        id: "Frontend modern dan rekayasa visualisasi telemetri untuk antarmuka mesin-manusia.",
      },
      skills: [
        {
          name: "Python 3",
          level: "Core Engineering",
          context: {
            en: "Perception loops, PyMAVLink serial clients, NumPy vector math, logging scripts.",
            id: "Loop persepsi, klien serial PyMAVLink, kalkulasi matriks NumPy, skrip logging.",
          },
        },
        {
          name: "TypeScript & React",
          level: "Frontend Core",
          context: {
            en: "Next.js App Router, typed state management, interactive canvas controls.",
            id: "Next.js App Router, manajemen state ber-tipe, kontrol canvas interaktif.",
          },
        },
        {
          name: "Tailwind CSS & Design Systems",
          level: "UI Architecture",
          context: {
            en: "Crisp technical editorial styling, responsive layouts, accessible contrast.",
            id: "Styling editorial teknis, tata letak responsif, kontras aksesibilitas tinggi.",
          },
        },
        {
          name: "MQTT & WebSockets",
          level: "Real-time Data",
          context: {
            en: "Telemetry streaming from physical microcontrollers to web dashboards.",
            id: "Streaming data telemetri dari mikrokontroler fisik ke dashboard web.",
          },
        },
        {
          name: "Git & Version Control",
          level: "Collaboration",
          context: {
            en: "Feature branching, repository hygiene, production deployment pipelines.",
            id: "Branching fitur, manajemen repositori bersih, alur deployment produksi.",
          },
        },
      ],
    },

    {
      id: "lab-instrumentation",
      title: { en: "Laboratory & Hardware Instrumentation", id: "Instrumentasi Lab & Hardware" },
      icon: "Activity",
      description: {
        en: "Diagnostic testing, circuit measurement, and physical prototyping.",
        id: "Pengujian diagnostik, pengukuran rangkaian, dan pembuatan prototipe fisik.",
      },
      skills: [
        {
          name: "Oscilloscope & Multimeter Diagnostics",
          level: "Bench Testing",
          context: {
            en: "Signal integrity verification, PWM duty cycle measurement, voltage ripple debugging.",
            id: "Verifikasi integritas sinyal, pengukuran siklus kerja PWM, debugging riak tegangan.",
          },
        },
        {
          name: "Soldering & Avionics Harness Assembly",
          level: "Physical Build",
          context: {
            en: "XT60/XT90 power harnesses, JST-GH connector crimping, drone wiring safety.",
            id: "Wiring harness daya XT60/XT90, crimping konektor JST-GH, keamanan instalasi kabel drone.",
          },
        },
        {
          name: "MATLAB & Simulink",
          level: "Academic Lab",
          context: {
            en: "Signal analysis, mathematical modeling of electrical circuits and controls.",
            id: "Analisis sinyal, pemodelan matematis rangkaian listrik dan sistem kendali.",
          },
        },
        {
          name: "SolidWorks CAD Fundamentals",
          level: "Basic Modeling",
          context: {
            en: "Mounting bracket visualization, payload gripper geometry checks.",
            id: "Visualisasi braket mounting, pengecekan geometri gripper payload.",
          },
        },
      ],
    },
  ] as SkillGroup[],

  fieldLogs: [
    {
      id: "LOG-006",
      date: "2026-10",
      badge: "KRTI 2026",
      tag: "uav",
      title: {
        en: "MAVLink Companion Daemon & Flight Gating Architecture",
        id: "Daemon Companion MAVLink & Arsitektur Flight Gating",
      },
      content: {
        en: "Implemented the autonomous flight gating state machine. The companion computer verifies that the UAV has climbed above 0.8m altitude with a sustained 3-second positive vertical trend before arming the optical dataset recorder and servo payload triggers, preventing ground bench false fires.",
        id: "Mengimplementasikan state machine flight gating otonom. Companion computer memverifikasi UAV telah berada di atas ketinggian 0.8m dengan tren positif stabil selama 3 detik sebelum mengaktifkan perekaman dataset dan pemicu servo, mencegah pemicuan salah saat di meja tes darat.",
      },
      metrics: "921.6k Baud // AUX 1 PWM 1000→2000µs",
    },
    {
      id: "LOG-005",
      date: "2026-05",
      badge: "PERCEPTION",
      tag: "vision",
      title: {
        en: "Multi-Scale ArUco Marker Hierarchy Testing",
        id: "Pengujian Hierarki Marker ArUco Multi-Skala",
      },
      content: {
        en: "Evaluated DICT_4X4_50 detection reliability under high noon solar glare. Standard binarization failed on reflective vinyl panels; implementing CLAHE contrast stretching restored recognition rate from 54% to 98.2% across varying camera tilt angles.",
        id: "Mengevaluasi keandalan deteksi DICT_4X4_50 di bawah terik matahari siang. Binarisasi standar gagal pada banner vinil mengkilap; penerapan CLAHE contrast stretching memulihkan tingkat pengenalan dari 54% menjadi 98.2% pada berbagai sudut kemiringan kamera.",
      },
      metrics: "30 FPS // <25ms Latency",
    },
    {
      id: "LOG-004",
      date: "2026-04",
      badge: "EMBEDDED",
      tag: "embedded",
      title: {
        en: "ESP32 FreeRTOS Microcontroller Telemetry Bridge",
        id: "Jembatan Telemetri Mikrokontroler ESP32 FreeRTOS",
      },
      content: {
        en: "Designed a multi-threaded FreeRTOS firmware architecture separating ADC sensor polling from asynchronous Wi-Fi/MQTT packet transmission, preventing buffer bottlenecks during high-frequency telemetry streaming.",
        id: "Merancang arsitektur firmware multi-threaded FreeRTOS yang memisahkan polling sensor ADC dari transmisi paket Wi-Fi/MQTT asinkron, mencegah bottleneck buffer saat streaming telemetri frekuensi tinggi.",
      },
      metrics: "Dual-Core Xtensa // 100Hz Poll",
    },
    {
      id: "LOG-003",
      date: "2026-03",
      badge: "ALGORITHMIC",
      tag: "vision",
      title: {
        en: "Runway Dashed Line Collinearity & Gap Recovery",
        id: "Kolinearitas Garis Landasan Putus-Putus & Gap Recovery",
      },
      content: {
        en: "Developed collinearity regression algorithm to fit multiple segmented dashed lines on the runway into a unified tracking vector. Incorporated a 12-frame gap holdover to handle spacing intervals between line segments.",
        id: "Mengembangkan algoritma regresi kolinearitas untuk menyatukan segmen garis putus-putus landasan menjadi satu vektor panduan. Menambahkan toleransi celah 12-frame untuk mengatasi jeda antar segmen garis.",
      },
      metrics: "12-Frame Holdover // <40px Drift",
    },
    {
      id: "LOG-002",
      date: "2025-11",
      badge: "AVIONICS",
      tag: "uav",
      title: {
        en: "Cube Orange+ RTK Base Calibration & MAVLink Bench Test",
        id: "Kalibrasi Base RTK Cube Orange+ & Uji Bangku MAVLink",
      },
      content: {
        en: "Configured U-Blox F9P RTK GNSS module with survey-in base station mode. Verified centimeter-level horizontal positioning stability and established reliable telemetry logging on Mission Planner.",
        id: "Mengonfigurasi modul U-Blox F9P RTK GNSS dengan mode survey-in base station. Memverifikasi stabilitas penentuan posisi horizontal tingkat sentimeter dan memastikan logging telemetri andal pada Mission Planner.",
      },
      metrics: "U-Blox F9P // RTK Fixed State",
    },
    {
      id: "LOG-001",
      date: "2025-09",
      badge: "FOUNDATIONS",
      tag: "education",
      title: {
        en: "Electrical Engineering Foundations & Circuit Analysis (ITNY)",
        id: "Fondasi Teknik Elektro & Analisis Rangkaian (ITNY)",
      },
      content: {
        en: "Completed advanced circuit theory, AC/DC circuit analysis, and microcomputer peripheral interfacing at ITNY. Began bridging electrical signal modeling with software control loops.",
        id: "Menyelesaikan teori rangkaian lanjutan, analisis rangkaian AC/DC, dan interfacing periferal mikrokomputer di ITNY. Mulai menghubungkan pemodelan sinyal listrik dengan loop kendali perangkat lunak.",
      },
      metrics: "ITNY // Electrical Eng Core",
    },
  ] as FieldLogEntry[],
};
