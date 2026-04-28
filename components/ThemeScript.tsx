/**
 * Inlined into <head> to apply the theme class before first paint
 * (FOUC prevention). Reads localStorage, falls back to system pref.
 */
export default function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var r=document.documentElement;if(t==='dark'){r.classList.add('dark');}else{r.classList.remove('dark');}r.style.colorScheme=t;}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
