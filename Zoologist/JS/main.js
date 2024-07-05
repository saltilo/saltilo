document.addEventListener("DOMContentLoaded", () => {
  const testForm = document.getElementById("testForm");
  const criteriaForm = document.getElementById("criteriaForm");
  const resultsSection = document.getElementById("results");
  const perfumeResult = document.getElementById("perfumeResult");
  const criteriaSection = document.getElementById("criteria");
  const testSection = document.getElementById("test");
  const criteriaBtn = document.getElementById("criteriaBtn");
  const testBtn = document.getElementById("testBtn");
  const optionsSection = document.getElementById("options");
  const retakeTestBtn = document.getElementById("retakeTestBtn");

  if (retakeTestBtn) {
    retakeTestBtn.remove();
  }

  const retakeButton = document.createElement("button");
  retakeButton.id = "retakeTestBtn";
  retakeButton.className = "hidden";
  retakeButton.innerText = "Pick another fragrance";
  resultsSection.appendChild(retakeButton);

  criteriaBtn.addEventListener("click", () => {
    optionsSection.classList.add("hidden");
    criteriaSection.classList.remove("hidden");
    resultsSection.classList.add("hidden");
  });

  testBtn.addEventListener("click", () => {
    optionsSection.classList.add("hidden");
    testSection.classList.remove("hidden");
    resultsSection.classList.add("hidden");
    showQuestion(1);
  });

  async function fetchPerfumes() {
    const response = await fetch("updated_all_perfumes.json");
    const perfumes = await response.json();
    return perfumes;
  }

  function combineCriteria(selectedValues) {
    const combinedCriteria = {
      floral: ["floral", "green", "herbal"],
      woody: ["woody", "earthy"],
      freshScent: ["fresh", "citrus", "marine"],
      relaxed: ["relaxed", "calm"],
      cheerful: ["cheerful", "playful", "carefree"],
      mysterious: ["mysterious", "meditative", "melancholic"],
      sophisticated: ["sophisticated", "cozy", "comforting"],
      intenseMood: ["intenseMood", "bold", "exotic"],
      friendly: ["friendly", "easygoing"],
      confident: ["confident", "assertive"],
      imaginative: ["imaginative", "independent"],
      fruitJuice: ["fruitJuice", "apple juice", "fruit punch"],
      special: ["special", "formal", "night out", "evening"],
      outdoor: ["outdoor", "casual", "daytime"],
      indoor: ["indoor", "casual", "evening"],
      everyday: ["everyday", "casual"],
    };

    let combinedValues = [];
    selectedValues.forEach((value) => {
      if (combinedCriteria[value]) {
        combinedValues = combinedValues.concat(combinedCriteria[value]);
      } else {
        combinedValues.push(value);
      }
    });

    return [...new Set(combinedValues)];
  }

  function findBestMatch(perfumes, selectedValues) {
    let bestMatch = null;
    let highestMatchCount = 0;

    perfumes.forEach((perfume) => {
      let matchCount = 0;
      const criteria = Object.values(perfume.criteria).flat();

      selectedValues.forEach((value) => {
        if (criteria.includes(value)) {
          matchCount++;
        }
      });

      if (matchCount > highestMatchCount) {
        highestMatchCount = matchCount;
        bestMatch = perfume;
      }
    });

    return bestMatch;
  }

  function showQuestion(questionNumber) {
    const questions = testForm.querySelectorAll(".question");
    questions.forEach((question) => {
      question.classList.add("hidden");
    });
    const currentQuestionEl = testForm.querySelector(
      `[data-question="${questionNumber}"]`
    );
    if (currentQuestionEl) {
      currentQuestionEl.classList.remove("hidden");
    } else {
      console.error(
        `Question element with data-question="${questionNumber}" not found`
      );
    }
  }

  function goToNextQuestion() {
    const currentQuestionEl = testForm.querySelector(".question:not(.hidden)");
    if (!currentQuestionEl) return;

    const currentQuestionNumber = parseInt(currentQuestionEl.dataset.question);
    const nextQuestionNumber = currentQuestionNumber + 1;

    showQuestion(nextQuestionNumber);
  }

  testForm.addEventListener("click", (e) => {
    if (e.target.classList.contains("next-btn")) {
      goToNextQuestion();
    }
  });

  testForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(testForm);
    let selectedValues = [];

    for (let value of formData.values()) {
      selectedValues.push(value);
    }

    selectedValues = combineCriteria(selectedValues);

    const perfumes = await fetchPerfumes();
    const bestMatch = findBestMatch(perfumes, selectedValues);

    resultsSection.classList.remove("hidden");
    perfumeResult.innerHTML = `
      <h3>${bestMatch.title}</h3>
      <p>${bestMatch.description}</p>
    `;

    const submitButton = testForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.classList.add("hidden");
    }

    retakeButton.classList.remove("hidden");
  });

  criteriaForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(criteriaForm);
    let selectedValues = [];

    for (let value of formData.values()) {
      selectedValues.push(value);
    }

    selectedValues = combineCriteria(selectedValues);

    const perfumes = await fetchPerfumes();
    const bestMatch = findBestMatch(perfumes, selectedValues);

    resultsSection.classList.remove("hidden");
    perfumeResult.innerHTML = `
      <h3>${bestMatch.title}</h3>
      <p>${bestMatch.description}</p>
    `;

    criteriaSection.classList.add("hidden");
    const submitButton = criteriaForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.classList.add("hidden");
    }

    retakeButton.classList.remove("hidden");
  });

  retakeButton.addEventListener("click", () => {
    location.reload();
  });

  // New code to disable the Next button until a radio option is selected
  const questions = testForm.querySelectorAll(".question");
  questions.forEach((question) => {
    const radioButtons = question.querySelectorAll('input[type="radio"]');
    const nextButton = question.querySelector(".next-btn");

    radioButtons.forEach((radioButton) => {
      radioButton.addEventListener("change", () => {
        if (question.querySelector('input[type="radio"]:checked')) {
          nextButton.disabled = false;
        }
      });
    });

    // Initially disable the Next button
    nextButton.disabled = true;
  });
});
