// Mock de productos (adaptado de tu diseño en Figma/React)
let productos = [
  { id:'1', name:'Jabón Lavavajillas Concentrado', code:'JL-001', category:'detergentes', unitOfMeasure:'litro', price:15000, stock:45, minStock:20, status:'active' },
  { id:'2', name:'Jabón Textil Líquido',         code:'JT-002', category:'detergentes', unitOfMeasure:'galon', price:35000, stock:8,  minStock:15, status:'active' },
  { id:'3', name:'Desengrasante Industrial',     code:'DI-003', category:'limpiadores',  unitOfMeasure:'litro', price:25000, stock:0,  minStock:10, status:'active' },
  { id:'4', name:'Cloro Blanqueador',            code:'CB-004', category:'desinfectantes', unitOfMeasure:'galon', price:18000, stock:22, minStock:12, status:'active' },
  { id:'5', name:'Limpiavidrios Multiusos',      code:'LV-005', category:'limpiadores',  unitOfMeasure:'litro', price:12000, stock:5,  minStock:20, status:'active' },
  { id:'6', name:'Ambientador Floral',           code:'AF-006', category:'aromatizantes', unitOfMeasure:'ml',   price:8000,  stock:35, minStock:25, status:'active' },
  { id:'7', name:'Cera para Pisos',              code:'CP-007', category:'ceras',        unitOfMeasure:'litro', price:22000, stock:12, minStock:8,  status:'inactive' },
  { id:'8', name:'Detergente Polvo Industrial',  code:'DPI-008',category:'detergentes',  unitOfMeasure:'kg',    price:45000, stock:18, minStock:10, status:'active' },
  { id:'9', name:'Removedor de Sarro',           code:'RS-009', category:'especializados', unitOfMeasure:'litro', price:28000, stock:3, minStock:8, status:'active' },
];

const $ = (s) => document.querySelector(s);

const refs = {
  filtroTexto:     $('#filtroTexto'),
  filtroCategoria: $('#filtroCategoria'),
  filtroEstado:    $('#filtroEstado'),
  tbody:           $('#tbodyProductos'),
  resumen:         $('#resumenTabla'),
  statTotal:       $('#statTotal'),
  statActivos:     $('#statActivos'),
  statBajo:        $('#statBajo'),
  statCero:        $('#statCero'),
  btnNuevo:        $('#btnNuevo'),

  dlg:             $('#dlgProducto'),
  frm:             $('#frmProducto'),
  dlgTitulo:       $('#dlgTitulo'),
  btnCerrarDlg:    $('#btnCerrarDlg'),
};

let editId = null;

function renderStats() {
  const total = productos.length;
  const activos = productos.filter(p => p.status === 'active').length;
  const bajo = productos.filter(p => p.stock <= p.minStock).length;
  const cero = productos.filter(p => p.stock === 0).length;

  refs.statTotal.textContent = total;
  refs.statActivos.textContent = activos;
  refs.statBajo.textContent = bajo;
  refs.statCero.textContent = cero;
}

function renderTabla() {
  const q = refs.filtroTexto.value.trim().toLowerCase();
  const cat = refs.filtroCategoria.value;
  const est = refs.filtroEstado.value;

  const fil = productos.filter(p => {
    const s = (p.name + ' ' + p.code).toLowerCase().includes(q);
    const c = (cat === 'all') || p.category === cat;
    const e = (est === 'all') || p.status === est;
    return s && c && e;
  });

  refs.resumen.textContent = `Mostrando ${fil.length} de ${productos.length} productos`;

  refs.tbody.innerHTML = fil.map(p => `
    <tr class="border-t border-[var(--border)]">
      <td class="px-4 py-3">${p.code}</td>
      <td class="px-4 py-3">${p.name}</td>
      <td class="px-4 py-3 capitalize">${p.category}</td>
      <td class="px-4 py-3">${p.unitOfMeasure ?? '-'}</td>
      <td class="px-4 py-3">$${p.price.toLocaleString()}</td>
      <td class="px-4 py-3 ${p.stock === 0 ? 'text-rose-600' : (p.stock <= p.minStock ? 'text-[var(--accent)]' : '')}">${p.stock}</td>
      <td class="px-4 py-3">${p.minStock}</td>
      <td class="px-4 py-3">${p.status === 'active' ? 'Activo' : 'Inactivo'}</td>
      <td class="px-4 py-3">
        <div class="flex gap-2">
          <button class="px-3 py-1 rounded-lg border border-[var(--border)] hover:bg-slate-50" data-editar="${p.id}">Editar</button>
          <button class="px-3 py-1 rounded-lg border border-[var(--border)] hover:bg-slate-50" data-eliminar="${p.id}">Eliminar</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openNuevo() {
  editId = null;
  refs.dlgTitulo.textContent = 'Nuevo producto';
  refs.frm.reset();
  refs.dlg.showModal();
}
function openEditar(id) {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  editId = id;
  refs.dlgTitulo.textContent = 'Editar producto';
  for (const [k,v] of Object.entries(p)) {
    const el = refs.frm.elements.namedItem(k);
    if (el) el.value = v;
  }
  refs.dlg.showModal();
}
function guardar(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(refs.frm).entries());
  // normalizar numéricos
  data.price = Number(data.price || 0);
  data.stock = Number(data.stock || 0);
  data.minStock = Number(data.minStock || 0);

  if (editId) {
    productos = productos.map(p => p.id === editId ? {...p, ...data} : p);
  } else {
    productos.push({ id: Math.random().toString(36).slice(2,9), ...data });
  }
  refs.dlg.close();
  renderStats();
  renderTabla();
}

function eliminar(id) {
  if (!confirm('¿Eliminar este producto?')) return;
  productos = productos.filter(p => p.id !== id);
  renderStats();
  renderTabla();
}

// Eventos
refs.filtroTexto.addEventListener('input', renderTabla);
refs.filtroCategoria.addEventListener('change', renderTabla);
refs.filtroEstado.addEventListener('change', renderTabla);
refs.btnNuevo.addEventListener('click', openNuevo);
refs.btnCerrarDlg.addEventListener('click', () => refs.dlg.close());
refs.frm.addEventListener('submit', guardar);

refs.tbody.addEventListener('click', (ev) => {
  const btnE = ev.target.closest('[data-editar]');
  const btnD = ev.target.closest('[data-eliminar]');
  if (btnE) openEditar(btnE.dataset.editar);
  if (btnD) eliminar(btnD.dataset.eliminar);
});

// Inicial
renderStats();
renderTabla();
