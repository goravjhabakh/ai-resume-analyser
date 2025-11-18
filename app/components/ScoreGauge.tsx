import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0); // drives BOTH arc and text
  const duration = 1500; // ms

  // Measure the path length once
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, []);

  // Animate score from 0 -> score
  useEffect(() => {
    if (pathLength === 0) return; // wait until we know length

    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const currentValue = Math.round(progress * score);
      setAnimatedScore(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    setAnimatedScore(0); // always restart from 0 when score changes
    requestAnimationFrame(animate);
  }, [score, pathLength]);

  // Compute dash offset from animatedScore
  const visibleLength = (pathLength * animatedScore) / 100;
  const strokeDashoffset = pathLength - visibleLength;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-20">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#fca5a5" />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Foreground animated arc */}
          <path
            ref={pathRef}
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={isNaN(strokeDashoffset) ? pathLength : strokeDashoffset}
          />
        </svg>

        {/* Animated score text */}
        <div className="absolute inset-0 flex items-center justify-center pt-3">
          <div className="text-xl font-semibold">
            {animatedScore}/100
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;