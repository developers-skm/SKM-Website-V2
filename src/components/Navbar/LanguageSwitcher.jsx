import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

// Site language switcher, backed by the Google Website Translator (the same
// engine the previous skmegg.com used). The widget itself is mounted once,
// hidden, and driven from this custom list so it matches the new design.
// Page content is translated client-side by Google; the source language is English.

const LANGUAGES = [
  ['af', 'Afrikaans'], ['sq', 'Albanian'], ['am', 'Amharic'], ['ar', 'Arabic'], ['hy', 'Armenian'],
  ['as', 'Assamese'], ['ay', 'Aymara'], ['az', 'Azerbaijani'], ['bm', 'Bambara'], ['eu', 'Basque'],
  ['be', 'Belarusian'], ['bn', 'Bengali'], ['bho', 'Bhojpuri'], ['bs', 'Bosnian'], ['bg', 'Bulgarian'],
  ['ca', 'Catalan'], ['ceb', 'Cebuano'], ['ny', 'Chichewa'], ['zh-CN', 'Chinese (Simplified)'],
  ['zh-TW', 'Chinese (Traditional)'], ['co', 'Corsican'], ['hr', 'Croatian'], ['cs', 'Czech'],
  ['da', 'Danish'], ['dv', 'Dhivehi'], ['doi', 'Dogri'], ['nl', 'Dutch'], ['en', 'English'],
  ['eo', 'Esperanto'], ['et', 'Estonian'], ['ee', 'Ewe'], ['tl', 'Filipino'], ['fi', 'Finnish'],
  ['fr', 'French'], ['fy', 'Frisian'], ['gl', 'Galician'], ['ka', 'Georgian'], ['de', 'German'],
  ['el', 'Greek'], ['gn', 'Guarani'], ['gu', 'Gujarati'], ['ht', 'Haitian Creole'], ['ha', 'Hausa'],
  ['haw', 'Hawaiian'], ['iw', 'Hebrew'], ['hi', 'Hindi'], ['hmn', 'Hmong'], ['hu', 'Hungarian'],
  ['is', 'Icelandic'], ['ig', 'Igbo'], ['ilo', 'Ilocano'], ['id', 'Indonesian'], ['ga', 'Irish'],
  ['it', 'Italian'], ['ja', 'Japanese'], ['jw', 'Javanese'], ['kn', 'Kannada'], ['kk', 'Kazakh'],
  ['km', 'Khmer'], ['rw', 'Kinyarwanda'], ['gom', 'Konkani'], ['ko', 'Korean'], ['kri', 'Krio'],
  ['ku', 'Kurdish (Kurmanji)'], ['ckb', 'Kurdish (Sorani)'], ['ky', 'Kyrgyz'], ['lo', 'Lao'],
  ['la', 'Latin'], ['lv', 'Latvian'], ['ln', 'Lingala'], ['lt', 'Lithuanian'], ['lg', 'Luganda'],
  ['lb', 'Luxembourgish'], ['mk', 'Macedonian'], ['mai', 'Maithili'], ['mg', 'Malagasy'],
  ['ms', 'Malay'], ['ml', 'Malayalam'], ['mt', 'Maltese'], ['mi', 'Maori'], ['mr', 'Marathi'],
  ['mni-Mtei', 'Meiteilon (Manipuri)'], ['lus', 'Mizo'], ['mn', 'Mongolian'], ['my', 'Myanmar (Burmese)'],
  ['ne', 'Nepali'], ['no', 'Norwegian'], ['or', 'Odia (Oriya)'], ['om', 'Oromo'], ['ps', 'Pashto'],
  ['fa', 'Persian'], ['pl', 'Polish'], ['pt', 'Portuguese'], ['pa', 'Punjabi'], ['qu', 'Quechua'],
  ['ro', 'Romanian'], ['ru', 'Russian'], ['sm', 'Samoan'], ['sa', 'Sanskrit'], ['gd', 'Scots Gaelic'],
  ['nso', 'Sepedi'], ['sr', 'Serbian'], ['st', 'Sesotho'], ['sn', 'Shona'], ['sd', 'Sindhi'],
  ['si', 'Sinhala'], ['sk', 'Slovak'], ['sl', 'Slovenian'], ['so', 'Somali'], ['es', 'Spanish'],
  ['su', 'Sundanese'], ['sw', 'Swahili'], ['sv', 'Swedish'], ['tg', 'Tajik'], ['ta', 'Tamil'],
  ['tt', 'Tatar'], ['te', 'Telugu'], ['th', 'Thai'], ['ti', 'Tigrinya'], ['ts', 'Tsonga'],
  ['tr', 'Turkish'], ['tk', 'Turkmen'], ['ak', 'Twi'], ['uk', 'Ukrainian'], ['ur', 'Urdu'],
  ['ug', 'Uyghur'], ['uz', 'Uzbek'], ['vi', 'Vietnamese'], ['cy', 'Welsh'], ['xh', 'Xhosa'],
  ['yi', 'Yiddish'], ['yo', 'Yoruba'], ['zu', 'Zulu'],
];

