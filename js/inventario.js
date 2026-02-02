const MOVS = [
  { fecha:'2025-01-12', producto:'Cloro Líquido 5.25%', tipo:'Salida', cantidad:-50,  anterior:115.8, nuevo:65.8, motivo:'Venta institucional - hospitales', usuario:'Luis Rodríguez' },
  { fecha:'2025-01-11', producto:'Jabón Lava Loza Concentrado', tipo:'Salida', cantidad:-30,  anterior:75.5,  nuevo:45.5, motivo:'Venta cliente mayorista', usuario:'María García' },
  { fecha:'2025-01-10', producto:'Desengrasante Multiusos',    tipo:'Salida', cantidad:-15,  anterior:23.2,  nuevo:8.2,  motivo:'Venta distribuidora', usuario:'Carlos López' },
  { fecha:'2025-01-09', producto:'Jabón Lava Loza Concentrado', tipo:'Entrada',cantidad: 50,  anterior:25.5,  nuevo:75.5, motivo:'Producción propia - lote enero', usuario:'Juan Pérez' },
  { fecha:'2025-01-07', producto:'Cloro Líquido 5.25%',        tipo:'Entrada',cantidad: 100, anterior:15.8,  nuevo:115.8,motivo:'Producción propia', usuario:'Ana Martínez' },
];

const $tb = document.querySelector('#tablaMov tbody');
const $res = document.getElementById('tablaResumen');

function pintaFilas(rows){
  $tb.innerHTML = rows.map(r => `
    <tr class="border-t border-[var(--border)]">
      <td class="px-4 py-3 whitespace-nowrap">${formatoFecha(r.fecha)}</td>
      <td class="px-4 py-3">${r.producto}</td>
      <td class="px-4 py-3">
        <span class="inline-flex px-2 py-0.5 rounded-full text-sm font-semibold ${colorTipo(r.tipo)}">${r.tipo}</span>
      </td>
      <td class="px-4 py-3 ${r.cantidad<0?'text-rose-600':'text-emerald-600'} font-semibold">${r.cantidad<0? r.cantidad: '+'+r.cantidad}</td>
      <td class="px-4 py-3">${r.anterior}</td>
      <td class="px-4 py-3 font-semibold">${r.nuevo}</td>
      <td class="px-4 py-3">${r.motivo}</td>
      <td class="px-4 py-3">${r.usuario}</td>
    </tr>
  `).join('');
  $res.textContent = `Mostrando ${rows.length} de ${MOVS.length} movimientos`;
}
function colorTipo(t){
  if(t==='Entrada') return 'bg-emerald-100 text-emerald-700';
  if(t==='Salida')  return 'bg-rose-100 text-rose-700';
  return 'bg-amber-100 text-amber-700';
}
function formatoFecha(iso){
  const [y,m,d]=iso.split('-');
  return `${+d}/${+m}/${y}`;
}

const $fTxt   = document.getElementById('filtroTexto');
const $fTipo  = document.getElementById('filtroTipo');
const $fDesde = document.getElementById('filtroDesde');
const $fHasta = document.getElementById('filtroHasta');

function aplicaFiltros(){
  const t = ($fTxt.value||'').toLowerCase();
  const tipo = $fTipo.value;
  const d = $fDesde.value || '0000-01-01';
  const h = $fHasta.value || '9999-12-31';
  const out = MOVS.filter(r =>
    (r.producto.toLowerCase().includes(t) || r.motivo.toLowerCase().includes(t)) &&
    (!tipo || r.tipo===tipo) &&
    (r.fecha >= d && r.fecha <= h)
  );
  pintaFilas(out);
}
[$fTxt,$fTipo,$fDesde,$fHasta].forEach(el => el.addEventListener('input', aplicaFiltros));

document.getElementById('btnExport').addEventListener('click', ()=>{
  const headers = ['Fecha','Producto','Tipo','Cantidad','Stock Anterior','Stock Nuevo','Motivo','Usuario'];
  const rows = [...$tb.querySelectorAll('tr')].map(tr => [...tr.children].map(td => td.innerText));
  const csv = [headers, ...rows].map(r => r.map(esc).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'movimientos_canby.csv';
  a.click();
});
function esc(s){ return `"${String(s).replaceAll('"','""')}"`; }

pintaFilas(MOVS);
