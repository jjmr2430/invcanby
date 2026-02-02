// Mock de pedidos
let pedidos = [
  { id:'p1', numero:'1001', fecha:'2025-01-01', cliente:'Supermercado La 14', estado:'pendiente',   total: 250000 },
  { id:'p2', numero:'1002', fecha:'2025-01-03', cliente:'DistriAseo SAS',       estado:'procesando', total: 89000  },
  { id:'p3', numero:'1003', fecha:'2025-01-06', cliente:'Minimercado San Luis', estado:'completado', total: 152000 },
  { id:'p4', numero:'1004', fecha:'2025-01-08', cliente:'Tienda El Centro',     estado:'anulado',    total: 45000  },
];

const $ = s => document.querySelector(s);

const refs = {
  filtroTexto:  $('#filtroTexto'),
  filtroEstado: $('#filtroEstado'),
  desde:        $('#filtroDesde'),
  hasta:        $('#filtroHasta'),
  tbody:        $('#tbodyPedidos'),
  resumen:      $('#resumenTabla'),

  btnNuevo:     $('#btnNuevoPedido'),
  dlg:          $('#dlgPedido'),
  frm:          $('#frmPedido'),
  titulo:       $('#dlgTitulo'),
  btnCerrarDlg: $('#btnCerrarDlg'),
};

let editId = null;

function estadoBadge(estado){
  const map = {
    pendiente:   'bg-amber-100 text-amber-700',
    procesando:  'bg-sky-100 text-sky-700',
    completado:  'bg-emerald-100 text-emerald-700',
    anulado:     'bg-rose-100 text-rose-700',
  };
  return `<span class="inline-flex items-center rounded-full px-2 py-1 text-sm font-semibold ${map[estado]||'bg-slate-100 text-slate-700'}">${estado}</span>`;
}

function inRange(fecha, d, h){
  if(d && fecha < d) return false;
  if(h && fecha > h) return false;
  return true;
}

function renderTabla(){
  const q = refs.filtroTexto.value.trim().toLowerCase();
  const est = refs.filtroEstado.value;
  const d = refs.desde.value || null;
  const h = refs.hasta.value || null;

  const fil = pedidos.filter(p=>{
    const s = (p.numero + ' ' + p.cliente).toLowerCase().includes(q);
    const e = (est==='all') || p.estado===est;
    const r = inRange(p.fecha, d, h);
    return s && e && r;
  });

  refs.resumen.textContent = `Mostrando ${fil.length} de ${pedidos.length} pedidos`;

  refs.tbody.innerHTML = fil.map(p => `
    <tr class="border-t border-[var(--border)]">
      <td class="px-4 py-3">${p.numero}</td>
      <td class="px-4 py-3">${p.fecha}</td>
      <td class="px-4 py-3">${p.cliente}</td>
      <td class="px-4 py-3">${estadoBadge(p.estado)}</td>
      <td class="px-4 py-3">$${p.total.toLocaleString()}</td>
      <td class="px-4 py-3">
        <div class="flex gap-2">
          <button class="px-3 py-1 rounded-lg border border-[var(--border)] hover:bg-slate-50" data-editar="${p.id}">Editar</button>
          <button class="px-3 py-1 rounded-lg border border-[var(--border)] hover:bg-slate-50" data-eliminar="${p.id}">Eliminar</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openNuevo(){
  editId = null;
  refs.titulo.textContent = 'Nuevo pedido';
  refs.frm.reset();
  // valor por defecto: hoy
  refs.frm.elements.fecha.value = new Date().toISOString().slice(0,10);
  refs.dlg.showModal();
}

function openEditar(id){
  const p = pedidos.find(x => x.id===id);
  if(!p) return;
  editId = id;
  refs.titulo.textContent = 'Editar pedido';
  refs.frm.elements.numero.value = p.numero;
  refs.frm.elements.fecha.value  = p.fecha;
  refs.frm.elements.cliente.value= p.cliente;
  refs.frm.elements.estado.value = p.estado;
  refs.frm.elements.total.value  = p.total;
  refs.dlg.showModal();
}

function guardar(e){
  e.preventDefault();
  const f = refs.frm.elements;
  const data = {
    numero:  f.numero.value.trim(),
    fecha:   f.fecha.value,
    cliente: f.cliente.value.trim(),
    estado:  f.estado.value,
    total:   Number(f.total.value||0)
  };
  if(editId){
    pedidos = pedidos.map(p=> p.id===editId ? {...p, ...data} : p);
  }else{
    pedidos.push({ id: Math.random().toString(36).slice(2,9), ...data });
  }
  refs.dlg.close();
  renderTabla();
}

function eliminar(id){
  if(!confirm('¿Eliminar este pedido?')) return;
  pedidos = pedidos.filter(p=> p.id!==id);
  renderTabla();
}

// Eventos
refs.filtroTexto.addEventListener('input', renderTabla);
refs.filtroEstado.addEventListener('change', renderTabla);
refs.desde.addEventListener('change', renderTabla);
refs.hasta.addEventListener('change', renderTabla);
refs.btnNuevo.addEventListener('click', openNuevo);
refs.btnCerrarDlg.addEventListener('click', ()=> refs.dlg.close());
refs.frm.addEventListener('submit', guardar);

refs.tbody.addEventListener('click', (ev)=>{
  const eBtn = ev.target.closest('[data-editar]');
  const dBtn = ev.target.closest('[data-eliminar]');
  if(eBtn) openEditar(eBtn.dataset.editar);
  if(dBtn) eliminar(dBtn.dataset.eliminar);
});

// Init
renderTabla();
