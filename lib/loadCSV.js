import fs from "fs"
import path from "path"
import Papa from "papaparse"

export default function loadCSV(){

    const filePath = path.join(process.cwd(), "data", "All_Diets.csv")

    const file = fs.readFileSync(filePath, "utf8")

    const parsed = Papa.parse(file,{
        header:true,
        dynamicTyping:true,
        skipEmptyLines:true
    })

    return parsed.data
}