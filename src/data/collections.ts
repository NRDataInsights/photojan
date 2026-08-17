export type Collection = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  files: string[];
};

export const collections: Collection[] = [
  {
    slug: "cityscape",
    title: "Cityscape",
    description: "Street atmosphere, architecture, weather, and rhythm.",
    cover: "Cityscape_25-scaled.jpg",
    files: [
      "Cityscape_01-scaled.jpg","Cityscape_02-scaled.jpg","Cityscape_03-scaled.jpg","Cityscape_04-scaled.jpg",
      "Cityscape_05-1-scaled.jpg","Cityscape_06-1-scaled.jpg","Cityscape_07-1-scaled.jpg","Cityscape_08-scaled.jpg",
      "Cityscape_09-scaled.jpg","Cityscape_10-scaled.jpg","Cityscape_11-scaled.jpg","Cityscape_12-scaled.jpg",
      "Cityscape_13-scaled.jpg","Cityscape_14-scaled.jpg","Cityscape_15-scaled.jpg","Cityscape_16-scaled.jpg",
      "Cityscape_17-scaled.jpg","Cityscape_18-scaled.jpg","Cityscape_19-scaled.jpg","Cityscape_20-scaled.jpg",
      "Cityscape_21-scaled.jpg","Cityscape_22-scaled.jpg","Cityscape_23-scaled.jpg","Cityscape_24-scaled.jpg",
      "Cityscape_25-scaled.jpg","Cityscape_26-scaled.jpg","Cityscape_27-scaled.jpg"
    ]
  },
  {
    slug: "architecture",
    title: "Architecture",
    description: "Structure, form, facades, geometry.",
    cover: "Architecture-59-scaled.jpg",
    files: [
      "Architecture-1-scaled.jpg","Architecture-2-scaled.jpg","Architecture-3-scaled.jpg","Architecture-4-scaled.jpg",
      "Architecture-5-scaled.jpg","Architecture-6-scaled.jpg","Architecture-7-scaled.jpg","Architecture-8-scaled.jpg",
      "Architecture-9-scaled.jpg","Architecture-10-scaled.jpg","Architecture-10-1-scaled.jpg","Architecture-11-scaled.jpg",
      "Architecture-12-scaled.jpg","Architecture-13-scaled.jpg","Architecture-14-scaled.jpg","Architecture-15-scaled.jpg",
      "Architecture-17-scaled.jpg","Architecture-30-scaled.jpg","Architecture-38-scaled.jpg","Architecture-42-scaled.jpg",
      "Architecture-51-scaled.jpg","Architecture-52-scaled.jpg","Architecture-54-scaled.jpg","Architecture-55-scaled.jpg",
      "Architecture-59-scaled.jpg","Architecture-62-scaled.jpg","Architecture-62-1-scaled.jpg"
    ]
  },
  {
    slug: "transport",
    title: "Transport",
    description: "Vehicles, motion, colour, and the city in transit.",
    cover: "Transport_16-scaled.jpg",
    files: ["Transport_15-scaled.jpg","Transport_16-scaled.jpg","Transport_17-scaled.jpg","Transport_18-scaled.jpg"]
  },
  {
    slug: "urban-details",
    title: "Urban details",
    description: "Textures, signage, doors, corners — small scenes people pass.",
    cover: "Urban-detais_01-scaled.jpg",
    files: ["Urban-detais_01-scaled.jpg","Urban-detais_02-scaled.jpg","Urban-details_04-scaled.jpg"]
  },
  {
    slug: "rain-and-reflections",
    title: "Rain and reflections",
    description: "Wet streets, blurred lights, reflections and mood.",
    cover: "Rain-and-reflections_02-scaled.jpg",
    files: ["Rain-and-reflections_01-scaled.jpg","Rain-and-reflections_02-scaled.jpg","Rain-and-reflections_03-scaled.jpg"]
  },
  {
    slug: "construction",
    title: "Construction",
    description: "Worksites, cranes, steel and change.",
    cover: "Construction_03-scaled.jpg",
    files: ["Construction_01-scaled.jpg","Construction_02-scaled.jpg","Construction_03-scaled.jpg"]
  }
];
