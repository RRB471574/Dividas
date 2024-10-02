<script type="module">
  // Importar as funções necessárias do Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

  // Configuração do Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyC3TUyXwtc9mD5463fEJd82BLGik9hwHrk",
    authDomain: "dividas1-fed53.firebaseapp.com",
    projectId: "dividas1-fed53",
    storageBucket: "dividas1-fed53.appspot.com",
    messagingSenderId: "350859669404",
    appId: "1:350859669404:web:9b9ba5f6320ec92923a259",
    measurementId: "G-7HGSN6TC3Y"
  };

  // Inicializa o Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app); // Inicializa Firestore

  // Lida com o envio do formulário
  document.getElementById("meuFormulario").addEventListener("submit", async function(event) {
      event.preventDefault(); // Previne o comportamento padrão do formulário

      const formData = new FormData(this);
      const dados = Object.fromEntries(formData); // Converte FormData para um objeto

      try {
          // Adiciona os dados ao Firestore
          const docRef = await addDoc(collection(db, "usuarios"), dados);
          console.log("Documento escrito com ID: ", docRef.id);
          
          // Redireciona para a página de confirmação
          window.location.href = "URL_DE_CONFIRMACAO"; // Substitua pela sua URL de confirmação
      } catch (error) {
          console.error("Erro ao enviar o formulário: ", error);
          alert("Houve um erro ao enviar o formulário. Tente novamente mais tarde.");
      }
  });
</script>
