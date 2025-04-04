const sheetURL = 'https://script.google.com/macros/s/AKfycbwdOHvlT-t_jo9o3oLcRtZeAlCJrYSKTerRw6bXJ0Kx1RUdzzsww_uUbHGioNv_4h6thQ/exec';

fetch(sheetURL)
  .then(res => res.json())
  .then(data => {
    const tableBody = document.querySelector("#messageTable tbody");

    data.forEach(entry => {
      const row = document.createElement("tr");

      const name = entry.Name || '—';
      const email = entry.Email || '—';
      const message = entry.Message || '—';

      row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${message}</td>
        <td><a class="reply-link" href="mailto:${email}?subject=Reply to your message&body=Hi ${name},%0D%0A%0D%0A[Your reply here]%0D%0A%0D%0ARegards,%0D%0AKeshav" target="_blank">Reply</a></td>
      `;

      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error loading data:', error);
    const tableBody = document.querySelector("#messageTable tbody");
    tableBody.innerHTML = `<tr><td colspan="4">Failed to load messages. Please check the Google Script URL.</td></tr>`;
  });
