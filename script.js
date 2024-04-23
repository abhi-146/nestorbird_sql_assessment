document.addEventListener('DOMContentLoaded', function() {
  const baseUrl = 'http://localhost:3000'; // Change this URL to where your backend is hosted

  let currentQuestionId = null; // Variable to store the ID of the current question

  async function fetchQuestion(id) {
      try {
          const response = await axios.get(`${baseUrl}/questions/${id}`);
          const question = response.data;
          displayQuestion(question);
      } catch (error) {
          console.error('Failed to fetch question:', error);
      }
  }

  function displayQuestion(question) {
      const container = document.getElementById('questions-container');
      container.innerHTML = ''; // Clear existing content
      const questionDiv = document.createElement('div');
      questionDiv.className = 'question-item';
      questionDiv.innerHTML = `
          <h3>${question.question_text}</h3>
          <div class="options-container">
              ${question.options.map(option => `
                  <label>
                      <input type="radio" name="question" value="${option.id}">
                      ${option.text}
                  </label>
              `).join('<br>')}
          </div>
          <button id="submit-btn">Submit</button>
      `;
      container.appendChild(questionDiv);

      // Attach event listener to submit button
      const submitBtn = document.getElementById('submit-btn');
      submitBtn.addEventListener('click', handleOptionSubmit);
  }
let response = '';
  async function handleOptionSubmit() {
    

      const selectedOptionId = document.querySelector(`input[name="question"]:checked`).value;
      response += selectedOptionId + "#";
      if (selectedOptionId.includes("submit")) {
        const requestBody = {
          response: response
      };
        try {
          const response = await axios.post(`${baseUrl}/responses`, { requestBody });
          console.log(response);
          document.getElementById('questions-container').innerHTML = "Response stored successfuly";
         
        } catch (error) {
          console.error('Not able to enter response');
         
        }
      }  else {
 // Fetch next question based on selected option
 await fetchQuestion(selectedOptionId);
      }
     
  }

  // Fetch the initial question
  fetchQuestion('FIR');
});
