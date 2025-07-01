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
  
    // Update DOM with new quote
    quoteDisplay.innerHTML = `
      <blockquote>"${quote.text}"</blockquote>
      <p><em>Category: ${quote.category}</em></p>
    `;
  }
  
  // ===== Add New Quote =====
  function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
  
    const newText = textInput.value.trim();
    const newCategory = categoryInput.value.trim();
  
    if (!newText || !newCategory) {
      alert("Please enter both quote text and category.");
      return;
    }
  
    // Add new quote to array
    quotes.push({ text: newText, category: newCategory });
  
    // Clear inputs
    textInput.value = '';
    categoryInput.value = '';
  
    alert("Quote added successfully!");
  
    // Optionally display the new quote
    showRandomQuote();
  }
  
  // ===== Set Up Event Listener =====
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  });