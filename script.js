// Wait until the page fully loads before running JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const quizForm = document.getElementById("quizForm");
  const resetBtn = document.getElementById("resetBtn");
  const resultsSection = document.getElementById("results");
  const overallResult = document.getElementById("overallResult");
  const questionResults = document.getElementById("questionResults");

  // Handle quiz submission
  quizForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop form from refreshing the page

    let score = 0;
    const totalQuestions = 5;
    let resultsHTML = "";

    // Question 1: fill in the blank
    const q1Input = document.getElementById("q1").value.trim().toLowerCase();
    const q1Correct = "hypertext markup language";

    if (q1Input === q1Correct) {
      score++;
      resultsHTML += `
        <div class="result-item correct">
          <p><strong>Question 1:</strong> Correct</p>
          <p>Your answer: ${document.getElementById("q1").value}</p>
          <p>Correct answer: HyperText Markup Language</p>
          <p>Score: 1/1</p>
        </div>
      `;
    } else {
      resultsHTML += `
        <div class="result-item incorrect">
          <p><strong>Question 1:</strong> Incorrect</p>
          <p>Your answer: ${document.getElementById("q1").value || "No answer"}</p>
          <p>Correct answer: HyperText Markup Language</p>
          <p>Score: 0/1</p>
        </div>
      `;
    }

    // Question 2: multiple choice
    const q2 = document.querySelector('input[name="q2"]:checked');
    if (q2 && q2.value === "b") {
      score++;
      resultsHTML += `
        <div class="result-item correct">
          <p><strong>Question 2:</strong> Correct</p>
          <p>Your answer: &lt;a&gt;</p>
          <p>Correct answer: &lt;a&gt;</p>
          <p>Score: 1/1</p>
        </div>
      `;
    } else {
      resultsHTML += `
        <div class="result-item incorrect">
          <p><strong>Question 2:</strong> Incorrect</p>
          <p>Your answer: ${q2 ? q2.parentElement.textContent.trim() : "No answer"}</p>
          <p>Correct answer: &lt;a&gt;</p>
          <p>Score: 0/1</p>
        </div>
      `;
    }

    // Question 3: multiple choice
    const q3 = document.querySelector('input[name="q3"]:checked');
    if (q3 && q3.value === "c") {
      score++;
      resultsHTML += `
        <div class="result-item correct">
          <p><strong>Question 3:</strong> Correct</p>
          <p>Your answer: &lt;h1&gt;</p>
          <p>Correct answer: &lt;h1&gt;</p>
          <p>Score: 1/1</p>
        </div>
      `;
    } else {
      resultsHTML += `
        <div class="result-item incorrect">
          <p><strong>Question 3:</strong> Incorrect</p>
          <p>Your answer: ${q3 ? q3.parentElement.textContent.trim() : "No answer"}</p>
          <p>Correct answer: &lt;h1&gt;</p>
          <p>Score: 0/1</p>
        </div>
      `;
    }

    // Question 4: multiple choice
    const q4 = document.querySelector('input[name="q4"]:checked');
    if (q4 && q4.value === "c") {
      score++;
      resultsHTML += `
        <div class="result-item correct">
          <p><strong>Question 4:</strong> Correct</p>
          <p>Your answer: HTML</p>
          <p>Correct answer: HTML</p>
          <p>Score: 1/1</p>
        </div>
      `;
    } else {
      resultsHTML += `
        <div class="result-item incorrect">
          <p><strong>Question 4:</strong> Incorrect</p>
          <p>Your answer: ${q4 ? q4.parentElement.textContent.trim() : "No answer"}</p>
          <p>Correct answer: HTML</p>
          <p>Score: 0/1</p>
        </div>
      `;
    }

    // Question 5: multi-selection
    const q5Checked = Array.from(document.querySelectorAll('input[name="q5"]:checked')).map(input => input.value);
    const q5Correct = ["a", "c"];

    const isQ5Correct =
      q5Checked.length === q5Correct.length &&
      q5Correct.every(value => q5Checked.includes(value));

    if (isQ5Correct) {
      score++;
      resultsHTML += `
        <div class="result-item correct">
          <p><strong>Question 5:</strong> Correct</p>
          <p>Your answer: &lt;div&gt;, &lt;table&gt;</p>
          <p>Correct answer: &lt;div&gt;, &lt;table&gt;</p>
          <p>Score: 1/1</p>
        </div>
      `;
    } else {
      let selectedAnswers = q5Checked.length > 0 ? q5Checked.join(", ") : "No answer";
      resultsHTML += `
        <div class="result-item incorrect">
          <p><strong>Question 5:</strong> Incorrect</p>
          <p>Your answer: ${selectedAnswers}</p>
          <p>Correct answer: &lt;div&gt;, &lt;table&gt;</p>
          <p>Score: 0/1</p>
        </div>
      `;
    }

    // Pass/fail calculation
    const percentage = (score / totalQuestions) * 100;
    const passed = percentage >= 70;

    overallResult.innerHTML = `
      <p class="${passed ? "pass-text" : "fail-text"}">
        <strong>${passed ? "Pass" : "Fail"}</strong>
      </p>
      <p><strong>Total Score:</strong> ${score}/${totalQuestions} (${percentage}%)</p>
    `;

    questionResults.innerHTML = resultsHTML;
    resultsSection.style.display = "block";
  });

  // Reset button functionality
  resetBtn.addEventListener("click", function () {
    quizForm.reset();
    resultsSection.style.display = "none";
    overallResult.innerHTML = "";
    questionResults.innerHTML = "";
  });
});
