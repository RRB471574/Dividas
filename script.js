<!doctype html>
<html>
 <head></head> 
 <body> 
  <h1> Hello </h1> 
  <div>
    This is a html example from Dcoder, 
   <br> have fun. :) 
  </div> 
 
<script type="text/javascript" id="dcoder_script">document.getElementById('debt-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const creditor = document.getElementById('creditor').value;
    const amount = document.getElementById('amount').value;
    const dueDate = document.getElementById('due-date').value;
    
    addDebt(creditor, amount, dueDate);
    
    this.reset();
});

function addDebt(creditor, amount, dueDate) {
    const debtList = document.getElementById('debt-list');
    
    const li = document.createElement('li');
    li.textContent = `${creditor} - R$ ${parseFloat(amount).toFixed(2)} - Vence em ${dueDate}`;
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = function() {
        debtList.removeChild(li);
    };
    
    li.appendChild(removeButton);
    debtList.appendChild(li);
}
</script></body></html>