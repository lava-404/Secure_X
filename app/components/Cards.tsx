"use client";

const Cards = () => {
  const features = [
    {
      title: "Generate Strong Passwords",
      info: "Stop guessing. Get rock-solid passwords in one click.",
      src: "../images/feat1.png",
    },
    {
      title: "Your Personal Vault",
      info: "Save and organize your passwords safely — locally or encrypted in your vault.",
      src: "../images/feat2.png",
    },
    {
      title: "Minimal & Fast",
      info: "No bloat, no nonsense. Just pure speed and privacy.",
      src: "../images/feat3.png",
    },
    {
      title: "Privacy First",
      info: "We don’t store your data. We don’t want it. Everything stays with you.",
      src: "../images/feat4.png",
    },
  ];

  // Duplicate for seamless loop
  const repeated = [...features, ...features];

  return (
    <div className="overflow-hidden relative ml-7.5 pl-12 pt-12  rounded-2xl lg:p-8 lg:mx-70 ">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-20"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-20"></div>

      {/* Scrolling track */}
      <div className="flex animate-scroll gap-12">
        {repeated.map((feat, index) => (
          <div
            key={index}
            className="flex-shrink-0 lg:w-[420px] lg:h-[620px] w-[400px] sm:w-[300px] bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 hover:scale-[1.03] transition-transform duration-500"
          >
            <img
              src={feat.src}
              alt={feat.title}
              className="w-full h-1/2 rounded-t-2xl object-cover"
            />
            <div className="p-4 text-center">
              <h2
                className="text-5xl font-instrument"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {feat.title}
              </h2>
              <p className="text-white text-lg mt-6">{feat.info}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Keyframes + responsive tweaks */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
          width: calc(420px * 8 + 12rem); /* 8 cards (4 original + 4 repeat) */
        }

        /* --- small screen responsive behavior --- */
        @media (max-width: 768px) {
          .animate-scroll {
            animation: none; /* Stop auto-scroll on phones for sanity */
            overflow-x: auto;
            width: 100%;
            display: flex;
            scroll-snap-type: x mandatory;
          }

          .animate-scroll::-webkit-scrollbar {
            display: none; /* Hide scrollbar for clean look */
          }

          .animate-scroll > div {
            scroll-snap-align: center;
            flex: 0 0 80%;
            margin-right: 1rem;
          }

          .animate-scroll > div img {
            height: 200px;
          }

          .animate-scroll > div h2 {
            font-size: 1.75rem;
          }

          .animate-scroll > div p {
            font-size: 0.95rem;
          }

          .absolute.left-0,
          .absolute.right-0 {
            display: none; /* Hide gradient edges on phones */
          }

          .mx-70 {
            margin: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Cards;
