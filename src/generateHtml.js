function generateLayout(employees) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
      crossorigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <title>perfectTeam</title>
  </head>
    <body class="container">
    <div class="text-center mb-3">
    <h2>Team</h2>
    </div>
    <div class="row" style="display:flex; justify-content: center;">
        ${employees.map(function(e){
            if (e.getRole() == "Engineer"){
                return cardEngineer(e);
            } else if (e.getRole() == "Intern"){
                return cardIntern(e);
            }
            else {
                return cardManager(e);
            }
        }).join("")}
    </div>
    </body>
    </html>`
    
}
function cardManager(e) {
    return `<div class="card col-3" style="width: 18rem;">
    <div class="card-body">
         <h5 class="card-title">${e.getRole()}</h5>
         <li class="list-group-item">Name: ${e.name}</li>
     </div>
     <ul class="list-group list-group-flush">
         <li class="list-group-item">Emloyee ID: ${e.id}</li>
         <li class="list-group-item"><a href="mailto:${e.email}" class="card-link">${e.email}</a></li>
         <li class="list-group-item">Office Number: ${e.officeNumber}</li>
     </ul>
 </div>`
}
function cardEngineer(e) {
    return `<div class="card col-3" style="width: 18rem;">
    <div class="card-body">
         <h5 class="card-title">${e.getRole()}</h5>
         <li class="list-group-item">Name: ${e.name}</li>
     </div>
     <ul class="list-group list-group-flush">
         <li class="list-group-item">Employee ID: ${e.id}</li>
         <li class="list-group-item"><a href="mailto:${e.email}" class="card-link">${e.email}</a></li>
         <li class="list-group-item"><a href="${e.gitHub}" class="card-link">gitHub Link: ${e.gitHub}</a></li>
     </ul>
 </div>`
}
function cardIntern(e) {
    return `<div class="card col-3" style="width: 18rem;">
    <div class="card-body">
         <h5 class="card-title">${e.getRole()}</h5>
         <li class="list-group-item">Name: ${e.name}</li>
     </div>
     <ul class="list-group list-group-flush">
         <li class="list-group-item">Intern ${e.id}</li>
         <li class="list-group-item"><a href="mailto:${e.email}">${e.email}</a></li>
         <li class="list-group-item">School ${e.school}</li>
     </ul>
 </div>`
}
module.exports = generateLayout;