// Slide-Right Animation for Class Cards
const $ = window.jQuery // Declare the jQuery variable
$(document).ready(() => {
  const classDetails = {
    bollywood: [
      {
        title: "Class Highlights",
        content:
          "Energetic, expressive, and fun-filled dance sessions inspired by the latest and classic Bollywood songs. Our Bollywood class focuses on rhythm, expressions, confidence, and performance skills.",
        list: [
          "Latest and classic Bollywood choreography",
          "Expression and emotion training",
          "Stage presence and confidence building",
          "Group formations and synchronized moves",
        ],
      },
      {
        title: "What You'll Learn",
        content: "Master the art of Bollywood dance with a perfect blend of traditional and contemporary moves.",
        list: [
          "Dynamic dance sequences",
          "Facial expressions and storytelling",
          "Rhythm and beat coordination",
          "Performance techniques",
        ],
      },
      {
        title: "Who Should Join",
        content:
          "This class is perfect for all ages and skill levels who love Bollywood music and want to express themselves through dance.",
        list: [
          "Beginners with no dance experience",
          "Intermediate dancers looking to improve",
          "Anyone who loves Bollywood music",
          "Students preparing for performances",
        ],
      },
    ],
    kids: [
      {
        title: "Special Kids Program",
        content:
          "Designed specifically to nurture young talent in a fun, safe, and supportive environment. We focus on building confidence, coordination, creativity, and discipline.",
        list: [
          "Age-appropriate choreography",
          "Fun and engaging activities",
          "Character building through dance",
          "Safe and nurturing environment",
        ],
      },
      {
        title: "Skills Development",
        content: "Our kids program helps children develop essential life skills through the joy of dance.",
        list: [
          "Motor skills and coordination",
          "Confidence and self-expression",
          "Teamwork and social skills",
          "Discipline and focus",
        ],
      },
      {
        title: "Why Parents Love Us",
        content: "We create a positive space where kids can be themselves, make friends, and grow as performers.",
        list: [
          "Experienced instructors trained in child development",
          "Small class sizes for personal attention",
          "Regular performance opportunities",
          "Safe and welcoming studio environment",
        ],
      },
    ],
    beginner: [
      {
        title: "Start Your Journey",
        content:
          "Perfect for students who are new to dance or want to build strong basics. No prior dance experience required—just passion and willingness to learn.",
        list: [
          "Fundamentals of dance technique",
          "Basic body movements and posture",
          "Rhythm and musicality training",
          "Introduction to various dance styles",
        ],
      },
      {
        title: "What Makes Us Different",
        content:
          "We believe everyone can dance! Our beginner class breaks down complex moves into simple, achievable steps.",
        list: [
          "Patient and supportive instruction",
          "Step-by-step progression",
          "No judgment, only encouragement",
          "Build confidence from day one",
        ],
      },
      {
        title: "Your First Steps",
        content:
          "We'll guide you through the basics and help you discover your unique style and potential as a dancer.",
        list: [
          "Week 1-2: Body awareness and basic movements",
          "Week 3-4: Rhythm and coordination",
          "Week 5-6: Simple choreography",
          "Week 7-8: Your first performance piece",
        ],
      },
    ],
    advanced: [
      {
        title: "Contemporary Excellence",
        content:
          "Advanced class focusing on contemporary dance with emotion, storytelling, fluidity, and freedom. For experienced dancers ready for advanced techniques.",
        list: [
          "Advanced contemporary techniques",
          "Emotional expression and storytelling",
          "Complex choreographic sequences",
          "Improvisation and creativity",
        ],
      },
      {
        title: "Technical Mastery",
        content:
          "Take your dancing to the next level with advanced training in technique, performance, and artistic expression.",
        list: [
          "Advanced floor work and partnering",
          "Fluid transitions and dynamics",
          "Contemporary dance theory",
          "Professional performance skills",
        ],
      },
      {
        title: "Performance Ready",
        content: "Prepare for competitions, auditions, and professional opportunities with intensive training.",
        list: [
          "Competition preparation",
          "Audition technique",
          "Solo and group performances",
          "Professional stage presence",
        ],
      },
    ],
  }

  // Create overlay element
  const overlay = $('<div class="detail-overlay"></div>')
  $("body").append(overlay)

  // Click event for class cards
  $(".class-card").on("click", function () {
    const classType = $(this).data("class")
    const details = classDetails[classType]

    if (details) {
      // Clear previous content
      $("#detailCardsContainer").empty()

      // Populate with new detail cards
      details.forEach((detail) => {
        const detailCard = `
          <div class="detail-card">
            <h4>${detail.title}</h4>
            <p>${detail.content}</p>
            ${detail.list ? `<ul>${detail.list.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
          </div>
        `
        $("#detailCardsContainer").append(detailCard)
      })

      // Show panel and overlay
      $("#detailPanel").addClass("active")
      overlay.addClass("active")

      // Animate cards in after a short delay
      setTimeout(() => {
        $(".detail-card").addClass("show")
      }, 100)
    }
  })

  // Close panel function
  function closeDetailPanel() {
    $("#detailPanel").removeClass("active")
    overlay.removeClass("active")
    setTimeout(() => {
      $(".detail-card").removeClass("show")
    }, 500)
  }

  // Close button click
  $("#closePanel").on("click", closeDetailPanel)

  // Overlay click
  overlay.on("click", closeDetailPanel)

  // Escape key press
  $(document).on("keydown", (e) => {
    if (e.key === "Escape" && $("#detailPanel").hasClass("active")) {
      closeDetailPanel()
    }
  })
})
