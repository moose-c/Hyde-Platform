// helpet function that takes a color and opacity and returns an rgba string
// thus making the color opaque
export default function opaqueColor(color, opacity) {
  if (typeof color === "string") {
    // Check if the input color is a hex color
    if (color.startsWith("#")) {
      color = hexToRgb(color);
    } else if (color.startsWith("rgb")) {
      // If it's already an rgb or rgba string, parse it
      color = parseRgb(color);
    }
  }

  if (
    typeof color === "object" &&
    color.hasOwnProperty("r") &&
    color.hasOwnProperty("g") &&
    color.hasOwnProperty("b")
  ) {
    // Ensure color object has r, g, and b properties
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
  } else {
    throw new Error("Invalid color format");
  }
}

function hexToRgb(hex) {
  // Convert hex to rgb
  hex = hex.replace(/^#/, "");
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function parseRgb(rgb) {
  // Parse rgb or rgba string into an object
  const values = rgb.match(/\d+/g).map(Number);
  return {
    r: values[0],
    g: values[1],
    b: values[2],
  };
}
