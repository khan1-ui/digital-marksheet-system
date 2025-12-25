import React from "react";
export default function AppFooter() {
  return (
    <footer
      className="mt-16 border-t bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-white"
    >
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">

        {/* BRAND */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Academic Transcript Generator
          </h3>
          <p className="mt-2 text-gray-600">
            Free & open web-based marksheet and transcript generation system.
          </p>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">
            Support & Contact
          </h4>
          <p>📞 +8801758676463,+8801609362463</p>
          <p>✉️ mdsazinur90@gmail.com</p>
          <p>📍Jamalpur, Bangladesh</p>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">
            Connect With Me
          </h4>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/share/1F2iZzhrRe/"
              target="_blank"
              className="hover:text-blue-600"
            >
              Facebook
            </a>
            <a
              href="https://github.com/khan1-ui"
              target="_blank"
              className="hover:text-gray-900"
            >
              GitHub
            </a>
            <a
              href="https://youtube.com/@mdsazinurislamteacher?"
              target="_blank"
              className="hover:text-red-600"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pb-4">
        © {new Date().getFullYear()} Md. Sazinur Islam — All rights reserved.
      </div>
    </footer>
  );
}
