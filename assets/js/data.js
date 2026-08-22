window.EH_DATA = {
  levels: [
    { id: 0, title: "Embedded Systems", difficulty: "Starter", time: "2 hours", count: 6, description: "See how electronic systems sense, decide, and act in the world.", lessons: [
      ["Introduction-to-Embedded-Systems", "Introduction to Embedded Systems", "8 min"],
      ["inside-an-electronic-system", "Inside an Electronic System", "10 min"],
      ["signals-sensors-output", "Signals, Sensors, and Outputs", "12 min"]
    ]},
    { id: 1, title: "Electricity Fundamentals", difficulty: "Beginner", time: "5 hours", count: 10, description: "Build intuition for charge, voltage, current, resistance, energy, and power.", lessons: [
      ["voltage-current-resistance", "Voltage, Current, and Resistance", "14 min"],
      ["ohms-law", "Ohm's Law Without the Mystery", "12 min"],
      ["power-and-energy", "Electrical Power and Energy", "13 min"],
      ["ac-vs-dc", "AC and DC Explained", "11 min"]
    ]},
    { id: 2, title: "Electronic Components", difficulty: "Beginner", time: "7 hours", count: 12, description: "Understand the parts engineers use to shape current and information.", lessons: [
      ["resistors", "Resistors and Color Codes", "15 min"],
      ["capacitors", "Capacitors: Tiny Energy Stores", "16 min"],
      ["diodes", "Diodes and One-Way Current", "14 min"],
      ["transistors", "Transistors as Switches", "18 min"]
    ]},
    { id: 3, title: "Circuit Fundamentals", difficulty: "Beginner", time: "8 hours", count: 12, description: "Analyze series, parallel, and networked circuits with confidence.", lessons: [
      ["series-parallel", "Series and Parallel Circuits", "16 min"],
      ["kirchhoffs-laws", "Kirchhoff's Circuit Laws", "18 min"],
      ["thevenin-norton", "Thevenin and Norton Models", "20 min"],
      ["breadboard-basics", "Breadboard Prototyping", "13 min"]
    ]},
    { id: 4, title: "Analog Electronics", difficulty: "Intermediate", time: "12 hours", count: 15, description: "Amplify, filter, and condition real-world signals.", lessons: [
      ["op-amp-foundations", "Operational Amplifier Foundations", "20 min"],
      ["active-filters", "Active Filters", "22 min"],
      ["amplifier-biasing", "Amplifier Biasing", "20 min"],
      ["oscillators", "Oscillators and Waveforms", "18 min"]
    ]},
    { id: 5, title: "Digital Electronics", difficulty: "Intermediate", time: "11 hours", count: 14, description: "Move from bits and gates to state machines and digital systems.", lessons: [
      ["binary-logic", "Binary Numbers and Logic", "15 min"],
      ["logic-gates", "Logic Gates in Practice", "17 min"],
      ["flip-flops", "Flip-Flops and Memory", "18 min"],
      ["state-machines", "Finite State Machines", "22 min"]
    ]},
    { id: 6, title: "Microprocessors", difficulty: "Intermediate", time: "13 hours", count: 12, description: "Learn how processors execute instructions and communicate with hardware.", lessons: [
      ["cpu-architecture", "CPU Architecture", "22 min"],
      ["memory-and-buses", "Memory, Buses, and Addressing", "20 min"],
      ["assembly-basics", "Assembly Language Basics", "24 min"],
      ["interrupts", "Interrupts and Timing", "18 min"]
    ]},
    { id: 7, title: "Microcontrollers", difficulty: "Intermediate", time: "16 hours", count: 15, description: "Program compact computers that interact directly with physical hardware.", lessons: [
      ["mcu-io", "Microcontroller Inputs and Outputs", "19 min"],
      ["timers-pwm", "Timers and PWM", "22 min"],
      ["adc-dac", "ADC and DAC", "20 min"],
      ["serial-protocols", "UART, I2C, and SPI", "25 min"]
    ]},
    { id: 8, title: "Embedded Systems", difficulty: "Advanced", time: "18 hours", count: 14, description: "Design reliable hardware-software systems under real constraints.", lessons: [
      ["embedded-architecture", "Embedded System Architecture", "22 min"],
      ["rtos-foundations", "Real-Time Operating Systems", "24 min"],
      ["power-management", "Low-Power Design", "21 min"],
      ["embedded-debugging", "Embedded Debugging", "20 min"]
    ]},
    { id: 9, title: "Engineer's Workshop", difficulty: "Advanced", time: "12 hours", count: 10, description: "Measure, simulate, solder, document, and troubleshoot like an engineer.", lessons: [
      ["multimeter-mastery", "Multimeter Mastery", "18 min"],
      ["oscilloscope-basics", "Oscilloscope Essentials", "22 min"],
      ["soldering-reliable-joints", "Reliable Soldering", "17 min"],
      ["kicad-pcb-design", "PCB Design with KiCad", "24 min"],
      ["ltspice-simulation", "Circuit Simulation with LTSpice", "22 min"],
      ["reading-datasheets", "Reading Datasheets", "20 min"],
      ["troubleshooting-circuits", "Systematic Troubleshooting", "21 min"]
    ]},
    { id: 10, title: "Master Projects", difficulty: "Advanced", time: "25+ hours", count: 10, description: "Combine every skill into portfolio-ready engineering systems.", lessons: [
      ["project-planning", "Engineering Project Planning", "18 min"],
      ["design-review", "Running a Design Review", "20 min"],
      ["prototype-validation", "Prototype Validation", "22 min"],
      ["technical-documentation", "Technical Documentation", "18 min"]
    ]}
  ],
  projects: [
    { title: "Automatic Night Light", difficulty: "Beginner", tags: ["Sensors"], cost: "$8", time: "45 min", components: "LDR, transistor, LED, resistors", outcome: "Build a light-activated switch and tune its threshold.", description: "A compact first sensor circuit that turns on automatically in darkness." },
    { title: "555 Timer Metronome", difficulty: "Beginner", tags: ["555 Timer"], cost: "$10", time: "1.5 hr", components: "NE555, speaker, potentiometer, capacitors", outcome: "Generate and control a stable audible pulse.", description: "Explore astable timing by building an adjustable electronic metronome." },
    { title: "LED Reaction Tester", difficulty: "Beginner", tags: ["Arduino"], cost: "$15", time: "2 hr", components: "Arduino, LEDs, button, buzzer", outcome: "Measure response time with non-blocking code.", description: "Create a precise reflex tester with randomized timing and score feedback." },
    { title: "Digital Thermometer", difficulty: "Intermediate", tags: ["Sensors", "Microcontrollers"], cost: "$22", time: "3 hr", components: "ESP32, temperature sensor, OLED", outcome: "Read, filter, and display live sensor data.", description: "Build a polished temperature monitor with calibration and min/max memory." },
    { title: "Bench Power Supply", difficulty: "Intermediate", tags: ["555 Timer"], cost: "$35", time: "5 hr", components: "Regulator, transformer, display, enclosure", outcome: "Design regulation, protection, and thermal handling.", description: "Create an adjustable protected supply for future electronics projects." },
    { title: "Line-Following Robot", difficulty: "Intermediate", tags: ["Arduino", "Sensors"], cost: "$45", time: "7 hr", components: "Arduino, IR array, motors, driver", outcome: "Tune a feedback controller for real motion.", description: "Build a responsive robot that follows a track using reflected light." },
    { title: "Smart Plant Monitor", difficulty: "Intermediate", tags: ["Sensors", "Microcontrollers"], cost: "$28", time: "4 hr", components: "ESP32, moisture sensor, OLED, buzzer", outcome: "Combine sensing, thresholds, UI, and alerts.", description: "Monitor soil conditions and receive clear watering recommendations." },
    { title: "Portable Oscilloscope", difficulty: "Advanced", tags: ["Microcontrollers"], cost: "$55", time: "12 hr", components: "STM32, TFT, op-amp front end, PCB", outcome: "Sample, buffer, trigger, and render waveforms.", description: "Engineer a compact scope for audio and low-frequency signal analysis." },
    { title: "Solar Battery Logger", difficulty: "Advanced", tags: ["Sensors", "Microcontrollers"], cost: "$60", time: "10 hr", components: "ESP32, current sensor, SD card, solar cell", outcome: "Measure energy flow and log long-term data.", description: "Track solar charge performance and analyze energy generation trends." }
  ],
  posts: [
    { id: "read-resistor-color-code", title: "How to Read a Resistor Color Code", category: "Components", tags: ["Resistors", "Beginner"], time: "6 min", excerpt: "A reliable mental model for decoding resistor bands without memorizing a confusing table." },
    { id: "multimeter-first-measurements", title: "Your First Five Multimeter Measurements", category: "Workshop", tags: ["Tools", "Safety"], time: "8 min", excerpt: "Measure voltage, resistance, continuity, current, and diode drop safely." },
    { id: "arduino-vs-esp32", title: "Arduino Uno vs ESP32: Which Should You Learn?", category: "Microcontrollers", tags: ["Arduino", "ESP32"], time: "9 min", excerpt: "Choose the right board by comparing simplicity, connectivity, power, and project goals." },
    { id: "why-capacitors-fail", title: "Why Capacitors Fail", category: "Components", tags: ["Capacitors", "Troubleshooting"], time: "7 min", excerpt: "Understand heat, voltage stress, ESR, aging, and the clues a failed capacitor leaves behind." },
    { id: "breadboard-mistakes", title: "Seven Breadboard Mistakes to Avoid", category: "Fundamentals", tags: ["Prototyping", "Beginner"], time: "5 min", excerpt: "Fix the wiring habits that make simple circuits feel harder than they are." },
    { id: "embedded-internship-guide", title: "Preparing for an Embedded Internship", category: "Career", tags: ["Internships", "Students"], time: "11 min", excerpt: "Build a focused portfolio and prepare for practical electronics interviews." }
  ],
  workshop: [
    ["Multimeter", "Measure voltage, current, resistance, continuity, and components safely.", "Measurement"],
    ["Oscilloscope", "See waveforms, timing, noise, and transient behavior directly.", "Measurement"],
    ["Soldering", "Create clean, reliable joints and repair common assembly faults.", "Fabrication"],
    ["KiCad", "Capture schematics and design manufacturable printed circuit boards.", "Design"],
    ["LTSpice", "Simulate analog circuits before committing parts to a breadboard.", "Simulation"],
    ["Datasheets", "Extract limits, pinouts, timing, and application guidance efficiently.", "Research"],
    ["Troubleshooting", "Use evidence, hypotheses, and measurements to isolate faults.", "Practice"]
  ]
};
