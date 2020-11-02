document.addEventListener('DOMContentLoaded', () => {

  const tableBody = document.querySelector('#table-body')
  const submitForm = document.querySelector('#dog-form')
  
  fetch("http://localhost:3000/dogs")
  .then(resp => resp.json())
  .then(dogs => {
      dogs.forEach(dog => {
          tableBody.innerHTML += dogIndex(dog)
      })
  })

  const dogIndex = (dog) => {
      return `<tr data-id=${dog.id}><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="button">Edit</button></td></tr>`
  }

  tableBody.addEventListener('click', (event)=>{
      if(event.target.className ==='button' ){
          handleEditButton(event)
      }
  })

  const handleEditButton = (event) =>{
      event.preventDefault()
     const dogId=event.target.parentElement.parentElement.dataset.id
     fetch(`http://localhost:3000/dogs/${dogId}`)
     .then(resp => resp.json())
     .then(dogData => {
         const name = document.querySelector("input[name='name']")
         const breed = document.querySelector("input[name='breed']")
         const sex = document.querySelector("input[name='sex']")

         name.value = dogData.name
         name.dataset.id=dogData.id
         breed.value = dogData.breed
         sex.value = dogData.sex
         
     })
  }


  submitForm.addEventListener("submit", (event) => {
              handleSubmitForm(event)
   })
  
   const handleSubmitForm = (event) => {
       event.preventDefault()
       const name = document.querySelector("input[name='name']")
       const breed = document.querySelector("input[name='breed']").value
       const sex = document.querySelector("input[name='sex']").value
       const dogId = name.dataset.id

       const dogData ={
           name: name.value,
           breed: breed,
           sex: sex
       }

       
       const dogBtn = document.querySelector(`tr[data-id="${dogId}"]`)
       dogBtn.children[0].innerText= name.value
       
       dogBtn.children[1].innerText= breed
       dogBtn.children[2].innerText= sex
 

       fetch(`http://localhost:3000/dogs/${dogId}`, {
           method: 'PATCH',
           headers: {
               'content-type': 'application/json'
           },
           body: JSON.stringify(dogData)
       }).then(resp => resp.json())
   }
})