const cursos = [
  { ciclo: "Primer ciclo", ramos: [
    { nombre: "Desarrollo del Talento" },
    { nombre: "Complementos de Matemática" },
    { nombre: "Ciudadanía Global" },
    { nombre: "Comunicación 1" },
    { nombre: "Taller de Comunicación y Convergencia Digital" },
    { nombre: "Comunicación y Estudios Sociales" }
  ] },
  { ciclo: "Segundo ciclo", ramos: [
    { nombre: "Matemática Básica", requisitos: ["Complementos de Matemática"] },
    { nombre: "Comunicación 2", requisitos: ["Comunicación 1"] },
    { nombre: "Pre Beginner 1" },
    { nombre: "Filosofía y Pensamiento Contemporáneo" },
    { nombre: "Diseño y Arte" },
    { nombre: "Electivo1" }
  ] },
  { ciclo: "Tercer ciclo", ramos: [
    { nombre: "Pre Beginner 2", requisitos: ["Pre Beginner 1"] },
    { nombre: "Metodología Universitaria" },
    { nombre: "Comunicación 3", requisitos: ["Comunicación 2"] },
    { nombre: "Teoría del Conocimiento" },
    { nombre: "Taller de Lenguaje, Técnicas y Narrativas Audiovisuales" },
    { nombre: "Psicología y Comportamiento" }
  ] },
  { ciclo: "Cuarto ciclo", ramos: [
    { nombre: "Herramientas Informáticas" },
    { nombre: "Storytelling" },
    { nombre: "Taller de Redacción" },
    { nombre: "Taller de Lenguaje y Técnicas de Diseño" },
    { nombre: "Teoría de la Comunicación" },
    { nombre: "Taller de Edición Digital" },
    { nombre: "Responsabilidad Social" }
  ] },
  { ciclo: "Quinto ciclo", ramos: [
    { nombre: "Semiótica" },
    { nombre: "Taller de Design Thinking e Innovación en Comunicaciones" },
    { nombre: "Diseño y Producción de Narrativas Audiovisuales" },
    { nombre: "Taller de Big Data y Comunicación" },
    { nombre: "Taller de Guión Audiovisual Transmedia" }
  ] },
  { ciclo: "Sexto ciclo", ramos: [
    { nombre: "Empleabilidad" },
    { nombre: "Proyecto Social" },
    { nombre: "Metodología de la Investigación" },
    { nombre: "Taller de Producción Radial Digital" },
    { nombre: "Taller de Fotografía y Estética Audiovisual" }
  ] },
  { ciclo: "Séptimo ciclo", ramos: [
    { nombre: "Legislación y Normativa en Comunicaciones" },
    { nombre: "Gestión de Marketing Digital y Redes Sociales" },
    { nombre: "Diseño de Sonido Digital" },
    { nombre: "Taller de Documental Transmedia" },
    { nombre: "Taller de Dirección y Producción de Informativo" }
  ] },
  { ciclo: "Octavo ciclo", ramos: [
    { nombre: "Prácticas Preprofesionales" },
    { nombre: "Taller de Dirección y Producción de Ficción" },
    { nombre: "Taller de Diseño y Producción de Medios Interactivos" }
  ] },
  { ciclo: "Noveno ciclo", ramos: [
    { nombre: "Tesis" },
    { nombre: "Gestión del Entretenimiento" },
    { nombre: "Taller Transmedial 1" },
    { nombre: "Taller de Dirección y Producción Publicitaria Audiovisual" }
  ] },
  { ciclo: "Décimo ciclo", ramos: [
    { nombre: "Trabajo de Investigación" },
    { nombre: "Taller Transmedial 2" },
    { nombre: "Dirección de Proyectos Audiovisuales" }
  ] }
];

const aprobados = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";
  contenedor.className = "course-table";

  cursos.forEach(({ ciclo, ramos }) => {
    const divCiclo = document.createElement("div");
    divCiclo.className = "ciclo";
    const titulo = document.createElement("h2");
    titulo.textContent = ciclo;
    divCiclo.appendChild(titulo);

    ramos.forEach(({ nombre, requisitos }) => {
      const div = document.createElement("div");
      div.className = "course";
      div.textContent = nombre;
      div.dataset.nombre = nombre;
      div.onclick = () => aprobarRamo(div, requisitos);
      divCiclo.appendChild(div);
    });

    contenedor.appendChild(divCiclo);
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
