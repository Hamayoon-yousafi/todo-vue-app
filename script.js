let todoList = [];
let toBeUpdatedTodo;


todoApp = {
    data() {
        return {
            todoList,
            newTodo: {
                isDone: false,
                isDeleted: false,
                isBeingEdited: false
            },
            updatedTodo: {
                updatedTodoItem: null
            },
        }
    },

    methods: {
        addingTodo() {
                if(this.newTodo.todoItem){
                    this.todoList.push(this.newTodo); 
                    this.newTodo = {
                        todoItem: null,
                        isDone: false,
                        isDeleted: false,
                        isBeingEdited: false
                    };

                    //calling the method that adds to localStorage and passing our object into the method
                    this.addingToLocalStorage(this.todoList);

                } else  {
                    alert('Please Enter a Todo')
                }
        },

        updateLocalStorage() {
           this.addingToLocalStorage(this.todoList);
        },

        deleteTodo() {
            //we find the index of the object where isDeleted = true;
            const indexOfObject = this.todoList.findIndex(function(todo, index) {
                if(todo.isDeleted === true)
                    return true;
            });

            //using splice method to remove the object from the array todoList 
            //we put the index we found
            this.todoList.splice(indexOfObject, 1);
            
        },

        findToBeUpdatedTodo(){
            this.todoList.forEach( el => {
                if(el.isBeingEdited === true) {
                   this.updatedTodo.updatedTodoItem = el.todoItem;
                   toBeUpdatedTodo = el;
                }
            }) 
        },

        disableEditBTNs() {
            let btns = document.querySelectorAll('.editBTNs');

            btns.forEach(element => {
                element.disabled = true;
            });
        },

        enableEditBTNs() {
            let btns = document.querySelectorAll('.editBTNs');
            btns.forEach(element => {
                element.disabled = false;
            });
        },

        updateTodo() {
            if(this.updatedTodo.updatedTodoItem){
                toBeUpdatedTodo.todoItem = this.updatedTodo.updatedTodoItem;
                this.updatedTodo.updatedTodoItem = '';
            } 
        },

        resetInput() {
            this.newTodo.todoItem = null;
            document.querySelector('input').focus();
        },

        addingToLocalStorage(object){
            localStorage.setItem("todos", JSON.stringify(object));
        }
    },

    created() {
        //created() is a lifecycle hook
        this.todoList = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : this.todoList;
    }
}

Vue.createApp(todoApp).mount('#app');