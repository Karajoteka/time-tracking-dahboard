let userData;

function initializeInterface() {
  const dailyButton = document.getElementById('daily');
  const weeklyButton = document.getElementById('weekly');
  const monthlyButton = document.getElementById('monthly');

  const menuButtons = [dailyButton, weeklyButton, monthlyButton];
  let currentOption = 'daily';

  function updateData(option) {
    updateSubsections(option);
  }

  menuButtons.forEach(button => {
    button.addEventListener('click', function () {
      if (currentOption !== button.id) {
        currentOption = button.id;
        updateData(currentOption);
      }
    });
  });

  updateData(currentOption);
}

function getPreviousTimeframeText(option) {
  if (option === 'daily') {
    return 'Yesterday';
  } else if (option === 'weekly') {
    return 'Last Week';
  } else if (option === 'monthly') {
    return 'Last Month';
  } else {
    return 'Previous';
  }
}

function updateSubsections(option) {
  const subsections = document.querySelectorAll('.data-containers');

  subsections.forEach(subsection => {
    const title = subsection.querySelector('.title').textContent.toLowerCase();
    const task = userData.find(task => task.title.toLowerCase() === title);

    const currentElement = subsection.querySelector('.current-time');
    const previousElement = subsection.querySelector('.previous-time');

    currentElement.textContent = `${task.timeframes[option].current} hrs`;
    previousElement.textContent = `${getPreviousTimeframeText(option)} - ${task.timeframes[option].previous} hrs`;
  });
}

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    userData = data;
    initializeInterface();
  })
  .catch(error => console.error('Error cargando el archivo JSON', error));








