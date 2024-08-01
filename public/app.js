document.getElementById('registrationForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const teamName = document.getElementById('teamName').value;
  const teamMembers = document.getElementById('teamMembers').value.split(',');
  const gameIDs = document.getElementById('gameIDs').value.split(',');
  const whatsappNumber = document.getElementById('whatsappNumber').value;

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamName, teamMembers, gameIDs, whatsappNumber })
    });

    if (response.ok) {
      alert('Registration successful! Proceed to payment.');
      document.getElementById('registrationForm').style.display = 'none';
      document.getElementById('paymentSection').style.display = 'block';
    } else {
      const error = await response.text();
      alert('Registration failed: ' + error);
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

document.getElementById('payButton').addEventListener('click', async () => {
  const amount = document.getElementById('amount').value;
  const source = document.getElementById('cardDetails').value;

  try {
    const response = await fetch('/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, source })
    });

    if (response.ok) {
      alert('Payment successful!');
    } else {
      const error = await response.text();
      alert('Payment failed: ' + error);
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
});
