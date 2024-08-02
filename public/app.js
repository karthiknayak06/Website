document.getElementById('registrationForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const teamName = document.getElementById('teamName').value;
  const teamMembers = document.getElementById('teamMembers').value.split(',');
  const gameIDs = document.getElementById('gameIDs').value.split(',');
  const whatsappNumber = document.getElementById('whatsappNumber').value;

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamName, teamMembers, gameIDs, whatsappNumber })
    });

    if (response.ok) {
      alert('Registration successful!');
    } else {
      const error = await response.text();
      alert('Registration failed: ' + error);
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
});
