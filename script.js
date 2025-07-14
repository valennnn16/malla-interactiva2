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
  { ciclo: "Cuarto ciclo", ramos: [
    { nombre: "Herramientas Informáticas", codigo: "HI401" },
    { nombre: "Storytelling", codigo: "ST402" },
    { nombre: "Taller de Redacción", codigo: "TR403" },
    { nombre: "Taller de Lenguaje y Técnicas de Diseño", codigo: "TL404" },
    { nombre: "Teoría de la Comunicación", codigo: "TC405" },
    { nombre: "Taller de Edición Digital", codigo: "ED406" },
    { nombre: "Responsabilidad Social", codigo: "RS407" }
  ] },
  { ciclo: "Quinto ciclo", ramos: [
    { nombre: "Semiótica", codigo: "SM501" },
    { nombre: "Taller de Design Thinking e Innovación en Comunicaciones", codigo: "DT502" },
    { nombre: "Diseño y Producción de Narrativas Audiovisuales", codigo: "DN503" },
    { nombre: "Taller de Big Data y Comunicación", codigo: "BD504" },
    { nombre: "Taller de Guión Audiovisual Transmedia", codigo: "GT505" }
  ] },
  { ciclo: "Sexto ciclo", ramos: [
    { nombre: "Empleabilidad", codigo: "EM601" },
    { nombre: "Proyecto Social", codigo: "PS602" },
    { nombre: "Metodología de la Investigación", codigo: "MI603" },
    { nombre: "Taller de Producción Radial Digital", codigo: "RD604" },
    { nombre: "Taller de Fotografía y Estética Audiovisual", codigo: "FA605" }
  ] },
  { ciclo: "Séptimo ciclo", ramos: [
    { nombre: "Legislación y Normativa en Comunicaciones", codigo: "LC701" },
    { nombre: "Gestión de Marketing Digital y Redes Sociales", codigo: "MK702" },
    { nombre: "Diseño de Sonido Digital", codigo: "SD703" },
    { nombre: "Taller de Documental Transmedia", codigo: "DT704" },
    { nombre: "Taller de Dirección y Producción de Informativo", codigo: "DI705" }
  ] },
  { ciclo: "Octavo ciclo", ramos: [
    { nombre: "Prácticas Preprofesionales", codigo: "PP801" },
    { nombre: "Taller de Dirección y Producción de Ficción", codigo: "TF802" },
    { nombre: "Taller de Diseño y Producción de Medios Interactivos", codigo: "MI803" }
  ] },
  { ciclo: "Noveno ciclo", ramos: [
    { nombre: "Tesis", codigo: "TS901" },
    { nombre: "Gestión del Entretenimiento", codigo: "GE902" },
    { nombre: "Taller Transmedial 1", codigo: "TT903" },
    { nombre: "Taller de Dirección y Producción Publicitaria Audiovisual", codigo: "PA904" }
  ] },
  { ciclo: "Décimo ciclo", ramos: [
    { nombre: "Trabajo de Investigación", codigo: "TI1001" },
    { nombre: "Taller Transmedial 2", codigo: "TT1002" },
    { nombre: "Dirección de Proyectos Audiovisuales", codigo: "DP1003" }
  ] }
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
