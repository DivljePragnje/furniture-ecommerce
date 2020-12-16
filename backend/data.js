import bcrypt from "bcryptjs";

export const data = {
  users: [
    {
      name: "Milos",
      email: "tomicm990@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "jovana",
      email: "jovanatopic@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Bird Chair",
      description:
        "VG&P collaborates with leading architects, interior designers, and furniture dealers around the world. The Very Good & Proper by-line is ‘Measure twice, cut once’ – sage advice that captures the commitment to quality, sense of playfulness and attention to detail expressed in their products. The chair is a contemporary re-working of a traditional Windsor chair, using flat oval sections for the side rails and back slats to give added strength and comfort, and a slightly different twist on the original. It is robust and suitable for commercial use. Made in the EU from solid ash.",
      images: [
        "/images/products/chairs/afteroom_lounge_chair_01.jpg",
        "/images/products/chairs/afteroom_lounge_chair_02.jpg",
        "/images/products/chairs/afteroom_lounge_chair_03.jpg",
      ],
      price: 275,
      category: "Chair",
      countInStock: 3,
      materials: ["Oak", "Mahogany", "Ash", "Maple", "Walnut"],
      onDiscount: 0.1,
      reviews: [],
      ratings: [],
    },
    {
      name: "Afteroom Lounge Chair",
      description:
        "Combining the iconic to create the new. The two newcomers from Afteroom – the Lounge Chair and the Dining Chair - are the result of combining the inspiration from two iconic chairs of early modernism. The 'Thonet Bentwood Armchair' by Michael Thonet and the 'Spanish Chair' by Børge Mogensen. The combination of these two classics became something new – just as elegant as the Thonet and as comfortable as the Spanish Chair. Relax and enjoy. Afteroom aka Hung-Ming Chen and Chen-Yen Wei are powered by an intriguing interest in proportions, materials and cultures. We're proud to feature several of their designs in our Fall 2015 collection and the common thing for all of them is that they share the same qualities of simplicity, inspired by classic Scandinavian features. Besides being really warm and nice people, Hung-Ming Chen and Chen-Yen Wei are two really talented designers. They originate from Taiwan, but work from their studio in Stockholm.",
      images: [
        "/images/products/chairs/armchair_01.jpg",
        "/images/products/chairs/armchair_02.jpg",
        "/images/products/chairs/armchair_03.jpg",
      ],
      price: 1695,
      category: "Chair",
      countInStock: 0,
      materials: ["Oak", "Mahogany", "Ash", "Maple", "Walnut"],
      onDiscount: 0,
      reviews: [],
      ratings: [],
    },
    {
      name: "Armchair 30",
      description:
        "This armchair with an open backrest comes from TON’s traditional line of products. Typical are: its timeless shape and versatile usage. The seat can be made of plywood, it can be upholstered or covered with cane. TON manually bends furniture in the same workshops where this technology has been in use since 1861. However, TON moved the features of this unique technique further more and mix them with contemporary designers’ thoughts. Their tables and chairs become a connection of quality, innovative shapes and a legacy to the place that has learned to understand the wood for generations.",
      images: [
        "/images/products/chairs/bird_chair_01.jpg",
        "/images/products/chairs/bird_chair_02.jpg",
        "/images/products/chairs/bird_chair_03.jpg",
      ],
      price: 265,
      category: "Chair",
      countInStock: 150,
      materials: ["Oak", "Mahogany", "Ash", "Maple", "Walnut"],
      onDiscount: 0,
      reviews: [],
      ratings: [],
    },
    {
      name: "Facile Bench",
      description:
        "The Mattiazzi Facile Bench perfectly complements the straightforward and spare design of the Facile Table. Like the table, its characteristic feature is its distinctive dovetail joinery, which communicates a sturdy simplicity.",
      images: [
        "/images/products/benches/facile_bench_01.jpg",
        "/images/products/benches/facile_bench_02.jpg",
        "/images/products/benches/facile_bench_03.jpg",
      ],
      price: 1309,
      category: "Bench",
      countInStock: 80,
      materials: ["Oak", "Mahogany", "Ash", "Maple", "Walnut"],
      onDiscount: 0.05,
      reviews: [],
      ratings: [],
    },
    {
      name: "Albert Bench",
      description:
        "A sturdy piece of furniture with legs that widen toward the footrest. Albert is a refined version of the iconic English pub stool which inspired it.",
      images: [
        "/images/products/benches/albert_bench_01.jpg",
        "/images/products/benches/albert_bench_02.jpg",
        "/images/products/benches/albert_bench_03.jpg",
      ],
      price: 899,
      category: "Bench",
      countInStock: 54,
      materials: ["Oak", "Mahogany", "Ash", "Maple", "Walnut"],
      onDiscount: 0,
      reviews: [],
      ratings: [],
    },
    {
      name: "Afteroom Bench",
      description:
        "Afteroom Bench is a supplement to the Afteroom Chair, constituting the same concept - a tribute to Bauhaus and functionalism - reducing the amount of material to a minimum and enhancing the aesthetic appearance to a maximum. Often a side table will be seen next to a bench; so why not, logically, transform the two into one piece? By changing the backrest into a plate, the result is more than stylish.",
      images: [
        "/images/products/benches/afteroom_bench_01.jpg",
        "/images/products/benches/afteroom_bench_02.jpg",
      ],
      price: 1695,
      category: "Bench",
      countInStock: 0,
      materials: ["Oak", "Mahogany", "Ash", "Maple", "Walnut"],
      onDiscount: 0,
      reviews: [],
      ratings: [],
    },
  ],
};
