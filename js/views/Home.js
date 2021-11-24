const HomeComponent = {
  render: () => {
    return `
          <div class="title">Your to-do</div>
          <div class="logo-wrapper">
              <img class="logo" src="./assets/your_to-Do_logo.png" alt="logo">
          </div>
          <a class="create-list-button" href="#/create-list">
              <div>Create new list</div>
          </a>
        `;
  },
};

export default HomeComponent;
