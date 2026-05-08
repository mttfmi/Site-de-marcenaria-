// =============================================
//  MARCENARIA DO CARLITO — script.js
// =============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBkogmhooQbQTQx7vroMJh5R4yScBcfPh0",
  authDomain: "marcenaria-carlito.firebaseapp.com",
  projectId: "marcenaria-carlito",
  storageBucket: "marcenaria-carlito.firebasestorage.app",
  messagingSenderId: "985302726446",
  appId: "1:985302726446:web:f0081f2a1cfb73cd20ecbf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- MENU MOBILE ---
window.toggleMenu = function() {
  const nav = document.getElementById('mobileNav');
  nav.classList.toggle('aberto');
}

document.addEventListener('click', function (e) {
  const nav = document.getElementById('mobileNav');
  const btn = document.querySelector('.menu-toggle');
  if (nav && btn && !nav.contains(e.target) && !btn.contains(e.target)) {
    nav.classList.remove('aberto');
  }
});

// --- FORMULÁRIO DE CONTATO (FIREBASE) ---
window.enviarFormulario = async function() {
  const nome     = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const email    = document.getElementById('email').value.trim();
  const servico  = document.getElementById('servico').value;
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !telefone || !mensagem) {
    mostrarFeedback('Por favor, preencha nome, telefone e mensagem.', 'erro');
    return;
  }

  mostrarFeedback('Enviando mensagem...', 'sucesso');

  try {
    await addDoc(collection(db, "orcamentos"), {
      nome: nome,
      telefone: telefone,
      email: email || "Não informado",
      servico: servico || "Não informado",
      mensagem: mensagem,
      data: serverTimestamp()
    });

    // --- CÓDIGO NOVO QUE VOCÊ COLOU ---
    fetch("https://formsubmit.co/ajax/mateusleste5@gmail.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        Assunto: "⚠️ NOVO ORÇAMENTO DO SITE!",
        Nome: nome,
        Telefone: telefone,
        Servico: servico,
        Mensagem: mensagem
      })
    });
    // --- FIM DO CÓDIGO NOVO ---

    mostrarFeedback('Mensagem enviada com sucesso! ✅', 'sucesso');
    limparFormulario();

    mostrarFeedback('Mensagem enviada com sucesso! ✅', 'sucesso');
    limparFormulario();
    
  } catch (erro) {
    console.error("Erro ao salvar no Firebase: ", erro);
    mostrarFeedback('Erro ao enviar. Verifique o console (F12).', 'erro');
  }
}

// --- HELPERS ---
window.mostrarFeedback = function(texto, tipo) {
  const el = document.getElementById('form-feedback');
  if (el) {
    el.textContent = texto;
    el.className = 'form-obs ' + tipo;
    setTimeout(() => {
      el.textContent = '';
      el.className = 'form-obs';
    }, 5000);
  }
}

window.limparFormulario = function() {
  document.getElementById('nome').value = '';
  document.getElementById('telefone').value = '';
  document.getElementById('email').value = '';
  document.getElementById('servico').value = '';
  document.getElementById('mensagem').value = '';
}

// --- ANIMAÇÃO SUAVE AO ROLAR ---
const observar = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visivel');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.card-servico, .galeria-item, .sobre-texto, .contato-form').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observar.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .visivel {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    </style>
  `);
});