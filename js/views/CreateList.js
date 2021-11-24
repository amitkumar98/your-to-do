const CreateList = {
  render: () => {
    return `
          <div class="title">Your to-do</div>
          <div class="side-logo-wrapper">
          <img class="side-logo" src="./assets/your_to-Do_logo.png" alt="logo">
          </div>
          <div class="create-id-container">
              <div class="create-new-list" >
                  <label>Enter new id for your list : </label>&nbsp;
                  <input class="id-input" type="text" id="id-input" required>
              </div>
              <span class="id-empty-warning"></span>
              <a class="create-button"><div>Create</div></a>
          </div>
        `;
  },
};

export default CreateList;
