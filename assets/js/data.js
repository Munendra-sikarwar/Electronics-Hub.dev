window.EH_DATA = {
  levels: [
    { id: 0, title: "Embedded Systems", difficulty: "Moderate", time: "2 Months", count: 10, description: "See how electronic systems sense, decide, and act in the world.", lessons: [
      ["C-PROGRAMMING", "C PROGRAMMING", "8 min"],
      ["ARDUINO", "ARDUINO", "10 min"],
      ["COMPUTER-ARCHITECTURE", "COMPUTER ARCHITECTURE", "12 min"],
      ["STM32", "STM32", "10 min"],
      ["COMMUNICATION-PROTOCOLS", "COMMUNICATION PROTOCOLS", "10 min"],
      ["EMBEDDED-DEBUGGING", "EMBEDDED DEBUGGING", "10 min"],
      ["RTOS", "RTOS", "10 min"],
      ["HARDWARE-MODELING", "HARDWARE MODELING", "10 min"],
      ["EMBEDDED-LINUX", "EMBEDDED LINUX", "10 min"],
      ["EMBEDDED-NETWORKING", "EMBEDDED NETWORKING", "10 min"]
      
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

// Curriculum metadata is keyed by the exact lesson ID in EH_DATA. Keep lesson HTML in topicContent below.
const details = [
  {
    "courseId": "C-PROGRAMMING",
    "chapters": [
      {
        "id": "getting-started-with-c",
        "title": "Getting Started with C",
        "topics": [
          {
            "id": "Your-First-C-Program",
            "title": "Your First C Program",
            "label": "Start"
          },
          {
            "id": "Compile-Build-&-Run",
            "title": "Compile, Build & Run",
            "label": "Build"
          }
        ]
      },
      {
        "id": "variables-types-memory",
        "title": "Variables, Types & Memory",
        "topics": [
          {
            "id": "variables",
            "title": "Variables & Constants",
            "label": "Concept"
          },
          {
            "id": "data-types",
            "title": "Data Types in C",
            "label": "Concept"
          },
          {
            "id": "operators",
            "title": "Signed vs Unsigned Integers",
            "label": "Practice"
          },
          {
            "id": "integer-size-range",
            "title": "Integer Size & Range",
            "label": "Practice",
            "legacyIds": [
              "operators"
            ]
          },
          {
            "id": "fixed-width-integer-types",
            "title": "Fixed-Width Integer Types",
            "label": "Practice",
            "legacyIds": [
              "operators"
            ]
          }
        ]
      },
      {
        "id": "input-output-type-conversion",
        "title": "Input, Output & Type Conversion",
        "topics": [
          {
            "id": "if-else",
            "title": "Type Conversion",
            "label": "Control"
          },
          {
            "id": "loops",
            "title": "Formatted Output with printf()",
            "label": "Control"
          },
          {
            "id": "functions",
            "title": "Input with scanf()",
            "label": "Structure"
          },
          {
            "id": "debugging-with-input-output",
            "title": "Debugging with Input & Output",
            "label": "Structure",
            "legacyIds": [
              "functions"
            ]
          }
        ]
      },
      {
        "id": "operators-expressions",
        "title": "Operators & Expressions",
        "topics": [
          {
            "id": "arrays",
            "title": "Arithmetic Operators",
            "label": "Concept"
          },
          {
            "id": "strings",
            "title": "Relational & Equality Operators",
            "label": "Concept"
          },
          {
            "id": "logical-operators",
            "title": "Logical Operators",
            "label": "Concept"
          },
          {
            "id": "assignment-increment-operators",
            "title": "Assignment & Increment Operators",
            "label": "Concept"
          },
          {
            "id": "operator-precedence",
            "title": "Operator Precedence & Expressions",
            "label": "Concept"
          }
        ]
      },
      {
        "id": "decisions-repetition",
        "title": "Decisions & Repetition",
        "topics": [
          {
            "id": "c-programming-decisions-repetition-if-else-if-else",
            "title": "if, else if & else",
            "label": "Data",
            "legacyIds": [
              "arrays"
            ]
          },
          {
            "id": "c-programming-decisions-repetition-switch-statements",
            "title": "switch Statements",
            "label": "Data",
            "legacyIds": [
              "strings"
            ]
          },
          {
            "id": "pointers",
            "title": "for, while & do-while Loops",
            "label": "Advanced"
          },
          {
            "id": "break-continue-nested-loops",
            "title": "break, continue & Nested Loops",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          }
        ]
      },
      {
        "id": "functions-program-organization",
        "title": "Functions & Program Organization",
        "topics": [
          {
            "id": "c-programming-functions-program-organization-functions-declaration-definition-calling",
            "title": "Functions: Declaration, Definition & Calling",
            "label": "Data",
            "legacyIds": [
              "arrays"
            ]
          },
          {
            "id": "c-programming-functions-program-organization-parameters-arguments-return-values",
            "title": "Parameters, Arguments & Return Values",
            "label": "Data",
            "legacyIds": [
              "strings"
            ]
          },
          {
            "id": "c-programming-functions-program-organization-local-variables-scope-lifetime",
            "title": "Local Variables, Scope & Lifetime",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "passing-values-to-functions",
            "title": "Passing Values to Functions",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "function-prototypes-modular-code",
            "title": "Function Prototypes & Modular Code",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          }
        ]
      },
      {
        "id": "arrays-data-handling",
        "title": "Arrays & Data Handling",
        "topics": [
          {
            "id": "c-programming-arrays-data-handling-arrays-declaration-initialization",
            "title": "Arrays: Declaration & Initialization",
            "label": "Data",
            "legacyIds": [
              "arrays"
            ]
          },
          {
            "id": "c-programming-arrays-data-handling-accessing-elements-array-indexing",
            "title": "Accessing Elements & Array Indexing",
            "label": "Data",
            "legacyIds": [
              "strings"
            ]
          },
          {
            "id": "c-programming-arrays-data-handling-traversing-arrays-with-loops",
            "title": "Traversing Arrays with Loops",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "multidimensional-arrays",
            "title": "Multidimensional Arrays",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "character-arrays-basic-strings",
            "title": "Character Arrays & Basic Strings",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "arrays-in-sensor-data-collection",
            "title": "Arrays in Sensor Data Collection",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          }
        ]
      },
      {
        "id": "pointers-memory-addresses",
        "title": "Pointers & Memory Addresses",
        "topics": [
          {
            "id": "c-programming-pointers-memory-addresses-memory-addresses-the-address-of-operator",
            "title": "Memory Addresses & the Address-of Operator",
            "label": "Data",
            "legacyIds": [
              "arrays"
            ]
          },
          {
            "id": "c-programming-pointers-memory-addresses-pointer-declaration-initialization",
            "title": "Pointer Declaration & Initialization",
            "label": "Data",
            "legacyIds": [
              "strings"
            ]
          },
          {
            "id": "c-programming-pointers-memory-addresses-dereferencing-pointers",
            "title": "Dereferencing Pointers",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "pointers-and-functions",
            "title": "Pointers and Functions",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "pointers-and-arrays",
            "title": "Pointers and Arrays",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "pointers-and-functions-2",
            "title": "Pointers and Functions",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "pointers-and-arrays-2",
            "title": "Pointers and Arrays",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "null-pointers-common-pointer-errors",
            "title": "NULL Pointers & Common Pointer Errors",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "pointers-in-embedded-programming",
            "title": "Pointers in Embedded Programming",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          }
        ]
      },
      {
        "id": "structures-user-defined-types",
        "title": "Structures & User-Defined Types",
        "topics": [
          {
            "id": "c-programming-structures-user-defined-types-structures-struct",
            "title": "Structures (struct)",
            "label": "Data",
            "legacyIds": [
              "arrays"
            ]
          },
          {
            "id": "c-programming-structures-user-defined-types-accessing-structure-members",
            "title": "Accessing Structure Members",
            "label": "Data",
            "legacyIds": [
              "strings"
            ]
          },
          {
            "id": "c-programming-structures-user-defined-types-arrays-of-structures",
            "title": "Arrays of Structures",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "enumerations-enum",
            "title": "Enumerations (enum)",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "unions-union",
            "title": "Unions (union)",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "enumerations-enum-2",
            "title": "Enumerations (enum)",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "typedef-and-custom-type-names",
            "title": "typedef and Custom Type Names",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          }
        ]
      },
      {
        "id": "scope-storage-memory-qualifiers",
        "title": "Scope, Storage & Memory Qualifiers",
        "topics": [
          {
            "id": "c-programming-scope-storage-memory-qualifiers-local-global-variables",
            "title": "Local & Global Variables",
            "label": "Data",
            "legacyIds": [
              "arrays"
            ]
          },
          {
            "id": "c-programming-scope-storage-memory-qualifiers-storage-classes-static-and-extern",
            "title": "Storage Classes: static and extern",
            "label": "Data",
            "legacyIds": [
              "strings"
            ]
          },
          {
            "id": "c-programming-scope-storage-memory-qualifiers-const-and-read-only-data",
            "title": "const and Read-Only Data",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "volatile-in-embedded-c",
            "title": "volatile in Embedded C",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "variable-lifetime-linkage",
            "title": "Variable Lifetime & Linkage",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "volatile-in-embedded-c-2",
            "title": "volatile in Embedded C",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "stack-static-storage-memory-layout",
            "title": "Stack, Static Storage & Memory Layout",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          }
        ]
      },
      {
        "id": "preprocessor-header-files",
        "title": "Preprocessor & Header Files",
        "topics": [
          {
            "id": "c-programming-preprocessor-header-files-include-and-header-files",
            "title": "#include and Header Files",
            "label": "Data",
            "legacyIds": [
              "arrays"
            ]
          },
          {
            "id": "c-programming-preprocessor-header-files-macros-with-define",
            "title": "Macros with #define",
            "label": "Data",
            "legacyIds": [
              "strings"
            ]
          },
          {
            "id": "c-programming-preprocessor-header-files-conditional-compilation",
            "title": "Conditional Compilation",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "header-guards",
            "title": "Header Guards",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "splitting-a-program-into-c-and-h-files",
            "title": "Splitting a Program into .c and .h Files",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          }
        ]
      },
      {
        "id": "bit-manipulation-binary-operations",
        "title": "Bit Manipulation & Binary Operations",
        "topics": [
          {
            "id": "c-programming-bit-manipulation-binary-operations-binary-hexadecimal-bit-positions",
            "title": "Binary, Hexadecimal & Bit Positions",
            "label": "Data",
            "legacyIds": [
              "arrays"
            ]
          },
          {
            "id": "c-programming-bit-manipulation-binary-operations-bitwise-operators",
            "title": "Bitwise Operators: &, |, ^, ~",
            "label": "Data",
            "legacyIds": [
              "strings"
            ]
          },
          {
            "id": "c-programming-bit-manipulation-binary-operations-left-right-shift-operators",
            "title": "Left & Right Shift Operators",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "setting-clearing-toggling-bits",
            "title": "Setting, Clearing & Toggling Bits",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "masks-and-bit-fields",
            "title": "Masks and Bit Fields",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "reading-modifying-register-bits",
            "title": "Reading & Modifying Register Bits",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "common-bit-manipulation-errors",
            "title": "Common Bit Manipulation Errors",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          }
        ]
      },
      {
        "id": "embedded-c-fundamentals",
        "title": "Embedded C Fundamentals",
        "topics": [
          {
            "id": "c-programming-embedded-c-fundamentals-what-makes-embedded-c-different",
            "title": "What Makes Embedded C Different?",
            "label": "Data",
            "legacyIds": [
              "arrays"
            ]
          },
          {
            "id": "c-programming-embedded-c-fundamentals-memory-mapped-hardware-registers",
            "title": "Memory-Mapped Hardware Registers",
            "label": "Data",
            "legacyIds": [
              "strings"
            ]
          },
          {
            "id": "c-programming-embedded-c-fundamentals-gpio-registers-pin-control",
            "title": "GPIO Registers & Pin Control",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "polling-vs-interrupts",
            "title": "Polling vs Interrupts",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "hardware-timers-counters",
            "title": "Hardware Timers & Counters",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "uart-spi-i-c-data-handling",
            "title": "UART, SPI & I²C Data Handling",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "fixed-width-types-and-register-access",
            "title": "Fixed-Width Types and Register Access",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "hardware-compiler-portability-considerations",
            "title": "Hardware, Compiler & Portability Considerations",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          }
        ]
      },
      {
        "id": "practical-c-for-embedded-systems",
        "title": "Practical C for Embedded Systems",
        "topics": [
          {
            "id": "c-programming-practical-c-for-embedded-systems-building-a-sensor-data-processor",
            "title": "Building a Sensor Data Processor",
            "label": "Data",
            "legacyIds": [
              "arrays"
            ]
          },
          {
            "id": "c-programming-practical-c-for-embedded-systems-implementing-a-software-counter-timer",
            "title": "Implementing a Software Counter & Timer",
            "label": "Data",
            "legacyIds": [
              "strings"
            ]
          },
          {
            "id": "c-programming-practical-c-for-embedded-systems-building-a-circular-buffer",
            "title": "Building a Circular Buffer",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "reading-and-updating-register-fields",
            "title": "Reading and Updating Register Fields",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "writing-interrupt-friendly-code",
            "title": "Writing Interrupt-Friendly Code",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "debugging-common-embedded-c-errors",
            "title": "Debugging Common Embedded C Errors",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          },
          {
            "id": "mini-project-sensor-data-acquisition",
            "title": "Mini Project: Sensor Data Acquisition",
            "label": "Advanced",
            "legacyIds": [
              "pointers"
            ]
          }
        ]
      }
    ]
  },
  {
    "courseId": "voltage-current-resistance",
    "chapters": [
      {
        "id": "voltage-current-resistance-fundamentals",
        "title": "Voltage, Current, and Resistance Fundamentals",
        "topics": [
          {
            "id": "opening-question",
            "title": "Opening question",
            "label": "Start"
          },
          {
            "id": "beginner-explanation",
            "title": "The beginner explanation",
            "label": "Concept"
          },
          {
            "id": "relationship",
            "title": "See the relationship",
            "label": "Visual"
          },
          {
            "id": "engineering-explanation",
            "title": "The engineering explanation",
            "label": "Theory"
          },
          {
            "id": "applications",
            "title": "Where it appears",
            "label": "Examples"
          },
          {
            "id": "quick-check",
            "title": "Quick check",
            "label": "Practice"
          },
          {
            "id": "key-takeaways",
            "title": "Key takeaways",
            "label": "Summary"
          }
        ]
      }
    ]
  },
  {
    "courseId": "ARDUINO",
    "chapters": [
      {
        "id": "introduction-to-arduino",
        "title": "Arduino and Microcontroller Architecture",
        "topics": [
          {
            "id": "arduino-what-is-arduino",
            "title": "What Arduino is and where it is used",
            "label": "Start",
            "legacyIds": [
              "introduction"
            ]
          },
          {
            "id": "arduino-inside-the-board",
            "title": "Arduino Uno board architecture",
            "label": "Concept",
            "legacyIds": [
              "core-ideas"
            ]
          },
          {
            "id": "arduino-vs-microprocessor",
            "title": "ATmega328P microcontroller internals",
            "label": "Concept",
            "legacyIds": [
              "essential-tools"
            ]
          },
          {
            "id": "arduino-ide-setup",
            "title": "Digital pins, analog pins, power pins and reference pins",
            "label": "Setup"
          },
          {
            "id": "arduino-first-program",
            "title": "Arduino IDE, board selection and uploading firmware",
            "label": "Build"
          },
          {
            "id": "arduino-first-program",
            "title": "The Arduino execution model: setup() and loop()",
            "label": "Build"
          }
        ]
      },
      {
        "id": "electronics-and-hardware-fundamentals",
        "title": "Electronics and Circuit Interfacing",
        "topics": [
          {
            "id": "arduino-voltage-current-resistance",
            "title": "Voltage, current, resistance and power in practical circuits",
            "label": "Concept",
            "legacyIds": [
              "main-parts"
            ]
          },
          {
            "id": "arduino-breadboards-and-connections",
            "title": "Breadboards, wiring and circuit diagrams",
            "label": "Concept",
            "legacyIds": [
              "how-it-works"
            ]
          },
          {
            "id": "arduino-reading-a-simple-schematic",
            "title": "LED and resistor interfacing",
            "label": "Concept",
            "legacyIds": [
              "common-patterns"
            ]
          },
          {
            "id": "arduino-reading-a-simple-schematic",
            "title": "Digital voltage levels and GPIO electrical limits",
            "label": "Concept",
            "legacyIds": [
              "common-patterns"
            ]
          },
          {
            "id": "arduino-reading-a-simple-schematic",
            "title": "Pull-up, pull-down and floating inputs",
            "label": "Concept",
            "legacyIds": [
              "common-patterns"
            ]
          },
          {
            "id": "arduino-reading-a-simple-schematic",
            "title": "Switch bounce and input conditioning",
            "label": "Concept",
            "legacyIds": [
              "common-patterns"
            ]
          }

        ]
      },
      {
        "id": "digital-input-and-output",
        "title": "GPIO and Digital Interfacing",
        "topics": [
          {
            "id": "arduino-digital-pins",
            "title": "GPIO hardware and pin configuration",
            "label": "Concept",
            "legacyIds": [
              "first-example"
            ]
          },
          {
            "id": "arduino-button-inputs",
            "title": "pinMode(), digitalRead() and digitalWrite()",
            "label": "Concept",
            "legacyIds": [
              "measure-and-debug"
            ]
          },
          {
            "id": "arduino-debouncing-inputs",
            "title": "Button and switch interfacing",
            "label": "Practice",
            "legacyIds": [
              "real-world-use"
            ]
          },
          
          {
            "id": "arduino-debouncing-inputs",
            "title": "Internal pull-up resistors",
            "label": "Practice",
            "legacyIds": [
              "real-world-use"
            ]
          
          },
          {
            "id": "arduino-debouncing-inputs",
            "title": "Driving multiple outputs",
            "label": "Practice",
            "legacyIds": [
              "real-world-use"
            ]
          
          },
          {
            "id": "arduino-debouncing-inputs",
            "title": "Practical digital input/output experiments",
            "label": "Practice",
            "legacyIds": [
              "real-world-use"
            ]
          }
        ]
      },
      {
        "id": "arduino-programming-fundamentals",
        "title": "ADC, Analog Signals and PWM",
        "topics": [
          {
            "id": "arduino-sketch-structure",
            "title": "Analog voltage measurement",
            "label": "Concept",
            "legacyIds": [
              "common-mistakes"
            ]
          },
          {
            "id": "arduino-variables-and-types",
            "title": "ADC resolution, reference voltage and quantization",
            "label": "Concept",
            "legacyIds": [
              "mini-challenge"
            ]
          },
          {
            "id": "arduino-control-flow",
            "title": "analogRead() and ADC limitations",
            "label": "Concept",
            "legacyIds": [
              "key-takeaways"
            ]
          
          },
          {
            "id": "arduino-control-flow",
            "title": "PWM generation and duty cycle",
            "label": "Concept",
            "legacyIds": [
              "key-takeaways"
            ]
          },
          {
            "id": "arduino-control-flow",
            "title": "analogWrite() and PWM-capable pins",
            "label": "Concept",
            "legacyIds": [
              "key-takeaways"
            ]
          },
          {
            "id": "arduino-control-flow",
            "title": "analogWrite() and PWM-capable pins",
            "label": "Concept",
            "legacyIds": [
              "key-takeaways"
            ]
          }
        ]
      },
      {
        "id": "analog-input-and-output",
        "title": "Timing and Real-Time Behaviour",
        "topics": [
          {
            "id": "arduino-analog-input",
            "title": "Blocking versus non-blocking execution",
            "label": "Concept"
          },
          {
            "id": "arduino-pwm-output",
            "title": "delay(), millis() and micros()",
            "label": "Concept"
          },
          {
            "id": "arduino-scaling-sensor-values",
            "title": "Periodic task scheduling",
            "label": "Practice"
          },
          {
            "id": "arduino-scaling-sensor-values",
            "title": "Handling multiple activities concurrently",
            "label": "Practice"
          },
          {
            "id": "arduino-scaling-sensor-values",
            "title": "Timing accuracy and rollover considerations",
            "label": "Practice"
          }
        ]
      },
      {
        "id": "time-delays-and-non-blocking-programming",
        "title": "Serial Communication and Debugging",
        "topics": [
          {
            "id": "arduino-delay-vs-millis",
            "title": "UART fundamentals and baud rate",
            "label": "Concept"
          },
          {
            "id": "arduino-non-blocking-code",
            "title": "USB-to-serial communication",
            "label": "Concept"
          },
          {
            "id": "arduino-timing-multiple-tasks",
            "title": "Serial Monitor and Serial Plotter",
            "label": "Practice"
          },
          {
            "id": "arduino-timing-multiple-tasks",
            "title": "Receiving and parsing serial commands",
            "label": "Practice"
          },
          {
            "id": "arduino-timing-multiple-tasks",
            "title": "Debugging hardware and firmware together",
            "label": "Practice"
          },
          {
            "id": "arduino-timing-multiple-tasks",
            "title": "Understanding serial communication errors",
            "label": "Practice"
          }
        ]
      },
      {
        "id": "serial-communication",
        "title": "Sensors, Modules and Libraries",
        "topics": [
          {
            "id": "arduino-serial-monitor",
            "title": "Digital and analog sensor interfaces",
            "label": "Concept"
          },
          {
            "id": "arduino-sending-and-parsing-data",
            "title": "Sensor calibration and measurement errors",
            "label": "Concept"
          },
          {
            "id": "arduino-serial-debugging",
            "title": "Sampling rate and basic signal filtering",
            "label": "Practice"
          },
          {
            "id": "arduino-serial-debugging",
            "title": "Installing and using Arduino libraries",
            "label": "Practice"
          },
          {
            "id": "arduino-serial-debugging",
            "title": "Reading library documentation and examples",
            "label": "Practice"
          },
          {
            "id": "arduino-serial-debugging",
            "title": "Integrating sensors with displays and alarms",
            "label": "Practice"
          }
        ]
      },
      {
        "id": "sensors-and-arduino-libraries",
        "title": "Peripheral Communication Protocols",
        "topics": [
          {
            "id": "arduino-connecting-a-sensor",
            "title": "UART, I²C and SPI: practical comparison",
            "label": "Concept"
          },
          {
            "id": "arduino-using-libraries",
            "title": "I²C addressing and the Wire library",
            "label": "Concept"
          },
          {
            "id": "arduino-sensor-calibration",
            "title": "SPI signals and the SPI library",
            "label": "Practice"
          },
          {
            "id": "arduino-sensor-calibration",
            "title": "Connecting displays, sensors and peripheral devices",
            "label": "Practice"
          },
          {
            "id": "arduino-sensor-calibration",
            "title": "Connecting displays, sensors and peripheral devices",
            "label": "Practice"
          },
          {
            "id": "arduino-sensor-calibration",
            "title": "Choosing a communication protocol for an application",
            "label": "Practice"
          }
        ]
      },
      {
        "id": "communication-protocols",
        "title": "Actuators and Power Interfacing",
        "topics": [
          {
            "id": "arduino-uart",
            "title": "Transistors and MOSFETs as electronic switches",
            "label": "Concept"
          },
          {
            "id": "arduino-i2c",
            "title": "Motor drivers and external power supplies",
            "label": "Concept"
          },
          {
            "id": "arduino-spi",
            "title": "DC motor direction and speed control",
            "label": "Concept"
          },
          {
            "id": "arduino-spi",
            "title": "Servo position control",
            "label": "Concept"
          },
          {
            "id": "arduino-spi",
            "title": "Stepper motors and drivers",
            "label": "Concept"
          },
          {
            "id": "arduino-spi",
            "title": "Relay interfacing and electrical safety",
            "label": "Concept"
          }
        ]
      },
      {
        "id": "actuators-and-hardware-control",
        "title": "Interrupts, Timers and Hardware Registers",
        "topics": [
          {
            "id": "arduino-leds-and-relays",
            "title": "Polling versus interrupts",
            "label": "Concept"
          },
          {
            "id": "arduino-motors-and-servos",
            "title": "External interrupts and ISR constraints",
            "label": "Concept"
          },
          {
            "id": "arduino-driving-higher-current-loads",
            "title": "Hardware timers and timer-based events",
            "label": "Practice"
          },
          {
            "id": "arduino-driving-higher-current-loads",
            "title": "PWM and timer resource conflicts",
            "label": "Practice"
          },
          {
            "id": "arduino-driving-higher-current-loads",
            "title": "Register-level GPIO control",
            "label": "Practice"
          },
          {
            "id": "arduino-driving-higher-current-loads",
            "title": "volatile, atomic access and shared interrupt data",
            "label": "Practice"
          }
        ]
      },
      {
        "id": "interrupts-and-embedded-programming",
        "title": "Memory, Firmware and Optimization",
        "topics": [
          {
            "id": "arduino-interrupt-basics",
            "title": "Flash, SRAM and EEPROM",
            "label": "Concept"
          },
          {
            "id": "arduino-writing-an-isr",
            "title": "Program memory and RAM constraints",
            "label": "Concept"
          },
          {
            "id": "arduino-interrupt-safety",
            "title": "Firmware size and memory usage",
            "label": "Practice"
          },
          {
            "id": "arduino-interrupt-safety",
            "title": "Direct hardware access versus library abstractions",
            "label": "Practice"
          },
          {
            "id": "arduino-interrupt-safety",
            "title": "Power consumption and low-power fundamentals",
            "label": "Practice"
          },
          {
            "id": "arduino-interrupt-safety",
            "title": "Portability and hardware-specific code",
            "label": "Practice"
          }
        ]
      },
      {
        "id": "memory-and-arduino-internals",
        "title": "Embedded System Projects",
        "topics": [
          {
            "id": "arduino-flash-sram-eeprom",
            "title": "Requirements and hardware selection",
            "label": "Concept"
          },
          {
            "id": "arduino-program-memory",
            "title": "System block diagrams and circuit design",
            "label": "Concept"
          },
          {
            "id": "arduino-memory-limits",
            "title": "Firmware architecture and module integration",
            "label": "Practice"
          },
          {
            "id": "arduino-memory-limits",
            "title": "Testing, calibration and debugging",
            "label": "Practice"
          },
          {
            "id": "arduino-memory-limits",
            "title": "Documentation and project evaluation",
            "label": "Practice"
          },
          {
            "id": "arduino-memory-limits",
            "title": "Final integrated project",
            "label": "Practice"
          }
        ]
      },
      
    ]
  },
  {
    "courseId": "STM32",
    "chapters": [
      {
        "id": "stm32-platform-and-toolchain",
        "title": "STM32 Platform and Toolchain",
        "topics": [
          {
            "id": "stm32-mcu-family",
            "title": "STM32 Microcontroller Families",
            "label": "Start",
            "legacyIds": [
              "introduction"
            ]
          },
          {
            "id": "stm32-development-tools",
            "title": "Development Boards and Toolchains",
            "label": "Setup",
            "legacyIds": [
              "core-ideas"
            ]
          },
          {
            "id": "stm32-first-project",
            "title": "Building and Flashing a First Project",
            "label": "Build",
            "legacyIds": [
              "essential-tools"
            ]
          }
        ]
      },
      {
        "id": "cortex-m-core-and-firmware",
        "title": "Cortex-M Core and Firmware",
        "topics": [
          {
            "id": "stm32-cortex-m-core",
            "title": "Cortex-M Core Concepts",
            "label": "Concept",
            "legacyIds": [
              "main-parts"
            ]
          },
          {
            "id": "stm32-startup-and-linker",
            "title": "Startup Code and Linker Basics",
            "label": "Concept",
            "legacyIds": [
              "how-it-works"
            ]
          },
          {
            "id": "stm32-memory-map",
            "title": "Memory Map and Peripheral Access",
            "label": "Concept",
            "legacyIds": [
              "common-patterns"
            ]
          }
        ]
      },
      {
        "id": "stm32-peripherals",
        "title": "Peripherals and Timing",
        "topics": [
          {
            "id": "stm32-gpio",
            "title": "GPIO Configuration",
            "label": "Concept",
            "legacyIds": [
              "first-example"
            ]
          },
          {
            "id": "stm32-timers-pwm",
            "title": "Timers and PWM",
            "label": "Concept",
            "legacyIds": [
              "measure-and-debug"
            ]
          },
          {
            "id": "stm32-adc-dma",
            "title": "ADC and DMA",
            "label": "Concept",
            "legacyIds": [
              "real-world-use"
            ]
          }
        ]
      },
      {
        "id": "stm32-communication-and-debugging",
        "title": "Communication and Debugging",
        "topics": [
          {
            "id": "stm32-uart",
            "title": "UART Communication",
            "label": "Concept",
            "legacyIds": [
              "common-mistakes"
            ]
          },
          {
            "id": "stm32-i2c-spi",
            "title": "I²C and SPI",
            "label": "Concept",
            "legacyIds": [
              "mini-challenge"
            ]
          },
          {
            "id": "stm32-debugging",
            "title": "Debugging with ST-Link",
            "label": "Concept",
            "legacyIds": [
              "key-takeaways"
            ]
          }
        ]
      }
    ]
  }
];

// Curated lesson HTML is trusted site content. Topic titles and labels remain text.
const topicContent = {
  "Your-First-C-Program": "<div class=\"question-callout\">How can a small set of instructions control hardware, from a blinking LED to an entire embedded system?</div><p class=\"lead\">C is a fast, widely used programming language that gives you direct control over memory and hardware. That is why it is a core language for embedded systems.</p><p>A C program is a precise list of instructions. You write the instructions, compile them into machine code, and the computer follows them step by step.</p><p>As you learn C, focus on what each line stores, changes, checks, or sends to the hardware.</p>",
  "Compile-Build-&-Run": "<h2>Your first C program</h2><p>Every C program starts at <code>main</code>. It is the function the computer runs first.</p><p><code>int main(void) { return 0; }</code></p><p>The braces contain the instructions. A semicolon finishes an instruction. The <code>return 0</code> tells the operating system the program finished successfully.</p><p>Write a small program, compile it, and change one line at a time. That feedback loop is the fastest way to build confidence.</p>",
  "variables": "<div class=\"question-callout\">How does a program remember a sensor reading, a counter value, or whether an LED is on?</div><h2>Variables</h2><p>A variable is a named place in memory that stores a value your program can use and change.</p><p><code>int ledState = 0;</code> creates a variable named <code>ledState</code> and gives it the initial value <code>0</code>. Later, your program can set it to <code>1</code> when the LED should turn on.</p><p>Choose names that explain the value: <code>temperatureC</code> is clearer than <code>x</code>. Good names make programs easier to test and debug.</p>",
  "data-types": "<h2>Data types</h2><p>A data type tells C what kind of value a variable stores and how much memory it needs.</p><div class=\"application-grid\"><div class=\"application\"><strong><code>int</code></strong><p class=\"muted\">Whole numbers, such as a button press count.</p></div><div class=\"application\"><strong><code>float</code></strong><p class=\"muted\">Decimal values, such as a measured voltage.</p></div><div class=\"application\"><strong><code>char</code></strong><p class=\"muted\">A single character, such as a command received over serial communication.</p></div></div><p>Select a type that fits the data and its expected range. This matters especially on microcontrollers with limited memory.</p>",
  "arrays": "<h2>Arithmetic operators</h2><p>Arithmetic operators calculate numeric values. C provides <code>+</code> for addition, <code>-</code> for subtraction, <code>*</code> for multiplication, and <code>/</code> for division. The remainder operator <code>%</code> gives the remainder after integer division.</p><p>For example, <code>int half = 9 / 2;</code> stores <code>4</code> because integer division discards the fractional part. Use a floating-point value when you need a decimal result.</p>",
  "strings": "<h2>Relational and equality operators</h2><p>These operators compare two values and produce true (nonzero) or false (zero): <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code>, <code>==</code>, and <code>!=</code>.</p><p>For example, <code>if (temperature &gt;= limit)</code> checks whether the temperature has reached a limit. Use <code>==</code> to compare values; a single <code>=</code> assigns a value.</p>",
  "logical-operators": "<h2>Logical operators</h2><p>Logical operators combine or reverse conditions. <code>&amp;&amp;</code> is true when both conditions are true, <code>||</code> is true when either condition is true, and <code>!</code> reverses a condition.</p><p><code>if (buttonPressed &amp;&amp; temperature &lt; limit)</code> runs only when the button is pressed and the temperature is below the limit. C evaluates these operators from left to right with short-circuit behavior.</p>",
  "assignment-increment-operators": "<h2>Assignment and increment operators</h2><p>Assignment operators store or update a variable. Along with <code>=</code>, C provides shortcuts such as <code>+=</code>, <code>-=</code>, <code>*=</code>, and <code>/=</code>. For example, <code>count += 1;</code> adds one to <code>count</code>.</p><p><code>++</code> increments a value and <code>--</code> decrements it. Prefix (<code>++count</code>) updates before the expression is used; postfix (<code>count++</code>) uses the old value first.</p>",
  "operator-precedence": "<h2>Operator precedence and expressions</h2><p>Precedence determines which operations are evaluated first. Multiplication and division happen before addition and subtraction, so <code>2 + 3 * 4</code> evaluates to <code>14</code>.</p><p>Use parentheses to make the intended order clear: <code>(2 + 3) * 4</code> evaluates to <code>20</code>. Parentheses make expressions easier to read and help prevent subtle logic errors.</p>",
  "c-programming-arrays-data-handling-arrays-declaration-initialization": "<h2>Arrays</h2><p>An array stores several values of the same type in order. For example, <code>int readings[5]</code> can hold five sensor readings.</p><p>Array positions start at zero, so the first item is <code>readings[0]</code>. Be careful not to read or write beyond the final position.</p>",
  "pointers-in-embedded-programming": "<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>",
  "opening-question": "<div class=\"question-callout\">How can a small hidden circuit change the way we communicate, travel, study, cook, and stay safe?</div><p class=\"lead lesson-topic-lead\">This topic starts with the big idea: electronics are not only components on a board. They are systems that sense the world, make decisions, and create useful actions.</p><p>A phone wakes when you touch the screen. A washing machine measures water level. A traffic signal changes timing. A medical monitor watches a heartbeat. Each example looks different, but the pattern underneath is similar.</p><p>By the end of this lesson, you should be able to look at everyday technology and ask: What does it sense? What decision does it make? What output does it control?</p>",
  "beginner-explanation": "<h2>The beginner explanation</h2><p>Most electronic systems can be understood with three simple words: input, processing, and output. An input collects information, processing decides what that information means, and an output makes something happen.</p><p>A temperature sensor is an input. A microcontroller or circuit is the processing part. A fan, display, buzzer, motor, or light is the output.</p><p>This simple model helps you understand technology without getting lost in details. Before worrying about formulas, chips, or code, ask what information enters the system and what action leaves it.</p>",
  "relationship": "<h2>See the relationship</h2><p>The basic relationship in everyday electronics is a flow of information and energy: the system senses something, decides what it means, then acts.</p><div class=\"diagram\" role=\"img\" aria-label=\"Flow from sensing through decision to action\"><div class=\"diagram-grid\"></div><div class=\"diagram-flow\"><div class=\"diagram-node\">Sense<br>input</div><div class=\"diagram-line\"></div><div class=\"diagram-node\">Decide<br>logic</div><div class=\"diagram-line\"></div><div class=\"diagram-node\">Act<br>output</div></div></div><p>A smart light senses darkness, decides the room needs light, and turns on an LED. A phone senses touch, decides which command you selected, and updates the display.</p>",
  "engineering-explanation": "<h2>The engineering explanation</h2><p>Engineers describe electronic products as systems made of sensors, signal conditioning, computation or control logic, actuators, power delivery, and feedback.</p><p>The sensor converts a real-world condition into an electrical signal. The control circuit or processor interprets that signal. The output stage drives a load such as a speaker, motor, display, relay, or LED.</p><p>Good engineering means the system must work reliably under real conditions: low battery, electrical noise, changing temperature, user mistakes, and component tolerances.</p>",
  "applications": "<h2>Where it appears</h2><div class=\"application-grid\"><div class=\"application\"><strong>Smartphones</strong><p class=\"muted\">Touch, motion, microphones, cameras, radios, processors, and displays work as one system.</p></div><div class=\"application\"><strong>Home appliances</strong><p class=\"muted\">Sensors and controllers manage temperature, water, timing, speed, and safety.</p></div><div class=\"application\"><strong>Transportation</strong><p class=\"muted\">Vehicles use electronics for sensing, lighting, braking, charging, navigation, and communication.</p></div></div><p>Once you notice the pattern, electronics stops feeling invisible. Everyday devices become understandable systems with inputs, decisions, outputs, and power.</p>",
  "quick-check": "<h2>Quick check</h2><form class=\"quiz\" id=\"lesson-quiz\"><p><strong>In an automatic night light, what role does the light sensor play?</strong></p><label class=\"quiz-option\"><input type=\"radio\" name=\"answer\" value=\"correct\"> Input</label><label class=\"quiz-option\"><input type=\"radio\" name=\"answer\" value=\"wrong\"> Output</label><label class=\"quiz-option\"><input type=\"radio\" name=\"answer\" value=\"wrong\"> Power source</label><button class=\"button button-secondary\" type=\"submit\">Check answer</button><div class=\"quiz-feedback\" id=\"quiz-feedback\" aria-live=\"polite\"></div></form><p>The sensor provides information about the environment. The circuit uses that information to decide whether the lamp should turn on.</p>",
  "key-takeaways": "<h2>Key takeaways</h2><ul class=\"takeaway-list\"><li>Everyday electronics can be understood as input, processing, and output.</li><li>Sensors turn real-world conditions into electrical information.</li><li>Controllers or circuits decide what should happen next.</li><li>Outputs make the decision visible through light, motion, sound, heat, or data.</li></ul><p>Before moving on, choose one device near you and identify its input, processing, output, and power source.</p>"
};
