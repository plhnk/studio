const ServiceSprite: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ visibility: "hidden" }}>
      <defs>
        <filter id="dropShadow">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="15"
            floodColor="#000000"
            floodOpacity="0.16"
          />
        </filter>
      </defs>
      <symbol id="advise" viewBox="0 0 246 337">
        <g filter="url(#dropShadow)">
          <path fill="#fff" d="M37 57h172v223H37z" />
        </g>
        <circle cx="16.5" cy="87.5" r="7.5" fill="#000" />
        <circle cx="173.5" cy="26.5" r="7.5" fill="#000" />
        <circle cx="148.5" cy="316.5" r="7.5" fill="#000" />
        <circle cx="226.5" cy="184.5" r="7.5" fill="#000" />
        <circle cx="24.5" cy="295.5" r="7.5" fill="#000" />
        <circle cx="31.5" cy="11.5" r="7.5" fill="#000" />
        <circle cx="215.5" cy="269.5" r="7.5" fill="#000" />
      </symbol>

      <symbol id="design" viewBox="0 0 246 337">
        <g filter="url(#dropShadow)">
          <path fill="#fff" d="M37 57h172v223H37z" />
        </g>
        <circle cx="93.5" cy="80.5" r="7.5" fill="#000" />
        <circle cx="180.5" cy="80.5" r="7.5" fill="#000" />
        <circle cx="65.5" cy="168.5" r="7.5" fill="#000" />
        <circle cx="180.5" cy="256.5" r="7.5" fill="#000" />
        <circle cx="118.5" cy="256.5" r="7.5" fill="#000" />
        <circle cx="65.5" cy="80.5" r="7.5" fill="#000" />
        <circle cx="149.5" cy="256.5" r="7.5" fill="#000" />
      </symbol>

      <symbol id="develop" viewBox="0 0 246 337">
        <g filter="url(#dropShadow)">
          <path fill="#000" d="M37 57h172v223H37z" />
        </g>
        <circle cx="96.5" cy="80.5" r="7.5" fill="#fff" />
        <circle cx="65.5" cy="173.5" r="7.5" fill="#fff" />
        <circle cx="65.5" cy="142.5" r="7.5" fill="#fff" />
        <circle cx="127.5" cy="111.5" r="7.5" fill="#fff" />
        <circle cx="65.5" cy="111.5" r="7.5" fill="#fff" />
        <circle cx="65.5" cy="80.5" r="7.5" fill="#fff" />
        <circle cx="96.5" cy="111.5" r="7.5" fill="#fff" />
      </symbol>

      <symbol id="grow" viewBox="0 0 246 337">
        <g filter="url(#dropShadow)">
          <rect width="172" height="223" x="37" y="57" fill="#fff" rx="16" />
        </g>
        <circle cx="180.5" cy="80.5" r="7.5" fill="red" />
        <circle cx="127.5" cy="256.5" r="7.5" fill="#000" fillOpacity=".4" />
        <circle cx="65.5" cy="256.5" r="7.5" fill="#000" fillOpacity=".4" />
        <circle cx="65.5" cy="80.5" r="7.5" fill="#000" />
        <circle cx="96.5" cy="256.5" r="7.5" fill="#000" fillOpacity=".4" />
      </symbol>

      <symbol id="maintain" viewBox="0 0 246 337">
        <g filter="url(#dropShadow)">
          <path fill="#fff" d="M37 57h172v222H37z" />
        </g>
        <path fill="#000" d="M42 189h162v84H42z" />
        <circle cx="93.5" cy="80.5" r="7.5" fill="#000" />
        <circle cx="180.5" cy="80.5" r="7.5" fill="#000" />
        <circle cx="149.5" cy="80.5" r="7.5" fill="#000" />
        <circle cx="127.5" cy="216.5" r="7.5" fill="#fff" opacity=".2" />
        <circle cx="65.5" cy="216.5" r="7.5" fill="#fff" opacity=".2" />
        <circle cx="65.5" cy="247.5" r="7.5" fill="#fff" opacity=".2" />
        <circle cx="65.5" cy="80.5" r="7.5" fill="#000" />
        <circle cx="96.5" cy="216.5" r="7.5" fill="#fff" opacity=".2" />
        <circle cx="96.5" cy="247.5" r="7.5" fill="#fff" opacity=".2" />
      </symbol>
    </svg>
  );
};

export default ServiceSprite;
