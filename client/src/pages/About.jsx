import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16">

        {/* HERO SECTION */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            About SmartOrder AI
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            SmartOrder AI is an intelligent e-commerce platform that goes beyond
            traditional online shopping. We analyze user behavior in real-time
            and provide AI-driven decision insights to reduce impulse purchases
            and increase smart buying confidence.
          </p>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center mb-16 md:mb-20">

          <div className="p-6 border rounded-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">98%</h2>
            <p className="text-gray-600 mt-2">Decision Accuracy</p>
          </div>

          <div className="p-6 border rounded-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-600">50+</h2>
            <p className="text-gray-600 mt-2">AI Behavior Logs</p>
          </div>

          <div className="p-6 border rounded-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-600">24/7</h2>
            <p className="text-gray-600 mt-2">Real-Time Analysis</p>
          </div>

          <div className="p-6 border rounded-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">100%</h2>
            <p className="text-gray-600 mt-2">Smart Purchase Tracking</p>
          </div>

        </div>

        {/* AI WORKING PROCESS */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 md:mb-12">
            How Our AI Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">

            <div className="p-6 border rounded-xl shadow-sm">
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                1️⃣ Behavior Tracking
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                AI tracks time spent, product interaction,
                color/size selection, and user engagement.
              </p>
            </div>

            <div className="p-6 border rounded-xl shadow-sm">
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                2️⃣ Decision Scoring
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                System calculates Impulse Score,
                Compatibility Score, and Final Decision Score.
              </p>
            </div>

            <div className="p-6 border rounded-xl shadow-sm">
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                3️⃣ Smart Insight
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                AI suggests whether purchase is Rational
                or Impulsive before checkout.
              </p>
            </div>

          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 md:mb-12">
            Why Choose SmartOrder AI?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">

            <div>
              <ul className="space-y-4 text-gray-700 text-base md:text-lg">
                <li>✔ AI-powered decision intelligence</li>
                <li>✔ Impulse purchase detection</li>
                <li>✔ Real-time analytics dashboard</li>
                <li>✔ Payment & Order tracking system</li>
                <li>✔ Secure & scalable MERN architecture</li>
              </ul>
            </div>

            <div className="border rounded-xl p-6 md:p-8 bg-gray-50">
              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                To transform e-commerce from simple product selling
                into intelligent buying guidance powered by AI.
              </p>

              <h3 className="text-lg md:text-xl font-semibold mt-6 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                To build the world’s first AI-native shopping platform
                that eliminates buyer regret and maximizes smart decisions.
              </p>
            </div>

          </div>
        </div>

        {/* FUTURE ROADMAP */}
        <div className="text-center px-2">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">
            🚀 Future Roadmap
          </h2>

          <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            Upcoming features include AI-based product recommendation,
            emotion detection, smart budget tracking, advanced data
            visualization dashboards, and enterprise AI integration.
          </p>
        </div>

      </div>
    </>
  );
}

export default About;