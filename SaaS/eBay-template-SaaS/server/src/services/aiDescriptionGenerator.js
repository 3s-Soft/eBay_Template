const generateAiDescription = ({
  title = "",
  condition = "",
  brand = "",
  price = "",
  color = "",
  size = ""
}) => {
  const cleanTitle = title || "this item";
  const qualityLine = condition
    ? `Condition is ${condition.toLowerCase()}, carefully represented with clear photos.`
    : "Condition details are accurately documented with clear photos.";
  const fitLine = size ? `Size/fit: ${size}.` : "";
  const styleLine = color ? `Colorway: ${color}.` : "";
  const brandLine = brand ? `${brand} quality and craftsmanship.` : "Quality product.";
  const priceLine = price
    ? `Competitive pricing at $${price}, with fast dispatch.`
    : "Priced to move with fast dispatch.";

  return `${cleanTitle} is a strong choice for buyers looking for ${brandLine} ${qualityLine} ${fitLine} ${styleLine} ${priceLine}`.trim();
};

module.exports = { generateAiDescription };
