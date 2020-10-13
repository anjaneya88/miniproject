//adapted from the cerner smart on fhir guide. updated to utalize client.js v2 library and FHIR R4

//create a fhir client based on the sandbox enviroment and test paitnet.
const client = new FHIR.client({
  serverUrl: "https://r4.smarthealthit.org",
  tokenResponse: {
   // patient: "a6889c6d-6915-4fac-9d2f-fc6c42b3a82e"
    patient: "727b224a-7b1d-4097-a8d1-23f1df4f8763"
  }
});

// helper function to process fhir resource to get the patient name.
function getPatientName(pt) {
  if (pt.name) {
    var names = pt.name.map(function(name) {
      return name.given.join(" ") + " " + name.family;
    });
    return names.join(" / ")
  } else {
    return "anonymous";
  }
}

// display the patient name gender and dob in the index page
function displayPatient(pt) {
  document.getElementById('patient_name').innerHTML = getPatientName(pt);
  document.getElementById('gender').innerHTML = pt.gender;
  document.getElementById('dob').innerHTML = pt.birthDate;
  //document.getElementById('age').innerHTML = pt.age;
}

//function to display list of medications
function displayMedication(meds) {
  med_list.innerHTML += "<li> " + meds + "</li>";
}
/*
//helper function to get quanity and unit from an observation resoruce.
function getQuantityValueAndUnit(ob) {
  if (typeof ob != 'undefined' &&
    typeof ob.valueQuantity != 'undefined' &&
    typeof ob.valueQuantity.value != 'undefined' &&
    typeof ob.valueQuantity.unit != 'undefined') {
    return Number(parseFloat((ob.valueQuantity.value)).toFixed(2)) + ' ' + ob.valueQuantity.unit;
  } else {
    return undefined;
  }
}

// helper function to get both systolic and diastolic bp
function getBloodPressureValue(BPObservations, typeOfPressure) {
  var formattedBPObservations = [];
  BPObservations.forEach(function(observation) {
    var BP = observation.component.find(function(component) {
      return component.code.coding.find(function(coding) {
        return coding.code == typeOfPressure;
      });
    });
    if (BP) {
      observation.valueQuantity = BP.valueQuantity;
      formattedBPObservations.push(observation);
    }
  });

  return getQuantityValueAndUnit(formattedBPObservations[0]);
}
*/
// create a patient object to initalize the patient
function defaultPatient() {
  return {
    height: {
      value: ''
    },
    weight: {
      value: ''
    },
    sys: {
      value: ''
    },
    dia: {
      value: ''
    },
    ldl: {
      value: ''
    },
    hdl: {
      value: ''
    },
    note: 'No Annotation',
  };
}
/*
//helper function to display the annotation on the index page
function displayAnnotation(annotation) {
  note.innerHTML = annotation;
}
*/
//function to display the observation values you will need to update this
/*function displayObservation(obs) {
  hdl.innerHTML = obs.hdl;
  ldl.innerHTML = obs.ldl;
  sys.innerHTML = obs.sys;
  dia.innerHTML = obs.dia;
  weight.innerHTML = obs.weight;
}
*/
// get patient object and then display its demographics info in the banner
client.request(`Patient/${client.patient.id}`).then(
  function(patient) {
    displayPatient(patient);
    console.log(patient);
  }
);

// get observation resoruce values
// you will need to update the below to retrive the weight and height values
var query = new URLSearchParams();

//MMR
query.set("patient", client.patient.id);
query.set("_sort", "-date");
query.set("vaccine-code", "03")
client.request("Immunization?" + query, {
  pageLimit: 0,
 // flat: true
}).then(
  function(obs) {
 //  console.log(obs[0].getEntries())
    if (!obs[0].entry || !obs[0].entry.length)
    {
      throw new Error("No Immunization found for the selected patient");
    }
    return obs[0].entry;}).then(function (vaxRecords){
  vaxRecords.forEach(function(record)
  {
//    console.log(obs[0].entry) ;
    var status = record.resource.status;
    var vaccineType = record.resource.vaccineCode.text;
    var vaxDate = record.resource.occurrenceDateTime;
    var table = document.getElementById("MMR");
   var row = table.insertRow(-1);
    var typeCell = row.insertCell(0);
   var statusCell = row.insertCell(1);
   var dateCell = row.insertCell(2);
    typeCell.innerHTML = vaccineType;
   statusCell.innerHTML = status;
  dateCell.innerHTML = vaxDate;
  })
});