// English (the source language) is pinned first so it is always easy to switch back.
const LIST_ORDER = [LANGUAGES.find(([c]) => c === 'en'), ...LANGUAGES.filter(([c]) => c !== 'en')];

const NAME_BY_CODE = Object.fromEntries(LANGUAGES);
const CONTAINER_ID = 'skm-google-translate';

let loaderStarted = false;
function loadTranslateWidget() {
  if (loaderStarted || typeof document === 'undefined') return;
  loaderStarted = true;

  const holder = document.createElement('div');
  holder.id = CONTAINER_ID;
  holder.setAttribute('aria-hidden', 'true');
  holder.style.cssText = 'position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;';
  document.body.appendChild(holder);

  window.skmTranslateInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: LANGUAGES.map(([c]) => c).join(','), autoDisplay: false },
      CONTAINER_ID
    );
  };
  const script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=skmTranslateInit';
  script.async = true;
  document.body.appendChild(script);
}

const readCurrent = () => {
  if (typeof document === 'undefined') return 'en';
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]*\/([^;]+)/);
  return m && NAME_BY_CODE[decodeURIComponent(m[1])] ? decodeURIComponent(m[1]) : 'en';
};

function setTranslateCookie(code) {
  document.cookie = `googtrans=/en/${code}; path=/`;
}

function clearTranslateCookie() {
  const expired = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  document.cookie = expired;
  document.cookie = `${expired}; domain=${window.location.hostname}`;
  document.cookie = `${expired}; domain=.${window.location.hostname}`;
}

export default function LanguageSwitcher({ placement = 'down', textClassName = '' }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(readCurrent);
  const [pos, setPos] = useState({});
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    loadTranslateWidget();
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') { close(); buttonRef.current?.focus(); } };
    const onDown = (e) => {
      if (panelRef.current?.contains(e.target) || buttonRef.current?.contains(e.target)) return;
      close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open, close]);

  const toggle = () => {
    if (!open && buttonRef.current) {
      const r = buttonRef.current.getBoundingClientRect();
      // Panel width mirrors the w-[min(94vw,900px)] class; keep it fully on screen.
      const width = Math.min(window.innerWidth * 0.94, 900);
      const left = Math.min(Math.max(8, r.right - width), window.innerWidth - width - 8);
      setPos(placement === 'up'
        ? { left, bottom: window.innerHeight - r.top + 8, maxHeight: Math.min(520, r.top - 24) }
        : { left, top: r.bottom + 8, maxHeight: Math.min(520, window.innerHeight - r.bottom - 24) });
    }
    setOpen((o) => !o);
  };

  const choose = (code) => {
    close();
    if (code === current) return;
    if (code === 'en') {
      clearTranslateCookie();
      window.location.reload();
      return;
    }
    const combo = document.querySelector('select.goog-te-combo');
    if (combo && [...combo.options].some((o) => o.value === code)) {
      combo.value = code;
      combo.dispatchEvent(new Event('change'));
      setCurrent(code);
      return;
    }
    // Widget not ready yet — set the cookie it reads on load, then reload.
    setTranslateCookie(code);
    window.location.reload();
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 whitespace-nowrap font-body font-medium text-surface-500 hover:text-brand-600 transition-colors duration-150 cursor-pointer rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${textClassName}`}
      >
        <span translate="no">Language · {NAME_BY_CODE[current]}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && createPortal(
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Choose language"
          translate="no"
          data-lenis-prevent
          style={pos}
          className="notranslate fixed z-[3000] w-[min(94vw,900px)] overflow-y-auto overscroll-contain rounded-[12px] border border-surface-200 bg-white p-4 sm:p-5 shadow-[0_16px_60px_rgba(0,0,0,0.16)] custom-scrollbar"
        >
          <ul className="m-0 list-none p-0 columns-2 sm:columns-3 lg:columns-5 gap-x-4">
            {LIST_ORDER.map(([code, name]) => (
              <li key={code} className="break-inside-avoid">
                <button
                  type="button"
                  onClick={() => choose(code)}
                  aria-current={code === current ? 'true' : undefined}
                  className={`w-full text-left px-2 py-1.5 rounded-[6px] font-body text-[13px] leading-snug cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                    code === current
                      ? 'font-bold text-brand-600 bg-brand-600/5'
                      : 'font-medium text-surface-600 hover:text-brand-600 hover:bg-surface-50'
                  }`}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>,
        document.body
      )}
    </>
  );
}

LanguageSwitcher.propTypes = {
  placement: PropTypes.oneOf(['down', 'up']),
  textClassName: PropTypes.string,
};
