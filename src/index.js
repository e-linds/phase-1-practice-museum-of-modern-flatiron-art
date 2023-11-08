console.log(

    fetch(`http://localhost:3000/current-exhibits`)
    .then(r => r.json())
    .then(data => {

    // populate the image, title, etc from database
    const first = data[0]
    document.querySelector("#exhibit-title").textContent = first.title
    document.querySelector("#exhibit-image").src = first.image
    document.querySelector("#tickets-bought").textContent = first.tickets_bought
    document.querySelector("#exhibit-description").textContent = first.description

   const array = first.comments

    array.forEach((comment) => {
        postComment(comment)
   })

   //event listener to submit new comments and update on front and back end 
   const form = document.querySelector("#comment-form")
   form.addEventListener("submit", (e) => {
    e.preventDefault()
    const addedComment = e.target["comment-input"].value
    postComment(addedComment)
    form.reset()  

    // for fetch: create a new array to store all old comments and new ones
    let newAllComments = []
    array.forEach((oldComment) => {
        newAllComments.push(oldComment)
    })
    newAllComments.push(addedComment)
    
    fetch('http://localhost:3000/current-exhibits/1', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "comments": newAllComments
        })
   })

})

//event listener to increaase ticket count when ticket button is clicked, on front end and back end
   const ticket_btn = document.querySelector("#buy-tickets-button")
   ticket_btn.addEventListener("click", (e) => {
    e.preventDefault()
    let currentTicketNumber = parseInt(document.querySelector("#tickets-bought").textContent)
    currentTicketNumber = currentTicketNumber + 1
    document.querySelector("#tickets-bought").textContent = `${currentTicketNumber} tickets bought`

    fetch('http://localhost:3000/current-exhibits/1', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "tickets_bought": currentTicketNumber
        })
    })

   })


//helper function to add a comment, old or new, to the display
   function postComment(new_comment) {
    const p = document.createElement("p")
        p.textContent = new_comment
        document.querySelector("#comments-section").append(p)
             }

    })

)


