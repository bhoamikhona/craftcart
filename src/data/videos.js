export const data = [
  {
    id: 1,
    thumbnail: "/images/thumbnail/valentine-greeting-card.png",
    src: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/tutorial-videos/9/9-1765743355613.mp4",
    title: "Valentine Greeting Card",
    likes: 23,
    views: 100,
    created_at: "2025-12-15T00:00:00Z",
    description:
      "In this tutorial, you’ll make a premium-looking Valentine greeting card using cardstock, adhesive, and a few basic tools. We’ll cover clean cutting, neat layering, and simple finishing touches so it looks store-bought but still handmade.",
    steps: [
      {
        number: 1,
        text: "Cut the cardstock to size.",
      },
      {
        number: 2,
        text: "Fold and glue the layers.",
      },
    ],
    products: [
      {
        productId: "prod-001",
        name: "Stainless Steel Scissors",
        price: 12.99,
        images: [
          "/images/products/prod-001/445x448/scissor-1.png",
          "/images/products/prod-001/445x448/scissor-2.png",
        ],
      },
      {
        productId: "prod-011",
        name: "Wooden Ruler",
        price: 3.49,
        images: [
          "/images/products/prod-011/445x448/ruler-1.png",
          "/images/products/prod-011/445x448/ruler-2.png",
          "/images/products/prod-011/445x448/ruler-3.png",
        ],
      },
      {
        productId: "prod-003",
        name: "Cardstock Pack",
        price: 14.25,
        images: [
          "/images/products/prod-003/445x448/papers-1.png",
          "/images/products/prod-003/445x448/papers-2.png",
          "/images/products/prod-003/445x448/papers-3.png",
          "/images/products/prod-003/445x448/papers-4.png",
        ],
      },
    ],

    creator: {
      id: 9,
      full_name: "Bhoami K Khona",
      avatar_url: "/images/users/1.jpg",
      followers: 200,
    },
  },
  {
    id: 2,
    thumbnail: "/images/thumbnail/macrame-wall-hanging.png",
    src: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/tutorial-videos/10/macrame-wall-hanging.mp4",
    title: "Minimal Macramé Wall Hanging",
    likes: 48,
    views: 320,
    created_at: "2025-12-14T18:30:00Z",
    description:
      "Learn how to create a clean, modern macramé wall hanging using basic knots and natural cotton cord. This project is perfect for beginners and adds a calm, handmade touch to any space.",
    steps: [
      { number: 1, text: "Measure and cut the cotton cord." },
      { number: 2, text: "Tie the base knots onto the dowel." },
      { number: 3, text: "Repeat knot pattern and trim ends." },
    ],
    products: [
      {
        productId: "prod-020",
        name: "Natural Cotton Macramé Cord",
        price: 18.5,
        images: ["/images/products/prod-020/445x448/cord-1.png"],
      },
      {
        productId: "prod-011",
        name: "Wooden Ruler",
        price: 3.49,
        images: ["/images/products/prod-011/445x448/ruler-1.png"],
      },
    ],
    creator: {
      id: 9,
      full_name: "Bhoami K Khona",
      avatar_url: "/images/users/1.jpg",
      followers: 200,
    },
  },
  {
    id: 3,
    thumbnail: "/images/thumbnail/minimal-christmas-gift-wrapping.png",
    src: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/tutorial-videos/11/christmas-gift-wrapping.mp4",
    title: "Minimal Christmas Gift Wrapping",
    likes: 67,
    views: 540,
    created_at: "2025-12-10T15:00:00Z",
    description:
      "Wrap gifts with a natural, minimalist holiday aesthetic using kraft paper, twine, and greenery. This tutorial focuses on simple techniques that look thoughtful and elegant.",
    steps: [
      { number: 1, text: "Wrap gifts using kraft paper." },
      { number: 2, text: "Secure with twine or string." },
      { number: 3, text: "Add greenery and finishing details." },
    ],
    products: [
      {
        productId: "prod-030",
        name: "Kraft Wrapping Paper Roll",
        price: 9.99,
        images: ["/images/products/prod-030/445x448/kraft-1.png"],
      },
      {
        productId: "prod-031",
        name: "Baker’s Twine Set",
        price: 6.75,
        images: ["/images/products/prod-031/445x448/twine-1.png"],
      },
    ],
    creator: {
      id: 32,
      full_name: "Emma Rodriguez",
      avatar_url: "/images/users/1.jpg",
      followers: 415,
    },
  },
  {
    id: 4,
    thumbnail: "/images/thumbnail/still-life-painting.png",
    src: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/tutorial-videos/12/still-life-painting.mp4",
    title: "Still Life Painting Basics",
    likes: 39,
    views: 290,
    created_at: "2025-12-08T11:20:00Z",
    description:
      "Explore color blending, light, and form by painting a simple still life. This session focuses on brush control and layering techniques for acrylic or oil paints.",
    steps: [
      { number: 1, text: "Sketch the composition lightly." },
      { number: 2, text: "Block in base colors." },
      { number: 3, text: "Add highlights and depth." },
    ],
    products: [
      {
        productId: "prod-007",
        name: "Flat Paint Brush Set",
        price: 15.2,
        images: ["/images/products/prod-007/445x448/paint-brush-1.png"],
      },
    ],
    creator: {
      id: 15,
      full_name: "Daniel Wu",
      avatar_url: "/images/users/1.jpg",
      followers: 780,
    },
  },
  {
    id: 5,
    thumbnail: "/images/thumbnail/texture-wall-painting.png",
    src: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/tutorial-videos/13/texture-wall-art.mp4",
    title: "Textured Wall Art Using Plaster",
    likes: 54,
    views: 410,
    created_at: "2025-12-05T09:45:00Z",
    description:
      "Create modern textured wall art using plaster and simple tools. This tutorial shows how to achieve depth and organic patterns with minimal materials.",
    steps: [
      { number: 1, text: "Apply plaster evenly to the surface." },
      { number: 2, text: "Create texture using brush strokes." },
      { number: 3, text: "Let dry and seal the artwork." },
    ],
    products: [
      {
        productId: "prod-050",
        name: "Plaster Texture Medium",
        price: 22.0,
        images: ["/images/products/prod-050/445x448/plaster-1.png"],
      },
    ],
    creator: {
      id: 18,
      full_name: "Sophia Martin",
      avatar_url: "/images/users/1.jpg",
      followers: 640,
    },
  },
  {
    id: 6,
    thumbnail: "/images/thumbnail/vase-making-with-white-clay.png",
    src: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/tutorial-videos/14/ceramic-vase.mp4",
    title: "Handmade Ceramic Vase on the Wheel",
    likes: 82,
    views: 720,
    created_at: "2025-12-01T14:10:00Z",
    description:
      "Watch the full process of shaping a ceramic vase on the pottery wheel, from centering the clay to forming clean walls and smoothing the final shape.",
    steps: [
      { number: 1, text: "Center the clay on the wheel." },
      { number: 2, text: "Pull and shape the walls." },
      { number: 3, text: "Smooth and trim the rim." },
    ],
    products: [
      {
        productId: "prod-061",
        name: "White Pottery Clay",
        price: 25.0,
        images: ["/images/products/prod-061/445x448/clay-1.png"],
      },
    ],
    creator: {
      id: 21,
      full_name: "Liam Anderson",
      avatar_url: "/images/users/1.jpg",
      followers: 1020,
    },
  },
];