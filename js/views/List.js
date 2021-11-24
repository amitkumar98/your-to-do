const List = {
  render: () => {
    return `
          <div class="title">Your to-do</div>
          <span class="list-details"></span>
          <div class="add-list-item" >
              <input class="item-input" type="text" id="item-input" required>
              <a class="add-button"><div>Add item</div></a>
          </div>
          <span class="item-empty-warning"></span>
          <div class="list-wrapper"><ul class="list"></ul></div>
        `;
  },
};

export default List;
