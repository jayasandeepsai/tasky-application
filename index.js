// var state ={
//     tasklist:[
//         {
//          imageUrl : "",
//          taskTitle : "",
//          taskType : "",
//          taskDescription : "",
//         },
//         {
//          imageUrl : "",
//          taskTitle : "",
//          taskType : "",
//          taskDescription : "",
//         },
//         {
//          imageUrl : "",
//          taskTitle : "",
//          taskType : "",
//          taskDescription : "",
//         },
//         {
//          imageUrl : "",
//          taskTitle : "",
//          taskType : "",
//          taskDescription : "",
//         },
//         {
//          imageUrl : "",
//          taskTitle : "",
//          taskType : "",
//          taskDescription : "",
//         },
//     ],
// };

// backup storage
const state={
    tasklist: [],
}

// DOM operations
const taskcontents = document.querySelector(".task__contents");
const taskModel = document.querySelector(".task__modal__body");

// console.log(taskcontents);
// console.log(taskModel);

// Template  for the card on screen
const htmlTaskContent = ({ id, title, description, type, url}) => `
 <div class="col-md-6 col-lg-4 mt-3" id=${id}>
   <div class="card shadow-sm  task__card">
   <!-- header -->
     <div class="card-header d-flex justify-content-end task__card__header">

      <button type='button' class='btn btn-outline-info mr-1.5' name=${id} >
        <i class='fas fa-pencil-alt' name=${id}></i>
      </button>

      <button type='button' class='btn btn-outline-danger mr-1.5' name=${id} >
      <i class='fas fa-trash-alt' name=${id}></i>
    </button>
     </div>

    <!-- body -->
     <div class='card-body'>
      ${
        url &&
        `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg'/>
        `
      } 
      <h4 class'card-title task__card__title'>${title}</h4>
      <p class='description trim-3-lines text-muted'>${description}</p>
      <div class='tags text-white d-flex flex-wrap'>
      <span class='badge bg-primary m-1'>${type}</span>
      </div>
     </div>

     <!-- footer -->
     <div class='card-footer'>
     <button type="button" class="btn btn-outline-primary float right" data-bs-toggle="modal" data-bs-target="#showTask">Open Task</button>
     </div>
   </div>
 </div>
`;


// Model Body on click of open task
const htmlModelContent = ({ id, title, description,url}) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
      ${
          url &&
          `<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3'/>
          `
        } 
        <strong class='text-muted text-sm'>Created on:${date.toDateString()}</strong>
        <h2 class='my-3'>${title}</h2>
        <p class='text-muted'>${description}</p>
    </div>
    `;
};

// storing the data locally on browser
// where we convert json to string(i.e., for local storage)
const updateLocalStorage = () => {
    localStorage.setItem(
        "task", 
        JSON.stringify({
          tasks: state.tasklist,
        })
    );
};

// Load Initial Data
// where we convert string to json(i.e., for rendering the cards on the screen)
const LoadInitialData = () =>{
  const localStorageCopy = JSON.parse(localStorage.task);

  if(localStorageCopy) state.tasklist = localStorageCopy.tasks;

  state.tasklist.map((cardDate) => {
    taskcontents.insertAdjacentHTML("beforeend",htmlTaskContent(cardDate));
  });
};

// speed operator
// const obj={
//   name:'sandeep',
//   age:14
// }

// console.log(obj)
// {name: 'sandeep', age: 14}

// console.log({obj})
// {obj: {…}}

// console.log({...obj})
// {name: 'sandeep', age: 14}

// Appending or adding a new key into obj:
// console.log({...obj,gender:'male'})
//  {name: 'sandeep', age: 14, gender: 'male'}

// Date.now()
// 1677902305458
// console.log(Date.now());
// 1677902336534



// when we update or when we edit ...we need to save
const handleSubmit = (event) =>{
  const id = `${Date.now()}`;
  const input = {
    url:document.getElementById("imageURL").value,
    title:document.getElementById("taskTitle").value,
    type:document.getElementById("tags").value,
    description:document.getElementById("taskDescription").value,
  };
  // if(input.title==='' ||input.tags==='' ||input.taskDescription==='' ){
  //   return alert("Please fill all the necessary fields:-)");
  // }
  taskcontents.insertAdjacentHTML("beforeend",htmlTaskContent({...input,id}));
  state.tasklist.push({...input,id});

  updateLocalStorage();
};

// open task
// edit task
// save edit
// search