//IPV
query.set("patient", client.patient.id);
query.set("_sort", "-date");
query.set("vaccine-code", "10")
client.request("Immunization?" + query, {
  pageLimit: 0,
  // flat: true
}).then(
    function(obs) {
      //  console.log(obs[0].getEntries())
      if (!obs[0].entry || !obs[0].entry.length)
      {
        throw new Error("No Immunization found for the selected patient");
      }
      return obs[0].entry;}).then(function (vaxRecords){
  vaxRecords.forEach(function(record)
  {
//    console.log(obs[0].entry) ;
    var status = record.resource.status;
    var vaccineType = record.resource.vaccineCode.text;
    var vaxDate = record.resource.occurrenceDateTime;
    var table = document.getElementById("IPV");
    var row1 = table.insertRow(-1);
    var typeCell1 = row1.insertCell(0);
    var statusCell1 = row1.insertCell(1);
    var dateCell1 = row1.insertCell(2);
    typeCell1.innerHTML = vaccineType;
    statusCell1.innerHTML = status;
    dateCell1.innerHTML = vaxDate;
  })
});


//RotoraVirus
query.set("patient", client.patient.id);
query.set("_sort", "-date");
query.set("vaccine-code", "119")
client.request("Immunization?" + query, {
  pageLimit: 0,
  // flat: true
}).then(
    function(obs) {
      //  console.log(obs[0].getEntries())
      if (!obs[0].entry || !obs[0].entry.length)
      {
        throw new Error("No Immunization found for the selected patient");
      }
      return obs[0].entry;}).then(function (vaxRecords){
  vaxRecords.forEach(function(record)
  {
//    console.log(obs[0].entry) ;
    var status = record.resource.status;
    var vaccineType = record.resource.vaccineCode.text;
    var vaxDate = record.resource.occurrenceDateTime;
    var table = document.getElementById("ROTO");
    var row2 = table.insertRow(-1);
    var typeCell1 = row2.insertCell(0);
    var statusCell1 = row2.insertCell(1);
    var dateCell1 = row2.insertCell(2);
    typeCell1.innerHTML = vaccineType;
    statusCell1.innerHTML = status;
    dateCell1.innerHTML = vaxDate;
  })
});

//RotoraVirus
query.set("patient", client.patient.id);
query.set("_sort", "-date");
query.set("vaccine-code", "119")
client.request("Immunization?" + query, {
    pageLimit: 0,
    // flat: true
}).then(
    function(obs) {
        //  console.log(obs[0].getEntries())
        if (!obs[0].entry || !obs[0].entry.length)
        {
            throw new Error("No Immunization found for the selected patient");
        }
        return obs[0].entry;}).then(function (vaxRecords){
    vaxRecords.forEach(function(record)
    {
//    console.log(obs[0].entry) ;
        var status = record.resource.status;
        var vaccineType = record.resource.vaccineCode.text;
        var vaxDate = record.resource.occurrenceDateTime;
        var table = document.getElementById("ROTO");
        var row2 = table.insertRow(-1);
        var typeCell1 = row2.insertCell(0);
        var statusCell1 = row2.insertCell(1);
        var dateCell1 = row2.insertCell(2);
        typeCell1.innerHTML = vaccineType;
        statusCell1.innerHTML = status;
        dateCell1.innerHTML = vaxDate;
    })
});

