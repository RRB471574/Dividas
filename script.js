// Supondo que o elemento com o ID "myButton" é adicionado dinamicamente
document.addEventListener('DOMContentLoaded', () => {
  const myButton = document.getElementById('myButton');
  if (myButton) {
    myButton.addEventListener('click', () => {
      // Código para executar quando o botão for clicado
      console.log('Botão clicado!');
    });
  } else {
    console.error('Elemento com ID "myButton" não encontrado.');
  }
});
