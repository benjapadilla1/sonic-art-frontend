'use client';

import Script from 'next/script';

const Calendar = () => {
  return (
    <>
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/sonicartacademy/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=fffff7&primary_color=ee8b1a"
        style={{ minWidth: '800px', height: '600px' }}
      />
      <Script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      />
    </>
  );
};

export default Calendar;