//PCV
query.set("patient", client.patient.id);
query.set("_sort", "-date");
query.set("vaccine-code", "133")
client.request("Immunization?" + query, {
    pageLimit: 0,
    // flat: true
}).then(
    function(obs) {
        //  console.log(obs[0].getEntries())
        if (!obs[0].entry || !obs[0].entry.length)
        {
            throw new Error("No Immunization found for the selected patient");
        }
        return obs[0].entry;}).then(function (vaxRecords){
    vaxRecords.forEach(function(record)
    {
//    console.log(obs[0].entry) ;
        var status = record.resource.status;
        var vaccineType = record.resource.vaccineCode.text;
        var vaxDate = record.resource.occurrenceDateTime;
        var table = document.getElementById("PCV");
        var row4 = table.insertRow(-1);
        var typeCell1 = row4.insertCell(0);
        var statusCell1 = row4.insertCell(1);
        var dateCell1 = row4.insertCell(2);
        typeCell1.innerHTML = vaccineType;
        statusCell1.innerHTML = status;
        dateCell1.innerHTML = vaxDate;
    })
});

//BCG
query.set("patient", client.patient.id);
query.set("_sort", "-date");
query.set("vaccine-code", "19")
client.request("Immunization?" + query, {
  pageLimit: 0,
  // flat: true
}).then(
    function(obs) {
      //  console.log(obs[0].getEntries())
      if (!obs[0].entry || !obs[0].entry.length)
      {

        throw new Error("No Immunization found for the selected patient");
      }
      return obs[0].entry;}).then(function (vaxRecords){
  vaxRecords.forEach(function(record)
  {
//    console.log(obs[0].entry) ;
    var status = record.resource.status;
    var vaccineType = record.resource.vaccineCode.text;
    var vaxDate = record.resource.occurrenceDateTime;
    var table = document.getElementById("BCG");
    var row3 = table.insertRow(-1);
    var typeCell1 = row3.insertCell(0);
    var statusCell1 = row3.insertCell(1);
    var dateCell1 = row3.insertCell(2);
    typeCell1.innerHTML = vaccineType;
    statusCell1.innerHTML = status;
    dateCell1.innerHTML = vaxDate;
  })
});

  /*
    var p = defaultPatient();
    p.sys = status ;
    p.dia = vaccineType ;
    p.weight =vaxDate ;
    var medResults = vaccineType + status + vaxDate ;
    displayObservation(p)
    medResults.forEach(function(med) {
      displayMedication(med);

    })
*/


    // group all of the observation resoruces by type into their own
//    var byCodes = client.byCodes(ob, 'code');
  //  var systolicbp = getBloodPressureValue(byCodes('55284-4'), '8480-6');
   // var diastolicbp = getBloodPressureValue(byCodes('55284-4'), '8462-4');
   // var hdl = byCodes('2085-9');
   // var ldl = byCodes('2089-1');

    // create patient object

    // set patient value parameters to the data pulled from the observation resoruce
   // if (typeof systolicbp != 'undefined') {
   // } else {
    //  p.sys = 'undefined'
   // }

   // if (typeof diastolicbp != 'undefined') {
   //   p.dia = diastolicbp;
   // } else {
    //  p.dia = 'undefined'
    //}

    //p.hdl = getQuantityValueAndUnit(hdl[0]);
   // p.ldl = getQuantityValueAndUnit(ldl[0]);

//    displayObservation(p)



// dummy data for medrequests
//var medResults = ["SAMPLE Lasix 40mg","SAMPLE Naproxen sodium 220 MG Oral Tablet","SAMPLE Amoxicillin 250 MG"]

// get medication request resources this will need to be updated
// the goal is to pull all the medication requests and display it in the app. It can be both active and stopped medications
//medResults.forEach(function(med) {
//  displayMedication(med);
//})

//update function to take in text input from the app and add the note for the latest weight observation annotation
//you should include text and the author can be set to anything of your choice. keep in mind that this data will
// be posted to a public sandbox
//function addWeightAnnotation() {
//  var annotation = "test annotation"
//  displayAnnotation(annotation);

//}

//event listner when the add button is clicked to call the function that will add the note to the weight observation
//document.getElementById('add').addEventListener('click', addWeightAnnotation);
