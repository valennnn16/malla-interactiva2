const cursos = [
  { ciclo: "Primer ciclo", ramos: [
    { nombre: "Desarrollo del Talento", codigo: "CT100" },
    { nombre: "Complementos de Matemática", codigo: "MT101" },
    { nombre: "Ciudadanía Global", codigo: "CS102" },
    { nombre: "Comunicación 1", codigo: "CO103" },
    { nombre: "Taller de Comunicación y Convergencia Digital", codigo: "CO104" },
    { nombre: "Comunicación y Estudios Sociales", codigo: "CS105" }
  ] },
  { ciclo: "Segundo ciclo", ramos: [
    { nombre: "Matemática Básica", codigo: "MT201", requisitos: ["Complementos de Matemática"] },
    { nombre: "Comunicación 2", codigo: "CO202", requisitos: ["Comunicación 1"] },
    { nombre: "Pre Beginner 1", codigo: "IN203" },
    { nombre: "Filosofía y Pensamiento Contemporáneo", codigo: "FL204" },
    { nombre: "Diseño y Arte", codigo: "DA205" },
    { nombre: "Electivo1", codigo: "EL206" }
  ] },
  { ciclo: "Tercer ciclo", ramos: [
    { nombre: "Pre Beginner 2", codigo: "IN301", requisitos: ["Pre Beginner 1"] },
    { nombre: "Metodología Universitaria", codigo: "MU302" },
    { nombre: "Comunicación 3", codigo: "CO303", requisitos: ["Comunicación 2"] },
    { nombre: "Teoría del Conocimiento", codigo: "TC304" },
    { nombre: "Taller de Lenguaje, Técnicas y Narrativas Audiovisuales", codigo: "TN305" },
    { nombre: "Psicología y Comportamiento", codigo: "PC306" }
  ] },
  // puedes continuar el resto si deseas, de la misma forma...
];

const aprobados = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";
  cursos.forEach(({ ciclo, ramos }) => {
    const divCiclo = document.createElement("div");
    divCiclo.className = "ciclo";
    divCiclo.innerHTML = `<h2>${ciclo}</h2><div class="cursos"></div>`;
    contenedor.appendChild(divCiclo);

    ramos.forEach(({ nombre, codigo, requisitos }) => {
      const div = document.createElement("div");
      div.className = "course";
      div.textContent = `${nombre} (${codigo})`;
      div.dataset.nombre = nombre;
      div.dataset.codigo = codigo;
      div.onclick = () => aprobarRamo(div, requisitos);
      divCiclo.querySelector(".cursos").appendChild(div);
    });
  });
  actualizarEstado();
}

function aprobarRamo(div, requisitos = []) {
  const nombre = div.dataset.nombre;
  if (!div.classList.contains("unlocked")) return;
  if (div.classList.contains("completed")) return;
  div.classList.add("completed");
  aprobados.add(nombre);
  actualizarEstado();
}

function actualizarEstado() {
  document.querySelectorAll(".course").forEach(div => {
    const nombre = div.dataset.nombre;
    const curso = cursos.flatMap(c => c.ramos).find(r => r.nombre === nombre);
    const requisitos = curso.requisitos || [];
    const desbloqueado = requisitos.every(req => aprobados.has(req));
    if (desbloqueado) {
      div.classList.add("unlocked");
    }
  });
}

function reiniciarMalla() {
  aprobados.clear();
  document.querySelectorAll(".course").forEach(div => {
    div.classList.remove("completed", "unlocked");
  });
  actualizarEstado();
}

crearMalla();
