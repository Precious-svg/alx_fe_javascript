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
    saveQuotes();
  
    textInput.value = '';
    categoryInput.value = '';
  
    alert("Quote added successfully!");
    showRandomQuote();
    populateCategories(); 

    filterQuotes(); 
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

    // this sets the filter dropdown to this quote's category
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
      categoryFilter.value = quote.category || 'all';
    } else {
    filterQuotes(); // To show filtered quote based on saved filter or all
    }
    
  }
  

  
  
  
  function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
  
    // Clear all options except "All Categories"
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
    // Get unique categories from quotes array
    const uniqueCategories = [...new Set(quotes.map(q => q.category))].sort();
  
    // Add categories as options
    uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Restore last selected filter from localStorage if exists
    const savedFilter = localStorage.getItem('lastSelectedCategory');
    if (savedFilter && uniqueCategories.includes(savedFilter)) {
      categoryFilter.value = savedFilter;
    } else {
      categoryFilter.value = 'all';
    }
  }
  
  // ====== Filter quotes based on selected category ======
  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
  
    // Save the selected category to localStorage
    localStorage.setItem('lastSelectedCategory', selectedCategory);
  
    const quoteDisplay = document.getElementById('quoteDisplay');
  
    // Filter quotes accordingly
    let filteredQuotes = [];
    if (selectedCategory === 'all') {
      filteredQuotes = quotes;
    } else {
      filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }
  
    if (filteredQuotes.length === 0) {
      quoteDisplay.innerHTML = "<p>No quotes available in this category.</p>";
      return;
    }
  
    // Show a random quote from filtered list
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
  
    quoteDisplay.innerHTML = `
      <blockquote>"${quote.text}"</blockquote>
      <p><em>Category: ${quote.category}</em></p>
    `;
  
    // Save to session storage the last viewed filtered quote
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
  }


  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('exportBtn').addEventListener('click', exportQuotesToJson);
    document.getElementById('importFile').addEventListener('change', importFromJsonFile);
    document.getElementById('newQuote').addEventListener('click', filterQuotes);
    document.getElementById('exportBtn').addEventListener('click', exportQuotesToJson);
    document.getElementById('importFile').addEventListener('change', importFromJsonFile);

    createAddQuoteForm();
    loadLastViewedQuote();
    populateCategories();
  });