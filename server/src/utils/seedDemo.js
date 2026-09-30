import { User } from "../models/User.js";
import { Listing } from "../models/Listing.js";

export async function seedDemoData() {
  if (process.env.NODE_ENV === "production" || process.env.DEMO_SEED === "false") return;

  const existing = await Listing.countDocuments();
  if (existing > 0) return;

  let farmer = await User.findOne({ email: "demo.farmer@agrilink.local" });
  if (!farmer) {
    farmer = await User.create({
      name: "AgriLink Demo Farmer",
      email: "demo.farmer@agrilink.local",
      password: "DemoFarmer123!",
      role: "farmer",
      phone: "9000000000",
      region: "Salem",
      verified: true,
    });
  }

  await Listing.insertMany([
    { farmer: farmer._id, title: "Fresh Salem Tomatoes", crop: "Tomato", variety: "Local", category: "vegetable", pricePerUnit: 45, unit: "kg", stock: 120, organic: true, region: "Salem", description: "Freshly harvested tomatoes from local farms.", verified: true, featured: true },
    { farmer: farmer._id, title: "Fresh Onions", crop: "Onion", variety: "Red", category: "vegetable", pricePerUnit: 38, unit: "kg", stock: 200, region: "Salem", description: "Firm red onions suitable for home and retail use.", verified: true },
    { farmer: farmer._id, title: "Premium Rice", crop: "Rice", variety: "Ponni", category: "grain", pricePerUnit: 62, unit: "kg", stock: 500, region: "Salem", description: "Quality Ponni rice supplied directly by farmers.", verified: true, featured: true },
    { farmer: farmer._id, title: "Green Chilli", crop: "Green Chilli", variety: "Fresh", category: "spice", pricePerUnit: 70, unit: "kg", stock: 80, region: "Salem", description: "Fresh green chillies with strong flavour.", verified: true },
    { farmer: farmer._id, title: "Hill Banana", crop: "Banana", variety: "Yelakki", category: "fruit", pricePerUnit: 55, unit: "kg", stock: 100, region: "Salem", description: "Fresh naturally ripened bananas.", verified: true },
    { farmer: farmer._id, title: "Farm Potatoes", crop: "Potato", variety: "Local", category: "tuber", pricePerUnit: 42, unit: "kg", stock: 160, region: "Salem", description: "Clean, fresh potatoes directly from the farm.", verified: true },
  ]);

  console.log("[demo] seeded sample farmer and 6 marketplace listings");
}
