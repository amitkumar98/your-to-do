const ListItems = (list) => {
  return list
    .slice(0)
    .reverse()
    .map((item, id) => {
      return `
              <li key=${id} class="list-items" id="list-items-${id}">
                  <span class="list-item-text" id="list-item-text-${id}">${item}</span>
                  <div class="list-tools">
                      <img src="./assets/edit.png" alt="Edit" class="edit-icon" >
                      <img src="./assets/trash.png" alt="Delete" class="delete-icon" id="delete-icon-${id}">
                  </div>
              </li>
          `;
    })
    .join("");
};

export default ListItems;
