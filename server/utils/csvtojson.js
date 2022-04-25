const csvFilePath='../Testcsv.csv'
import csv from "csvtojson"
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    // console.log(jsonObj);
})
 
// Async / await usage
const userList = await csv().fromFile(csvFilePath);

export default userList