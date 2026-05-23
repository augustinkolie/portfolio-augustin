import React from 'react';

const ClipPaths = () => {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        {/* Professional Parabolic Curve (Concave Bottom) */}
        <clipPath id="parabolic-curve" clipPathUnits="objectBoundingBox">
          <path d="M0,0 H1 V0.9 C0.7,1 0.3,1 0,0.9 V0 Z" />
        </clipPath>

        <clipPath id="parabolic-left" clipPathUnits="objectBoundingBox">
          <path d="M0.25,0 H1 V1 H0 L0.25,0.55 V0 Z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ClipPaths;
