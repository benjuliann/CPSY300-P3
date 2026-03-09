import loadCSV from "../../../lib/loadCSV";

// Simple clustering by protein + carbs + fat (demo)
function assignCluster(recipe) {
  const protein = parseFloat(recipe["Protein(g)"]) || 0;
  const carbs = parseFloat(recipe["Carbs(g)"]) || 0;
  const fat = parseFloat(recipe["Fat(g)"]) || 0;

  if (protein > 150 || fat > 140) return 1; // high-protein / high-fat
  if (protein > 50 && carbs < 200) return 2; // medium-protein
  return 3; // low-protein / high-carb
}

export async function GET() {
  const data = await loadCSV();

  const clusters = data.map(row => ({
    diet: row.Diet_type.toLowerCase(),
    recipe: row.Recipe_name,
    protein: parseFloat(row["Protein(g)"]) || 0,
    carbs: parseFloat(row["Carbs(g)"]) || 0,
    fat: parseFloat(row["Fat(g)"]) || 0,
    cluster: assignCluster(row)
  }));

  return new Response(JSON.stringify(clusters), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}