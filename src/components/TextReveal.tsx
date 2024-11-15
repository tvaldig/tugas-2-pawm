export const TextReveal : React.FC = () => {
    const text = "Chemic.ly";
  
    return (
      <>
        <h1 className="lg:text-8xl text-6xl [text-shadow:_0px_8px_10px_rgb(0_0_0_/_60%)] font-bold font-superfunky text-black">
          {text.match(/./gu)!.map((char, index) => (
            <span
              className="animate-text-reveal inline-block [animation-fill-mode:backwards]"
              key={`${char}-${index}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </>
    );
  };
  