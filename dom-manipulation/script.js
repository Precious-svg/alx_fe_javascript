const quotes = [
    { text: "The best way to get started is to quit talking about it and start working towards it, action speaks louder.", category: "Motivation" },
    { text: "Life is life, it cannot be predicted. Acceptance is teh firts step to making the most of it.", category: "Life" },
    { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", category: "Inspiration" }
  ];

  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
  
    if (quotes.length === 0) {
      quoteDisplay.innerHTML = "<p>No quotes available.</p>";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    quoteDisplay.innerHTML = `
      <blockquote>"${quote.text}"</blockquote>
      <p><em>Category: ${quote.category}</em></p>
    `;
  }
  
  
  function createAddQuoteForm() {
    
    if (document.getElementById('quoteForm')) return;
  
    const formContainer = document.createElement('div');
    formContainer.id = 'formContainer';
  
    const quoteInput = document.createElement('input');
    quoteInput.type = 'text';
    quoteInput.id = 'newQuoteText';
    quoteInput.placeholder = 'Enter a new quote';
  
    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.id = 'newQuoteCategory';
    categoryInput.placeholder = 'Enter quote category';
  
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.addEventListener('click', addQuote);
  
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
  
    document.body.appendChild(formContainer);
  }
  

  function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
  
    if (!textInput || !categoryInput) {
      alert("Form inputs not found.");
      return;
    }
  
    const newText = textInput.value.trim();
    const newCategory = categoryInput.value.trim();
  
    if (!newText || !newCategory) {
      alert("Please enter both quote text and category.");
      return;
    }
  
    quotes.push({ text: newText, category: newCategory });
  
    textInput.value = '';
    categoryInput.value = '';
  
    alert("Quote added successfully!");
    showRandomQuote();
  }
  
  // ===== Initialize on DOMContentLoaded =====
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    createAddQuoteForm(); 
  });

  function exportQuotesToJson() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // ====== Import Quotes from JSON File ======
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes();
          alert('Quotes imported successfully!');
          showRandomQuote();
        } else {
          alert('Invalid file format.');
        }
      } catch (e) {
        alert('Error parsing JSON file.');
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // ====== Load Last Viewed Quote from Session ======
  function loadLastViewedQuote() {
    const lastQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastQuote) {
      const quote = JSON.parse(lastQuote);
      document.getElementById('quoteDisplay').innerHTML = `
        <blockquote>"${quote.text}"</blockquote>
        <p><em>Category: ${quote.category}</em></p>
      `;
    }
  }
  

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('exportBtn').addEventListener('click', exportQuotesToJson);
    document.getElementById('importFile').addEventListener('change', importFromJsonFile);
    createAddQuoteForm();
    loadLastViewedQuote();
  });
  
  