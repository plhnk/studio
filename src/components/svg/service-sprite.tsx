const ServiceSprite: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ visibility: "hidden" }}>
      <defs>
        <filter id="dropShadow">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="15"
            floodColor="#2e231c"
            floodOpacity="0.16"
          />
        </filter>
      </defs>
      <symbol id="advise" viewBox="0 0 246 337">
        <g filter="url(#dropShadow)">
          <path className="fill-merino-50" d="M37 57h172v223H37z" />
        </g>
        <circle cx="16" cy="87" r="8" className="fill-merino-950" />
        <circle cx="173" cy="26" r="8" className="fill-merino-950" />
        <circle cx="148" cy="316" r="8" className="fill-neutral-200" />
        <circle cx="226" cy="184" r="8" className="fill-merino-950" />
        <circle cx="24" cy="284" r="8" className="fill-neutral-300" />
        <circle cx="31" cy="11" r="8" className="fill-neutral-950" />
        <circle cx="215" cy="269" r="8" className="fill-neutral-500" />
      </symbol>

      <symbol id="design" viewBox="0 0 246 337">
        <g filter="url(#dropShadow)">
          <path className="fill-merino-50" d="M37 57h172v223H37z" />
        </g>
        <circle cx="60" cy="168" r="8" className="fill-merino-950" />
        <circle cx="60" cy="80" r="8" className="fill-merino-950" />
        <circle cx="93" cy="80" r="8" className="fill-merino-950" />
        <circle cx="180" cy="80" r="8" className="fill-merino-950" />
        <circle cx="118" cy="256" r="8" className="fill-neutral-400" />
        <circle cx="149" cy="256" r="8" className="fill-neutral-400" />
        <circle cx="180" cy="256" r="8" className="fill-neutral-400" />
      </symbol>

      <symbol id="develop" viewBox="0 0 246 337">
        <g filter="url(#dropShadow)">
          <path className="fill-neutral-950" d="M37 57h172v223H37z" />
        </g>
        <circle cx="92" cy="80" r="8" className="fill-merino-50" />
        <circle cx="60" cy="173" r="8" className="fill-merino-50" />
        <circle cx="60" cy="142" r="8" className="fill-merino-50" />
        <circle cx="124" cy="111" r="8" className="fill-merino-50" />
        <circle cx="60" cy="111" r="8" className="fill-merino-50" />
        <circle cx="60" cy="80" r="8" className="fill-merino-50" />a
        <circle cx="92" cy="111" r="8" className="fill-merino-50" />
      </symbol>

      <symbol id="grow" viewBox="0 0 246 337">
        <g filter="url(#dropShadow)">
          <rect
            width="172"
            height="223"
            x="37"
            y="57"
            className="fill-merino-50"
            rx="16"
          />
        </g>
        <circle cx="60" cy="80" r="8" className="fill-merino-950" />
        <circle cx="180" cy="80" r="8" className="fill-red-500" />
        <circle cx="60" cy="256" r="8" className="fill-neutral-300" />
        <circle cx="92" cy="256" r="8" className="fill-neutral-300" />
        <circle cx="124" cy="256" r="8" className="fill-neutral-300" />
      </symbol>

      <symbol id="maintain" viewBox="0 0 246 337">
        <g filter="url(#dropShadow)">
          <path className="fill-merino-50" d="M37 57h172v222H37z" />
        </g>
        <path className="fill-neutral-950" d="M42 189h162v84H42z" />
        <circle cx="93" cy="80" r="8" className="fill-merino-950" />
        <circle cx="180" cy="80" r="8" className="fill-merino-950" />
        <circle cx="149" cy="80" r="8" className="fill-merino-950" />
        <circle cx="124" cy="216" r="8" className="fill-neutral-900" />
        <circle cx="60" cy="216" r="8" className="fill-neutral-900" />
        <circle cx="60" cy="247" r="8" className="fill-neutral-900" />
        <circle cx="60" cy="80" r="8" className="fill-merino-950" />
        <circle cx="92" cy="216" r="8" className="fill-neutral-900" />
        <circle cx="92" cy="247" r="8" className="fill-neutral-900" />
      </symbol>
    </svg>
  );
};

export default ServiceSprite;
