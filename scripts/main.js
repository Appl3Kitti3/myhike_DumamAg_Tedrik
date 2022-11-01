function insertName() {
  firebase.auth().onAuthStateChanged(user => {
      // Check if a user is signed in:
      if (user) {
          // Do something for the currently logged-in user here: 
          console.log(user.uid);
          console.log(user.displayName);
          user_Name = user.displayName;

          //method #1:  insert with html only
          //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
          //method #2:  insert using jquery
          if (user.displayName == "Terminal") {
            $("#name-goes-here").text("Operator");
          }
          else {
            $("#name-goes-here").text(user_Name); //using jquery
          }
      } else {
          // No user is signed in.
      }
  });
}
insertName(); //run the function


function readQuote() {
  db.collection("quotes").doc("Tuesday")                                                      //name of the collection and documents should matach excatly with what you have in Firestore
    .onSnapshot(tuesdayDoc => {                                                               //arrow notation
         console.log("current document data: " + tuesdayDoc.data());                          //.data() returns data object
         document.getElementById("quote-goes-here").innerHTML = tuesdayDoc.data().quote;      //using javascript to display the data on the right place
         
         //Here are other ways to access key:value data fields
         //$('#quote-goes-here').text(tuesdayDoc.data().quote);                                       //using jquery object dot notation
         //$("#quote-goes-here").text(tuesdayDoc.data()["quote"]);                                    //using json object indexing
    })
}
readQuote()        //calling the function

//Callback example format #2  (function notation)
db.collection("quotes").doc("tuesday")
    .get()
    .then(
    function(snap){                 //this is the callback function header
			  console.log(snap.data());   //print key value pairs
    });

function displayCards(collection) {
    let cardTemplate = document.getElementById("featureCardtemplate");

    db.collection(collection).get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;        // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
								var featureID = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${featureID}.png`; //Example: NV01.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                //i++;   //if you want to use commented out section
            })
        })
}

displayCards("features");

function writeFeatured() {
  //define a variable for the collection you want to create in Firestore to populate data
  var featuresRef = db.collection("features");

  featuresRef.add({
      code:"BBY01",
      name: "Clouder Word",    //replace with your own city?
      details: "Similar to other word typing apps!",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()  
  });
  featuresRef.add({
      code:"AM01",
      name: "Clouder Storage",    //replace with your own city?
      details: "Use your 1TB of data cloud storage now!",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
  featuresRef.add({
      code:"NV01",
      name: "Fluffy Clouds",    //replace with your own city?
      details: "An offline game to play whenever your internet is off!",
      last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
  });
}
    
