import loadCSV from "@/lib/loadCSV"

export async function GET(request) {
    // await CSV loading
    let recipes = await loadCSV();

    const { searchParams } = new URL(request.url);
    const diet = searchParams.get("diet");

    if (diet && diet.toLowerCase() !== "all") {
        recipes = recipes.filter(r => r["Diet_type"].toLowerCase() === diet.toLowerCase());
    }

    // optional: convert numeric fields to numbers
    recipes = recipes.map(r => ({
        ...r,
        "Protein(g)": parseFloat(r["Protein(g)"]) || 0,
        "Carbs(g)": parseFloat(r["Carbs(g)"]) || 0,
        "Fat(g)": parseFloat(r["Fat(g)"]) || 0
    }));

    return new Response(JSON.stringify(recipes), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}