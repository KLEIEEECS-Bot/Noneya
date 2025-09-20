document.addEventListener('DOMContentLoaded', () => {
  // Crypto dropdown functionality
  const dropdown = document.getElementById('cryptoDropdown');
  const priceDiv = document.getElementById('cryptoPrice');
  if (dropdown && priceDiv) {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => {
        // Updated: data is an array of objects with 'name' and 'current_price'
        data.forEach(crypto => {
          const option = document.createElement('option');
          option.value = crypto.name;
          option.textContent = crypto.name;
          dropdown.appendChild(option);
        });
        dropdown.addEventListener('change', () => {
          const selected = dropdown.value;
          const foundCrypto = data.find(item => item.name === selected);
          if (foundCrypto) {
            const formattedPrice = foundCrypto.current_price.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
            priceDiv.textContent = `${foundCrypto.name}: $${formattedPrice}`;
          }
        });
      })
      .catch(error => {
        priceDiv.textContent = 'Failed to load crypto prices.';
        console.error(error);
      });
  }
});
