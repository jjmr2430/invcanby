document.getElementById('formLogin')?.addEventListener('submit', (e)=>{
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target).entries());
  const usuario = (data.usuario || '').trim();
  const password = (data.password || '').trim();

  if(!usuario || !password){
    alert('Por favor ingrese usuario y contraseña.');
    return;
  }
  location.href = '../dashboard/index.html';
});
