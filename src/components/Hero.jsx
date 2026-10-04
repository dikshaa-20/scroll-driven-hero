import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const car = document.querySelector(".car");
      const trail = document.querySelector(".trail");
      const letters = gsap.utils.toArray(".value-letter");

      const carWidth = 220;

      // Intro animation
      gsap.from(".value-letter", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.out",
      });

      // Main scroll animation
      gsap.to(car, {
        x: () => window.innerWidth - carWidth,

        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: ".track",

          onUpdate: () => {
            const carX =
              gsap.getProperty(car, "x") + carWidth / 2;

            // Green trail follows the car
            gsap.set(trail, {
              width: carX,
            });

            // Reveal letters as car passes them
            letters.forEach((letter) => {
              const letterX = letter.offsetLeft;

              if (carX >= letterX) {
                gsap.to(letter, {
                  opacity: 1,
                  duration: 0.15,
                  overwrite: true,
                });
              } else {
                gsap.to(letter, {
                  opacity: 0,
                  duration: 0.15,
                  overwrite: true,
                });
              }
            });
          },
        },
      });

      // Statistics
      gsap.to("#box1", {
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=400 top",
          end: "top+=600 top",
          scrub: true,
        },
      });

      gsap.to("#box2", {
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=600 top",
          end: "top+=800 top",
          scrub: true,
        },
      });

      gsap.to("#box3", {
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=800 top",
          end: "top+=1000 top",
          scrub: true,
        },
      });

      gsap.to("#box4", {
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=1000 top",
          end: "top+=1200 top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const letters = "WELCOMEFIZZ".split("");

  return (
    <section
      ref={sectionRef}
      className="section relative h-[200vh] bg-[#121212]"
    >
      <div className="track sticky top-0 h-screen w-full bg-[#d1d1d1] flex items-center justify-center overflow-hidden">

        {/* Road */}
        <div className="road relative w-full h-[200px] bg-[#1e1e1e] overflow-hidden">

          {/* Green trail */}
          <div className="trail absolute top-0 left-0 h-[200px] w-0 bg-[#45db7d] z-[1]" />

          {/* Headline */}
          <div className="value-add absolute text-sm top-[-7%]  left-[5%] z-[5] flex gap-[0.3rem] text-[8rem] font-bold">

            {letters.map((letter, index) => (
              <span
                key={index}
                className="value-letter text-[#111] opacity-0"
              >
                {letter}
              </span>
            ))}

          </div>

          {/* Car */}
          <div
            className="car absolute top-[-30px] left-0 z-10 w-[220px] h-[260px]"
          >
            <div className="w-full h-full flex items-center justify-center">

              {/* Car Image */}
              <img
                src="/car.jpeg"
                alt="car"
                className="w-[220px] h-[260px] object-contain mix-blend-multiply"
              />

            </div>
          </div>

        </div>

        {/* Statistics */}

        <div
          id="box1"
          className="text-box absolute p top-[5%] right-[30%] z-[5] bg-[#def54f] text-[#111] px-[50px] py-[40px] rounded-[10px] opacity-0"
        >
          <span className="block text-[58px] font-semibold  mb-[15px]">
            58%
          </span>

          <span className="text-[18px] ">
            Increase in pick up point use
          </span>
        </div>

        <div
          id="box2"
          className="text-box absolute bottom-[5%] right-[35%] z-[5] bg-[#6ac9ff] text-[#111] px-[50px] py-[40px] rounded-[10px] opacity-0"
        >
          <span className="block text-[58px] font-semibold mb-[15px]">
            23%
          </span>

          <span className="text-[18px]">
            Decreased in customer phone calls
          </span>
        </div>

        <div
          id="box3"
          className="text-box absolute top-[5%] right-[10%] z-[5] bg-[#333] text-white px-[50px] py-[40px] rounded-[10px] opacity-0"
        >
          <span className="block text-[58px] font-semibold mb-[15px]">
            27%
          </span>

          <span className="text-[18px]">
            Increase in pick up point use
          </span>
        </div>

        <div
          id="box4"
          className="text-box absolute bottom-[5%] right-[12.5%] z-[5] bg-[#fa7328] text-[#111] px-[50px] py-[40px] rounded-[10px] opacity-0"
        >
          <span className="block text-[58px] font-semibold mb-[15px]">
            40%
          </span>

          <span className="text-[18px]">
            Decreased in customer phone calls
          </span>
        </div>

      </div>
    </section>
  );
}

export default Hero;