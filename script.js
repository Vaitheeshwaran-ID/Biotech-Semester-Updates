const exams = [
  { subject: "Molecular Biology and Genetic Engineering Laboratory", date: "2025-12-05" },
  { subject: "Immunology Laboratory", date: "2025-12-03" },
  { subject: "Immunology", date: "2025-12-11" },
  { subject: "Genetic Engineering", date: "2025-12-13" },
  { subject: "Food Processing & Technology", date: "2025-12-16" },
  { subject: "Tissue Engineering", date: "2025-12-18" },
  { subject: "Bioprocess Principles", date: "2025-12-20" },
  { subject: "Mass Transfer Operations", date: "2025-12-23" }
];

const tbody = document.querySelector("#examTable tbody");
const gapBody = document.querySelector("#gapTable tbody");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

function startOfDay(d){
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysBetween(a, b){
  return Math.floor((b - a) / (24 * 60 * 60 * 1000));
}

function formatDate(d){
  return d.toLocaleDateString(undefined,{
    day:'2-digit',
    month:'2-digit',
    year:'numeric',
    weekday:'short'
  });
}

function render(){
  const today = startOfDay(new Date());
  tbody.innerHTML = "";
  gapBody.innerHTML = "";
  let completed = 0;

  exams.forEach((ex) => {
    const examDate = startOfDay(new Date(ex.date));
    const diff = daysBetween(today, examDate);

    let status;
    if(diff < 0){ status = "Completed ✅"; completed++; }
    else if(diff === 0){ status = "Today ⏳"; }
    else if(diff === 1){ status = "1 Day"; }
    else{ status = diff + " Days"; }

    const tr = document.createElement("tr");
    tr.classList.add("hover-glow");
    tr.innerHTML = `
      <td>${ex.subject}</td>
      <td>${formatDate(examDate)}</td>
      <td>${status}</td>
    `;
    tbody.appendChild(tr);
  });

  for(let i=0;i<exams.length-1;i++){
    const d1 = startOfDay(new Date(exams[i].date));
    const d2 = startOfDay(new Date(exams[i+1].date));
    const gap = daysBetween(d1, d2) - 1;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${exams[i].subject}</td>
      <td>${exams[i+1].subject}</td>
      <td>${gap > 0 ? gap + " Days" : "No Gap"}</td>
    `;
    gapBody.appendChild(tr);
  }

  const percent = Math.round((completed / exams.length) * 100);
  progressFill.style.width = percent + "%";
  progressText.textContent = `${percent}% Completed (${completed}/${exams.length})`;
}

render();
