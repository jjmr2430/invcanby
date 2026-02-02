export function renderHeaderTailwind({ titulo, subtitulo }) {
  return `
  <header class="bg-white border-b border-[var(--border)]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="../assets/logo.jpg" alt="Canby" class="w-20 h-auto object-contain" />
          <div>
            <h1 class="text-xl md:text-2xl font-bold text-slate-900">${titulo}</h1>
            <p class="text-slate-500 -mt-0.5">${subtitulo}</p>
          </div>
        </div>
        <button class="p-2 rounded-lg border border-[var(--border)] bg-white hover:bg-slate-50" aria-label="Configuración">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.89 3.31.877 2.421 2.42a1.724 1.724 0 001.066 2.574c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.89 1.543-.877 3.31-2.42 2.421a1.724 1.724 0 00-2.574 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.89-3.31-.877-2.421-2.42a1.724 1.724 0 00-1.066-2.574c-1.756-.426-1.756-2.924 0-3.35.506-.123.93-.47 1.066-1.066.89-1.543 2.878-2.055 4.42-1.166.49.283 1.08.283 1.57 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>
  </header>`;
}
